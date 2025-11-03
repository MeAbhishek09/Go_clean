import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  Map,
  Layers,
  Activity,
  Users,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

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

        {/* Predictive Insight */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-md p-8 mb-10 border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Predictive Insight</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong className="text-emerald-700">Zone E</strong> may require additional
            resources next week based on current trends and historical patterns. Consider
            deploying extra teams for preventive maintenance.
          </p>
        </section>

        {/* Regional Analytics */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Regional Analytics</h2>
            <span className="text-sm text-gray-500">
              Comprehensive Zone Analysis
            </span>
          </div>

          <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border flex flex-col items-center justify-center text-gray-600">
            <BarChart3 className="h-8 w-8 mb-2 text-emerald-600" />
            <p>Interactive charts showing comparative performance, historical trends, and AI predictive modeling</p>
          </div>

          <div className="flex justify-around mt-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" /> Historical Performance
            </span>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" /> Trend Analysis
            </span>
            <span className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" /> AI Predictions
            </span>
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

export default DivisionalDashboard;
