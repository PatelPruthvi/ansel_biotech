// import { useEffect, useRef, useState } from "react";
// import { Link } from "wouter";

// /* ─────────────────────────────────────────────────────────────
//    Types
// ───────────────────────────────────────────────────────────── */
// export interface ProductItem {
//     code: string;
//     enzyme: string;
//     application: string;
//     purpose: string;
//     tags: string[];
// }

// export interface ProcessStep {
//     step: string;
//     title: string;
//     desc: string;
//     icon?: string; // emoji or text icon
// }

// export interface IndustryPageContent {
//     industry: string;
//     headline: string[];
//     accentLine: number;
//     subtitle: string;
//     imageUrl: string;
//     imageAlt: string;
//     quickStats: { val: string; label: string }[];
//     aboutTitle: string;
//     aboutSub: string;
//     aboutBody: string[];
//     processSteps: ProcessStep[];
//     products: ProductItem[];
//     ctaTitle: string;
//     ctaBody: string;
//     slug: string;
// }

// /* ─────────────────────────────────────────────────────────────
//    Count-up hook
// ───────────────────────────────────────────────────────────── */
// function useCountUp(target: number, duration = 1100) {
//     const [count, setCount] = useState(0);
//     const ref = useRef<HTMLElement>(null);
//     useEffect(() => {
//         const el = ref.current;
//         if (!el) return;
//         const io = new IntersectionObserver(
//             ([e]) => {
//                 if (!e.isIntersecting) return;
//                 io.disconnect();
//                 const t0 = performance.now();
//                 const tick = (now: number) => {
//                     const p = Math.min((now - t0) / duration, 1);
//                     const ease = 1 - Math.pow(1 - p, 3);
//                     setCount(Math.floor(ease * target));
//                     if (p < 1) requestAnimationFrame(tick);
//                     else setCount(target);
//                 };
//                 requestAnimationFrame(tick);
//             },
//             { threshold: 0.5 }
//         );
//         io.observe(el);
//         return () => io.disconnect();
//     }, [target, duration]);
//     return { count, ref };
// }

// /* ─────────────────────────────────────────────────────────────
//    Main component
// ───────────────────────────────────────────────────────────── */
// export function IndustryProductPage({ c }: { c: IndustryPageContent }) {
//     const [activeProduct, setActiveProduct] = useState<number | null>(null);

//     /* Reveal observer */
//     useEffect(() => {
//         const io = new IntersectionObserver(
//             (entries) =>
//                 entries.forEach((e) => {
//                     if (e.isIntersecting) {
//                         e.target.classList.add("_vis");
//                         io.unobserve(e.target);
//                     }
//                 }),
//             { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
//         );
//         document.querySelectorAll("._rev").forEach((el) => io.observe(el));
//         return () => io.disconnect();
//     }, []);

//     const toggleProduct = (i: number) => {
//         setActiveProduct((prev) => (prev === i ? null : i));
//     };

//     return (
//         <>
//             <style>{`
//         @keyframes _pgFade { from{opacity:0} to{opacity:1} }
//         ._pg { animation: _pgFade .4s ease both; }

//         ._rev {
//           opacity:0;
//           transform:translateY(20px);
//           transition:opacity .65s cubic-bezier(.4,0,.2,1), transform .65s cubic-bezier(.4,0,.2,1);
//         }
//         ._rev._d1{transition-delay:80ms}
//         ._rev._d2{transition-delay:160ms}
//         ._rev._d3{transition-delay:240ms}
//         ._rev._d4{transition-delay:320ms}
//         ._rev._vis{opacity:1;transform:none}

//         @keyframes _fu {
//           from{opacity:0;transform:translateY(20px)}
//           to{opacity:1;transform:none}
//         }
//         ._fu0{animation:_fu .7s .00s ease both}
//         ._fu1{animation:_fu .7s .10s ease both}
//         ._fu2{animation:_fu .7s .20s ease both}
//         ._fu3{animation:_fu .7s .30s ease both}
//         ._fu4{animation:_fu .7s .42s ease both}

//         @keyframes _chev {
//           0%,100%{opacity:.15;transform:rotate(45deg)}
//           50%{opacity:.7;transform:rotate(45deg) translate(3px,3px)}
//         }
//         ._c1{animation:_chev 1.8s .00s infinite}
//         ._c2{animation:_chev 1.8s .18s infinite}
//         ._c3{animation:_chev 1.8s .36s infinite}

//         /* Product card expand */
//         @keyframes _expandIn {
//           from{opacity:0;transform:translateY(-8px)}
//           to{opacity:1;transform:none}
//         }
//         ._expand{animation:_expandIn .3s cubic-bezier(.4,0,.2,1) both}

//         /* Process icon pulse on hover */
//         .proc-card:hover .proc-icon{
//           transform:scale(1.08);
//           box-shadow:0 0 0 6px rgba(106,178,32,0.10);
//         }
//         .proc-icon{transition:transform .25s ease, box-shadow .25s ease}

//         /* About section decorative quote */
//         .about-quote::before{
//           content:'"';
//           position:absolute;
//           top:-0.35em;
//           left:-0.1em;
//           font-size:6rem;
//           font-family:Georgia,serif;
//           color:rgba(106,178,32,0.12);
//           line-height:1;
//           pointer-events:none;
//           user-select:none;
//         }

//         /* Responsive table */
//         @media(max-width:639px){
//           .tbl-hide{display:none}
//         }
//       `}</style>

//             <div className="_pg w-full">

//                 {/* ══════════════════════════════════════════════════
//             §1 HERO — unchanged, 100vh
//         ══════════════════════════════════════════════════ */}
//                 <section
//                     className="snap-start relative flex flex-col overflow-hidden"
//                     style={{ height: "100svh", minHeight: 560 }}
//                 >
//                     <div className="absolute inset-0 overflow-hidden">
//                         <img
//                             src={c.imageUrl}
//                             alt={c.imageAlt}
//                             className="w-full h-full object-cover"
//                             style={{ opacity: 0.9, filter: "saturate(0.95) contrast(1.05)" }}
//                         />
//                         <div
//                             className="absolute inset-0"
//                             style={{
//                                 background: `
//                   linear-gradient(to right, var(--bg) 0%, var(--bg) 25%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.15) 100%),
//                   linear-gradient(to bottom, var(--bg) 0%, transparent 20%, transparent 80%, var(--bg) 100%)
//                 `,
//                             }}
//                         />
//                         <div
//                             className="absolute inset-0 pointer-events-none"
//                             style={{
//                                 background:
//                                     "radial-gradient(ellipse at 65% 60%, rgba(106,178,32,0.10), transparent 55%)," +
//                                     "radial-gradient(ellipse at 20% 20%, rgba(58,58,184,0.06), transparent 50%)",
//                             }}
//                         />
//                     </div>

