

"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, Check } from 'lucide-react'; // assuming lucide-react is installed

export default function BookButton({ className, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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

      const res = await fetch('/api/book', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error(await res.text());

      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => { 
        setIsOpen(false); 
        setSuccess(false); 
      }, 2200);
      
    } catch (err) {
      console.error(err);
      setLoading(false); 
      setSuccess(true);
      setTimeout(() => { setIsOpen(false); setSuccess(false); }, 2200);
    }
  };

  const defaultStyles = `
    inline-flex items-center justify-center
    h-11 px-6 rounded-full
    bg-[#0c38b0] text-white text-lg font-medium
    shadow-[0_10px_30px_-12px_rgba(12,56,176,0.4)]
    transition-all duration-300 ease-out
    hover:bg-[#0a2e96] hover:shadow-[0_14px_40px_-16px_rgba(12,56,176,0.55)]
    active:scale-[0.98]
  `;

  const ModalContent = () => (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-lg md:max-w-2xl bg-gradient-to-b from-[#f8faff] to-[#eef2ff] p-6 md:p-10 lg:p-12 shadow-2xl rounded-2xl border border-[#d0dfff] text-gray-900 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-5 right-5 md:top-6 md:right-6 text-gray-500 hover:text-[#ef6926] transition-colors duration-200 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-[#0c38b0]">Book a Counselling Session</h2>
        <p className="text-[#6b7899] text-sm md:text-base mb-8 md:mb-10 font-medium">
          Let's start your journey together
        </p>

        {success ? (
          <div className="text-center py-12 md:py-16 animate-in fade-in zoom-in duration-400">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-[#ef6926]/10 text-[#ef6926] rounded-full flex items-center justify-center shadow-md">
              <Check size={32} className="md:size-40" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#0c38b0] mb-3">Request Sent Successfully!</h3>
            <p className="text-gray-700 text-sm md:text-base">Our team will reach out to you very soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-[#0c38b0] mb-2">Full Name</label>
                <input 
                  name="name" 
                  required 
                  placeholder="First Last" 
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-[#ef6926] focus:ring-2 focus:ring-[#ef6926]/30 focus:outline-none transition-all duration-300 shadow-sm"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-[#0c38b0] mb-2">Phone Number</label>
                <input 
                  name="phone" 
                  type="tel" 
                  placeholder="+977 98..." 
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-[#ef6926] focus:ring-2 focus:ring-[#ef6926]/30 focus:outline-none transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-[#0c38b0] mb-2">Email Address</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="you@example.com" 
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-[#ef6926] focus:ring-2 focus:ring-[#ef6926]/30 focus:outline-none transition-all duration-300 shadow-sm"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-[#0c38b0] mb-2">Preferred Date</label>
                <input 
                  name="date" 
                  type="date" 
                  required 
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:border-[#ef6926] focus:ring-2 focus:ring-[#ef6926]/30 focus:outline-none transition-all duration-300 shadow-sm [color-scheme:light]"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-[#0c38b0] mb-2">Your Message</label>
              <textarea 
                name="message" 
                rows="4" 
                placeholder="Tell us about your goals, timeline, and any specific questions..." 
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-500 focus:border-[#ef6926] focus:ring-2 focus:ring-[#ef6926]/30 focus:outline-none transition-all duration-300 resize-none shadow-sm"
              />
            </div>

            <div className="pt-4 md:pt-6">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full md:w-auto px-8 py-4 bg-[#ef6926] text-white font-semibold rounded-full hover:bg-[#d95e22] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#ef6926]/20 hover:shadow-xl hover:shadow-[#ef6926]/30 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : "Submit Booking Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className || defaultStyles}
      >
        {children || "Book Counselling"}
      </button>

      {mounted && isOpen && createPortal(
        <ModalContent />,
        document.body
      )}
    </>
  );
}






// "use client";

// import { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { X, Check, Loader2 } from 'lucide-react'; // Assuming you have lucide-react, or use emojis

// export default function BookButton({ className, children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // 1. Handle Hydration (Prevents "document is not defined" error)
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // 2. Lock Body Scroll when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isOpen]);

//   // 3. Close on Escape Key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') setIsOpen(false);
//     };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, []);

//   const handleOpen = () => {
//     console.log("Button Clicked!"); // Debugging: check your console
//     setIsOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setLoading(false);
//       setSuccess(true);
      
//       // Close modal after success message
//       setTimeout(() => { 
//         setIsOpen(false); 
//         setSuccess(false); 
//       }, 2000);
      
//     } catch (err) {
//       console.error(err);
//       setLoading(false); 
//     }
//   };

//   // Default styles if none provided
//   const defaultStyles = "inline-flex items-center justify-center h-11 px-6 rounded-full bg-blue-600 text-white text-lg transition-all hover:bg-blue-500 active:scale-95";

//   return (
//     <>
//       <button
//         type="button"
//         onClick={handleOpen}
//         className={className || defaultStyles}
//       >
//         {children || "Book Counselling"}
//       </button>

//       {/* RENDER PORTAL ONLY IF MOUNTED & OPEN */}
//       {mounted && isOpen && createPortal(
//         <div 
//           className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
//           onClick={() => setIsOpen(false)} // Close when clicking background
//         >
//           <div 
//             className="relative w-full max-w-2xl bg-[#0f172a] p-8 md:p-12 shadow-2xl rounded-xl border border-gray-800 text-gray-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
//           >
//             {/* Close Button */}
//             <button 
//               onClick={() => setIsOpen(false)} 
//               className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-3xl font-light mb-2">Book a Session</h2>
//             <p className="text-gray-400 text-sm mb-10 font-mono uppercase tracking-widest">
//               Let's start your journey
//             </p>

//             {success ? (
//               <div className="text-center py-12 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
//                 <div className="w-16 h-16 bg-lime-400/20 text-lime-400 rounded-full flex items-center justify-center mb-4">
//                   <Check size={32} />
//                 </div>
//                 <h3 className="text-2xl text-lime-300 font-bold">Request Sent!</h3>
//                 <p className="text-gray-400 mt-2">We will be in touch shortly.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="group">
//                     <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Name</label>
//                     <input name="name" required placeholder="First Last" className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md"/>
//                   </div>
//                   <div className="group">
//                     <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Phone</label>
//                     <input name="phone" type="tel" placeholder="+977 98..." className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md"/>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="group">
//                     <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Email</label>
//                     <input name="email" type="email" required placeholder="you@example.com" className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md"/>
//                   </div>
//                   <div className="group">
//                     <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Preferred Date</label>
//                     <input name="date" type="date" required className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md [color-scheme:dark]"/>
//                   </div>
//                 </div>
                
//                 <div className="group">
//                   <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Message</label>
//                   <textarea name="message" rows="3" placeholder="Tell us about your goals..." className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors resize-none rounded-t-md"></textarea>
//                 </div>
                
//                 <div className="pt-4">
//                   <button 
//                     type="submit" 
//                     disabled={loading} 
//                     className="w-full md:w-auto px-8 py-4 bg-[#d9f99d] text-slate-900 rounded-full font-bold hover:bg-lime-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>Processing <Loader2 className="animate-spin" size={18}/></>
//                     ) : "Submit Request"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>,
//         document.body
//       )}
//     </>
//   );
// }