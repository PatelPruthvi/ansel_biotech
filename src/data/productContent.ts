/**
 * Product catalog content sourced from the client PDF (content.pdf).
 * Do not add strains, enzymes, or claims not present in the PDF.
 */

export type StrainPin = {
  x: number;
  y: number;
  side: "left" | "right";
};

export type ProbioticGroup = {
  id: string;
  name: string;
  shortName?: string;
  tagline?: string;
  image: string;
  strains: string[];
  pins: StrainPin[];
};

export type EnzymeItem = {
  id: string;
  name: string;
  description: string;
};

/** PDF §3 Probiotic Strains by organism group */
export const probioticGroups: ProbioticGroup[] = [
  {
    id: "bacillus",
    name: "Bacillus",
    tagline: "Spore-forming probiotic",
    image: "/assets/probiotics/bacillus.jpg",
    strains: [
      "Bacillus subtilis",
      "Bacillus licheniformis",
      "Bacillus amyloliquefaciens",
      "Bacillus megaterium",
      "Bacillus pumilus",
      "Bacillus polymyxa",
      "Bacillus coagulans",
    ],
    pins: [
      { x: 34, y: 36, side: "right" },
      { x: 62, y: 28, side: "left" },
      { x: 74, y: 46, side: "left" },
      { x: 28, y: 54, side: "right" },
      { x: 58, y: 58, side: "left" },
      { x: 40, y: 74, side: "right" },
      { x: 70, y: 76, side: "left" },
    ],
  },
  {
    id: "lactobacillus",
    name: "Lactobacillus",
    tagline: "Lactic acid bacteria",
    image: "/assets/probiotics/lactobacillus.jpg",
    strains: [
      "Lactobacillus acidophilus",
      "Lactobacillus rhamnosus",
      "Lactobacillus plantarum",
      "Lactobacillus sporogenes",
      "Lactobacillus casei",
      "Lactobacillus reuterii",
      "Lactobacillus fermentum",
      "Lactococcus lactis",
    ],
    pins: [
      { x: 30, y: 32, side: "right" },
      { x: 58, y: 26, side: "left" },
      { x: 76, y: 40, side: "left" },
      { x: 42, y: 48, side: "right" },
      { x: 64, y: 56, side: "left" },
      { x: 26, y: 64, side: "right" },
      { x: 48, y: 74, side: "right" },
      { x: 72, y: 72, side: "left" },
    ],
  },
  {
    id: "yeast",
    name: "Saccharomyces",
    tagline: "Beneficial yeast strains",
    image: "/assets/probiotics/saccharomyces.jpg",
    strains: ["Saccharomyces cerevisiae", "Saccharomyces boulardii"],
    pins: [
      { x: 48, y: 36, side: "right" },
      { x: 52, y: 62, side: "left" },
    ],
  },
  {
    id: "bifidobacterium",
    name: "Bifidobacterium",
    tagline: "Gut-health probiotic",
    image: "/assets/probiotics/bifidobacterium.jpg",
    strains: [
      "Bifidobacterium longum",
      "Bifidobacterium breve",
      "Bifidobacterium lactis",
      "Bifidobacterium bifidum",
      "Bifidobacterium animalis",
    ],
    pins: [
      { x: 38, y: 34, side: "right" },
      { x: 62, y: 30, side: "left" },
      { x: 50, y: 52, side: "right" },
      { x: 32, y: 68, side: "right" },
      { x: 68, y: 70, side: "left" },
    ],
  },
  {
    id: "streptococcus-enterococcus",
    name: "Streptococcus / Enterococcus",
    shortName: "Enterococcus",
    tagline: "Lactic cultures & enterococci",
    image: "/assets/probiotics/enterococcus.jpg",
    strains: [
      "Streptococcus thermophilus",
      "Streptococcus faecalis (Enterococcus faecalis)",
      "Pediococcus acidilactici",
      "Enterococcus faecium",
    ],
    pins: [
      { x: 36, y: 38, side: "right" },
      { x: 62, y: 34, side: "left" },
      { x: 44, y: 58, side: "right" },
      { x: 68, y: 66, side: "left" },
    ],
  },
];

/** PDF §4 Our Enzyme Portfolio */
export const enzymePortfolio: EnzymeItem[] = [
  {
    id: "amylase",
    name: "Amylase",
    description:
      "Breaks down starch and is widely used in textile desizing, food processing, detergents and animal nutrition.",
  },
  {
    id: "protease",
    name: "Protease",
    description:
      "Breaks down proteins and is used in feed, detergents, leather processing and food applications.",
  },
  {
    id: "phytase",
    name: "Phytase",
    description:
      "Helps break down phytate and improve phosphorus utilization in animal feed.",
  },
  {
    id: "xylanase",
    name: "Xylanase",
    description:
      "Breaks down xylan and supports improved feed digestibility and industrial processing.",
  },
  {
    id: "cellulase",
    name: "Cellulase",
    description:
      "Acts on cellulose and is widely used in textile biopolishing, biowashing and detergent applications.",
  },
  {
    id: "pectinase",
    name: "Pectinase",
    description:
      "Breaks down pectin and is used in textile bioscouring and food processing.",
  },
  {
    id: "catalase",
    name: "Catalase",
    description:
      "Breaks down residual hydrogen peroxide and is particularly useful after textile bleaching.",
  },
  {
    id: "lipase",
    name: "Lipase",
    description:
      "Breaks down fats and oils and is used in detergents, food processing and animal nutrition.",
  },
  {
    id: "mannanase",
    name: "Mannanase",
    description:
      "Breaks down mannan-based compounds and is particularly useful in detergent formulations and feed applications.",
  },
];

/** Concise hub copy derived from PDF Products framing (not full lists). */
export const productHubCopy = {
  probiotics: {
    name: "Probiotic Strains",
    intro:
      "Probiotic strains organised by organism group, including Bacillus, Lactobacillus, Yeast, Bifidobacterium, and Streptococcus / Enterococcus.",
    cta: "Explore Probiotic Strains",
  },
  enzymes: {
    name: "Enzymes",
    intro:
      "Individual enzymes across our portfolio, including Amylase, Protease, Phytase, Xylanase, Cellulase, Pectinase, Catalase, Lipase and Mannanase.",
    cta: "Explore Enzymes",
  },
} as const;

/** PDF custom enzyme CTA */
export const customEnzymeCta = {
  title: "Need a customized enzyme?",
  body: "We can develop enzyme combinations based on your application, activity requirement, process conditions and dosage.",
  button: "Request a Customized Formulation",
} as const;

