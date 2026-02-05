'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

const itemVariants = {
  hidden: { y: 18, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
};

export default function EventCard({ event, onClick }) {
  const dateObj = formatDate(event.date);

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClick}
      className="group cursor-pointer flex flex-col gap-5"
    >
      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] group-hover:-translate-y-2">
        <Image
          src={event.imageUrl || "/events/event.png"}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl flex flex-col items-center min-w-[70px] shadow-sm">
          <span className="text-xl font-serif font-bold text-slate-900 leading-none">{dateObj.day}</span>
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{dateObj.month}</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white p-4 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300 text-indigo-600">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase border border-indigo-100 bg-indigo-50 px-2 py-1 rounded-md">
            {event.category || "General"}
          </span>
          <span className="h-px flex-1 bg-slate-100" />
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {event.time}
          </span>
        </div>

        <h3 className="text-3xl font-serif text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-slate-500 mt-3 line-clamp-2 font-light text-base leading-relaxed">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}
