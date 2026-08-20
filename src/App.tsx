import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { ScrollToTop } from "./components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Industries from "@/pages/Industries";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

import ProbioticsProducts from "@/pages/products/ProbioticsProducts";
import EnzymesProducts from "@/pages/products/EnzymesProducts";
import AnimalHealthcareProducts from "@/pages/products/AnimalHealthcareProducts";
import TextileProducts from "@/pages/products/TextileProducts";
import DetergentProducts from "@/pages/products/DetergentProducts";
import LeatherProducts from "@/pages/products/LeatherProducts";
import FoodProducts from "@/pages/products/FoodProducts";
import AnimalFeedProducts from "@/pages/products/AnimalProducts";
import SugarProducts from "@/pages/products/SugarProducts";
import DistilleryProducts from "@/pages/products/DistilleryProducts";
import StarchProducts from "@/pages/products/StarchProducts";
import BreweryProducts from "@/pages/products/BreweryProducts";
import PharmaProducts from "@/pages/products/PharmaProducts";
import WasteWaterProducts from "@/pages/products/WasteWaterProducts";
import PaperPulpProducts from "@/pages/products/PaperProducts";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <PageTransition>
          {(location) => (
          <Switch location={location}>
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
          )}
        </PageTransition>
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
