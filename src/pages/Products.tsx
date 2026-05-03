
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { MoleculeCanvas } from "@/components/MoleculeCanvas";

export default function Products() {
  const [filter, setFilter] = useState("all");
  const mobileHeroRef = useRef<HTMLDivElement | null>(null);
  const [showChevrons, setShowChevrons] = useState(true);

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

  useEffect(() => {
    const checkSpace = () => {
      if (!mobileHeroRef.current) return;
      const rect = mobileHeroRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const remainingSpace = viewportHeight - rect.bottom;
      setShowChevrons(remainingSpace > 40);
    };
    checkSpace();
    window.addEventListener("resize", checkSpace);
    return () => window.removeEventListener("resize", checkSpace);
  }, []);

  const industries = [
    "Sugar", "Textile", "Food & Bakery", "Distillery",
    "Starch", "Brewery", "Pharma", "Detergent",
    "Waste Water", "Paper & Pulp", "Animal Feed", "Agriculture",
  ];

  const products = [
    { cat: "industrial", icon: "🍬", name: "Sugar Industry", tag: "Starch Conversion · Refining", count: 4, desc: "Enzymes accelerating liquefaction and saccharification of starch to glucose — improving clarity, yield and process efficiency.", link: "/products/sugar" },
    { cat: "textile", icon: "🧵", name: "Textile Processing", tag: "Desizing · Biopolishing · Bleaching", count: 5, desc: "Eco-friendly enzymes for desizing, biopolishing and peroxide killing — reduce energy and water usage with consistent fabric quality.", link: "/products/textile" },
    { cat: "food", icon: "🍞", name: "Food & Bakery", tag: "Bakery · Dairy · Beverage", count: 4, desc: "High-purity enzymes and custom blends for baking — improve dough handling, softness and shelf life.", link: "/products/food" },
    { cat: "industrial", icon: "⚗️", name: "Distillery", tag: "Molasses · Grain · Ethanol Yield", count: 2, desc: "Cost-effective enzymes improving fermentation efficiency and sustainable ethanol yields.", link: "/products/distillery" },
    { cat: "industrial", icon: "🌾", name: "Starch Processing", tag: "Liquefaction · Saccharification", count: 3, desc: "Speciality enzymes for starch liquefaction and saccharification — maximize glucose conversion and consistency.", link: "/products/starch" },
    { cat: "food", icon: "🍺", name: "Brewery", tag: "Mashing · Filtration · Clarity", count: 3, desc: "Brewing enzymes that enhance mashing efficiency, improve wort filtration and reduce viscosity for clarity.", link: "/products/brewery" },
    { cat: "pharma", icon: "💊", name: "Pharmaceutical", tag: "Digestive · Therapeutic", count: 3, desc: "Pharmaceutical-grade enzymes used as therapeutic agents and digestive support.", link: "/products/pharma" },
    { cat: "industrial", icon: "🧴", name: "Detergent", tag: "Stain Removal · Cold Wash", count: 3, desc: "High-performance detergent enzymes enabling effective cleaning at lower temperatures.", link: "/products/detergent" },
    { cat: "industrial", icon: "💧", name: "Waste Water Treatment", tag: "BOD Reduction · Sludge", count: 2, desc: "Enzymatic solutions improving biological treatment efficiency and reducing BOD/COD.", link: "/products/wastewater" },
    { cat: "industrial", icon: "📄", name: "Paper & Pulp", tag: "Bleaching · Refining", count: 2, desc: "Xylanase and cellulase-based solutions that reduce chemical load and improve pulp properties.", link: "/products/paper" },
    { cat: "food", icon: "🐄", name: "Animal Feed", tag: "Digestibility · Feed Efficiency", count: 3, desc: "Feed enzymes to improve digestibility and feed conversion in poultry, swine and aquaculture.", link: "/products/feed" },
    { cat: "industrial", icon: "✦", name: "Custom Enzyme Blends", tag: "Tailored · Scalable · Any Industry", count: null, desc: "Have a unique requirement? We formulate custom enzyme blends at commercial scale for your substrate, temperature profile and process parameters.", link: "/contact", isSpecial: true },
  ];

  const filteredProducts = products.filter((p) => filter === "all" || p.cat === filter);

  return (
    <div className="w-full">

      {/* ══════════════════════════════════════════════
          MOBILE HERO (< lg)
      ══════════════════════════════════════════════ */}
      <section
        className="lg:hidden relative w-full flex flex-col overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* Animated orb background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 20%, rgba(106,178,32,0.13), transparent 60%)," +
              "radial-gradient(ellipse 60% 50% at 85% 75%, rgba(58,58,184,0.09), transparent 55%)," +
              "radial-gradient(ellipse 50% 40% at 15% 80%, rgba(106,178,32,0.07), transparent 50%)",
            animation: "mOrb 8s ease-in-out infinite alternate",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(106,178,32,0.04) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(106,178,32,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div ref={mobileHeroRef} className="relative z-10 flex flex-col flex-1 justify-center px-6 pt-28 pb-10 gap-7">

          {/* Eyebrow */}
          <p
            className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-green"
            style={{ animation: "fadeUp .7s ease both" }}
          >
            SELZYME · Engineered Enzymes
          </p>

          {/* Title */}
          <div style={{ animation: "fadeUp .7s .09s ease both" }}>
            <h1
              className="font-serif font-bold leading-[0.9] tracking-[-0.015em] text-fg-b mb-4"
              style={{ fontSize: "clamp(2.8rem, 12vw, 3.8rem)" }}
            >
              Products &amp;
              <br />
              <span className="text-green">Solutions</span>
            </h1>
            <div
              className="h-[2px] w-12 rounded-full"
              style={{ background: "linear-gradient(to right, #6ab220, rgba(106,178,32,0.2))" }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="font-sans font-light text-fg-m leading-[1.8] text-[0.92rem]"
            style={{ animation: "fadeUp .7s .18s ease both" }}
          >
            Industrial enzymes under the{" "}
            <span className="text-fg-b font-normal">SELZYME</span> brand — engineered
            for performance and scale across multiple sectors.
          </p>

          {/* Industries — pills only */}
          <div style={{ animation: "fadeUp .7s .26s ease both" }}>
            <div
              className="relative"
              style={{
                maskImage: "linear-gradient(to right, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)",
              }}
            >
              <div
                className="flex gap-2 overflow-x-auto pb-1.5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {industries.map((ind, i) => (
                  <span
                    key={i}
                    className="flex-shrink-0 font-mono text-[0.54rem] tracking-[0.08em] uppercase px-2.5 py-1.5 rounded-full border border-border-m text-fg-m"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col gap-3"
            style={{ animation: "fadeUp .7s .34s ease both" }}
          >
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] uppercase px-5 py-3.5 rounded-[12px] text-white border border-green bg-green transition-all active:scale-[0.98]"
              style={{ boxShadow: "0 4px 20px rgba(106,178,32,0.25)" }}
            >
              Get Quote <span>→</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] uppercase px-5 py-3.5 rounded-[12px] bg-transparent text-fg-m border border-border-m transition-all active:scale-[0.98]"
            >
              About Ansel
            </Link>
          </div>
        </div>

        {/* Scroll chevrons — conditional */}
        {(
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none" style={{ bottom: "30px" }}>
            <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-fg-m opacity-35 mb-1">Scroll</span>
            {[0, 0.18, 0.36].map((d, i) => (
              <div
                key={i}
                className="w-[9px] h-[9px] border-r-[1.5px] border-b-[1.5px] border-fg-m"
                style={{
                  transform: "rotate(45deg)",
                  opacity: 0,
                  animation: `mChev 1.8s ${d}s infinite`,
                  marginTop: i > 0 ? "-5px" : 0,
                }}
              />
            ))}
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.35), transparent)" }}
        />

        <style>{`
          @keyframes mOrb {
            0%   { transform: translate(0%,0%) scale(1); }
            50%  { transform: translate(3%,4%) scale(1.04); }
            100% { transform: translate(-3%,-2%) scale(0.97); }
          }
          @keyframes fadeUp {
            from { opacity:0; transform:translateY(18px); }
            to   { opacity:1; transform:translateY(0); }
          }
          @keyframes mChev {
            0%,100% { opacity:.15; transform:rotate(45deg); }
            50%     { opacity:.65; transform:rotate(45deg) translate(2px,2px); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════
          DESKTOP / TABLET HERO (≥ lg) — unchanged
      ══════════════════════════════════════════════ */}
      <section
        className="hidden lg:grid relative w-full grid-cols-[55fr_45fr] h-[100svh] overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(106,178,32,0.07), transparent 60%), radial-gradient(ellipse at 15% 30%, rgba(58,58,184,0.05), transparent 55%)",
        }}
      >
        <div className="relative z-10 flex flex-col justify-center lg:pl-[9vw] lg:pr-[5vw] gap-6">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green animate-[fadeUp_0.8s_ease-out_both]">
            SELZYME · Engineered Enzymes
          </p>
          <div className="animate-[fadeUp_0.8s_0.08s_ease-out_both]">
            <h1
              className="font-serif font-bold leading-[0.92] tracking-[-0.015em] text-fg-b"
              style={{ fontSize: "clamp(2.8rem, 4.8vw, 5.2rem)" }}
            >
              Products &amp;<br />
              <span className="text-green">Solutions</span>
            </h1>
          </div>
          <p
            className="font-sans font-light text-fg-m leading-[1.85] max-w-[420px] animate-[fadeUp_0.8s_0.16s_ease-out_both]"
            style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
          >
            Industrial enzymes under the <span className="text-fg-b font-normal">SELZYME</span> brand —
            engineered for performance, consistency and scale across multiple sectors.
          </p>
          <div className="animate-[fadeUp_0.8s_0.28s_ease-out_both]">
            <p className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-fg-m opacity-50 mb-2.5">
              Industries We Serve
            </p>
            <div className="flex flex-wrap gap-1.5 max-w-[480px]">
              {industries.map((ind, i) => (
                <span
                  key={i}
                  className="font-mono text-[0.56rem] tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border border-border-m text-fg-m transition-all hover:border-[rgba(106,178,32,0.4)] hover:text-green hover:bg-[rgba(106,178,32,0.06)] cursor-default"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 animate-[fadeUp_0.8s_0.34s_ease-out_both]">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase px-5 py-2.5 rounded-[10px] text-white border border-green bg-green transition-all hover:bg-green-l hover:shadow-[0_4px_18px_rgba(106,178,32,0.3)] hover:-translate-y-px"
            >
              Get Quote <span>→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase px-5 py-2.5 rounded-[10px] bg-transparent text-fg-m border border-border-m transition-all hover:border-[rgba(114,114,216,0.45)] hover:text-indigo-l hover:-translate-y-px"
            >
              About Ansel
            </Link>
          </div>
        </div>

        {/* Right: molecule canvas */}
        <div className="relative flex h-full items-center justify-center pl-8 pr-[5vw]">
          <div
            className="relative w-full max-w-[600px] h-full max-h-[540px] rounded-[18px] border border-border overflow-hidden p-3.5 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: "radial-gradient(ellipse at 55% 45%, rgba(106,178,32,0.06), transparent 65%)",
              boxShadow: "0 10px 60px rgba(0,0,0,0.18)",
            }}
          >
            <div className="absolute inset-3.5 rounded-[14px] overflow-hidden">
              <MoleculeCanvas />
            </div>
          </div>
        </div>

        {/* Scroll chevrons */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-1 z-20 pointer-events-none animate-[fadeIn_1.2s_1.2s_ease-out_both]">
          <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-fg-m opacity-50 mb-1">Scroll</span>
          <div className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 animate-[chev_1.8s_0s_infinite]" style={{ transform: "rotate(45deg)" }} />
          <div className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-[6px] animate-[chev_1.8s_0.18s_infinite]" style={{ transform: "rotate(45deg)" }} />
          <div className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-[6px] animate-[chev_1.8s_0.36s_infinite]" style={{ transform: "rotate(45deg)" }} />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.35), transparent)" }}
        />
      </section>

      {/* ══════════════════════════════════════════════
          FILTERS — unchanged
      ══════════════════════════════════════════════ */}
      <div className="max-w-[1160px] mx-auto px-5 md:px-[22px] mt-9">
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          {[
            { id: "all", l: "All Industries" },
            { id: "food", l: "Food & Beverage" },
            { id: "industrial", l: "Industrial" },
            { id: "textile", l: "Textile" },
            { id: "pharma", l: "Pharma" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`font-mono text-[0.62rem] tracking-[0.12em] uppercase px-4 py-2 rounded-full border transition-all ${filter === f.id
                ? "border-green text-green bg-[rgba(106,178,32,0.08)]"
                : "border-border-m text-fg-m bg-transparent hover:border-green hover:text-green"
                }`}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PRODUCTS GRID — unchanged
      ══════════════════════════════════════════════ */}
      <section className="max-w-[1160px] mx-auto px-5 md:px-[22px] py-10 md:py-16 mb-10">
        <div
          className="grid gap-5 md:gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {filteredProducts.map((p, i) => (
            <div
              key={i}
              className={`pcard flex flex-col rounded-[14px] bg-card border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] cursor-default group ${p.isSpecial
                ? "border-[rgba(106,178,32,0.2)] bg-[rgba(106,178,32,0.04)]"
                : "border-border"
                }`}
              style={{ animation: `fadeIn 0.5s ease-out both`, animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between mb-4 gap-3">
                <div className="flex gap-3 items-start min-w-0">
                  <div
                    className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-[1.2rem] shrink-0 ${p.isSpecial ? "bg-[rgba(106,178,32,0.14)] text-green" : "bg-bg2 border border-border"
                      }`}
                  >
                    {p.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-[1rem] font-semibold text-fg-b tracking-[-0.01em] mb-0.5 truncate">{p.name}</h3>
                    <div className="font-mono text-[0.55rem] tracking-[0.12em] uppercase text-fg-m">{p.tag}</div>
                  </div>
                </div>
                {p.count !== null && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center bg-bg2 border border-border font-mono text-[0.55rem] text-fg-m shrink-0">
                    {p.count}
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-grow justify-between gap-5">
                <p className="font-sans text-[0.88rem] font-light leading-[1.65] text-fg-m m-0">{p.desc}</p>
                <Link
                  href={p.link}
                  className={`inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.12em] uppercase pb-0.5 border-b w-max transition-colors ${p.isSpecial
                    ? "text-green border-[rgba(106,178,32,0.3)] hover:border-green"
                    : "text-fg-b border-transparent hover:border-fg-b"
                    }`}
                >
                  {p.isSpecial ? "Request Custom Blend" : "View products"} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}