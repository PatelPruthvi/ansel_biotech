import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Waste Water",
    headline: ["Waste Water", "Industry"],
    accentLine: 1,
    subtitle:
        "Advanced biological catalysts and microbial blends designed to oxidize impurities, reduce sludge, and eliminate odors efficiently.",
    imageUrl: "/assets/products/water_1.png",
    imageAlt: "Sustainable water treatment facility",
    slug: "wastewater",

    quickStats: [
        { val: "Bio", label: "Catalysts" },
        { val: "100%", label: "Chemical Free" },
        { val: "SELZYME", label: "Brand" },
    ],

    processSteps: [
        {
            step: "01",
            title: "Biological Oxidation",
            desc: "Microbial strains and enzymes initiate the rapid breakdown of complex organic matter and xenobiotic pollutants.",
        },
        {
            step: "02",
            title: "Sludge Reduction",
            desc: "Accelerated bacterial oxidation significantly reduces the volume of solid waste and sludge within the system.",
        },
        {
            step: "03",
            title: "Odour Neutralization",
            desc: "Specific enzymatic actions target the root causes of volatile organic compounds, eliminating foul smells at the source.",
        },
        {
            step: "04",
            title: "Effluent Optimization",
            desc: "Final treatment phases ensure higher quality discharge water, meeting environmental standards at a lower operational cost.",
        },
    ],

    products: [
        {
            code: "SELZYME – AEROBE",
            enzyme: "Enzyme & Microbe Blend",
            application: "Aerobic Secondary Treatment",
            purpose:
                "Fastens bacterial oxidation of sludge and removes foul odors. Ideal for increasing the capacity of existing aerobic systems.",
            tags: ["Aerobic", "Sludge Oxidation", "Odour Control"],
        },
        {
            code: "SELZYME – ANAEROBE",
            enzyme: "Enzyme & Microbe Blend",
            application: "Anaerobic Secondary Treatment",
            purpose:
                "Specifically formulated for oxygen-deprived environments to degrade organic waste and improve overall system efficiency.",
            tags: ["Anaerobic", "System Efficiency", "Bio-degradation"],
        },
    ],

    aboutTitle: "Sustainable Water Recovery",
    aboutSub: "The evolution from chemical to biological wastewater management.",
    aboutBody: [
        "Water is the world's most critical natural resource, yet surface water remains highly vulnerable to municipal and industrial pollution. Traditional physical and chemical technologies often involve prohibitive costs and complex infrastructure.",
        "Ansel Biotech provides a biological alternative that has gained significant attention for its ability to completely oxidize toxic impurities. Our methods utilize nature's own catalysts to achieve superior results with simpler equipment and lower energy requirements.",
        "Our SELZYME treatment range contains specially selected enzymes and bacteria strains that start acting immediately upon application. By targeting organic waste at a molecular level, these products improve the quality of wastewater effluent without relying on harsh chemicals.",
        "Whether managing municipal wastewater or industrial runoff, our solutions focus on long-term system health—reducing sludge buildup, eliminating odors, and ensuring that treated water meets the highest environmental safety standards.",
    ],

    ctaTitle: "Optimize your\ntreatment plant",
    ctaBody:
        "Our technical experts can help you implement a biological treatment strategy that reduces costs and improves discharge quality.",
};

export default function WasteWaterProducts() {
    return <IndustryProductPage c={content} />;
}