import * as React from "react";
import { Link } from "wouter";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Brand CTA system — visual reference: Home hero buttons.
 * Primary = filled green + shimmer; Secondary = outline + indigo hover.
 */
export const ctaButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans text-[0.7rem] font-normal tracking-[0.14em] uppercase",
    "px-7 py-3 rounded-[3px] border-[1.5px]",
    "transition-all duration-200",
    "disabled:opacity-50 disabled:pointer-events-none disabled:hover:shadow-none",
    "active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "btn-p relative overflow-hidden text-white border-green bg-green hover:shadow-[0_4px_18px_rgba(106,178,32,0.28)]",
        secondary:
          "bg-transparent text-fg-m border-border-m hover:border-indigo-l hover:text-indigo-l",
        /** Outline CTA on dark / image heroes */
        secondaryDark:
          "bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.75)] border-[rgba(255,255,255,0.14)] backdrop-blur-[8px] hover:border-[rgba(255,255,255,0.3)] hover:text-white",
        /** Compact text CTA — not an underline novelty link */
        text: "border-transparent bg-transparent text-green px-0 py-1 rounded-none hover:text-green-l hover:shadow-none active:scale-100",
      },
      size: {
        default: "",
        /** Slightly tighter for modal success / dense rows */
        sm: "px-5 py-2.5 text-[0.65rem]",
        /** Full-width form submits */
        block: "w-full px-5 py-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type CtaButtonVariantProps = VariantProps<typeof ctaButtonVariants>;

type SharedProps = CtaButtonVariantProps & {
  className?: string;
  children?: React.ReactNode;
};

type CtaLinkProps = SharedProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: string;
  };

type CtaNativeButtonProps = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

export type CtaButtonProps = CtaLinkProps | CtaNativeButtonProps;

export function CtaButton(props: CtaButtonProps) {
  const { className, variant, size, children, ...rest } = props;
  const classes = cn(ctaButtonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as Omit<CtaLinkProps, keyof SharedProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as Omit<CtaNativeButtonProps, keyof SharedProps>;
  return (
    <button type={buttonRest.type ?? "button"} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
