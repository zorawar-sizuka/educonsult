"use client";

import React from "react";
import Image from "next/image";

export default function Vision() {
  return (
    <main className="w-full bg-white text-black">
      
      {/* =========================================
          SECTION 1: HERO (Inspired by Image 1)
      ========================================= */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 lg:px-10 max-w-[1440px] mx-auto">
        
        {/* Text Block */}
        <div className="max-w-4xl">
          <h1 className="text-[56px] sm:text-[72px] lg:text-[90px] leading-[1.0] tracking-tight font-medium mb-8 text-slate-900">
            Vision & Mission
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl leading-relaxed">
            We bridge the gap between local potential and global opportunity. 
            Our vision is to be the most trusted compass for students navigating 
            the complexities of international education.
          </p>
        </div>

        {/* Hero Image - Rounded & Cinematic */}
        <div className="mt-16 relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
           <Image
            src="/vision/vision.jpg" // Replace with your office/team image
            alt="Team collaborating on student success"
            fill
            className="object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
          />
        </div>
      </section>


      {/* =========================================
          SECTION 2: THE MISSION (Inspired by Image 2)
          "Sticky Left, Scrolling Right" Layout
      ========================================= */}
      <section className="py-20 md:py-32 px-6 lg:px-10 max-w-[1440px] mx-auto border-t border-gray-100">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- LEFT COLUMN (Sticky) --- */}
          <div className="relative h-fit">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-[40px] sm:text-[52px] leading-[1.1] font-medium tracking-tight text-slate-900 mb-8">
                A mission built on <br className="hidden lg:block"/>
                <span className="text-slate-400">integrity, clarity, and results.</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-md">
                Education consultancy is not just about paperwork; it's about 
                designing futures. Our mission is engineered to deliver 
                consistent, life-changing outcomes for every student.
              </p>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Scrolling List) --- */}
          <div className="flex flex-col">
            {missionSteps.map((step, index) => (
              <div 
                key={index} 
                className="group border-b border-gray-200 py-12 first:pt-0 last:border-0"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
                  
                  {/* Number */}
                  <span className="text-3xl font-light text-slate-300 group-hover:text-blue-600 transition-colors duration-300">
                    {step.number}
                  </span>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-medium text-slate-900 mb-4 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}

// Data for the Mission Section
const missionSteps = [
  {
    number: "01",
    title: "Empowerment via Education",
    description:
      "We believe education is the ultimate equalizer. Our primary mission is to democratize access to world-class institutions, ensuring merit—not geography—dictates a student's future.",
  },
  {
    number: "02",
    title: "Ethical Transparency",
    description:
      "The industry is often opaque. We exist to provide radical transparency in fees, processes, and university selection, eliminating the 'hidden costs' of studying abroad.",
  },
  {
    number: "03",
    title: "Personalized Strategy",
    description:
      "No two students are alike. We move beyond generic advice to build tailored roadmaps—combining academic profiling with career forecasting to find the perfect fit.",
  },
  {
    number: "04",
    title: "End-to-End Stewardship",
    description:
      "Our responsibility doesn't end at the visa stamp. From pre-departure briefing to post-arrival accommodation support, we remain a partner in our students' global journey.",
  },
];