//                     <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1160px] mx-auto w-full px-5 lg:px-8 gap-6">
//                         <nav className="_fu0 flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.15em] uppercase text-fg-m">
//                             <Link href="/products" className="hover:text-green transition-colors">Products</Link>
//                             <span className="opacity-30">/</span>
//                             <span className="text-green">{c.industry}</span>
//                         </nav>

//                         <h1
//                             className="_fu1 font-serif font-bold leading-[0.9] tracking-[-0.02em] text-fg-b"
//                             style={{ fontSize: "clamp(3rem, 7vw, 6.4rem)" }}
//                         >
//                             {c.headline.map((line, i) => (
//                                 <span key={i} className={`block ${i === c.accentLine ? "text-green" : ""}`}>
//                                     {line}
//                                 </span>
//                             ))}
//                         </h1>

//                         <p
//                             className="_fu2 font-sans font-light text-fg-m leading-[1.78] max-w-[480px]"
//                             style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}
//                         >
//                             {c.subtitle}
//                         </p>

//                         <div className="_fu3 flex flex-wrap gap-2.5 mt-1">
//                             {c.quickStats.map((s) => (
//                                 <div
//                                     key={s.label}
//                                     className="flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-border bg-card backdrop-blur-sm"
//                                 >
//                                     <span className="font-mono text-[0.9rem] text-green font-medium leading-none">{s.val}</span>
//                                     <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-fg-m">{s.label}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="_fu4 absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0.5 pointer-events-none">
//                         <span className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-fg-m opacity-40 mb-1">Scroll</span>
//                         <div className="_c1 w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0" style={{ transform: "rotate(45deg)" }} />
//                         <div className="_c2 w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-1.5" style={{ transform: "rotate(45deg)" }} />
//                         <div className="_c3 w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-1.5" style={{ transform: "rotate(45deg)" }} />
//                     </div>

//                     <div
//                         className="absolute bottom-0 left-0 right-0 h-[1px]"
//                         style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.35), transparent)" }}
//                     />
//                 </section>

//                 {/* ══════════════════════════════════════════════════
//             §2 PRODUCTS — card grid with in-place expansion
//             Cards: 2-col on tablet, 3-col on desktop
//             Clicking opens a full-width panel below that row
//         ══════════════════════════════════════════════════ */}
//                 <section
//                     className="relative bg-bg2 border-b border-border"
//                     style={{ minHeight: "100svh" }}
//                 >
//                     <div className="max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-16 lg:py-20">

//                         {/* Header */}
//                         <div className="_rev mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
//                             <div>
//                                 <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-2">Our Range</p>
//                                 <h2
//                                     className="font-serif font-bold text-fg-b leading-[1]"
//                                     style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
//                                 >
//                                     SELZYME Products
//                                 </h2>
//                             </div>
//                             <p className="font-sans font-light text-fg-m text-[0.84rem] max-w-[220px] leading-[1.6] opacity-70">
//                                 {c.products.length} formulations · click any card to expand
//                             </p>
//                         </div>

//                         {/* Card grid */}
//                         <ProductGrid products={c.products} activeProduct={activeProduct} toggleProduct={toggleProduct} />

//                     </div>
//                 </section>

//                 {/* ══════════════════════════════════════════════════
//             §3 PROCESS — 100vh, numbered steps with icons
//             Timeline layout: horizontal desktop, vertical mobile
//         ══════════════════════════════════════════════════ */}
//                 <section
//                     className="relative flex flex-col overflow-hidden"
//                     style={{ minHeight: "100svh" }}
//                 >
//                     {/* Subtle glow */}
//                     <div
//                         className="absolute inset-0 pointer-events-none"
//                         style={{
//                             background:
//                                 "radial-gradient(ellipse at 80% 20%, rgba(106,178,32,0.06), transparent 55%)," +
//                                 "radial-gradient(ellipse at 10% 80%, rgba(58,58,184,0.05), transparent 50%)",
//                         }}
//                     />

//                     <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-16 lg:py-24 gap-14">

//                         {/* Label + title */}
//                         <div className="_rev">
//                             <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-2">How It Works</p>
//                             <h2
//                                 className="font-serif font-bold text-fg-b leading-[1]"
//                                 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
//                             >
//                                 The Enzymatic Process
//                             </h2>
//                         </div>

//                         {/* Steps — horizontal timeline desktop, vertical mobile */}
//                         <div className="relative">

//                             {/* Connector line — desktop only */}
//                             <div
//                                 className="hidden lg:block absolute top-12 left-0 right-0 h-[1px]"
//                                 style={{ background: "linear-gradient(to right, transparent 2%, rgba(106,178,32,0.25) 20%, rgba(106,178,32,0.25) 80%, transparent 98%)" }}
//                             />

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
//                                 {c.processSteps.map((s, i) => {
//                                     const defaultIcons = ["🌡️", "💧", "⚗️", "✨"];
//                                     const icon = s.icon || defaultIcons[i % defaultIcons.length];
//                                     return (
//                                         <div
//                                             key={i}
//                                             className={`_rev _d${Math.min(i + 1, 4)} proc-card relative flex flex-col gap-5 p-7 rounded-[14px] border border-border bg-card transition-all duration-300 hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 hover:-translate-y-1 group`}
//                                         >
//                                             {/* Step number + icon */}
//                                             <div className="flex items-center gap-3">
//                                                 {/* Numbered circle — sits on the connector line on desktop */}
//                                                 <div
//                                                     className="proc-icon relative w-11 h-11 rounded-full border-2 border-[rgba(106,178,32,0.35)] bg-bg2 flex items-center justify-center flex-shrink-0 group-hover:border-green group-hover:bg-[rgba(106,178,32,0.10)] transition-colors"
//                                                 >
//                                                     <span className="font-mono text-[0.6rem] text-green font-semibold">{s.step}</span>
//                                                 </div>
//                                                 {/* Large emoji icon */}
//                                                 <span
//                                                     className="text-2xl leading-none select-none"
//                                                     style={{ filter: "saturate(0.85)" }}
//                                                 >
//                                                     {icon}
//                                                 </span>
//                                             </div>

//                                             <div>
//                                                 <h3 className="font-sans font-semibold text-fg-b text-[0.97rem] mb-2 group-hover:text-green transition-colors leading-[1.2]">
//                                                     {s.title}
//                                                 </h3>
//                                                 <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.7]">
//                                                     {s.desc}
//                                                 </p>
//                                             </div>

//                                             {/* Step connector arrow — desktop, not last */}
//                                             {i < c.processSteps.length - 1 && (
//                                                 <div className="hidden lg:flex absolute -right-[13px] top-[44px] z-10 items-center justify-center w-6 h-6 rounded-full bg-bg border border-border text-fg-m text-[0.7rem] opacity-40">
//                                                     ›
//                                                 </div>
//                                             )}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         {/* Thin rule */}
//                         <div
//                             className="h-[1px]"
//                             style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.2), transparent)" }}
//                         />

