import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { PageCtaBand } from "@/components/PageCtaBand";
import { probioticGroups } from "@/data/productContent";

const GROUP_META: Record<string, { emoji: string; tone: string }> = {
  bacillus: { emoji: "🦠", tone: "rgba(106,178,32,0.12)" },
  lactobacillus: { emoji: "🧫", tone: "rgba(58,58,184,0.10)" },
  yeast: { emoji: "🫧", tone: "rgba(106,178,32,0.10)" },
  bifidobacterium: { emoji: "🔬", tone: "rgba(58,58,184,0.10)" },
  "streptococcus-enterococcus": { emoji: "🧬", tone: "rgba(106,178,32,0.10)" },
};

export default function ProbioticsProducts() {
  const totalStrains = probioticGroups.reduce((n, g) => n + g.strains.length, 0);

  return (
    <div className="w-full">
      <PageHero
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Probiotic Strains" },
        ]}
        title={
          <h1
            className="font-serif font-bold leading-[0.93] tracking-[-0.015em] text-fg-b"
            style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.6rem)" }}
          >
            Probiotic
            <br />
            <span className="text-green">Strains</span>
          </h1>
        }
        subtitle="Actual organisms organised by genus group, ready for animal healthcare and related applications."
        below={
          <div className="flex flex-wrap gap-2">
            {[
              { v: String(probioticGroups.length), l: "Groups" },
              { v: String(totalStrains), l: "Strains" },
            ].map((s) => (
              <div
                key={s.l}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-border bg-card"
              >
                <span className="font-sans text-[0.9rem] text-green font-medium leading-none">
                  {s.v}
                </span>
                <span className="font-sans text-[0.52rem] tracking-[0.12em] uppercase text-fg-m">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        }
        actions={
          <>
            <HeroScrollCta targetId="probiotic-portfolio">View Portfolio ↓</HeroScrollCta>
            <CtaButton href="/contact" variant="secondary">
              Get Quote →
            </CtaButton>
          </>
        }
        imageUrl="/assets/products/AnimalFeedEnzyme.png"
        imageAlt="Probiotic strains"
      />

      <section
        id="probiotic-portfolio"
        className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-20"
      >
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Probiotic Portfolio
        </p>
        <h2
          className="font-serif font-bold text-fg-b leading-[1.02] mb-3"
          style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
        >
          Strains by organism group
        </h2>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] max-w-[520px] mb-10">
          Browse by genus. Each group lists the strains available in the portfolio.
        </p>

        <div className="flex flex-col gap-6 md:gap-8">
          {probioticGroups.map((group, gi) => {
            const meta = GROUP_META[group.id] ?? { emoji: "🦠", tone: "rgba(106,178,32,0.1)" };
            return (
              <div
                key={group.id}
                className="rounded-[14px] border border-border bg-card overflow-hidden"
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 md:px-8 py-4 md:py-5 border-b border-border"
                  style={{ background: meta.tone }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-11 h-11 rounded-[10px] border border-border bg-card flex items-center justify-center text-[1.35rem] leading-none"
                      aria-hidden
                    >
                      {meta.emoji}
                    </span>
                    <div>
                      <p className="font-sans text-[0.52rem] tracking-[0.16em] uppercase text-fg-m mb-0.5">
                        Group {String(gi + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-serif text-[1.25rem] md:text-[1.4rem] font-semibold text-fg-b leading-tight">
                        {group.name}
                      </h3>
                    </div>
                  </div>
                  <span className="font-sans text-[0.55rem] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border border-border bg-card text-fg-m">
                    {group.strains.length} strain{group.strains.length === 1 ? "" : "s"}
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px m-0 p-0 list-none bg-border">
                  {group.strains.map((strain) => (
                    <li
                      key={strain}
                      className="font-sans text-[0.9rem] md:text-[0.95rem] font-light text-fg-b leading-[1.45] px-5 py-4 bg-card flex items-start gap-3 transition-colors hover:bg-bg2"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green flex-shrink-0"
                        aria-hidden
                      />
                      <span className="italic">{strain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <PageCtaBand
        title={"Get in touch about\nprobiotic strains"}
        body="Contact our team about probiotic strains organised by organism group for your application."
      />
    </div>
  );
}
