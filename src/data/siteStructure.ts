/**
 * Shared site structure — Products categories & Industries We Serve.
 * Single source for Home marquee, Products chips, Footer, and hubs.
 */

export type IndustryLink = {
  id: string;
  name: string;
  href: string;
  emoji: string;
  /** Super-short card blurb for hub pages */
  blurb: string;
  imageUrl: string;
};

export type ProductCategoryLink = {
  id: string;
  name: string;
  href: string;
  tag: string;
  desc: string;
  icon: string;
  imageUrl: string;
};

/** Top-level Industries We Serve (Aqua is nested under Animal Healthcare, not listed here). */
export const industriesWeServe: IndustryLink[] = [
  {
    id: "animal-healthcare",
    name: "Animal Healthcare",
    href: "/products/animal-healthcare",
    emoji: "🐔",
    blurb: "Poultry, Aqua and Ruminant feed solutions.",
    imageUrl: "/assets/products/AnimalFeedEnzyme.png",
  },
  {
    id: "textile",
    name: "Textile",
    href: "/products/textile",
    emoji: "🧵",
    blurb: "Desizing to biowashing, enzyme by step.",
    imageUrl: "/assets/products/textile_1.png",
  },
  {
    id: "detergent",
    name: "Detergent",
    href: "/products/detergent",
    emoji: "🧴",
    blurb: "Stain enzymes and custom detergent blends.",
    imageUrl: "/assets/products/Detergent.png",
  },
  {
    id: "leather",
    name: "Leather",
    href: "/products/leather",
    emoji: "👜",
    blurb: "Soaking, dehairing, bating and degreasing.",
    imageUrl: "/assets/products/Detergent.png",
  },
  {
    id: "food",
    name: "Food",
    href: "/products/food",
    emoji: "🍞",
    blurb: "Bakery and dairy processing enzymes.",
    imageUrl: "/assets/products/FoodEnzyme.png",
  },
];

/** Shared chip styles for Products page industry discovery (emoji + label). */
export const industryChipClassName =
  "inline-flex items-center gap-1.5 flex-shrink-0 font-sans text-[0.56rem] tracking-[0.08em] uppercase px-2.5 py-1.5 rounded-full border border-border-m text-fg-m transition-all hover:border-[rgba(106,178,32,0.4)] hover:text-green hover:bg-[rgba(106,178,32,0.06)]";

export const productCategories: ProductCategoryLink[] = [
  {
    id: "probiotics",
    name: "Probiotic Strains",
    href: "/products/probiotics",
    tag: "Organism groups",
    desc: "Strains by genus: Bacillus, Lactobacillus, Yeast, Bifidobacterium, Streptococcus / Enterococcus.",
    icon: "🦠",
    imageUrl: "/assets/products/AnimalFeedEnzyme.png",
  },
  {
    id: "enzymes",
    name: "Enzymes",
    href: "/products/enzymes",
    tag: "Enzyme portfolio",
    desc: "Nine core enzymes, plus custom formulation support when you need a tailored blend.",
    icon: "⚗️",
    imageUrl: "/assets/products/PharmaEnzyme.png",
  },
];
