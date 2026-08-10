import type { ReactNode } from "react";
import { CtaButton } from "@/components/CtaButton";

type PageCtaBandProps = {
  /** Small green eyebrow — default matches Textile */
  eyebrow?: string;
  title: ReactNode;
  body: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  /** Optional custom primary (e.g. quote modal button) */
  primaryAction?: ReactNode;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/**
 * Shared ending CTA — Textile format.
 * Label + title + body + two buttons. Short band, not full viewport.
 */
export function PageCtaBand({
  eyebrow = "Ready to Optimise?",
  title,
  body,
  primaryLabel = "Contact Our Team →",
  primaryHref = "/contact",
  primaryAction,
  secondaryLabel = "← All Products",
  secondaryHref = "/products",
}: PageCtaBandProps) {
  return (
    <section
      className="relative py-12 md:py-16 border-t border-border overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 110%, rgba(106,178,32,0.09), transparent 55%)",
      }}
    >
      <div className="relative z-10 max-w-[700px] mx-auto px-5 lg:px-8 text-center">
        <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">
          {eyebrow}
        </p>
        <h2
          className="font-sans font-bold text-fg-b leading-[1.05] mb-3 whitespace-pre-line"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
        >
          {title}
        </h2>
        <p className="font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] mb-6 max-w-[460px] mx-auto">
          {body}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {primaryAction ?? (
            <CtaButton href={primaryHref}>{primaryLabel}</CtaButton>
          )}
          <CtaButton href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
