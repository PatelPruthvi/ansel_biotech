import { Link } from "wouter";
import anselLogoTrans from "@assets/ansel_logo_transparent.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border mt-0">
      <div className="relative w-full mb-10">
        {/* sharp line */}
        <div
          className="h-[1.5px]"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(106,178,32,0.25) 20%, rgba(106,178,32,0.65) 50%, rgba(106,178,32,0.25) 80%, transparent)",
          }}
        />

        {/* glow */}
        <div
          className="absolute inset-0 blur-[8px] opacity-70"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(106,178,32,0.3) 50%, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 lg:px-8 py-14 lg:py-16 flex flex-col gap-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
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

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-green">
              Navigation
            </span>

            <Link href="/" className="footer-link">Home</Link>
            <Link href="/about" className="footer-link">About Us</Link>
            <Link href="/products" className="footer-link">Products</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-green">
              Solutions
            </span>

            <Link href="/products/sugar" className="footer-link">Sugar Industry</Link>
            <Link href="/products/textile" className="footer-link">Textile</Link>
            <Link href="/products/food" className="footer-link">Food Processing</Link>
            <Link href="/products/pharma" className="footer-link">Pharma</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-green">
              Contact
            </span>

            <p className="footer-text">Gujarat, India</p>
            <p className="footer-text">info@anselbiotech.in</p>
            <p className="footer-text">+91 93270 28058</p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-green font-mono text-[0.65rem] tracking-[0.14em] uppercase mt-2 hover:underline"
            >
              Get in touch →
            </Link>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-[1px] bg-border" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-fg-m text-[0.8rem] font-sans">
            © {year} Ansel Biotech. All rights reserved.
          </p>

        </div>
      </div>

      {/* styles */}
      <style>{`
        .footer-link {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-m);
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: var(--green);
          transform: translateX(2px);
        }

        .footer-text {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--fg-m);
          opacity: 0.9;
        }

        .footer-mini {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--fg-m);
          transition: color 0.2s ease;
        }
        .footer-mini:hover {
          color: var(--green);
        }
      `}</style>
    </footer>
  );
}