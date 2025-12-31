import React from "react";
import { Users, MapPin, CheckCircle, Clock } from "lucide-react";

const workers = [
  {
    id: 1,
    name: "Ramesh Kumar",
    area: "Main Street",
    status: "On Duty",
    tasksCompleted: 18,
  },
  {
    id: 2,
    name: "Suresh Das",
    area: "Market Road",
    status: "Available",
    tasksCompleted: 24,
  },
  {
    id: 3,
    name: "Amit Singh",
    area: "Park Avenue",
    status: "Busy",
    tasksCompleted: 12,
  },
];

export default function WorkersSection() {
  return (
    <div className="bg-white/80 rounded-2xl shadow-soft p-6 border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-eco flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Workers Management
            </h2>
            <p className="text-sm text-gray-500">
              Zone-wise worker activity overview
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
          Live Tracking Coming Soon
        </span>
      </div>

      {/* Workers Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="px-4 py-3 text-left rounded-l-lg">Worker</th>
              <th className="px-4 py-3 text-left">Assigned Area</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left rounded-r-lg">
                Tasks Completed
              </th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr
                key={worker.id}
                className="border-b last:border-none hover:bg-emerald-50 transition"
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {worker.name}
                </td>

                <td className="px-4 py-3 flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  {worker.area}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        worker.status === "On Duty"
                          ? "bg-blue-100 text-blue-700"
                          : worker.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {worker.status === "On Duty" && (
                      <Clock className="h-3 w-3" />
                    )}
                    {worker.status === "Available" && (
                      <CheckCircle className="h-3 w-3" />
                    )}
                    {worker.status === "Busy" && (
                      <Clock className="h-3 w-3" />
                    )}
                    {worker.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {worker.tasksCompleted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-sm text-gray-500">
        🚧 Upcoming features: Live GPS tracking, task assignment, attendance via
        geofencing, and performance analytics.
      </div>
    </div>
  );
}
