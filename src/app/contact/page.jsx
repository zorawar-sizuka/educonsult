"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import ContactFormModern from "@/components/Contact2";

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      
      {/* -------------------------------------------------------
          1. HERO SECTION (Consistent with About/Services)
      ------------------------------------------------------- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/contact/contact.avif"
            alt="Office lobby"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-medium tracking-tight text-white font-serif"
          >
            Contact
          </motion.h1>
        </div>
      </div>

      {/* -------------------------------------------------------
          2. INTRO & FORM SECTION
      ------------------------------------------------------- */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
        <ContactFormModern/>

          {/* RIGHT: Contact Details Card (Beige Background) */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="lg:w-2/5"
          >
            <div className="bg-[#F6F5F2] p-10 lg:p-12 rounded-[2.5rem] h-full flex flex-col justify-between">
              
              <div>
                <h3 className="text-2xl font-serif text-slate-900 mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-white rounded-full shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Address</span>
                      <p className="text-slate-900 leading-relaxed">
                        123 Innovation Drive,<br />
                        Floor 4, Suite 200<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-white rounded-full shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</span>
                      <p className="text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">
                        hello@consulting.com
                      </p>
                      <p className="text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">
                        support@consulting.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-white rounded-full shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</span>
                      <p className="text-slate-900">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        Mon-Fri, 9am - 6pm EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials / Extra */}
              <div className="mt-12 pt-12 border-t border-slate-200">
                 <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Follow Us</span>
                 <div className="flex gap-4">
                    {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                      <a key={social} href="#" className="text-slate-900 font-medium hover:text-blue-600 transition-colors underline decoration-slate-300 underline-offset-4 decoration-1 hover:decoration-blue-600">
                        {social}
                      </a>
                    ))}
                 </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* -------------------------------------------------------
          3. MAP SECTION
          Full width with grayscale filter for premium look
      ------------------------------------------------------- */}
      <section className="w-full h-[50vh] relative grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133446864!2d-73.98565668459426!3d40.74844057932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1624608386348!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          className="w-full h-full"
        ></iframe>
        
        {/* Optional overlay to prevent accidental scroll interaction if desired */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)]"></div>
      </section>

    </div>
  );
}