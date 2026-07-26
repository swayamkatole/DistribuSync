import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DocsPage } from "./pages/DocsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

/**
 * App — Root Component
 * ------------------------------------------------------------------
 * Declares the client-side routing table for the DistribuSync
 * frontend, analogous to a Spring MVC `@Controller` mapping table:
 *
 *   /            -> LandingPage      (public)
 *   /login       -> LoginPage        (public)
 *   /signup      -> SignupPage       (public)
 *   /architecture-> ArchitecturePage (public)
 *   /docs        -> DocsPage         (public)
 *   /dashboard   -> DashboardPage    (protected — requires session)
 * ------------------------------------------------------------------
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[#05060f] text-white antialiased">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
