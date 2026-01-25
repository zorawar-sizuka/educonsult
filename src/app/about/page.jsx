"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

// 1. Team Data
const teamMembers = [
  {
    id: 1,
    name: "Eleanor Pera",
    role: "Founder & Lead Strategist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2776&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Head of Admissions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Sarah Jensen",
    role: "Senior Visa Consultant",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Adam Levine",
    role: "Marketing Executive",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop",
  },
];

// 2. Timeline Data (Enhanced for the "Journey" look)
const timelineData = [
  {
    year: "2008",
    title: "Discovery & Assessment", // Renamed to match the "Process" vibe of the screenshot
    description: "Founded with a singular vision to transform how students approach international education. Our first office opened with just three dedicated counselors.",
    image: "/about/journey1.avif"
  },
  {
    year: "2014",
    title: "Strategy Design",
    description: "We expanded our services to cover 15+ countries, crafting actionable strategies aligned with student visions and building long-term university partnerships.",
    image: "/about/journey2.avif"
  },
  {
    year: "2019",
    title: "Digital Expansion",
    description: "Launched our proprietary student portal. This stage set the foundation for a tailored, remote-first approach well before the world shifted online.",
    image: "/about/journey3.avif"
  },
  {
    year: "2024",
    title: "Global Leadership",
    description: "Recognized as the top educational consultancy firm, helping over 10,000 students secure scholarships. Our focus remains on clarity, prioritization, and results.",
    image: "/about/journey4.avif"
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* -------------------------------------------------------
          1. HERO SECTION
      ------------------------------------------------------- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/about/about.avif" // Ensure this path is valid in your project
            alt="Office lobby"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-medium tracking-tight text-white font-serif"
          >
            About
          </motion.h1>
        </div>
      </div>

      {/* -------------------------------------------------------
          2. INTRO SECTION
      ------------------------------------------------------- */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
          <div className="flex flex-col gap-8 sticky top-24">
             <div className="inline-flex items-center gap-2 bg-[#D2F023] px-3 py-1.5 self-start">
                <Plus className="w-3 h-3 text-black" />
                <span className="text-xs font-bold uppercase tracking-widest text-black">
                  Our Mission
                </span>
             </div>
             <div className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-md">
               <p className="mb-6">
                 We deliver comprehensive educational strategies to ambitious students, driving a more accessible future for global learning.
               </p>
             </div>
          </div>
          <div className="lg:justify-self-end">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-[1.05] tracking-tight font-serif">
              Transforming <br />
              Ambitions into <br />
              Global Success.
            </h2>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          3. JOURNEY / PROCESS SECTION
          Inspired by Screenshot 2026-01-22 at 21.42.01.png
          - Layout: Image Left | Line Center | Content Right
          - Green Numbers (01, 02)
      ------------------------------------------------------- */}
      <section className="py-24 w-full bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-20 max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-medium text-slate-900 font-serif mb-4">
              Our Journey
            </h3>
            <p className="text-slate-500 text-lg font-light">
              A history of strategic growth and student success.
            </p>
          </div>

          <div className="relative">
            {/* The Central Line (Hidden on mobile, visible on LG) */}
            <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden lg:block" />

            <div className="flex flex-col gap-24 lg:gap-32">
              {timelineData.map((item, index) => (
                <JourneyStep key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          4. LEADERSHIP TEAM
          Inspired by Screenshot 2026-01-22 at 21.50.12.png
          - Square/Portrait aspect ratio
          - Text overlay at bottom
          - Gradient fade
      ------------------------------------------------------- */}
      <div className="py-12 px-4 md:px-6 bg-[#F6F5F2]">
        <section className="py-20 max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] mb-2 block">
                Expertise
              </span>
              <h3 className="text-4xl md:text-5xl font-medium text-slate-900 font-serif">
                Meet Our Leaders
              </h3>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-300 cursor-pointer"
                >
                  {/* Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay (Dark at bottom) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />

                  {/* Text Content (Positioned Absolute Bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h4>
                    <p className="text-sm font-medium text-white/70 uppercase tracking-wide">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
        </section>
      </div>

    </div>
  );
}

// ------------------------------------------------------------------
// Sub-Component: Journey Step
// Matches visual style of
// ------------------------------------------------------------------
function JourneyStep({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  // Number formatting (01, 02, etc.)
  const number = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`
        relative flex flex-col lg:flex-row items-center gap-12 lg:gap-24
        ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} 
      `}
    >
      {/* 1. IMAGE SIDE */}
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
           {/* Subtle highlight border */}
           <div className="absolute inset-0 rounded-2xl border border-black/5 pointer-events-none" />
        </div>
      </div>

      {/* CENTRAL DOT (Desktop Only) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
         <div className="w-4 h-4 bg-[#10b981] rounded-full border-[3px] border-white shadow-sm z-10" />
      </div>

      {/* 2. TEXT SIDE */}
      <div className="w-full lg:w-1/2 pl-4 lg:pl-0">
         <div className="flex flex-col items-start">
            {/* The Number (Green, Large) */}
            <span className="text-6xl md:text-7xl font-bold text-[#10b981] opacity-90 mb-4 font-serif">
              {number}
            </span>
            
            {/* Title */}
            <h4 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
              {item.title}
            </h4>
            
            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Year Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
              <span className="text-sm font-bold text-slate-900">{item.year}</span>
            </div>
         </div>
      </div>

    </motion.div>
  );
}