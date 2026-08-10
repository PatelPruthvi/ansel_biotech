import { Link } from "wouter";
import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { PageCtaBand } from "@/components/PageCtaBand";
import { industriesWeServe } from "@/data/siteStructure";

export default function Industries() {
  return (
    <div className="w-full">
      <PageHero
        eyebrow="Industries We Serve"
        title={
          <h1
            className="font-serif font-bold leading-[0.9] tracking-[-0.02em] text-fg-b"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}
          >
            Built for
            <br />
            <span className="text-green">Industry</span>
          </h1>
        }
        subtitle="Five industries. Application-ready enzyme and probiotic solutions for each."
        below={
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-border bg-card backdrop-blur-sm">
              <span className="font-sans text-[0.9rem] text-green font-medium leading-none">5</span>
              <span className="font-sans text-[0.52rem] tracking-[0.12em] uppercase text-fg-m">
                Industries
              </span>
            </div>
          </div>
        }
        actions={
          <>
            <HeroScrollCta targetId="industry-grid">Browse Industries ↓</HeroScrollCta>
            <CtaButton href="/products" variant="secondary">
              Products →
            </CtaButton>
          </>
        }
        imageUrl="/assets/products/textile_1.png"
        imageAlt="Industries we serve"
      />

      <section
        id="industry-grid"
        className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-20"
      >
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Industries
        </p>
        <h2
          className="font-serif font-semibold text-fg-b leading-[1.05] mb-3"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
        >
          Where we apply
        </h2>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] max-w-[480px] mb-10">
          Pick an industry to see process steps, enzymes and applications.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industriesWeServe.map((ind) => (
            <Link
              key={ind.id}
              href={ind.href}
              className="group relative flex flex-col rounded-[14px] border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:border-[rgba(106,178,32,0.4)]"
            >
              <div className="relative h-[140px] overflow-hidden">
                <img
                  src={ind.imageUrl}
                  alt={ind.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.88) contrast(1.05)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--card) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-[10px] border border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.35)] backdrop-blur-sm flex items-center justify-center text-[1.35rem]">
                  {ind.emoji}
                </div>
              </div>
              <div className="relative z-10 p-5 pt-1 flex flex-col flex-1">
                <h3 className="font-serif text-[1.2rem] font-semibold text-fg-b mb-1.5 group-hover:text-green transition-colors">
                  {ind.name}
                </h3>
                <p className="font-sans text-[0.88rem] font-light leading-[1.65] text-fg-m m-0 mb-4 flex-grow">
                  {ind.blurb}
                </p>
                <span className="font-sans text-[0.58rem] tracking-[0.12em] uppercase text-green">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PageCtaBand
        title={"Get in touch about\nyour industry"}
        body="Contact our team about enzyme and probiotic solutions for Animal Healthcare, Textile, Detergent, Leather or Food."
        secondaryLabel="← Products"
        secondaryHref="/products"
      />
    </div>
  );
}
