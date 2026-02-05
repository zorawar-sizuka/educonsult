'use client';
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";

const MONTHS = [
  "All Months", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function FilterBar({
  selectedMonth,
  setSelectedMonth,
  count,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="sticky my-6 z-40 px-6 lg:px-8 max-w-[1440px] mx-auto pointer-events-none">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full p-2.5 flex justify-between items-center pointer-events-auto max-w-5xl mx-auto">
        <div className="px-6 py-2 hidden md:block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {count} Events
          </span>
        </div>

        <div className="relative w-full md:w-auto">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-between w-full md:w-64 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-900 font-medium group"
          >
            <span className="flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4 text-indigo-500 group-hover:text-indigo-700" />
              {selectedMonth}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                className="absolute right-0 top-[110%] w-full md:w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 overflow-hidden max-h-[380px] overflow-y-auto z-50"
              >
                {MONTHS.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      selectedMonth === month ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


