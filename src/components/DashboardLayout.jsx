import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, LogOut, Home } from "lucide-react";

export default function DashboardLayout({ children, role }) {
  const navigate = useNavigate();

  const roleNames = {
    citizen: "Citizen",
    "post-office": "Zone Manager",
    divisional: "Divisional Supervisor",
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      {/* ---- Header ---- */}
      <header className="bg-white/80 backdrop-blur border-b shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-eco flex items-center justify-center shadow-glow animate-float">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Swachhta & LiFE Zone
                </h1>
                <p className="text-sm text-gray-500">{roleNames[role]}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-emerald-600 border border-emerald-400 rounded-lg hover:bg-emerald-50 transition"
              >
                <LogOut className="h-4 w-4" />
                Switch Role
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Main Content ---- */}
      <main className="flex-grow container mx-auto px-4 py-8 animate-slide-up">
        {children}
      </main>

      {/* ---- Footer ---- */}
      <footer className="bg-white/80 backdrop-blur border-t border-gray-200 mt-12 shadow-inner">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            Swachhta & LiFE Zone Monitoring System • Empowering Sustainable
            Communities
          </p>
        </div>
      </footer>
    </div>
  );
}
