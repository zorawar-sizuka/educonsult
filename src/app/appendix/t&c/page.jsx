'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import {
  Globe,
  UserCheck,
  CheckCircle2,
  ArrowRightLeft,
  Banknote,
  ShieldCheck,
  Copyright,
  AlertTriangle,
  RefreshCw,
  Gavel, // Uncommented and used
  BookOpen,
  FileWarning
} from 'lucide-react';

// Data updated to match E-Spot International (EEIC) Document
const SECTIONS = [
  {
    icon: <Globe size={20} />,
    title: "1. Scope of Services",
    content: "E-Spot International Education Consultancy provides student counseling, university admission assistance, visa guidance, and test preparation. We act as a facilitator between students and institutions; final decisions are made by the respective authorities."
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "2. Client Responsibilities",
    content: "Clients must provide complete, accurate, and truthful information. You are responsible for submitting genuine documents and meeting all deadlines. EEIC is not liable for rejections caused by false information or incomplete documentation."
  },
  {
    icon: <AlertTriangle size={20} />,
    title: "3. No Guarantee Clause",
    content: "While we provide expert guidance, EEIC does not guarantee admission to any institution, approval of visas, or scholarships. All outcomes depend on individual eligibility and external authorities."
  },
  {
    icon: <Banknote size={20} />,
    title: "4. Fees & Payments",
    content: "Service fees are non-refundable unless stated otherwise in writing. Fees cover consultancy services only and do not include third-party charges (e.g., embassy fees, university application fees)."
  },
  {
    icon: <FileWarning size={20} />,
    title: "5. Limitation of Liability",
    content: "EEIC is not responsible for decisions made by universities/embassies, policy changes by governments, or delays caused by external factors beyond our control."
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "6. Confidentiality",
    content: "All client information is handled confidentially and used strictly for service-related purposes (admissions, visa processing) in accordance with our Privacy Policy."
  },
  {
    icon: <ArrowRightLeft size={20} />,
    title: "7. Termination of Services",
    content: "We reserve the right to refuse or terminate services if false information is provided, required cooperation is not maintained, or these Terms & Conditions are violated."
  },
  {
    icon: <Copyright size={20} />,
    title: "8. Intellectual Property",
    content: "All materials, guides, and resources provided by E-Spot International are protected. Unauthorized reproduction or distribution is prohibited."
  },
  {
    icon: <Gavel size={20} />,
    title: "9. Governing Law",
    content: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of Nepal. Any disputes are subject to the jurisdiction of courts in Nepal."
  },
  {
    icon: <RefreshCw size={20} />,
    title: "10. Updates to Terms",
    content: "E-Spot International reserves the right to update these terms. Continued use of our services implies acceptance of the latest version."
  }
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden mt-12">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <motion.header
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-6">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Please read these terms carefully. By engaging with <span className="font-semibold text-slate-800">E-Spot International (EEIC)</span>, you agree to the rules and policies outlined below.
            </p>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
              <RefreshCw size={14} className="animate-spin-slow" /> 
              Last updated: January 2026
            </span>
          </div>
          
          {/* Illustration IMAGE Container */}
          <div className="hidden md:flex relative items-center justify-center bg-slate-50 w-48 h-48 rounded-full border-4 border-slate-100 shadow-inner overflow-hidden shrink-0">
             <Image 
               src="/logos/tc.png" // Ensure this image exists in public/logos/
               alt="Legal documents illustration"
               fill
               className="object-cover"
             />
          </div>
        </motion.header>

        {/* Content Section */}
        <motion.article
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Decorative Top Bar */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
          
          <div className="p-8 md:p-12 grid gap-10">
            {SECTIONS.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-6 group"
              >
                {/* Icon Column */}
                <div className="flex-shrink-0 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                    {section.icon}
                  </div>
                </div>
                
                {/* Text Column */}
                <div className="pb-8 border-b border-slate-50 last:border-0 last:pb-0 w-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                    {section.content}
                  </p>
                </div>
              </motion.section>
            ))}
          </div>
        </motion.article>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Non-clickable Thank You Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full shadow-lg shadow-slate-900/20 cursor-default">
            <Globe size={18} />
            <span className="font-bold text-sm tracking-wide">Thank you for choosing EEIC</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} E-Spot International. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default TermsOfService;