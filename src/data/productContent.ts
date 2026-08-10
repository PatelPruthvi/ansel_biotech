/**
 * Product catalog content sourced from the client PDF (content.pdf).
 * Do not add strains, enzymes, or claims not present in the PDF.
 */

export type ProbioticGroup = {
  id: string;
  name: string;
  strains: string[];
};

export type EnzymeItem = {
  id: string;
  name: string;
  description: string;
};

/** PDF §3 — Probiotic Strains by organism group */
export const probioticGroups: ProbioticGroup[] = [
  {
    id: "bacillus",
    name: "Bacillus",
    strains: [
      "Bacillus subtilis",
      "Bacillus licheniformis",
      "Bacillus amyloliquefaciens",
      "Bacillus megaterium",
      "Bacillus pumilus",
      "Bacillus polymyxa",
      "Bacillus coagulans",
    ],
  },
  {
    id: "lactobacillus",
    name: "Lactobacillus",
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
  },
  {
    id: "yeast",
    name: "Yeast",
    strains: ["Saccharomyces cerevisiae", "Saccharomyces boulardii"],
  },
  {
    id: "bifidobacterium",
    name: "Bifidobacterium",
    strains: [
      "Bifidobacterium longum",
      "Bifidobacterium breve",
      "Bifidobacterium lactis",
      "Bifidobacterium bifidum",
      "Bifidobacterium animalis",
    ],
  },
  {
    id: "streptococcus-enterococcus",
    name: "Streptococcus / Enterococcus",
    strains: [
      "Streptococcus thermophilus",
      "Streptococcus faecalis (Enterococcus faecalis)",
      "Pediococcus acidilactici",
      "Enterococcus faecium",
    ],
  },
];

/** PDF §4 — Our Enzyme Portfolio */
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
