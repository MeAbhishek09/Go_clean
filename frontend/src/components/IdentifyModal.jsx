import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * IdentifyModal (portal)
 *
 * Props:
 *  - open (bool)
 *  - onClose (fn)
 *  - onSubmit (fn) => receives formData
 *  - initialData (object)
 *
 * Renders into document.body (or #modal-root if present).
 */
export default function IdentifyModal({ open, onClose, onSubmit, initialData = {} }) {
  const [mounted, setMounted] = useState(false);
  const [containerEl, setContainerEl] = useState(null);

  // local form state inside modal
  const [form, setForm] = useState({
    name: initialData.name || "",
    address: initialData.address || "",
    landmark: initialData.landmark || "",
    phone: initialData.phone || "",
  });

  useEffect(() => {
    setForm({
      name: initialData.name || "",
      address: initialData.address || "",
      landmark: initialData.landmark || "",
      phone: initialData.phone || "",
    });
  }, [initialData, open]);

  useEffect(() => {
    // create or reuse a modal root container so portal is outside app layout
    let root = document.getElementById("modal-root");
    if (!root) {
      root = document.createElement("div");
      root.setAttribute("id", "modal-root");
      document.body.appendChild(root);
    }
    setContainerEl(root);
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  // lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !containerEl) return null;
  if (!open) return null;

  const handleChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // optional light validation
    if (!form.name || !form.address || !form.phone) {
      // optionally show inline error / toast
      return;
    }
    onSubmit?.(form);
  };

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* modal content */}
      <div
        className="relative w-full max-w-md max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-3 text-gray-800 text-center">
          🧍 Identify Littering Person
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <input
            type="text"
            placeholder="House No. / Address"
            value={form.address}
            onChange={handleChange("address")}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <input
            type="text"
            placeholder="Nearby Landmark"
            value={form.landmark}
            onChange={handleChange("landmark")}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange("phone")}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg mt-1"
          >
            ✅ Submit Details
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, containerEl);
}
