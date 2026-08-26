import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { PageCtaBand } from "@/components/PageCtaBand";
import {
  animalHealthcareAreas,
  animalHealthcareSolutions,
  aquaSolutions,
  type AnimalSolution,
  type AquaSolution,
} from "@/data/animalHealthcareContent";
import {
  sectionTitleClass,
  sectionTitleSizeProduct,
  heroTitleClass,
  heroTitleSizeLg,
} from "@/lib/typography";

type AreaId = "poultry" | "aqua" | "ruminant";

const AREA_VISUAL: Record<
  AreaId,
  { emoji: string; blurb: string; tone: string; nutritionLabel: string }
> = {
  poultry: {
    emoji: "🐔",
    blurb:
      "Enzyme and probiotic solutions for improved feed utilization, gut health and production performance.",
    tone: "rgba(106,178,32,0.10)",
    nutritionLabel: "Poultry Nutrition",
  },
  aqua: {
    emoji: "🦐",
    blurb:
      "Probiotic and enzyme solutions for gut health, water quality, soil management and pond performance.",
    tone: "rgba(58,58,184,0.10)",
    nutritionLabel: "Aqua Nutrition",
  },
  ruminant: {
    emoji: "🐄",
    blurb:
      "Feed enzyme and probiotic solutions supporting fiber utilization, digestion and feed efficiency.",
    tone: "rgba(106,178,32,0.10)",
    nutritionLabel: "Ruminant Nutrition",
  },
};

const SOLUTION_EMOJI: Record<string, string> = {
  phytase: "🦴",
  xylanase: "🌾",
  protease: "🥩",
  "multi-enzyme": "⚗️",
  "probiotic-blend": "🦠",
};

const AQUA_EMOJI: Record<string, string> = {
  gut: "🦠",
  water: "💧",
  soil: "🪴",
  "white-gut": "🩺",
  vibrio: "⚖️",
  ammonia: "☁️",
};

