'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck, School, Languages, Award, Plus } from 'lucide-react';

// Data Configuration with Specific Colors
const servicesData = [
  {
    id: 1,
    title: 'Visa Counselling',
    icon: FileCheck,
    description: 'Expert guidance on visa applications, documentation, and interviews.', // Shortened slightly for mobile fit
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
      // Changed h-96 to h-64 on mobile, h-96 on md+ to prevent skinny long cards on phone
      className="block h-64 md:h-96 group relative overflow-hidden bg-[#F3F4F6] cursor-pointer"
    >
      {/* THE CURTAIN */}
      <div 
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0" 
        style={{ backgroundColor: service.color }}
      />

      {/* CONTENT LAYER */}
      {/* Reduced padding from p-8 to p-4 on mobile */}
      <div className="relative z-10 h-full p-4 md:p-8 flex flex-col justify-between">
        
        {/* Top Right '+' Icon */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 p-1 md:p-2 rounded-full transition-all duration-500 group-hover:rotate-90 group-hover:bg-black/5">
          <Plus className="w-4 h-4 md:w-6 md:h-6 text-gray-400 transition-colors duration-300 group-hover:text-black" />
        </div>

        {/* Center Area */}
        <div className="flex-grow flex flex-col justify-center items-center relative">
          
          {/* 1. The Icon */}
          <div className="absolute transition-all duration-500 ease-out transform group-hover:-translate-y-8 md:group-hover:-translate-y-12 group-hover:opacity-0">
             {/* Reduced Icon size for mobile (w-12) vs desktop (w-24) */}
             <IconComponent strokeWidth={1} className="w-12 h-12 md:w-24 md:h-24 text-gray-700" />
          </div>

          {/* 2. The Description */}
          <div className="absolute opacity-0 translate-y-8 md:translate-y-12 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 w-full text-left">
            <span 
              className="inline-block bg-black text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 mb-2 md:mb-4 tracking-widest uppercase"
              style={{ color: service.color }}
            >
              Overview
            </span>
            {/* Smaller text for description on mobile */}
            <p className="text-xs md:text-base font-medium leading-relaxed text-black max-w-xs line-clamp-4 md:line-clamp-none">
              {service.description}
            </p>
          </div>

        </div>

        {/* Bottom Title */}
        <div className="mt-auto">
           {/* Smaller Title text on mobile */}
           <h3 className="text-sm md:text-xl font-medium text-center text-gray-900 transition-colors duration-300 group-hover:text-black leading-tight">
            {service.title}
          </h3>
        </div>

      </div>
    </Link>
  );
}

export default function ServicesEditorial() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-medium mb-8 md:mb-16 text-left tracking-tight text-slate-900">
          Services We Offer
        </h2>

        {/* Grid Layout Changes:
            - grid-cols-2 (Mobile: 2 per row)
            - lg:grid-cols-4 (Desktop: 4 per row)
        */}
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