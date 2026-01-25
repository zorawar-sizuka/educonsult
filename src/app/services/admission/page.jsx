

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarClock, CheckCircle, FileSignature, GraduationCap, MailCheck, School, Speech } from "lucide-react";
import BookButton from "@/components/FormButton/BookButton";

// Data specific to Admission Counselling (The Execution Phase)
const admissionData = [
  {
    id: 1,
    title: "Application Strategy",
    icon: CalendarClock,
    description: "Timing is everything. We design a timeline for Early Decision, Early Action, or Regular Decision rounds to maximize your acceptance probability based on university quotas.",
  },
  {
    id: 2,
    title: "Documentation Review",
    icon: FileSignature,
    description: "From transcripts to Letters of Recommendation (LORs), we ensure every document is formatted correctly, authenticated, and meets the specific standards of each institution.",
  },
  {
    id: 3,
    title: "University Liaison",
    icon: School,
    description: "We act as the bridge between you and the university. Our team handles all correspondence regarding application status updates, missing documents, or interview requests.",
  },
  {
    id: 4,
    title: "Offer Letter Management",
    icon: MailCheck,
    description: "Received a Conditional Offer? We guide you through the specific steps required—be it submitting final grades or paying a deposit—to convert it into an Unconditional Offer.",
  },
  {
    id: 5,
    title: "Acceptance & Enrollment",
    icon: CheckCircle,
    description: "Once accepted, we assist with the formal enrollment process, fee transfers, and securing your CAS (Confirmation of Acceptance for Studies) or I-20 forms.",
  },
];

export default function AdmissionCounselling() {
  return (
    <div className="w-full bg-white pb-32">
      
      {/* -------------------------------------------------------
          1. HERO SECTION
          - Consistent "Rounded Beige Card"
          - Focus on Success/University Destination
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
              <GraduationCap className="w-4 h-4 text-slate-900"/> 
              Services
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-slate-900 mb-6 font-serif tracking-tight">
              Admission Counselling
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed">
              We manage the intricate details of your application process, ensuring your profile stands out in the admissions office.
            </p>
          </div>

          {/* Hero Image - Prestigious University Building Vibe */}
          <div className="relative w-full flex-grow mt-auto">
             <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[65vh] w-[90%] mx-auto rounded-t-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/services/admission.avif"
                  alt="University campus building"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             </div>
          </div>

        </motion.div>
      </div>

      {/* -------------------------------------------------------
          2. CONTENT LIST
      ------------------------------------------------------- */}
      <section className="mt-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
           <h2 className="text-3xl font-medium tracking-tight text-slate-900">
             Securing Your Seat
           </h2>
        </div>

        <div className="border-t border-slate-200">
          {admissionData.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group py-16 border-b border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-start hover:bg-slate-50 transition-colors duration-500 px-4 -mx-4 rounded-xl"
            >
              
              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Icon */}
              <div className="md:col-span-2 flex justify-start md:justify-center">
                <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                   <service.icon strokeWidth={1} className="w-8 h-8 text-slate-700" />
                </div>
              </div>

              {/* Description */}
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
          3. CTA
      ------------------------------------------------------- */}
      <section className="py-24 flex justify-center"> 

        <BookButton className="group relative px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 font-medium tracking-wide flex items-center gap-2">
            Start Your Application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </BookButton>
      </section>

    </div>
  );
}