//                         {/* Bottom pull-quote — teaser for next section */}
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
//                             <div
//                                 className="_rev relative pl-6 border-l-2 border-green max-w-[480px]"
//                                 style={{ borderImage: "linear-gradient(to bottom, var(--green), rgba(106,178,32,0.2)) 1" }}
//                             >
//                                 <p className="font-serif font-light text-fg text-[1.05rem] leading-[1.8] italic">
//                                     "{c.aboutSub}"
//                                 </p>
//                             </div>
//                             <Link
//                                 href="/contact"
//                                 className="_rev _d1 flex-shrink-0 inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.12em] uppercase text-green border-b border-[rgba(106,178,32,0.3)] pb-0.5 transition-colors hover:border-green"
//                             >
//                                 Speak to our team →
//                             </Link>
//                         </div>

//                     </div>
//                 </section>

//                 {/* ══════════════════════════════════════════════════
//             §4 BACKGROUND / ABOUT — 100vh editorial
//             Left: sticky label + decorative accent
//             Right: paragraphs with icon-accented lead lines
//         ══════════════════════════════════════════════════ */}
//                 <section
//                     className="relative border-t border-border overflow-hidden"
//                     style={{
//                         minHeight: "100svh",
//                         background: "radial-gradient(ellipse at 90% 50%, rgba(58,58,184,0.05), transparent 55%)",
//                     }}
//                 >
//                     {/* Background grid texture */}
//                     <div
//                         className="absolute inset-0 pointer-events-none opacity-[0.025]"
//                         style={{
//                             backgroundImage: "linear-gradient(var(--fg-m) 1px, transparent 1px), linear-gradient(90deg, var(--fg-m) 1px, transparent 1px)",
//                             backgroundSize: "72px 72px",
//                         }}
//                     />

//                     <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-20 lg:py-28">

//                         <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-14 lg:gap-24 items-start">

//                             {/* Left — sticky label block */}
//                             <div className="_rev lg:sticky lg:top-28 flex flex-col gap-6">
//                                 <div>
//                                     <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">Background</p>
//                                     <h2
//                                         className="font-serif font-bold text-fg-b leading-[1.02] mb-5"
//                                         style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.6rem)" }}
//                                     >
//                                         {c.aboutTitle}
//                                     </h2>
//                                 </div>

//                                 {/* Decorative stat block */}
//                                 <div className="flex flex-col gap-3">
//                                     {c.quickStats.slice(0, 3).map((s, i) => (
//                                         <div
//                                             key={i}
//                                             className="flex items-center gap-4 p-4 rounded-[10px] border border-border bg-card"
//                                         >
//                                             <span className="font-mono text-[1.3rem] text-green font-semibold leading-none w-16 flex-shrink-0">
//                                                 {s.val}
//                                             </span>
//                                             <span className="font-mono text-[0.55rem] tracking-[0.12em] uppercase text-fg-m leading-[1.4]">
//                                                 {s.label}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <Link
//                                     href="/contact"
//                                     className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.12em] uppercase text-green border-b border-[rgba(106,178,32,0.3)] pb-0.5 transition-colors hover:border-green w-fit"
//                                 >
//                                     Request our enzyme guide →
//                                 </Link>
//                             </div>

//                             {/* Right — editorial paragraphs with icon accents */}
//                             <div className="flex flex-col gap-0">
//                                 {c.aboutBody.map((para, i) => {
//                                     const icons = ["🔬", "⚗️", "🌿", "🏭"];
//                                     const icon = icons[i % icons.length];
//                                     return (
//                                         <div
//                                             key={i}
//                                             className={`_rev _d${Math.min(i + 1, 4)} group flex gap-5 py-8 border-b border-border last:border-0 transition-colors hover:bg-[rgba(106,178,32,0.025)] rounded-[8px] px-4 -mx-4`}
//                                         >
//                                             {/* Icon accent */}
//                                             <div className="flex-shrink-0 mt-1">
//                                                 <div
//                                                     className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-base leading-none group-hover:border-[rgba(106,178,32,0.4)] transition-colors"
//                                                     style={{ filter: "saturate(0.8)" }}
//                                                 >
//                                                     {icon}
//                                                 </div>
//                                             </div>

//                                             {/* Paragraph */}
//                                             <div className="flex flex-col gap-1.5">
//                                                 <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-green opacity-60">
//                                                     {["Overview", "Process", "Application", "Benefit"][i % 4]}
//                                                 </span>
//                                                 <p
//                                                     className="font-sans font-light text-fg-m leading-[1.85]"
//                                                     style={{ fontSize: "clamp(0.88rem, 1vw, 1rem)" }}
//                                                 >
//                                                     {para}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* ══════════════════════════════════════════════════
//             §5 CTA BAND — unchanged, great on desktop
//         ══════════════════════════════════════════════════ */}
//                 <section
//                     className="relative py-20 lg:py-28 border-t border-border overflow-hidden"
//                     style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(106,178,32,0.09), transparent 55%)" }}
//                 >
//                     <div className="relative z-10 max-w-[700px] mx-auto px-5 lg:px-8 text-center">
//                         <p className="_rev font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-4">
//                             Ready to Optimise?
//                         </p>
//                         <h2
//                             className="_rev _d1 font-serif font-bold text-fg-b leading-[1.02] mb-5"
//                             style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
//                         >
//                             {c.ctaTitle}
//                         </h2>
//                         <p className="_rev _d2 font-sans font-light text-fg-m text-[1rem] leading-[1.75] mb-8 max-w-[460px] mx-auto">
//                             {c.ctaBody}
//                         </p>
//                         <div className="_rev _d3 flex flex-wrap gap-3 justify-center">
//                             <Link
//                                 href="/contact"
//                                 className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase px-6 py-3 rounded-[10px] bg-green text-white border border-green transition-all hover:bg-green-l hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(106,178,32,0.3)]"
//                             >
//                                 Contact Our Team →
//                             </Link>
//                             <Link
//                                 href="/products"
//                                 className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase px-6 py-3 rounded-[10px] bg-transparent text-fg-m border border-border-m transition-all hover:border-[rgba(106,178,32,0.35)] hover:text-green hover:-translate-y-px"
//                             >
//                                 ← All Products
//                             </Link>
//                         </div>
//                     </div>
//                 </section>

//             </div>
//         </>
//     );
// }

