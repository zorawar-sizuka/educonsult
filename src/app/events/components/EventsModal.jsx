// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { X, CalendarDays, MapPin, ArrowRight } from "lucide-react";
// import RegistrationForm from "./RegistrationForm";

// const formatDateFull = (dateStr) => {
//   const d = new Date(dateStr);
//   return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
// }; 

// const resolveEventImage = (url) => {
//   if (!url) return "/events/event.png";
//   if (url.startsWith("data:image/")) return url;
//   if (url.startsWith("blob:")) return url;
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/")) return url;
//   return "/events/event.png";
// };


// export default function EventModal({ event, onClose }) {
//   const [showRegister, setShowRegister] = useState(false);
//   if (!event) return null;

//   return (
//     <>
//       {showRegister && (
//         <RegistrationForm
//           eventName={event.title}
//           onClose={() => {
//             setShowRegister(false);
//             onClose();
//           }}
//         />
//       )}

//       <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${showRegister ? "hidden" : ""}`}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
//           onClick={onClose}
//         />

//         <motion.div
//           layoutId={`card-${event.id}`}
//           className="relative bg-[#FAFAFA] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl z-10 overflow-hidden"
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-6 z-20 bg-white/50 backdrop-blur-md p-3 rounded-full hover:bg-white text-slate-900 transition-all hover:rotate-90 shadow-sm"
//           >
//             <X className="w-5 h-5" />
//           </button>

//           <div className="relative h-72 md:h-80 w-full">
//             <Image
//               src={resolveEventImage(event.imageUrl)}
//               alt={event.title}
//               fill
//               sizes="(min-width: 768px) 768px, 100vw"
//               className="object-cover"
//               priority
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] to-transparent opacity-90" />
//             <div className="absolute bottom-7 left-7 md:left-12">
//               <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block shadow-lg shadow-indigo-500/30">
//                 {event.category || "Event"}
//               </span>
//               <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-none">{event.title}</h2>
//             </div>
//           </div>

//           <div className="p-6 md:p-12 bg-white">
//             <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-10 border-b border-slate-200 pb-8">
//               <div className="flex items-start gap-4 flex-1">
//                 <div className="shrink-0 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl text-indigo-600">
//                   <CalendarDays className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Date & Time</p>
//                   <p className="text-lg text-slate-900 font-medium">{formatDateFull(event.date)}</p>
//                   <p className="text-base text-slate-500">{event.time}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 flex-1">
//                 <div className="shrink-0 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl text-indigo-600">
//                   <MapPin className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Location</p>
//                   <p className="text-lg text-slate-900 font-medium leading-tight">{event.location}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="prose prose-base md:prose-lg text-slate-600 max-w-none mb-10 font-light">
//               <p className="text-lg md:text-xl text-slate-800 font-normal leading-relaxed">{event.description}</p>
//               <p>{event.longDescription || "Join us for an immersive experience designed to inspire and connect."}</p>
//             </div>

//             <button
//               onClick={() => setShowRegister(true)}
//               className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 group shadow-xl shadow-slate-900/10 active:scale-[0.98] duration-200"
//             >
//               Secure Your Spot
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }














'use client';

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, CalendarDays, MapPin, ArrowRight } from "lucide-react";
import RegistrationForm from "./RegistrationForm";

const formatDateFull = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const getEventImageSrc = (url) => {
  if (!url) return "/events/event.png";
  if (url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return "/events/event.png";
};

export default function EventModal({ event, onClose }) {
  const [showRegister, setShowRegister] = useState(false);
  if (!event) return null;

  const imageSrc = getEventImageSrc(event.imageUrl);

  return (
    <>
      {showRegister && (
        <RegistrationForm
          eventName={event.title}
          onClose={() => {
            setShowRegister(false);
            onClose();
          }}
        />
      )}

      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${showRegister ? "hidden" : ""}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-72 md:h-80 w-full">
            <Image
              src={imageSrc}
              alt={event.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
              onError={(e) => {
                e.target.src = "/events/event.png"; // Fallback on error
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] to-transparent opacity-90" />
            <div className="absolute bottom-7 left-7 md:left-12">
              <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block shadow-lg shadow-indigo-500/30">
                {event.category || "Event"}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-none">{event.title}</h2>
            </div>
          </div>

          <div className="p-6 md:p-12 bg-white">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-10 border-b border-slate-200 pb-8">
              <div className="flex items-start gap-4 flex-1">
                <div className="shrink-0 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl text-indigo-600">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Date & Time</p>
                  <p className="text-lg text-slate-900 font-medium">{formatDateFull(event.date)}</p>
                  <p className="text-base text-slate-500">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 flex-1">
                <div className="shrink-0 p-3 bg-white border border-slate-100 shadow-sm rounded-2xl text-indigo-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Location</p>
                  <p className="text-lg text-slate-900 font-medium leading-tight">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-base md:prose-lg text-slate-600 max-w-none mb-10 font-light">
              <p className="text-lg md:text-xl text-slate-800 font-normal leading-relaxed">{event.description}</p>
              <p>{event.longDescription || "Join us for an immersive experience designed to inspire and connect."}</p>
            </div>

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
}