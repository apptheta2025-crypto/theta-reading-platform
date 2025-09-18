import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";
import { ModeProvider } from "./contexts/ModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/auth/AuthGuard";
import ThetaLayout from "./components/layout/ThetaLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Students from "./pages/Students";
import Playlists from "./pages/Playlists";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PlayerProvider>
          <ModeProvider>
            <div className="dark">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  
                  {/* Protected app routes */}
                  <Route path="/" element={
                    <AuthGuard>
                      <ThetaLayout />
                    </AuthGuard>
                  }>
                    <Route index element={<Home />} />
                    <Route path="search" element={<Search />} />
                    <Route path="library" element={<Library />} />
                    <Route path="students" element={<Students />} />
                    <Route path="playlists" element={<Playlists />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="liked" element={<Library />} />
                    <Route path="episodes" element={<Library />} />
                    <Route path="recent" element={<Library />} />
                    <Route path="downloads" element={<Library />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </ModeProvider>
        </PlayerProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
