"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, MapPinHouse } from 'lucide-react';
import { countriesData } from '@/app/data/countriesData';

// Animation variants for the staggered entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function CountriesIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 mt-10">
      
      {/* 1. Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4"> 
                <div className='flex items-center justify-between gap-1'>
            <MapPinHouse/>Destinations 
            </div> 
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
              Choose Your Future
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
              Explore the world's top study destinations. Click on a country to view universities, costs, and visa requirements.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Country Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {countriesData.map((country) => (
            <motion.div key={country.slug} variants={cardVariants}>
              <Link href={`/countries/${country.slug}`} className="group block h-full">
                <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group-hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={country.heroImage} 
                      alt={country.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                       <Globe className="w-3 h-3 text-blue-500" />
                       Study Hub
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-serif">
                      {country.name}
                    </h2>
                    <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed mb-6">
                      {country.tagline}
                    </p>

                    {/* Footer Stats (Mini Preview) */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Avg Tuition</span>
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">{country.stats[0].value}</span>
                      </div>
                      
                      <div className={`w-10 h-10 rounded-full ${country.lightThemeColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <ArrowRight className={`w-5 h-5 ${country.textColor}`} />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </div>
  );
}