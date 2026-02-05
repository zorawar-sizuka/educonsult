'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const heroImages = [
  {
    id: 1,
    src: "/events/h1.avif",
    title: "Keynotes",
  },
  {
    id: 2,
    src: "/events/h2.avif",
    title: "Connection",
  },
  {
    id: 3,
    src: "/events/h3.avif",
    title: "Workshops",
  },
  {
    id: 4,
    src: "/events/h4.avif",
    title: "Culture",
  },
];

const tags = ["Seminars", "Workshops", "Info Sessions", "Networking", "Counselling"];

export default function EventsHero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-10 md:pb-12 overflow-hidden bg-white ">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">

        {/* Top header row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-10 md:mb-14 lg:mb-20">

          {/* Left: heading */}
          <div className="relative">
            {/* subtle “season live” marker (kept) */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 mb-7"
            >
              <span className="relative flex h-2.5 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-8 bg-indigo-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-900">
                Kathmandu Events
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.8 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-slate-900 leading-[0.92] tracking-tighter"
            >
              Curated <br />
              <span className="italic text-slate-400">Moments.</span>
            </motion.h1>

            {/* Tags row (vertical line style) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {tags.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  {/* vertical line instead of capsule */}
                  <span className="h-5 w-[2px] bg-indigo-200 rounded-full" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-700 uppercase">
                    {t}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: paragraph */}
          <div className="flex flex-col items-start lg:items-end justify-end pb-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-md leading-relaxed lg:text-right"
            >
              Explore upcoming seminars, workshops, and study abroad info sessions in Kathmandu.
              Register your interest and stay in the loop.
            </motion.p>
          </div>
        </div>

        {/* Desktop expanding gallery (same style as your original) */}
        <div className="hidden md:flex gap-4 h-[480px] lg:h-[520px] w-full">
          {heroImages.map((item, i) => (
            <motion.div
              layout
              key={item.id}
              initial={{ flex: 1, opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ flex: 3 }}
              transition={{
                layout: { duration: 0.45, type: "spring", stiffness: 210, damping: 30 },
                opacity: { delay: i * 0.08 },
              }}
              className="relative h-full rounded-[2rem] overflow-hidden cursor-crosshair group shadow-sm hover:shadow-xl transition-shadow"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill 
                priority
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span className="text-white/70 text-xs font-mono uppercase mb-2 block tracking-widest">
                  0{i + 1}
                </span>
                <h3 className="text-white text-3xl font-serif tracking-wide">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal swipe gallery (fast + premium) */}
        {/* <div className="md:hidden mt-10">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {heroImages.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="relative shrink-0 w-[78%] h-[260px] rounded-3xl overflow-hidden bg-slate-100"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-white/70 text-[10px] font-mono uppercase tracking-widest block mb-1">
                    0{i + 1}
                  </span>
                  <h3 className="text-white text-2xl font-serif">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  );
}
