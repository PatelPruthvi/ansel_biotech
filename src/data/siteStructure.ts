/**
 * Shared site structure Products categories & Industries We Serve.
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
  /** object-position for card/hero crops of landscape images */
  imagePosition?: string;
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
    href: "/industries/animal-healthcare",
    emoji: "🐔",
    blurb:
      "Probiotics and feed enzymes for poultry, aquaculture and ruminant nutrition.",
    imageUrl: "/assets/products/AnimalFeedEnzyme.png",
    imagePosition: "50% 40%",
  },
  {
    id: "textile",
    name: "Textile Processing",
    href: "/industries/textile",
    emoji: "🧵",
    blurb:
      "Desizing, bio-scouring, biopolishing and other enzyme-based textile processes.",
    imageUrl: "/assets/products/textile_1.png",
    /** Fabric roll sits mid-right — keep it centered on tall mobile crops */
    imagePosition: "68% 48%",
  },
  {
    id: "detergent",
    name: "Detergent & Cleaning",
    href: "/industries/detergent",
    emoji: "🧴",
    blurb:
      "Protease, amylase, lipase and cellulase solutions for detergent formulations.",
    imageUrl: "/assets/products/Detergent.png",
    imagePosition: "50% 45%",
  },
  {
    id: "leather",
    name: "Leather Processing",
    href: "/industries/leather",
    emoji: "👜",
    blurb:
      "Enzyme solutions for soaking, dehairing, bating, degreasing and related processes.",
    imageUrl: "/assets/products/LeatherEnzyme.png",
    imagePosition: "50% 42%",
  },
  {
    id: "food",
    name: "Food Processing",
    href: "/industries/food",
    emoji: "🍞",
    blurb:
      "Enzyme solutions for bakery, dairy and food-processing applications.",
    imageUrl: "/assets/products/FoodEnzyme.png",
    imagePosition: "50% 40%",
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
    imageUrl: "/assets/probiotics/bacillus.jpg",
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
