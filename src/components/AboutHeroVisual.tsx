import { useEffect, useRef, useState } from "react";

type Tone = "green" | "sage" | "violet" | "mist";
type Region = "probiotics" | "enzymes" | "blends";

const DROPS: {
  id: Region | null;
  w: string;
  x: string;
  y: string;
  depth: number;
  tone: Tone;
  delay: string;
  hideOnCompact?: boolean;
}[] = [
  { id: "enzymes", w: "46%", x: "46%", y: "50%", depth: 1, tone: "green", delay: "0s" },
  { id: "probiotics", w: "22%", x: "70%", y: "27%", depth: 1.7, tone: "sage", delay: "0.12s" },
  { id: "blends", w: "18%", x: "26%", y: "72%", depth: 1.8, tone: "violet", delay: "0.22s" },
  { id: null, w: "9%", x: "76%", y: "68%", depth: 2.2, tone: "mist", delay: "0.34s", hideOnCompact: true },
];

const SPECKS = [
  { x: "38%", y: "42%" },
  { x: "52%", y: "46%" },
  { x: "44%", y: "56%" },
  { x: "50%", y: "38%" },
  { x: "41%", y: "50%" },
  { x: "55%", y: "54%" },
];

const LABELS: { id: Region; label: string; x: string; y: string }[] = [
  { id: "probiotics", label: "PROBIOTICS", x: "70%", y: "12%" },
  { id: "enzymes", label: "ENZYMES", x: "8%", y: "48%" },
  { id: "blends", label: "BLENDS", x: "26%", y: "86%" },
];

function fill(tone: Tone) {
  switch (tone) {
    case "green":
      return "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.72) 0%, rgba(196,214,150,0.55) 28%, rgba(127,162,57,0.42) 62%, rgba(90,120,40,0.28) 100%)";
    case "sage":
      return "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.7) 0%, rgba(210,222,186,0.5) 34%, rgba(150,168,110,0.38) 100%)";
    case "violet":
      return "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.7) 0%, rgba(214,210,232,0.5) 36%, rgba(124,118,176,0.32) 100%)";
    default:
      return "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.75) 0%, rgba(232,234,224,0.45) 100%)";
  }
}

export function AboutHeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const dropRefs = useRef<(HTMLDivElement | null)[]>([]);
  const specksRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<Region | null>(null);
  const [entered, setEntered] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const next = wrap.clientWidth < 420 || wrap.clientHeight < 240;
      setCompact((p) => (p === next ? p : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.current.tx = (e.clientX - r.left) / r.width - 0.5;
      mouse.current.ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      mouse.current.tx = 0;
      mouse.current.ty = 0;
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let running = true;
    const intro = window.setTimeout(() => setEntered(true), 40);

    const tick = () => {
      if (!running) return;
      const m = mouse.current;
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;
      // 3D tilt following cursor
      if (sceneRef.current && !reduced) {
        sceneRef.current.style.transform = `perspective(800px) rotateY(${m.x * 14}deg) rotateX(${-m.y * 10}deg)`;
      }
      DROPS.forEach((d, i) => {
        const el = dropRefs.current[i];
        if (!el) return;
        const px = reduced ? 0 : m.x * d.depth * 12;
        const py = reduced ? 0 : m.y * d.depth * 9;
        el.style.translate = `calc(-50% + ${px}px) calc(-50% + ${py}px)`;
      });
      if (specksRef.current && !reduced) {
        specksRef.current.style.translate = `${m.x * 16}px ${m.y * 12}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.clearTimeout(intro);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full min-h-[200px] overflow-hidden" style={{ perspective: 800 }}>
      <div ref={sceneRef} className="absolute inset-0" style={{ transition: "transform 0.08s linear", transformStyle: "preserve-3d" }}>
      {DROPS.map((d, i) => {
        if (compact && d.hideOnCompact) return null;
        const on = d.id !== null && hover === d.id;
        const dim = hover !== null && d.id !== null && hover !== d.id;
        return (
          <div
            key={i}
            ref={(el) => {
              dropRefs.current[i] = el;
            }}
            className="absolute rounded-full pointer-events-none ahv-drop"
            style={{
              width: d.w,
              aspectRatio: "1",
              left: d.x,
              top: d.y,
              translate: "-50% -50%",
              background: fill(d.tone),
              boxShadow: on
                ? "0 18px 40px rgba(70,90,40,0.18), inset 0 1px 0 rgba(255,255,255,0.7)"
                : "0 14px 32px rgba(40,50,30,0.12), inset 0 1px 0 rgba(255,255,255,0.55)",
              opacity: entered ? (dim ? 0.45 : 1) : 0,
              filter: on ? "saturate(1.12)" : "none",
              transition: "opacity .7s ease, filter .4s ease, box-shadow .4s ease",
              transitionDelay: entered ? d.delay : "0s",
              animation: compact ? undefined : `ahvFloat ${9 + i * 1.4}s ease-in-out ${i * 0.6}s infinite`,
            }}
          >
            <span
              className="absolute left-[18%] top-[14%] w-[42%] h-[22%] rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.65), transparent)",
              }}
            />
          </div>
        );
      })}

      {!compact && (
        <div ref={specksRef} className="absolute inset-0 pointer-events-none">
          {SPECKS.map((s, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: s.x,
                top: s.y,
                background: i % 2 ? "rgba(92,86,176,0.35)" : "rgba(127,162,57,0.4)",
                opacity: entered ? 0.7 : 0,
                transition: "opacity .8s ease",
                transitionDelay: `${0.5 + i * 0.06}s`,
              }}
            />
          ))}
        </div>
      )}

      </div>{/* end sceneRef */}

      {!compact &&
        LABELS.map((l, i) => {
          const dim = hover !== null && hover !== l.id;
          return (
            <button
              key={l.id}
              type="button"
              onMouseEnter={() => setHover(l.id)}
              onMouseLeave={() => setHover(null)}
              className="absolute z-10 flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-default outline-none"
              style={{
                left: l.x,
                top: l.y,
                fontFamily: "inherit",
                opacity: entered ? (dim ? 0.3 : 0.8) : 0,
                transition: "opacity .4s ease",
                transitionDelay: entered && !hover ? `${0.45 + i * 0.1}s` : "0s",
              }}
            >
              <span
                className="block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: l.id === "blends" ? "#7a74b8" : "#7FA239" }}
              />
              <span className="uppercase tracking-[0.18em] text-[0.55rem] font-semibold text-fg-b whitespace-nowrap">
                {l.label}
              </span>
            </button>
          );
        })}

      {compact && (
        <div
          className="absolute bottom-3 inset-x-4 flex justify-between gap-2"
          style={{ opacity: entered ? 1 : 0, transition: "opacity .6s ease .3s" }}
        >
          {LABELS.map((c) => (
            <span
              key={c.id}
              className="uppercase tracking-[0.16em] text-[0.5rem] font-semibold text-fg-b"
              style={{ fontFamily: "inherit" }}
            >
              {c.label}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @keyframes ahvFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ahv-drop { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
