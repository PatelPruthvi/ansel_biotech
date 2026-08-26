import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

/**
 * Food Enzymes client PDF §13.
 * Only Bakery and Dairy are detailed in the PDF.
 * Enzyme ↔ application mapping is not 1:1 in the PDF; shared application lists are used.
 * Chymosin/rennet is listed with PDF note "if part of your actual portfolio".
 * No Brewing content invented; old non-PDF food products removed.
 */
const BAKERY_APPLICATIONS =
  "Dough handling · Bread volume · Crumb softness · Dough stability · Shelf-life support";

const DAIRY_APPLICATIONS =
  "Lactose reduction · Cheese processing · Dairy texture · Processing optimization";

const content: IndustryPageContent = {
  industry: "Food",
  headline: ["Food", "Industry"],
  accentLine: 1,
  subtitle:
    "Enzyme solutions for food manufacturers improve processing efficiency, texture, stability, yield and product quality.",
  imageUrl: "/assets/products/FoodEnzyme.png",
  imageAlt: "Food processing enzymes",
  imagePosition: "50% 40%",
  slug: "food",

  quickStats: [
    { val: "2", label: "Applications" },
    { val: "8", label: "Enzymes" },
  ],

  productsEyebrow: "Food Enzymes",
  productsTitle: "Bakery & Dairy",
  processEyebrow: "Applications",
  processTitle: "Bakery and Dairy",

  processSteps: [
    {
      step: "01",
      title: "Bakery",
      desc: `Potential enzymes: Amylase, Xylanase, Protease, Lipase. Applications: ${BAKERY_APPLICATIONS}.`,
      icon: "🍞",
    },
    {
      step: "02",
      title: "Dairy",
      desc: `Potential enzymes: Lactase, Chymosin/rennet, Protease, Lipase. Applications: ${DAIRY_APPLICATIONS}.`,
      icon: "🥛",
    },
  ],

  products: [
    {
      code: "BAKERY-AMYLASE",
      enzyme: "Amylase",
      application: "Bakery",
      purpose: BAKERY_APPLICATIONS,
      tags: ["Bakery"],
    },
    {
      code: "BAKERY-XYLANASE",
      enzyme: "Xylanase",
      application: "Bakery",
      purpose: BAKERY_APPLICATIONS,
      tags: ["Bakery"],
    },
    {
      code: "BAKERY-PROTEASE",
      enzyme: "Protease",
      application: "Bakery",
      purpose: BAKERY_APPLICATIONS,
      tags: ["Bakery"],
    },
    {
      code: "BAKERY-LIPASE",
      enzyme: "Lipase",
      application: "Bakery",
      purpose: BAKERY_APPLICATIONS,
      tags: ["Bakery"],
    },
    {
      code: "DAIRY-LACTASE",
      enzyme: "Lactase",
      application: "Dairy",
      purpose: DAIRY_APPLICATIONS,
      tags: ["Dairy"],
    },
    {
      code: "DAIRY-CHYMOSIN",
      enzyme: "Chymosin / Rennet",
      application: "Dairy",
      purpose: DAIRY_APPLICATIONS,
      tags: ["Dairy"],
    },
    {
      code: "DAIRY-PROTEASE",
      enzyme: "Protease",
      application: "Dairy",
      purpose: DAIRY_APPLICATIONS,
      tags: ["Dairy"],
    },
    {
      code: "DAIRY-LIPASE",
      enzyme: "Lipase",
      application: "Dairy",
      purpose: DAIRY_APPLICATIONS,
      tags: ["Dairy"],
    },
  ],

  aboutTitle: "Food Processing Enzymes",
  aboutSub:
    "Enzymes are naturally occurring biological catalysts that help food manufacturers improve processing efficiency, texture, stability, yield and product quality.",
  aboutBody: [
    "Bakery potential enzymes: Amylase, Xylanase, Protease, Lipase. Applications: dough handling, bread volume, crumb softness, dough stability, shelf-life support.",
    "Dairy potential enzymes: Lactase, Chymosin/rennet, Protease, Lipase. Applications: lactose reduction, cheese processing, dairy texture, processing optimization.",
  ],
  aboutItems: [
    {
      icon: "🍞",
      label: "Bakery",
      text: "Potential enzymes: Amylase, Xylanase, Protease, Lipase. Applications: dough handling, bread volume, crumb softness, dough stability and shelf-life support.",
    },
    {
      icon: "🥛",
      label: "Dairy",
      text: "Potential enzymes: Lactase, Chymosin/rennet, Protease, Lipase. Applications: lactose reduction, cheese processing, dairy texture and processing optimization.",
    },
    {
      icon: "⚙️",
      label: "Processing Goals",
      text: "Naturally occurring biological catalysts that help improve processing efficiency, texture, stability, yield and product quality.",
    },
    {
      icon: "🧪",
      label: "Application Fit",
      text: "Enzyme selection is matched to bakery or dairy process needs rather than a one-size formulation for every food line.",
    },
  ],

  ctaTitle: "Get in touch about\nfood enzymes",
  ctaBody:
    "Contact our team about bakery and dairy enzyme applications.",
};

export default function FoodProducts() {
  return <IndustryProductPage c={content} />;
}