export default function AnimalHealthcareProducts() {
  const [area, setArea] = useState<AreaId>("poultry");
  const [openId, setOpenId] = useState<string | null>(
    animalHealthcareSolutions[0]?.id ?? null
  );
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const selectArea = (id: AreaId) => {
    setArea(id);
    if (id === "aqua") {
      setOpenId(aquaSolutions[0]?.id ?? null);
    } else {
      setOpenId(animalHealthcareSolutions[0]?.id ?? null);
    }
    // Keep selected results in view on mobile after a tab change
    requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (!el || window.matchMedia("(min-width: 1024px)").matches) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      if (el.getBoundingClientRect().top < 64 || el.getBoundingClientRect().top > window.innerHeight * 0.45) {
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  useEffect(() => {
    setOpenId((prev) => {
      if (area === "aqua") {
        return aquaSolutions.some((s) => s.id === prev)
          ? prev
          : aquaSolutions[0]?.id ?? null;
      }
      return animalHealthcareSolutions.some((s) => s.id === prev)
        ? prev
        : animalHealthcareSolutions[0]?.id ?? null;
    });
  }, [area]);

  return (
    <div className="w-full">
      <style>{`
        @keyframes ahSwap {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        .ah-swap { animation: ahSwap .28s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      <PageHero
        breadcrumbs={[
          { label: "Industries", href: "/industries" },
          { label: "Animal Healthcare" },
        ]}
        title={
          <h1 className={`${heroTitleClass} text-fg-b`} style={heroTitleSizeLg}>
            <span className="text-fg-b">Animal</span>
            <br className="sm:hidden" />{" "}
            <span className="text-fg-b">Healthcare</span>
            <br />
            <span className="text-green">Industry</span>
          </h1>
        }
        subtitle="Poultry, Aqua and Ruminant applications under one industry, with enzymes and probiotic solutions matched to each focus area."
        stats={[
          { value: "3", label: "Focus Areas" },
          { value: "5", label: "Feed Solutions" },
          { value: "6", label: "Aqua Solutions" },
        ]}
        actions={
          <>
            <HeroScrollCta targetId="ah-areas">Explore Areas ↓</HeroScrollCta>
            <CtaButton href="/contact" variant="secondary">
              Get Quote →
            </CtaButton>
          </>
        }
        imageUrl="/assets/products/AnimalFeedEnzyme.png"
        imageAlt="Animal healthcare enzymes and probiotics"
      />

      <section id="ah-areas" className="max-w-[1160px] mx-auto px-5 lg:px-8 py-10 md:py-14 lg:py-20">
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Focus Areas
        </p>
        <h2 className={`${sectionTitleClass} mb-3`} style={sectionTitleSizeProduct}>
          Animal Nutrition Solutions
        </h2>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] max-w-[540px] mb-3">
          Targeted enzyme and probiotic solutions for poultry, aquaculture and
          ruminant nutrition.
        </p>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] max-w-[540px] mb-6 lg:mb-8">
          Choose an area to see matching solutions. Selected content updates right
          below, no hunting down the page.
        </p>

        {/* ── MOBILE: sticky segment + accordion results ── */}
        <div className="lg:hidden">
          <div className="sticky top-[64px] z-30 -mx-5 px-5 py-3 bg-bg/95 backdrop-blur-md border-b border-border">
            <div
              role="tablist"
              aria-label="Focus areas"
              className="grid grid-cols-3 gap-1 p-1 rounded-[12px] border border-border bg-bg2"
            >
              {animalHealthcareAreas.map((a) => {
                const selected = area === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectArea(a.id)}
                    className={`relative flex flex-col items-center justify-center gap-0.5 rounded-[9px] py-2.5 px-1 transition-all duration-200 active:scale-[0.97] ${selected
                      ? "bg-green text-white shadow-[0_4px_14px_rgba(106,178,32,0.28)]"
                      : "text-fg-m"
                      }`}
                  >
                    <span className="text-[1.05rem] leading-none" aria-hidden>
                      {AREA_VISUAL[a.id].emoji}
                    </span>
                    <span className="font-sans text-[0.62rem] tracking-[0.06em] uppercase font-medium">
                      {a.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="font-sans text-[0.78rem] text-fg-m leading-[1.5] mt-2.5 mb-0 text-center">
              {AREA_VISUAL[area].blurb}
            </p>
          </div>

          <div ref={resultsRef} className="pt-5">
            <div key={area} className="ah-swap">
              {area === "aqua" ? (
                <MobileAquaList
                  openId={openId}
                  setOpenId={setOpenId}
                />
              ) : (
                <MobileSolutionList
                  area={area}
                  openId={openId}
                  setOpenId={setOpenId}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── DESKTOP: original card grid ── */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-4 mb-12">
            {animalHealthcareAreas.map((a) => {
              const vis = AREA_VISUAL[a.id];
              const selected = area === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => selectArea(a.id)}
                  className={`text-left rounded-[14px] border p-6 transition-all duration-200 ${selected
                    ? "border-green bg-[rgba(106,178,32,0.08)] shadow-[0_8px_24px_rgba(106,178,32,0.12)]"
                    : "border-border bg-card hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2"
                    }`}
                >
                  <div
                    className="w-12 h-12 rounded-[12px] border border-border flex items-center justify-center text-[1.5rem] mb-4"
                    style={{ background: vis.tone }}
                    aria-hidden
                  >
                    {vis.emoji}
                  </div>
                  <h3 className="font-sans text-[1.2rem] font-semibold text-fg-b mb-1.5">
                    {a.label}
                  </h3>
                  <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.65] m-0">
                    {vis.blurb}
                  </p>
                  {selected && (
                    <p className="font-sans text-[0.55rem] tracking-[0.14em] uppercase text-green mt-4 mb-0">
                      Selected ↓
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {area === "aqua" ? (
            <div>
              <div className="mb-8">
                <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
                  Aqua Nutrition
                </p>
                <h2
                  className={`${sectionTitleClass} text-[clamp(1.35rem,2.4vw,1.85rem)]`}
                >
                  Enzymes & Probiotics
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {aquaSolutions.map((sol) => (
                  <div
                    key={sol.id}
                    className="flex flex-col gap-3 p-5 rounded-[14px] border border-border bg-card hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 transition-all"
                  >
                    <div className="w-10 h-10 rounded-[10px] border border-[rgba(58,58,184,0.2)] bg-[rgba(58,58,184,0.06)] flex items-center justify-center text-lg">
                      {AQUA_EMOJI[sol.id] ?? "🦐"}
                    </div>
                    <h3 className="font-sans text-[1.05rem] font-semibold text-fg-b leading-snug">
                      {sol.name}
                    </h3>
                    <p className="font-sans font-light text-fg-m text-[0.86rem] leading-[1.7] m-0">
                      {sol.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
                {AREA_VISUAL[area].nutritionLabel}
              </p>
              <h2
                className={`${sectionTitleClass} mb-8 text-[clamp(1.35rem,2.4vw,1.85rem)]`}
              >
                Enzymes & Probiotics
              </h2>

              <div className="grid grid-cols-2 gap-5">
                {animalHealthcareSolutions.map((sol) => (
                  <DesktopSolutionCard key={sol.id} sol={sol} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <PageCtaBand
        title={"Get in touch about\nanimal healthcare"}
        body="Contact our team about Poultry, Aqua and Ruminant enzyme and probiotic solutions."
      />
    </div>
  );
}

function MobileSolutionList({
  area,
  openId,
  setOpenId,
}: {
  area: AreaId;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <div>
          <p className="font-sans text-[0.58rem] tracking-[0.18em] uppercase text-green mb-1">
            {AREA_VISUAL[area].nutritionLabel}
          </p>
          <h3 className="font-sans text-[1.25rem] font-semibold text-fg-b m-0">
            Enzymes & Probiotics
          </h3>
        </div>
      </div>
      <p className="font-sans text-[0.78rem] text-fg-m mb-4">
        Tap a solution to expand benefits.
      </p>
      <div className="flex flex-col gap-2.5">
        {animalHealthcareSolutions.map((sol) => {
          const open = openId === sol.id;
          return (
            <button
              key={sol.id}
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : sol.id)}
              className={`w-full text-left rounded-[14px] border transition-all duration-200 active:scale-[0.99] ${open
                ? "border-green bg-[rgba(106,178,32,0.08)] shadow-[0_6px_20px_rgba(106,178,32,0.12)]"
                : "border-border bg-card"
                }`}
            >
              <div className="flex items-start gap-3 p-4">
                <div
                  className={`w-11 h-11 rounded-[10px] border flex items-center justify-center text-[1.15rem] flex-shrink-0 ${open
                    ? "border-green bg-[rgba(106,178,32,0.12)]"
                    : "border-[rgba(106,178,32,0.25)] bg-[rgba(106,178,32,0.08)]"
                    }`}
                  aria-hidden
                >
                  {SOLUTION_EMOJI[sol.id] ?? "⚗️"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-sans text-[1.05rem] font-semibold text-fg-b m-0 leading-snug">
                      {sol.name}
                    </h4>
                    <span
                      className={`font-sans text-[0.7rem] text-fg-m transition-transform duration-200 ${open ? "rotate-180 text-green" : ""
                        }`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </div>
                  <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.65] mt-1.5 mb-0">
                    {sol.description}
                  </p>
                </div>
              </div>
              {open && (
                <div className="px-4 pb-4 pt-0 border-t border-[rgba(106,178,32,0.18)] mx-4">
                  <p className="font-sans text-[0.52rem] tracking-[0.14em] uppercase text-green mt-3 mb-2.5">
                    Key Benefits
                  </p>
                  <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                    {sol.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 font-sans text-[0.84rem] text-fg-b leading-[1.45]"
                      >
                        <span className="text-green mt-0.5 flex-shrink-0" aria-hidden>
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <CtaButton href="/contact" size="sm" className="w-full justify-center">
                      Ask about {sol.name} →
                    </CtaButton>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileAquaList({
  openId,
  setOpenId,
}: {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="font-sans text-[0.58rem] tracking-[0.18em] uppercase text-green mb-1">
            Aqua Nutrition
          </p>
          <h3 className="font-sans text-[1.25rem] font-semibold text-fg-b m-0">
            Enzymes & Probiotics
          </h3>
        </div>
      </div>
      <p className="font-sans text-[0.78rem] text-fg-m mb-4">
        Tap a solution to expand details.
      </p>
      <div className="flex flex-col gap-2.5">
        {aquaSolutions.map((sol: AquaSolution) => {
          const open = openId === sol.id;
          return (
            <button
              key={sol.id}
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : sol.id)}
              className={`w-full text-left rounded-[14px] border transition-all duration-200 active:scale-[0.99] ${open
                ? "border-[rgba(58,58,184,0.55)] bg-[rgba(58,58,184,0.08)]"
                : "border-border bg-card"
                }`}
            >
              <div className="flex items-start gap-3 p-4">
                <div
                  className="w-11 h-11 rounded-[10px] border border-[rgba(58,58,184,0.2)] bg-[rgba(58,58,184,0.06)] flex items-center justify-center text-[1.15rem] flex-shrink-0"
                  aria-hidden
                >
                  {AQUA_EMOJI[sol.id] ?? "🦐"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-sans text-[1.05rem] font-semibold text-fg-b m-0 leading-snug">
                      {sol.name}
                    </h4>
                    <span
                      className={`font-sans text-[0.7rem] text-fg-m transition-transform duration-200 ${open ? "rotate-180 text-indigo-l" : ""
                        }`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </div>
                  {open && (
                    <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.65] mt-2 mb-0">
                      {sol.description}
                    </p>
                  )}
                  {!open && (
                    <p
                      className="font-sans font-light text-fg-m text-[0.8rem] leading-[1.5] mt-1.5 mb-0 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {sol.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DesktopSolutionCard({ sol }: { sol: AnimalSolution }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-[14px] border border-border bg-card hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 transition-all">
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-[10px] border border-[rgba(106,178,32,0.25)] bg-[rgba(106,178,32,0.08)] flex items-center justify-center text-[1.2rem] flex-shrink-0"
          aria-hidden
        >
          {SOLUTION_EMOJI[sol.id] ?? "⚗️"}
        </div>
        <div>
          <h3 className="font-sans text-[1.15rem] font-semibold text-fg-b mb-1.5">
            {sol.name}
          </h3>
          <p className="font-sans font-light text-fg-m text-[0.88rem] leading-[1.7] m-0">
            {sol.description}
          </p>
        </div>
      </div>
      <div className="pt-1">
        <p className="font-sans text-[0.52rem] tracking-[0.14em] uppercase text-green mb-2.5">
          Key Benefits
        </p>
        <div className="flex flex-wrap gap-2">
          {sol.benefits.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 font-sans text-[0.78rem] text-fg-b px-3 py-1.5 rounded-full border border-border bg-bg2"
            >
              <span className="text-green text-[0.65rem]" aria-hidden>
                ✓
              </span>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
