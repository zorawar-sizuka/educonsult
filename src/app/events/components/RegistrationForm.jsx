'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, CheckCircle } from "lucide-react";

export default function RegistrationForm({ eventName, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", visitors: 1 });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventName }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(onClose, 1500);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl z-20"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
          <X />
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">You're on the list!</h3>
            <p className="text-slate-500 mt-2">See you at {eventName}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h3 className="text-2xl font-bold font-serif text-slate-900">Register Interest</h3>
              <p className="text-sm text-slate-500 mt-1">
                For <span className="font-semibold text-indigo-600">{eventName}</span>
              </p>
            </div>

            <input
              required
              placeholder="Full Name"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div>
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">
                Number of Visitors
              </label>
              <input
                required
                type="number"
                min="1"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all mt-1"
                value={formData.visitors}
                onChange={(e) => setFormData({ ...formData, visitors: Number(e.target.value) })}
              />
            </div>

            <button
              disabled={status === "loading"}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/25 flex justify-center items-center gap-2"
            >
              {status === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Registration"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
