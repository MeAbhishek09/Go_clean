import { LayoutDashboard, MapPin, BarChart2, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Overview", path: "/overview", icon: LayoutDashboard },
    { name: "Zones Map", path: "/zones", icon: MapPin },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
    { name: "Alerts", path: "/alerts", icon: Bell },
  ];

  return (
    <aside className="bg-white/80 backdrop-blur-lg shadow-lg w-64 h-screen p-6 space-y-6 border-r border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <Icon size={18} /> {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
