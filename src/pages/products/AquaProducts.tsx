import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { PageCtaBand } from "@/components/PageCtaBand";
import { aquaSolutions } from "@/data/animalHealthcareContent";

const AQUA_EMOJI: Record<string, string> = {
  gut: "🦠",
  water: "💧",
  soil: "🪴",
  "white-gut": "🩺",
  vibrio: "⚖️",
  ammonia: "☁️",
};

export default function AquaProducts() {
  return (
    <div className="w-full">
      <PageHero
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Animal Healthcare", href: "/products/animal-healthcare" },
          { label: "Aqua" },
        ]}
        title={
          <h1
            className="font-serif font-bold leading-[0.93] tracking-[-0.015em] text-fg-b"
            style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.6rem)" }}
          >
            Aquaculture
            <br />
            <span className="text-green">Solutions</span>
          </h1>
        }
        subtitle="Aquaculture solutions under Animal Healthcare for gut, water, soil and pond conditions."
        below={
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-border bg-card">
              <span className="font-sans text-[0.9rem] text-green font-medium leading-none">6</span>
              <span className="font-sans text-[0.52rem] tracking-[0.12em] uppercase text-fg-m">
                Solution Areas
              </span>
            </div>
          </div>
        }
        actions={
          <>
            <HeroScrollCta targetId="aqua-solutions">View Solutions ↓</HeroScrollCta>
            <CtaButton href="/contact" variant="secondary">
              Get Quote →
            </CtaButton>
          </>
        }
        imageUrl="/assets/products/water_1.png"
        imageAlt="Aquaculture solutions"
      />

      <section
        id="aqua-solutions"
        className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-20"
      >
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Aquaculture Solutions
        </p>
        <h2
          className="font-serif font-bold text-fg-b leading-[1.02] mb-8 md:mb-10"
          style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
        >
          Solution areas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {aquaSolutions.map((sol) => (
            <div
              key={sol.id}
              className="flex flex-col gap-3 p-5 sm:p-6 rounded-[14px] border border-border bg-card hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 transition-all"
            >
              <div className="w-11 h-11 rounded-[10px] border border-[rgba(58,58,184,0.2)] bg-[rgba(58,58,184,0.06)] flex items-center justify-center text-[1.2rem]">
                {AQUA_EMOJI[sol.id] ?? "🦐"}
              </div>
              <h3 className="font-serif text-[1.1rem] font-semibold text-fg-b leading-[1.25]">
                {sol.name}
              </h3>
              <p className="font-sans font-light text-fg-m text-[0.88rem] leading-[1.7] m-0">
                {sol.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <PageCtaBand
        title={"Get in touch about\naquaculture solutions"}
        body="Contact our team about aquaculture solutions under Animal Healthcare."
        secondaryLabel="← Animal Healthcare"
        secondaryHref="/products/animal-healthcare"
      />
    </div>
  );
}
