import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  Map as MapIcon,
  Layers,
  Activity,
  Users,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DivisionalDashboard = () => {
  const zones = [
    { name: "Zone A - Central", score: 87, change: "+5", color: "text-green-600", offices: 4, issues: 8 },
    { name: "Zone B - North", score: 82, change: "+3", color: "text-green-600", offices: 5, issues: 12 },
    { name: "Zone C - South", score: 75, change: "-2", color: "text-red-600", offices: 6, issues: 18 },
    { name: "Zone D - East", score: 90, change: "+8", color: "text-green-600", offices: 3, issues: 5 },
    { name: "Zone E - West", score: 68, change: "-4", color: "text-red-600", offices: 7, issues: 22 },
  ];

  const alerts = [
    {
      zone: "Zone E - West",
      color: "bg-red-100 text-red-700",
      priority: "Priority 1",
      desc: "High number of unresolved issues",
      emoji: "🔴",
    },
    {
      zone: "Zone C - South",
      color: "bg-yellow-100 text-yellow-700",
      priority: "Priority 2",
      desc: "Declining cleanliness score",
      emoji: "🟡",
    },
    {
      zone: "Zone B - North",
      color: "bg-blue-100 text-blue-700",
      priority: "Priority 3",
      desc: "Pending verification needed",
      emoji: "🔵",
    },
  ];

  // Post office coordinates (example data)
  const postOffices = [
    { name: "Main Post Office", zone: "Zone A - Central", lat: 23.361, lng: 85.334, cleanliness: 88 },
    { name: "Central Colony PO", zone: "Zone A - Central", lat: 23.359, lng: 85.337, cleanliness: 85 },
    { name: "Kanke PO", zone: "Zone B - North", lat: 23.406, lng: 85.319, cleanliness: 82 },
    { name: "Bariatu PO", zone: "Zone B - North", lat: 23.398, lng: 85.337, cleanliness: 79 },
    { name: "Harmu PO", zone: "Zone C - South", lat: 23.342, lng: 85.320, cleanliness: 75 },
    { name: "Doranda PO", zone: "Zone C - South", lat: 23.331, lng: 85.316, cleanliness: 73 },
    { name: "Namkum PO", zone: "Zone D - East", lat: 23.357, lng: 85.383, cleanliness: 90 },
    { name: "Tatisilwai PO", zone: "Zone D - East", lat: 23.332, lng: 85.405, cleanliness: 89 },
    { name: "Piska PO", zone: "Zone E - West", lat: 23.348, lng: 85.280, cleanliness: 70 },
    { name: "Ratu Road PO", zone: "Zone E - West", lat: 23.373, lng: 85.290, cleanliness: 66 },
  ];

  const zoneColors = {
    "Zone A - Central": "green",
    "Zone B - North": "blue",
    "Zone C - South": "orange",
    "Zone D - East": "purple",
    "Zone E - West": "red",
  };

  return (
    <DashboardLayout role="divisional">
      <div className="p-8 text-gray-800">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">
            Divisional Supervisor Dashboard
          </h1>
          <p className="text-gray-600">Regional Performance Overview & Analytics</p>
        </header>

        {/* Summary Cards */}
        <section className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Layers className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-sm text-gray-500">Total Zones</p>
            <p className="text-4xl font-bold text-gray-800">5</p>
            <p className="text-green-600 text-sm">Across division</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-sm text-gray-500">Active Issues</p>
            <p className="text-4xl font-bold text-gray-800">65</p>
            <p className="text-yellow-600 text-sm">Requires monitoring</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-sm text-gray-500">Post Offices</p>
            <p className="text-4xl font-bold text-gray-800">25</p>
            <p className="text-blue-600 text-sm">Under management</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <TrendingUp className="h-8 w-8 mx-auto text-emerald-600 mb-2" />
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-4xl font-bold text-gray-800">80.4</p>
          </div>
        </section>

        {/* Divisional Map */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Divisional Map</h2>
            <p className="text-gray-500 text-sm">Post Offices by Zone</p>
          </div>

          <MapContainer
            center={[23.36, 85.33]}
            zoom={12.5}
            className="h-96 w-full rounded-xl z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {postOffices.map((po, index) => (
              <CircleMarker
                key={index}
                center={[po.lat, po.lng]}
                radius={10}
                fillColor={zoneColors[po.zone]}
                color={zoneColors[po.zone]}
                fillOpacity={0.6}
                stroke={true}
              >
                <Popup>
                  <strong>{po.name}</strong>
                  <br />
                  {po.zone}
                  <br />
                  Cleanliness Score: {po.cleanliness}%
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="flex justify-around mt-4 text-sm text-gray-600">
            {Object.keys(zoneColors).map((zone, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: zoneColors[zone] }}
                ></span>
                {zone}
              </span>
            ))}
          </div>
        </section>

        {/* Zone Performance */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Zone Performance</h2>
            <p className="text-gray-500 text-sm">5 Zones • 25 Post Offices</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {zones.map((zone, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border rounded-xl p-5 bg-gray-50 hover:bg-emerald-50 transition"
              >
                <div>
                  <p className="font-bold text-lg text-gray-800">{zone.name}</p>
                  <p className="text-sm text-gray-500">
                    {zone.offices} post offices • {zone.issues} issues
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">{zone.score}</p>
                  <p className={`text-sm font-semibold ${zone.color}`}>{zone.change}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🧹 Cleanliness Comparison Graph */}
        <div className="text-gray-800 text-center gap-16 grid grid-cols-2 gap-4">
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Zone Cleanliness Comparison</h2>
            <p className="text-gray-500 text-sm">Identify zones that need cleaning attention</p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zones} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Bar
                  dataKey="score"
                  radius={[10, 10, 0, 0]}
                  label={{ position: "top", fontSize: 12 }}
                  fill="#4ade80"
                  isAnimationActive={true}
                >
                  {zones.map((entry, index) => (
                    <cell
                      key={`cell-${index}`}
                      fill={entry.score >= 85 ? "#22c55e" : entry.score >= 75 ? "#fbbf24" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span> Clean Zones
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Moderate Zones
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span> Need Cleaning
            </span>
          </div>
        </section>

        {/* AI Alerts */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Alerts</h2>
          <div className="space-y-4">
            {alerts.map((a, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 rounded-xl ${a.color} border`}
              >
                <span className="text-2xl">{a.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-800">{a.zone}</p>
                  <p className="text-sm font-medium">{a.priority}</p>
                  <p className="text-sm text-gray-600">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
         </div>

         {/* 📅 Monthly Report Generation */}
<section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Monthly Report</h2>
    <span className="text-sm text-gray-500">Generate Division Summary</span>
  </div>

  <div className="grid md:grid-cols-3 gap-6 items-end mb-6">
    {/* Month Selector */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Select Month
      </label>
      <select
        id="month"
        className="w-full border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 p-2"
      >
        {[
          "January","February","March","April","May","June",
          "July","August","September","October","November","December"
        ].map((m, i) => (
          <option key={i} value={m}>{m}</option>
        ))}
      </select>
    </div>

    {/* Year Selector */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Select Year
      </label>
      <select
        id="year"
        className="w-full border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 p-2"
      >
        {[2023, 2024, 2025].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>

    {/* Button */}
    <div className="flex justify-end">
      <button
        onClick={() => alert("Monthly Report Generated Successfully ✅")}
        className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition font-medium"
      >
        Generate Report
      </button>
    </div>
  </div>

  {/* Report Summary Preview */}
  <div className="border-t pt-6 text-gray-700">
    <h3 className="font-semibold mb-2 text-gray-800">
      📊 Monthly Summary (Preview)
    </h3>
    <ul className="text-sm space-y-1">
      <li>• Average Cleanliness Score: <span className="font-semibold text-emerald-700">82.3</span></li>
      <li>• Most Improved Zone: <span className="font-semibold text-blue-600">Zone D - East</span></li>
      <li>• Zone Needing Attention: <span className="font-semibold text-red-600">Zone E - West</span></li>
      <li>• Total Issues Resolved: <span className="font-semibold text-emerald-600">57</span></li>
    </ul>
  </div>
</section>



      </div>
    </DashboardLayout>
  );
};

export default DivisionalDashboard;
