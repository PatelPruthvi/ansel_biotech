import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";

export type HeroCrumb = { label: string; href?: string };

type PageHeroProps = {
  breadcrumbs?: HeroCrumb[];
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Extra content under subtitle (stats, chips, etc.) */
  below?: ReactNode;
  imageUrl: string;
  imageAlt: string;
  className?: string;
  scrollHint?: boolean;
};

/**
 * Textile-style hero: full-bleed image that fades into the page background
 * behind left-aligned copy. Shared by product + industry detail/hub pages.
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  actions,
  below,
  imageUrl,
  imageAlt,
  className,
  scrollHint = true,
}: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [showChevrons, setShowChevrons] = useState(true);

  useEffect(() => {
    const checkSpace = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      setShowChevrons(window.innerHeight - rect.bottom > 40);
    };
    checkSpace();
    window.addEventListener("resize", checkSpace);
    return () => window.removeEventListener("resize", checkSpace);
  }, []);

  const crumbs = breadcrumbs?.length ? (
    <nav className="flex flex-wrap items-center gap-1.5 font-sans text-[0.58rem] tracking-[0.15em] uppercase">
      {breadcrumbs.map((crumb, i) => (
        <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="opacity-30">/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-green transition-colors opacity-70 hover:opacity-100">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-green">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  ) : null;

  return (
    <>
      {/* Mobile — full-bleed fade (textile pattern) */}
      <section
        className={cn("lg:hidden relative overflow-hidden", className)}
        style={{ height: "100dvh", minHeight: "600px", background: "var(--bg)" }}
      >
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover block"
            style={{
              animation: "_mImgScale 1.2s cubic-bezier(.4,0,.2,1) both",
              filter: "saturate(0.7) contrast(1.1) brightness(0.72)",
            }}
          />
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

        <div
          className="absolute top-0 left-0 right-0 z-20 px-5"
          style={{
            paddingTop: "max(env(safe-area-inset-top, 0px) + 16px, 52px)",
            paddingBottom: "12px",
          }}
        >
          <div className="text-white/70 [&_.text-green]:text-[#8fd43a]">{crumbs}</div>
        </div>

        <div
          ref={contentRef}
          className="absolute left-0 right-0 bottom-0 z-10 flex flex-col"
          style={{
            padding: "0 20px max(env(safe-area-inset-bottom, 0px) + 20px, 24px)",
            gap: "clamp(14px, 3.5dvh, 24px)",
          }}
        >
          {eyebrow && (
            <p className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-[#8fd43a]">
              {eyebrow}
            </p>
          )}
          <div
            className="text-[#f0f0ee] [&_.text-green]:text-[#8fd43a] [&_.text-fg-b]:text-[#f0f0ee]"
            style={{ animation: "_mCardUp .65s .08s cubic-bezier(.4,0,.2,1) both" }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              className="font-sans font-light leading-[1.65] text-[rgba(220,222,218,0.72)] max-w-[92%]"
              style={{
                fontSize: "clamp(0.8rem, 3.4vw, 0.9rem)",
                animation: "_mCardUp .65s .16s cubic-bezier(.4,0,.2,1) both",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {subtitle}
            </div>
          )}
          {below && (
            <div
              className="[&_*]:border-[rgba(255,255,255,0.14)] [&_*]:bg-[rgba(255,255,255,0.06)] [&_*]:text-[rgba(220,222,218,0.85)] [&_.text-green]:text-[#8fd43a]"
              style={{ animation: "_mCardUp .65s .24s cubic-bezier(.4,0,.2,1) both" }}
            >
              {below}
            </div>
          )}
          {actions && (
            <div
              className="flex flex-wrap gap-2.5"
              style={{ animation: "_mCardUp .65s .32s cubic-bezier(.4,0,.2,1) both" }}
            >
              {actions}
            </div>
          )}
          {scrollHint && showChevrons && (
            <div className="flex flex-col items-center pointer-events-none self-center" style={{ gap: "1px" }}>
              <span
                className="font-sans uppercase tracking-[0.2em]"
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

        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(106,178,32,0.4), transparent)",
          }}
        />

        <style>{`
          @keyframes _mImgScale {
            from { transform: scale(1.08); opacity: 0.6; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes _mCardUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes _mChev {
            0%, 100% { opacity: 0.15; }
            40% { opacity: 0.7; }
          }
        `}</style>
      </section>

      {/* Desktop — full-bleed image fading into left text plane */}
      <section
        className={cn(
          "hidden lg:flex relative flex-col overflow-hidden",
          className
        )}
        style={{ height: "100svh", minHeight: 560 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
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
          {crumbs && (
            <div className="text-fg-m animate-[fadeUp_0.7s_ease-out_both]">{crumbs}</div>
          )}
          {eyebrow && (
            <p className="font-sans text-[0.62rem] tracking-[0.22em] uppercase text-green animate-[fadeUp_0.7s_0.05s_ease-out_both]">
              {eyebrow}
            </p>
          )}
          <div className="animate-[fadeUp_0.7s_0.1s_ease-out_both]">{title}</div>
          {subtitle && (
            <div
              className="font-sans font-light text-fg-m leading-[1.78] max-w-[480px] animate-[fadeUp_0.7s_0.16s_ease-out_both]"
              style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}
            >
              {subtitle}
            </div>
          )}
          {below && (
            <div className="animate-[fadeUp_0.7s_0.22s_ease-out_both]">{below}</div>
          )}
          {actions && (
            <div className="flex flex-wrap gap-3 mt-2 animate-[fadeUp_0.7s_0.28s_ease-out_both]">
              {actions}
            </div>
          )}
        </div>

        {scrollHint && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0.5 pointer-events-none animate-[fadeIn_1.2s_1.2s_ease-out_both]">
            <span className="font-sans text-[0.52rem] tracking-[0.2em] uppercase text-fg-m opacity-40 mb-1">
              Scroll
            </span>
            <div
              className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 animate-[chev_1.8s_0s_infinite]"
              style={{ transform: "rotate(45deg)" }}
            />
            <div
              className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-1.5 animate-[chev_1.8s_0.18s_infinite]"
              style={{ transform: "rotate(45deg)" }}
            />
            <div
              className="w-[10px] h-[10px] border-r-[1.5px] border-b-[1.5px] border-fg-m opacity-0 -mt-1.5 animate-[chev_1.8s_0.36s_infinite]"
              style={{ transform: "rotate(45deg)" }}
            />
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(106,178,32,0.35), transparent)",
          }}
        />
      </section>
    </>
  );
}

export function HeroScrollCta({
  targetId,
  children = "View details ↓",
}: {
  targetId: string;
  children?: ReactNode;
}) {
  return (
    <CtaButton
      onClick={() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </CtaButton>
  );
}
