import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Distillery Industry",
    headline: ["Enzymes for", "Distillery"],
    accentLine: 1,
    subtitle:
        "Cost-effective enzyme solutions designed to improve fermentation efficiency, maximize ethanol yield, and reduce processing costs across starch and sugar-based feedstocks.",
    imageUrl: "../assets/products/DistilleryEnzyme.png",
    imageAlt: "Distillery fermentation tanks",
    slug: "distillery",

    quickStats: [
        { val: "2", label: "Specialized Products" },
        { val: "Higher", label: "Ethanol Yield" },
        { val: "SELZYME", label: "Brand" },
    ],

    // Added process steps based on industry standards for starch/sugar conversion
    processSteps: [
        {
            step: "01",
            title: "Liquefaction",
            desc: "Starch-based feedstocks are gelatinized and broken down into shorter chain dextrins using Alpha Amylase, reducing viscosity.",
        },
        {
            step: "02",
            title: "Saccharification",
            desc: "Dextrins and polymers are further hydrolyzed into fermentable sugars (glucose) that yeast can easily metabolize.",
        },
        {
            step: "03",
            title: "Fermentation",
            desc: "Enzymes ensure a stable environment, utilizing complex sugars to maximize alcohol yield while inhibiting bacterial contaminants.",
        },
        {
            step: "04",
            title: "Distillation",
            desc: "The fermented mash is processed to separate and purify ethanol, resulting in high-quality potable or industrial alcohol.",
        },
    ],

    products: [
        {
            code: "SELZYME - TREACLE",
            enzyme: "Fungal Alpha Amylase & Multi-Enzyme Blend",
            application: "Molasses-based Distillery",
            purpose:
                "Specifically formulated to achieve a high-yielding, stable fermentation process in molasses distilleries by utilizing complex sugars that yeast cannot metabolize directly.",
            tags: ["Molasses", "Yield Optimization"],
        },
        {
            code: "SELZYME - GRAIN",
            enzyme: "Fungal Alpha Amylase & Multi-Enzyme Blend",
            application: "Grain-based Distillery",
            purpose:
                "Increases alcohol yield and reduces non-volatile acids in grain-based processes. Optimized for feedstocks like Rice, Wheat, Corn, Barley, and Millet.",
            tags: ["Grain", "Acid Reduction"],
        },
    ],

    aboutTitle: "Sustainable Ethanol Production",
    aboutSub: "Enhancing fermentation efficiency through advanced biochemistry.",
    aboutBody: [
        "Alcohol production is a mature industry utilizing conventional fermentation. While raw materials vary by region, they generally fall into two categories: starch-based (Grains and Tubers like Rice, Wheat, Corn, or Cassava) and sugar-based (Cane/Beet Juice and Molasses).",
        "Enzymes play a critical role in modernizing this process. By breaking down dextrins and polymers that yeast cannot naturally metabolize, our enzymes ensure that every possible fermentable sugar is converted into alcohol.",
        "Beyond yield, enzymes help in eliminating bacterial contaminants and reducing waste. This results in a cleaner fermentation environment and significantly lower raw material costs per liter of alcohol produced.",
        "Manufactured by Ansel Biotech, these solutions are designed to produce a higher, more sustainable yield of ethanol at a faster rate, ensuring your distillery remains competitive and environmentally conscious.",
    ],

    ctaTitle: "Optimize your distillery\nyield today",
    ctaBody:
        "Our technical team can help you select the right SELZYME blend for your specific feedstock and fermentation parameters.",
};

export default function DistilleryProducts() {
    return <IndustryProductPage c={content} />;
}