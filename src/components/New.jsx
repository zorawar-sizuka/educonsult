"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data Configuration ---
const services = [
    {
      id: "foresight",
      title: "Academic & Career Alignment",
      description:
        "Establishing a clear academic direction by aligning your background, ambitions, and global opportunities—so every decision is intentional, not reactive.",
      image: "/hover/hover1.jpeg",
    },
    {
      id: "leadership",
      title: "Institution & Course Mapping",
      description:
        "Identifying universities and programs that match your profile, goals, and future outcomes—balancing ambition with realism for strong admission results.",
      image: "/hover/hover2.jpeg",
    },
    {
      id: "culture",
      title: "Application Narrative & Readiness",
      description:
        "Crafting a credible application story through documentation, test preparation, and profile positioning that meets both academic and institutional expectations.",
      image: "/hover/hover3.png",
    },
    {
      id: "facilitation",
      title: "Visa & Global Transition",
      description:
        "Guiding the final stages—from offer acceptance to visa filing and pre-departure planning—ensuring a smooth, compliant move into your new academic environment.",
      image: "/hover/hover4.jpeg",
    },
  ];
  

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <section className="bg-[#EEEEEE] py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">
            How Perspectiva <span className="italic font-light">supports you.</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-500 font-light leading-relaxed">
            Tailored support that brings clarity, strengthens leadership, 
            and unlocks the intelligence of your organisation.
          </p>
        </div>

        {/* --- Interactive Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Navigation List */}
          <div className="flex flex-col gap-6 relative">
            {services.map((service) => {
              const isActive = activeId === service.id;

              return (
                <div 
                  key={service.id}
                  // CHANGE: Hover triggers the state update
                  onMouseEnter={() => setActiveId(service.id)}
                  className="relative cursor-pointer group"
                >
                  {/* The Sliding White Card Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCard"
                      className="absolute inset-0 bg-white rounded-3xl shadow-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Content Container */}
                  <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                    <h3 
                      className={`text-2xl font-serif transition-colors duration-300 ${
                        isActive ? "text-black" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Expandable Description Area */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-6">
                        <p className="text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                        <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                          Book my free call
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Images */}
          <div className="relative aspect-[4/3] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-white">
            <AnimatePresence mode="popLayout">
              {services.map((service) => (
                service.id === activeId && (
                  <motion.img
                    key={service.id}
                    src={service.image}
                    alt={service.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )
              ))}
            </AnimatePresence>
            
            {/* Optional: Texture Overlay */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-multiply" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;