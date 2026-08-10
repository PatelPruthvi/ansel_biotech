import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Starch Industry",
    headline: ["Starch Processing", "Enzymes"],
    accentLine: 1,
    subtitle:
        "High-performance enzymatic solutions to break down complex starch polymers into glucose and maltose syrups, improving yield and accelerating production cycles.",
    imageUrl: "/assets/products/starch_1.png",
    imageAlt: "Industrial starch processing facility",
    slug: "starch",

    quickStats: [
        { val: "3", label: "Core Products" },
        { val: "High", label: "Dextrose Yield" },
        { val: "SELZYME", label: "Brand" },
    ],

    processSteps: [
        {
            step: "01",
            title: "Gelatinization",
            desc: "Starch granules are heated in water, causing them to swell and lose their semi-crystalline structure, preparing them for enzymatic attack.",
        },
        {
            step: "02",
            title: "Liquefaction",
            desc: "High-temperature Alpha Amylase breaks down the long-chain starch molecules into shorter-chain dextrins, rapidly reducing viscosity.",
        },
        {
            step: "03",
            title: "Saccharification",
            desc: "Glucoamylase and Pullulanase further hydrolyze dextrins into glucose (Dextrose) or other simple sugars, depending on the desired end product.",
        },
        {
            step: "04",
            title: "Syrup Refining",
            desc: "The resulting sugar solution is filtered and purified to produce high-quality syrups used across the food and beverage sectors.",
        },
    ],

    products: [
        {
            code: "SELZYME – HTA – ST",
            enzyme: "High Temperature Alpha Amylase",
            application: "Liquefaction Process",
            purpose: "Increases wort yield and grain adjunct cooking capacity by rapidly breaking down starch into dextrins under high-heat conditions.",
            tags: ["Liquefaction", "Viscosity Reduction"],
        },
        {
            code: "SELZYME – AMG – ST",
            enzyme: "Glucoamylase and Pullulanase",
            application: "Saccharification Process",
            purpose: "Produces a high dextrose equivalent (DE) at the end of the saccharification process by efficiently converting dextrins into glucose.",
            tags: ["Saccharification", "High DE"],
        },
        {
            code: "SELZYME – BETA AMY",
            enzyme: "Beta Amylase",
            application: "Maltose Preparation",
            purpose: "Specifically used for the production of high-maltose syrups, targeting the second linkage in starch chains.",
            tags: ["Maltose Syrup", "Specialty Sugars"],
        },
    ],

    aboutTitle: "Advanced Starch Decomposition",
    aboutSub: "Transforming complex polymers into valuable industrial sweeteners.",
    aboutBody: [
        "Starch is a vital storage compound in plants, consisting of two complex polymers: amylose and amylopectin. Due to this intricate structure, a precise combination of enzymes is required for complete and efficient decomposition.",
        "While some starch conversion can be achieved through chemical methods, enzymatic processing offers superior specificity, higher yields, and a greener production footprint. Our enzymes act as biological catalysts to target specific glycosidic bonds.",
        "The SELZYME range includes both hydrolases (for endo and exo hydrolysis) and glocanohydrolases. These facilitate the seamless transition from raw starch to refined syrups, allowing manufacturers to improve product quality while accelerating production timelines.",
        "Developed by Ansel Biotech, these starch processing solutions help manufacturers easily break down complex polymers, ensuring consistent results in the production of dextrose, maltose, and other starch-derived compounds.",
    ],

    ctaTitle: "Maximize your starch\nconversion yield",
    ctaBody:
        "Our technical experts can assist you in optimizing your liquefaction and saccharification parameters using the SELZYME – ST range.",
};

export default function StarchProducts() {
    return <IndustryProductPage c={content} />;
}