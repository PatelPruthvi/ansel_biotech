import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { useLocation } from "wouter";
import anselLogoTrans from "@assets/ansel_logo_transparent.png";

/* ── Desktop (unchanged wide layout) ── */
const DESKTOP_VB = { w: 900, h: 560 };
const DESKTOP_BOX = { x: 340, y: 236, w: 220, h: 88 };

const DESKTOP_Y1 = DESKTOP_BOX.y + 26;
const DESKTOP_Y2 = DESKTOP_BOX.y + DESKTOP_BOX.h - 26;
const DESKTOP_LEFT = DESKTOP_BOX.x;
const DESKTOP_RIGHT = DESKTOP_BOX.x + DESKTOP_BOX.w;
const DESKTOP_STRAIGHT = 108;

const DESKTOP_PATHS = [
  {
    id: "probiotics",
    label: ["Probiotics"],
    href: "/products/probiotics",
    d: `M ${DESKTOP_LEFT} ${DESKTOP_Y1} H ${DESKTOP_LEFT - DESKTOP_STRAIGHT} C ${DESKTOP_LEFT - DESKTOP_STRAIGHT - 78} ${DESKTOP_Y1}, ${118} 128, 92 78`,
    end: { x: 92, y: 78 },
    v: "top" as const,
  },
  {
    id: "feed",
    label: ["Feed Enzymes"],
    href: "/industries/animal-healthcare",
    d: `M ${DESKTOP_LEFT} ${DESKTOP_Y2} H ${DESKTOP_LEFT - DESKTOP_STRAIGHT} C ${DESKTOP_LEFT - DESKTOP_STRAIGHT - 78} ${DESKTOP_Y2}, ${118} 432, 92 482`,
    end: { x: 92, y: 482 },
    v: "bottom" as const,
  },
  {
    id: "industrial",
    label: ["Industrial", "Enzymes"],
    href: "/products/enzymes",
    d: `M ${DESKTOP_RIGHT} ${DESKTOP_Y1} H ${DESKTOP_RIGHT + DESKTOP_STRAIGHT} C ${DESKTOP_RIGHT + DESKTOP_STRAIGHT + 78} ${DESKTOP_Y1}, ${782} 128, 808 78`,
    end: { x: 808, y: 78 },
    v: "top" as const,
  },
  {
    id: "custom",
    label: ["Custom", "Formulations"],
    href: "/products",
    d: `M ${DESKTOP_RIGHT} ${DESKTOP_Y2} H ${DESKTOP_RIGHT + DESKTOP_STRAIGHT} C ${DESKTOP_RIGHT + DESKTOP_STRAIGHT + 78} ${DESKTOP_Y2}, ${782} 432, 808 482`,
    end: { x: 808, y: 482 },
    v: "bottom" as const,
  },
] as const;

/* ── Mobile (square layout, favicon center plate) ── */
const MOBILE_VB = { w: 520, h: 520 };
const MOBILE_BOX = { x: 200, y: 200, w: 120, h: 120 };
const MOBILE_CX = MOBILE_BOX.x + MOBILE_BOX.w / 2;
const MOBILE_CY = MOBILE_BOX.y + MOBILE_BOX.h / 2;
const MOBILE_ARM = 52;

