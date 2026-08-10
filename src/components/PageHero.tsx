import * as React from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";

export type HeroCrumb = { label: string; href?: string };
export type HeroStatItem = { value: string; label: string };

type PageHeroProps = {
  breadcrumbs?: HeroCrumb[];
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Desktop chips / custom; prefer `stats` for mobile-friendly numbers */
  below?: ReactNode;
  /** Structured stats — mobile strip + desktop chips */
  stats?: HeroStatItem[];
  imageUrl: string;
  imageAlt: string;
  className?: string;
  scrollHint?: boolean;
};

/** Desktop/light chip */
export function HeroStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hero-stat inline-flex w-fit max-w-full items-center gap-2 px-3.5 py-2 rounded-[8px] border border-border bg-card backdrop-blur-sm",
        className
      )}
    >
      <span className="font-sans text-[0.9rem] text-green font-medium leading-none">
        {value}
      </span>
      <span className="font-sans text-[0.52rem] tracking-[0.12em] uppercase text-fg-m">
        {label}
      </span>
    </div>
  );
}

function adaptActionsForDark(actions: ReactNode) {
  return React.Children.map(actions, (child) => {
    if (!React.isValidElement(child)) return child;
    const props = child.props as { variant?: string; className?: string };
    const isSecondary = props.variant === "secondary";
    return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
      variant: isSecondary ? "secondaryDark" : props.variant ?? "primary",
      className: cn(
        props.className,
        "w-full justify-center py-3.5 text-[0.68rem] tracking-[0.12em]",
        isSecondary &&
          "!border-[1.5px] !border-solid !border-[#f0f0ee] !text-[#f0f0ee] !bg-transparent"
      ),
    });
  });
}

