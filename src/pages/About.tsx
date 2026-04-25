import { useEffect } from "react";
import { MoleculeCanvas } from "@/components/MoleculeCanvas";

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

      <section className="relative w-full grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-[100svh] lg:h-[100svh] overflow-hidden bg-background"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(106,178,32,0.07), transparent 60%), radial-gradient(ellipse at 15% 30%, rgba(58,58,184,0.05), transparent 55%)",
        }}>
        {/* LEFT */}
        <div className="relative z-10 flex flex-col justify-center pt-[120px] pb-12 px-[6vw] lg:pt-0 lg:pb-0 lg:pl-[9vw] lg:pr-[5vw]">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3.5 animate-[fadeUp_0.8s_ease-out_both]">
            Who We Are
          </p>
          <h1
            className="font-serif font-bold leading-[0.93] tracking-[-0.015em] text-fg-b mb-5 animate-[fadeUp_0.8s_0.1s_ease-out_both]"
            style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.6rem)" }}
          >
            Enzyme Science
            <br />
            at <span className="italic text-indigo-l pr-1">Commercial</span>
            <br />
            Scale
          </h1>
          <p
            className="font-sans font-light text-fg-m leading-[1.85] mb-8 max-w-[440px] animate-[fadeUp_0.8s_0.2s_ease-out_both]"
            style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)" }}
          >
            "From amylase to xylanase — biocatalysts that add value, enhance
            quality, and drive a sustainable future."
          </p>

          <p className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-fg-m opacity-60 mb-3 animate-[fadeUp_0.8s_0.3s_ease-out_both]">
            Core Capabilities
          </p>
          <div className="flex flex-wrap gap-[7px] mb-2.5 animate-[fadeUp_0.8s_0.35s_ease-out_both]">
            {[
              { l: "⚗️ Custom Formulations", ind: false },
              { l: "🧪 Application Support", ind: true },
              { l: "🏭 Commercial Scale", ind: false },
              { l: "✅ ISO Quality", ind: true },
              { l: "📦 Bulk Supply", ind: false },
              { l: "🌿 Eco-Friendly", ind: true },
            ].map((c, i) => (
              <span
                key={i}
                className={`chip ${c.ind ? "chip-ind" : ""} font-mono text-[0.58rem] tracking-[0.09em] uppercase px-3 py-[5px] border border-border-m rounded-full text-fg-m cursor-default whitespace-nowrap transition-[background,border-color,color,transform]`}
              >
                {c.l}
              </span>
            ))}
          </div>
          <div className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-fg-m opacity-60 mt-2 animate-[fadeUp_0.8s_0.26s_ease-out_both]">
            Industries: sugar · textile · food · pharma · more
          </div>
        </div>

        {/* RIGHT — molecule, no outer card */}
        <div className="relative w-full hidden lg:flex h-full items-center justify-center px-5 pb-8 lg:pl-8 lg:pr-[5vw] lg:pb-0">
          <div className="relative w-full max-w-[600px] h-full max-h-[540px] min-h-[260px] rounded-[18px] border border-border bg-[radial-gradient(ellipse_at_55%_45%,rgba(106,178,32,0.06),transparent_65%)] overflow-hidden" style={{
            background:
              "radial-gradient(ellipse at 55% 45%, rgba(106,178,32,0.06), transparent 65%)",
            boxShadow: "0 10px 60px rgba(0,0,0,0.18)",
          }}>
            <MoleculeCanvas />
          </div>
        </div>


        {/* Scroll indicator */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-10 flex-col items-center gap-1 z-20 pointer-events-none animate-[fadeIn_1.2s_1.2s_ease-out_both]">
          <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-fg-m opacity-50 mb-1">
            Scroll
          </span>
          <div className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 animate-[chev_1.8s_0s_infinite]" />
          <div className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-[6px] animate-[chev_1.8s_0.18s_infinite]" />
          <div className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-[6px] animate-[chev_1.8s_0.36s_infinite]" />
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-16 md:py-[100px] bg-bg2">
        <div className="max-w-[1160px] mx-auto px-5 md:px-10">
          <div className="mb-10 md:mb-[52px]">
            <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3 reveal">
              Our Story
            </p>
            <h2
              className="font-serif font-semibold text-fg-b leading-[1.02] reveal"
              style={{
                fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
                transitionDelay: "80ms",
              }}
            >
              Built on Biotechnology,
              <br />
              Driven by Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] border border-border rounded-[12px] overflow-hidden bg-border">
            {[
              {
                n: "01 · Manufacture",
                t: "Speciality Enzymes<br/>at <span class='text-green'>Scale</span>",
                d: "Ansel Biotech manufactures speciality enzymes at commercial scales — serving Distillery, Sugar, Brewery, Starch, Waste Water, Food, Animal Feed, Agriculture, Pharmaceuticals, Detergent, Paper & Pulp, and Textile.",
              },
              {
                n: "02 · Formulate",
                t: "Off-the-Shelf &<br/><span class='text-green'>Custom</span> Blends",
                d: "We offer both ready-to-use products and fully customized enzyme blends. With eco-friendly biotechnology at our core, we have developed unique formulations — making us a major global supplier.",
              },
              {
                n: "03 · Deliver",
                t: "Credibility You<br/>Can <span class='text-green'>Trust</span>",
                d: "Our customers count on us for consistent, credible service. We maximize output and enhance quality — trimming production costs and increasing process competence at every scale.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="relative bg-background p-8 md:p-10 flex flex-col gap-5 transition-colors duration-300 hover:bg-bg3 cursor-default group reveal"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-fg-d">
                  {pillar.n}
                </div>
                <div
                  className="font-serif text-[1.35rem] font-semibold text-fg-b leading-[1.15]"
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

      {/* DIVIDER */}
      <div className="max-w-[1160px] mx-auto px-5 md:px-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border-m to-transparent" />
      </div>

      {/* MISSION + VALUES */}
      <section className="py-16 md:py-[100px]">
        <div className="max-w-[1160px] mx-auto px-5 md:px-10">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3 reveal">
            Purpose & Principles
          </p>
          <h2
            className="font-serif font-semibold text-fg-b leading-[1.02] reveal"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
              transitionDelay: "80ms",
            }}
          >
            Sustainable Enzyme Science
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-12 md:mt-[52px]">
            <div
              className="font-sans text-[1.05rem] font-light leading-[1.95] text-fg-m reveal"
              style={{ transitionDelay: "160ms" }}
            >
              <p className="mb-[18px]">
                Our mission is to create unique, eco-friendly enzyme formulations
                for industrial applications. We strive to lead the transformation
                necessary to achieve a truly sustainable business environment.
              </p>
              <p>
                The increasing use of enzymes as biocatalysts has motivated us to
                develop innovative ways to produce high quality products peculiar
                to the specific needs of each industry — yielding products that
                are eco-friendly and less hazardous to human sustenance.
              </p>
            </div>

            <div
              className="flex flex-col reveal from-right"
              style={{ transitionDelay: "200ms" }}
            >
              {[
                {
                  n: "Passion",
                  b: "To strive for excellence with full effort, exceeding the expectations of our customers at every turn.",
                },
                {
                  n: "Reliability",
                  b: "To be the trusted partner for our customers and serve their needs with unwavering integrity.",
                },
                {
                  n: "Value-Adding",
                  b: "To provide innovative solutions by being creative and pursuing strategic opportunities that benefit our partners.",
                },
              ].map((v, i) => (
                <div
                  key={i}
                  className="val py-7 px-7 md:px-8 border-l-2 border-border-m transition-all duration-200 hover:border-green hover:bg-[rgba(106,178,32,0.04)] hover:pl-[38px] cursor-default"
                >
                  <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-green mb-2">
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
    </div>
  );
}
