"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Headphones, BookOpenCheck, ArrowRight, LibraryBig } from "lucide-react";

// --- Data ---
const services = [
  {
    title: "IELTS",
    href: "/services/test-prep/ielts",
    Icon: Headphones,
    description:
      "Prepare for IELTS with a structured plan that covers Listening, Reading, Writing, and Speaking. Get strategy-first learning, timed practice, and targeted feedback so your score improves for real—not just your confidence.",
  },
  {
    title: "PTE",
    href: "/services/test-prep/pte",
    Icon: BookOpenCheck,
    description:
      "Train for PTE with computer-based practice that matches the real exam experience. Build speed, accuracy, and clarity across integrated tasks, while focusing on scoring criteria so you stop guessing and start scoring.",
  },
];

export default function TestPrepServicesPage() {
  return (
    <div className="w-full bg-white pb-32">
      
      {/* -------------------------------------------------------
          1. HERO SECTION
          - Rounded Beige Card
          - Editorial Headline
      ------------------------------------------------------- */}
      <div className="pt-6 px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#white] rounded-[3rem] overflow-hidden min-h-[80vh] flex flex-col items-center pt-24 pb-0"
        >
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 mb-12">
            
            {/* Tag */}
            <span className="px-4 py-1.5 rounded-full bg-[#D2F023] text-xs font-bold uppercase tracking-widest text-slate-900 mb-8 flex items-center justify-between gap-2">
              <LibraryBig className="w-4 h-4 text-slate-900"/> 
              Test Preparation
            </span>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-slate-900 mb-8 font-serif tracking-tight leading-[0.95]">
              Master <br className="hidden md:block"/> the Exam
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed">
              Focused preparation designed to build skill, strategy, and confidence for high-stakes English proficiency exams.
            </p>
          </div>

          {/* Hero Image Container */}
          <div className="relative w-full flex-grow mt-auto flex items-end justify-center">
             <div className="relative w-[90%] h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl shadow-stone-200 mb-8 md:mb-0">
                <Image
                  src="/services/test-prep.avif"
                  alt="Student studying with headphones"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
             </div>
          </div>
        </motion.div>
      </div>

      {/* -------------------------------------------------------
          2. DIVIDER
          - Editorial Divider with centered Plus icon
      ------------------------------------------------------- */}
      <div className="relative px-6 md:px-14 mt-24">
        <div className="h-px w-full bg-slate-200" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3">
          <Plus className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* -------------------------------------------------------
          3. SERVICES LIST
          - Clean, editorial layout
      ------------------------------------------------------- */}
      <section className="px-6 md:px-14 max-w-7xl mx-auto mt-12">
        {services.map((s, idx) => (
          <Link
            key={s.title}
            href={s.href}
            className={[
              "group block",
              "py-16",
              idx !== services.length - 1 ? "border-b border-slate-200" : "",
            ].join(" ")}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
            >
              
              {/* Left: Title */}
              <div className="md:col-span-3">
                <h2 className="text-3xl font-medium font-serif text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {s.title}
                </h2>
                {/* Hover Line Animation */}
                <div className="mt-4 h-[2px] w-12 bg-slate-200 group-hover:w-24 group-hover:bg-blue-600 transition-all duration-300 ease-out" />
              </div>

              {/* Middle: Icon */}
              <div className="md:col-span-3 flex md:justify-center">
                <div className="w-20 h-20 rounded-2xl border border-slate-100 flex items-center justify-center bg-slate-50 group-hover:bg-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <s.Icon strokeWidth={1.5} className="w-8 h-8 text-slate-700 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>

              {/* Right: Description & CTA */}
              <div className="md:col-span-6">
                <p className="text-lg leading-relaxed text-slate-600 font-light">
                  {s.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>Start Preparation</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </motion.div>
          </Link>
        ))}
      </section>

      {/* Bottom breathing space */}
      <div className="h-16 md:h-24" />
    </div>
  );
}