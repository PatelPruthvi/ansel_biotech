import { useCallback, useRef, useState, type MouseEvent } from "react";
import { Link } from "wouter";
import anselLogoTrans from "@assets/ansel_logo_transparent.png";
import { industriesWeServe, productCategories } from "@/data/siteStructure";

/** Wider than content column — can bleed past side padding */
/** Desktop / tablet spotlight size; mobile uses smaller CSS override */
const WORDMARK_SIZE_DESKTOP = "clamp(4rem, 22vw, 12.5rem)";

export function Footer() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });

  const onSpotMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = spotlightRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      on: true,
    });
  }, []);

  const onSpotLeave = useCallback(() => {
    setSpot((s) => ({ ...s, on: false }));
  }, []);

  const mask = `radial-gradient(circle 150px at ${spot.x}px ${spot.y}px, #000 0%, #000 26%, transparent 72%)`;

  const wordmarkClass =
    "footer-wordmark font-serif font-bold leading-none tracking-[-0.02em] text-center m-0 whitespace-nowrap";

  return (
    <footer className="relative border-t border-border mt-0 overflow-hidden bg-background">
      {/* Top accent — contained so glow does not spill onto content */}
      <div className="relative w-full h-[10px] overflow-hidden">
        <div
          className="absolute left-0 right-0 top-0 h-[1.5px]"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(106,178,32,0.25) 20%, rgba(106,178,32,0.65) 50%, rgba(106,178,32,0.25) 80%, transparent)",
          }}
        />
        <div
          className="absolute left-0 right-0 top-0 h-[6px] blur-[6px] opacity-50 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(106,178,32,0.28) 50%, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto px-3 sm:px-4 lg:px-5 pt-12 lg:pt-14 pb-8">
        {/*
          Mobile: brand full-width on top (unchanged), then 2×2 link grid.
          Desktop: 5-column row (brand + 4 link groups).
        */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 lg:gap-6">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div className="w-fit max-w-[160px]">
              <img
                src={anselLogoTrans}
                alt="Ansel Biotech"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-fg-m font-sans text-[0.9rem] leading-[1.7] max-w-[260px]">
              Advanced enzyme solutions engineered for industrial precision,
              efficiency, and sustainable processing.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-green">
              Navigation
            </span>
            <Link href="/" className="footer-link">
              Home
            </Link>
            <Link href="/about" className="footer-link">
              About Us
            </Link>
            <Link href="/products" className="footer-link">
              Products
            </Link>
            <Link href="/industries" className="footer-link">
              Industries
            </Link>
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-green">
              Products
            </span>
            {productCategories.map((p) => (
              <Link key={p.id} href={p.href} className="footer-link">
                {p.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-green">
              Industries We Serve
            </span>
            {industriesWeServe.map((ind) => (
              <Link key={ind.id} href={ind.href} className="footer-link">
                {ind.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 min-w-0">
            <span className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-green">
              Get In Touch
            </span>
            <p className="footer-text m-0">Gujarat, India</p>
            <a href="mailto:info@anselbiotech.in" className="footer-email break-all">
              info@anselbiotech.in
            </a>
            <a href="tel:+919327028058" className="footer-link">
              +91 93270 28058
            </a>
          </div>
        </div>
      </div>

      {/* Divider between footer links and wordmark */}
      <div className="max-w-[1160px] mx-auto px-3 sm:px-4 lg:px-5">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Wordmark — smaller on mobile so it fits */}
      <div className="bg-background w-full overflow-hidden">
        <div className="w-full px-2 sm:px-2 py-6 md:py-10">
          <div
            ref={spotlightRef}
            className="relative select-none flex justify-center"
            onMouseMove={onSpotMove}
            onMouseLeave={onSpotLeave}
          >
            <p
              aria-hidden
              className={`footer-wordmark-base ${wordmarkClass} inline-flex items-baseline justify-center`}
              style={{ gap: "0.28em" }}
            >
              <span>Ansel</span>
              <span>BioTech</span>
            </p>

            <p
              aria-hidden
              className={`pointer-events-none absolute inset-0 flex justify-center items-baseline ${wordmarkClass} transition-opacity duration-150`}
              style={{
                gap: "0.28em",
                opacity: spot.on ? 1 : 0,
                WebkitMaskImage: mask,
                maskImage: mask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <span style={{ color: "var(--green)" }}>Ansel</span>
              <span style={{ color: "transparent" }}>BioTech</span>
            </p>

            <p
              aria-hidden
              className={`pointer-events-none absolute inset-0 flex justify-center items-baseline ${wordmarkClass} transition-opacity duration-150`}
              style={{
                gap: "0.28em",
                opacity: spot.on ? 1 : 0,
                WebkitMaskImage: mask,
                maskImage: mask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <span style={{ color: "transparent" }}>Ansel</span>
              <span style={{ color: "var(--indigo-l)" }}>BioTech</span>
            </p>
          </div>
          <span className="sr-only">Ansel BioTech</span>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-m);
          transition: color 0.2s ease, transform 0.2s ease;
          width: fit-content;
        }
        .footer-link:hover {
          color: var(--green);
          transform: translateX(2px);
        }

        .footer-email {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.02em;
          text-transform: none;
          color: var(--fg-m);
          transition: color 0.2s ease, transform 0.2s ease;
          width: fit-content;
          max-width: 100%;
        }
        .footer-email:hover {
          color: var(--green);
          transform: translateX(2px);
        }

        .footer-text {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--fg-m);
          opacity: 0.9;
        }

        .footer-wordmark {
          font-size: clamp(2.05rem, 11.5vw, 2.75rem);
        }
        @media (min-width: 768px) {
          .footer-wordmark {
            font-size: ${WORDMARK_SIZE_DESKTOP};
          }
        }

        .footer-wordmark-base {
          color: var(--fg-b);
          opacity: 0.035;
        }
        .dark .footer-wordmark-base {
          color: var(--fg-d);
          opacity: 0.28;
        }
      `}</style>
    </footer>
  );
}
