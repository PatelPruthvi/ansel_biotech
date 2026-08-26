import { lazy, Suspense, useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import { HeroScrollCta, PageHero } from "@/components/PageHero";
import { PageCtaBand } from "@/components/PageCtaBand";
import { customEnzymeCta, enzymePortfolio } from "@/data/productContent";
import {
  sectionTitleClass,
  sectionTitleSizeProduct,
  heroTitleClass,
  heroTitleSizeLg,
} from "@/lib/typography";
import type { QuoteProduct } from "@/components/RequestQuoteModal";

const RequestQuoteModal = lazy(() =>
  import("@/components/RequestQuoteModal").then((mod) => ({
    default: mod.RequestQuoteModal,
  }))
);

const CUSTOM_QUOTE: QuoteProduct = {
  code: "CUSTOM",
  enzyme: "Customized Enzyme Formulation",
  application: "Custom formulation",
};

export default function EnzymesProducts() {
  const [quoteProduct, setQuoteProduct] = useState<QuoteProduct | null>(null);

  return (
    <div className="w-full">
      <PageHero
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Enzymes" },
        ]}
        title={
          <h1 className={`${heroTitleClass} text-fg-b`} style={heroTitleSizeLg}>
            <span className="text-fg-b">Our Enzyme</span>
            <br />
            <span className="text-green">Portfolio</span>
          </h1>
        }
        subtitle="Individual enzymes across the portfolio, with custom formulation support when you need a tailored blend."
        stats={[{ value: String(enzymePortfolio.length), label: "Enzymes" }]}
        actions={
          <>
            <HeroScrollCta targetId="enzyme-portfolio">View Portfolio ↓</HeroScrollCta>
            <CtaButton href="/contact" variant="secondary">
              Get Quote →
            </CtaButton>
          </>
        }
        imageUrl="/assets/products/PharmaEnzyme.png"
        imageAlt="Enzyme portfolio"
        imagePosition="50% 38%"
      />

      <section
        id="enzyme-portfolio"
        className="max-w-[1160px] mx-auto px-5 lg:px-8 py-14 md:py-16"
      >
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          Our Enzyme Portfolio
        </p>
        <h2 className={`${sectionTitleClass} mb-8 md:mb-10`} style={sectionTitleSizeProduct}>
          Individual enzymes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {enzymePortfolio.map((enzyme) => (
            <button
              key={enzyme.id}
              type="button"
              onClick={() =>
                setQuoteProduct({
                  code: enzyme.name.toUpperCase(),
                  enzyme: enzyme.name,
                  application: "Enzyme portfolio",
                })
              }
              className="group text-left flex flex-col gap-3 p-5 sm:p-6 rounded-[14px] border border-border bg-card transition-all duration-200 hover:border-[rgba(106,178,32,0.4)] hover:bg-bg2 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-sans text-[1.15rem] font-semibold text-fg-b group-hover:text-green transition-colors">
                  {enzyme.name}
                </h3>
                <span className="font-sans text-[0.52rem] tracking-[0.1em] uppercase text-fg-m opacity-40 group-hover:opacity-80 transition-opacity shrink-0">
                  ↗ Quote
                </span>
              </div>
              <p className="font-sans font-light text-fg-m text-[0.88rem] leading-[1.7] m-0">
                {enzyme.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      <PageCtaBand
        eyebrow="Custom Formulations"
        title={customEnzymeCta.title}
        body={customEnzymeCta.body}
        primaryAction={
          <CtaButton type="button" onClick={() => setQuoteProduct(CUSTOM_QUOTE)}>
            {customEnzymeCta.button}
          </CtaButton>
        }
      />

      <Suspense fallback={null}>
        <RequestQuoteModal
          product={quoteProduct}
          onClose={() => setQuoteProduct(null)}
        />
      </Suspense>
    </div>
  );
}
