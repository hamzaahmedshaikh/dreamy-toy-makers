import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import FloatingElements from "./components/FloatingElements";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CustomizePage from "./pages/CustomizePage";
import SamplesPage from "./pages/SamplesPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import PoliciesPage from "./pages/PoliciesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col">
          <FloatingElements />
          <Navigation />
          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/customize" element={<CustomizePage />} />
              <Route path="/samples" element={<SamplesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
