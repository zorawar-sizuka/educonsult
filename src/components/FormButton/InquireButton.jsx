// 'use client';
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, GraduationCap, Globe, BookOpen, User, Mail } from 'lucide-react';

// export default function InquireButton({ className }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const formData = new FormData(e.target);
//       const data = Object.fromEntries(formData.entries());
  
//       const res = await fetch('/api/book', {
//         method: 'POST',
//         body: JSON.stringify(data),
//       });
  
//       // 🛑 CRITICAL CHECK: Did the server return 200 OK?
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to book");
//       }
  
//       // Only set success if res.ok is true
//       setLoading(false);
//       setSuccess(true);
//       setTimeout(() => { setIsOpen(false); setSuccess(false); }, 2000);
      
//     } catch (err) {
//       alert("Error: " + err.message); // Tell the user what went wrong
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button onClick={() => setIsOpen(true)} className={className || "bg-white border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition"}>
//         Check Eligibility
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
//               className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-start">
//                 <div>
//                   <h3 className="text-xl font-serif font-bold">Profile Assessment</h3>
//                   <p className="text-blue-100 text-sm opacity-80">We'll check your admission chances.</p>
//                 </div>
//                 <button onClick={() => setIsOpen(false)}><X className="w-6 h-6 text-white/70 hover:text-white"/></button>
//               </div>

//               {success ? (
//                 <div className="p-12 text-center">
//                   <div className="text-5xl mb-4">🚀</div>
//                   <h3 className="font-bold text-xl text-slate-900">Profile Received!</h3>
//                   <p className="text-slate-500">Our experts are analyzing your data.</p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                   <Input name="name" icon={User} placeholder="Full Name" required />
//                   <Input name="email" icon={Mail} placeholder="Email Address" required />
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <Select name="destination" icon={Globe}>
//                       <option value="">Destination?</option>
//                       <option value="USA">USA</option>
//                       <option value="UK">UK</option>
//                       <option value="Australia">Australia</option>
//                       <option value="Japan">Japan</option>
//                     </Select>
//                     <Select name="gpa" icon={GraduationCap}>
//                       <option value="">Your GPA?</option>
//                       <option value="4.0">3.6 - 4.0</option>
//                       <option value="3.5">3.0 - 3.5</option>
//                       <option value="2.5">2.5 - 2.9</option>
//                       <option value="2.0">Below 2.5</option>
//                     </Select>
//                   </div>

//                   <Input name="englishScore" icon={BookOpen} placeholder="IELTS / PTE / JLPT Score" />
//                   <Input name="course" icon={GraduationCap} placeholder="Intended Course (e.g. CS)" />

//                   <button disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all">
//                     {loading ? 'Submitting...' : 'Submit Profile'}
//                   </button>
//                 </form>
//               )}
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// const Input = ({ icon: Icon, ...props }) => (
//   <div className="relative">
//     <Icon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
//     <input {...props} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400" />
//   </div>
// );

// const Select = ({ icon: Icon, children, ...props }) => (
//   <div className="relative">
//     <Icon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
//     <select {...props} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none appearance-none text-slate-600">
//       {children}
//     </select>
//   </div>
// ); 









"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function InquireButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Handle Hydration (Prevent SSR errors with Portals)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 2. Lock Body Scroll when Modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // 3. Close on Escape Key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch('/api/inquire', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      setLoading(false);
      setSuccess(true);
      
      // Auto close after 2 seconds
      setTimeout(() => { 
        setIsOpen(false); 
        setSuccess(false); 
      }, 2000);
      
    } catch (err) {
      console.error(err);
      alert("Submission failed. Check console.");
      setLoading(false);
    }
  };

  // The Modal Component
  const ModalContent = () => (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={() => setIsOpen(false)} // Close when clicking overlay
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        
        {/* Decorative Icon */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
           <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Check Eligibility</h2>
          <p className="text-gray-500 text-sm mt-1">Fill in your details to see if you qualify.</p>
        </div>

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-green-500 animate-in fade-in zoom-in duration-300">
             <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
             <span className="font-bold text-lg">Inquiry Received!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <input 
                name="name" 
                required 
                placeholder="Full Name"
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="Email Address"
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Destination & GPA Row */}
            <div className="flex gap-3">
              <input 
                name="destination" 
                required 
                placeholder="Target Country"
                className="w-2/3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
              <input 
                name="gpa" 
                required 
                placeholder="GPA"
                className="w-1/3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Course & English Score Row */}
            <div className="flex gap-3">
              <input 
                name="course" 
                placeholder="Course (Optional)"
                className="w-1/2 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
               <input 
                name="englishScore" 
                placeholder="IELTS/PTE"
                className="w-1/2 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 bg-green-400 hover:bg-green-500 text-white font-bold rounded-xl py-3 shadow-lg shadow-green-200 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Checking..." : "Submit Inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="
          inline-flex items-center justify-center
          h-11 px-6 rounded-full
          border border-white/35 bg-white/10
          text-white text-lg
          backdrop-blur-md
          transition-all duration-300 ease-out
          hover:bg-white/15 hover:border-white/50
          active:scale-[0.98]
        "
      >
        Check Eligibility
      </button>

      {/* Render Modal via Portal */}
      {mounted && isOpen && createPortal(
        <ModalContent />,
        document.body
      )}
    </>
  );
}