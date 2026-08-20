import { type KeyboardEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { probioticGroups, type ProbioticGroup, type StrainPin } from "@/data/productContent";
import { duration, easePremium } from "@/lib/motion";

function shortLabel(strain: string) {
  const parts = strain.replace(/ \(.+\)$/, "").split(" ");
  if (parts.length < 2) return strain;
  return `${parts[0][0]}. ${parts.slice(1).join(" ")}`;
}

function labelX(pin: StrainPin) {
  if (pin.side === "right") return Math.min(pin.x + 22, 86);
  return Math.max(pin.x - 22, 14);
}

export function ProbioticPortfolio() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(probioticGroups[0]?.id ?? "");
  const [locked, setLocked] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const group = probioticGroups.find((g) => g.id === activeId) ?? probioticGroups[0];
  const index = hovered ?? locked;
  const activeStrain = group.strains[index] ?? group.strains[0];

  const onSelectGroup = (g: ProbioticGroup) => {
    setActiveId(g.id);
    setLocked(0);
    setHovered(null);
  };

  const onKeyList = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;
    const next = (locked + dir + group.strains.length) % group.strains.length;
    setLocked(next);
    setHovered(null);
  };

  const select = (i: number) => {
    setLocked(i);
    setHovered(null);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div
        className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 -mx-1 px-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Probiotic organism groups"
      >
        {probioticGroups.map((g) => {
          const on = g.id === activeId;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onSelectGroup(g)}
              className={`snap-start shrink-0 font-sans text-[0.62rem] md:text-[0.68rem] tracking-[0.1em] uppercase px-4 py-2.5 rounded-full border transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-green/40 ${
                on
                  ? "border-green bg-[rgba(106,178,32,0.12)] text-green"
                  : "border-border text-fg-m hover:border-[rgba(106,178,32,0.35)] hover:text-fg-b"
              }`}
            >
              {g.shortName ?? g.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0.01 : duration.ui, ease: easePremium }}
          className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-6 lg:gap-10 items-start"
        >
          <figure className="relative m-0 rounded-[18px] overflow-hidden border border-border bg-[#0a0c12]">
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[min(52vh,420px)]">
              <img
                src={group.image}
                alt={`Microscopy visualisation of ${group.name}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                draggable={false}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, transparent 28%, rgba(0,0,0,0.2) 100%)",
                }}
              />

              <figcaption className="absolute top-4 left-4 right-4 z-20 pointer-events-none">
                <p className="font-sans text-[0.52rem] tracking-[0.16em] uppercase text-white/55 mb-1">
                  {group.tagline}
                </p>
                <h3 className="font-serif text-[1.4rem] md:text-[1.65rem] font-semibold text-white leading-tight m-0">
                  {group.name}
                </h3>
              </figcaption>

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {group.pins.map((pin, i) => {
                  if (i !== index) return null;
                  const lx = labelX(pin);
                  return (
                    <motion.line
                      key={group.strains[i]}
                      x1={pin.x}
                      y1={pin.y}
                      x2={lx}
                      y2={pin.y}
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="0.35"
                      strokeLinecap="round"
                      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, ease: easePremium }}
                    />
                  );
                })}
              </svg>

              {group.strains.map((strain, i) => {
                const pin = group.pins[i];
                if (!pin) return null;
                const on = i === index;
                const lx = labelX(pin);
                return (
                  <div key={strain}>
                    <button
                      type="button"
                      aria-label={strain}
                      aria-pressed={locked === i}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      onClick={() => select(i)}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-full"
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                      <span
                        className={`flex items-center justify-center rounded-full border font-mono text-[0.52rem] tracking-[0.04em] transition-all duration-300 ${
                          on
                            ? "w-8 h-8 bg-white text-fg-b border-white"
                            : "w-7 h-7 bg-black/35 text-white border-white/55 hover:border-white hover:bg-black/50"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>

                    <AnimatePresence>
                      {on && (
                        <motion.div
                          initial={reduced ? { opacity: 1 } : { opacity: 0, x: pin.side === "right" ? 8 : -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                          transition={{ duration: 0.28, ease: easePremium }}
                          className={`absolute z-20 pointer-events-none -translate-y-1/2 ${
                            pin.side === "left" ? "-translate-x-full pr-2" : "pl-2"
                          }`}
                          style={{ left: `${lx}%`, top: `${pin.y}%` }}
                        >
                          <span className="inline-block max-w-[140px] sm:max-w-[168px] rounded-md bg-black/70 px-2 py-1 font-sans text-[0.68rem] sm:text-[0.72rem] italic leading-tight text-white whitespace-normal">
                            {shortLabel(strain)}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </figure>

          <div className="flex flex-col min-w-0">
            <div className="mb-4">
              <p className="font-sans text-[0.52rem] tracking-[0.16em] uppercase text-fg-m mb-1">
                {group.strains.length} strains in this group
              </p>
              <p className="font-sans text-[0.88rem] font-light text-fg-m leading-relaxed m-0 max-w-[36ch]">
                Tap a marker on the specimen — a line identifies the strain.
              </p>
            </div>

            <ul
              className="m-0 p-0 list-none flex flex-col border-t border-border"
              onKeyDown={onKeyList}
              onMouseLeave={() => setHovered(null)}
            >
              {group.strains.map((strain, i) => {
                const on = index === i;
                return (
                  <li key={strain} className="border-b border-border">
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onClick={() => select(i)}
                      aria-pressed={locked === i}
                      className="w-full text-left flex items-baseline gap-4 py-3.5 md:py-4 px-0 bg-transparent border-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-green/40 focus-visible:ring-offset-2 ring-offset-background"
                    >
                      <span
                        className={`font-mono text-[0.62rem] tracking-[0.14em] uppercase shrink-0 w-7 transition-colors duration-300 ${
                          on ? "text-green" : "text-fg-d"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-sans text-[0.95rem] md:text-[1.02rem] italic leading-[1.4] transition-colors duration-300 ${
                          on ? "text-fg-b" : "text-fg-m"
                        }`}
                      >
                        {strain}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