const MOBILE_PATHS = [
  {
    id: "probiotics",
    label: ["Probiotics"],
    href: "/products/probiotics",
    d: `M ${MOBILE_BOX.x} ${MOBILE_CY - 18} H ${MOBILE_BOX.x - MOBILE_ARM} C ${MOBILE_BOX.x - MOBILE_ARM - 56} ${MOBILE_CY - 18}, ${88} ${118}, 68 72`,
    end: { x: 68, y: 72 },
    v: "top" as const,
  },
  {
    id: "feed",
    label: ["Feed", "Enzymes"],
    href: "/industries/animal-healthcare",
    d: `M ${MOBILE_BOX.x} ${MOBILE_CY + 18} H ${MOBILE_BOX.x - MOBILE_ARM} C ${MOBILE_BOX.x - MOBILE_ARM - 56} ${MOBILE_CY + 18}, ${88} ${402}, 68 448`,
    end: { x: 68, y: 448 },
    v: "bottom" as const,
  },
  {
    id: "industrial",
    label: ["Industrial", "Enzymes"],
    href: "/products/enzymes",
    d: `M ${MOBILE_BOX.x + MOBILE_BOX.w} ${MOBILE_CY - 18} H ${MOBILE_BOX.x + MOBILE_BOX.w + MOBILE_ARM} C ${MOBILE_BOX.x + MOBILE_BOX.w + MOBILE_ARM + 56} ${MOBILE_CY - 18}, ${432} ${118}, 452 72`,
    end: { x: 452, y: 72 },
    v: "top" as const,
  },
  {
    id: "custom",
    label: ["Custom", "Formulations"],
    href: "/products",
    d: `M ${MOBILE_BOX.x + MOBILE_BOX.w} ${MOBILE_CY + 18} H ${MOBILE_BOX.x + MOBILE_BOX.w + MOBILE_ARM} C ${MOBILE_BOX.x + MOBILE_BOX.w + MOBILE_ARM + 56} ${MOBILE_CY + 18}, ${432} ${402}, 452 448`,
    end: { x: 452, y: 448 },
    v: "bottom" as const,
  },
] as const;

type PathDef = (typeof DESKTOP_PATHS)[number] | (typeof MOBILE_PATHS)[number];
type DestId = PathDef["id"];

const HEAD = 0.16;
const GAP = 0.3;
const PERIOD = HEAD + GAP;
const TRAVEL = 1450;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function useDashAnimation(
  paths: readonly PathDef[],
  hoverRef: MutableRefObject<DestId | null>
) {
  const reducedRef = useRef(false);
  const maskRefs = useRef<Record<string, SVGPathElement | null>>({});
  const glowRefs = useRef<Record<string, SVGGElement | null>>({});
  const fullRefs = useRef<Record<string, SVGGElement | null>>({});
  const dotRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const pulseRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const groupRefs = useRef<Record<string, SVGGElement | null>>({});
  const labelRefs = useRef<Record<string, SVGTextElement | null>>({});

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMq = () => {
      reducedRef.current = mq.matches;
    };
    applyMq();
    mq.addEventListener("change", applyMq);
    return () => mq.removeEventListener("change", applyMq);
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const paint = (now: number, hovered: DestId | null) => {
      const offset = HEAD - (now - start) / TRAVEL;
      const packetAtEnd = mod(1 + offset, PERIOD) <= HEAD + 0.02;
      const breath = 0.5 + 0.5 * Math.sin(now / 130);

      for (const p of paths) {
        const isHover = hovered === p.id;
        const dim = hovered !== null && !isHover;
        const mask = maskRefs.current[p.id];
        const glow = glowRefs.current[p.id];
        const full = fullRefs.current[p.id];
        const dot = dotRefs.current[p.id];
        const pulse = pulseRefs.current[p.id];
        const group = groupRefs.current[p.id];
        const label = labelRefs.current[p.id];

        if (group) group.style.opacity = dim ? "0.38" : "1";
        if (label) label.setAttribute("fill", isHover ? "var(--green)" : "var(--label-strong)");

        const setDot = (lit: boolean, breathe: boolean) => {
          if (dot) dot.setAttribute("fill", lit ? "var(--green)" : "var(--bdr-m)");
          if (pulse) {
            if (lit && breathe) {
              pulse.style.opacity = String(0.22 + 0.38 * breath);
              pulse.setAttribute("r", String(5.5 + 4.2 * breath));
            } else {
              pulse.style.opacity = "0";
            }
          }
        };

        if (isHover) {
          if (glow) glow.style.opacity = "0";
          if (full) full.style.opacity = "1";
          setDot(true, false);
          continue;
        }

        if (full) full.style.opacity = "0";

        if (reducedRef.current) {
          if (glow) glow.style.opacity = "0";
          setDot(false, false);
          continue;
        }

        if (mask) mask.setAttribute("stroke-dashoffset", String(offset));
        if (glow) glow.style.opacity = "1";
        setDot(packetAtEnd, true);
      }
    };

    const tick = (now: number) => {
      paint(now, hoverRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paths, hoverRef]);

  return {
    maskRefs,
    glowRefs,
    fullRefs,
    dotRefs,
    pulseRefs,
    groupRefs,
    labelRefs,
  };
}

