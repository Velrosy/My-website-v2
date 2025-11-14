import { useRoutes } from "wouter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./lib/i18n";

const queryClient = new QueryClient();

const routes = {
  "/": () => <Home />,
  "*": () => <NotFound />,
};

function RouterComponent() {
  const routeResult = useRoutes(routes);
  return routeResult || <NotFound />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <RouterComponent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
