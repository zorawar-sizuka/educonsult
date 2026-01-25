'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck, School, Languages, Award, Plus } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'Visa Counselling',
    icon: FileCheck,
    description: 'Expert guidance on visa applications, documentation, and interviews.',
    href: '/services/visa',
    color: '#e5dbf7', 
  },
  {
    id: 2,
    title: 'University Admissions',
    icon: School,
    description: 'Strategic advice on university selection and compelling personal statements.',
    href: '/services/admission',
    color: '#cffeb3', 
  },
  {
    id: 3,
    title: 'Test Preparation',
    icon: Languages,
    description: 'Training for IELTS, TOEFL, and PTE exams with experienced tutors.',
    href: '/services/test-prep',
    color: '#ffc8c8', 
  },
  {
    id: 4,
    title: 'Scholarship Guidance',
    icon: Award,
    description: 'Support in identifying and applying for scholarships and financial aid.',
    href: '/services/scholarships',
    color: '#fedda6', 
  },
];

function ServiceCard({ service }) {
  const IconComponent = service.icon;

  return (
    <Link 
      href={service.href} 
      className="block h-56 md:h-96 group relative overflow-hidden bg-[#F3F4F6] cursor-pointer"
    >
      {/* --- THE CURTAIN (Background Color) --- 
          Mobile: Always visible (translate-y-0)
          Desktop: Hidden (translate-y-full) -> Visible on Hover (translate-y-0)
      */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out 
                   translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0" 
        style={{ backgroundColor: service.color }}
      />

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 h-full p-4 md:p-8 flex flex-col justify-between">
        
        {/* === TOP ROW === */}
        
        {/* 1. TOP LEFT: Overview Badge 
             Position: Absolute top-left (opposite + icon)
             Mobile: Always visible
             Desktop: Hidden (opacity-0) -> Fade in on Hover (opacity-100)
        */}
        <div className="absolute top-3 left-3 md:top-6 md:left-6 transition-all duration-500 ease-out
                        opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
          <span 
            className="inline-block bg-black text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 tracking-widest uppercase"
            style={{ color: service.color }}
          >
            Overview
          </span>
        </div>

        {/* 2. TOP RIGHT: Plus Icon 
             Position: Absolute top-right
        */}
        <div className="absolute top-3 right-3 md:top-6 md:right-6 p-1 md:p-2 rounded-full transition-all duration-500 
                        rotate-90 bg-black/5 lg:rotate-0 lg:bg-transparent lg:group-hover:rotate-90 lg:group-hover:bg-black/5">
          <Plus className="w-4 h-4 md:w-6 md:h-6 text-black/50 lg:text-gray-400 transition-colors duration-300 lg:group-hover:text-black" />
        </div>


        {/* === CENTER AREA === */}
        <div className="flex-grow flex flex-col justify-center items-center relative w-full">
          
          {/* A. The Large Icon (Desktop Only)
              Mobile: Hidden
              Desktop: Visible -> Hidden on Hover
          */}
          <div className="hidden lg:block transition-all duration-500 ease-out transform lg:group-hover:-translate-y-12 lg:group-hover:opacity-0">
             <IconComponent strokeWidth={1} className="w-24 h-24 text-gray-700" />
          </div>

          {/* B. The Description 
              Mobile: Always Visible
              Desktop: Hidden -> Visible on Hover
          */}
          <div className="w-full text-left transition-all duration-500 ease-out 
                          opacity-100 translate-y-0 
                          lg:opacity-0 lg:translate-y-12 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
            <p className="text-xs md:text-base font-medium leading-relaxed text-slate-900 line-clamp-6 md:line-clamp-none">
              {service.description}
            </p>
          </div>

        </div>

        {/* === BOTTOM ROW === */}
        <div className="mt-auto">
           <h3 className="text-sm md:text-xl font-medium text-left md:text-center text-slate-900 transition-colors duration-300 leading-tight">
            {service.title}
          </h3>
        </div>

      </div>
    </Link>
  );
}

export default function ServicesEditorial() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-medium mb-8 md:mb-16 text-left tracking-tight text-slate-900">
          Services We Offer
        </h2>

        {/* Grid: 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200">
          {servicesData.map((service) => (
            <div key={service.id} className="border-b border-r border-gray-200">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}