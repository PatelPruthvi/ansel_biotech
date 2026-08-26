import { useEffect, useRef, useState } from "react";
import { sectionTitleClass, sectionTitleSizeProcess } from "@/lib/typography";

const STEPS = [
  {
    label: "Raw Materials & Seed",
    title: "Sourcing & Seed Development",
    visual: "raw-seed" as const,
    items: ["Purity", "Potency", "Viability"],
    blurb:
      "Incoming materials and seed culture screened for purity, potency and viability.",
  },
  {
    label: "Upstream",
    title: "Controlled Fermentation",
    visual: "upstream" as const,
    items: ["Seed expansion", "Fermentation"],
    blurb: "Seed expansion into controlled fermentation at commercial scale.",
  },
  {
    label: "Downstream",
    title: "Filtration & Ultrafiltration",
    visual: "downstream" as const,
    items: ["Biomass removal", "Concentration", "Purification"],
    blurb:
      "Filtration and ultrafiltration for biomass removal, concentration and purification.",
  },
  {
    label: "Formulation",
    title: "Drying & Formulation",
    visual: "formulation" as const,
    items: ["Drying", "Dosing", "Custom blending"],
    blurb: "Spray or vacuum drying, accurate dosing and custom blending.",
  },
  {
    label: "Final Product",
    title: "QA, Packaging & Dispatch",
    visual: "final" as const,
    items: ["Quality testing", "Packaging", "Delivery"],
    blurb: "Quality testing, sealed packaging and dispatch.",
  },
] as const;

const N = STEPS.length;

const TRAVERSE = 14000;
const TAIL = 2600;
const CYCLE = TRAVERSE + TAIL;

type Phase = { t: number; fade: number };

function resolvePhase(raw: number): Phase {
  const mod = raw % CYCLE;
  if (mod < TRAVERSE) {
    return { t: mod / TRAVERSE, fade: 0 };
  }
  const tailT = mod - TRAVERSE;
  const fade = Math.min(1, Math.max(0, (tailT - 1800) / 800));
  return { t: 1, fade };
}

type Pt = { x: number; y: number };

/** Cubic constant: ~0.55 = circular, higher = rounder / more “puffy” S */
const K_CURVE = 0.78;

/**
 * Two quarter-ellipses per hop: leave each card horizontally, meet in the
 * middle going vertically, arrive at the next card horizontally.
 * That is a proper S-ribbon, not a taut sine or a polyline.
 */
function buildRibbon(nodes: Pt[]) {
  let d = `M ${nodes[0].x.toFixed(2)},${nodes[0].y.toFixed(2)}`;
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const rx = (b.x - a.x) / 2;
    const ry = (b.y - a.y) / 2;
    const mx = a.x + rx;
    const my = a.y + ry;
    const kx = K_CURVE * rx;
    const ky = K_CURVE * ry;

    d += ` C ${(a.x + kx).toFixed(2)},${a.y.toFixed(2)} ${mx.toFixed(2)},${(my - ky).toFixed(2)} ${mx.toFixed(2)},${my.toFixed(2)}`;
    d += ` C ${mx.toFixed(2)},${(my + ky).toFixed(2)} ${(b.x - kx).toFixed(2)},${b.y.toFixed(2)} ${b.x.toFixed(2)},${b.y.toFixed(2)}`;
  }
  return d;
}

function sineNode(i: number, n: number, width: number, midY: number, amp: number, padX: number): Pt {
  const t = n <= 1 ? 0 : i / (n - 1);
  return {
    x: padX + t * (width - padX * 2),
    y: midY - amp * Math.cos(t * Math.PI * 4),
  };
}

function mixRgb(t: number) {
  const u = Math.max(0, Math.min(1, (t - 0.38) / 0.24));
  const s = u * u * (3 - 2 * u);
  const r = Math.round(106 + (114 - 106) * s);
  const g = Math.round(178 + (114 - 178) * s);
  const b = Math.round(32 + (216 - 32) * s);
  return `rgb(${r},${g},${b})`;
}

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

/**
 * Cards stay on the sine peaks/troughs. The connector is a round S-ribbon
 * (paired quarter-ellipses), not the taut sampled sine itself.
 */
const H_W = 1200;
const H_H = 500;
const H_CARD_W = 188;
const PAD_X = 108;
const MID_Y = 250;
const AMP = 148;

const H_NODES: Pt[] = Array.from({ length: N }, (_, i) =>
  sineNode(i, N, H_W, MID_Y, AMP, PAD_X)
);

const H_PATH = buildRibbon(H_NODES);

function stepTone(index: number) {
  return index >= 3 ? "var(--indigo-l)" : "var(--green)";
}

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

