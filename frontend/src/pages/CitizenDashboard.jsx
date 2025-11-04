import { useState } from "react";
import {
  Upload,
  MapPin,
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Camera,
  Gift,
  Users,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import ChallanIdentify from "../components/ChallanIdentify";

const CitizenDashboard = () => {
  const [reports, setReports] = useState([
    { id: 1, location: "Main Street, Zone A", status: "cleaned", date: "2025-11-01", score: 10 },
    { id: 2, location: "Park Avenue, Zone B", status: "in-progress", date: "2025-11-02", score: 0 },
    { id: 3, location: "Market Road, Zone A", status: "pending", date: "2025-11-03", score: 0 },
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
  const [detections, setDetections] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(50); // initial points

  const statusConfig = {
    cleaned: { label: "Cleaned", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    "in-progress": { label: "In Progress", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    pending: { label: "Pending", icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-100" },
  };

  // 🖼️ Image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSuccess(false);

      // GPS
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

  // 🧠 Detection logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) return alert("Please select an image first");

    setUploading(true);
    setTimeout(() => {
      const random = Math.random();
      const result =
        random > 0.5
          ? { name: "Garbage Detected", confidence: (0.7 + Math.random() * 0.3).toFixed(2) }
          : { name: "Clean Area", confidence: (0.8 + Math.random() * 0.2).toFixed(2) };

      setDetections([result]);
      setSuccess(true);
      setUploading(false);

      // Add report
      const newReport = {
        id: reports.length + 1,
        location: gpsLocation
          ? `Lat: ${gpsLocation.latitude.toFixed(2)}, Long: ${gpsLocation.longitude.toFixed(2)}`
          : "Unknown Location",
        status: result.name === "Garbage Detected" ? "pending" : "cleaned",
        date: new Date().toISOString().split("T")[0],
        score: result.name === "Garbage Detected" ? 10 : 0,
      };
      setReports((prev) => [newReport, ...prev]);

      // 💰 Reward update: +10 when garbage detected
      if (result.name === "Garbage Detected") {
        setRewardPoints((prev) => prev + 10);
      }
    }, 2000);
  };

  // 🏆 Redeem rewards
  const handleRedeem = () => {
    if (rewardPoints < 50) {
      alert("You need at least 50 points to redeem!");
      return;
    }
    alert(`🎉 Successfully redeemed 50 points! Keep contributing to cleanliness.`);
    setRewardPoints((prev) => prev - 50);
  };

  // 📊 Postal area leaderboard
  const postalLeaderboard = [
    { area: "Zone A", points: 260 },
    { area: "Zone B", points: 180 },
    { area: "Zone C", points: 140 },
  ];

  return (
    <DashboardLayout role="citizen">
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800 p-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">Swachhta & LiFE Zone</h1>
          <p className="text-gray-600">Citizen Dashboard</p>
        </header>

        {/* Welcome */}
        <section className="relative bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 text-white p-8 rounded-3xl shadow-xl mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                Welcome Back! <Sparkles className="h-8 w-8 animate-pulse" />
              </h2>
              <p className="text-white/90 text-lg">Track your impact and earn rewards</p>
            </div>
            <Award className="h-24 w-24 opacity-30 animate-bounce" />
          </div>
        </section>

        {/* Upload & Badges */}
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Upload Report */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upload Report</h2>
              <Camera className="h-6 w-6 text-emerald-600" />
            </div>

            <label className="border-2 border-dashed border-emerald-300 rounded-2xl p-12 text-center hover:bg-emerald-50 transition cursor-pointer block">
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="mx-auto h-40 rounded-xl object-cover" />
              ) : (
                <>
                  <Upload className="h-10 w-10 mx-auto text-emerald-500 mb-3 animate-bounce" />
                  <p className="font-semibold text-gray-800 mb-2">Click to upload image</p>
                  <p className="text-sm text-gray-500">GPS location will be auto-tagged</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>

            {gpsLocation && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                📍 Tagged Location: {gpsLocation.latitude}, {gpsLocation.longitude}
              </p>
            )}

            {uploading && <p className="text-center text-sm text-emerald-600 mt-3">Detecting...</p>}
            {success && (
              <p className="text-center text-green-600 mt-3 font-semibold">
                ✅ Detection complete! ({detections[0]?.name})
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!selectedImage || uploading}
              className={`w-full mt-6 rounded-xl py-3 font-semibold text-white transition ${
                !selectedImage || uploading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg"
              }`}
            >
              {uploading ? "Detecting..." : "Submit Report"}
            </button>

            {detections.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-emerald-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Detection Results:</h3>
                {detections.map((d, i) => (
                  <p key={i} className="text-sm text-gray-700 mb-1">
                    🗑️ <b>{d.name}</b> — Confidence: {(d.confidence * 100).toFixed(1)}%
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Rewards & Badges */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Gift className="text-emerald-600" /> Rewards & Badges
            </h2>

            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-emerald-600">{rewardPoints} pts</p>
              <p className="text-gray-500 text-sm">Your current Swachhta score</p>
              <button
                onClick={handleRedeem}
                className="mt-3 px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
              >
                Redeem 50 Points
              </button>
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
                  {badge.earned && <CheckCircle className="h-4 w-4 mx-auto text-green-500 mt-2" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Postal Leaderboard */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users className="text-teal-600" /> Postal Area Leaderboard
          </h2>
          <div className="space-y-3">
            {postalLeaderboard.map((area, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border hover:bg-emerald-50 transition"
              >
                <span className="font-semibold text-gray-800">{area.area}</span>
                <span className="font-bold text-emerald-600">{area.points} pts</span>
              </div>
            ))}
          </div>
        </section>

        {/* My Reports */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-10 hover:shadow-xl transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Reports</h2>
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">{reports.length} total</span>
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

        {/* Challan Identify */}
        <div className="relative z-10">
          <ChallanIdentify />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
