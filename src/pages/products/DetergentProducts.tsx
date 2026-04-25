import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Detergent Industry",
    headline: ["Detergent", "Enzymes"],
    accentLine: 1,
    subtitle:
        "Bio-active catalysts for high-performance cleaning — achieving superior stain removal at lower temperatures and pH levels while maintaining fabric integrity.",
    imageUrl: "../assets/products/Detergent.png",
    imageAlt: "Clean laundry and specialized detergent enzymes",
    slug: "detergent",

    quickStats: [
        { val: "7", label: "Specialized Products" },
        { val: "Eco", label: "Friendly" },
        { val: "SELZYME", label: "Brand" },
    ],

    processSteps: [
        {
            step: "01",
            title: "Substrate Targeting",
            desc: "Specific enzymes target distinct soil types—proteins, lipids, or starches—breaking them down at a molecular level.",
        },
        {
            step: "02",
            title: "Solubilization",
            desc: "Insoluble stains are converted into water-soluble components, allowing them to be easily rinsed away during the wash cycle.",
        },
        {
            step: "03",
            title: "Fiber Rejuvenation",
            desc: "Cellulases specifically target micro-fibrils on cotton fabrics, removing fuzz and pills to restore color brightness and smoothness.",
        },
        {
            step: "04",
            title: "Optimized Efficiency",
            desc: "Advanced blends reduce the need for high heat or harsh chemicals, significantly lowering energy and water consumption.",
        },
    ],

    products: [
        {
            code: "SELZYME – PROT",
            enzyme: "Alkaline Protease",
            application: "Laundry Detergents",
            purpose: "Effectively targets and breaks down protein-based stains such as blood, mucus, and organic cells.",
            tags: ["Protein Removal", "Organic Stains"],
        },
        {
            code: "SELZYME – LIP",
            enzyme: "Alkaline Lipase",
            application: "Oil & Grease Removal",
            purpose: "Treats oil and fat content, breaking it down into water-soluble substances for easier removal during washing.",
            tags: ["Lipid Breakdown", "Grease Control"],
        },
        {
            code: "SELZYME – CL",
            enzyme: "Alkaline Cellulase",
            application: "Fabric Care",
            purpose: "Treats cellulose fibers to rejuvenate fabric appearance and ensure water solubility of cellulosic soil.",
            tags: ["Color Care", "Fiber Smoothing"],
        },
        {
            code: "SELZYME – AMY",
            enzyme: "Alkaline Amylase",
            application: "Starch Removal",
            purpose: "Targets starch-based residues and food stains, contributing to a smoother feel for the finished laundry.",
            tags: ["Starch Hydrolysis", "Fabric Feel"],
        },
        {
            code: "SELZYME – WASH P",
            enzyme: "Powder Enzyme Blend",
            application: "Powder Formulations",
            purpose: "A balanced multi-enzyme powder that improves detergent quality while reducing energy and water footprint.",
            tags: ["Powder Concentrates", "Energy Saving"],
        },
        {
            code: "SELZYME – WASH L",
            enzyme: "Liquid Enzyme Blend",
            application: "Liquid Formulations",
            purpose: "A stabilized liquid blend designed for high-performance liquid detergents and automatic dishwashing.",
            tags: ["Liquid Detergent", "Stability"],
        },
        {
            code: "SELZYME – WASH G",
            enzyme: "Multi-Enzyme Granules",
            application: "High-Performance Granules",
            purpose: "High-performing enzyme granules designed for consistent dispersion and maximum cleaning efficiency.",
            tags: ["Granular Tech", "High Performance"],
        },
    ],

    aboutTitle: "Sustainable Cleaning Technology",
    aboutSub: "The science of modern household and industrial detergents.",
    aboutBody: [
        "Enzymes have fundamentally changed the landscape of the detergent industry, serving as essential functional ingredients that drive efficiency and environmental sustainability. By replacing traditional chemical surfactants with biological catalysts, manufacturers can deliver professional-grade cleaning results.",
        "Proteases remain a cornerstone for laundry detergents, providing unmatched removal of organic stains. Meanwhile, Lipases and Amylases allow for effective cleaning in household machines at much lower temperatures, significantly reducing the carbon footprint of every wash cycle.",
        "Beyond simple cleaning, Cellulases contribute to the longevity of garments. By selectively acting on the cellulose fibers, they maintain the 'new' appearance of clothes and prevent the graying effect caused by repeated washing.",
        "Ansel Biotech’s range of SELZYME detergent enzymes is engineered for compatibility with various pH levels and temperatures, ensuring that whether in powder, liquid, or granular form, your product delivers a superior, eco-friendly clean.",
    ],

    ctaTitle: "Formulate your next\ncleaning solution",
    ctaBody:
        "Our technical team can help you select the optimal blend of SELZYME catalysts to improve your detergent's efficacy and sustainability.",
};

export default function DetergentProducts() {
    return <IndustryProductPage c={content} />;
}