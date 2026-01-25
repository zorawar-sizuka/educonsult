'use client';

import React from 'react';
import Image from 'next/image'; // Need import
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
  // Gavel, // Removed Gavel import
  RefreshCw,
  Gavel
} from 'lucide-react';

// Data defined outside component
const SECTIONS = [
  {
    icon: <Globe size={20} />,
    title: "1. Services Offered",
    content: "Study In Global provides international education consultancy services including student counseling, university application assistance, visa guidance, pre-departure briefings, and test prep recommendations. Services may vary by region (UK, Nepal, Australia, Canada, India)."
  },
  {
    icon: <UserCheck size={20} />,
    title: "2. Eligibility",
    content: "You must be at least 18 years old or have guardian consent to use our services. All provided information must be accurate and lawful within your jurisdiction."
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "3. User Responsibilities",
    content: "Users must not misuse the platform, provide misleading information, or violate any laws. You are responsible for the data you submit and decisions made based on our guidance."
  },
  {
    icon: <ArrowRightLeft size={20} />,
    title: "4. Consultation and Advice",
    content: "Study In Global offers guidance based on experience, but does not guarantee admissions, scholarships, or visa outcomes. Final decisions rest with universities and authorities."
  },
  {
    icon: <Banknote size={20} />,
    title: "5. Payments and Refunds",
    content: "Some services involve fees. These are outlined clearly. Refunds are governed by service agreements; generally, consultation fees are non-refundable after service starts."
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "6. Privacy",
    content: "Personal data is collected and handled per our Privacy Policy. This may include sensitive information like academic records or identification documents."
  },
  {
    icon: <Copyright size={20} />,
    title: "7. Intellectual Property",
    content: "All materials provided by Study In Global are protected by intellectual property laws. Do not reproduce or reuse content without permission."
  },
  {
    icon: <AlertTriangle size={20} />,
    title: "8. Limitation of Liability",
    content: "We are not liable for visa denials, university decisions, or legal changes. Services are provided as-is, with no guarantees or warranties."
  },
  {
    icon: <Gavel size={20} />, // Kept this one as it's inside the data array, not the header image
    title: "9. Termination",
    content: "We may suspend or terminate access for violations of these terms or applicable law without notice."
  },
  {
    icon: <Globe size={20} />,
    title: "10. Jurisdiction and Governing Law",
    content: "These terms are governed by the laws of the country where the services are rendered (UK, Nepal, Australia, Canada, or India)."
  },
  {
    icon: <RefreshCw size={20} />,
    title: "11. Changes to the Terms",
    content: "These Terms may be updated. Continued use of our services implies your acceptance of updates. The date below indicates the last update."
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
              <Globe size={24} className="text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Please read these terms carefully before using our services. By using Study In Global, you agree to the rules outlined below.
            </p>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
              <RefreshCw size={14} className="animate-spin-slow" /> 
              Last updated: {new Date().toLocaleDateString('en-GB')}
            </span>
          </div>
          
          {/* Illustration IMAGE Container */}
          {/* Added 'relative' and 'overflow-hidden' for the image fill to work */}
          <div className="hidden md:flex relative items-center justify-center bg-slate-50 w-48 h-48 rounded-full border-4 border-slate-100 shadow-inner overflow-hidden shrink-0">
             <Image 
               src="/logos/tc.png" // REPLACE WITH YOUR IMAGE PATH eg: "/images/terms.png"
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
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full shadow-lg shadow-slate-900/20 hover:scale-105 transition-transform cursor-default">
            <Globe size={18} />
            <span className="font-bold text-sm tracking-wide">Thank you for choosing Study In Global</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Study In Global. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default TermsOfService;