type PathLayerProps = {
  paths: readonly PathDef[];
  hover: DestId | null;
  setHover: (id: DestId | null) => void;
  navigate: (href: string) => void;
  maskRefs: ReturnType<typeof useDashAnimation>["maskRefs"];
  glowRefs: ReturnType<typeof useDashAnimation>["glowRefs"];
  fullRefs: ReturnType<typeof useDashAnimation>["fullRefs"];
  dotRefs: ReturnType<typeof useDashAnimation>["dotRefs"];
  pulseRefs: ReturnType<typeof useDashAnimation>["pulseRefs"];
  groupRefs: ReturnType<typeof useDashAnimation>["groupRefs"];
  labelRefs: ReturnType<typeof useDashAnimation>["labelRefs"];
  labelSize?: { single: number; multi: number };
  idPrefix?: string;
};

function PathLayers({
  paths,
  hover,
  setHover,
  navigate,
  maskRefs,
  glowRefs,
  fullRefs,
  dotRefs,
  pulseRefs,
  groupRefs,
  labelRefs,
  labelSize = { single: 15, multi: 13 },
  idPrefix = "ahv",
}: PathLayerProps) {
  return (
    <>
      <defs>
        <filter id={`${idPrefix}-dash-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {paths.map((p) => (
          <mask id={`${idPrefix}-win-${p.id}`} key={p.id} maskUnits="userSpaceOnUse">
            <path
              ref={(el) => {
                maskRefs.current[p.id] = el;
              }}
              d={p.d}
              stroke="white"
              strokeWidth="8"
              strokeLinecap="butt"
              fill="none"
              pathLength={1}
              strokeDasharray={`${HEAD} ${GAP}`}
              strokeDashoffset={HEAD}
            />
          </mask>
        ))}
      </defs>

      {paths.map((p) => (
        <g
          key={p.id}
          ref={(el) => {
            groupRefs.current[p.id] = el;
          }}
          style={{ transition: "opacity 0.28s ease" }}
        >
          <path
            d={p.d}
            stroke="transparent"
            strokeWidth="28"
            strokeLinecap="round"
            className="cursor-pointer"
            onMouseEnter={() => setHover(p.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate(p.href)}
          />
          <path
            d={p.d}
            stroke="var(--path-line)"
            strokeWidth="1.75"
            strokeLinecap="butt"
            strokeDasharray="11 13"
            pointerEvents="none"
          />
          <g
            ref={(el) => {
              glowRefs.current[p.id] = el;
            }}
            mask={`url(#${idPrefix}-win-${p.id})`}
            opacity={0}
            pointerEvents="none"
          >
            <path
              d={p.d}
              stroke="var(--green)"
              strokeWidth="4.2"
              strokeLinecap="butt"
              strokeDasharray="11 13"
              opacity="0.55"
              filter={`url(#${idPrefix}-dash-glow)`}
            />
            <path
              d={p.d}
              stroke="var(--green)"
              strokeWidth="1.75"
              strokeLinecap="butt"
              strokeDasharray="11 13"
            />
          </g>
          <g
            ref={(el) => {
              fullRefs.current[p.id] = el;
            }}
            opacity={0}
            pointerEvents="none"
          >
            <path
              d={p.d}
              stroke="var(--green)"
              strokeWidth="4.2"
              strokeLinecap="butt"
              strokeDasharray="11 13"
              opacity="0.55"
              filter={`url(#${idPrefix}-dash-glow)`}
            />
            <path
              d={p.d}
              stroke="var(--green)"
              strokeWidth="1.75"
              strokeLinecap="butt"
              strokeDasharray="11 13"
            />
          </g>
          <circle
            ref={(el) => {
              pulseRefs.current[p.id] = el;
            }}
            cx={p.end.x}
            cy={p.end.y}
            r="5.5"
            fill="var(--green)"
            opacity={0}
            pointerEvents="none"
          />
          <circle
            ref={(el) => {
              dotRefs.current[p.id] = el;
            }}
            cx={p.end.x}
            cy={p.end.y}
            r="3.2"
            fill="var(--bdr-m)"
            pointerEvents="none"
          />
          <text
            ref={(el) => {
              labelRefs.current[p.id] = el;
            }}
            x={p.end.x}
            y={p.v === "bottom" ? p.end.y + 14 : p.end.y - 14}
            textAnchor="middle"
            dominantBaseline={p.v === "bottom" ? "hanging" : "auto"}
            fill="var(--label-strong)"
            className="cursor-pointer select-none"
            style={{
              fontFamily: "Open Sans, ui-sans-serif, system-ui, sans-serif",
              fontSize: p.label.length > 1 ? labelSize.multi : labelSize.single,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
            onMouseEnter={() => setHover(p.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate(p.href)}
          >
            {p.label.map((line, i) => (
              <tspan key={line} x={p.end.x} dy={i === 0 ? 0 : "1.15em"}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </>
  );
}

function DesktopAboutHeroVisual() {
  const [, navigate] = useLocation();
  const [hover, setHover] = useState<DestId | null>(null);
  const hoverRef = useRef<DestId | null>(null);
  hoverRef.current = hover;

  const refs = useDashAnimation(DESKTOP_PATHS, hoverRef);

  return (
    <div
      className="relative w-full h-full min-h-[300px] rounded-[28px] overflow-hidden border border-white/50 dark:border-white/12"
      style={{
        background: "color-mix(in srgb, var(--card) 78%, transparent)",
        backdropFilter: "blur(18px) saturate(1.12)",
        WebkitBackdropFilter: "blur(18px) saturate(1.12)",
        boxShadow: "0 22px 56px rgba(20,24,18,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <svg
        viewBox={`0 0 ${DESKTOP_VB.w} ${DESKTOP_VB.h}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Ansel Biotech connected to probiotics, feed enzymes, industrial enzymes, and custom formulations"
      >
        <PathLayers
          paths={DESKTOP_PATHS}
          hover={hover}
          setHover={setHover}
          navigate={navigate}
          idPrefix="ahv-d"
          {...refs}
        />
        <rect
          x={DESKTOP_BOX.x}
          y={DESKTOP_BOX.y}
          width={DESKTOP_BOX.w}
          height={DESKTOP_BOX.h}
          rx="16"
          fill="color-mix(in srgb, var(--card) 88%, transparent)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
        <image
          href={anselLogoTrans}
          x={DESKTOP_BOX.x + 8}
          y={DESKTOP_BOX.y + 2}
          width={DESKTOP_BOX.w - 16}
          height={DESKTOP_BOX.h - 4}
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
}

function MobileAboutHeroVisual() {
  const [, navigate] = useLocation();
  const [hover, setHover] = useState<DestId | null>(null);
  const hoverRef = useRef<DestId | null>(null);
  hoverRef.current = hover;

  const refs = useDashAnimation(MOBILE_PATHS, hoverRef);
  const markSize = 76;
  const markX = MOBILE_BOX.x + (MOBILE_BOX.w - markSize) / 2;
  const markY = MOBILE_BOX.y + (MOBILE_BOX.h - markSize) / 2;

  return (
    <div
      className="relative w-full aspect-square rounded-[22px] overflow-hidden border border-white/50 dark:border-white/12"
      style={{
        background: "color-mix(in srgb, var(--card) 78%, transparent)",
        backdropFilter: "blur(18px) saturate(1.12)",
        WebkitBackdropFilter: "blur(18px) saturate(1.12)",
        boxShadow: "0 16px 40px rgba(20,24,18,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <svg
        viewBox={`0 0 ${MOBILE_VB.w} ${MOBILE_VB.h}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Ansel Biotech connected to probiotics, feed enzymes, industrial enzymes, and custom formulations"
      >
        <PathLayers
          paths={MOBILE_PATHS}
          hover={hover}
          setHover={setHover}
          navigate={navigate}
          idPrefix="ahv-m"
          labelSize={{ single: 11.5, multi: 10 }}
          {...refs}
        />
        <rect
          x={MOBILE_BOX.x}
          y={MOBILE_BOX.y}
          width={MOBILE_BOX.w}
          height={MOBILE_BOX.h}
          rx="20"
          fill="color-mix(in srgb, var(--card) 88%, transparent)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
        <image
          href="/favicon.png"
          x={markX}
          y={markY}
          width={markSize}
          height={markSize}
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
}

export function AboutHeroVisual() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 1023px)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (isMobile) return <MobileAboutHeroVisual />;
  return <DesktopAboutHeroVisual />;
}
