import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import SugarProducts from "@/pages/products/SugarProducts";
import TextileProducts from "@/pages/products/TextileProducts";
import FoodProducts from "@/pages/products/FoodProducts";
import Contact from "@/pages/Contact";
import DistilleryProducts from "./pages/products/DistilleryProducts";
import StarchProducts from "./pages/products/StarchProducts";
import BreweryProducts from "./pages/products/BreweryProducts";
import PharmaProducts from "./pages/products/PharmaProducts";
import DetergentProducts from "./pages/products/DetergentProducts";
import WasteWaterProducts from "./pages/products/WasteWaterProducts";
import PaperPulpProducts from "./pages/products/PaperProducts";
import AnimalFeedProducts from "./pages/products/AnimalProducts";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/products/sugar" component={SugarProducts} />
          <Route path="/products/textile" component={TextileProducts} />
          <Route path="/products/food" component={FoodProducts} />
          <Route path="/products/distillery" component={DistilleryProducts} />
          <Route path="/products/starch" component={StarchProducts} />
          <Route path="/products/brewery" component={BreweryProducts} />
          <Route path="/products/pharma" component={PharmaProducts} />
          <Route path="/products/detergent" component={DetergentProducts} />
          <Route path="/products/wastewater" component={WasteWaterProducts} />
          <Route path="/products/paper" component={PaperPulpProducts} />
          <Route path="/products/feed" component={AnimalFeedProducts} />

          <Route path="/contact" component={Contact} />
          <Route path="/contacts" component={Contact} />
          <Route component={NotFound} />
        </Switch>
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
        {/* base="/" works correctly for local dev and standard deployments */}
        <WouterRouter base="">
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
