'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

// --- DATASET ---
import faqData from '../../data/faqs'
import Link from 'next/link';

export default function FAQPage() {
  // State to track which accordion is open (null = all closed)
  const [activeIndex, setActiveIndex] = useState(null);
  
  // State for Lottie JSON (fetched on client to avoid hydration errors)
  const [animationData, setAnimationData] = useState(null);

  // Fetch Lottie JSON on mount
  React.useEffect(() => {
    fetch("/lottie/faqs.json") // Placeholder Question Mark Animation
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mt-16">Support Center</h2>
          <h1 className="text-3xl md:text-5xl font-serif text-slate-900">Frequently Asked Questions</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about your study abroad journey. Can’t find the answer you’re looking for? Chat with our team.
          </p>
        </div>

        {/* Split Layout Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COMPARTMENT: Lottie Animation */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-white rounded-3xl p-12 shadow-sm border border-slate-100 min-h-[500px] sticky top-24">
            <div className="w-full max-w-md">
              {animationData ? (
                <Lottie animationData={animationData} loop={true} />
              ) : (
                // Fallback if Lottie fails to load
                <div className="flex flex-col items-center text-slate-300">
                   <HelpCircle size={100} strokeWidth={1} />
                   <p className="mt-4 text-sm">Loading Animation...</p>
                </div>
              )}
            </div>
            <div className="mt-8 text-center">
              <h3 className="font-bold text-slate-900 text-lg">Still have questions?</h3>
              <p className="text-slate-500 text-sm mt-2 mb-6">We're here to help you every step of the way.</p> 
              <Link href="/contact">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/10">
                Contact Support
              </button> 
              </Link>
            </div>
          </div>

          {/* RIGHT COMPARTMENT: FAQ List */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  activeIndex === index 
                    ? 'border-blue-200 shadow-lg shadow-blue-50/50' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Question Header (Clickable) */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg ${activeIndex === index ? 'text-blue-600' : 'text-slate-800'}`}>
                    {item.question}
                  </span>
                  <span className={`p-2 rounded-full transition-colors ${activeIndex === index ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                {/* Answer Content (Collapsible) */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}