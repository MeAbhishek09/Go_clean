import React, { useMemo, useState } from "react";
import IdentifyModal from "./IdentifyModal";

import img1 from "../assets/img.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.webp";

/**
 * ChallanIdentify: cards only
 * Modal is rendered via portal (IdentifyModal).
 */
export default function ChallanIdentify() {
  const [cases, setCases] = useState([
    {
      id: 1,
      image: img1,
      area: "Main Street",
      timestamp: "2025-11-04 01:45 PM",
      challan: 500,
      identified: false,
      reward: 0,
    },
    {
      id: 2,
      image: img2,
      area: "Station Road",
      timestamp: "2025-11-04 12:20 PM",
      challan: 1000,
      identified: false,
      reward: 0,
    },
    {
      id: 3,
      image: img3,
      area: "Park Avenue",
      timestamp: "2025-11-03 10:10 AM",
      challan: 750,
      identified: true,
      reward: 75,
      details: { name: "Ramesh", address: "Park Ave 12" },
    },
  ]);

  const totalReward = useMemo(
    () => cases.reduce((acc, curr) => acc + (curr.reward || 0), 0),
    [cases]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  const openModal = (caseId) => {
    setSelectedCaseId(caseId);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCaseId(null);
  };

  const handleModalSubmit = (formData) => {
    if (!selectedCaseId) return;
    setCases((prev) =>
      prev.map((item) =>
        item.id === selectedCaseId
          ? {
              ...item,
              identified: true,
              reward: Math.round(item.challan * 0.1),
              details: formData,
            }
          : item
      )
    );
    closeModal();
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🚮 Identify and Win</h1>

      {/* Cards row: md+ three across, mobile scrollable */}
      <div className="w-full">
        <div className="block md:hidden overflow-x-auto -mx-3 pb-3">
          <div className="flex gap-6 px-3">
            {cases.map((c) => (
              <div key={c.id} className="flex-none w-[320px]">
                <article className="p-4 rounded-2xl shadow-lg bg-white border border-gray-200 h-full flex flex-col">
                  <img src={c.image} alt={c.area} className="rounded-xl mb-4 w-full h-40 object-cover" />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{c.area}</h2>
                    <p className="text-sm text-gray-500">🕒 {c.timestamp}</p>
                    <p className="text-sm text-gray-500">💰 Challan: ₹{c.challan}</p>

                    <p className={`mt-2 text-sm font-bold ${c.identified ? "text-green-600" : "text-red-500"}`}>
                      Status: {c.identified ? "Identified" : "Pending"}
                    </p>

                    {c.identified ? (
                      <div className="mt-3 bg-green-50 p-2 rounded-lg">
                        <p className="text-green-700 font-semibold">🎉 Reward Earned: ₹{c.reward}</p>
                        {c.details && <p className="text-sm text-gray-600 mt-1">👤 {c.details.name}, {c.details.address}</p>}
                      </div>
                    ) : (
                      <button onClick={() => openModal(c.id)} className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg">Identify Person</button>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <article key={c.id} className="p-4 rounded-2xl shadow-lg bg-white border border-gray-200 h-full flex flex-col">
              <img src={c.image} alt={c.area} className="rounded-xl mb-4 w-full h-48 object-cover" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{c.area}</h2>
                <p className="text-sm text-gray-500">🕒 {c.timestamp}</p>
                <p className="text-sm text-gray-500">💰 Challan: ₹{c.challan}</p>

                <p className={`mt-2 text-sm font-bold ${c.identified ? "text-green-600" : "text-red-500"}`}>
                  Status: {c.identified ? "Identified" : "Pending"}
                </p>

                {c.identified ? (
                  <div className="mt-3 bg-green-50 p-2 rounded-lg">
                    <p className="text-green-700 font-semibold">🎉 Reward Earned: ₹{c.reward}</p>
                    {c.details && <p className="text-sm text-gray-600 mt-1">👤 {c.details.name}, {c.details.address}</p>}
                  </div>
                ) : (
                  <button onClick={() => openModal(c.id)} className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg">Identify Person</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="text-right mt-4">
        <p className="text-lg font-semibold text-emerald-700">Total Rewards Earned: ₹{totalReward}</p>
      </div>

      <IdentifyModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        initialData={selectedCaseId ? cases.find((c) => c.id === selectedCaseId)?.details || {} : {}}
      />
    </div>
  );
}
