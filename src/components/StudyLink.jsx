"use client";
import { motion } from "framer-motion";
import { studyLinks } from "@/app/data/studyLinks";
import { ArrowUpRight } from "lucide-react";

export default function StudyLinksSection() {
  // Logo background palette (order matters)
  const logoBgClasses = [
    "bg-emerald-100 group-hover:bg-emerald-600", // green
    "bg-sky-100 group-hover:bg-sky-600",         // blue
    "bg-violet-100 group-hover:bg-violet-600",   // purple
    "bg-amber-100 group-hover:bg-amber-500",     // rusty yellow
  ];

  const logoIconHoverText = [
    "group-hover:text-white",
    "group-hover:text-white",
    "group-hover:text-white",
    "group-hover:text-white",
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-slate-900">Study Links</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studyLinks.map((link, i) => {
            const Icon = link.icon;
            const bgClass = logoBgClasses[i % logoBgClasses.length];

            return (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-slate-200 transition-all overflow-hidden"
              >
                {/* Subtle Gradient Blob on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-3xl -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon container with rotating color system */}
                    <div
                      className={`p-3 rounded-xl transition-colors duration-300 ${bgClass}`}
                    >
                      <Icon className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Shooting Arrow Animation */}
                    <div className="relative overflow-hidden w-5 h-5">
                      <ArrowUpRight className="w-5 h-5 text-slate-300 absolute group-hover:-translate-y-full group-hover:translate-x-full transition-transform duration-300" />
                      <ArrowUpRight className="w-5 h-5 text-slate-900 absolute -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {link.desc}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
