import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
    industry: "Pharmaceutical",
    headline: ["Pharmaceutical", "Industry"],
    accentLine: 1,
    subtitle:
        "High-purity enzymatic solutions for therapeutic drug formulation, cardiovascular health, and advanced digestive support systems.",
    imageUrl: "/assets/products/PharmaEnzyme.png",
    imageAlt: "Pharmaceutical laboratory research and enzyme development",
    slug: "pharma",

    quickStats: [
        { val: "6", label: "Specialized Enzymes" },
        { val: "Pure", label: "Bio-catalysts" },
        { val: "SELZYME", label: "Brand" },
    ],

    processSteps: [
        {
            step: "01",
            title: "Biochemical Targeting",
            desc: "Unlike small molecules, enzymes specifically bind to biological targets, ensuring high precision in therapeutic action.",
        },
        {
            step: "02",
            title: "Catalytic Conversion",
            desc: "The enzyme catalyzes the conversion of target molecules into desired therapeutic products within the biological system.",
        },
        {
            step: "03",
            title: "Bio-Availability",
            desc: "Formulations are optimized to maintain enzymatic stability and activity for maximum potency upon administration.",
        },
        {
            step: "04",
            title: "Therapeutic Effect",
            desc: "Achieves complex biochemistry such as dissolving clots or managing inflammation that ordinary molecular drugs cannot match.",
        },
    ],

    products: [
        {
            code: "SELZYME DIGEST",
            enzyme: "Digestive Enzyme Mixture",
            application: "Gastrointestinal Health",
            purpose: "A comprehensive blend used in the production of medicines to support and regulate the human digestive system.",
            tags: ["Digestive Support", "GI Health"],
        },
        {
            code: "SELZYME PANCREATINE",
            enzyme: "Amylase, Protease & Lipase Blend",
            application: "Enzyme Replacement Therapy",
            purpose: "Assists in the digestion of fats, proteins, and sugars while neutralizing stomach acids as they enter the small intestine.",
            tags: ["Pancreatic Support", "Multi-Enzyme"],
        },
        {
            code: "SELZYME MURA",
            enzyme: "Lysozyme",
            application: "Antimicrobial Defense",
            purpose: "A powerful antimicrobial and antiviral enzyme used in specialty pharmaceutical formulations.",
            tags: ["Antiviral", "Antimicrobial"],
        },
        {
            code: "SELZYME NATT",
            enzyme: "Nattokinase",
            application: "Cardiovascular Care",
            purpose: "Specifically utilized for its ability to dissolve blood clots during the treatment of various cardiovascular diseases.",
            tags: ["Cardio Health", "Fibrinolytic"],
        },
        {
            code: "SELZYME PAPAYA",
            enzyme: "Papain",
            application: "Anti-Inflammatory & Topical",
            purpose: "Used for treating inflammation and pain via topical administration; also features anthelmintic and dental whitening properties.",
            tags: ["Anti-Inflammatory", "Analgesic"],
        },
        {
            code: "SELZYME TRYP",
            enzyme: "Trypsin",
            application: "Protein Metabolism",
            purpose: "Facilitates the digestion of food proteins in the small intestine, enhancing the nutritional quality of protein intake.",
            tags: ["Protein Digestion", "Nutritional Quality"],
        },
    ],

    aboutTitle: "Biocatalysis in Modern Medicine",
    aboutSub: "Unmatched potential in therapeutic biochemistry.",
    aboutBody: [
        "Enzymes represent a revolutionary class of drugs in the pharmaceutical industry, offering unique advantages over traditional small-molecule medications. Their primary strength lies in their ability to specifically bind to biological targets with high affinity.",
        "Once bound, these enzymes catalyze the conversion of molecules within the body, achieving therapeutic results that are often impossible for simpler chemical structures. This specificity reduces off-target effects and enhances the overall potency of the drug.",
        "The SELZYME pharmaceutical range by Ansel Biotech is designed to meet the rigorous demands of medical applications. From cardiovascular support with Nattokinase to specialized digestive blends like Pancreatine, our enzymes facilitate critical life processes.",
        "By leveraging these biological catalysts, pharmaceutical manufacturers can create more effective treatments for inflammation, blood clotting, and nutritional deficiencies, driving better patient outcomes through advanced biochemistry.",
    ],

    ctaTitle: "Enhance your pharmaceutical\nformulations",
    ctaBody:
        "Consult with our biochemical experts to integrate high-purity SELZYME catalysts into your next therapeutic product line.",
};

export default function PharmaProducts() {
    return <IndustryProductPage c={content} />;
}