import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import anselLogoTrans from "@assets/ansel_logo_transparent.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products & Solutions", href: "/products" },
  { name: "Contact", href: "/contact" },
];

function isActiveHref(location: string, href: string) {
  if (href === "/") return location === "/";
  return location === href || location.startsWith(href + "/");
}

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("ab-theme") || "light"
      : "light"
  );

  // Sliding pill state
  const pillWrapRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [pill, setPill] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("ab-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Measure & position pill behind the active link
  const measurePill = () => {
    const wrap = pillWrapRef.current;
    if (!wrap) return;
    const activeIdx = navLinks.findIndex((l) => isActiveHref(location, l.href));
    const el = activeIdx >= 0 ? linkRefs.current[activeIdx] : null;
    if (!el) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    const wr = wrap.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setPill({ left: er.left - wr.left, width: er.width, visible: true });
  };

  useLayoutEffect(() => {
    measurePill();
    // Re-measure after fonts load (text width can shift)
    const t = setTimeout(measurePill, 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, scrolled]);

  useEffect(() => {
    const onResize = () => measurePill();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${scrolled ? "py-2.5 bg-glass backdrop-blur-xl border-b border-border" : "py-[18px]"
        }`}
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center shrink-0 px-3.5 py-1.5 rounded-xl bg-glass border border-glass-b backdrop-blur-md transition-colors hover:border-border-m"
        >
          <img
            src={anselLogoTrans}
            alt="Ansel Biotech"
            className="h-10 w-auto block"
            style={{ height: 40 }}
          />
        </Link>

        {/* Desktop Nav */}
        <div
          ref={pillWrapRef}
          className="hidden lg:flex relative items-center gap-0.5 p-[5px] rounded-full bg-glass border border-glass-b backdrop-blur-xl"
        >
          {/* Sliding green pill */}
          <div
            className="absolute top-[5px] bottom-[5px] rounded-full bg-green shadow-[0_2px_12px_rgba(106,178,32,0.32)] pointer-events-none transition-[left,width,opacity] duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              left: pill.left,
              width: pill.width,
              opacity: pill.visible ? 1 : 0,
            }}
            aria-hidden
          />

          {navLinks.map((link, i) => {
            const isActive = isActiveHref(location, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[i] = el as HTMLAnchorElement | null;
                }}
                className={`relative z-10 px-4 py-[7px] rounded-full font-mono text-[0.66rem] tracking-[0.1em] uppercase transition-colors whitespace-nowrap ${isActive ? "text-white" : "text-fg-m hover:text-foreground"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="w-[1px] h-[18px] bg-border-m mx-[3px]"></div>
          <button
            onClick={toggleTheme}
            className="relative z-10 w-8 h-8 rounded-full border border-border-m bg-transparent flex items-center justify-center transition-colors hover:border-green hover:bg-[rgba(106,178,32,0.08)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-glass border border-glass-b backdrop-blur-md rounded-lg text-foreground text-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden flex flex-col bg-glass backdrop-blur-xl border-t border-border px-5 py-3.5 pb-[18px] gap-1 absolute w-full top-full" style={{
          background: theme === "dark" ? "#0a0c12" : "#ffffff",
        }}>
          {navLinks.map((link) => {
            const isActive = isActiveHref(location, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-lg font-mono text-[0.68rem] tracking-[0.1em] uppercase transition-colors ${isActive
                  ? "bg-[rgba(106,178,32,0.12)] text-green"
                  : "text-fg-m hover:bg-[rgba(106,178,32,0.1)] hover:text-green"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={() => {
              toggleTheme();
              setMobileMenuOpen(false)
            }}
            className="flex items-center justify-between px-3.5 py-3 mt-2 rounded-lg border border-border transition-all hover:border-green"
          >
            {/* LEFT: Label */}
            <span className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-fg-m">
              Theme
            </span>

            {/* RIGHT: Toggle */}
            <div
              className="relative w-[44px] h-[22px] rounded-full transition-all duration-300"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(106,178,32,0.35)"
                    : "rgba(0,0,0,0.15)",
              }}
            >
              {/* knob */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-white shadow-md flex items-center justify-center text-[10px] transition-all duration-300"
                style={{
                  left: theme === "dark" ? "24px" : "2px",
                }}
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </div>
            </div>
          </button>
        </div>
      )}
    </nav>
  );
}
