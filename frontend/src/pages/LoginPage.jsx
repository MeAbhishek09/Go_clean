import { useNavigate } from "react-router-dom";
import { Leaf, Building2, MapPin, Users, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "citizen",
      title: "Citizen",
      description: "Report cleanliness issues and track sustainability efforts",
      icon: Users,
      path: "/citizen",
      gradient: "from-emerald-400 via-green-400 to-teal-400",
      delay: "delay-[100ms]",
    },
    {
      id: "post-office",
      title: "Post Office",
      description: "Zone Manager – Monitor and manage local cleanliness zones",
      icon: Building2,
      path: "/post-office",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      delay: "delay-[200ms]",
    },
    {
      id: "divisional",
      title: "Divisional Office",
      description: "Supervisor – Oversee multiple zones and performance analytics",
      icon: MapPin,
      path: "/divisional",
      gradient: "from-teal-400 via-emerald-500 to-green-500",
      delay: "delay-[300ms]",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* 🌈 Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* 🌿 Foreground Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-6xl w-full text-center">
          {/* Header Section */}
          <div className="mb-16 space-y-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-300 via-emerald-400 to-teal-400 rounded-3xl blur-xl opacity-70 animate-pulse"></div>
                <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <Leaf className="h-14 w-14 text-white drop-shadow" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-green-500 animate-pulse" />
                <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  Swachhta & LiFE Zone
                </h1>
                <Sparkles className="h-6 w-6 text-teal-500 animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
              <p className="text-2xl text-gray-600 font-light max-w-3xl mx-auto">
                Empowering Communities Through Sustainable Living
              </p>
            </div>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  onClick={() => navigate(role.path)}
                  className={`group relative overflow-hidden rounded-3xl bg-white/80 border-2 border-transparent hover:border-emerald-300 hover:shadow-xl transition-all duration-500 cursor-pointer ${role.delay}`}
                >
                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative p-8 space-y-6">
                    {/* Icon Section */}
                    <div className="flex justify-between items-start">
                      <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>

                    {/* Title + Description */}
                    <div className="text-left space-y-2">
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed min-h-[3rem]">
                        {role.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Access Dashboard
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-300"></div>
              <Leaf className="h-4 w-4 text-emerald-500" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-300"></div>
            </div>
            <p className="text-sm text-gray-500">
              Building a cleaner, greener future together 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
