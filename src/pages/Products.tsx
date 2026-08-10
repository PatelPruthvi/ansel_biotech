import { Link } from "wouter";
import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { productCategories } from "@/data/siteStructure";

export default function Products() {
  return (
    <div className="w-full">
      <PageHero
        eyebrow="Products"
        title={
          <h1
            className="font-serif font-bold leading-[0.9] tracking-[-0.02em] text-fg-b"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}
          >
            Products &amp;
            <br />
            <span className="text-green">Solutions</span>
          </h1>
        }
        subtitle="Two product lines: probiotic strains and enzymes, built for animal healthcare, food and industrial processing."
        stats={[{ value: "2", label: "Categories" }]}
        actions={
          <>
            <HeroScrollCta targetId="product-categories">Explore Categories ↓</HeroScrollCta>
            <CtaButton href="/industries" variant="secondary">
              Industries →
            </CtaButton>
          </>
        }
        imageUrl="/assets/products/PharmaEnzyme.png"
        imageAlt="Ansel Biotech products"
      />

      <section
        id="product-categories"
        className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-20"
      >
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Our Products
        </p>
        <h2
          className="font-sans font-semibold text-fg-b leading-[1.05] mb-3"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
        >
          Choose a category
        </h2>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] max-w-[480px] mb-10">
          Start with the portfolio that fits your application.
        </p>

        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          {productCategories.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group relative flex flex-col rounded-[14px] border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:border-[rgba(106,178,32,0.4)]"
            >
              <div className="relative h-[160px] sm:h-[180px] overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--card) 0%, transparent 55%), linear-gradient(to right, rgba(0,0,0,0.15), transparent)",
                  }}
                />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-[10px] border border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.35)] backdrop-blur-sm flex items-center justify-center text-[1.3rem]">
                  {p.icon}
                </div>
              </div>
              <div className="relative z-10 flex flex-col flex-1 p-6 md:p-7 pt-2">
                <span className="font-sans text-[0.52rem] tracking-[0.14em] uppercase text-fg-m mb-2">
                  {p.tag}
                </span>
                <h3 className="font-sans text-[1.4rem] font-semibold text-fg-b mb-2 group-hover:text-green transition-colors">
                  {p.name}
                </h3>
                <p className="font-sans text-[0.9rem] font-light leading-[1.7] text-fg-m m-0 mb-5 flex-grow">
                  {p.desc}
                </p>
                <span className="font-sans text-[0.62rem] tracking-[0.12em] uppercase text-green">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg2">
        <div className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-2">
              Also explore
            </p>
            <h2 className="font-sans text-[1.35rem] font-semibold text-fg-b">
              Industries We Serve
            </h2>
          </div>
          <CtaButton href="/industries" variant="secondary">
            View Industries →
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
