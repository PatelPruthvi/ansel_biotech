import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

/** Textile content from client PDF §9 — process flow + enzymes only. */
const content: IndustryPageContent = {
  industry: "Textile Processing",
  headline: ["Textile", "Processing"],
  accentLine: 1,
  subtitle:
    "Enzyme support across the textile line: desizing, bioscouring, peroxide removal after bleaching, biopolishing and biowashing.",
  imageUrl: "../assets/products/textile_1.png",
  imageAlt: "Textile fabric manufacturing",
  slug: "textile",

  quickStats: [
    { val: "5", label: "Process Steps" },
    { val: "5", label: "Enzymes" },
  ],

  productsEyebrow: "Process Enzymes",
  productsTitle: "Enzyme by process step",
  processEyebrow: "Textile Process Flow",
  processTitle: "DESIZING → BIOWASHING",

  products: [
    {
      code: "DESIZING",
      enzyme: "Alpha-Amylase",
      application: "Desizing",
      purpose:
        "Enzymatic removal of starch-based sizing materials from cotton and other suitable fabrics.",
      tags: ["Desizing", "Alpha-Amylase"],
    },
    {
      code: "BIOSCOURING",
      enzyme: "Pectinase",
      application: "Bioscouring",
      purpose:
        "Enzymatic removal/modification of pectic substances to improve fabric wettability and prepare cotton for subsequent processing.",
      tags: ["Bioscouring", "Pectinase"],
    },
    {
      code: "H2O2-REMOVAL",
      enzyme: "Catalase",
      application: "Hydrogen Peroxide Removal",
      purpose:
        "Rapid breakdown of residual hydrogen peroxide after bleaching. Result: H₂O₂ → Water + Oxygen.",
      tags: ["Bleaching", "Catalase"],
    },
    {
      code: "BIOPOLISHING",
      enzyme: "Cellulase",
      application: "Biopolishing",
      purpose:
        "Removes protruding cellulose fibres from the fabric surface to improve smoothness and appearance.",
      tags: ["Biopolishing", "Cellulase"],
    },
    {
      code: "BIOWASHING",
      enzyme: "Cellulase",
      application: "Biowashing",
      purpose:
        "Enzymatic treatment used to create a softer hand feel and controlled surface effects in suitable textile applications.",
      tags: ["Biowashing", "Cellulase"],
    },
  ],

  processSteps: [
    {
      step: "01",
      title: "Desizing",
      desc: "Alpha-Amylase — Enzymatic removal of starch-based sizing materials from cotton and other suitable fabrics.",
      icon: "🧵",
    },
    {
      step: "02",
      title: "Bioscouring",
      desc: "Pectinase — Enzymatic removal/modification of pectic substances to improve fabric wettability and prepare cotton for subsequent processing.",
      icon: "💧",
    },
    {
      step: "03",
      title: "H₂O₂ Removal",
      desc: "Catalase — Rapid breakdown of residual hydrogen peroxide after bleaching. Result: H₂O₂ → Water + Oxygen.",
      icon: "⚗️",
    },
    {
      step: "04",
      title: "Biopolishing",
      desc: "Cellulase — Removes protruding cellulose fibres from the fabric surface to improve smoothness and appearance.",
      icon: "✨",
    },
    {
      step: "05",
      title: "Biowashing",
      desc: "Cellulase — Enzymatic treatment used to create a softer hand feel and controlled surface effects in suitable textile applications.",
      icon: "🧴",
    },
  ],

  aboutTitle: "Desizing benefits",
  aboutSub:
    "Rapid breakdown of residual hydrogen peroxide after bleaching. Result: H₂O₂ → Water + Oxygen.",
  aboutBody: [
    "Desizing with Alpha-Amylase: effective starch degradation; improved fabric absorbency; supports subsequent dyeing and finishing.",
    "Bioscouring with Pectinase prepares cotton for subsequent processing by improving fabric wettability.",
    "Catalase is used after bleaching for hydrogen peroxide removal. Biopolishing and biowashing both use Cellulase for surface and hand-feel effects.",
  ],

  ctaTitle: "Get in touch about\ntextile processing",
  ctaBody:
    "Contact our team about textile process enzymes — desizing, bioscouring, peroxide removal, biopolishing and biowashing.",
};

export default function TextileProducts() {
  return <IndustryProductPage c={content} />;
}
