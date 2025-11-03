import { useState } from "react";
import {
  Upload,
  MapPin,
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Camera,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import ChallanIdentify from "../components/ChallanIdentify";

const CitizenDashboard = () => {
  const [reports, setReports] = useState([
    { id: 1, location: "Main Street, Zone A", status: "cleaned", date: "2024-01-15", score: 10 },
    { id: 2, location: "Park Avenue, Zone B", status: "in-progress", date: "2024-01-18", score: 0 },
    { id: 3, location: "Market Road, Zone A", status: "pending", date: "2024-01-20", score: 0 },
  ]);

  const [badges] = useState([
    { name: "First Report", icon: "🌱", earned: true },
    { name: "10 Reports", icon: "🌿", earned: true },
    { name: "Zone Champion", icon: "🏆", earned: false },
    { name: "Green Hero", icon: "⭐", earned: true },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [gpsLocation, setGpsLocation] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const statusConfig = {
    cleaned: { label: "Cleaned", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    "in-progress": { label: "In Progress", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    pending: { label: "Pending", icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-100" },
  };

  // ✅ Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSuccess(false);
      // Fetch GPS location (simulated)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setGpsLocation({ latitude, longitude });
          },
          () => setGpsLocation({ latitude: "Unavailable", longitude: "Unavailable" })
        );
      }
    }
  };

  // ✅ Simulate submission
  const handleSubmit = () => {
    if (!selectedImage) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setSelectedImage(null);
      setGpsLocation(null);

      // Add new report to list
      setReports((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          location: `Auto-tagged: ${gpsLocation ? `${gpsLocation.latitude}, ${gpsLocation.longitude}` : "Unknown"}`,
          status: "pending",
          date: new Date().toISOString().split("T")[0],
          score: 0,
        },
      ]);
    }, 2000);
  };

  return (
    <DashboardLayout role="citizen">
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800 p-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">Swachhta & LiFE Zone</h1>
          <p className="text-gray-600">Citizen Dashboard</p>
        </header>

        {/* Welcome Section */}
        <section className="relative bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 text-white p-8 rounded-3xl shadow-xl mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                Welcome Back!
                <Sparkles className="h-8 w-8 animate-pulse" />
              </h2>
              <p className="text-white/90 text-lg">Track your impact and make a difference</p>
            </div>
            <Award className="h-24 w-24 opacity-30 animate-bounce" />
          </div>
        </section>

        {/* Stat Cards */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-xl flex items-center justify-center">
                <Upload className="h-6 w-6" />
              </div>
              <TrendingUp className="text-green-600" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Reports</p>
            <p className="text-4xl font-bold">{reports.length}</p>
            <p className="text-green-600 text-sm mt-1">+2 this week</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <Sparkles className="text-yellow-400 animate-pulse" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Swachhta Points</p>
            <p className="text-4xl font-bold">30</p>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-teal-400 w-3/4 animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-teal-500 to-green-400 text-white rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Badges Earned</p>
            <p className="text-4xl font-bold">
              {badges.filter((b) => b.earned).length}/{badges.length}
            </p>
            <p className="text-gray-500 text-sm mt-1">1 more to unlock!</p>
          </div>
        </section>

        {/* Upload + Badges */}
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Upload Report */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upload Report</h2>
              <Camera className="h-6 w-6 text-emerald-600" />
            </div>

            {/* Upload Area */}
            <label className="border-2 border-dashed border-emerald-300 rounded-2xl p-12 text-center hover:bg-emerald-50 transition cursor-pointer block">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="mx-auto h-40 rounded-xl object-cover"
                />
              ) : (
                <>
                  <Upload className="h-10 w-10 mx-auto text-emerald-500 mb-3 animate-bounce" />
                  <p className="font-semibold text-gray-800 mb-2">Click to upload image</p>
                  <p className="text-sm text-gray-500">GPS location will be auto-tagged</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>

            {/* Show location */}
            {gpsLocation && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                📍 Tagged Location: {gpsLocation.latitude}, {gpsLocation.longitude}
              </p>
            )}

            {/* Upload Status */}
            {uploading && <p className="text-center text-sm text-emerald-600 mt-3">Uploading...</p>}
            {success && (
              <p className="text-center text-green-600 mt-3 font-semibold">
                ✅ Report submitted successfully!
              </p>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedImage || uploading}
              className={`w-full mt-6 rounded-xl py-3 font-semibold text-white transition ${
                !selectedImage || uploading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg"
              }`}
            >
              {uploading ? "Submitting..." : "Submit Report"}
            </button>
          </div>

          {/* Badges Section (unchanged) */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Swachhta Badges</h2>
              <Award className="h-6 w-6 text-teal-600" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`rounded-2xl p-6 text-center border-2 ${
                    badge.earned
                      ? "border-emerald-300 bg-emerald-50 hover:shadow-md"
                      : "border-gray-200 opacity-60 grayscale"
                  } transition`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="font-semibold text-gray-700">{badge.name}</p>
                  {badge.earned && (
                    <CheckCircle className="h-4 w-4 mx-auto text-green-500 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* My Reports (unchanged) */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Reports</h2>
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">
              {reports.length} total
            </span>
          </div>

          <div className="space-y-3">
            {reports.map((report) => {
              const config = statusConfig[report.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={report.id}
                  className="flex justify-between items-center p-5 rounded-xl bg-gray-50 hover:bg-emerald-50 transition border"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${config.bg}`}>
                      <MapPin className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{report.location}</p>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {report.score > 0 && (
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs">
                        +{report.score} pts
                      </span>
                    )}
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${config.color} ${config.bg}`}
                    >
                      <StatusIcon className="h-3 w-3" /> {config.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
        </section>
        <div className="relative z-10">
        <ChallanIdentify />
      </div>
        
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