function useFlowAnimation(nodes: Pt[], deps: unknown) {
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
      dot.style.setProperty("--dot-color", mixRgb(1));
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
      dot.style.setProperty("--dot-color", mixRgb(ph.t));
      trail.setAttribute("stroke-dashoffset", String(total - len));
      trail.setAttribute("opacity", String(1 - ph.fade * 0.9));

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

    const host = path.ownerSVGElement?.parentElement;
    let io: IntersectionObserver | undefined;
    if (host) {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : pause()),
        { threshold: 0.1 }
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

function DottedList({
  items,
  lit,
  tone,
}: {
  items: readonly string[];
  lit: boolean;
  tone: string;
}) {
  return (
    <div className="flex flex-col min-w-0 flex-1">
      {items.map((item, i) => (
        <div key={item} className="flex flex-col">
          <span
            className="font-sans text-[0.52rem] leading-snug font-medium pf-list-item"
            style={{
              color: lit ? "var(--fg-b)" : "var(--fg-m)",
              animationDelay: `${i * 0.08}s`,
            }}
          >
            {item}
          </span>
          {i < items.length - 1 && (
            <span
              className="my-[5px] border-b border-dotted w-full"
              style={{ borderColor: lit ? `${tone}66` : "var(--bdr-m)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/** Lucide-inspired line icons with extra parts that animate on hover / arrival */
function StepIcon({
  type,
  lit,
  tone,
}: {
  type: (typeof STEPS)[number]["visual"];
  lit: boolean;
  tone: string;
}) {
  const c = lit ? tone : "var(--fg-m)";

  if (type === "raw-seed") {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden className="pf-icon shrink-0">
        <path
          d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"
          stroke={c}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.5 2h7" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M6.45 15h11.1" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <path
          className="pf-liquid"
          d="M8.2 17.2c1.4 1.4 6.2 1.4 7.6 0"
          stroke={c}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    );
  }

  if (type === "upstream") {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden className="pf-icon shrink-0">
        <path
          d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.77-.42l-4.46 2.84A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.77-.42L9.77 10.92A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"
          stroke={c}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle className="pf-bubble" cx="8" cy="17.2" r="1.05" fill={c} opacity="0.55" />
        <circle className="pf-bubble pf-d1" cx="12" cy="16.4" r="0.85" fill={c} opacity="0.45" />
        <circle className="pf-bubble pf-d2" cx="16" cy="17" r="1" fill={c} opacity="0.5" />
      </svg>
    );
  }

  if (type === "downstream") {
    return (
      <svg width="34" height="36" viewBox="0 0 24 26" fill="none" aria-hidden className="pf-icon shrink-0">
        <path
          d="M10 20a1 1 0 0 0 .55.9l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .52-1.34L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.74 1.67l7.22 7.99A2 2 0 0 1 10 14z"
          stroke={c}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle className="pf-drip" cx="12" cy="24.2" r="1.15" fill={c} opacity="0.8" />
      </svg>
    );
  }

  if (type === "formulation") {
    return (
      <svg width="36" height="34" viewBox="0 0 24 24" fill="none" aria-hidden className="pf-icon shrink-0">
        <rect x="15" y="5" width="4" height="4" rx="0.6" stroke={c} strokeWidth="1.6" />
        <path
          d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"
          stroke={c}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="m13 14 8-2M13 19 21 17" stroke={c} strokeWidth="1.4" opacity="0.45" />
        <circle className="pf-spray pf-d0" cx="4" cy="4" r="0.7" fill={c} />
        <circle className="pf-spray pf-d1" cx="7.2" cy="6" r="0.7" fill={c} />
        <circle className="pf-spray pf-d2" cx="3.4" cy="8" r="0.65" fill={c} />
        <circle className="pf-spray pf-d3" cx="6.4" cy="9.6" r="0.6" fill={c} />
      </svg>
    );
  }

  return (
    <svg width="38" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className="pf-icon shrink-0">
      <path
        d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
        stroke={c}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M15 18H9" stroke={c} strokeWidth="1.6" />
      <path
        d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"
        stroke={c}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle className="pf-wheel" cx="17" cy="18" r="2" stroke={c} strokeWidth="1.6" fill="none" />
      <circle className="pf-wheel pf-d1" cx="7" cy="18" r="2" stroke={c} strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function CardVisual({
  step,
  lit,
  index,
}: {
  step: (typeof STEPS)[number];
  lit: boolean;
  index: number;
}) {
  const tone = stepTone(index);
  return (
    <div className="flex items-start gap-2.5 pf-visual">
      <StepIcon type={step.visual} lit={lit} tone={tone} />
      <DottedList items={step.items} lit={lit} tone={tone} />
    </div>
  );
}

function StepCard({
  step,
  index,
  done,
  active,
}: {
  step: (typeof STEPS)[number];
  index: number;
  done: boolean;
  active: boolean;
}) {
  const lit = done || active;
  const tone = stepTone(index);
  const border = active
    ? tone === "var(--indigo-l)"
      ? "rgba(114,114,216,0.55)"
      : "rgba(106,178,32,0.5)"
    : done
      ? "rgba(106,178,32,0.28)"
      : "var(--bdr)";

  return (
    <div
      className={`pf-card group relative h-full rounded-[18px] border px-4 py-3.5 ${active ? "pf-active" : ""}`}
      style={{
        borderColor: border,
        background: "var(--bg)",
        boxShadow: active
          ? `0 14px 38px -14px ${tone === "var(--indigo-l)" ? "rgba(114,114,216,0.38)" : "rgba(106,178,32,0.42)"}`
          : "0 4px 16px rgba(0,0,0,0.07)",
        transition: "border-color .45s var(--ease), box-shadow .45s var(--ease), transform .45s var(--ease)",
        transform: active ? "translateY(-4px) scale(1.02)" : "translateY(0)",
      }}
    >
      {lit && (
        <span
          className="absolute top-2.5 right-2.5 grid place-items-center w-[18px] h-[18px] rounded-full"
          style={{
            background: tone,
            animation: active ? "_pfPop .45s cubic-bezier(.34,1.56,.64,1) both" : undefined,
          }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
            <polyline points="2,5.2 4.1,7.2 8,2.8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}

      <div className="flex items-center gap-1.5 mb-1.5 pr-5">
        <span
          className="font-sans text-[0.5rem] font-semibold tabular-nums tracking-[0.06em]"
          style={{ color: lit ? tone : "var(--fg-m)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-sans text-[0.46rem] text-fg-m opacity-50" aria-hidden>
          ·
        </span>
        <span
          className="font-sans text-[0.46rem] tracking-[0.12em] uppercase truncate"
          style={{ color: lit ? tone : "var(--fg-m)" }}
        >
          {step.label}
        </span>
      </div>

      <h3
        className="font-serif font-bold leading-[1.12] mb-2.5 text-[0.98rem]"
        style={{ color: lit ? "var(--fg-b)" : "var(--fg-m)" }}
      >
        {step.title}
      </h3>

      <CardVisual step={step} lit={lit} index={index} />
    </div>
  );
}

function HorizontalFlow() {
  const { pathRef, trailRef, dotRef, visited, current } = useFlowAnimation(H_NODES, "h5");

  return (
    <div className="relative w-full mx-auto" style={{ aspectRatio: `${H_W} / ${H_H}`, maxWidth: "100%" }}>
      <svg
        viewBox={`0 0 ${H_W} ${H_H}`}
        className="absolute inset-0 w-full h-full overflow-visible"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pfTrail" gradientUnits="userSpaceOnUse" x1={PAD_X} y1="0" x2={H_W - PAD_X} y2="0">
            <stop offset="0%" stopColor="var(--green)" />
            <stop offset="38%" stopColor="var(--green)" />
            <stop offset="62%" stopColor="var(--indigo-l)" />
            <stop offset="100%" stopColor="var(--indigo-l)" />
          </linearGradient>
        </defs>

        <path ref={pathRef} d={H_PATH} stroke="var(--path-line)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path
          ref={trailRef}
          d={H_PATH}
          stroke="url(#pfTrail)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5000"
          strokeDashoffset="5000"
        />

        <g ref={dotRef} style={{ "--dot-color": "var(--green)" } as React.CSSProperties}>
          <circle
            r="16"
            fill="var(--dot-color)"
            opacity="0.12"
            style={{
              animation: "_pfRing 2.2s cubic-bezier(.4,0,.2,1) infinite",
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
          <circle r="7" fill="var(--dot-color)" opacity="0.25" />
          <circle r="4.5" fill="var(--dot-color)" />
        </g>
      </svg>

      {H_NODES.map((n, i) => (
        <div
          key={`${STEPS[i].label}-${STEPS[i].title}`}
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

function MobileProcess() {
  const hostRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const userTouchRef = useRef(false);
  const resumeTimer = useRef(0);
  const elapsedRef = useRef(0);
  const progScrollRef = useRef(false);
  const scrollSyncTimer = useRef(0);
  const DWELL = 2800;
  const HOLD = 1800;
  const FADE = 700;
  const CYCLE_M = N * DWELL + HOLD + FADE;

  const setRailForStep = (i: number) => {
    if (railRef.current) {
      railRef.current.style.width = `${((i + 1) / N) * 100}%`;
    }
  };

  const scrollToStep = (i: number, smooth = true) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[i];
    if (!scroller || !card) return;
    progScrollRef.current = true;
    const left = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: smooth ? "smooth" : "auto" });
    window.setTimeout(() => {
      progScrollRef.current = false;
    }, smooth ? 450 : 50);
  };

  const syncToStep = (i: number, opts?: { scroll?: boolean }) => {
    const idx = Math.max(0, Math.min(N - 1, i));
    setActive(idx);
    setRailForStep(idx);
    elapsedRef.current = idx * DWELL + 80;
    if (opts?.scroll) scrollToStep(idx, true);
  };

  const nearestStepFromScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;
    const mid = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const c = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(N - 1);
      setRailForStep(N - 1);
      return;
    }

    let raf = 0;
    let last = 0;
    let running = false;
    let lastI = -1;

    const frame = (now: number) => {
      if (last) elapsedRef.current += now - last;
      last = now;

      if (userTouchRef.current) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const mod = elapsedRef.current % CYCLE_M;
      let i = 0;
      let progress = 0;
      if (mod < N * DWELL) {
        i = Math.min(N - 1, Math.floor(mod / DWELL));
        progress = ((i + (mod % DWELL) / DWELL) / N) * 100;
      } else if (mod < N * DWELL + HOLD) {
        i = N - 1;
        progress = 100;
      } else {
        const fadeT = (mod - N * DWELL - HOLD) / FADE;
        progress = Math.max(0, 100 * (1 - fadeT));
        i = fadeT > 0.55 ? 0 : N - 1;
      }

      if (railRef.current) {
        railRef.current.style.width = `${progress}%`;
      }

      if (i !== lastI) {
        lastI = i;
        setActive(i);
        scrollToStep(i, true);
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

    const host = hostRef.current;
    let io: IntersectionObserver | undefined;
    if (host) {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : pause()),
        { threshold: 0.15 }
      );
      io.observe(host);
    } else play();

    return () => {
      io?.disconnect();
      pause();
      window.clearTimeout(resumeTimer.current);
      window.clearTimeout(scrollSyncTimer.current);
    };
  }, []);

  const onUserInteract = () => {
    userTouchRef.current = true;
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      userTouchRef.current = false;
    }, 4200);
  };

  const jumpTo = (i: number) => {
    onUserInteract();
    syncToStep(i, { scroll: true });
  };

  const onScrollEndish = () => {
    if (progScrollRef.current) return;
    onUserInteract();
    window.clearTimeout(scrollSyncTimer.current);
    scrollSyncTimer.current = window.setTimeout(() => {
      const i = nearestStepFromScroll();
      syncToStep(i);
    }, 80);
  };

  const step = STEPS[active];
  const pill = stepTone(active);

  return (
    <div ref={hostRef} className="w-full -mx-1">
      <div className="flex items-center justify-between gap-3 px-1 mb-3">
        <p className="font-sans text-[0.62rem] tracking-[0.14em] uppercase text-fg-m m-0">
          Step{" "}
          <span className="tabular-nums text-fg-b font-semibold">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="opacity-50"> / {String(N).padStart(2, "0")}</span>
        </p>
        <p className="font-sans text-[0.62rem] tracking-[0.12em] uppercase m-0 truncate max-w-[55%]" style={{ color: pill }}>
          {step.label}
        </p>
      </div>

      <div className="relative h-[3px] rounded-full mx-1 mb-5 overflow-hidden" style={{ background: "var(--path-line)" }}>
        <div
          ref={railRef}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${(1 / N) * 100}%`,
            background:
              "linear-gradient(90deg, var(--green) 0%, var(--green) 38%, var(--indigo-l) 62%, var(--indigo-l) 100%)",
            transition: "width .25s ease, background .4s ease",
          }}
        />
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-[8%] pb-2 scrollbar-none"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        onTouchStart={onUserInteract}
        onPointerDown={onUserInteract}
        onScroll={onScrollEndish}
      >
        {STEPS.map((s, i) => {
          const on = i === active;
          const done = i < active;
          const tone = stepTone(i);
          const border = on
            ? tone === "var(--indigo-l)"
              ? "rgba(114,114,216,0.5)"
              : "rgba(106,178,32,0.48)"
            : done
              ? "rgba(106,178,32,0.22)"
              : "var(--bdr)";

          return (
            <article
              key={`${s.label}-${s.title}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => jumpTo(i)}
              className={`pf-card snap-center shrink-0 w-[min(78vw,320px)] rounded-[20px] border px-5 py-5 cursor-pointer ${on ? "pf-active" : ""}`}
              style={{
                borderColor: border,
                background: "var(--bg)",
                boxShadow: on
                  ? `0 16px 40px -18px ${tone === "var(--indigo-l)" ? "rgba(114,114,216,0.35)" : "rgba(106,178,32,0.42)"}`
                  : "0 4px 16px rgba(0,0,0,0.06)",
                transform: on ? "scale(1)" : "scale(0.96)",
                opacity: on ? 1 : 0.78,
                transition: "transform .35s var(--ease), opacity .35s var(--ease), border-color .35s var(--ease), box-shadow .35s var(--ease)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span
                    className="font-sans text-[0.58rem] tracking-[0.16em] uppercase"
                    style={{ color: on || done ? tone : "var(--fg-m)" }}
                  >
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </span>
                  <h3 className="font-serif font-bold text-[1.25rem] text-fg-b leading-tight mt-1.5 m-0">
                    {s.title}
                  </h3>
                </div>
                {(on || done) && (
                  <span
                    className="grid place-items-center w-[22px] h-[22px] rounded-full shrink-0 mt-0.5"
                    style={{ background: tone }}
                  >
                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <polyline points="2,5.2 4.1,7.2 8,2.8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="font-sans text-[0.88rem] text-fg-m leading-relaxed mb-4 m-0">{s.blurb}</p>
              <CardVisual step={s} lit={on || done} index={i} />
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-5 px-2">
        {STEPS.map((_, i) => {
          const on = i === active;
          const done = i < active;
          const tone = stepTone(i);
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              onClick={() => jumpTo(i)}
              className="rounded-full border-0 p-0 transition-all duration-300"
              style={{
                width: on ? 18 : 7,
                height: 7,
                background: on ? tone : done ? "rgba(106,178,32,0.45)" : "var(--bdr-m)",
              }}
            />
          );
        })}
      </div>

      <p className="font-sans text-[0.68rem] text-fg-m text-center mt-3 mb-0 opacity-70">
        Swipe to explore · auto-advances with the process line
      </p>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

export function ProcessFlow() {
  const wide = useIsWide();

  return (
    <section className="relative w-full overflow-hidden bg-bg2 py-14 md:py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 20%, rgba(106,178,32,0.08), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(114,114,216,0.07), transparent 55%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-8 lg:mb-12">
          <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
            Our Process
          </p>
          <h2
            className={sectionTitleClass}
            style={sectionTitleSizeProcess}
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
        @keyframes _pfLiquid {
          0%, 100% { transform: translateY(0); opacity: .55; }
          50%      { transform: translateY(-1.5px); opacity: 1; }
        }
        @keyframes _pfBubble {
          0%   { transform: translateY(3px); opacity: .15; }
          50%  { opacity: .85; }
          100% { transform: translateY(-7px); opacity: 0; }
        }
        @keyframes _pfDrip {
          0%   { transform: translateY(-2px); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translateY(5px); opacity: 0; }
        }
        @keyframes _pfSpray {
          0%, 100% { transform: translate(0, 0); opacity: .25; }
          50%      { transform: translate(-1.5px, -2px); opacity: 1; }
        }
        @keyframes _pfWheel {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes _pfListIn {
          from { opacity: .4; transform: translateX(-4px); }
          to   { opacity: 1; transform: none; }
        }
        .pf-card:hover,
        .pf-card.pf-active {
          z-index: 2;
        }
        .pf-card:hover .pf-liquid,
        .pf-card.pf-active .pf-liquid {
          animation: _pfLiquid 1.6s ease-in-out infinite;
        }
        .pf-card:hover .pf-bubble,
        .pf-card.pf-active .pf-bubble {
          animation: _pfBubble 1.8s ease-in-out infinite;
        }
        .pf-card:hover .pf-drip,
        .pf-card.pf-active .pf-drip {
          animation: _pfDrip 1.4s ease-in infinite;
        }
        .pf-card:hover .pf-spray,
        .pf-card.pf-active .pf-spray {
          animation: _pfSpray 1.1s ease-in-out infinite;
        }
        .pf-card:hover .pf-wheel,
        .pf-card.pf-active .pf-wheel {
          animation: _pfWheel 2.2s linear infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .pf-d1 { animation-delay: .28s !important; }
        .pf-d2 { animation-delay: .55s !important; }
        .pf-d3 { animation-delay: .8s !important; }
        .pf-d0 { animation-delay: 0s !important; }
        .pf-card.pf-active .pf-list-item {
          animation: _pfListIn .42s ease both;
        }
      `}</style>
    </section>
  );
}