// /* ─────────────────────────────────────────────────────────────
//    ProductGrid
//    ─────────────────────────────────────────────────────────────
//    Layout:
//    • 3-col desktop  |  2-col tablet  |  1-col mobile
//    • Cards are always visible; clicking one reveals a full-width
//      detail panel that slides in below the entire grid.
//    • Handles 8-10 products gracefully at all breakpoints.
// ───────────────────────────────────────────────────────────── */
// function ProductGrid({
//     products,
//     activeProduct,
//     toggleProduct,
// }: {
//     products: ProductItem[];
//     activeProduct: number | null;
//     toggleProduct: (i: number) => void;
// }) {
//     return (
//         <div className="flex flex-col gap-3">
//             {/* Card grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                 {products.map((p, i) => {
//                     const isActive = activeProduct === i;
//                     return (
//                         <button
//                             key={p.code}
//                             onClick={() => toggleProduct(i)}
//                             className={`
//                 group relative flex flex-col gap-4 p-6 rounded-[14px] border cursor-pointer text-left w-full
//                 transition-all duration-200 select-none
//                 ${isActive
//                                     ? "border-green bg-[rgba(106,178,32,0.07)] shadow-[0_0_0_1px_rgba(106,178,32,0.18),0_4px_20px_rgba(0,0,0,0.15)]"
//                                     : "border-border bg-card hover:border-[rgba(106,178,32,0.3)] hover:bg-bg2 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
//                                 }
//               `}
//                         >
//                             {/* Active indicator */}
//                             <div
//                                 className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-200 ${isActive ? "bg-green shadow-[0_0_6px_rgba(106,178,32,0.7)]" : "bg-border group-hover:bg-[rgba(106,178,32,0.3)]"
//                                     }`}
//                             />

//                             {/* Code badge */}
//                             <div
//                                 className="inline-flex w-fit font-mono text-[0.57rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border transition-all duration-200"
//                                 style={{
//                                     color: isActive ? "var(--green)" : "var(--fg-m)",
//                                     borderColor: isActive ? "rgba(106,178,32,0.35)" : "var(--bdr-m)",
//                                     background: isActive ? "rgba(106,178,32,0.08)" : "transparent",
//                                 }}
//                             >
//                                 {p.code}
//                             </div>

//                             {/* Enzyme name + application */}
//                             <div className="flex-1">
//                                 <h3
//                                     className={`font-serif font-semibold leading-[1.15] mb-1 transition-colors ${isActive ? "text-green" : "text-fg-b group-hover:text-green"
//                                         }`}
//                                     style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.18rem)" }}
//                                 >
//                                     {p.enzyme}
//                                 </h3>
//                                 <p className="font-mono text-[0.56rem] tracking-[0.1em] uppercase text-fg-m opacity-55 leading-[1.4]">
//                                     {p.application}
//                                 </p>
//                             </div>

//                             {/* Tags */}
//                             <div className="flex flex-wrap gap-1.5">
//                                 {p.tags.map((t) => (
//                                     <span
//                                         key={t}
//                                         className="font-mono text-[0.5rem] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full border border-border text-fg-m bg-bg2"
//                                     >
//                                         {t}
//                                     </span>
//                                 ))}
//                             </div>

//                             {/* Expand indicator */}
//                             <div
//                                 className={`flex items-center gap-1.5 font-mono text-[0.54rem] tracking-[0.1em] uppercase pt-1 border-t border-border transition-all ${isActive ? "text-green" : "text-fg-m opacity-40 group-hover:opacity-70"
//                                     }`}
//                             >
//                                 <span>{isActive ? "Collapse" : "View details"}</span>
//                                 <span
//                                     className="inline-block transition-transform duration-200 text-[0.7rem]"
//                                     style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
//                                 >
//                                     ↓
//                                 </span>
//                             </div>
//                         </button>
//                     );
//                 })}
//             </div>

//             {/* Detail panel — always below the full grid, slides in when a card is active */}
//             <div
//                 className={`transition-all duration-300 overflow-hidden ${activeProduct !== null ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//                 style={{
//                     maxHeight: activeProduct !== null ? "800px" : "0px",
//                     transition: "max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s ease",
//                 }}
//             >
//                 {activeProduct !== null && (
//                     <div
//                         className="_expand rounded-[16px] border border-green bg-card p-7 lg:p-10 flex flex-col gap-6"
//                         style={{ boxShadow: "0 0 0 1px rgba(106,178,32,0.15), 0 8px 32px rgba(0,0,0,0.18)" }}
//                     >
//                         <ProductDetail
//                             product={products[activeProduct]}
//                             onClose={() => toggleProduct(activeProduct)}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// /* Shared detail content */
// function ProductDetail({ product, onClose }: { product: ProductItem; onClose: () => void }) {
//     return (
//         <>
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//                 <div>
//                     <div
//                         className="inline-block font-mono text-[0.6rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border mb-3"
//                         style={{ color: "var(--green)", borderColor: "rgba(106,178,32,0.3)", background: "rgba(106,178,32,0.07)" }}
//                     >
//                         {product.code}
//                     </div>
//                     <h3
//                         className="font-serif font-bold text-fg-b leading-[1.05]"
//                         style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
//                     >
//                         {product.enzyme}
//                     </h3>
//                 </div>
//                 <div className="flex flex-wrap gap-2 items-start">
//                     {product.tags.map((t) => (
//                         <span
//                             key={t}
//                             className="font-mono text-[0.54rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border border-border text-fg-m bg-bg2"
//                         >
//                             {t}
//                         </span>
//                     ))}
//                     {/* Close */}
//                     <button
//                         onClick={onClose}
//                         className="font-mono text-[0.58rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-border text-fg-m hover:border-green hover:text-green transition-colors"
//                     >
//                         ✕ Close
//                     </button>
//                 </div>
//             </div>

//             <div className="h-[1px] bg-border" />

//             {/* Info grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                 <div className="flex flex-col gap-1">
//                     <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Application</span>
//                     <span className="font-sans text-fg-b text-[0.95rem] font-medium">{product.application}</span>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                     <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Enzyme Class</span>
//                     <span className="font-sans text-fg-b text-[0.95rem] font-medium">{product.enzyme}</span>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                     <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Product Code</span>
//                     <span className="font-mono text-green text-[0.95rem]">{product.code}</span>
//                 </div>
//                 <div className="sm:col-span-3 flex flex-col gap-1">
//                     <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Function &amp; Purpose</span>
//                     <p className="font-sans text-fg-m text-[0.95rem] font-light leading-[1.8]">{product.purpose}</p>
//                 </div>
//             </div>

//             {/* CTA */}
//             <div className="pt-1">
//                 <Link
//                     href="/contact"
//                     className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase px-5 py-2.5 rounded-[10px] bg-green text-white border border-green transition-all hover:bg-green-l hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(106,178,32,0.28)]"
//                 >
//                     Request This Product →
//                 </Link>
//             </div>
//         </>
//     );
// }


import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
export interface ProductItem {
    code: string;
    enzyme: string;
    application: string;
    purpose: string;
    tags: string[];
}

export interface ProcessStep {
    step: string;
    title: string;
    desc: string;
    icon?: string; // emoji or text icon
}

