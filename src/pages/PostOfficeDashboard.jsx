import { useState } from "react";
import {
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart,
  Activity,
  ShieldCheck,
  Gauge,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const PostOfficeDashboard = () => {
  const [issues] = useState([
    { id: 1, location: "Main Street", reporter: "#145", date: "2024-01-20", status: "pending", priority: "high" },
    { id: 2, location: "Park Avenue", reporter: "#289", date: "2024-01-19", status: "in-progress", priority: "medium" },
    { id: 3, location: "Market Road", reporter: "#034", date: "2024-01-18", status: "in-progress", priority: "high" },
    { id: 4, location: "Station Road", reporter: "#567", date: "2024-01-20", status: "pending", priority: "low" },
  ]);

  const statusColors = {
    pending: "text-yellow-600 bg-yellow-100",
    "in-progress": "text-blue-600 bg-blue-100",
    resolved: "text-green-600 bg-green-100",
  };

  return (
    <DashboardLayout role="post-office">
      <div className="p-8 text-gray-800">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">Zone Manager Dashboard</h1>
          <p className="text-gray-600">Zone A - Central Division</p>
        </header>

        {/* Overview Stats */}
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

        {/* Zone Map Section */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Zone Map</h2>
            <span className="text-gray-500 text-sm">12 sub-areas monitored</span>
          </div>
          <div className="h-64 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl flex items-center justify-center text-gray-500 border">
            <p>🗺️ Interactive Zone Heatmap</p>
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

        {/* Performance Metrics */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl text-center">
              <Activity className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">AI Cleanliness Score</p>
              <p className="text-2xl font-bold text-gray-800">87/100</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl text-center">
              <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Resolution Rate</p>
              <p className="text-2xl font-bold text-gray-800">75%</p>
            </div>

            <div className="bg-teal-50 p-6 rounded-xl text-center">
              <Gauge className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Sustainability Index</p>
              <p className="text-2xl font-bold text-gray-800">82%</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white border rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-gray-800">12</p>
              <p className="text-sm text-gray-500">Total Areas</p>
            </div>
            <div className="bg-white border rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-gray-800">92%</p>
              <p className="text-sm text-gray-500">Coverage</p>
            </div>
            <div className="bg-white border rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-gray-800">4.5</p>
              <p className="text-sm text-gray-500">Avg Response</p>
            </div>
          </div>
        </section>

        {/* Active Issues */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Active Issues</h2>
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">{issues.length} items</span>
          </div>

          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex justify-between items-center p-5 rounded-xl bg-gray-50 hover:bg-emerald-50 transition border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-100">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{issue.location}</p>
                    <p className="text-sm text-gray-500">
                      Reported by Citizen {issue.reporter} • {issue.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      statusColors[issue.status]
                    }`}
                  >
                    {issue.status.replace("-", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 mt-10">
          Swachhta & LiFE Zone Monitoring System • Empowering Sustainable Communities
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default PostOfficeDashboard;
