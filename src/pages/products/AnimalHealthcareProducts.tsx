import { useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { PageCtaBand } from "@/components/PageCtaBand";
import {
  animalHealthcareAreas,
  animalHealthcareSolutions,
  aquaSolutions,
} from "@/data/animalHealthcareContent";

type AreaId = "poultry" | "aqua" | "ruminant";

const AREA_VISUAL: Record<
  AreaId,
  { emoji: string; blurb: string; tone: string }
> = {
  poultry: {
    emoji: "🐔",
    blurb: "Poultry feed optimization with enzyme and probiotic solutions.",
    tone: "rgba(106,178,32,0.10)",
  },
  aqua: {
    emoji: "🦐",
    blurb: "Aquaculture solutions for gut, water, soil and pond conditions.",
    tone: "rgba(58,58,184,0.10)",
  },
  ruminant: {
    emoji: "🐄",
    blurb: "Ruminant feed processing with enzyme and probiotic support.",
    tone: "rgba(106,178,32,0.10)",
  },
};

const SOLUTION_EMOJI: Record<string, string> = {
  phytase: "🦴",
  xylanase: "🌾",
  protease: "🥩",
  "multi-enzyme": "⚗️",
  "probiotic-blend": "🦠",
};

export default function AnimalHealthcareProducts() {
  const [area, setArea] = useState<AreaId>("poultry");

  return (
    <div className="w-full">
      <PageHero
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Animal Healthcare" },
        ]}
        title={
          <h1
            className="font-serif font-bold leading-[0.93] tracking-[-0.015em] text-fg-b"
            style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.6rem)" }}
          >
            Animal
            <br />
            <span className="text-green">Healthcare</span>
          </h1>
        }
        subtitle="Poultry, Aqua and Ruminant applications under one industry, with enzymes and probiotic solutions matched to each focus area."
        below={
          <div className="flex flex-wrap gap-2">
            {[
              { val: "3", label: "Focus Areas" },
              { val: "5", label: "Feed Solutions" },
              { val: "6", label: "Aqua Solutions" },
            ].map((s) => (
              <div
                key={s.label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-border bg-card"
              >
                <span className="font-sans text-[0.9rem] text-green font-medium leading-none">
                  {s.val}
                </span>
                <span className="font-sans text-[0.52rem] tracking-[0.12em] uppercase text-fg-m">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        }
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

      <section id="ah-areas" className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-20">
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Focus Areas
        </p>
        <h2
          className="font-serif font-bold text-fg-b leading-[1.02] mb-3"
          style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
        >
          Three areas. One industry.
        </h2>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] max-w-[540px] mb-8">
          Select an area to see matching solutions. Aqua includes dedicated aquaculture
          formulations on this page, with a deeper Aqua page when you need it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-12">
          {animalHealthcareAreas.map((a) => {
            const vis = AREA_VISUAL[a.id];
            const selected = area === a.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setArea(a.id)}
                className={`text-left rounded-[14px] border p-5 md:p-6 transition-all duration-200 ${
                  selected
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
                <h3 className="font-serif text-[1.2rem] font-semibold text-fg-b mb-1.5">
                  {a.label}
                </h3>
                <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.65] m-0">
                  {vis.blurb}
                </p>
              </button>
            );
          })}
        </div>

        {area === "aqua" ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
                  Aquaculture Solutions
                </p>
                <h2
                  className="font-serif font-semibold text-fg-b leading-[1.05]"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}
                >
                  Solutions for ponds and feed
                </h2>
              </div>
              <CtaButton href="/products/aqua" variant="secondary" size="sm">
                Open Aqua page →
              </CtaButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aquaSolutions.map((sol) => (
                <div
                  key={sol.id}
                  className="flex flex-col gap-3 p-5 rounded-[14px] border border-border bg-card hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 transition-all"
                >
                  <div className="w-10 h-10 rounded-[10px] border border-[rgba(58,58,184,0.2)] bg-[rgba(58,58,184,0.06)] flex items-center justify-center text-lg">
                    🦐
                  </div>
                  <h3 className="font-serif text-[1.05rem] font-semibold text-fg-b leading-snug">
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
              {area === "poultry" ? "Poultry" : "Ruminant"} Solutions
            </p>
            <h2
              className="font-serif font-semibold text-fg-b leading-[1.05] mb-8"
              style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}
            >
              Enzymes & probiotic blend
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
              {animalHealthcareSolutions.map((sol) => (
                <div
                  key={sol.id}
                  className="flex flex-col gap-4 p-5 sm:p-6 rounded-[14px] border border-border bg-card hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-11 h-11 rounded-[10px] border border-[rgba(106,178,32,0.25)] bg-[rgba(106,178,32,0.08)] flex items-center justify-center text-[1.2rem] flex-shrink-0"
                      aria-hidden
                    >
                      {SOLUTION_EMOJI[sol.id] ?? "⚗️"}
                    </div>
                    <div>
                      <h3 className="font-serif text-[1.15rem] font-semibold text-fg-b mb-1.5">
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
              ))}
            </div>
          </div>
        )}
      </section>

      <PageCtaBand
        title={"Get in touch about\nanimal healthcare"}
        body="Contact our team about Poultry, Aqua and Ruminant enzyme and probiotic solutions."
      />
    </div>
  );
}