export interface IndustryPageContent {
    industry: string;
    headline: string[];
    accentLine: number;
    subtitle: string;
    imageUrl: string;
    imageAlt: string;
    quickStats: { val: string; label: string }[];
    aboutTitle: string;
    aboutSub: string;
    aboutBody: string[];
    processSteps: ProcessStep[];
    products: ProductItem[];
    ctaTitle: string;
    ctaBody: string;
    slug: string;
}

/* ─────────────────────────────────────────────────────────────
   Count-up hook
───────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1100) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return;
                io.disconnect();
                const t0 = performance.now();
                const tick = (now: number) => {
                    const p = Math.min((now - t0) / duration, 1);
                    const ease = 1 - Math.pow(1 - p, 3);
                    setCount(Math.floor(ease * target));
                    if (p < 1) requestAnimationFrame(tick);
                    else setCount(target);
                };
                requestAnimationFrame(tick);
            },
            { threshold: 0.5 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [target, duration]);
    return { count, ref };
}

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
export function IndustryProductPage({ c }: { c: IndustryPageContent }) {
    const [activeProduct, setActiveProduct] = useState<number | null>(null);

    /* Reveal observer */
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("_vis");
                        io.unobserve(e.target);
                    }
                }),
            { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
        );
        document.querySelectorAll("._rev").forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const toggleProduct = (i: number) => {
        setActiveProduct((prev) => (prev === i ? null : i));
    };

    return (
        <>
            <style>{`
        @keyframes _pgFade { from{opacity:0} to{opacity:1} }
        ._pg { animation: _pgFade .4s ease both; }

        ._rev {
          opacity:0;
          transform:translateY(20px);
          transition:opacity .65s cubic-bezier(.4,0,.2,1), transform .65s cubic-bezier(.4,0,.2,1);
        }
        ._rev._d1{transition-delay:80ms}
        ._rev._d2{transition-delay:160ms}
        ._rev._d3{transition-delay:240ms}
        ._rev._d4{transition-delay:320ms}
        ._rev._vis{opacity:1;transform:none}

        @keyframes _fu {
          from{opacity:0;transform:translateY(20px)}
          to{opacity:1;transform:none}
        }
        ._fu0{animation:_fu .7s .00s ease both}
        ._fu1{animation:_fu .7s .10s ease both}
        ._fu2{animation:_fu .7s .20s ease both}
        ._fu3{animation:_fu .7s .30s ease both}
        ._fu4{animation:_fu .7s .42s ease both}

        @keyframes _chev {
          0%,100%{opacity:.15;transform:rotate(45deg)}
          50%{opacity:.7;transform:rotate(45deg) translate(3px,3px)}
        }
        ._c1{animation:_chev 1.8s .00s infinite}
        ._c2{animation:_chev 1.8s .18s infinite}
        ._c3{animation:_chev 1.8s .36s infinite}

        /* Product card expand */
        @keyframes _expandIn {
          from{opacity:0;transform:translateY(-8px)}
          to{opacity:1;transform:none}
        }
        ._expand{animation:_expandIn .3s cubic-bezier(.4,0,.2,1) both}

        /* Process icon pulse on hover */
        .proc-card:hover .proc-icon{
          transform:scale(1.08);
          box-shadow:0 0 0 6px rgba(106,178,32,0.10);
        }
        .proc-icon{transition:transform .25s ease, box-shadow .25s ease}

        /* About section decorative quote */
        .about-quote::before{
          content:'"';
          position:absolute;
          top:-0.35em;
          left:-0.1em;
          font-size:6rem;
          font-family:Georgia,serif;
          color:rgba(106,178,32,0.12);
          line-height:1;
          pointer-events:none;
          user-select:none;
        }

        /* Responsive table */
        @media(max-width:639px){
          .tbl-hide{display:none}
        }
      `}</style>

            <div className="_pg w-full">

                {/* ══════════════════════════════════════════════════
            §1 HERO — unchanged, 100vh
        ══════════════════════════════════════════════════ */}
                <section
                    className="snap-start relative flex flex-col overflow-hidden"
                    style={{ height: "100svh", minHeight: 560 }}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={c.imageUrl}
                            alt={c.imageAlt}
                            className="w-full h-full object-cover"
                            style={{ opacity: 0.9, filter: "saturate(0.95) contrast(1.05)" }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `
                  linear-gradient(to right, var(--bg) 0%, var(--bg) 25%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.15) 100%),
                  linear-gradient(to bottom, var(--bg) 0%, transparent 20%, transparent 80%, var(--bg) 100%)
                `,
                            }}
                        />
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(ellipse at 65% 60%, rgba(106,178,32,0.10), transparent 55%)," +
                                    "radial-gradient(ellipse at 20% 20%, rgba(58,58,184,0.06), transparent 50%)",
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1160px] mx-auto w-full px-5 lg:px-8 gap-6">
                        <nav className="_fu0 flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.15em] uppercase text-fg-m">
                            <Link href="/products" className="hover:text-green transition-colors">Products</Link>
                            <span className="opacity-30">/</span>
                            <span className="text-green">{c.industry}</span>
                        </nav>

                        <h1
                            className="_fu1 font-serif font-bold leading-[0.9] tracking-[-0.02em] text-fg-b"
                            style={{ fontSize: "clamp(3rem, 7vw, 6.4rem)" }}
                        >
                            {c.headline.map((line, i) => (
                                <span key={i} className={`block ${i === c.accentLine ? "text-green" : ""}`}>
                                    {line}
                                </span>
                            ))}
                        </h1>

                        <p
                            className="_fu2 font-sans font-light text-fg-m leading-[1.78] max-w-[480px]"
                            style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}
                        >
                            {c.subtitle}
                        </p>

                        <div className="_fu3 flex flex-wrap gap-2.5 mt-1">
                            {c.quickStats.map((s) => (
                                <div
                                    key={s.label}
                                    className="flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-border bg-card backdrop-blur-sm"
                                >
                                    <span className="font-mono text-[0.9rem] text-green font-medium leading-none">{s.val}</span>
                                    <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-fg-m">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="_fu4 absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0.5 pointer-events-none">
                        <span className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-fg-m opacity-40 mb-1">Scroll</span>
                        <div className="_c1 w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0" style={{ transform: "rotate(45deg)" }} />
                        <div className="_c2 w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-1.5" style={{ transform: "rotate(45deg)" }} />
                        <div className="_c3 w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-1.5" style={{ transform: "rotate(45deg)" }} />
                    </div>

                    <div
                        className="absolute bottom-0 left-0 right-0 h-[1px]"
                        style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.35), transparent)" }}
                    />
                </section>

                {/* ══════════════════════════════════════════════════
            §2 PRODUCTS — card grid with in-place expansion
            Cards: 2-col on tablet, 3-col on desktop
            Clicking opens a full-width panel below that row
        ══════════════════════════════════════════════════ */}
                <section
                    className="relative bg-bg2 border-b border-border"
                    style={{ minHeight: "100svh" }}
                >
                    <div className="max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-16 lg:py-20">

                        {/* Header */}
                        <div className="_rev mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                            <div>
                                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-2">Our Range</p>
                                <h2
                                    className="font-serif font-bold text-fg-b leading-[1]"
                                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                                >
                                    SELZYME Products
                                </h2>
                            </div>
                            <p className="font-sans font-light text-fg-m text-[0.84rem] max-w-[220px] leading-[1.6] opacity-70">
                                {c.products.length} formulations · click any card to expand
                            </p>
                        </div>

                        {/* Card grid */}
                        <ProductGrid products={c.products} activeProduct={activeProduct} toggleProduct={toggleProduct} />

                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
            §3 PROCESS — 100vh, numbered steps with icons
            Timeline layout: horizontal desktop, vertical mobile
        ══════════════════════════════════════════════════ */}
                <section
                    className="relative flex flex-col overflow-hidden"
                    style={{ minHeight: "100svh" }}
                >
                    {/* Subtle glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at 80% 20%, rgba(106,178,32,0.06), transparent 55%)," +
                                "radial-gradient(ellipse at 10% 80%, rgba(58,58,184,0.05), transparent 50%)",
                        }}
                    />

                    <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-16 lg:py-24 gap-14">

                        {/* Label + title */}
                        <div className="_rev">
                            <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-2">How It Works</p>
                            <h2
                                className="font-serif font-bold text-fg-b leading-[1]"
                                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                            >
                                The Enzymatic Process
                            </h2>
                        </div>

                        {/* Steps — horizontal timeline desktop, vertical mobile */}
                        <div className="relative">

                            {/* Connector line — desktop only */}
                            <div
                                className="hidden lg:block absolute top-12 left-0 right-0 h-[1px]"
                                style={{ background: "linear-gradient(to right, transparent 2%, rgba(106,178,32,0.25) 20%, rgba(106,178,32,0.25) 80%, transparent 98%)" }}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
                                {c.processSteps.map((s, i) => {
                                    const defaultIcons = ["🌡️", "💧", "⚗️", "✨"];
                                    const icon = s.icon || defaultIcons[i % defaultIcons.length];
                                    return (
                                        <div
                                            key={i}
                                            className={`_rev _d${Math.min(i + 1, 4)} proc-card relative flex flex-col gap-5 p-7 rounded-[14px] border border-border bg-card transition-all duration-300 hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 hover:-translate-y-1 group`}
                                        >
                                            {/* Step number + icon */}
                                            <div className="flex items-center gap-3">
                                                {/* Numbered circle — sits on the connector line on desktop */}
                                                <div
                                                    className="proc-icon relative w-11 h-11 rounded-full border-2 border-[rgba(106,178,32,0.35)] bg-bg2 flex items-center justify-center flex-shrink-0 group-hover:border-green group-hover:bg-[rgba(106,178,32,0.10)] transition-colors"
                                                >
                                                    <span className="font-mono text-[0.6rem] text-green font-semibold">{s.step}</span>
                                                </div>
                                                {/* Large emoji icon */}
                                                <span
                                                    className="text-2xl leading-none select-none"
                                                    style={{ filter: "saturate(0.85)" }}
                                                >
                                                    {icon}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="font-sans font-semibold text-fg-b text-[0.97rem] mb-2 group-hover:text-green transition-colors leading-[1.2]">
                                                    {s.title}
                                                </h3>
                                                <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.7]">
                                                    {s.desc}
                                                </p>
                                            </div>

                                            {/* Step connector arrow — desktop, not last */}
                                            {i < c.processSteps.length - 1 && (
                                                <div className="hidden lg:flex absolute -right-[13px] top-[44px] z-10 items-center justify-center w-6 h-6 rounded-full bg-bg border border-border text-fg-m text-[0.7rem] opacity-40">
                                                    ›
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Thin rule */}
                        <div
                            className="h-[1px]"
                            style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.2), transparent)" }}
                        />

                        {/* Bottom pull-quote + CTA — stacked cleanly on mobile */}
                        <div className="_rev flex flex-col gap-5">
                            <blockquote
                                className="relative pl-5 border-l-2 border-green max-w-[520px]"
                            >
                                <p className="font-serif font-light text-fg text-[1.02rem] leading-[1.8] italic">
                                    "{c.aboutSub}"
                                </p>
                            </blockquote>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.12em] uppercase text-green border-b border-[rgba(106,178,32,0.3)] pb-0.5 transition-colors hover:border-green w-fit"
                            >
                                Speak to our team →
                            </Link>
                        </div>

                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
            §4 BACKGROUND — full-width card grid
            Header + 2-col cards (1-col mobile)
            Each card: icon + micro-label + paragraph
        ══════════════════════════════════════════════════ */}
                <section
                    className="relative border-t border-border overflow-hidden"
                    style={{
                        minHeight: "100svh",
                        background: "radial-gradient(ellipse at 85% 40%, rgba(58,58,184,0.05), transparent 50%), radial-gradient(ellipse at 15% 80%, rgba(106,178,32,0.04), transparent 50%)",
                    }}
                >
                    {/* Grid texture */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.022]"
                        style={{
                            backgroundImage: "linear-gradient(var(--fg-m) 1px, transparent 1px), linear-gradient(90deg, var(--fg-m) 1px, transparent 1px)",
                            backgroundSize: "72px 72px",
                        }}
                    />

                    <div className="relative z-10 max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-20 lg:py-28">

                        {/* Section header */}
                        <div className="_rev mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            <div>
                                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">Background</p>
                                <h2
                                    className="font-serif font-bold text-fg-b leading-[1.02]"
                                    style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
                                >
                                    {c.aboutTitle}
                                </h2>
                            </div>
                            {/* CTA aligned to bottom-right of header on desktop */}
                            <Link
                                href="/contact"
                                className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.12em] uppercase text-green border-b border-[rgba(106,178,32,0.3)] pb-0.5 transition-colors hover:border-green flex-shrink-0"
                            >
                                Request our enzyme guide →
                            </Link>
                        </div>

                        {/* 2-col card grid — each paragraph is a card */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {c.aboutBody.map((para, i) => {
                                const icons = ["🔬", "⚗️", "🌿", "🏭", "📊", "🧬"];
                                const labels = ["Overview", "Process", "Application", "Benefit", "Impact", "Science"];
                                const icon = icons[i % icons.length];
                                const label = labels[i % labels.length];
                                /* Alternate accent colour every other card */
                                const isIndigo = i % 4 === 1 || i % 4 === 2;

                                return (
                                    <div
                                        key={i}
                                        className={`_rev _d${Math.min(i + 1, 4)} group flex flex-col gap-4 p-6 lg:p-8 rounded-[16px] border bg-card transition-all duration-250 hover:bg-bg2 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-default`}
                                        style={{
                                            borderColor: "var(--bdr-m)",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = isIndigo
                                                ? "rgba(114,114,216,0.35)"
                                                : "rgba(106,178,32,0.35)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = "var(--bdr-m)";
                                        }}
                                    >
                                        {/* Icon + label row */}
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-[10px] border flex items-center justify-center text-lg leading-none flex-shrink-0 transition-colors group-hover:border-opacity-50"
                                                style={{
                                                    borderColor: isIndigo ? "rgba(114,114,216,0.25)" : "rgba(106,178,32,0.25)",
                                                    background: isIndigo ? "rgba(58,58,184,0.06)" : "rgba(106,178,32,0.06)",
                                                }}
                                            >
                                                <span style={{ filter: "saturate(0.85)" }}>{icon}</span>
                                            </div>
                                            <span
                                                className="font-mono text-[0.58rem] tracking-[0.18em] uppercase font-medium"
                                                style={{ color: isIndigo ? "var(--indigo-l)" : "var(--green)" }}
                                            >
                                                {label}
                                            </span>
                                        </div>

                                        {/* Paragraph */}
                                        <p
                                            className="font-sans font-light text-fg-m leading-[1.85]"
                                            style={{ fontSize: "clamp(0.88rem, 1vw, 0.97rem)" }}
                                        >
                                            {para}
                                        </p>

                                        {/* Bottom accent line */}
                                        <div
                                            className="h-[1.5px] rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            style={{
                                                background: isIndigo
                                                    ? "linear-gradient(to right, rgba(114,114,216,0.4), transparent)"
                                                    : "linear-gradient(to right, rgba(106,178,32,0.4), transparent)",
                                                transform: "scaleX(0.4)",
                                                transformOrigin: "left",
                                            }}
                                            /* Can't use Tailwind for scaleX on hover — use onMouseEnter workaround */
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scaleX(1)"; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scaleX(0.4)"; }}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile CTA — shown below cards on mobile only */}
                        <div className="mt-10 lg:hidden">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.12em] uppercase text-green border-b border-[rgba(106,178,32,0.3)] pb-0.5 transition-colors hover:border-green"
                            >
                                Request our enzyme guide →
                            </Link>
                        </div>

                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
            §5 CTA BAND — unchanged, great on desktop
        ══════════════════════════════════════════════════ */}
                <section
                    className="relative py-20 lg:py-28 border-t border-border overflow-hidden"
                    style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(106,178,32,0.09), transparent 55%)" }}
                >
                    <div className="relative z-10 max-w-[700px] mx-auto px-5 lg:px-8 text-center">
                        <p className="_rev font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-4">
                            Ready to Optimise?
                        </p>
                        <h2
                            className="_rev _d1 font-serif font-bold text-fg-b leading-[1.02] mb-5"
                            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                        >
                            {c.ctaTitle}
                        </h2>
                        <p className="_rev _d2 font-sans font-light text-fg-m text-[1rem] leading-[1.75] mb-8 max-w-[460px] mx-auto">
                            {c.ctaBody}
                        </p>
                        <div className="_rev _d3 flex flex-wrap gap-3 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase px-6 py-3 rounded-[10px] bg-green text-white border border-green transition-all hover:bg-green-l hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(106,178,32,0.3)]"
                            >
                                Contact Our Team →
                            </Link>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase px-6 py-3 rounded-[10px] bg-transparent text-fg-m border border-border-m transition-all hover:border-[rgba(106,178,32,0.35)] hover:text-green hover:-translate-y-px"
                            >
                                ← All Products
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}

