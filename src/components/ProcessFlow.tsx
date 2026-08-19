import { useEffect, useRef, useState } from "react";

const STEPS = [
  { label: "Raw Materials", title: "Sourcing & QC", visual: "inspect", blurb: "Incoming lots screened for purity, potency and microbial load." },
  { label: "Fermentation", title: "Precision Scale", visual: "checklist", blurb: "Controlled culture at commercial pH, temperature and duration." },
  { label: "Processing", title: "Downstream", visual: "layout", blurb: "Extraction and purification tuned for consistent yield." },
  { label: "Formulation", title: "Custom Blending", visual: "bars", blurb: "Enzyme, probiotic and carrier ratios built for the application." },
  { label: "Delivery", title: "QA & Dispatch", visual: "dispatch", blurb: "Final QA, packing and dispatch to the facility that needs it." },
] as const;

const N = STEPS.length;

/* Animation timing — continuous motion, no stopping */
const TRAVERSE = 12000; // total time to go from first to last node
const TAIL = 2800;      // 2s hold + 0.8s fade at end before loop
const CYCLE = TRAVERSE + TAIL;

type Phase = { t: number; fade: number };

function resolvePhase(raw: number): Phase {
  const mod = raw % CYCLE;
  if (mod < TRAVERSE) {
    return { t: mod / TRAVERSE, fade: 0 };
  }
  const tailT = mod - TRAVERSE;
  // Hold for 2s, then fade 0.8s
  const fade = Math.min(1, Math.max(0, (tailT - 2000) / 800));
  return { t: 1, fade };
}

type Pt = { x: number; y: number };

/** Smooth sinusoidal cubic path — control points overshoot on BOTH axes for real curves */
function buildPath(pts: Pt[], axis: "x" | "y", tension = 0.55) {
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (axis === "x") {
      const dx = (b.x - a.x) * tension;
      // Control points stay at the Y of their own node — creates the S-curve
      d += ` C ${a.x + dx},${a.y} ${b.x - dx},${b.y} ${b.x},${b.y}`;
    } else {
      const dy = (b.y - a.y) * tension;
      d += ` C ${a.x},${a.y + dy} ${b.x},${b.y - dy} ${b.x},${b.y}`;
    }
  }
  return d;
}

/** Arc-length position on the path closest to each node */
function measureNodes(path: SVGPathElement, nodes: Pt[], total: number) {
  const SAMPLES = 700;
  const pts: { l: number; x: number; y: number }[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const l = (i / SAMPLES) * total;
    const p = path.getPointAtLength(l);
    pts.push({ l, x: p.x, y: p.y });
  }
  return nodes.map((n) => {
    let best = 0;
    let bestDist = Infinity;
    for (const s of pts) {
      const d = (s.x - n.x) ** 2 + (s.y - n.y) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = s.l;
      }
    }
    return best;
  });
}

/* ── Horizontal geometry (large screens) ── */
const H_W = 1000;
const H_H = 420;
const H_CARD_W = 142;
const H_NODES: Pt[] = STEPS.map((_, i) => ({
  x: 40 + i * (920 / (N - 1)),
  y: i % 2 === 0 ? 95 : 325,
}));
const H_PATH = buildPath(H_NODES, "x", 0.75);

function useIsWide() {
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return wide;
}

