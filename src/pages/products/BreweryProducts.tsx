import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Brewery Industry",
    headline: ["Enzymes for", "Brewery"],
    accentLine: 1,
    subtitle:
        "Advanced enzymatic solutions to optimize mashing, improve filtration, and ensure flavor stability while reducing overall production expenses and increasing raw material utilization.",
    imageUrl: "../assets/products/BrewEnzyme.png",
    imageAlt: "Brewery fermentation and mashing equipment",
    slug: "brewery",

    quickStats: [
        { val: "6", label: "Specialized Products" },
        { val: "Better", label: "Filtration" },
        { val: "SELZYME", label: "Brand" },
    ],

    processSteps: [
        {
            step: "01",
            title: "Mashing",
            desc: "Amylases and Glucanases break down starches and cell wall components to reduce viscosity and maximize extract yield.",
        },
        {
            step: "02",
            title: "Wort Cooling",
            desc: "Proteolytic enzymes like Papain are utilized to manage proteins and peptides, preparing the wort for healthy yeast activity.",
        },
        {
            step: "03",
            title: "Fermentation",
            desc: "ALDC prevents off-flavors like diacetyl, while AMG converts complex dextrins into simple sugars for efficient yeast growth.",
        },
        {
            step: "04",
            title: "Maturation",
            desc: "Enzymes ensure biological stability and clarity, finalizing the beverage's profile and reducing the need for long storage times.",
        },
    ],

    products: [
        {
            code: "SELZYME – BREW IMPROV",
            enzyme: "Amylase, β-Glucanase and Xylanase",
            application: "Mashing Process",
            purpose: "Reduces viscosity of the mash and significantly improves the filtration rate of the wort.",
            tags: ["Mashing", "Viscosity Control"],
        },
        {
            code: "SELZYME – BETA G",
            enzyme: "Beta-glucanase",
            application: "Mashing Process",
            purpose: "Specifically targets beta-glucans to improve filtration rates and prevent 'haze' in the final brewery product.",
            tags: ["Filtration", "Clarity"],
        },
        {
            code: "SELZYME – PAPAYA",
            enzyme: "Papain",
            application: "Wort Cooling & Fermentation",
            purpose: "Hydrolyzes proteins and peptides to improve yeast growth and prevent protein-related chill haze.",
            tags: ["Protein Management", "Yeast Health"],
        },
        {
            code: "SELZYME – HTA",
            enzyme: "High Temperature α-Amylase",
            application: "Mashing Process",
            purpose: "Rapidly hydrolyzes starch molecules at high temperatures to reduce viscosity and prepare the mash for saccharification.",
            tags: ["Starch Liquefaction", "High Temp"],
        },
        {
            code: "SELZYME – ALDC",
            enzyme: "α-acetolactate decarboxylase",
            application: "Fermentation & Maturation",
            purpose: "Prevents the formation of diacetyl from α-acetolactate, reducing maturation time and ensuring flavor consistency.",
            tags: ["Flavor Stability", "Diacetyl Control"],
        },
        {
            code: "SELZYME – AMG",
            enzyme: "Glucoamylase & Pullulanase",
            application: "Fermentation Process",
            purpose: "Hydrolyzes dextrins and maltose into simpler glucose for healthy yeast growth and high attenuation.",
            tags: ["Saccharification", "High Attenuation"],
        },
    ],

    aboutTitle: "Integral Solutions for Modern Brewing",
    aboutSub: "Conquering stability and flavor control challenges through biotechnology.",
    aboutBody: [
        "The brewery industry is the largest consumer of enzyme preparations globally. Biotechnology and brewing are inseparable, as enzymes determine the efficiency of every step from the mash tun to the final bottle.",
        "Enzymes allow brewers to increase the ratio of adjuncts (excipients) used, make up for variations in malt quality, and increase the overall degree of fermentation. This results in better equipment utilization and lower production costs without compromising the beer's integrity.",
        "Ansel Biotech's brewery enzymes help manufacturers overcome traditional hurdles like diacetyl off-flavors, poor filtration rates, and beer instability. Our solutions facilitate smoother operations and allow for the development of a wider variety of high-quality beverage profiles.",
        "By reducing by-products and enhancing the conversion of raw materials into high-quality wort, our SELZYME range ensures a more sustainable and economically viable brewing process.",
    ],

    ctaTitle: "Enhance your brew\nquality today",
    ctaBody:
        "Consult with our technical experts to integrate SELZYME solutions into your mashing or fermentation profile for superior results.",
};

export default function BreweryProducts() {
    return <IndustryProductPage c={content} />;
}