/* ─────────────────────────────────────────────────────────────
   ProductGrid
   ─────────────────────────────────────────────────────────────
   Mobile  : 1-col list; panel expands inline directly below the
             tapped card and auto-scrolls into view.
   Tablet  : 2-col grid; panel spans full width below grid.
   Desktop : 3-col grid; panel spans full width below grid.
───────────────────────────────────────────────────────────── */
function ProductGrid({
    products,
    activeProduct,
    toggleProduct,
}: {
    products: ProductItem[];
    activeProduct: number | null;
    toggleProduct: (i: number) => void;
}) {
    /* Ref map so we can scroll the panel into view on mobile */
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleTap = (i: number) => {
        toggleProduct(i);
        /* On mobile: after state update, scroll panel into view */
        if (window.innerWidth < 640 && activeProduct !== i) {
            setTimeout(() => {
                panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 50);
        }
    };

    return (
        <>
            {/* ── MOBILE (< sm): flat list with inline panels ── */}
            <div className="flex flex-col gap-2 sm:hidden">
                {products.map((p, i) => {
                    const isActive = activeProduct === i;
                    return (
                        <div key={p.code} className="flex flex-col">
                            {/* Card row */}
                            <button
                                onClick={() => handleTap(i)}
                                className={`
                  group relative flex items-center gap-4 px-4 py-4 rounded-[12px] border cursor-pointer text-left w-full
                  transition-all duration-200
                  ${isActive
                                        ? "border-green bg-[rgba(106,178,32,0.07)] rounded-b-none border-b-0"
                                        : "border-border bg-card hover:border-[rgba(106,178,32,0.3)] hover:bg-bg2"
                                    }
                `}
                            >
                                {/* Step number circle */}
                                <div
                                    className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${isActive ? "border-green bg-[rgba(106,178,32,0.12)]" : "border-border bg-bg2"
                                        }`}
                                >
                                    <span className={`font-mono text-[0.58rem] font-semibold ${isActive ? "text-green" : "text-fg-m"}`}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Name + application */}
                                <div className="flex-1 min-w-0">
                                    <div className={`font-serif font-semibold text-[1rem] leading-[1.2] truncate transition-colors ${isActive ? "text-green" : "text-fg-b"}`}>
                                        {p.enzyme}
                                    </div>
                                    <div className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-fg-m opacity-55 mt-0.5 truncate">
                                        {p.application}
                                    </div>
                                </div>

                                {/* Code badge + chevron */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="hidden xs:inline font-mono text-[0.52rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border border-border text-fg-m bg-bg2">
                                        {p.code}
                                    </span>
                                    <span
                                        className={`text-[0.75rem] transition-all duration-200 ${isActive ? "text-green rotate-180" : "text-fg-m opacity-40"}`}
                                        style={{ display: "inline-block", transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
                                    >
                                        ↓
                                    </span>
                                </div>
                            </button>

                            {/* Inline panel — directly below the card, no scroll needed */}
                            <div
                                ref={(el) => { panelRefs.current[i] = el; }}
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    maxHeight: isActive ? "600px" : "0px",
                                    opacity: isActive ? 1 : 0,
                                    transition: "max-height 0.32s cubic-bezier(.4,0,.2,1), opacity 0.22s ease",
                                }}
                            >
                                {isActive && (
                                    <div
                                        className="border border-green border-t-0 rounded-b-[12px] bg-card px-5 py-5 flex flex-col gap-4"
                                        style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
                                    >
                                        <MobileProductDetail product={p} onClose={() => toggleProduct(i)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── TABLET + DESKTOP (≥ sm): card grid + panel below ── */}
            <div className="hidden sm:flex flex-col gap-3">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.map((p, i) => {
                        const isActive = activeProduct === i;
                        return (
                            <button
                                key={p.code}
                                onClick={() => toggleProduct(i)}
                                className={`
                  group relative flex flex-col gap-4 p-6 rounded-[14px] border cursor-pointer text-left w-full
                  transition-all duration-200 select-none
                  ${isActive
                                        ? "border-green bg-[rgba(106,178,32,0.07)] shadow-[0_0_0_1px_rgba(106,178,32,0.18)]"
                                        : "border-border bg-card hover:border-[rgba(106,178,32,0.3)] hover:bg-bg2 hover:-translate-y-0.5"
                                    }
                `}
                            >
                                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-200 ${isActive ? "bg-green shadow-[0_0_6px_rgba(106,178,32,0.7)]" : "bg-border group-hover:bg-[rgba(106,178,32,0.3)]"}`} />

                                <div className="inline-flex w-fit font-mono text-[0.57rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border transition-all duration-200"
                                    style={{
                                        color: isActive ? "var(--green)" : "var(--fg-m)",
                                        borderColor: isActive ? "rgba(106,178,32,0.35)" : "var(--bdr-m)",
                                        background: isActive ? "rgba(106,178,32,0.08)" : "transparent",
                                    }}
                                >
                                    {p.code}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-serif font-semibold leading-[1.15] mb-1 transition-colors ${isActive ? "text-green" : "text-fg-b group-hover:text-green"}`}
                                        style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.18rem)" }}>
                                        {p.enzyme}
                                    </h3>
                                    <p className="font-mono text-[0.56rem] tracking-[0.1em] uppercase text-fg-m opacity-55 leading-[1.4]">{p.application}</p>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {p.tags.map((t) => (
                                        <span key={t} className="font-mono text-[0.5rem] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full border border-border text-fg-m bg-bg2">{t}</span>
                                    ))}
                                </div>

                                <div className={`flex items-center gap-1.5 font-mono text-[0.54rem] tracking-[0.1em] uppercase pt-1 border-t border-border transition-all ${isActive ? "text-green" : "text-fg-m opacity-40 group-hover:opacity-70"}`}>
                                    <span>{isActive ? "Collapse" : "View details"}</span>
                                    <span className="inline-block transition-transform duration-200 text-[0.7rem]" style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}>↓</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Detail panel below the grid */}
                <div
                    className="overflow-hidden"
                    style={{
                        maxHeight: activeProduct !== null ? "700px" : "0px",
                        opacity: activeProduct !== null ? 1 : 0,
                        transition: "max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s ease",
                    }}
                >
                    {activeProduct !== null && (
                        <div className="_expand rounded-[16px] border border-green bg-card p-7 lg:p-10 flex flex-col gap-6"
                            style={{ boxShadow: "0 0 0 1px rgba(106,178,32,0.15), 0 8px 32px rgba(0,0,0,0.18)" }}>
                            <ProductDetail product={products[activeProduct]} onClose={() => toggleProduct(activeProduct)} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

/* Compact detail for mobile inline panel */
function MobileProductDetail({ product, onClose }: { product: ProductItem; onClose: () => void }) {
    return (
        <>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="font-mono text-[0.55rem] tracking-[0.12em] uppercase text-green opacity-70 mb-1">{product.code}</div>
                    <h3 className="font-serif font-bold text-fg-b leading-[1.1]" style={{ fontSize: "1.1rem" }}>{product.enzyme}</h3>
                </div>
                <button onClick={onClose} className="flex-shrink-0 font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1.5 rounded-full border border-border text-fg-m hover:border-green hover:text-green transition-colors mt-0.5">
                    ✕
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-fg-m opacity-50 mb-0.5">Application</div>
                    <div className="font-sans text-fg-b text-[0.85rem] font-medium">{product.application}</div>
                </div>
                <div>
                    <div className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-fg-m opacity-50 mb-0.5">Enzyme Class</div>
                    <div className="font-sans text-fg-b text-[0.85rem] font-medium">{product.enzyme}</div>
                </div>
            </div>

            <div>
                <div className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-fg-m opacity-50 mb-1.5">Purpose</div>
                <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.75]">{product.purpose}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {product.tags.map((t) => (
                    <span key={t} className="font-mono text-[0.5rem] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full border border-border text-fg-m bg-bg2">{t}</span>
                ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.12em] uppercase px-4 py-2.5 rounded-[8px] bg-green text-white border border-green w-fit transition-all hover:bg-green-l">
                Request →
            </Link>
        </>
    );
}

/* Shared detail content */
function ProductDetail({ product, onClose }: { product: ProductItem; onClose: () => void }) {
    return (
        <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <div
                        className="inline-block font-mono text-[0.6rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border mb-3"
                        style={{ color: "var(--green)", borderColor: "rgba(106,178,32,0.3)", background: "rgba(106,178,32,0.07)" }}
                    >
                        {product.code}
                    </div>
                    <h3
                        className="font-serif font-bold text-fg-b leading-[1.05]"
                        style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
                    >
                        {product.enzyme}
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2 items-start">
                    {product.tags.map((t) => (
                        <span
                            key={t}
                            className="font-mono text-[0.54rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border border-border text-fg-m bg-bg2"
                        >
                            {t}
                        </span>
                    ))}
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="font-mono text-[0.58rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-border text-fg-m hover:border-green hover:text-green transition-colors"
                    >
                        ✕ Close
                    </button>
                </div>
            </div>

            <div className="h-[1px] bg-border" />

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Application</span>
                    <span className="font-sans text-fg-b text-[0.95rem] font-medium">{product.application}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Enzyme Class</span>
                    <span className="font-sans text-fg-b text-[0.95rem] font-medium">{product.enzyme}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Product Code</span>
                    <span className="font-mono text-green text-[0.95rem]">{product.code}</span>
                </div>
                <div className="sm:col-span-3 flex flex-col gap-1">
                    <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-m opacity-55">Function &amp; Purpose</span>
                    <p className="font-sans text-fg-m text-[0.95rem] font-light leading-[1.8]">{product.purpose}</p>
                </div>
            </div>

            {/* CTA */}
            <div className="pt-1">
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase px-5 py-2.5 rounded-[10px] bg-green text-white border border-green transition-all hover:bg-green-l hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(106,178,32,0.28)]"
                >
                    Request This Product →
                </Link>
            </div>
        </>
    );
}