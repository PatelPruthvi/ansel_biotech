import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { duration, easePremium } from "@/lib/motion";

const PRINCIPLES = [
  {
    n: "01",
    title: "Quality",
    body: "We move quickly without sacrificing quality — consistent output is a feature, not a trade-off.",
    visual: "quality" as const,
    accent: "green",
  },
  {
    n: "02",
    title: "Transparency",
    body: "Clear communication and complete visibility, from the first conversation to dispatch.",
    visual: "transparency" as const,
    accent: "indigo",
  },
  {
    n: "03",
    title: "Innovation",
    body: "We challenge assumptions and explore the connections others miss to find a better path.",
    visual: "innovation" as const,
    accent: "green",
  },
  {
    n: "04",
    title: "Improvement",
    body: "Every batch is an opportunity to learn, iterate, and compound progress over time.",
    visual: "improvement" as const,
    accent: "indigo",
  },
];

function Visual({ type }: { type: (typeof PRINCIPLES)[number]["visual"] }) {
  const green = "var(--green)";
  const indigo = "var(--indigo-l)";

  if (type === "quality") {
    return (
      <svg viewBox="0 0 160 72" className="w-[120px] lg:w-[132px] h-auto" aria-hidden>
        <line className="pv-q-l1 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-110" x1="8" y1="18" x2="118" y2="18" stroke={green} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
        <line className="pv-q-l2 origin-left transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-125" x1="28" y1="36" x2="132" y2="36" stroke={green} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        <line className="origin-left transition-transform duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-110" x1="18" y1="54" x2="98" y2="54" stroke={green} strokeWidth="3" strokeLinecap="round" opacity="0.3" />
        <circle className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[8px]" cx="142" cy="36" r="9" fill={green} />
      </svg>
    );
  }

  if (type === "transparency") {
    return (
      <svg viewBox="0 0 140 88" className="w-[108px] lg:w-[120px] h-auto" aria-hidden>
        <rect className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:translate-y-1" x="8" y="22" width="78" height="52" rx="10" fill={indigo} opacity="0.18" />
        <rect className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" x="28" y="12" width="78" height="52" rx="10" fill={indigo} opacity="0.28" />
        <rect className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1" x="48" y="4" width="78" height="52" rx="10" fill="none" stroke={indigo} strokeWidth="2" opacity="0.85" />
        <line x1="60" y1="20" x2="108" y2="20" stroke={indigo} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <line x1="60" y1="30" x2="96" y2="30" stroke={indigo} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </svg>
    );
  }

  if (type === "innovation") {
    return (
      <svg viewBox="0 0 140 88" className="w-[108px] lg:w-[120px] h-auto" aria-hidden>
        <g className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[8deg]">
          <line x1="28" y1="58" x2="58" y2="28" stroke={green} strokeWidth="1.5" opacity="0.45" />
          <line x1="58" y1="28" x2="102" y2="22" stroke={green} strokeWidth="1.5" opacity="0.45" />
          <line x1="58" y1="28" x2="88" y2="62" stroke={green} strokeWidth="1.5" opacity="0.45" />
          <line x1="28" y1="58" x2="88" y2="62" stroke={green} strokeWidth="1.5" opacity="0.35" />
          <line x1="102" y1="22" x2="88" y2="62" stroke={green} strokeWidth="1.5" opacity="0.35" />
          <circle className="transition-transform duration-500 group-hover:scale-125" cx="28" cy="58" r="5" fill={green} opacity="0.55" style={{ transformOrigin: "28px 58px" }} />
          <circle cx="58" cy="28" r="7" fill={green} />
          <circle cx="102" cy="22" r="5" fill={green} opacity="0.7" />
          <circle className="transition-transform duration-500 delay-75 group-hover:scale-125" cx="88" cy="62" r="6" fill={green} opacity="0.85" style={{ transformOrigin: "88px 62px" }} />
          <circle cx="118" cy="48" r="4" fill={green} opacity="0.4" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" className="w-[76px] lg:w-[84px] h-auto" aria-hidden>
      <g className="origin-center transition-transform duration-700 ease-linear group-hover:rotate-[50deg]" style={{ transformOrigin: "48px 48px" }}>
        <circle cx="48" cy="48" r="34" fill="none" stroke={indigo} strokeWidth="2" strokeDasharray="4 6" opacity="0.35" />
        <circle cx="48" cy="48" r="22" fill="none" stroke={indigo} strokeWidth="2" opacity="0.2" />
        <path
          d="M48 14 A34 34 0 0 1 78 64"
          fill="none"
          stroke={indigo}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="78" cy="64" r="7" fill={indigo} />
      </g>
    </svg>
  );
}

export function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden py-16 md:py-[80px] lg:py-0 lg:h-[100svh] lg:flex lg:items-center lg:justify-center"
      aria-labelledby="core-values-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-10 w-full flex flex-col items-center lg:max-h-[calc(100svh-120px)]">
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Our Principles
        </p>
        <motion.h2
          id="core-values-heading"
          className="font-sans font-semibold text-fg-b leading-[1.02] mb-3 text-center"
          style={{ fontSize: "clamp(1.9rem, 3.2vw, 3rem)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.section, ease: easePremium }}
        >
          Standards we work to
        </motion.h2>
        <motion.p
          className="font-sans font-light text-fg-m leading-[1.8] mb-8 lg:mb-9 max-w-[520px] text-center"
          style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.section, delay: 0.06, ease: easePremium }}
        >
          Simple rules for how we manufacture, communicate and improve — so the work stays consistent long after a batch leaves Vadodara.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full max-w-[920px] mx-auto">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.section, delay: 0.08 + i * 0.05, ease: easePremium }}
              className="group relative overflow-hidden rounded-[20px] border border-border bg-card px-5 py-6 sm:px-6 sm:py-6 lg:px-7 lg:py-7 flex flex-col justify-end min-h-[180px] lg:min-h-[200px] transition-colors duration-300 hover:bg-bg2 cursor-default"
            >
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:-translate-y-0.5">
                <Visual type={p.visual} />
              </div>

              <span
                className={`font-sans text-[0.78rem] font-semibold mb-1.5 ${
                  p.accent === "green" ? "text-green" : "text-indigo-l"
                }`}
              >
                {p.n}
              </span>
              <h3 className="font-sans text-[1.15rem] md:text-[1.25rem] font-bold text-fg-b leading-tight mb-2 pr-[40%]">
                {p.title}
              </h3>
              <p className="font-sans text-[0.88rem] font-light text-fg-m leading-[1.65] m-0 max-w-[42ch]">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
