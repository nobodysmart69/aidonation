import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/navigation/Sidebar";
import Dashboard from "@/pages/dashboard";
import FundDistribution from "@/pages/fund-distribution";
import Analytics from "@/pages/analytics";
import NotFound from "@/pages/not-found";
import NavHeader from "@/components/navigation/NavHeader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/fund-distribution" component={FundDistribution} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div 
          className="min-h-screen bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/Untitled.png)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <NavHeader />
              <main className="flex-1 overflow-y-auto relative">
                <Router />
              </main>
            </div>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;