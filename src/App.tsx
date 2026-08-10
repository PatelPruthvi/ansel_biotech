import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { ScrollToTop } from "./components/ScrollToTop";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Products"));
const Industries = lazy(() => import("@/pages/Industries"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

const ProbioticsProducts = lazy(() => import("@/pages/products/ProbioticsProducts"));
const EnzymesProducts = lazy(() => import("@/pages/products/EnzymesProducts"));
const AnimalHealthcareProducts = lazy(
  () => import("@/pages/products/AnimalHealthcareProducts")
);
const AquaProducts = lazy(() => import("@/pages/products/AquaProducts"));
const TextileProducts = lazy(() => import("@/pages/products/TextileProducts"));
const DetergentProducts = lazy(() => import("@/pages/products/DetergentProducts"));
const LeatherProducts = lazy(() => import("@/pages/products/LeatherProducts"));
const FoodProducts = lazy(() => import("@/pages/products/FoodProducts"));
const AnimalFeedProducts = lazy(() => import("@/pages/products/AnimalProducts"));
const SugarProducts = lazy(() => import("@/pages/products/SugarProducts"));
const DistilleryProducts = lazy(() => import("@/pages/products/DistilleryProducts"));
const StarchProducts = lazy(() => import("@/pages/products/StarchProducts"));
const BreweryProducts = lazy(() => import("@/pages/products/BreweryProducts"));
const PharmaProducts = lazy(() => import("@/pages/products/PharmaProducts"));
const WasteWaterProducts = lazy(() => import("@/pages/products/WasteWaterProducts"));
const PaperPulpProducts = lazy(() => import("@/pages/products/PaperProducts"));

const queryClient = new QueryClient();

function PageFallback() {
  return (
    <div
      className="w-full min-h-[50vh] flex items-center justify-center"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-border border-t-green animate-spin"
        aria-hidden
      />
    </div>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/products" component={Products} />
            <Route path="/industries" component={Industries} />

            <Route path="/products/probiotics" component={ProbioticsProducts} />
            <Route path="/products/enzymes" component={EnzymesProducts} />

            <Route
              path="/products/animal-healthcare"
              component={AnimalHealthcareProducts}
            />
            <Route path="/products/aqua" component={AquaProducts} />
            <Route path="/products/textile" component={TextileProducts} />
            <Route path="/products/detergent" component={DetergentProducts} />
            <Route path="/products/leather" component={LeatherProducts} />
            <Route path="/products/food" component={FoodProducts} />

            <Route path="/products/feed" component={AnimalFeedProducts} />

            <Route path="/products/sugar" component={SugarProducts} />
            <Route path="/products/distillery" component={DistilleryProducts} />
            <Route path="/products/starch" component={StarchProducts} />
            <Route path="/products/brewery" component={BreweryProducts} />
            <Route path="/products/pharma" component={PharmaProducts} />
            <Route path="/products/wastewater" component={WasteWaterProducts} />
            <Route path="/products/paper" component={PaperPulpProducts} />

            <Route path="/contact" component={Contact} />
            <Route path="/contacts" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFAB />
      <Cursor />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base="">
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
