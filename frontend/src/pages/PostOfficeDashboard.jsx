import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  ShieldCheck,
  Gauge,
  Bell,
  BarChart3,
  PieChart as PieIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import DashboardLayout from "../components/DashboardLayout";

const PostOfficeDashboard = () => {
  const [trendData] = useState([
    { day: "Mon", score: 80 },
    { day: "Tue", score: 82 },
    { day: "Wed", score: 85 },
    { day: "Thu", score: 88 },
    { day: "Fri", score: 87 },
    { day: "Sat", score: 90 },
    { day: "Sun", score: 92 },
  ]);

  const [garbageStats] = useState([
    { name: "Plastic", value: 40 },
    { name: "Organic", value: 30 },
    { name: "Paper", value: 15 },
    { name: "Metal", value: 10 },
    { name: "Other", value: 5 },
  ]);

  const COLORS = ["#16a34a", "#22c55e", "#86efac", "#15803d", "#4ade80"];

  const [detections] = useState([
    {
      id: 1,
      area: "Main Street",
      category: "Plastic Waste",
      timestamp: "2025-11-03 09:42:10",
      imageUrl: "https://placehold.co/120x80?text=Plastic+Waste",
    },
    {
      id: 2,
      area: "Station Road",
      category: "Wet Garbage",
      timestamp: "2025-11-03 10:10:34",
      imageUrl: "https://placehold.co/120x80?text=Wet+Garbage",
    },
    {
      id: 3,
      area: "Park Avenue",
      category: "Paper Litter",
      timestamp: "2025-11-03 10:44:55",
      imageUrl: "https://placehold.co/120x80?text=Paper+Litter",
    },
  ]);

  const handleNotify = (area) => {
    alert(`Notification sent to nearby workers for cleanup at ${area}!`);
  };

  const statusColors = {
    pending: "text-yellow-600 bg-yellow-100",
    "in-progress": "text-blue-600 bg-blue-100",
    resolved: "text-green-600 bg-green-100",
  };

  // Dummy map data (replace with real post office coordinates later)
  const postalZones = [
    { name: "Post Office A", lat: 20.2961, lng: 85.8245, status: "clean" },
    { name: "Post Office B", lat: 20.2981, lng: 85.8300, status: "moderate" },
    { name: "Post Office C", lat: 20.2995, lng: 85.8180, status: "unclean" },
  ];
  

  return (
    <DashboardLayout role="post-office">
      <div className="p-8 text-gray-800">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">
            Zone Manager Dashboard
          </h1>
          <p className="text-gray-600">Zone A - Central Division</p>
        </header>

        {/* Overview */}
        <section className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-sm text-gray-500">Zone Score</p>
            <p className="text-4xl font-bold text-gray-800">87</p>
            <p className="text-green-600 text-sm">+5% /100</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <AlertCircle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-4xl font-bold text-gray-800">5</p>
            <p className="text-yellow-600 text-sm">Requires attention</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="text-4xl font-bold text-gray-800">3</p>
            <p className="text-blue-600 text-sm">Active monitoring</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-sm text-gray-500">Resolved</p>
            <p className="text-4xl font-bold text-gray-800">24</p>
            <p className="text-green-600 text-sm">This month</p>
          </div>
        </section>

        {/* 🗺️ Visible Map Section */}
        {/* 🗺️ Postal Region Map Section */}
<section className="bg-white rounded-2xl shadow-md p-8 mb-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Central Postal Division — Live Cleanliness Map
  </h2>

  <div className="h-96 rounded-lg overflow-hidden">
    <MapContainer
      center={[20.2961, 85.8245]} // Example: Bhubaneswar central area
      zoom={15} // Closer zoom for visible region
      style={{ height: "100%", width: "100%" }}
    >
      {/* OpenStreetMap visible base layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Example postal region cleanliness points */}
      <CircleMarker
        center={[20.2963, 85.8249]}
        radius={10}
        color="green"
        fillOpacity={0.7}
      >
        <Tooltip>
          <span className="font-semibold">Post Office Entrance</span>
          <br />
          Status: Clean ✅
        </Tooltip>
      </CircleMarker>

      <CircleMarker
        center={[20.2958, 85.8238]}
        radius={10}
        color="orange"
        fillOpacity={0.7}
      >
        <Tooltip>
          <span className="font-semibold">Sorting Area</span>
          <br />
          Status: Moderate ⚠️
        </Tooltip>
      </CircleMarker>

      <CircleMarker
        center={[20.2970, 85.8255]}
        radius={10}
        color="red"
        fillOpacity={0.7}
      >
        <Tooltip>
          <span className="font-semibold">Backyard Waste Zone</span>
          <br />
          Status: Needs Attention 🚨
        </Tooltip>
      </CircleMarker>

      <CircleMarker
        center={[20.2968, 85.8265]}
        radius={10}
        color="green"
        fillOpacity={0.7}
      >
        <Tooltip>
          <span className="font-semibold">Front Gate</span>
          <br />
          Status: Clean ✅
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  </div>

  <div className="flex justify-around mt-6 text-sm text-gray-600">
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-green-400"></span> Clean
    </span>
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Moderate
    </span>
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-red-400"></span> Needs Attention
    </span>
  </div>
</section>


        {/* Charts Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="text-emerald-600" /> Cleanliness Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ReTooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieIcon className="text-emerald-600" /> Garbage Classification
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={garbageStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {garbageStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ReTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* AI Table */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Dirt Spotted (AI + CCTV)
            </h2>
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">
              {detections.length} detections
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-emerald-100 text-emerald-800">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Area</th>
                  <th className="px-4 py-2">Garbage Type</th>
                  <th className="px-4 py-2">Timestamp</th>
                  <th className="px-4 py-2">Image Snapshot</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-emerald-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-semibold text-gray-800">
                      {item.area}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {item.category}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {item.timestamp}
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={item.imageUrl}
                        alt="detection"
                        className="rounded-lg border w-24 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleNotify(item.area)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-emerald-700 transition"
                      >
                        <Bell className="w-4 h-4" /> Notify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
                {/* 🚨 AI Challan Monitoring System Section */}
<section className="bg-white rounded-2xl shadow-md p-8 mt-10 hover:shadow-xl transition">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
    <AlertCircle className="text-red-600" /> AI Challan Monitoring System
  </h2>

  <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
    {[
      {
        id: 1,
        image: "https://i.ibb.co/0GdYxZ8/litter1.jpg",
        area: "Main Street",
        timestamp: "2025-11-04 01:45 PM",
        status: "Pending Verification",
      },
      {
        id: 2,
        image: "https://i.ibb.co/XtwhPbM/litter2.jpg",
        area: "Station Road",
        timestamp: "2025-11-04 12:20 PM",
        status: "Pending Verification",
      },
      {
        id: 3,
        image: "https://i.ibb.co/ZV6nh6B/litter3.jpg",
        area: "Park Avenue",
        timestamp: "2025-11-03 10:10 AM",
        status: "Identified - Reward ₹75",
      },
    ].map((incident) => (
      <div
        key={incident.id}
        className="p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-white border"
      >
        <img
          src={incident.image}
          alt="Littering Incident"
          className="rounded-xl mb-4 w-full h-48 object-cover"
        />
        <h2 className="text-lg font-semibold text-gray-800">{incident.area}</h2>
        <p className="text-sm text-gray-500">🕒 {incident.timestamp}</p>
        <p
          className={`mt-2 text-sm font-bold ${
            incident.status.includes("Identified")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          Status: {incident.status}
        </p>
      </div>
    ))}
  </div>
</section>



        <footer className="text-center text-sm text-gray-600 mt-10">
          Swachhta & LiFE Zone Monitoring System • Empowering Sustainable
          Communities
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default PostOfficeDashboard;
