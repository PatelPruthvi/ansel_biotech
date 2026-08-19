import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Paper & Pulp",
    headline: ["Paper & Pulp", "Industry"],
    accentLine: 1,
    subtitle:
        "Bio-solutions for bleaching, deinking, and fiber refining — reducing chemical dependency and energy consumption in biomass processing.",
    imageUrl: "/assets/products/Paper.png",
    imageAlt: "Industrial paper manufacturing process",
    slug: "paper-pulp",

    quickStats: [
        { val: "4", label: "Core Products" },
        { val: "Bio", label: "Bleaching" },
        { val: "SELZYME", label: "Brand" },
    ],

    processSteps: [
        {
            step: "01",
            title: "Pre-bleaching",
            desc: "Utilization of Xylanases to break down hemicellulose, significantly reducing the amount of chlorine required in the bleaching plant.",
        },
        {
            step: "02",
            title: "Fiber Refining",
            desc: "Cellulase application to enhance fiber swelling and fibrillation, resulting in improved strength and reduced beating time.",
        },
        {
            step: "03",
            title: "Deinking",
            desc: "Hemicellulase-driven processes that facilitate the detachment of ink from fibers in recycled paper production.",
        },
        {
            step: "04",
            title: "Starch Liquefaction",
            desc: "Enzymatic hydrolysis of starch for surface sizing and coating, ensuring precise viscosity control and paper quality.",
        },
    ],

    products: [
        {
            code: "SELZYME – X PP",
            enzyme: "Xylanase",
            application: "Bleaching",
            purpose:
                "Used for bio-bleaching of kraft pulp. It effectively increases pulp brightness while reducing chemical consumption.",
            tags: ["Bio-bleaching", "Brightness", "Kraft Pulp"],
        },
        {
            code: "SELZYME – CL PP",
            enzyme: "Cellulase",
            application: "Fiber Refining",
            purpose:
                "Designed to enhance the swelling and fibrillation of fibers, improving water retention and paper strength.",
            tags: ["Fibrillation", "Refining", "Fiber Strength"],
        },
        {
            code: "SELZYME – HEMICELL PP",
            enzyme: "Hemicellulase",
            application: "Deinking",
            purpose:
                "Facilitates the detachment of ink from fibers, making it essential for high-quality recycled paper manufacturing.",
            tags: ["Deinking", "Recycling", "Ink Removal"],
        },
        {
            code: "SELZYME – AMY PP",
            enzyme: "Alpha Amylase",
            application: "Liquefaction",
            purpose:
                "Hydrolyses starch to the desired viscosity for paper sizing and coating applications.",
            tags: ["Sizing", "Starch Hydrolysis", "Coating"],
        },
    ],

    aboutTitle: "Sustainable Biomass Processing",
    aboutSub: "Enhancing fiber quality through enzymatic precision.",
    aboutBody: [
        "The paper and pulp industry processes massive volumes of lignocellulosic biomass annually. As technology evolves, enzymatic applications have become vital for achieving high-performance results while minimizing environmental impact.",
        "One of the most critical breakthroughs is in the pre-bleaching of kraft pulp. By using Xylanase enzymes, mills can achieve superior brightness with a significantly lower chemical footprint, making the bleaching process much greener.",
        "For virgin pulps, our enzymes increase pulp fibrillation and water retention, which directly translates to reduced beating times and energy savings. In the world of recycled fibers, these solutions are indispensable for deinking and restoring fiber bonding.",
        "Ansel Biotech provides specialized enzymes that address specific challenges—from removing bark and pitch to preventing slime buildup. These biological tools allow for a cleaner, more efficient production cycle from raw pulp to the finished paper product.",
    ],

    ctaTitle: "Enhance your\npulp quality",
    ctaBody:
        "Consult with our technical team to integrate SELZYME products into your refining or bleaching lines for better yield and lower costs.",
};

export default function PaperPulpProducts() {
    return <IndustryProductPage c={content} />;
}