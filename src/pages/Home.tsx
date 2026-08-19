import { useEffect, lazy, Suspense } from "react";
import { Link } from "wouter";
import { CtaButton } from "@/components/CtaButton";
import { industriesWeServe } from "@/data/siteStructure";

const DnaCanvas = lazy(() =>
  import("@/components/DnaCanvas").then((m) => ({ default: m.DnaCanvas }))
);

const ANSEL = "ANSEL".split("");
const BIOTECH = "BIOTECH".split("");

const WHAT_WE_DO_CARDS = [
  {
    i: "🧬",
    t: "Manufacture & Supply",
    d: "ANSEL Biotech manufactures and supplies enzymes, probiotics and biotech solutions for animal health, aquaculture, food processing and industrial applications.",
  },
  {
    i: "📈",
    t: "Engineered for Performance",
    d: "Solutions designed to improve gut health, feed utilization, water & soil quality, textile processing, detergent performance, leather processing and food processing efficiency.",
  },
  {
    i: "🏭",
    t: "Application-Driven Solutions",
    d: "Practical, consistent and cost-effective biotechnology solutions developed for commercial applications across Animal Health, Aquaculture, Textile, Detergent, Leather and Food Processing.",
  },
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const marqueeHalf = Array.from({ length: 4 }, () => industriesWeServe).flat();
  const marqueeItems = [...marqueeHalf, ...marqueeHalf];

  return (
    <div className="w-full">
      {/* HERO */}
      <section
        className="hero relative w-full h-[100svh] min-h-[640px] flex flex-col overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 68% 46%, rgba(106,178,32,0.09), transparent 58%), radial-gradient(circle at 28% 22%, rgba(58,58,184,0.07), transparent 55%)",
        }}
      >
        <Suspense fallback={null}>
          <DnaCanvas />
        </Suspense>

        <div className="relative z-10 flex-1 flex items-center px-[6vw] md:px-[9vw] pt-[88px] md:pt-0">
          <div className="flex flex-col gap-5 md:gap-7 max-w-full md:max-w-[560px] w-full">
            <p className="font-sans text-[0.62rem] md:text-[0.72rem] tracking-[0.22em] uppercase text-fg-m animate-[fadeUp_0.8s_ease-out_both]">
              Enzyme Technology • Probiotics • Bioprocess Solutions
            </p>

            <h1
              className="font-serif font-bold leading-[0.91] tracking-[-0.015em] text-fg-b animate-[fadeUp_0.8s_0.1s_ease-out_both]"
              style={{
                perspective: "800px",
                fontSize: "clamp(2.6rem, 7vw, 5.6rem)",
              }}
            >
              <span className="block overflow-visible wa-word" style={{ color: "#7FA239" }}>
                {ANSEL.map((ch, i) => (
                  <span
                    key={`a-${i}`}
                    className="ltr-a inline-block transition-transform duration-300 will-change-transform hover:scale-110"
                    style={{ transformOrigin: "50% 85%" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span className="block overflow-visible wb-word" style={{ color: "#382995" }}>
                {BIOTECH.map((ch, i) => (
                  <span
                    key={`b-${i}`}
                    className="ltr-b inline-block transition-transform duration-300 will-change-transform hover:scale-110"
                    style={{ transformOrigin: "50% 85%" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </h1>

            <p
              className="font-sans font-light text-fg-m max-w-[400px] animate-[fadeUp_0.8s_0.2s_ease-out_both]"
              style={{
                fontSize: "clamp(0.95rem, 1.3vw, 1.16rem)",
                lineHeight: 1.85,
              }}
            >
              Science-driven solutions for Animal Health, Food &amp; Industrial
              Processing.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-1 animate-[fadeUp_0.8s_0.3s_ease-out_both]">
              <CtaButton href="/products">
                Explore Products <span>→</span>
              </CtaButton>
              <CtaButton href="/contact" variant="secondary">
                Talk to Our Team
              </CtaButton>
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-[112px] flex-col items-center gap-1 z-20 pointer-events-none animate-[fadeIn_1.2s_1.4s_ease-out_both]">
          <span className="font-sans text-[0.55rem] tracking-[0.22em] uppercase text-fg-m mb-1.5 opacity-70">
            Scroll
          </span>
          <div className="w-[11px] h-[11px] border-r-[1.5px] border-b-[1.5px] border-fg-m animate-[chev_1.8s_0s_infinite]" style={{ transform: "rotate(45deg)" }} />
          <div className="w-[11px] h-[11px] border-r-[1.5px] border-b-[1.5px] border-fg-m -mt-[7px] animate-[chev_1.8s_0.18s_infinite]" style={{ transform: "rotate(45deg)" }} />
          <div className="w-[11px] h-[11px] border-r-[1.5px] border-b-[1.5px] border-fg-m -mt-[7px] animate-[chev_1.8s_0.36s_infinite]" style={{ transform: "rotate(45deg)" }} />
        </div>

        <div className="relative z-10 flex flex-wrap border-t border-border bg-glass backdrop-blur-xl animate-[fadeUp_0.9s_0.5s_ease-out_both]">
          {[
            { v: "12+", l: "Years of Biotechnology Experience" },
            { v: "5+", l: "Industries Serving Diverse Applications" },
            { v: "Vadodara", l: "India · Manufacturing Facility" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-cell flex-1 basis-1/2 sm:basis-auto px-4 py-3 md:px-7 md:py-4 border-r border-border last:border-r-0 max-sm:[&:nth-child(2n)]:border-r-0 max-sm:[&:nth-child(-n+2)]:border-b max-sm:[&:nth-child(-n+2)]:border-border transition-colors hover:bg-[rgba(106,178,32,0.05)] cursor-default"
            >
              <div
                className="sv font-sans text-stat tracking-[0.02em] transition-colors font-semibold"
                style={{ fontSize: "clamp(1.15rem, 1.65vw, 1.65rem)" }}
              >
                {stat.v}
              </div>
              <div className="font-sans text-[0.54rem] md:text-[0.6rem] tracking-[0.12em] uppercase text-fg-m opacity-60 mt-1">
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do — full viewport, original kit + marquee */}
      <section
        className="relative w-full flex items-center bg-background py-16 md:py-[90px] min-h-[100svh] lg:h-[100svh]"
      >
        <div className="w-full max-w-[1160px] mx-auto px-5 md:px-10">
          <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3 reveal">
            What We Do
          </p>
          <h2
            className="font-serif font-semibold text-fg-b leading-[1.02] mb-10 md:mb-12 reveal"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
              transitionDelay: "80ms",
            }}
          >
            Biotechnology Built
            <br />
            for Performance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] border border-border rounded-[12px] overflow-hidden bg-border">
            {WHAT_WE_DO_CARDS.map((card, i) => (
              <div
                key={card.t}
                className="why-card group bg-background p-8 md:p-10 flex flex-col gap-4 transition-colors duration-300 hover:bg-bg2 cursor-default reveal"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="text-[2rem] leading-none">{card.i}</div>
                <div className="font-sans text-[1.25rem] font-semibold text-fg-b leading-[1.2]">
                  {card.t}
                </div>
                <p className="font-sans text-[0.97rem] font-light text-fg-m leading-[1.85] m-0">
                  {card.d}
                </p>
                <div className="mt-auto h-[2px] w-6 bg-green rounded-[1px] opacity-0 origin-left scale-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100" />
              </div>
            ))}
          </div>

          {/* Industries marquee */}
          <div className="mt-12 md:mt-[46px] -mx-[6vw] md:mx-[calc(50%-50vw)] overflow-hidden border-t border-b border-border bg-transparent">
            <p className="font-sans text-[0.6rem] tracking-[0.22em] uppercase text-fg-m opacity-60 text-center py-3.5 border-b border-border m-0">
              Industries We Serve
            </p>
            <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
              {marqueeItems.map((item, i) => (
                <Link
                  key={`${item.id}-${i}`}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 font-sans text-[0.7rem] tracking-[0.12em] uppercase text-fg-m px-8 py-3 border-r border-border whitespace-nowrap transition-colors hover:text-green"
                >
                  <span className="text-[0.85rem] leading-none" aria-hidden>
                    {item.emoji}
                  </span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