function HeroCrumbs({
  breadcrumbs,
  tone,
}: {
  breadcrumbs?: HeroCrumb[];
  tone: "light" | "dark";
}) {
  if (!breadcrumbs?.length) return null;
  return (
    <nav
      className={cn(
        "flex flex-wrap items-center gap-1.5 font-sans text-[0.56rem] sm:text-[0.58rem] tracking-[0.14em] uppercase",
        tone === "dark" ? "text-white/55" : "text-fg-m"
      )}
    >
      {breadcrumbs.map((crumb, i) => (
        <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="opacity-30">/</span>}
          {crumb.href ? (
            <Link
              href={crumb.href}
              className={cn(
                "transition-colors",
                tone === "dark"
                  ? "text-white/55 hover:text-white/85"
                  : "hover:text-green opacity-80 hover:opacity-100"
              )}
            >
              {crumb.label}
            </Link>
          ) : (
            <span className={tone === "dark" ? "text-[#8fd43a]" : "text-green"}>
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

/**
 * Mobile/tablet: full-bleed image hero at ≤100svh (Safari-safe),
 * soft fade into page bg at the bottom, content stacked over the fade.
 */
function MobileTabletHero({
  imageUrl,
  imageAlt,
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  stats,
  actions,
  className,
}: {
  imageUrl: string;
  imageAlt: string;
  breadcrumbs?: HeroCrumb[];
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  stats?: HeroStatItem[];
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("lg:hidden relative overflow-hidden", className)}
      style={{
        /* svh = visible viewport with Safari chrome; never taller than the screen */
        height: "100svh",
        maxHeight: "100dvh",
        minHeight: 520,
        background: "var(--bg)",
      }}
    >
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover block"
          style={{
            objectPosition: "center 32%",
            animation: "_mImgScale 1.1s cubic-bezier(.4,0,.2,1) both",
            filter: "saturate(0.78) contrast(1.06) brightness(0.72)",
          }}
        />
        {/* Slow bottom fade into page background + soft top for nav */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to bottom, rgba(7,9,15,0.5) 0%, rgba(7,9,15,0.12) 22%, rgba(7,9,15,0.05) 38%, rgba(7,9,15,0.35) 58%, rgba(7,9,15,0.78) 78%, var(--bg) 100%)",
              "radial-gradient(ellipse 90% 45% at 55% 88%, rgba(106,178,32,0.12), transparent 65%)",
            ].join(","),
          }}
        />
      </div>

      <div
        className="absolute top-0 left-0 right-0 z-20 px-5"
        style={{
          paddingTop: "max(env(safe-area-inset-top, 0px) + 14px, 52px)",
        }}
      >
        {breadcrumbs?.length ? (
          <HeroCrumbs breadcrumbs={breadcrumbs} tone="dark" />
        ) : eyebrow ? (
          <p className="font-sans text-[0.56rem] tracking-[0.18em] uppercase text-[#8fd43a]">
            {eyebrow}
          </p>
        ) : null}
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 z-10 flex flex-col px-5"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px) + 16px, 20px)",
          gap: "clamp(10px, 2.2svh, 18px)",
        }}
      >
        {eyebrow && breadcrumbs?.length ? (
          <p
            className="font-sans text-[0.56rem] tracking-[0.2em] uppercase text-[#8fd43a]"
            style={{ animation: "_mCardUp .55s .04s cubic-bezier(.4,0,.2,1) both" }}
          >
            {eyebrow}
          </p>
        ) : null}

        <div style={{ animation: "_mCardUp .55s .08s cubic-bezier(.4,0,.2,1) both" }}>
          <div className="text-[#f0f0ee] [&_.text-green]:text-[#8fd43a] [&_.text-fg-b]:text-[#f0f0ee] [&_h1]:font-serif [&_h1]:font-bold [&_h1]:leading-[0.9] [&_h1]:tracking-[-0.02em] [&_h1]:text-[clamp(2.2rem,9.5vw,3.1rem)]">
            {title}
          </div>
          <div
            className="mt-2.5 h-[2px] w-8 rounded-full"
            style={{
              background: "linear-gradient(to right, #6ab220, rgba(106,178,32,0.12))",
            }}
          />
        </div>

        {subtitle && (
          <p
            className="font-sans font-light leading-[1.6] m-0"
            style={{
              fontSize: "clamp(0.84rem, 3.2vw, 0.95rem)",
              color: "rgba(220,222,218,0.78)",
              maxWidth: "94%",
              animation: "_mCardUp .55s .12s cubic-bezier(.4,0,.2,1) both",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {subtitle}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div
            className="flex items-center flex-wrap"
            style={{
              gap: "clamp(10px, 3vw, 16px)",
              animation: "_mCardUp .55s .16s cubic-bezier(.4,0,.2,1) both",
            }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-1.5">
                {i > 0 && (
                  <div
                    className="w-px self-stretch opacity-35"
                    style={{
                      background: "rgba(200,205,195,0.55)",
                      height: 22,
                      marginRight: 2,
                    }}
                  />
                )}
                <div
                  className="flex flex-col gap-0.5"
                  style={{ marginLeft: i > 0 ? 4 : 0 }}
                >
                  <span
                    className="font-sans font-semibold leading-none"
                    style={{
                      fontSize: "clamp(0.85rem, 3.4vw, 1rem)",
                      color: "#8fd43a",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-sans uppercase tracking-[0.11em] leading-none"
                    style={{
                      fontSize: "clamp(0.42rem, 1.7vw, 0.5rem)",
                      color: "rgba(200,205,195,0.55)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {actions && (
          <div
            className="flex flex-col w-full gap-2.5"
            style={{ animation: "_mCardUp .55s .2s cubic-bezier(.4,0,.2,1) both" }}
          >
            {adaptActionsForDark(actions)}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Shared hero: mobile = full-bleed fade; desktop = side fade (unchanged).
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  actions,
  below,
  stats,
  imageUrl,
  imageAlt,
  className,
  scrollHint = true,
}: PageHeroProps) {
  const desktopStats =
    below ??
    (stats?.length ? (
      <>
        {stats.map((s) => (
          <HeroStat key={s.label} value={s.value} label={s.label} />
        ))}
      </>
    ) : null);

  return (
    <>
      <style>{`
        @keyframes _mImgScale {
          from { transform: scale(1.06); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes _mCardUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>

      <MobileTabletHero
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        stats={stats}
        actions={actions}
        className={className}
      />

      {/* Desktop — keep as-is */}
      <section
        className={cn("hidden lg:flex relative flex-col overflow-hidden", className)}
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
          <div className="animate-[fadeUp_0.7s_ease-out_both]">
            <HeroCrumbs breadcrumbs={breadcrumbs} tone="light" />
          </div>
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
          {desktopStats && (
            <div className="flex flex-wrap gap-2 w-fit animate-[fadeUp_0.7s_0.22s_ease-out_both]">
              {desktopStats}
            </div>
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
