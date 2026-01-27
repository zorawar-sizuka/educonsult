'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, X, ArrowUpRight, Calendar, Clock, ArrowRightCircle } from 'lucide-react';
import { resourcesData } from '@/app/data/resourceData'; 
import StudyLinksSection from '@/components/StudyLink';
import Link from 'next/link';
const getTagColor = (tag) => {
    const t = tag.toLowerCase();
    if (t.includes('anxiety') || t.includes('exam')) return 'bg-[#FEF3C7] text-[#92400E]'; // Yellow
    if (t.includes('healing') || t.includes('budget')) return 'bg-[#D1FAE5] text-[#065F46]'; // Green
    if (t.includes('mental') || t.includes('english')) return 'bg-[#DBEAFE] text-[#1E40AF]'; // Blue
    return 'bg-slate-100 text-slate-600'; // Default Gray
  };

export default function ResourcesPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image 
          src={resourcesData.hero.image} 
          alt="Resources Hero" 
          fill 
          className="object-cover brightness-[0.6]"  
          sizes="100vw"
          priority 
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif mb-4"
          >
            Student Resources
          </motion.h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto font-light">
            {resourcesData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. DOWNLOAD GUIDES (Fixed Card Structure) */}
          {/* 2. DOWNLOAD GUIDES (Inspired List Layout) */}
          <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-slate-900">Downloadable Guides</h2>
        </div>

        <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200 overflow-hidden bg-white">
          {resourcesData.guides.map((guide, i) => {
            const Icon = guide.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-6 md:px-10 py-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                  {/* LEFT: Small meta (like date column vibe, but using index to avoid changing data) */}
                  <div className="w-full lg:w-[90px] flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-1">
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                      Guide
                    </span>
                    <span className="text-3xl md:text-4xl font-serif text-slate-900 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* CENTER: Title + description + “by” line */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      {/* Small icon bubble (keeps your original icon styling) */}
                      <div className={`shrink-0 w-12 h-12 rounded-full ${guide.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${guide.iconColor}`} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
                          {guide.title}
                        </h3>

                        {/* If you already have author fields in your data later, drop them in here.
                            For now, we’re keeping it “content from current code” = title + desc. */}
                        <p className="mt-3 text-slate-500 leading-relaxed text-sm md:text-base">
                          {guide.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: “Image” replacement (lucide logo panel) + Download tab */}
                  <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-row items-stretch gap-4 lg:gap-5">
                    {/* Lucide “image” panel */}
                    <div className="flex-1 sm:flex-none sm:w-[220px] h-[110px] rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-slate-700" />
                    </div>

                    {/* Download tab (arrow area in the inspiration) */}
                    <a
                      href={guide.downloadUrl}
                      download
                      className="group sm:w-[170px] lg:w-[170px] h-[56px] sm:h-[110px] rounded-3xl bg-slate-900 text-white flex items-center justify-center gap-3 font-bold shadow-sm hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-sm">Download</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section> 



     {/* 2.5 STUDY LINKS */}
     <StudyLinksSection />



     {/* 3. BLOGS SECTION (Redesigned: Editorial Look) */}
       <section className="bg-white py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-slate-900 mb-12">Latest Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {resourcesData.blogs.map((blog, i) => (
              <motion.div 
                key={blog.id}
                layoutId={`blog-card-${blog.id}`}
                onClick={() => setSelectedBlog(blog)}
                className="group cursor-pointer block"
              > 
              <Link
  href={`/resources/${blog.id}`}
  onClick={(e) => e.stopPropagation()}
  className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-slate-700 hover:text-blue-700"
>
  Read full article <ArrowRight className="w-4 h-4" />
</Link>

                {/* 1. The Image (Clean, separate from text) */}
                <div className="relative h-72 w-full overflow-hidden rounded-2xl mb-6 bg-slate-100">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill  
                     sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>

                {/* 2. The Tags (Below image, pastel pills) */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {blog.tags.map((tag, t) => (
                     <span 
                       key={t} 
                       className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${getTagColor(tag)}`}
                     >
                       {tag}
                     </span>
                  ))}
                </div>

                {/* 3. Title & Text (Editorial Serif) */}
                <h3 className="text-3xl font-serif text-slate-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-500 text-lg font-light leading-relaxed">
                  {blog.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> 




       {/* //CTA EVENTS CTA// */}
      <section className="w-full flex justify-center py-10">
      <Link
        href="/events"
        className="
          group relative overflow-hidden
          inline-flex items-center gap-3
          px-10 py-4
          bg-[#1a0b2e] /* The Dark Matte background (revealed on hover) */
          text-white
          font-semibold tracking-widest uppercase text-sm
          rounded-sm
          shadow-2xl shadow-purple-900/30
          transition-all duration-500 ease-out
        "
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#2E0249] to-[#7c3aed] transform translate-x-0 group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
        
        {/* Content Layer (z-10 ensures it stays on top of background) */}
        <span className="relative z-10 flex items-center gap-2">
          Checkout Events
          <ArrowRightCircle className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
      </section>




      {/* 4. THE PAPER POPUP MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <>
            {/* Darker Backdrop for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            
            {/* The "Paper" Container */}
            <motion.div
              layoutId={`blog-card-${selectedBlog.id}`}
              className="fixed z-50 top-[5%] left-0 right-0 mx-auto w-full max-w-3xl h-[90vh] bg-white md:rounded-t-lg shadow-2xl overflow-hidden flex flex-col"
              // Only top rounded to look like a sheet coming up
            >
              
              {/* Header Actions (Sticky Top) */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Article View</span>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Scrollable Paper Content */}
              <div className="overflow-y-auto px-8 md:px-16 py-12">
                
                {/* Article Header */}
                <div className="mb-10 text-center">
                   <div className="flex justify-center gap-2 mb-6">
                      {selectedBlog.tags.map((tag, t) => (
                        <span key={t} className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                   </div>
                   <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
                     {selectedBlog.title}
                   </h2>
                   <div className="flex items-center justify-center gap-6 text-slate-400 text-sm font-medium">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> Today</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> 5 min read</span>
                   </div>
                </div>

                {/* Main Image (Inline now, not background) */}
                <div className="relative w-full h-80 md:h-[400px] rounded-xl overflow-hidden mb-12">
                  <Image src={selectedBlog.image} alt={selectedBlog.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
                </div>

                {/* Article Prose */}
                <div 
                  className="prose prose-lg prose-slate mx-auto font-serif"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                />

                {/* Footer of Paper */}
                <div className="mt-16 pt-10 border-t border-slate-100 text-center">
                  <p className="text-slate-400 text-sm italic mb-6">Found this helpful?</p>
                  <button 
                    onClick={() => setSelectedBlog(null)}
                    className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
                  >
                    Done Reading
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}