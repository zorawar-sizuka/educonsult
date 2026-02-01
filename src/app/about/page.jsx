"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Plus } from "lucide-react";
import BookButton from "@/components/FormButton/BookButton";

// 1. Team Data
const teamMembers = [ 
  {
    id: 1,
    name: "Sakar Jung Shahi",
    role: "MANAGING DIRECTOR",
    image: "/about/member3.png",
  },
  {
    id: 2,
    name: "Asghar Hussain",
    role: "HEAD OF BUSINESS & OPERATIONS",
    image: "/about/member1.jpg",
  },
  {
    id: 3,
    name: "Richesh Vaidya",
    role: "OPERATIONS DIRECTOR",
    image: "/about/member2.png",
  },
];

// 2. Timeline Data
const timelineData = [
  {
    year: "2016",
    title: "Foundation & Approval",
    description: "Officially founded and approved by the Ministry of Education, Nepal. We began with a focus on career counseling and university admissions, laying a strong foundation built on trust and ethical services.",
    image: "/about/journey1.avif"
  },
  {
    year: "2017",
    title: "Service Expansion",
    description: "Expanded our services to include test preparation (IELTS, PTE, SAT) and visa counseling for major destinations like Australia, Canada, the UK, and the USA, while building international partnerships.",
    image: "/about/journey2.avif"
  },
  {
    year: "2020",
    title: "Nationwide Presence",
    description: "Focused on digital processes and system strengthening despite global challenges. This era marked our expansion into multiple cities across Nepal to improve student accessibility.",
    image: "/about/journey3.avif"
  },
  {
    year: "2022",
    title: "Scale & Recognition",
    description: "Established as a trusted name with a proven track record of success. We grew to 18 offices across Nepal, supported by a professional team of academic counselors and immigration experts.",
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
            src="/about/about.avif"
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
          2. INTRO SECTION - REMOVED STICKY
      ------------------------------------------------------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
          <div className="flex flex-col gap-8"> {/* Removed sticky top-24 */}
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
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-[1.05] tracking-tight font-serif">
              Transforming <br />
              Ambitions into <br />
              Global Success.
            </h2>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          3. JOURNEY / PROCESS SECTION
      ------------------------------------------------------- */}
      <section className="py-24 w-full bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="mb-20 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 font-serif mb-4">
              Our Journey
            </h3>
            <p className="text-slate-500 text-lg font-light">
              A history of strategic growth and student success.
            </p>
          </div>

          <div className="relative">
            {/* The Central Line (Desktop) */}
            <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden lg:block" />

            <div className="flex flex-col gap-24 lg:gap-32">
              {timelineData.map((item, index) => (
                <JourneyStep key={index} item={item} index={index} />
              ))}
            </div>

            {/* JOURNEY CONTINUES SECTION */}
            <div className="relative z-10 pt-24 lg:pt-32 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white px-6 sm:px-8 py-6 flex flex-col items-center text-center"
              >
                {/* Decorative Dot */}
                <div className="w-2 h-2 bg-slate-200 rounded-full mb-6 hidden lg:block" />
                
                <h4 className="text-2xl sm:text-3xl md:text-5xl font-serif text-slate-300 italic tracking-tight">
                  The Journey Continues...
                </h4>
                
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400/70">
                  Building the Future
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          4. LEADERSHIP TEAM
      ------------------------------------------------------- */}
      <div className="py-12 px-4 sm:px-6 bg-[#F6F5F2]">
        <section className="py-12 md:py-20 max-w-7xl mx-auto">
            
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] mb-2 block">
              Expertise
            </span>
            <h3 className="text-3xl md:text-5xl font-medium text-slate-900 font-serif">
              Meet Our Leaders
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col items-center lg:block lg:aspect-[4/5] lg:rounded-2xl lg:overflow-hidden lg:bg-slate-300 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg 
                              lg:shadow-none lg:absolute lg:inset-0 lg:w-full lg:h-full lg:rounded-none">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
                </div>

                {/* Text Content */}
                <div className="mt-4 text-center 
                              lg:mt-0 lg:absolute lg:bottom-0 lg:left-0 lg:w-full lg:p-6 lg:text-left 
                              lg:transform lg:translate-y-2 lg:group-hover:translate-y-0 lg:transition-transform lg:duration-300">
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 lg:text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="text-xs md:text-sm font-medium text-emerald-600 lg:text-white/70 uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section> 
        
        {/* -------------------------------------------------------
            5. CTA
        ------------------------------------------------------- */}
        <section className="py-24 flex justify-center"> 
          <BookButton className="group relative px-6 sm:px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-medium tracking-wide flex items-center gap-2">
              Start Your Application
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </BookButton>
        </section>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Sub-Component: Journey Step
// ------------------------------------------------------------------
function JourneyStep({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });
  const number = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`
        relative flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-24
        ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} 
      `}
    >
      {/* 1. IMAGE SIDE */}
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-black/5 pointer-events-none" />
        </div>
      </div>

      {/* CENTRAL DOT (Desktop Only) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
        <div className="w-4 h-4 bg-[#10b981] rounded-full border-[3px] border-white shadow-sm z-10" />
      </div>

      {/* 2. TEXT SIDE */}
      <div className="w-full lg:w-1/2 pl-0 lg:pl-0">
        <div className="flex flex-col items-start">
          <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#10b981] opacity-90 mb-4 font-serif">
            {number}
          </span>
          <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            {item.title}
          </h4>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            {item.description}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
            <span className="text-sm font-bold text-slate-900">{item.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}