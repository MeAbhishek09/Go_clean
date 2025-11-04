import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Bell,
  BarChart3,
  PieChart as PieIcon,
  Calendar,
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
  const [selectedDay, setSelectedDay] = useState("2025-11-04");

  // --- Garbage Classification Data ---
  const aiGarbageData = {
    "2025-11-03": [
      { name: "Plastic", value: 40 },
      { name: "Organic", value: 30 },
      { name: "Paper", value: 15 },
      { name: "Metal", value: 10 },
      { name: "Other", value: 5 },
    ],
    "2025-11-04": [
      { name: "Plastic", value: 28 },
      { name: "Organic", value: 42 },
      { name: "Paper", value: 10 },
      { name: "Metal", value: 15 },
      { name: "Other", value: 5 },
    ],
    "2025-11-05": [
      { name: "Plastic", value: 35 },
      { name: "Organic", value: 25 },
      { name: "Paper", value: 20 },
      { name: "Metal", value: 10 },
      { name: "Other", value: 10 },
    ],
  };

  // --- Dirt Detection Data ---
  const aiDetections = {
    "2025-11-03": [
      {
        id: 1,
        area: "Main Street",
        category: "Plastic Waste",
        timestamp: "2025-11-03 09:42 AM",
        imageUrl: "https://i.ibb.co/0GdYxZ8/litter1.jpg",
      },
      {
        id: 2,
        area: "Park Avenue",
        category: "Wet Garbage",
        timestamp: "2025-11-03 10:44 AM",
        imageUrl: "https://i.ibb.co/XtwhPbM/litter2.jpg",
      },
    ],
    "2025-11-04": [
      {
        id: 3,
        area: "Station Road",
        category: "Paper Litter",
        timestamp: "2025-11-04 08:20 AM",
        imageUrl: "https://i.ibb.co/ZV6nh6B/litter3.jpg",
      },
      {
        id: 4,
        area: "Market Square",
        category: "Organic Waste",
        timestamp: "2025-11-04 10:05 AM",
        imageUrl: "https://i.ibb.co/0J9sKcP/challan1.jpg",
      },
    ],
    "2025-11-05": [
      {
        id: 5,
        area: "Old Town",
        category: "Plastic Waste",
        timestamp: "2025-11-05 07:45 AM",
        imageUrl: "https://i.ibb.co/8NtH3nF/challan2.jpg",
      },
      {
        id: 6,
        area: "Bus Stand",
        category: "Wet Garbage",
        timestamp: "2025-11-05 09:15 AM",
        imageUrl: "https://i.ibb.co/ZV6nh6B/litter3.jpg",
      },
    ],
  };

  // --- Challan Detection Data ---
  const challanByDate = {
    "2025-11-03": [
      {
        id: 1,
        image: "https://i.ibb.co/0GdYxZ8/litter1.jpg",
        area: "Main Street",
        timestamp: "2025-11-03 09:10 AM",
        status: "Pending Verification",
      },
      {
        id: 2,
        image: "https://i.ibb.co/XtwhPbM/litter2.jpg",
        area: "Station Road",
        timestamp: "2025-11-03 11:35 AM",
        status: "Identified - Reward ₹50",
      },
    ],
    "2025-11-04": [
      {
        id: 3,
        image: "https://i.ibb.co/ZV6nh6B/litter3.jpg",
        area: "Park Avenue",
        timestamp: "2025-11-04 10:25 AM",
        status: "Identified - Reward ₹75",
      },
      {
        id: 4,
        image: "https://i.ibb.co/0J9sKcP/challan1.jpg",
        area: "City Mall Junction",
        timestamp: "2025-11-04 01:40 PM",
        status: "Challan Generated - ₹500 Fine",
      },
    ],
    "2025-11-05": [
      {
        id: 5,
        image: "https://i.ibb.co/8NtH3nF/challan2.jpg",
        area: "Old Bus Stand",
        timestamp: "2025-11-05 09:00 AM",
        status: "Challan Paid - Verified",
      },
    ],
  };

  const COLORS = ["#16a34a", "#22c55e", "#86efac", "#15803d", "#4ade80"];
  const trendData = [
    { day: "Mon", score: 80 },
    { day: "Tue", score: 82 },
    { day: "Wed", score: 85 },
    { day: "Thu", score: 88 },
    { day: "Fri", score: 87 },
    { day: "Sat", score: 90 },
    { day: "Sun", score: 92 },
  ];

  const handleNotify = (area) =>
    alert(`Notification sent to nearby workers for cleanup at ${area}!`);

  const garbageStats = aiGarbageData[selectedDay];
  const detections = aiDetections[selectedDay];
  const challans = challanByDate[selectedDay] || [];

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

        {/* Overview Cards */}
        <section className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />,
              label: "Zone Score",
              value: "87",
              desc: "+5% /100",
              color: "text-green-600",
            },
            {
              icon: <AlertCircle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />,
              label: "Pending",
              value: "5",
              desc: "Requires attention",
              color: "text-yellow-600",
            },
            {
              icon: <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />,
              label: "In Progress",
              value: "3",
              desc: "Active monitoring",
              color: "text-blue-600",
            },
            {
              icon: <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />,
              label: "Resolved",
              value: "24",
              desc: "This month",
              color: "text-green-600",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              {card.icon}
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-4xl font-bold text-gray-800">{card.value}</p>
              <p className={`${card.color} text-sm`}>{card.desc}</p>
            </div>
          ))}
        </section>

        {/* 📅 Date Selector */}
        <div className="flex justify-end items-center gap-3 mb-6">
          <Calendar className="text-emerald-600" />
          <label className="text-gray-700 font-medium">Select Day:</label>
          <select
            className="border border-emerald-400 rounded-lg px-3 py-2 text-gray-800 focus:outline-none"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="2025-11-03">Nov 3, 2025</option>
            <option value="2025-11-04">Nov 4, 2025</option>
            <option value="2025-11-05">Nov 5, 2025</option>
          </select>
        </div>

        {/* Charts */}
        <section className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Line Chart */}
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

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieIcon className="text-emerald-600" /> Garbage Classification (AI)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={garbageStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {garbageStats.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 🧹 Dirt Spotted Section */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Dirt Spotted (AI + CCTV)
            </h2>
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">
              {detections.length} detections on {selectedDay}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-emerald-100 text-emerald-800">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Area</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Timestamp</th>
                  <th className="px-4 py-2">Image</th>
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

        {/* 🚨 AI Challan Monitoring System */}
        <section className="bg-white rounded-2xl shadow-md p-8 mt-10 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <AlertCircle className="text-red-600" /> AI Challan Monitoring System
          </h2>

          {challans.length > 0 ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
              {challans.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-white border"
                >
                  <img
                    src={incident.image}
                    alt="Incident"
                    className="rounded-xl mb-4 w-full h-48 object-cover"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {incident.area}
                  </h2>
                  <p className="text-sm text-gray-500">
                    🕒 {incident.timestamp}
                  </p>
                  <p
                    className={`mt-2 text-sm font-bold ${
                      incident.status.includes("Identified") ||
                      incident.status.includes("Paid")
                        ? "text-green-600"
                        : incident.status.includes("Challan")
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    Status: {incident.status}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center">
              No challan incidents recorded on {selectedDay}.
            </p>
          )}
        </section>

        <footer className="text-center text-sm text-gray-600 mt-10">
          Swachhta & LiFE Zone Monitoring System • AI-driven Cleanliness +
          Compliance
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default PostOfficeDashboard;
