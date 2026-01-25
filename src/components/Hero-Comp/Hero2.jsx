"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";


import studentAnimation from "../../../public/lottie/education.json"; 
import Notifier from "./Notifier";


// --- FLOATING CARDS DATA ---
const SERVICES = [
  { 
    id: 1, 
    label: "IELTS Practice", 
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    position: "top-20 -left-12 lg:-left-24" // Adjust position classes here
  },
  { 
    id: 2, 
    label: "Student Counseling", 
    icon: (
      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    position: "top-10 -right-4 lg:-right-16"
  },
  { 
    id: 3, 
    label: "Test Preparation", 
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    position: "bottom-32 -right-8 lg:-right-20"
  },
  { 
    id: 4, 
    label: "Abroad Studies", 
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    position: "bottom-10 left-4 lg:left-0"
  },
];

// Animation for the cards to bob up and down gently
const floatVariant = (delay) => ({
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  },
});

export default function Hero2() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden flex items-center py-12 lg:py-0">
      
      <div className="container mx-auto px-6 lg:px-16 h-full"> 

      <Notifier  content="Who are we ?" />
   
    
  

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 h-full">
          
          {/* --- LEFT COLUMN: Dynamic Text --- */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10 text-left">
            
            <h1 className="text-5xl lg:text-7xl font-sans font-bold leading-tight text-[#0A2558] mb-6">
              ROSS Global: <br />
              <span className="text-black">What's </span>
              <span className="text-[#E63946]">Next?</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mb-8">
              ROSS looks ahead with an expanded vision to be the student's lifelong launch pad 
              for realizing their highest potential—whether through education abroad, skilled careers, or migration.
            </p>

            <Link href="/services" className="group inline-flex items-center gap-2 font-bold text-[#0A2558] text-sm tracking-wider uppercase hover:text-blue-700 transition-colors">
              Learn More
              <span className="bg-[#E63946] text-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
              </span>
            </Link>
          </div>

          {/* --- RIGHT COLUMN: Graphic & Lottie --- */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            
            {/* 1. Main Container Box */}
            <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
              
              {/* 2. The Blue Circle Background */}
              <div className="absolute inset-0 m-auto w-[90%] h-[90%] bg-[#0056B3] rounded-full z-0 overflow-hidden">
                 {/* Optional: Subtle decorative rings inside the circle (from your reference) */}
                 <div className="absolute inset-0 border-[40px] border-white/5 rounded-full scale-110" />
                 <div className="absolute inset-0 border-[80px] border-white/5 rounded-full scale-125" />
              </div>
              
              {/* 3. Outer Decorative Ring (Thin Blue Line) */}
              <div className="absolute inset-0 w-full h-full border border-blue-200 rounded-full scale-110 -z-10" />

              {/* 4. THE LOTTIE ANIMATION
                 - This sits on top of the blue circle.
                 - If studentAnimation is null, it shows a placeholder.
              */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                 {studentAnimation ? (
                   <Lottie animationData={studentAnimation} loop={true} className="w-[110%] h-[110%] object-contain mt-[-10%]" />
                 ) : (
                   /* Placeholder Image if no Lottie yet */
                   <img 
                     src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" 
                     alt="Student Placeholder" 
                     className="w-[90%] h-[90%] object-cover rounded-full border-4 border-white/20"
                   />
                 )}
              </div>

              {/* 5. FLOATING CARDS 
                 - These are absolutely positioned relative to the main container
              */}
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={floatVariant(index * 0.5)} // Staggered delays
                  initial="animate"
                  animate="animate"
                  className={`absolute ${service.position} z-20 bg-white/90 backdrop-blur-sm p-3 pr-6 rounded-xl shadow-lg border border-white/50 flex items-center gap-3 min-w-[180px] max-w-[220px]`}
                >
                  <div className="bg-blue-50 p-2 rounded-lg">
                    {service.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-800 leading-tight">
                    {service.label}
                  </span>
                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}