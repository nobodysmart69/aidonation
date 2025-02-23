import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import NavHeader from "@/components/nav-header";
import Dashboard from "./pages/dashboard";
import Crisis from "./pages/crisis";
import Analytics from "./pages/analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/crisis/:id" component={Crisis} />
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
          className="relative min-h-screen bg-background"
          style={{
            backgroundImage: 'url("/attached_assets/Untitled.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="relative z-10">
            <NavHeader />
            <main className="container mx-auto px-4 py-8">
              <Router />
            </main>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;