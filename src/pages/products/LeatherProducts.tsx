import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

/**
 * Leather Processing — client PDF §12.
 * Key applications: Soaking, Dehairing, Bating, Degreasing.
 * Product names/benefits preserved from PDF (Unhairing = Dehairing stage).
 */
const content: IndustryPageContent = {
  industry: "Leather Processing",
  headline: ["Leather", "Processing"],
  accentLine: 1,
  subtitle:
    "Our leather processing enzymes replace harsh chemicals in traditional tanning processes, improving leather quality while reducing environmental impact.",
  imageUrl: "/assets/products/Detergent.png",
  imageAlt: "Leather processing",
  slug: "leather",

  quickStats: [
    { val: "4", label: "Key Applications" },
    { val: "5", label: "Enzyme Solutions" },
  ],

  productsEyebrow: "Leather Enzyme Solutions",
  productsTitle: "Enzyme solutions",
  processEyebrow: "Leather Processing",
  processTitle: "Key applications",

  processSteps: [
    {
      step: "01",
      title: "Soaking",
      desc: "Soaking Enzyme Blend (Protease & Lipase): enzyme formulation designed for efficient soaking and rehydration of hides and skins.",
      icon: "💧",
    },
    {
      step: "02",
      title: "Dehairing",
      desc: "Unhairing Enzyme (Alkaline Protease): alkaline protease enzyme for controlled unhairing and opening of hide structure.",
      icon: "✂️",
    },
    {
      step: "03",
      title: "Bating",
      desc: "Bating enzymes (Alkaline Protease and Acid Protease) for limed/partially delimed pelts and pickled, wet blue, or partially tanned leather.",
      icon: "🧴",
    },
    {
      step: "04",
      title: "Degreasing",
      desc: "Degreasing Enzyme (Lipase): lipase-based enzyme system for effective removal of fats and oils from hides and skins.",
      icon: "🫒",
    },
  ],

  products: [
    {
      code: "SOAKING-BLEND",
      enzyme: "Soaking Enzyme Blend (Protease & Lipase)",
      application: "Soaking",
      purpose:
        "Enzyme formulation designed for efficient soaking and rehydration of hides and skins. Key benefits: improves rehydration efficiency; enhances softness and pliability; supports cleaner grain structure.",
      tags: ["Soaking", "Protease & Lipase"],
    },
    {
      code: "UNHAIRING",
      enzyme: "Unhairing Enzyme (Alkaline Protease)",
      application: "Dehairing",
      purpose:
        "Alkaline protease enzyme for controlled unhairing and opening of hide structure. Key benefits: facilitates easy hair removal; improves grain smoothness; compatible with sulphide-reduced processes.",
      tags: ["Dehairing", "Alkaline Protease"],
    },
    {
      code: "BATING-ALKALINE",
      enzyme: "Bating Enzyme (Alkaline Protease)",
      application: "Bating",
      purpose:
        "Alkaline protease enzyme for bating of limed and partially delimed pelts. Key benefits: improves softness and elasticity; enhances scud removal; supports uniform leather structure.",
      tags: ["Bating", "Alkaline Protease"],
    },
    {
      code: "BATING-ACID",
      enzyme: "Bating Enzyme (Acid Protease)",
      application: "Bating",
      purpose:
        "Acid protease enzyme for bating of pickled, wet blue, or partially tanned leather. Key benefits: improves grain tightness; enhances color uniformity; supports smooth, pliable leather.",
      tags: ["Bating", "Acid Protease"],
    },
    {
      code: "DEGREASING",
      enzyme: "Degreasing Enzyme (Lipase)",
      application: "Degreasing",
      purpose:
        "Lipase-based enzyme system for effective removal of fats and oils from hides and skins. Key benefits: improves fat removal; enhances dye uptake; reduces need for surfactants.",
      tags: ["Degreasing", "Lipase"],
    },
  ],

  aboutTitle: "Leather Processing Applications",
  aboutSub:
    "Our leather processing enzymes replace harsh chemicals in traditional tanning processes, improving leather quality while reducing environmental impact.",
  aboutBody: [
    "Key applications: Soaking, Dehairing, Bating and Degreasing.",
  ],
  aboutItems: [
    {
      icon: "💧",
      label: "Soaking",
      text: "Soaking Enzyme Blend (Protease & Lipase) for efficient soaking and rehydration of hides and skins. Improves rehydration efficiency, softness and pliability, and supports a cleaner grain structure.",
    },
    {
      icon: "✂️",
      label: "Dehairing",
      text: "Unhairing Enzyme (Alkaline Protease) for controlled unhairing and opening of hide structure. Facilitates hair removal, improves grain smoothness, and is compatible with sulphide-reduced processes.",
    },
    {
      icon: "🧴",
      label: "Bating",
      text: "Alkaline and Acid Protease bating enzymes for limed/partially delimed pelts and for pickled, wet blue, or partially tanned leather. Supports softness, elasticity, grain tightness and colour uniformity.",
    },
    {
      icon: "🫒",
      label: "Degreasing",
      text: "Degreasing Enzyme (Lipase) for effective removal of fats and oils from hides and skins. Improves fat removal and dye uptake while reducing the need for surfactants.",
    },
  ],

  ctaTitle: "Get in touch about\nleather processing",
  ctaBody:
    "Contact our team about leather processing enzymes for soaking, dehairing, bating and degreasing.",
};

export default function LeatherProducts() {
  return <IndustryProductPage c={content} />;
}