function useFlowAnimation(
  nodes: Pt[],
  deps: unknown
): {
  pathRef: React.RefObject<SVGPathElement | null>;
  trailRef: React.RefObject<SVGPathElement | null>;
  dotRef: React.RefObject<SVGGElement | null>;
  visited: number;
  current: number;
} {
  const pathRef = useRef<SVGPathElement | null>(null);
  const trailRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGGElement | null>(null);
  const [state, setState] = useState({ visited: 1, current: 0 });

  useEffect(() => {
    const path = pathRef.current;
    const trail = trailRef.current;
    const dot = dotRef.current;
    if (!path || !trail || !dot) return;

    const total = path.getTotalLength();
    const lens = measureNodes(path, nodes, total);
    trail.setAttribute("stroke-dasharray", String(total));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      trail.setAttribute("stroke-dashoffset", "0");
      const end = path.getPointAtLength(total);
      dot.setAttribute("transform", `translate(${end.x} ${end.y})`);
      setState({ visited: N, current: N - 1 });
      return;
    }

    let raf = 0;
    let elapsed = 0;
    let last = 0;
    let running = false;
    let lastVisited = -1;
    let lastCurrent = -1;

    const frame = (now: number) => {
      if (last) elapsed += now - last;
      last = now;

      const ph = resolvePhase(elapsed);
      const len = ph.t * total;

      const p = path.getPointAtLength(len);
      dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
      dot.setAttribute("opacity", String(1 - ph.fade));
      // Dot color matches line: green up to 60%, then transitions to blue
      const colorT = Math.max(0, Math.min(1, (ph.t - 0.5) / 0.18));
      dot.style.setProperty("--dot-color", colorT < 1 ? "var(--green)" : "var(--indigo-l)");
      trail.setAttribute("stroke-dashoffset", String(total - len));
      trail.setAttribute("opacity", String(1 - ph.fade * 0.9));

      // Determine which node is closest to current position
      let current = 0;
      for (let i = 0; i < lens.length; i++) {
        if (len >= lens[i] - 5) current = i;
      }
      const visited = ph.fade > 0.55 ? 0 : current + 1;
      if (visited !== lastVisited || current !== lastCurrent) {
        lastVisited = visited;
        lastCurrent = current;
        setState({ visited, current });
      }

      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only burn frames while the section is actually on screen
    const host = path.ownerSVGElement?.parentElement;
    let io: IntersectionObserver | undefined;
    if (host) {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : pause()),
        { threshold: 0.12 }
      );
      io.observe(host);
    } else {
      play();
    }

    return () => {
      io?.disconnect();
      pause();
    };
  }, [deps, nodes]);

  return { pathRef, trailRef, dotRef, ...state };
}

function CardVisual({ type, active }: { type: string; active: boolean }) {
  const ac = active ? "var(--green)" : "var(--fg-m)";
  const dim = "var(--fg-m)";
  const sm = "text-[0.52rem] font-sans leading-tight";

  if (type === "inspect") {
    // Raw material QC — pass/fail badges
    const items = [
      { label: "Purity", pass: true },
      { label: "Potency", pass: true },
      { label: "Microbial", pass: false },
    ];
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <span key={i} className={`${sm} px-1.5 py-0.5 rounded-md border`}
            style={{
              borderColor: active && it.pass ? "rgba(106,178,32,0.4)" : "var(--bdr)",
              color: active && it.pass ? "var(--green)" : dim,
              background: active && it.pass ? "rgba(106,178,32,0.06)" : "transparent",
            }}>
            {it.pass ? "✓" : "…"} {it.label}
          </span>
        ))}
      </div>
    );
  }
  if (type === "checklist") {
    // Fermentation — mini metric rows
    const rows = [
      { label: "pH Level", val: "6.8" },
      { label: "Temp", val: "37°C" },
      { label: "Duration", val: "48h" },
    ];
    return (
      <div className="flex flex-col gap-1">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className={sm} style={{ color: dim, opacity: 0.7 }}>{r.label}</span>
            <span className={`${sm} font-semibold tabular-nums`} style={{ color: active ? ac : dim }}>{r.val}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "layout") {
    // Downstream — extraction yield bar
    const pct = 92;
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className={sm} style={{ color: dim, opacity: 0.7 }}>Yield</span>
          <span className={`${sm} font-semibold tabular-nums`} style={{ color: active ? "var(--indigo-l)" : dim }}>{pct}%</span>
        </div>
        <div className="h-[6px] w-full rounded-full overflow-hidden" style={{ background: "var(--bdr)" }}>
          <div className="h-full rounded-full" style={{
            width: `${pct}%`,
            background: active ? "var(--indigo-l)" : "var(--fg-m)",
            opacity: active ? 1 : 0.25,
            transition: "all .4s var(--ease)",
          }} />
        </div>
      </div>
    );
  }
  if (type === "bars") {
    // Formulation — blend ratio chips
    const blends = [
      { label: "Enzyme A", w: "45%" },
      { label: "Probiotic", w: "30%" },
      { label: "Carrier", w: "25%" },
    ];
    return (
      <div className="flex flex-col gap-1">
        {blends.map((b, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-[6px] rounded-full" style={{
              width: b.w,
              background: active ? (i === 0 ? "var(--green)" : i === 1 ? "rgba(106,178,32,0.5)" : "var(--bdr-m)") : "var(--bdr)",
              transition: "background .4s var(--ease)",
            }} />
            <span className={`${sm} shrink-0`} style={{ color: dim, opacity: 0.7 }}>{b.label}</span>
          </div>
        ))}
      </div>
    );
  }
  // dispatch — QA → Pack → Ship tracker
  const stages = ["QA", "Pack", "Ship"];
  return (
    <div className="flex items-center gap-1">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-[16px] h-[16px] rounded-full flex items-center justify-center text-[0.4rem] font-bold border"
              style={{
                borderColor: active && i <= 1 ? "var(--indigo-l)" : "var(--bdr)",
                background: active && i <= 1 ? "rgba(56,41,149,0.1)" : "transparent",
                color: active && i <= 1 ? "var(--indigo-l)" : dim,
              }}>
              {active && i <= 1 ? "✓" : "·"}
            </div>
            <span className={`${sm}`} style={{ color: active && i <= 1 ? "var(--indigo-l)" : dim, opacity: 0.7 }}>{s}</span>
          </div>
          {i < 2 && <div className="w-2.5 h-[1.5px] rounded-full mt-[-10px]" style={{ background: active && i === 0 ? "var(--indigo-l)" : "var(--bdr)" }} />}
        </div>
      ))}
    </div>
  );
}

