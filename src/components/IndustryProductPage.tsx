
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { type QuoteProduct } from "@/components/RequestQuoteModal";
import { lazy, Suspense } from "react";
import { CtaButton } from "@/components/CtaButton";

const RequestQuoteModal = lazy(() =>
    import("@/components/RequestQuoteModal").then((mod) => ({
        default: mod.RequestQuoteModal,
    }))
);

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
export interface ProductItem {
    code: string;
    enzyme: string;
    application: string;
    purpose: string;
    tags: string[];
    icon?: string;
}

export interface ProcessStep {
    step: string;
    title: string;
    desc: string;
    icon?: string;
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
    /** Optional richer background cards (icon + label + text). Falls back to aboutBody. */
    aboutItems?: { icon: string; label: string; text: string }[];
    processSteps: ProcessStep[];
    products: ProductItem[];
    ctaTitle: string;
    ctaBody: string;
    slug: string;
    /** Optional section labels — defaults preserve existing industry-page copy */
    productsEyebrow?: string;
    productsTitle?: string;
    processEyebrow?: string;
    processTitle?: string;
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export function IndustryProductPage({ c }: { c: IndustryPageContent }) {
    const [quoteProduct, setQuoteProduct] = useState<QuoteProduct | null>(null);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const [showChevrons, setShowChevrons] = useState(true);

    const openQuote = (p: ProductItem) => {
        setQuoteProduct({
            code: p.code,
            enzyme: p.enzyme,
            application: p.application,
            icon: p.icon ?? "🧪",
        });
    };

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

    useEffect(() => {
        const checkSpace = () => {
            if (!contentRef.current) return;

            const rect = contentRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const remainingSpace = viewportHeight - rect.bottom;

            // threshold = space needed for chevrons (~40px safe)
            setShowChevrons(remainingSpace > 40);
        };

        checkSpace();
        window.addEventListener("resize", checkSpace);

        return () => window.removeEventListener("resize", checkSpace);
    }, []);

    return (
        <>
            <style>{`
        @keyframes _pgFade { from{opacity:0} to{opacity:1} }
        ._pg { animation: _pgFade .4s ease both; }

        ._rev {
          opacity:0; transform:translateY(20px);
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

        @keyframes _mHeroOrb {
          0%   { transform: translate(0%,0%) scale(1); }
          50%  { transform: translate(2%,3%) scale(1.03); }
          100% { transform: translate(-2%,-2%) scale(0.98); }
        }
        @keyframes _mFu {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes _mChev {
          0%,100% { opacity:.15; transform:rotate(45deg); }
          50%     { opacity:.65; transform:rotate(45deg) translate(2px,2px); }
        }

        /* Mobile hero specific animations */
        @keyframes _mImgScale {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        @keyframes _mCardUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes _mStatIn {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }

        .proc-card:hover .proc-icon {
          transform:scale(1.08);
          box-shadow:0 0 0 6px rgba(106,178,32,0.10);
        }
        .proc-icon { transition:transform .25s ease, box-shadow .25s ease }
        @keyframes spin { to{transform:rotate(360deg)} }

        /* Mobile hero pill badge */
        ._m-badge {
          background: rgba(106,178,32,0.15);
          border: 1px solid rgba(106,178,32,0.38);
          color: #8fd43a;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Stat divider */
        ._m-stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.12);
          align-self: stretch;
          margin: 0 2px;
        }
      `}</style>

            <div className="_pg w-full">

                {/* ══════════════════════════════════════════════════
            §1 HERO
        ══════════════════════════════════════════════════ */}

                {/* ── MOBILE HERO (< lg) ──
            Full-bleed image hero with floating content panel.
            Works from 375px (iPhone SE) → 430px (14 Pro Max).
            Uses dvh units + clamp() so nothing overflows or gets cut.
        ── */}
                <section
                    className="lg:hidden relative overflow-hidden"
                    style={{
                        height: "100dvh",
                        minHeight: "600px",
                        background: "var(--bg)",
                    }}
                >
                    {/* ── Full-bleed background image ── */}
                    <div className="absolute inset-0">
                        <img
                            src={c.imageUrl}
                            alt={c.imageAlt}
                            className="w-full h-full object-cover block"
                            style={{
                                animation: "_mImgScale 1.2s cubic-bezier(.4,0,.2,1) both",
                                filter: "saturate(0.7) contrast(1.1) brightness(0.72)",
                            }}
                        />
                        {/* Multi-layer gradient: darkens bottom strongly for text legibility */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: [
                                    "linear-gradient(to bottom, rgba(7,9,15,0.55) 0%, rgba(7,9,15,0.1) 28%, rgba(7,9,15,0.08) 45%, rgba(7,9,15,0.72) 68%, rgba(7,9,15,0.97) 100%)",
                                    "radial-gradient(ellipse 90% 50% at 60% 85%, rgba(106,178,32,0.14), transparent 65%)",
                                ].join(","),
                            }}
                        />
                    </div>

                    {/* ── Top navigation bar ── */}
                    <div
                        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5"
                        style={{ paddingTop: "max(env(safe-area-inset-top, 0px) + 16px, 52px)", paddingBottom: "12px" }}
                    >
                        <nav className="flex items-center gap-1.5 font-mono text-[0.56rem] tracking-[0.14em] uppercase">
                            <Link href="/products" className="text-white/50 hover:text-white/80 transition-colors">Products</Link>
                            <span className="text-white/25">/</span>
                            <span style={{ color: "#8fd43a" }}>{c.industry}</span>
                        </nav>

                        {/* Brand badge — top right */}
                        <span
                            className="_m-badge font-mono text-[0.5rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                            style={{ animation: "_mFu .55s .05s ease both" }}
                        >
                            SELZYME
                        </span>
                    </div>

                    {/* ── Content panel — anchored to bottom ── */}
                    <div
                        ref={contentRef}
                        className="absolute left-0 right-0 bottom-0 z-10 flex flex-col"
                        style={{
                            padding: "0 20px max(env(safe-area-inset-bottom, 0px) + 20px, 24px)",
                            gap: "clamp(14px, 3.5dvh, 24px)",
                        }}
                    >
                        {/* Headline */}
                        <div style={{ animation: "_mCardUp .65s .08s cubic-bezier(.4,0,.2,1) both" }}>
                            <h1
                                className="font-serif font-bold leading-[0.88] tracking-[-0.025em]"
                                style={{
                                    fontSize: "clamp(2.4rem, 10.5vw, 3.4rem)",
                                    color: "#f0f0ee",
                                }}
                            >
                                {c.headline.map((line, i) => (
                                    <span
                                        key={i}
                                        className="block"
                                        style={i === c.accentLine ? { color: "#8fd43a" } : {}}
                                    >
                                        {line}
                                    </span>
                                ))}
                            </h1>
                            {/* Green accent rule */}
                            <div
                                className="mt-2.5 h-[2px] w-8 rounded-full"
                                style={{ background: "linear-gradient(to right, #6ab220, rgba(106,178,32,0.12))" }}
                            />
                        </div>

                        {/* Subtitle */}
                        <p
                            className="font-sans font-light leading-[1.6]"
                            style={{
                                fontSize: "clamp(0.8rem, 3.4vw, 0.9rem)",
                                color: "rgba(220,222,218,0.72)",
                                animation: "_mCardUp .65s .16s cubic-bezier(.4,0,.2,1) both",
                                maxWidth: "92%",
                                // Clamp to 2 lines on very small screens
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {c.subtitle}
                        </p>

                        {/* Stats row */}
                        <div
                            className="flex items-center flex-wrap"
                            style={{
                                gap: "clamp(10px, 3vw, 18px)",
                                animation: "_mCardUp .65s .24s cubic-bezier(.4,0,.2,1) both",
                            }}
                        >
                            {c.quickStats.map((s, i) => (
                                <div key={s.label} className="flex items-center gap-1.5">
                                    {i > 0 && <div className="_m-stat-divider" style={{ height: "22px" }} />}
                                    <div className="flex flex-col gap-0.5" style={{ marginLeft: i > 0 ? "6px" : 0 }}>
                                        <span
                                            className="font-mono font-semibold leading-none"
                                            style={{ fontSize: "clamp(0.85rem, 3.8vw, 1rem)", color: "#8fd43a" }}
                                        >
                                            {s.val}
                                        </span>
                                        <span
                                            className="font-mono uppercase tracking-[0.11em] leading-none"
                                            style={{ fontSize: "clamp(0.42rem, 1.8vw, 0.5rem)", color: "rgba(200,205,195,0.5)" }}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div
                            className="grid gap-2.5"
                            style={{
                                gridTemplateColumns: "1fr 1fr",
                                animation: "_mCardUp .65s .32s cubic-bezier(.4,0,.2,1) both",
                            }}
                        >
                            <CtaButton
                                onClick={() => {
                                    const ourRangeEl = document.getElementById("our-range");
                                    ourRangeEl?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="w-full px-3"
                            >
                                View Products ↓
                            </CtaButton>

                            <CtaButton href="/contact" variant="secondaryDark" className="w-full px-3">
                                Get Quote →
                            </CtaButton>
                        </div>

                        {/* Scroll chevrons */}
                        {showChevrons && (
                            <div
                                className="flex flex-col items-center pointer-events-none self-center"
                                style={{ paddingBottom: "2px", gap: "1px" }}
                            >
                                <span
                                    className="font-mono uppercase tracking-[0.2em]"
                                    style={{ fontSize: "0.42rem", color: "rgba(200,205,195,0.3)", marginBottom: "3px" }}
                                >
                                    Scroll
                                </span>
                                {[0, 0.18, 0.36].map((d, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: "7px",
                                            height: "7px",
                                            borderRight: "1.5px solid rgba(200,205,195,0.45)",
                                            borderBottom: "1.5px solid rgba(200,205,195,0.45)",
                                            transform: "rotate(45deg)",
                                            opacity: 0,
                                            animation: `_mChev 1.8s ${d}s infinite`,
                                            marginTop: i > 0 ? "-3px" : 0,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom green rule */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
                        style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.4), transparent)" }}
                    />
                </section>

                {/* ── DESKTOP HERO (≥ lg) — original, unchanged ── */}
                <section
                    className="hidden lg:flex snap-start relative flex-col overflow-hidden"
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

                    <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1160px] mx-auto w-full px-5 lg:px-8 gap-6 pb-24">
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
                        <div
                            className="flex flex-row gap-2 mt-6"
                            style={{
                                marginTop: "clamp(16px, 6vh, 48px)",
                            }}
                        >
                            <CtaButton
                                onClick={() => {
                                    const NAV_HEIGHT = 80;
                                    const ourRangeEl = document.getElementById("our-range");

                                    if (ourRangeEl) {
                                        const y =
                                            ourRangeEl.getBoundingClientRect().top +
                                            window.pageYOffset -
                                            NAV_HEIGHT;

                                        window.scrollTo({ top: y, behavior: "smooth" });
                                    }
                                }}
                            >
                                View Products ↓
                            </CtaButton>

                            <CtaButton href="/contact" variant="secondary">
                                Get Quote →
                            </CtaButton>
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
            §2 PRODUCTS — unchanged
        ══════════════════════════════════════════════════ */}
                <section className="relative bg-bg2 border-b border-border" style={{ minHeight: "100svh" }}>
                    <div className="max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-16 lg:py-24">
                        <div className="_rev mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                            <div>
                                <p id="our-range" className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-2">
                                    {c.productsEyebrow ?? "Our Range"}
                                </p>
                                <h2 className="font-serif font-bold text-fg-b leading-[1]" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                                    {c.productsTitle ?? "SELZYME Products"}
                                </h2>
                            </div>
                            <p className="font-sans font-light text-fg-m text-[0.84rem] max-w-[240px] leading-[1.6] opacity-70">
                                {c.products.length} formulation{c.products.length !== 1 ? "s" : ""} · tap any card to request
                            </p>
                        </div>
                        <div
                            className="grid gap-4"
                            style={{
                                gridTemplateColumns: c.products.length > 6
                                    ? "repeat(auto-fill, minmax(240px, 1fr))"
                                    : "repeat(auto-fill, minmax(280px, 1fr))",
                            }}
                        >
                            {c.products.map((p, i) => (
                                <ProductCard key={p.code} product={p} index={i} onRequestQuote={() => openQuote(p)} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
            §3 PROCESS — unchanged
        ══════════════════════════════════════════════════ */}
                <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "100svh" }}>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at 80% 20%, rgba(106,178,32,0.06), transparent 55%)," +
                                "radial-gradient(ellipse at 10% 80%, rgba(58,58,184,0.05), transparent 50%)",
                        }}
                    />
                    <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-16 lg:py-24 gap-14">
                        <div className="_rev">
                            <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-2">
                                {c.processEyebrow ?? "How It Works"}
                            </p>
                            <h2 className="font-serif font-bold text-fg-b leading-[1]" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                                {c.processTitle ?? "The Enzymatic Process"}
                            </h2>
                        </div>
                        <div className="relative">
                            <div
                                className={`hidden absolute top-[44px] left-0 right-0 h-[1px] ${
                                    c.processSteps.length >= 5 ? "xl:block" : "lg:block"
                                }`}
                                style={{ background: "linear-gradient(to right, transparent 2%, rgba(106,178,32,0.2) 10%, rgba(106,178,32,0.2) 90%, transparent 98%)" }}
                            />
                            <div
                                className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${
                                    c.processSteps.length >= 5
                                        ? "xl:grid-cols-5 lg:grid-cols-3"
                                        : c.processSteps.length === 3
                                          ? "lg:grid-cols-3"
                                          : "lg:grid-cols-4"
                                }`}
                            >
                                {c.processSteps.map((s, i) => {
                                    const defaultIcons = ["🧵", "💧", "⚗️", "✨", "🧴"];
                                    const icon = s.icon ?? defaultIcons[i % defaultIcons.length];
                                    return (
                                        <div
                                            key={i}
                                            className={`_rev _d${Math.min(i + 1, 4)} proc-card relative flex flex-col gap-5 p-7 rounded-[14px] border border-border bg-card transition-all duration-300 hover:border-[rgba(106,178,32,0.35)] hover:bg-bg2 hover:-translate-y-1 group`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="proc-icon relative w-11 h-11 rounded-full border-2 border-[rgba(106,178,32,0.3)] bg-bg2 flex items-center justify-center flex-shrink-0 group-hover:border-green group-hover:bg-[rgba(106,178,32,0.10)] transition-colors z-10">
                                                    <span className="font-mono text-[0.58rem] text-green font-semibold">{s.step}</span>
                                                </div>
                                                <span className="text-2xl leading-none select-none" style={{ filter: "saturate(0.85)" }}>{icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-sans font-semibold text-fg-b text-[0.97rem] mb-2 group-hover:text-green transition-colors leading-[1.2]">{s.title}</h3>
                                                <p className="font-sans font-light text-fg-m text-[0.84rem] leading-[1.7]">{s.desc}</p>
                                            </div>
                                            {i < c.processSteps.length - 1 && (
                                                <div className={`hidden absolute -right-[13px] top-[40px] z-20 items-center justify-center w-6 h-6 rounded-full bg-bg border border-border text-fg-m text-[0.7rem] opacity-35 ${
                                                    c.processSteps.length >= 5 ? "xl:flex" : "lg:flex"
                                                }`}>›</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.2), transparent)" }} />
                        <div className="_rev flex flex-col gap-4">
                            <blockquote className="relative pl-5 border-l-2 border-green max-w-[520px]">
                                <p className="font-serif font-light text-fg text-[1.02rem] leading-[1.8] italic">"{c.aboutSub}"</p>
                            </blockquote>
                            <CtaButton href="/contact" variant="text" className="w-fit text-[0.62rem] tracking-[0.12em]">
                                Speak to our team →
                            </CtaButton>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
            §4 BACKGROUND — unchanged
        ══════════════════════════════════════════════════ */}
                <section
                    className="relative border-t border-border overflow-hidden"
                    style={{
                        minHeight: "100svh",
                        background: "radial-gradient(ellipse at 85% 40%, rgba(58,58,184,0.05), transparent 50%), radial-gradient(ellipse at 15% 80%, rgba(106,178,32,0.04), transparent 50%)",
                    }}
                >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
                        style={{ backgroundImage: "linear-gradient(var(--fg-m) 1px, transparent 1px), linear-gradient(90deg, var(--fg-m) 1px, transparent 1px)", backgroundSize: "72px 72px" }}
                    />
                    <div className="relative z-10 max-w-[1160px] mx-auto w-full px-5 lg:px-8 py-20 lg:py-28">
                        <div className="_rev mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            <div>
                                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">Background</p>
                                <h2 className="font-serif font-bold text-fg-b leading-[1.02]" style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}>{c.aboutTitle}</h2>
                            </div>
                            <CtaButton href="/contact" variant="text" className="hidden lg:inline-flex flex-shrink-0 text-[0.62rem] tracking-[0.12em]">
                                Request our enzyme guide →
                            </CtaButton>
                        </div>
                        <div className={`grid grid-cols-1 gap-4 ${
                            (c.aboutItems?.length ?? c.aboutBody.length) === 1
                                ? "max-w-[560px]"
                                : "lg:grid-cols-2"
                        }`}>
                            {(c.aboutItems ??
                                c.aboutBody.map((para, i) => ({
                                    icon: ["🔬", "⚗️", "🌿", "🏭", "📊", "🧬"][i % 6],
                                    label: ["Overview", "Process", "Application", "Benefit", "Impact", "Science"][i % 6],
                                    text: para,
                                }))
                            ).map((item, i) => {
                                const isIndigo = i % 4 === 1 || i % 4 === 2;
                                return (
                                    <div
                                        key={`${item.label}-${i}`}
                                        className={`_rev _d${Math.min(i + 1, 4)} group flex flex-col gap-4 p-6 lg:p-8 rounded-[14px] border bg-card transition-all duration-250 hover:bg-bg2 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-default border-border-m`}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = isIndigo ? "rgba(114,114,216,0.35)" : "rgba(106,178,32,0.35)"; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-11 h-11 rounded-[10px] border flex items-center justify-center text-[1.25rem] leading-none flex-shrink-0"
                                                style={{ borderColor: isIndigo ? "rgba(114,114,216,0.25)" : "rgba(106,178,32,0.25)", background: isIndigo ? "rgba(58,58,184,0.06)" : "rgba(106,178,32,0.06)" }}
                                            >
                                                <span style={{ filter: "saturate(0.85)" }}>{item.icon}</span>
                                            </div>
                                            <span className="font-sans text-[0.58rem] tracking-[0.18em] uppercase font-medium" style={{ color: isIndigo ? "var(--indigo-l)" : "var(--green)" }}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <p className="font-sans font-light text-fg-m leading-[1.85]" style={{ fontSize: "clamp(0.88rem, 1vw, 0.97rem)" }}>{item.text}</p>
                                        <div
                                            className="h-[1.5px] rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            style={{ background: isIndigo ? "linear-gradient(to right, rgba(114,114,216,0.4), transparent)" : "linear-gradient(to right, rgba(106,178,32,0.4), transparent)" }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-10 lg:hidden">
                            <CtaButton href="/contact" variant="text" className="text-[0.62rem] tracking-[0.12em]">
                                Request our enzyme guide →
                            </CtaButton>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
            §5 CTA BAND — short ending (Textile format)
        ══════════════════════════════════════════════════ */}
                <section
                    className="relative py-12 md:py-16 border-t border-border overflow-hidden"
                    style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(106,178,32,0.09), transparent 55%)" }}
                >
                    <div className="relative z-10 max-w-[700px] mx-auto px-5 lg:px-8 text-center">
                        <p className="_rev font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3">Ready to Optimise?</p>
                        <h2 className="_rev _d1 font-serif font-bold text-fg-b leading-[1.05] mb-3 whitespace-pre-line" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>{c.ctaTitle}</h2>
                        <p className="_rev _d2 font-sans font-light text-fg-m text-[0.95rem] leading-[1.75] mb-6 max-w-[460px] mx-auto">{c.ctaBody}</p>
                        <div className="_rev _d3 flex flex-wrap gap-3 justify-center">
                            <CtaButton href="/contact">
                                Contact Our Team →
                            </CtaButton>
                            <CtaButton href="/products" variant="secondary">
                                ← All Products
                            </CtaButton>
                        </div>
                    </div>
                </section>

            </div>

            <Suspense fallback={null}>
                <RequestQuoteModal product={quoteProduct} onClose={() => setQuoteProduct(null)} />
            </Suspense>
        </>
    );
}

/* ─────────────────────────────────────────
   ProductCard — unchanged
───────────────────────────────────────── */
function ProductCard({
    product,
    index,
    onRequestQuote,
}: {
    product: ProductItem;
    index: number;
    onRequestQuote: () => void;
}) {
    return (
        <button
            onClick={onRequestQuote}
            className="group relative flex flex-col gap-4 p-5 sm:p-6 rounded-[14px] border border-border bg-card text-left w-full cursor-pointer transition-all duration-200 hover:border-[rgba(106,178,32,0.4)] hover:bg-bg2 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
            style={{ animationDelay: `${index * 40}ms` }}
        >
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5">
                <span className="font-mono text-[0.52rem] tracking-[0.1em] uppercase text-fg-m opacity-40 group-hover:opacity-80 transition-opacity">↗ Quote</span>
                <div className="w-2 h-2 rounded-full bg-border group-hover:bg-green group-hover:shadow-[0_0_6px_rgba(106,178,32,0.6)] transition-all duration-200" />
            </div>
            <div className="inline-flex w-fit font-mono text-[0.52rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border border-border-m text-fg-m">
                {product.code}
            </div>
            <div>
                <h3 className="font-serif font-semibold leading-[1.2] mb-1 text-fg-b group-hover:text-green transition-colors text-[1rem] sm:text-[1.05rem]">
                    {product.enzyme}
                </h3>
                <p className="font-mono text-[0.52rem] tracking-[0.1em] uppercase text-fg-m opacity-55 mb-2">{product.application}</p>
                <p
                    className="font-sans font-light text-fg-m text-[0.82rem] leading-[1.6] overflow-hidden"
                    style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                >
                    {product.purpose}
                </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {product.tags.slice(0, 3).map((t) => (
                    <span key={t} className="font-mono text-[0.46rem] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full border border-border text-fg-m bg-bg2">{t}</span>
                ))}
            </div>
            <div className="sm:hidden pt-2">
                <div className="w-full text-center font-mono text-[0.6rem] tracking-[0.12em] uppercase px-4 py-2 rounded-[3px] bg-[rgba(106,178,32,0.08)] text-green border border-[rgba(106,178,32,0.25)]">
                    Tap to Request Quote →
                </div>
            </div>
        </button>
    );
}

