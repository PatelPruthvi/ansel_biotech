import { IndustryProductPage, type IndustryPageContent } from "@/components/IndustryProductPage";

const content: IndustryPageContent = {
  industry: "Food Industry",
  headline: ["Food Industry", "Enzymes"],
  accentLine: 1,
  subtitle:
    "High-purity enzyme solutions and custom blends designed to enhance efficiency, quality, and sustainability in food and beverage processing.",
  imageUrl: "../assets/products/FoodEnzyme.png",
  imageAlt: "Bakery and dairy food assortment",
  slug: "food",

  quickStats: [
    { val: "20+", label: "Solutions" },
    { val: "ISO", label: "Certified" },
    { val: "SELZYME", label: "Brand" },
  ],

  products: [
    {
      code: "SELZYME – FAMY",
      enzyme: "Fungal Alpha Amylase",
      application: "Bakery / Bread Improver",
      purpose: "Increases bread volume by enhancing the fermentation process.",
      tags: ["Bakery", "Volume"],
    },
    {
      code: "SELZYME – X",
      enzyme: "Xylanase",
      application: "Bakery / Bread Improver",
      purpose: "Improves softness of the bread and maintains bread structure.",
      tags: ["Bakery", "Texture"],
    },
    {
      code: "SELZYME – LIP",
      enzyme: "Lipase",
      application: "Bakery / Bread Improver",
      purpose: "Improves softness and structure while increasing shelf life.",
      tags: ["Bakery", "Shelf Life"],
    },
    {
      code: "SELZYME – PROT",
      enzyme: "Protease",
      application: "Bakery / Biscuits",
      purpose: "Improves flavor, nutritional value, and dough extensibility in biscuit production.",
      tags: ["Bakery", "Conditioning"],
    },
    {
      code: "SELZYME – GLUOXY",
      enzyme: "Glucose Oxidase",
      application: "Bakery / Bread Improver",
      purpose: "Strengthens gluten structure to increase bread volume.",
      tags: ["Bakery", "Strength"],
    },
    {
      code: "SELZYME – PAPAYA",
      enzyme: "Papain",
      application: "Biscuit Industry",
      purpose: "Hydrolyses gluten structure to reduce dough elasticity.",
      tags: ["Biscuits", "Elasticity"],
    },
    {
      code: "SELZYME – PLIP",
      enzyme: "Phospholipase",
      application: "Bakery / Bread Improver",
      purpose: "Improves dough stability and crumb structure.",
      tags: ["Bakery", "Crumb"],
    },
    /* Dairy Enzymes */
    {
      code: "SELZYME – LPH",
      enzyme: "Lactase",
      application: "Milk Production",
      purpose: "Produces lactose-reduced milk for lactose-intolerant consumers.",
      tags: ["Dairy", "Lactose-Free"],
    },
    {
      code: "SELZYME – TGase",
      enzyme: "Transglutaminase",
      application: "Yoghurt & Cheese",
      purpose: "Prevents syneresis and creates a firmer, smoother texture.",
      tags: ["Dairy", "Texture"],
    },
    {
      code: "SELZYME – RENN",
      enzyme: "Rennet Enzyme",
      application: "Cheese Production",
      purpose: "Essential preparation used to clot milk by removing peptide fragments from κ-casein.",
      tags: ["Dairy", "Coagulation"],
    },
    /* Other Food Enzymes */
    {
      code: "SELZYME – PECTIC",
      enzyme: "Pectinase",
      application: "Juice & Winery",
      purpose: "Used for extraction and clarification to remove pectin responsible for turbidity.",
      tags: ["Beverage", "Clarification"],
    },
    {
      code: "SELZYME – SUCRASE",
      enzyme: "Invertase",
      application: "Sugar & Syrup",
      purpose: "Used for inversion of sucrose in the preparation of invert sugar and high fructose syrup.",
      tags: ["Syrup", "Inversion"],
    },
    {
      code: "SELZYME – BROM",
      enzyme: "Bromelain",
      application: "Food Processing",
      purpose: "Primary application in the tenderization of food products.",
      tags: ["General Food", "Tenderization"],
    },
  ],

  aboutTitle: "Advanced Food Biotechnology",
  aboutSub: "Enhancing Taste, Texture, and Process Efficiency",
  aboutBody: [
    "Enzymes are essential tools in modern food processing, aiding in the manufacturing of cheese, vinegar, wine, and the leavening of bread. These biological catalysts help save energy and resources while significantly improving overall production efficiency.",
    "In many instances, the use of enzymes has been proven to decrease the volume and toxicity of by-products and effluents, making food production more environmentally friendly. Ansel Biotech provides a wide range of high-purity enzymes and custom blends tailored for specific food and beverage applications.",
    "In the baking industry, our enzymes revolutionize products by extending shelf-life, improving dough handling, and providing anti-staling properties. This gives manufacturers greater control over crumb texture, color, and volume.",
    "For the dairy sector, we focus on meeting the demands of health-conscious consumers. Our solutions include lactose hydrolysis for specialized milk products and enzymes for flavor enhancement, cheese ripening, and protein modification.",
  ],

  processSteps: [
    {
      step: "01",
      title: "Substrate Analysis",
      desc: "We analyze your food matrix (flour, milk, or fruit) to determine the optimal enzyme concentration.",
    },
    {
      step: "02",
      title: "Custom Blending",
      desc: "Creating specialized enzyme cocktails to achieve specific texture or shelf-life targets.",
    },
    {
      step: "03",
      title: "Clean Labeling",
      desc: "Replacing chemical additives with biological catalysts for a cleaner, safer end product.",
    },
  ],

  ctaTitle: "Optimize your food\nprocessing today",
  ctaBody:
    "Consult with our application specialists to find the perfect SELZYME blend for your specific food or beverage production needs.",
};

export default function FoodProducts() {
  return <IndustryProductPage c={content} />;
}