import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { AuthProvider, useAuth } from "@/context/AuthContext.jsx";
import { BookingProvider } from "@/context/BookingContext.jsx";
import Navbar from "@/components/Navbar.jsx";
import Landing from "@/pages/Landing.jsx";
import Home from "@/pages/Home.jsx";
import ExploreSphere from "@/pages/ExploreSphere.jsx";
import Translator from "@/pages/Translator.jsx";
import Profile from "@/pages/Profile.jsx";
import NotFound from "@/pages/NotFound.jsx";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user?.loggedIn) return <Navigate to="/" replace />;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/explore" element={<ProtectedRoute><ExploreSphere /></ProtectedRoute>} />
    <Route path="/translator" element={<ProtectedRoute><Translator /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
