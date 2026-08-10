import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
  industry: "Sugar Industry",
  headline: ["Sugar Industry", "Enzymes"],
  accentLine: 1,
  subtitle:
    "Cost-effective enzyme solutions for liquefaction, saccharification and refining — improve yield, clarity and process efficiency across your entire sugar production line.",
  imageUrl:
    "/assets/products/sugar_1.png",

  imageAlt: "Sugar cane field",
  slug: "sugar",

  quickStats: [
    { val: "4", label: "Products" },
    { val: "ISO", label: "Certified" },
    { val: "SELZYME", label: "Brand" },
  ],

  products: [
    {
      code: "SELZYME – HTA",
      enzyme: "Alpha Amylase",
      application: "Sugar Industries",
      purpose:
        "Hydrolyses polysaccharides and oligosaccharides like dextrins and starch. Improves sugar quality and process efficiency by reducing viscosity and accelerating liquefaction.",
      tags: ["Liquefaction", "Starch Hydrolysis"],
    },
    {
      code: "SELZYME – DEX",
      enzyme: "Dextranase",
      application: "Sugar Industries",
      purpose:
        "Reduces crystal elongation and significantly improves clarity and filterability of syrup — preventing viscosity-related yield losses during cane juice processing.",
      tags: ["Dextran Removal", "Clarity"],
    },
    {
      code: "SELZYME – SUCRASE",
      enzyme: "Invertase",
      application: "Invert Sugar Production",
      purpose:
        "Catalyses the inversion of sucrose for preparation of invert sugar and high fructose corn syrup with high conversion rates and minimal by-products.",
      tags: ["Invert Sugar", "HFCS"],
    },
    {
      code: "SELZYME – GISO",
      enzyme: "Glucose Isomerase",
      application: "Fructose Syrup Preparation",
      purpose:
        "Isomerization of glucose to fructose — enabling production of high-fructose syrups with superior sweetness profiles for food and beverage applications.",
      tags: ["Isomerization", "Fructose Syrup"],
    },
  ],

  processSteps: [
    {
      step: "01",
      title: "Gelatinisation",
      desc: "Starch suspension (40–45% dry matter) is raised to steam temperature, breaking down granule structure for enzyme access.",
    },
    {
      step: "02",
      title: "Liquefaction",
      desc: "Alpha amylase hydrolyses gelatinised starch into maltodextrins — soluble oligosaccharides and dextrins ready for the next stage.",
    },
    {
      step: "03",
      title: "Saccharification",
      desc: "Maltodextrins are further broken down by glucoamylase into fermentable glucose for downstream processing.",
    },
    {
      step: "04",
      title: "Refining",
      desc: "Dextranase and invertase clean up residual dextrans and convert sucrose — improving product clarity and final yield.",
    },
  ],

  aboutTitle: "Why Enzymes for Sugar?",
  aboutSub:
    "Traditional acid-based starch conversion is hazardous and inefficient. Enzymatic routes deliver safer, cleaner, higher-yield results.",
  aboutBody: [
    "Since many years, starch has been converted into glucose using acid and chemicals. With the arrival of enzyme technology, industries have taken the solace of enzymes for this biochemical reaction. Enzymatic conversion of starch depends on both the enzymes used and the physical properties of the starch substrate.",
    "Sugar enzymes accelerate the conversion through two key processes: liquefaction and saccharification. In liquefaction, a starch suspension (40–45% dry matter) is gelatinised at steam temperature and liquefied by alpha amylase — hydrolyzing starch to maltodextrins containing mainly oligosaccharides and dextrins.",
    "Dextrans present many problems in cane processing and juice extraction — causing viscosity issues and crystal elongation that reduce yield and product quality. Dextranase effectively eliminates these, improving filtration rate and syrup clarity.",
    "Sugar enzymes manufactured by Ansel Biotech inhibit viscosity during the biochemical reaction and enhance quality by eliminating hazardous chemicals — making the entire process safer, greener and more economical.",
  ],

  ctaTitle: "Get the right enzyme\nfor your sugar process",
  ctaBody:
    "Our application team works with you to match the correct SELZYME product to your substrate, temperature profile and production scale.",
};

export default function SugarProducts() {
  return <IndustryProductPage c={content} />;
}