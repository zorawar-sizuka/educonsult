// "use client";

// import { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';

// export default function BookButton({ className, children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // 1. Handle Hydration
//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   // 2. Lock Body Scroll
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData(e.target);
//       const data = Object.fromEntries(formData.entries());

//       // Simulate API call or replace with real fetch
//       const res = await fetch('/api/book', {
//         method: 'POST',
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) throw new Error(await res.text());

//       setLoading(false);
//       setSuccess(true);
      
//       setTimeout(() => { 
//         setIsOpen(false); 
//         setSuccess(false); 
//       }, 2000);
      
//     } catch (err) {
//       console.error(err);
//       // Fallback for demo if API route doesn't exist yet
//       setLoading(false); 
//       setSuccess(true);
//       setTimeout(() => { setIsOpen(false); setSuccess(false); }, 2000);
//     }
//   };

//   // The Default Blue Button Styles (used if no className is passed)
//   const defaultStyles = `
//     inline-flex items-center justify-center
//     h-11 px-6 rounded-full
//     bg-blue-600 text-white text-lg
//     shadow-[0_18px_45px_-25px_rgba(37,99,235,0.65)]
//     transition-all duration-300 ease-out
//     hover:bg-blue-500 hover:shadow-[0_22px_55px_-28px_rgba(37,99,235,0.75)]
//     active:scale-[0.98]
//   `;

//   // The Modal Content
//   const ModalContent = () => (
//     <div 
//       className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
//       onClick={() => setIsOpen(false)}
//     >
//       <div 
//         className="relative w-full max-w-2xl bg-[#0f172a] p-8 md:p-12 shadow-2xl rounded-sm border border-gray-800 text-gray-100 max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button 
//           onClick={() => setIsOpen(false)} 
//           className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
//         >
//           ✕
//         </button>

//         <h2 className="text-3xl font-light mb-2">Book a Session</h2>
//         <p className="text-gray-400 text-sm mb-10 font-mono uppercase tracking-widest">
//           Let's start your journey
//         </p>

//         {success ? (
//           <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
//             <div className="text-5xl mb-4">✅</div>
//             <h3 className="text-2xl text-lime-300">Request Sent!</h3>
//             <p className="text-gray-400 mt-2">We will be in touch shortly.</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="group">
//                 <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Name</label>
//                 <input name="name" required placeholder="First Last" className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors"/>
//               </div>
//               <div className="group">
//                 <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Phone</label>
//                 <input name="phone" type="tel" placeholder="+977 98..." className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors"/>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="group">
//                 <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Email</label>
//                 <input name="email" type="email" required placeholder="you@example.com" className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors"/>
//               </div>
//               <div className="group">
//                 <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Preferred Date</label>
//                 <input name="date" type="date" required className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:border-lime-400 focus:outline-none transition-colors [color-scheme:dark]"/>
//               </div>
//             </div>
//             <div className="group">
//               <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Message</label>
//               <textarea name="message" rows="2" placeholder="Tell us about your goals..." className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors resize-none"></textarea>
//             </div>
//             <div className="pt-4">
//               <button type="submit" disabled={loading} className="px-8 py-3 bg-[#d9f99d] text-slate-900 rounded-full font-bold hover:bg-lime-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
//                 {loading ? "Processing..." : "Submit Request"}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//     <button
//   type="button"
//   onClick={() => setIsOpen(true)}
//   className={className || defaultStyles}
// >
//   {children || "Book Counselling"}
// </button>


//       {mounted && isOpen && createPortal(
//         <ModalContent />,
//         document.body
//       )}
//     </>
//   );
// } 









"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Loader2 } from 'lucide-react'; // Assuming you have lucide-react, or use emojis

export default function BookButton({ className, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Handle Hydration (Prevents "document is not defined" error)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Lock Body Scroll when modal is open
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

  const handleOpen = () => {
    console.log("Button Clicked!"); // Debugging: check your console
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoading(false);
      setSuccess(true);
      
      // Close modal after success message
      setTimeout(() => { 
        setIsOpen(false); 
        setSuccess(false); 
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setLoading(false); 
    }
  };

  // Default styles if none provided
  const defaultStyles = "inline-flex items-center justify-center h-11 px-6 rounded-full bg-blue-600 text-white text-lg transition-all hover:bg-blue-500 active:scale-95";

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={className || defaultStyles}
      >
        {children || "Book Counselling"}
      </button>

      {/* RENDER PORTAL ONLY IF MOUNTED & OPEN */}
      {mounted && isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)} // Close when clicking background
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0f172a] p-8 md:p-12 shadow-2xl rounded-xl border border-gray-800 text-gray-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-light mb-2">Book a Session</h2>
            <p className="text-gray-400 text-sm mb-10 font-mono uppercase tracking-widest">
              Let's start your journey
            </p>

            {success ? (
              <div className="text-center py-12 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-lime-400/20 text-lime-400 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl text-lime-300 font-bold">Request Sent!</h3>
                <p className="text-gray-400 mt-2">We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Name</label>
                    <input name="name" required placeholder="First Last" className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md"/>
                  </div>
                  <div className="group">
                    <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Phone</label>
                    <input name="phone" type="tel" placeholder="+977 98..." className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md"/>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Email</label>
                    <input name="email" type="email" required placeholder="you@example.com" className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md"/>
                  </div>
                  <div className="group">
                    <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Preferred Date</label>
                    <input name="date" type="date" required className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none transition-colors rounded-t-md [color-scheme:dark]"/>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-mono text-lime-400 mb-2 uppercase tracking-wider">Message</label>
                  <textarea name="message" rows="3" placeholder="Tell us about your goals..." className="w-full bg-slate-900/50 border-b border-gray-700 py-3 px-2 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition-colors resize-none rounded-t-md"></textarea>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full md:w-auto px-8 py-4 bg-[#d9f99d] text-slate-900 rounded-full font-bold hover:bg-lime-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>Processing <Loader2 className="animate-spin" size={18}/></>
                    ) : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}