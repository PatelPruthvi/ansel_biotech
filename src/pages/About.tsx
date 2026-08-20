import { useEffect } from "react";
import { AboutHeroVisual } from "@/components/AboutHeroVisual";
import { CoreValues } from "@/components/CoreValues";
import { CtaButton } from "@/components/CtaButton";
import { PageCtaBand } from "@/components/PageCtaBand";

export default function About() {
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

  return (
    <div className="w-full">
      <section
        className="relative w-full grid grid-cols-1 lg:grid-cols-[42fr_58fr] lg:min-h-[100svh] overflow-x-hidden bg-background"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(106,178,32,0.07), transparent 60%), radial-gradient(ellipse at 15% 30%, rgba(58,58,184,0.05), transparent 55%)",
        }}
      >
        <div className="relative z-10 min-w-0 overflow-visible flex flex-col justify-center pt-[120px] pb-8 px-[6vw] lg:pt-[108px] lg:pb-16 lg:pl-[9vw] lg:pr-[4vw]">
          <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3.5 animate-[fadeUp_0.8s_ease-out_both]">
            Who We Are
          </p>
          <h1
            className="font-serif font-bold leading-[1.04] tracking-[-0.015em] text-fg-b mb-5 overflow-visible animate-[fadeUp_0.8s_0.1s_ease-out_both]"
            style={{ fontSize: "clamp(2.4rem, 4.4vw, 4.4rem)" }}
          >
            <span className="text-green">Biotech Solutions</span>
            <br />
            <span className="text-indigo-l">Provider</span>
          </h1>
          <p
            className="font-sans font-light text-fg-m leading-[1.85] mb-8 max-w-[460px] animate-[fadeUp_0.8s_0.2s_ease-out_both]"
            style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)" }}
          >
            Ansel Biotech develops and supplies high-performance enzymes, probiotics and application-specific biotechnology solutions for Animal Health, Aquaculture, Food Processing and Industrial Applications.
          </p>

          <p className="font-sans text-[0.58rem] tracking-[0.18em] uppercase text-fg-m opacity-60 mb-3 animate-[fadeUp_0.8s_0.3s_ease-out_both]">
            Our Portfolio
          </p>
          <div className="flex flex-wrap gap-[7px] mb-2.5 animate-[fadeUp_0.8s_0.35s_ease-out_both]">
            {[
              { e: "🦠", l: "Probiotic Strains", ind: false },
              { e: "🌾", l: "Feed Enzymes", ind: true },
              { e: "⚗️", l: "Industrial Enzymes", ind: false },
              { e: "🧪", l: "Custom Formulations", ind: true },
            ].map((c, i) => (
              <span
                key={i}
                className={`chip ${c.ind ? "chip-ind" : ""} inline-flex items-center gap-1.5 font-sans text-[0.58rem] tracking-[0.09em] uppercase px-3 py-[5px] border border-border-m rounded-full text-fg-m cursor-default whitespace-nowrap`}
              >
                <span className="text-[0.85rem] tracking-normal normal-case leading-none" aria-hidden>
                  {c.e}
                </span>
                {c.l}
              </span>
            ))}
          </div>
        </div>

        <div className="relative w-full min-w-0 flex items-center justify-center px-[4vw] pb-10 lg:px-4 lg:pl-4 lg:pr-[4vw] lg:pb-16 lg:pt-[108px]">
          <div className="relative w-full max-w-[720px] h-[340px] sm:h-[400px] lg:h-[min(540px,calc(100svh-170px))] min-h-[300px]">
            <AboutHeroVisual />
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-[100px] bg-bg2">
        <div className="max-w-[1160px] mx-auto px-5 md:px-10">
          <div className="mb-10 md:mb-[52px]">
            <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3 reveal">
              Who We Are
            </p>
            <h2
              className="font-sans font-semibold text-fg-b leading-[1.15] reveal"
              style={{
                fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
                transitionDelay: "80ms",
              }}
            >
              Built on biotechnology, driven by application
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] border border-border rounded-[12px] overflow-hidden bg-border">
            {[
              {
                n: "01 · Specialize",
                t: "Probiotics & Enzymes<br/>for <span class='text-green'>Diverse Applications</span>",
                d: "A biotechnology company focused on probiotics and enzymes for animal healthcare, aquaculture, food processing and industrial applications.",
              },
              {
                n: "02 · Develop",
                t: "Application-Driven<br/><span class='text-green'>Product</span> Development",
                d: "Biotechnology expertise applied to the process in front of us — practical, consistent solutions for specific requirements.",
              },
              {
                n: "03 · Portfolio",
                t: "Strains, Enzymes &<br/><span class='text-green'>Custom</span> Formulations",
                d: "The portfolio covers probiotic solutions, feed enzymes, industrial enzymes and customized formulations.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="relative bg-background p-8 md:p-10 flex flex-col gap-5 transition-colors duration-300 hover:bg-bg3 cursor-default group reveal"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-fg-d">
                  {pillar.n}
                </div>
                <div
                  className="font-sans text-[1.35rem] font-semibold text-fg-b leading-[1.15]"
                  dangerouslySetInnerHTML={{ __html: pillar.t }}
                />
                <p className="font-sans text-[1rem] font-light text-fg-m leading-[1.9] m-0">
                  {pillar.d}
                </p>
                <div className="mt-auto h-[2px] w-7 bg-green rounded-[1px] opacity-0 origin-left scale-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoreValues />

      {/* Our Approach */}
      <section className="py-16 md:py-[100px]">
        <div className="max-w-[1160px] mx-auto px-5 md:px-10">
          <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3 reveal">
            Our Approach
          </p>
          <h2
            className="font-sans font-semibold text-fg-b leading-[1.02] reveal"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
              transitionDelay: "80ms",
            }}
          >
            From Application
            <br />
            to Performance
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-12 md:mt-[52px]">
            <div
              className="font-sans text-[1.05rem] font-light leading-[1.95] text-fg-m reveal"
              style={{ transitionDelay: "160ms" }}
            >
              <p className="mb-[18px]">
                Understand the application → Select the right biotechnology →
                Optimize the formulation → Deliver consistent performance.
              </p>
              <p className="mb-8">
                Biotechnology expertise applied to commercial use — practical,
                consistent and suitable for scale.
              </p>
              <div className="flex flex-wrap gap-3">
                <CtaButton href="/products">Explore Products →</CtaButton>
                <CtaButton href="/contact" variant="secondary">
                  Talk to Our Team
                </CtaButton>
              </div>
            </div>

            <div
              className="flex flex-col reveal from-right"
              style={{ transitionDelay: "200ms" }}
            >
              {[
                {
                  n: "01 · Understand",
                  b: "Understand the application and process requirements first.",
                },
                {
                  n: "02 · Select",
                  b: "Select the right biotechnology for the job.",
                },
                {
                  n: "03 · Optimize",
                  b: "Optimize the formulation for commercial conditions.",
                },
                {
                  n: "04 · Deliver",
                  b: "Deliver consistent performance at scale.",
                },
              ].map((v, i) => (
                <div
                  key={i}
                  className="val py-7 px-7 md:px-8 border-l-2 border-border-m transition-all duration-200 hover:border-green hover:bg-[rgba(106,178,32,0.04)] hover:pl-[38px] cursor-default"
                >
                  <div className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-green mb-2">
                    {v.n}
                  </div>
                  <div className="font-sans text-[0.97rem] font-light text-fg-m leading-[1.8]">
                    {v.b}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCtaBand
        title={"Talk to the team"}
        body="Share your application and we will match the right strain, enzyme or formulation."
        secondaryLabel="Explore Products"
        secondaryHref="/products"
      />
    </div>
  );
}
