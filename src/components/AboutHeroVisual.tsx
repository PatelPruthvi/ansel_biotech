import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import anselLogoTrans from "@assets/ansel_logo_transparent.png";

const VB = { w: 900, h: 560 };
/** Centered plate — paths originate from its left and right edges */
const BOX = { x: 340, y: 236, w: 220, h: 88 };

const Y1 = BOX.y + 26;
const Y2 = BOX.y + BOX.h - 26;
const LEFT = BOX.x;
const RIGHT = BOX.x + BOX.w;
const STRAIGHT = 108;

const PATHS = [
  {
    id: "enzymes",
    label: ["Enzymes"],
    href: "/products/enzymes",
    d: `M ${LEFT} ${Y1} H ${LEFT - STRAIGHT} C ${LEFT - STRAIGHT - 78} ${Y1}, ${118} 128, 92 78`,
    end: { x: 92, y: 78 },
    v: "top" as const,
  },
  {
    id: "probiotics",
    label: ["Probiotics"],
    href: "/products/probiotics",
    d: `M ${LEFT} ${Y2} H ${LEFT - STRAIGHT} C ${LEFT - STRAIGHT - 78} ${Y2}, ${118} 432, 92 482`,
    end: { x: 92, y: 482 },
    v: "bottom" as const,
  },
  {
    id: "blends",
    label: ["Custom Blends"],
    href: "/products",
    d: `M ${RIGHT} ${Y1} H ${RIGHT + STRAIGHT} C ${RIGHT + STRAIGHT + 78} ${Y1}, ${782} 128, 808 78`,
    end: { x: 808, y: 78 },
    v: "top" as const,
  },
  {
    id: "industrial",
    label: ["Industrial", "Applications"],
    href: "/industries",
    d: `M ${RIGHT} ${Y2} H ${RIGHT + STRAIGHT} C ${RIGHT + STRAIGHT + 78} ${Y2}, ${782} 432, 808 482`,
    end: { x: 808, y: 482 },
    v: "bottom" as const,
  },
] as const;

type DestId = (typeof PATHS)[number]["id"];

const HEAD = 0.16;
const GAP = 0.3;
const PERIOD = HEAD + GAP;
const TRAVEL = 1450;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function AboutHeroVisual() {
  const [, navigate] = useLocation();
  const [hover, setHover] = useState<DestId | null>(null);
  const hoverRef = useRef<DestId | null>(null);
  hoverRef.current = hover;

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

      for (const p of PATHS) {
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
        if (label) label.setAttribute("fill", isHover ? "var(--green)" : "var(--fg-b)");

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
  }, []);

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
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Ansel Biotech connected to enzymes, probiotics, custom blends, and industrial applications"
      >
        <defs>
          <filter id="ahv-dash-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {PATHS.map((p) => (
            <mask id={`ahv-win-${p.id}`} key={p.id} maskUnits="userSpaceOnUse">
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

        {PATHS.map((p) => (
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
              stroke="var(--bdr-m)"
              strokeWidth="1.75"
              strokeLinecap="butt"
              strokeDasharray="11 13"
              pointerEvents="none"
            />
            <g
              ref={(el) => {
                glowRefs.current[p.id] = el;
              }}
              mask={`url(#ahv-win-${p.id})`}
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
                filter="url(#ahv-dash-glow)"
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
                filter="url(#ahv-dash-glow)"
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
              y={p.v === "bottom" ? p.end.y + 16 : p.end.y - 16}
              textAnchor="middle"
              dominantBaseline={p.v === "bottom" ? "hanging" : "auto"}
              fill="var(--fg-b)"
              className="cursor-pointer"
              style={{
                fontFamily: "Open Sans, ui-sans-serif, system-ui, sans-serif",
                fontSize: p.label.length > 1 ? 13 : 15,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => navigate(p.href)}
            >
              {p.label.map((line, i) => (
                <tspan key={line} x={p.end.x} dy={i === 0 ? 0 : "1.2em"}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}

        <rect
          x={BOX.x}
          y={BOX.y}
          width={BOX.w}
          height={BOX.h}
          rx="16"
          fill="color-mix(in srgb, var(--card) 88%, transparent)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
        <image
          href={anselLogoTrans}
          x={BOX.x + 8}
          y={BOX.y + 2}
          width={BOX.w - 16}
          height={BOX.h - 4}
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
}
