import React, { useState } from "react";

const ChallanIdentify = () => {
  const [cases, setCases] = useState([
    {
      id: 1,
      image: "https://i.ibb.co/0GdYxZ8/litter1.jpg",
      area: "Main Street",
      timestamp: "2025-11-04 01:45 PM",
      challan: 500,
      identified: false,
      reward: 0,
    },
    {
      id: 2,
      image: "https://i.ibb.co/XtwhPbM/litter2.jpg",
      area: "Station Road",
      timestamp: "2025-11-04 12:20 PM",
      challan: 1000,
      identified: false,
      reward: 0,
    },
    {
      id: 3,
      image: "https://i.ibb.co/ZV6nh6B/litter3.jpg",
      area: "Park Avenue",
      timestamp: "2025-11-03 10:10 AM",
      challan: 750,
      identified: true,
      reward: 75,
    },
  ]);

  const [totalReward, setTotalReward] = useState(
    cases.reduce((acc, curr) => acc + curr.reward, 0)
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    landmark: "",
    phone: "",
  });

  const openModal = (id) => {
    setSelectedCase(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: "", address: "", landmark: "", phone: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCases((prev) =>
      prev.map((item) =>
        item.id === selectedCase
          ? {
              ...item,
              identified: true,
              reward: item.challan * 0.1,
              details: formData,
            }
          : item
      )
    );

    const caseData = cases.find((c) => c.id === selectedCase);
    if (caseData && !caseData.identified) {
      setTotalReward((prev) => prev + caseData.challan * 0.1);
    }

    closeModal();
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        🚮 AI Challan Detection System
      </h1>

      {/* Case Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        {cases.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all border border-gray-200"
          >
            <img
              src={c.image}
              alt="Littering"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold text-gray-800">{c.area}</h2>
            <p className="text-sm text-gray-500">🕒 {c.timestamp}</p>
            <p className="text-sm text-gray-500">💰 Challan: ₹{c.challan}</p>
            <p
              className={`mt-2 text-sm font-bold ${
                c.identified ? "text-green-600" : "text-red-500"
              }`}
            >
              Status: {c.identified ? "Identified" : "Pending"}
            </p>

            {c.identified ? (
              <div className="mt-3 bg-green-50 p-2 rounded-lg">
                <p className="text-green-700 font-semibold">
                  🎉 Reward Earned: ₹{c.reward}
                </p>
                {c.details && (
                  <p className="text-sm text-gray-600 mt-1">
                    👤 {c.details.name}, {c.details.address}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => openModal(c.id)}
                className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg"
              >
                Identify Person
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Total Rewards */}
      <div className="text-right mt-4">
        <p className="text-lg font-semibold text-emerald-700">
          Total Rewards Earned: ₹{totalReward}
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fade-in">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
              🧍 Identify Littering Person
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="text"
                placeholder="House No. / Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="text"
                placeholder="Nearby Landmark"
                value={formData.landmark}
                onChange={(e) =>
                  setFormData({ ...formData, landmark: e.target.value })
                }
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg mt-2"
              >
                ✅ Submit Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallanIdentify;
