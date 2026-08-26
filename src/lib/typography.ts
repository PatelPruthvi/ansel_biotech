/** Non-hero section h2 — Montserrat, uppercase, slightly tighter tracking */
export const sectionTitleClass =
  "font-section font-semibold uppercase tracking-[0.06em] text-fg-b leading-[1.05]";

/** Hub / inner-page heroes — Montserrat, black + green lines */
export const heroTitleClass =
  "font-section font-bold leading-[0.93] tracking-[-0.015em]";

export const heroTitleSize = {
  fontSize: "clamp(1.95rem, 4.4vw, 4.4rem)",
} as const;

export const heroTitleSizeLg = {
  fontSize: "clamp(2.15rem, 6vw, 5.2rem)",
} as const;

export const heroTitleSizeContact = {
  fontSize: "clamp(2.1rem, 4.5vw, 5rem)",
} as const;

/** Default section title scale (~1–2 steps down from prior clamps) */
export const sectionTitleSize = {
  fontSize: "clamp(1.4rem, 2.9vw, 2.8rem)",
} as const;

export const sectionTitleSizeHub = {
  fontSize: "clamp(1.25rem, 2.6vw, 2rem)",
} as const;

export const sectionTitleSizeProduct = {
  fontSize: "clamp(1.35rem, 2.7vw, 2.6rem)",
} as const;

export const sectionTitleSizeProcess = {
  fontSize: "clamp(1.4rem, 3.1vw, 2.85rem)",
} as const;
