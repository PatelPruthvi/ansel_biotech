import { ProbioticPortfolio } from "@/components/ProbioticPortfolio";
import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { PageCtaBand } from "@/components/PageCtaBand";
import { probioticGroups } from "@/data/productContent";

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
        subtitle="Organism groups from the portfolio, shown as specimens you can explore strain by strain."
        stats={[
          { value: String(probioticGroups.length), label: "Groups" },
          { value: String(totalStrains), label: "Strains" },
        ]}
        actions={
          <>
            <HeroScrollCta targetId="probiotic-portfolio">View Portfolio ↓</HeroScrollCta>
            <CtaButton href="/contact" variant="secondary">
              Get Quote →
            </CtaButton>
          </>
        }
        imageUrl="/assets/probiotics/bacillus.jpg"
        imageAlt="Bacillus probiotic specimen"
      />

      <section
        id="probiotic-portfolio"
        className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-20"
      >
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Probiotic Portfolio
        </p>
        <h2
          className="font-sans font-bold text-fg-b leading-[1.02] mb-3"
          style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
        >
          Explore by organism group
        </h2>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] max-w-[560px] mb-10">
          Choose a group to view its specimen. Tap a marker — a line identifies the strain.
        </p>

        <ProbioticPortfolio />
      </section>

      <PageCtaBand
        title={"Get in touch about\nprobiotic strains"}
        body="Contact our team about probiotic strains organised by organism group for your application."
      />
    </div>
  );
}
