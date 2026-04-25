import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Animal Feed Industry",
    headline: ["Animal Feed", "Enzymes"],
    accentLine: 1,
    subtitle:
        "Advanced enzymatic solutions to enhance nutrient digestibility, degrade anti-nutritional factors, and promote optimal animal growth and health.",
    imageUrl: "../assets/products/AnimalFeedEnzyme.png",
    imageAlt: "Livestock feeding and animal nutrition",
    slug: "animal-feed",

    quickStats: [
        { val: "11", label: "Product Types" },
        { val: "Bio", label: "Active" },
        { val: "SELZYME", label: "Brand" },
    ],

    processSteps: [
        {
            step: "01",
            title: "Nutrient Liberation",
            desc: "Improving the utilization of starch, proteins, and minerals by breaking down complex molecular structures into absorbable forms.",
        },
        {
            step: "02",
            title: "Anti-Nutritional Degradation",
            desc: "Neutralizing factors like phytates and non-starch polysaccharides (NSPs) that interfere with digestion and animal performance.",
        },
        {
            step: "03",
            title: "Digestive Support",
            desc: "Supplementing endogenous enzymes in young animals to compensate for immature digestive systems and prevent indigestion.",
        },
        {
            step: "04",
            title: "Feed Efficiency",
            desc: "Maximizing the energy value of feed ingredients, allowing for cost-effective formulation without compromising animal health.",
        },
    ],

    products: [
        {
            code: "SELZYME – PHY",
            enzyme: "Phytase",
            application: "Nutrition Enhancement",
            purpose: "Increases protein digestibility and improves overall protein and mineral utilization in the diet.",
            tags: ["Mineral Absorption", "Protein Digestibility"],
        },
        {
            code: "SELZYME – PROT",
            enzyme: "Protease",
            application: "Protein Breakdown",
            purpose: "Breaks down complex proteins into soluble amino acids for easy absorption by the animal's digestive tract.",
            tags: ["Amino Acids", "Growth Promotion"],
        },
        {
            code: "SELZYME – FEED MIX",
            enzyme: "Multi-Enzyme Blend",
            application: "Complex Substrates",
            purpose: "A balanced cocktail designed to hydrolyse complex materials into soluble forms, ensuring maximum nutrient uptake.",
            tags: ["Synergistic Effect", "Total Nutrition"],
        },
        {
            code: "SELZYME – CL",
            enzyme: "Cellulase",
            application: "Silage & Fiber",
            purpose: "Improves silage production for cattle and degrades cell-wall components to release trapped nutrients.",
            tags: ["Silage Quality", "Cattle Feed"],
        },
        {
            code: "SELZYME – AMY",
            enzyme: "Amylase",
            application: "Starch Hydrolysis",
            purpose: "Efficiently hydrolyses starchy materials, increasing the metabolic energy available to the animal.",
            tags: ["Energy Value", "Starch Digestion"],
        },
        {
            code: "SELZYME – BETA G",
            enzyme: "Beta Glucanase",
            application: "NSP Degradation",
            purpose: "Targets and hydrolyses beta-glucan materials, reducing gut viscosity and improving litter quality.",
            tags: ["Viscosity Reduction", "NSP"],
        },
        {
            code: "SELZYME – X",
            enzyme: "Xylanase",
            application: "Cereal Grains",
            purpose: "Hydrolyses xylan and xylose components commonly found in grain-based diets.",
            tags: ["Grain Feed", "Hemicellulose"],
        },
        {
            code: "SELZYME – MANN",
            enzyme: "Mannanase",
            application: "Soya/Legume Feed",
            purpose: "Specifically targets beta-mannan materials to reduce the anti-nutritional effects of certain feed ingredients.",
            tags: ["Beta Mannan", "Soya Diets"],
        },
        {
            code: "SELZYME – LIP",
            enzyme: "Lipase",
            application: "Fat Digestion",
            purpose: "Hydrolyses fatty materials and lipids, optimizing energy absorption from fats and oils.",
            tags: ["Lipid Metabolism", "Energy"],
        },
    ],

    aboutTitle: "Science-Driven Animal Nutrition",
    aboutSub: "Healthy and productive enzymes for sustainable livestock management.",
    aboutBody: [
        "The modern feed industry faces the challenge of maximizing animal performance while managing fluctuating ingredient costs. Ansel Biotech manufactures four major categories of enzymes—dietary fiber (cell wall) degrading, protein degrading, starch degrading, and phytase—to address these needs.",
        "By degrading anti-nutritional factors present in feed, our enzymes unlock the true potential of raw materials. This is especially vital for young animals with immature digestive systems that lack sufficient endogenous enzymes for complete digestion.",
        "Our SELZYME range is formulated to be healthy and productive, ensuring that animals can absorb more nutrients from their feed. This not only improves growth rates and feed conversion ratios (FCR) but also reduces environmental phosphorus and nitrogen excretion.",
        "From specialized single enzymes like Phytase and Protease to complex multi-enzyme blends, we provide the tools needed to optimize livestock, poultry, and aquaculture nutrition.",
    ],

    ctaTitle: "Optimize your\nfeed formulation",
    ctaBody:
        "Connect with our specialists to develop a customized enzyme program that lowers feed costs and boosts animal productivity.",
};

export default function AnimalFeedProducts() {
    return <IndustryProductPage c={content} />;
}