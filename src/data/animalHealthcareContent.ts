/**
 * Animal Healthcare + Aquaculture content from client PDF (content.pdf).
 * Swine is mentioned in the PDF but is NOT a confirmed top-level tab — omitted from UI.
 */

export type AnimalSolution = {
  id: string;
  name: string;
  description: string;
  benefits: string[];
};

export type AquaSolution = {
  id: string;
  name: string;
  description: string;
};

/** Shared Animal Healthcare solutions from PDF §5 */
export const animalHealthcareSolutions: AnimalSolution[] = [
  {
    id: "phytase",
    name: "Phytase",
    description:
      "Releases phosphorus from phytate in plant-based feeds, reducing the need for inorganic phosphate supplementation.",
    benefits: [
      "Improved phosphorus availability",
      "Reduced feed costs",
      "Lower environmental impact",
    ],
  },
  {
    id: "xylanase",
    name: "Xylanase",
    description:
      "Breaks down arabinoxylans in cereal grains, improving nutrient digestibility and feed conversion ratios.",
    benefits: [
      "Enhanced energy utilization",
      "Better gut health",
      "Improved weight gain",
    ],
  },
  {
    id: "protease",
    name: "Protease",
    description:
      "Enhances protein digestibility in soybean meal and other vegetable proteins.",
    benefits: [
      "Higher protein absorption",
      "Reduced nitrogen excretion",
      "Cost-effective formulations",
    ],
  },
  {
    id: "multi-enzyme",
    name: "Multi-enzyme Complex",
    description:
      "Comprehensive enzyme blend targeting multiple substrates for maximum feed efficiency.",
    benefits: [
      "Complete feed optimization",
      "Flexible application",
      "Consistent performance",
    ],
  },
  {
    id: "probiotic-blend",
    name: "Probiotics Blend for Animal Healthcare",
    description:
      "Comprehensive probiotic blend supporting gut health, microbial balance, and overall animal performance.",
    benefits: [
      "Supports gut health",
      "Maintains microbial balance",
      "Improves nutrient utilization",
      "Supports digestive efficiency",
      "Promotes consistent animal performance",
    ],
  },
];

/** Confirmed Animal Healthcare areas (PDF tabs + client hierarchy). */
export const animalHealthcareAreas = [
  {
    id: "poultry" as const,
    label: "Poultry",
    application: "Poultry feed optimization",
  },
  {
    id: "aqua" as const,
    label: "Aqua",
    application: "Aquafeed improvement",
  },
  {
    id: "ruminant" as const,
    label: "Ruminant",
    application: "Ruminant feed processing",
  },
];

/**
 * Aquaculture Solutions — PDF §7.
 * Descriptions use PDF claim-safe framing (support / manage), not cure/kill language.
 */
export const aquaSolutions: AquaSolution[] = [
  {
    id: "gut",
    name: "Gut Probiotics",
    description:
      "Probiotic formulations designed to support digestive health, microbial balance and feed utilization in shrimp and fish.",
  },
  {
    id: "water",
    name: "Water Probiotics",
    description:
      "Microbial solutions designed to support water quality and organic matter management.",
  },
  {
    id: "soil",
    name: "Soil Probiotics",
    description:
      "Solutions designed to support pond-bottom and sediment management.",
  },
  {
    id: "white-gut",
    name: "White Gut Reducing Probiotics",
    description:
      "Probiotic solutions formulated to support intestinal microbial balance and digestive health.",
  },
  {
    id: "vibrio",
    name: "Vibrio Reducing Probiotics",
    description:
      "Selected probiotic strains designed to support microbial balance and help manage undesirable bacterial populations in aquaculture systems.",
  },
  {
    id: "ammonia",
    name: "Ammonia Control Probiotics",
    description:
      "Microbial solutions designed to support biological management of nitrogenous waste and help maintain better pond-water conditions.",
  },
];
