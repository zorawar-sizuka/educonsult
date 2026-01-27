'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CalendarDays, Clock, MapPin, 
  ArrowRight, ArrowUpRight, Filter, ChevronDown, Mail, Loader2, CheckCircle 
} from 'lucide-react'; 
import Lottie from "lottie-react";

// --- CONSTANTS & DATA ---
const MONTHS = [
  "All Months", "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
]; 

const heroImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop", title: "Keynotes" },
  { id: 2, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop", title: "Connection" },
  { id: 3, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop", title: "Workshops" },
  { id: 4, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", title: "Culture" },
];

// Helper: Format Dates
const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
        day: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        full: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

// --- SUB-COMPONENTS ---

// 1. REGISTRATION FORM (Now connected to /api/register)
const RegistrationForm = ({ eventName, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', visitors: 1 });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // --- REAL API CALL RESTORED ---
      const res = await fetch('/api/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventName }) 
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(onClose, 2000); // Close after showing success message
      } else {
        console.error("Registration failed");
        setStatus('idle'); // Allow retry
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl z-20">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"><X /></button>
        
        {status === 'success' ? (
           <div className="text-center py-8">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900">You're on the list!</h3>
             <p className="text-slate-500 mt-2">See you at {eventName}.</p>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h3 className="text-2xl font-bold font-serif text-slate-900">Register Interest</h3>
                <p className="text-sm text-slate-500 mt-1">For <span className="font-semibold text-indigo-600">{eventName}</span></p>
            </div>
            
            <input required placeholder="Full Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            
            <input required type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            
            <div>
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Number of Visitors</label>
              <input required type="number" min="1" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all mt-1"
                value={formData.visitors} onChange={e => setFormData({...formData, visitors: e.target.value})} />
            </div>

            <button disabled={status === 'loading'} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/25 flex justify-center items-center gap-2">
              {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5"/> : 'Confirm Registration'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// 2. EVENT MODAL
const EventModal = ({ event, onClose }) => {
  const [showRegister, setShowRegister] = useState(false);
  if (!event) return null;

  return (
    <>
    {/* Render Registration Form over the Modal if Active */}
    {showRegister && <RegistrationForm eventName={event.title} onClose={() => { setShowRegister(false); onClose(); }} />}

    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${showRegister ? 'hidden' : ''}`}>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
        onClick={onClose} 
      />
      <motion.div 
        layoutId={`card-${event.id}`}
        className="relative bg-[#FAFAFA] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl z-10 overflow-hidden"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-20 bg-white/50 backdrop-blur-md p-3 rounded-full hover:bg-white text-slate-900 transition-all hover:rotate-90 shadow-sm"
        >
          <X className="w-5 h-5"/>
        </button>

        {/* Modal Header Image */}
        <div className="relative h-80 w-full">
           <Image src={event.imageUrl || "/events/event.png"} alt={event.title} fill className="object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] to-transparent opacity-90" />
           <div className="absolute bottom-8 left-8 md:left-12">
              <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block shadow-lg shadow-indigo-500/30">
                {event.category || "Event"}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-none">{event.title}</h2>
           </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-12 bg-white h-full overflow-y-auto">
  
  {/* Header Info Section */}
  <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-10 border-b border-slate-200 pb-8">
    
    {/* Date Block */}
    <div className="flex items-start gap-4 flex-1">
      <div className="shrink-0 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl text-indigo-600">
        <CalendarDays className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div>
        <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">
          Date & Time
        </p>
        <p className="text-base md:text-lg text-slate-900 font-medium">
          {formatDate(event.date).full}
        </p>
        <p className="text-sm md:text-base text-slate-500">
          {event.time}
        </p>
      </div>
    </div>

    {/* Location Block */}
    <div className="flex items-start gap-4 flex-1">
      <div className="shrink-0 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl text-indigo-600">
        <MapPin className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div>
        <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">
          Location
        </p>
        <p className="text-base md:text-lg text-slate-900 font-medium leading-tight">
          {event.location}
        </p>
      </div>
    </div>
  </div>

  {/* Description - Made responsive (prose-base on mobile, prose-lg on desktop) */}
  <div className="prose prose-base md:prose-lg text-slate-600 max-w-none mb-8 md:mb-12 font-light">
    <p className="text-lg md:text-xl text-slate-800 font-normal leading-relaxed">
      {event.description}
    </p>
    <p>
      {event.longDescription ||
        "Join us for an immersive experience designed to inspire and connect. This event brings together industry leaders and creative minds."}
    </p>
  </div>

  {/* Button */}
  <button
    onClick={() => setShowRegister(true)}
    className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 group shadow-xl shadow-slate-900/10 active:scale-[0.98] duration-200"
  >
    Secure Your Spot
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>
</div>
      </motion.div>
    </div>
    </>
  );
};

// 3. HERO SECTION
const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-12 overflow-hidden bg-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
                
                {/* Header Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
                    
                    {/* Left: Title + New Capsule Badge */}
                    <div className="relative">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            // The container is the outer pill holding everything
                            className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full mb-8"
                        >
                            {/* THE BLINKING CAPSULE LED */}
                            <span className="relative flex h-2.5 w-8">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-8 bg-indigo-500"></span>
                            </span>
                            
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-900">
                                2024 Season Live
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="text-7xl md:text-8xl lg:text-9xl font-serif text-slate-900 leading-[0.9] tracking-tighter"
                        >
                            Curated <br/> <span className="italic text-slate-400">Moments.</span>
                        </motion.h1>
                    </div>

                    {/* Right: Paragraph (Pushed to edge) */}
                    <div className="flex flex-col items-start lg:items-end justify-end pb-4">
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-600 max-w-sm leading-relaxed lg:text-right"
                        >
                            Explore our timeline of upcoming workshops, seminars, and networking opportunities designed for your growth.
                        </motion.p>
                    </div>
                </div>

                {/* Expanding Gallery (Desktop) */}
                <div className="hidden md:flex gap-4 h-[500px] w-full">
                    {heroImages.map((item, i) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ flex: 1, opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ flex: 3 }}
                            transition={{ 
                                layout: { duration: 0.4, type: "spring", stiffness: 200, damping: 30 },
                                opacity: { delay: i * 0.1 }
                            }}
                            className="relative h-full rounded-[2rem] overflow-hidden cursor-crosshair group shadow-sm hover:shadow-xl transition-shadow"
                        >
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill 
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                            
                            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <span className="text-white/70 text-xs font-mono uppercase mb-2 block tracking-widest">0{i+1}</span>
                                <h3 className="text-white text-3xl font-serif tracking-wide">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 4. INTRO OVERLAY
const IntroOverlay = ({ animationData, onDone }) => {
    return (
      <motion.div 
        className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-4"
        exit={{ y: "-100%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
      >
        <div className="w-[300px] md:w-[400px]">
          {animationData && <Lottie animationData={animationData} loop={false} autoplay onComplete={onDone} />}
        </div>
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-serif text-slate-900 mt-8"
        >
            Loading Experience...
        </motion.h2>
      </motion.div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function EventsClient({ initialEvents = [] }) {
    const [events, setEvents] = useState(initialEvents);   
    const [loading, setLoading] = useState(initialEvents.length === 0);
    const [animationData, setAnimationData] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("All Months");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // FORM STATE FOR NEWSLETTER
    const [email, setEmail] = useState('');
    const [subStatus, setSubStatus] = useState('idle');

    useEffect(() => {
        // Fetch Lottie
        fetch("/lottie/events.json").then(r => r.json()).then(setAnimationData).catch(() => {});
        
        // Fetch Events (Mock)
// Example of how you WOULD call it if you wanted server-side filtering:
// Inside useEffect...

const fetchEvents = async () => {
    try {
        const res = await fetch('/api/events'); 
        
        // 1. Check if the response was actually successful
        if (!res.ok) throw new Error("Server error");

        const data = await res.json();

        // 2. SAFETY CHECK: Ensure data is actually an array before setting it
        if (Array.isArray(data)) {
            setEvents(data);
        } else {
            console.error("API returned non-array:", data);
            setEvents([]); // Fallback to empty list so .map doesn't crash
        }
    } catch (e) { 
        console.error("Fetch failed:", e); 
        setEvents([]); // Fallback on error
    } 
    finally { 
        setLoading(false); 
    }
};

fetchEvents();
    }, []);

    // Filter Logic
    const filteredEvents = useMemo(() => {
        if (selectedMonth === "All Months") return events;
        const monthIndex = MONTHS.indexOf(selectedMonth) - 1;
        
        return events.filter(event => {
            // Use getUTCMonth() to ignore the user's local timezone
            const eventDate = new Date(event.date);
            return eventDate.getUTCMonth() === monthIndex;
        });
    }, [events, selectedMonth]);

    // NEWSLETTER HANDLER (Now connected to /api/newsletter)
    const handleSubscribe = async (e) => {
        e.preventDefault();
        setSubStatus('loading');
        
        try {
            // --- REAL API CALL FOR NEWSLETTER ---
            // If your newsletter endpoint is different (e.g., /api/subscribe), change it here
            const res = await fetch('/api/newsletter', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }) 
            });

            if (res.ok) {
                setSubStatus('success');
                setEmail('');
            } else {
                console.error("Newsletter subscription failed");
                setSubStatus('idle');
            }
        } catch (error) {
           console.error("Newsletter Error:", error);
           setSubStatus('idle');
        }
    };

    return (
      <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <AnimatePresence>
            {showIntro && (
                <IntroOverlay animationData={animationData} onDone={() => setTimeout(() => setShowIntro(false), 500)} />
            )}
        </AnimatePresence>

        <AnimatePresence>
            {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </AnimatePresence>

        {/* --- PAGE CONTENT --- */}
        {!showIntro && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                
                <HeroSection />

                {/* --- STICKY FILTER --- */}
                <div className="sticky top-6 z-40 px-6 lg:px-8 max-w-[1440px] mx-auto pointer-events-none">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full p-2.5 flex justify-between items-center pointer-events-auto max-w-5xl mx-auto">
                         <div className="px-6 py-2 hidden md:block">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Showing {filteredEvents.length} Events
                            </span>
                         </div>
                         
                         <div className="relative w-full md:w-auto">
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center justify-between w-full md:w-64 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-900 font-medium group"
                            >
                                <span className="flex items-center gap-2 text-sm">
                                    <Filter className="w-4 h-4 text-indigo-500 group-hover:text-indigo-700"/> 
                                    {selectedMonth}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}/>
                            </button>

                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-[110%] w-full md:w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 overflow-hidden max-h-[400px] overflow-y-auto z-50"
                                    >
                                        {MONTHS.map(month => (
                                            <button 
                                                key={month}
                                                onClick={() => { setSelectedMonth(month); setIsFilterOpen(false); }}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedMonth === month ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                         </div>
                    </div>
                </div>

                {/* --- GRID --- */}
                <section className="py-24 px-6 lg:px-8 max-w-[1440px] mx-auto min-h-[60vh]">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 mt-20">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-200" />
                            <p>Syncing calendar...</p>
                        </div>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredEvents.map((event) => {
                                    const dateObj = formatDate(event.date);
                                    return (
                                       // ... inside your map function

<motion.div
    layout
    initial="hidden" 
    animate="visible" 
    exit="hidden" 
    variants={itemVariants} 
    key={event.id} 
    onClick={() => setSelectedEvent(event)}
    className="group cursor-pointer flex flex-col gap-5"
>
                                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                                                <Image 
                                                    src="/events/event.png" 
                                                    alt={event.title} 
                                                    fill  
                                                    sizes="(min-width: 768px) 768px, 100vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl flex flex-col items-center min-w-[70px] shadow-sm">
                                                    <span className="text-xl font-serif font-bold text-slate-900 leading-none">{dateObj.day}</span>
                                                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{dateObj.month}</span>
                                                </div>
                                                
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-white p-4 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300 text-indigo-600">
                                                        <ArrowUpRight className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-2">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase border border-indigo-100 bg-indigo-50 px-2 py-1 rounded-md">
                                                        {event.category || "General"}
                                                    </span>
                                                    <span className="h-px flex-1 bg-slate-100"></span>
                                                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3"/> {event.time}
                                                    </span>
                                                </div>
                                                <h3 className="text-3xl font-serif text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-slate-500 mt-3 line-clamp-2 font-light text-base leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </section>

      {/* --- NEWSLETTER CTA (Now a Working Form) --- */}
      <div className="px-4 md:px-8 pb-12 max-w-[1440px] mx-auto">
                    <section className="relative rounded-[2.5rem] bg-[#111] text-white overflow-hidden shadow-2xl">
                        {/* Decorative Background Blur */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10 py-20 px-6 md:px-20 flex flex-col lg:flex-row items-center justify-between gap-12">
                            
                            <div className="max-w-xl text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 mb-6 text-indigo-300">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Newsletter</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-none tracking-tight">
                                    Don't miss a beat.
                                </h2>
                                <p className="text-lg text-white/60 font-light leading-relaxed">
                                    Get early access to tickets, exclusive workshops, and industry insights delivered straight to your inbox.
                                </p>
                            </div>

                            {/* Changed from Div to Form */}
                            {/* RESPONSIVE FIXES: 
                                1. flex-col for mobile, sm:flex-row for desktop 
                                2. rounded-3xl for mobile, sm:rounded-full for desktop 
                                3. added gap-3 for mobile spacing
                            */}
                            <form onSubmit={handleSubscribe} className="w-full max-w-md bg-white/5 backdrop-blur-sm p-2 rounded-3xl sm:rounded-full border border-white/10 flex flex-col sm:flex-row gap-3 sm:gap-0">
                                <input 
                                    required
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" 
                                    className="w-full sm:flex-1 bg-transparent px-6 py-4 text-white placeholder-white/30 focus:outline-none text-center sm:text-left"
                                />
                                <button 
                                    disabled={subStatus === 'loading'}
                                    /* RESPONSIVE FIXES: w-full on mobile, w-auto on desktop, justify-center added */
                                    className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-lg hover:shadow-indigo-500/25 shrink-0 flex items-center justify-center gap-2"
                                >
                                    {subStatus === 'loading' ? <Loader2 className="animate-spin w-4 h-4"/> : 
                                     subStatus === 'success' ? <CheckCircle className="w-4 h-4"/> : 'Join List'}
                                </button>
                            </form>

                        </div>
                    </section>
                </div>

            </motion.div>
        )}
      </div>
    );
}