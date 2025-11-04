import { Leaf, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const roleNames = {
    citizen: "Citizen",
    "post-office": "Zone Manager",
    divisional: "Divisional Supervisor",
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-eco flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Swachhta & LiFE Zone</h1>
            <p className="text-xs text-gray-500">{roleNames[role]}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition"
          >
            <Home size={18} /> Home
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded-md hover:bg-green-100 transition"
          >
            <LogOut size={18} /> Switch Role
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
