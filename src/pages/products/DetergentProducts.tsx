import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

/**
 * Detergent content from client PDF §10–11.
 * Individual enzymes for stain types + custom blend options (not a product category).
 */
const content: IndustryPageContent = {
  industry: "Detergent",
  headline: ["Detergent", "Enzymes"],
  accentLine: 1,
  subtitle:
    "Enzymes for detergent manufacturing — different stains require different enzymes.",
  imageUrl: "../assets/products/Detergent.png",
  imageAlt: "Detergent enzyme applications",
  slug: "detergent",

  quickStats: [
    { val: "5", label: "Individual Enzymes" },
    { val: "3+", label: "Blend Options" },
  ],

  productsEyebrow: "Detergent Enzymes",
  productsTitle: "Individual enzymes & blends",
  processEyebrow: "Stain Targeting",
  processTitle: "Different stains, different enzymes",

  products: [
    {
      code: "PROTEASE",
      enzyme: "Protease",
      application: "Protein-based stains",
      purpose: "Protein-based stains.",
      tags: ["Individual Enzyme"],
    },
    {
      code: "AMYLASE",
      enzyme: "Amylase",
      application: "Starch-based stains",
      purpose: "Starch-based stains.",
      tags: ["Individual Enzyme"],
    },
    {
      code: "LIPASE",
      enzyme: "Lipase",
      application: "Oil and fat stains",
      purpose: "Oil and fat stains.",
      tags: ["Individual Enzyme"],
    },
    {
      code: "CELLULASE",
      enzyme: "Cellulase",
      application: "Fabric care and surface cleaning",
      purpose: "Fabric care and surface cleaning.",
      tags: ["Individual Enzyme"],
    },
    {
      code: "MANNANASE",
      enzyme: "Mannanase",
      application: "Mannan-based stains",
      purpose: "Mannan-based stains.",
      tags: ["Individual Enzyme"],
    },
    {
      code: "BLEND-4",
      enzyme: "4-Enzyme Blend",
      application: "Custom detergent blend",
      purpose: "Protease + Amylase + Lipase + Cellulase.",
      tags: ["Custom Blend"],
    },
    {
      code: "BLEND-5",
      enzyme: "5-Enzyme Blend",
      application: "Custom detergent blend",
      purpose: "Protease + Amylase + Lipase + Cellulase + Mannanase.",
      tags: ["Custom Blend"],
    },
    {
      code: "BLEND-6",
      enzyme: "6-Enzyme Blend",
      application: "Custom detergent blend",
      purpose: "Protease + Amylase + Lipase + Cellulase + Mannanase + Pectinase.",
      tags: ["Custom Blend"],
    },
    {
      code: "BLEND-CUSTOM",
      enzyme: "Customized Blend",
      application: "Application-specific blend",
      purpose:
        "Need a different combination? We can develop an application-specific enzyme blend based on your formulation requirements.",
      tags: ["Custom Blend"],
    },
  ],

  processSteps: [
    {
      step: "01",
      title: "Protease",
      desc: "Protein-based stains",
      icon: "🥩",
    },
    {
      step: "02",
      title: "Amylase",
      desc: "Starch-based stains",
      icon: "🌾",
    },
    {
      step: "03",
      title: "Lipase",
      desc: "Oil and fat stains",
      icon: "🫒",
    },
    {
      step: "04",
      title: "Cellulase",
      desc: "Fabric care and surface cleaning",
      icon: "👕",
    },
    {
      step: "05",
      title: "Mannanase",
      desc: "Mannan-based stains",
      icon: "🫘",
    },
  ],

  aboutTitle: "One Formula Doesn't Fit Every Detergent",
  aboutSub:
    "ANSEL BIOTECH develops customized enzyme blends according to detergent formulation, target stains, washing temperature, pH, application and desired cleaning performance.",
  aboutBody: [
    "Possible blends include a 4-Enzyme Blend (Protease + Amylase + Lipase + Cellulase), a 5-Enzyme Blend (Protease + Amylase + Lipase + Cellulase + Mannanase), and a 6-Enzyme Blend (Protease + Amylase + Lipase + Cellulase + Mannanase + Pectinase).",
    "Need a different combination? We can develop an application-specific enzyme blend based on your formulation requirements.",
  ],

  ctaTitle: "Request Custom Blend",
  ctaBody:
    "Request a customized enzyme blend based on your detergent formulation, target stains, washing temperature, pH, application and desired cleaning performance.",
};

export default function DetergentProducts() {
  return <IndustryProductPage c={content} />;
}
