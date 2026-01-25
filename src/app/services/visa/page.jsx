"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileCheck, Landmark, MessageSquare, Plane, PlaneTakeoff, Speech, Stamp } from "lucide-react";
import BookButton from "@/components/FormButton/BookButton";

// Data matching the "List View" content structure
const servicesData = [
  {
    id: 1,
    title: "Application Filing",
    icon: FileCheck,
    description: "We meticulously review and submit your visa application, ensuring zero errors. Our team stays updated on the latest embassy protocols to maximize your approval chances.",
  },
  {
    id: 2,
    title: "Financial Documentation",
    icon: Landmark,
    description: "Proof of funds is the #1 reason for rejections. We help you structure your financial statements, sponsorships, and loan letters to meet specific country requirements.",
  },
  {
    id: 3,
    title: "Interview Coaching",
    icon: MessageSquare,
    description: "One-on-one mock interview sessions designed to build your confidence. We simulate real embassy scenarios and help you articulate your study plans clearly.",
  },
  {
    id: 4,
    title: "Biometrics & Slot Booking",
    icon: Stamp,
    description: "We handle the logistical nightmare of finding slots. Our team monitors appointment availability 24/7 to secure the earliest possible date for your biometrics.",
  },
  {
    id: 5,
    title: "Post-Arrival Support",
    icon: Plane,
    description: "Our support doesn't end at the border. We assist with BRP collection, local police registration, and understanding your work rights as an international student.",
  },
];

export default function VisaAssistance() {
  return (
    <div className="w-full bg-white pb-32">
      
      {/* -------------------------------------------------------
          1. HERO SECTION (Inspired by Screenshot 16.47.35)
          - Rounded Beige Card
          - Centered Text
          - Image included inside the card
      ------------------------------------------------------- */}
      <div className="pt-6 px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[white] rounded-[3rem] overflow-hidden min-h-[85vh] flex flex-col items-center pt-24 pb-0"
        >
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 mb-16">
            
               {/* Tag */}
        <span className="px-4 py-1.5 rounded-full bg-[#D2F023] text-xs font-bold uppercase tracking-widest text-slate-900 mb-8 flex items-center justify-between gap-2">
              <PlaneTakeoff className="w-4 h-4 text-slate-900"/> 
              Services
            </span>

            {/* Headline (Serif) */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-slate-900 mb-6 font-serif tracking-tight">
              Visa Assistance
            </h1>

            {/* Subhead (Sans) */}
            <p className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed">
              Navigating the complexities of international borders with precision, strategy, and a 99% success rate.
            </p>
          </div>

          {/* Hero Image (Inside the card) */}
          <div className="relative w-full flex-grow mt-auto">
             <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[65vh] w-[90%] mx-auto rounded-t-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/services/visa.avif"
                  alt="Airplane wing view"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle gradient to blend bottom if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             </div>
          </div>

        </motion.div>
      </div>

      {/* -------------------------------------------------------
          2. CONTENT LIST (Inspired by Screenshot 16.48.02)
          - List Layout
          - Clean Sans-Serif Fonts (Tight tracking)
          - Icon in middle
      ------------------------------------------------------- */}
      <section className="mt-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
           <h2 className="text-3xl font-medium tracking-tight text-slate-900">
             Comprehensive Visa Solutions
           </h2>
        </div>

        <div className="border-t border-slate-200">
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group py-16 border-b border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-start hover:bg-slate-50 transition-colors duration-500 px-4 -mx-4 rounded-xl"
            >
              
              {/* Col 1: Title (Matches the "Data Centers" font style) */}
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Col 2: Icon (Centered, thin line style) */}
              <div className="md:col-span-2 flex justify-start md:justify-center">
                <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                   <service.icon strokeWidth={1} className="w-8 h-8 text-slate-700" />
                </div>
              </div>

              {/* Col 3: Description */}
              <div className="md:col-span-6">
                <p className="text-slate-600 leading-relaxed text-lg font-light">
                  {service.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------
          3. CTA / NEXT STEPS
      ------------------------------------------------------- */}
      <section className="py-24 flex justify-center">
        <BookButton className="group relative px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 font-medium tracking-wide flex items-center gap-2">
            Start Your Visa Application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </BookButton>
      </section>

    </div>
  );
}