function StepCard({
  step,
  index,
  done,
  active,
  compact,
}: {
  step: (typeof STEPS)[number];
  index: number;
  done: boolean;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className="relative h-full rounded-2xl border px-4 py-3.5 overflow-hidden will-change-transform"
      style={{
        borderColor: active
          ? "rgba(106,178,32,0.45)"
          : done
            ? "rgba(106,178,32,0.22)"
            : "var(--bdr)",
        background: "var(--bg2)",
        boxShadow: active ? "0 10px 34px -12px rgba(106,178,32,0.45)" : "0 2px 8px rgba(0,0,0,0.06)",
        transition:
          "border-color .5s var(--ease), box-shadow .5s var(--ease), transform .5s var(--ease)",
        transform: active ? "translateY(-3px)" : "none",
      }}
    >
      {done && (
        <span
          className="absolute top-2.5 right-2.5 grid place-items-center w-[18px] h-[18px] rounded-full bg-green"
          style={{ animation: "_pfPop .45s cubic-bezier(.34,1.56,.64,1) both" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <polyline
              points="2,5.2 4.1,7.2 8,2.8"
              stroke="#fff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}

      <div className="flex items-center gap-2 mb-1.5 pr-5">
        <span
          className="font-sans text-[0.5rem] font-semibold tabular-nums tracking-[0.08em]"
          style={{
            color: done || active ? "var(--green)" : "var(--fg-m)",
            transition: "color .4s var(--ease)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="font-sans text-[0.5rem] tracking-[0.16em] uppercase truncate"
          style={{
            color: done || active ? "var(--green)" : "var(--fg-m)",
            transition: "color .4s var(--ease)",
          }}
        >
          {step.label}
        </span>
      </div>

      <h3
        className={`font-serif font-bold leading-[1.15] mb-2.5 ${compact ? "text-[0.95rem]" : "text-[1.02rem]"}`}
        style={{
          color: done || active ? "var(--fg-b)" : "var(--fg-m)",
          transition: "color .4s var(--ease)",
        }}
      >
        {step.title}
      </h3>
      <CardVisual type={step.visual} active={done || active} />
    </div>
  );
}


function HorizontalFlow() {
  const { pathRef, trailRef, dotRef, visited, current } = useFlowAnimation(H_NODES, "h");

  return (
    <div className="relative w-full" style={{ aspectRatio: `${H_W} / ${H_H}` }}>
      {/* SVG curve behind cards */}
      <svg
        viewBox={`0 0 ${H_W} ${H_H}`}
        className="absolute inset-0 w-full h-full overflow-visible"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="pfGradH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--green)" />
            <stop offset="50%" stopColor="var(--green)" />
            <stop offset="68%" stopColor="var(--indigo-l)" />
            <stop offset="100%" stopColor="var(--indigo-l)" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d={H_PATH}
          stroke="var(--bdr-m)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          ref={trailRef}
          d={H_PATH}
          stroke="url(#pfGradH)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="4000"
          strokeDashoffset="4000"
        />
        {/* Breathing dot that travels along the curve */}
        <g ref={dotRef} style={{ "--dot-color": "var(--green)" } as React.CSSProperties}>
          <circle
            r="18"
            fill="var(--dot-color)"
            opacity="0.12"
            style={{
              animation: "_pfRing 2.2s cubic-bezier(.4,0,.2,1) infinite",
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
          <circle r="8" fill="var(--dot-color)" opacity="0.25" />
          <circle r="5" fill="var(--dot-color)" />
        </g>
      </svg>

      {/* Cards placed directly at node positions — they ARE the nodes */}
      {H_NODES.map((n, i) => (
        <div
          key={i}
          className="absolute z-10"
          style={{
            width: `${(H_CARD_W / H_W) * 100}%`,
            left: `${(n.x / H_W) * 100}%`,
            top: `${(n.y / H_H) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <StepCard step={STEPS[i]} index={i} done={i < visited} active={i === current} />
        </div>
      ))}
    </div>
  );
}

const M_DWELL = 2600;
const M_HOLD = 2000;
const M_FADE = 700;
const M_CYCLE = N * M_DWELL + M_HOLD + M_FADE;

function MobileProcess() {
  const hostRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState(1);
  const [rail, setRail] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCurrent(N - 1);
      setVisited(N);
      setRail(1);
      return;
    }

    let raf = 0;
    let last = 0;
    let running = false;

    let lastCurrent = -1;
    let lastVisited = -1;
    let lastRail = -1;

    const apply = (elapsed: number) => {
      const mod = elapsed % M_CYCLE;
      let i = 0;
      let vis = 1;
      let r = 0;
      if (mod < N * M_DWELL) {
        i = Math.min(N - 1, Math.floor(mod / M_DWELL));
        vis = i + 1;
        r = mod / (N * M_DWELL);
      } else if (mod < N * M_DWELL + M_HOLD) {
        i = N - 1;
        vis = N;
        r = 1;
      } else {
        const fadeT = (mod - N * M_DWELL - M_HOLD) / M_FADE;
        r = Math.max(0, 1 - fadeT);
        if (fadeT > 0.6) {
          vis = 0;
          i = 0;
        } else {
          i = N - 1;
          vis = N;
        }
      }
      r = Math.round(r * 50) / 50;
      if (i === lastCurrent && vis === lastVisited && r === lastRail) return;
      lastCurrent = i;
      lastVisited = vis;
      lastRail = r;
      setCurrent(i);
      setVisited(vis);
      setRail(r);
    };

    const frame = (now: number) => {
      if (last) elapsedRef.current += now - last;
      last = now;
      apply(elapsedRef.current);
      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const host = hostRef.current;
    let io: IntersectionObserver | undefined;
    if (host) {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : pause()),
        { threshold: 0.2 }
      );
      io.observe(host);
    } else {
      play();
    }

    return () => {
      io?.disconnect();
      pause();
    };
  }, []);

  const jumpTo = (i: number) => {
    elapsedRef.current = i * M_DWELL + 40;
    setCurrent(i);
    setVisited(i + 1);
    setRail(i / (N - 1));
  };

  const step = STEPS[current];
  const color = current < 3 ? "var(--green)" : "var(--indigo-l)";

  return (
    <div ref={hostRef} className="w-full">
      <div className="relative mb-6 px-1">
        <div className="absolute left-[10%] right-[10%] top-[15px] h-[2px] rounded-full" style={{ background: "var(--bdr-m)" }} />
        <div
          className="absolute left-[10%] top-[15px] h-[2px] rounded-full"
          style={{
            width: `calc(${rail * 80}%)`,
            background: "linear-gradient(90deg, var(--green), var(--indigo-l))",
            transition: "width .25s linear",
          }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => {
            const on = i === current;
            const complete = i < visited && !on;
            const pill = i < 3 ? "var(--green)" : "var(--indigo-l)";
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => jumpTo(i)}
                className="flex flex-col items-center gap-1.5 min-w-0"
                aria-current={on ? "step" : undefined}
              >
                <span
                  className="grid place-items-center w-[30px] h-[30px] rounded-full border text-[0.62rem] font-sans font-semibold tabular-nums"
                  style={{
                    borderColor: on || complete ? pill : "var(--bdr-m)",
                    background: on ? pill : complete ? "rgba(106,178,32,0.12)" : "var(--bg2)",
                    color: on ? "#fff" : complete ? "var(--green)" : "var(--fg-m)",
                    boxShadow: on ? `0 0 0 4px ${i < 3 ? "rgba(106,178,32,0.16)" : "rgba(114,114,216,0.16)"}` : "none",
                    transform: on ? "scale(1.08)" : "none",
                    transition: "all .35s var(--ease)",
                  }}
                >
                  {complete ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <polyline points="2,5.2 4.1,7.2 8,2.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <span
                  className="font-sans text-[0.52rem] tracking-[0.04em] uppercase truncate max-w-[58px]"
                  style={{ color: on ? "var(--fg-b)" : "var(--fg-m)" }}
                >
                  {s.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-2xl border px-5 py-5 min-h-[198px]"
        style={{
          background: "var(--bg)",
          borderColor: current < 3 ? "rgba(106,178,32,0.28)" : "rgba(114,114,216,0.28)",
          boxShadow: `0 12px 32px -16px ${current < 3 ? "rgba(106,178,32,0.45)" : "rgba(58,58,184,0.35)"}`,
          transition: "border-color .45s var(--ease), box-shadow .45s var(--ease)",
        }}
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="font-sans text-[0.58rem] tracking-[0.16em] uppercase" style={{ color }}>
            {String(current + 1).padStart(2, "0")} · {step.label}
          </span>
        </div>
        <h3 className="font-serif font-bold text-[1.35rem] text-fg-b leading-tight mb-2">{step.title}</h3>
        <p className="font-sans text-[0.88rem] text-fg-m leading-relaxed mb-4">{step.blurb}</p>
        <CardVisual type={step.visual} active />
      </div>
    </div>
  );
}

export function ProcessFlow() {
  const wide = useIsWide();

  return (
    <section className="relative w-full overflow-hidden bg-bg2 py-14 md:py-28">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 20%, rgba(106,178,32,0.08), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(114,114,216,0.07), transparent 55%)",
        }}
      />

      <div className="relative max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-8 lg:mb-16">
          <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
            Our Process
          </p>
          <h2
            className="font-serif font-bold text-fg-b leading-[1.05]"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
          >
            From Fermentation to <span className="text-green">Formulation</span>
          </h2>
        </div>

        {wide ? <HorizontalFlow /> : <MobileProcess />}
      </div>

      <style>{`
        @keyframes _pfPop {
          0%   { transform: scale(.2); opacity: 0; }
          60%  { transform: scale(1.18); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes _pfRing {
          0%   { transform: scale(.7); opacity: .5; }
          70%  { transform: scale(1.75); opacity: 0; }
          100% { transform: scale(1.75); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
