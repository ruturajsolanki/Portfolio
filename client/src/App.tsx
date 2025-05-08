import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Education from "@/pages/Education";
import Contact from "@/pages/Contact";
import Certifications from "@/pages/Certifications";
import Cursor from "@/components/Cursor";
import { useMediaQuery } from "@/hooks/use-mobile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/skills" component={Skills} />
      <Route path="/education" component={Education} />
      <Route path="/contact" component={Contact} />
      <Route path="/certifications" component={Certifications} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isDesktop && <Cursor />}
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
