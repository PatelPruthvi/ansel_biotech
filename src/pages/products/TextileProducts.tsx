import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
  industry: "Textile Processing",
  headline: ["Textile", "Processing Enzymes"],
  accentLine: 1,
  subtitle:
    "Eco-friendly biocatalysts for desizing, biopolishing and peroxide killing — reduce energy and water consumption while maintaining consistent, high-quality fabric output.",
  imageUrl: "../assets/products/textile_1.png",
  imageAlt: "Textile fabric manufacturing",
  slug: "textile",

  quickStats: [
    { val: "5", label: "Products" },
    { val: "Eco", label: "Friendly" },
    { val: "SELZYME", label: "Brand" },
  ],

  products: [
    {
      code: "SELZYME – HTA TEX",
      enzyme: "High-Temp Alpha Amylase",
      application: "Woven Fabric Desizing",
      purpose:
        "Desizing of woven fabric at high temperatures without yarn damage. Effectively removes starch sizing agents from cotton and blended fabrics.",
      tags: ["Desizing", "High Temp"],
    },
    {
      code: "SELZYME – MTA TEX",
      enzyme: "Mid-Temp Alpha Amylase",
      application: "Woven Fabric Desizing",
      purpose:
        "Versatile desizing enzyme operating at moderate temperatures. Suitable for fabrics that cannot tolerate high-temperature processing.",
      tags: ["Desizing", "Mid Temp"],
    },
    {
      code: "SELZYME – BAMY TEX",
      enzyme: "Bacterial Alpha Amylase",
      application: "General Desizing",
      purpose:
        "Broad-spectrum bacterial amylase for effective starch hydrolysis across a range of fabric types and process conditions.",
      tags: ["Desizing", "Bacterial"],
    },
    {
      code: "SELZYME – CL TEX",
      enzyme: "Acid Cellulase",
      application: "Biopolishing",
      purpose:
        "Removes microfibrils and surface fuzz from cotton fabrics — reduces pilling tendency, improves colour brightness and softness.",
      tags: ["Biopolishing", "Cellulase"],
    },
    {
      code: "SELZYME – CAT TEX",
      enzyme: "Catalase",
      application: "Peroxide Removal",
      purpose:
        "Efficiently decomposes residual hydrogen peroxide after bleaching — enabling direct dyeing without additional washing steps, saving water and energy.",
      tags: ["Peroxide Killing", "Catalase"],
    },
  ],

  processSteps: [
    {
      step: "01",
      title: "Sizing Removal",
      desc: "Amylase enzymes dissolve starch sizing agents applied during weaving, preparing the fabric for subsequent treatments.",
    },
    {
      step: "02",
      title: "Scouring",
      desc: "Enzyme-assisted removal of natural impurities from cotton fibres — waxes, pectins and proteins — improving absorbency.",
    },
    {
      step: "03",
      title: "Bleaching",
      desc: "Hydrogen peroxide whitens the fabric. Catalase is then applied to neutralise residual peroxide before dyeing.",
    },
    {
      step: "04",
      title: "Biopolishing",
      desc: "Cellulase enzymes remove surface microfibrils — improving fabric hand-feel, reducing pilling and enhancing colour depth.",
    },
  ],

  aboutTitle: "Why Enzymes for Textiles?",
  aboutSub:
    "Chemical processing of textiles is water-intensive and polluting. Enzyme technology offers a clean, energy-efficient alternative.",
  aboutBody: [
    "Traditional textile wet processing relies heavily on harsh chemicals — caustic soda, chlorine bleach and strong acids — that create significant effluent treatment challenges. Enzyme-based processing dramatically reduces the chemical load while achieving equal or superior results.",
    "Amylases replace chemical desizing, reducing water consumption and eliminating the need for high-temperature washes. The controlled, specific action of enzymes means less fibre damage and more consistent fabric quality across production batches.",
    "Biopolishing with cellulase addresses a common quality complaint — pilling and surface fuzziness on cotton garments. Unlike mechanical methods, enzyme biopolishing provides a permanent improvement to fabric hand-feel without weakening the fibre structure.",
    "Ansel Biotech's SELZYME textile range is engineered for compatibility with modern continuous and batch processing equipment. Each enzyme is optimised for stability at the temperature, pH and substrate conditions typical of textile wet processing facilities.",
  ],

  ctaTitle: "Optimise your\ntextile process",
  ctaBody:
    "Our technical team can recommend the right SELZYME combination for your specific fabric type, process conditions and sustainability targets.",
};

export default function TextileProducts() {
  return <IndustryProductPage c={content} />;
}