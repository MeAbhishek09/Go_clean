import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CitizenDashboard from "./pages/CitizenDashboard";
import PostOfficeDashboard from "./pages/PostOfficeDashboard";
import DivisionalDashboard from "./pages/DivisionalDashboard";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/citizen" element={<CitizenDashboard />} />
      <Route path="/post-office" element={<PostOfficeDashboard />} />
      <Route path="/divisional" element={<DivisionalDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
