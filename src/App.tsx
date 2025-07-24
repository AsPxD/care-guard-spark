import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SeizureDiary from "./pages/SeizureDiary";
import Medication from "./pages/Medication";
import Emergency from "./pages/Emergency";
import DoctorChat from "./pages/DoctorChat";
import Reports from "./pages/Reports";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";
import MobileNavbar from "./components/MobileNavbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/diary" element={<SeizureDiary />} />
            <Route path="/medication" element={<Medication />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/chat" element={<DoctorChat />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/education" element={<Education />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileNavbar />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
