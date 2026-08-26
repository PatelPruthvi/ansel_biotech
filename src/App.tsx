import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
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
import AnimalHealthcareProducts from "@/pages/industries/AnimalHealthcareProducts";
import TextileProducts from "@/pages/industries/TextileProducts";
import DetergentProducts from "@/pages/industries/DetergentProducts";
import LeatherProducts from "@/pages/industries/LeatherProducts";
import FoodProducts from "@/pages/industries/FoodProducts";
import AnimalFeedProducts from "@/pages/industries/AnimalProducts";
import SugarProducts from "@/pages/industries/SugarProducts";
import DistilleryProducts from "@/pages/industries/DistilleryProducts";
import StarchProducts from "@/pages/industries/StarchProducts";
import BreweryProducts from "@/pages/industries/BreweryProducts";
import PharmaProducts from "@/pages/industries/PharmaProducts";
import WasteWaterProducts from "@/pages/industries/WasteWaterProducts";
import PaperPulpProducts from "@/pages/industries/PaperProducts";

const queryClient = new QueryClient();

/** Soft redirect for legacy /products/* industry URLs */
function Redirect({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to, { replace: true });
  }, [to, setLocation]);
  return null;
}

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

            <Route path="/industries/animal-healthcare" component={AnimalHealthcareProducts} />
            <Route path="/industries/textile" component={TextileProducts} />
            <Route path="/industries/detergent" component={DetergentProducts} />
            <Route path="/industries/leather" component={LeatherProducts} />
            <Route path="/industries/food" component={FoodProducts} />

            <Route path="/industries/feed" component={AnimalFeedProducts} />
            <Route path="/industries/sugar" component={SugarProducts} />
            <Route path="/industries/distillery" component={DistilleryProducts} />
            <Route path="/industries/starch" component={StarchProducts} />
            <Route path="/industries/brewery" component={BreweryProducts} />
            <Route path="/industries/pharma" component={PharmaProducts} />
            <Route path="/industries/wastewater" component={WasteWaterProducts} />
            <Route path="/industries/paper" component={PaperPulpProducts} />

            {/* Legacy /products/* industry paths → /industries/* */}
            <Route path="/products/animal-healthcare">
              {() => <Redirect to="/industries/animal-healthcare" />}
            </Route>
            <Route path="/products/textile">
              {() => <Redirect to="/industries/textile" />}
            </Route>
            <Route path="/products/detergent">
              {() => <Redirect to="/industries/detergent" />}
            </Route>
            <Route path="/products/leather">
              {() => <Redirect to="/industries/leather" />}
            </Route>
            <Route path="/products/food">
              {() => <Redirect to="/industries/food" />}
            </Route>
            <Route path="/products/feed">
              {() => <Redirect to="/industries/feed" />}
            </Route>
            <Route path="/products/sugar">
              {() => <Redirect to="/industries/sugar" />}
            </Route>
            <Route path="/products/distillery">
              {() => <Redirect to="/industries/distillery" />}
            </Route>
            <Route path="/products/starch">
              {() => <Redirect to="/industries/starch" />}
            </Route>
            <Route path="/products/brewery">
              {() => <Redirect to="/industries/brewery" />}
            </Route>
            <Route path="/products/pharma">
              {() => <Redirect to="/industries/pharma" />}
            </Route>
            <Route path="/products/wastewater">
              {() => <Redirect to="/industries/wastewater" />}
            </Route>
            <Route path="/products/paper">
              {() => <Redirect to="/industries/paper" />}
            </Route>

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
