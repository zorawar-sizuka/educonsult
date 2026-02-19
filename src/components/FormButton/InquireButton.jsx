// "use client";

// import { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';

// export default function InquireButton({ children, className }) {
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

//   // 3. Close on Escape
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

//       // Replace with your actual API endpoint
//       const res = await fetch('/api/inquire', {
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
//       alert("Submission failed. Please try again.");
//       setLoading(false);
//     }
//   };

//   // The Modal Component
//   const ModalContent = () => (
//     <div 
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
//       onClick={() => setIsOpen(false)}
//     >
//       <div 
//         className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
//            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
//         </div>

//         <button 
//           onClick={() => setIsOpen(false)} 
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
//         >
//           ✕
//         </button>

//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Check Eligibility</h2>
//           <p className="text-gray-500 text-sm mt-1">Fill in your details to see if you qualify.</p>
//         </div>

//         {success ? (
//           <div className="py-12 flex flex-col items-center justify-center text-green-500 animate-in fade-in zoom-in duration-300">
//              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
//              <span className="font-bold text-lg">Inquiry Received!</span>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input name="name" required placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all" />
//             </div>
//             <div>
//               <input name="email" type="email" required placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all" />
//             </div>
//             <div className="flex gap-3">
//               <input name="destination" required placeholder="Target Country" className="w-2/3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none" />
//               <input name="gpa" required placeholder="GPA" className="w-1/3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none" />
//             </div>
//             <div className="flex gap-3">
//               <input name="course" placeholder="Course (Optional)" className="w-1/2 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none" />
//                <input name="englishScore" placeholder="IELTS/PTE" className="w-1/2 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none" />
//             </div>
//             <button type="submit" disabled={loading} className="w-full mt-4 bg-green-400 hover:bg-green-500 text-white font-bold rounded-xl py-3 shadow-lg shadow-green-200 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0">
//               {loading ? "Checking..." : "Submit Inquiry"}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* LOGIC: 
//          If `children` is passed, we render the custom button wrapper.
//          If NOT passed, we render the default Glass Button.
//       */}
//       {children ? (
//         <button onClick={() => setIsOpen(true)} className={className}>
//           {children}
//         </button>
//       ) : (
//         <button 
//           onClick={() => setIsOpen(true)}
//           className={`
//             inline-flex items-center justify-center
//             h-11 px-6 rounded-full
//             border border-white bg-white/10
//             text-white text-lg
//             backdrop-blur-md
//             transition-all duration-300 ease-out
//             hover:bg-white/15 hover:border-white/50
//             active:scale-[0.98]
//             ${className || ''} 
//           `}
//         >
//           Check Eligibility
//         </button>
//       )}

//       {/* Render Modal via Portal */}
//       {mounted && isOpen && createPortal(
//         <ModalContent />,
//         document.body
//       )}
//     </>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function InquireButton({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration Safety
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch("/api/inquire", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
      setLoading(false);
    }
  };

  const ModalContent = () => (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 overflow-hidden border border-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #3a56a4 0%, #ef6925 100%)",
          }}
        />

        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-black/10 hover:bg-gray-50 transition"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#ef6925" }}
            />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-black/50">
              Eligibility Check
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Check Eligibility
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill in your details to see if you qualify.
          </p>
        </div>

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #3a56a4 0%, #ef6925 100%)",
              }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <span className="font-bold text-lg text-gray-900 mt-4">
              Inquiry Received!
            </span>
            <span className="text-sm text-gray-500 mt-1">
              We’ll contact you soon.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              required
              placeholder="Full Name"
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-[#3a56a4]/30 focus:border-[#3a56a4]/40"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-[#3a56a4]/30 focus:border-[#3a56a4]/40"
            />

            <div className="flex gap-3">
              <input
                name="destination"
                required
                placeholder="Target Country"
                className="w-2/3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-[#3a56a4]/30 focus:border-[#3a56a4]/40"
              />
              <input
                name="gpa"
                required
                placeholder="GPA"
                className="w-1/3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-[#3a56a4]/30 focus:border-[#3a56a4]/40"
              />
            </div>

            <div className="flex gap-3">
              <input
                name="course"
                placeholder="Course (Optional)"
                className="w-1/2 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-[#3a56a4]/30 focus:border-[#3a56a4]/40"
              />
              <input
                name="englishScore"
                placeholder="IELTS/PTE"
                className="w-1/2 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-[#3a56a4]/30 focus:border-[#3a56a4]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 text-white font-bold rounded-xl py-3 shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background:
                  "linear-gradient(135deg, #3a56a4 0%, #ef6925 100%)",
                boxShadow: "0 12px 28px rgba(58,86,164,0.25)",
              }}
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
      {children ? (
        <button onClick={() => setIsOpen(true)} className={className}>
          {children}
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            group relative inline-flex items-center justify-center
            h-12 px-7 rounded-full
            text-white text-[16px] font-semibold tracking-wide
            overflow-hidden transition-all duration-300 ease-out
            active:scale-[0.97]
            ${className || ""}
          `}
          style={{
            background:
              "linear-gradient(135deg, #3a56a4 0%, #ef6925 100%)",
            boxShadow: "0 10px 25px rgba(58,86,164,0.25)",
          }}
        >
          <span className="relative flex items-center gap-2">
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
            Check Eligibility
          </span>
        </button>
      )}

      {mounted &&
        isOpen &&
        createPortal(<ModalContent />, document.body)}
    </>
  );
}
