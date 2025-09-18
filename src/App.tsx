import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";
import { ModeProvider } from "./contexts/ModeContext";
import ThetaLayout from "./components/layout/ThetaLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Students from "./pages/Students";
import Playlists from "./pages/Playlists";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerProvider>
        <ModeProvider>
          <div className="dark">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ThetaLayout />}>
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
