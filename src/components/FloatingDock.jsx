"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X } from "lucide-react";
import BookButton from "./FormButton/BookButton";


export default function FloatingDock() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      
      <AnimatePresence mode="wait">
        
        {/* --- STATE 1: THE OPEN DOCK (Glass Capsule) --- */}
        {isOpen ? (
       <motion.div
       key="dock"
       initial={{ opacity: 0, scale: 0.8, y: 20 }}
       animate={{ opacity: 1, scale: 1, y: 0 }}
       exit={{ opacity: 0, scale: 0.5, y: 20 }}
       transition={{ type: "spring", stiffness: 300, damping: 25 }}
       className="
         relative overflow-hidden
         flex flex-col items-center gap-3 p-3
     
         /* Core glass */
         bg-white/10 backdrop-blur-2xl
         border border-white/20
     
         /* Shape + depth */
         rounded-[2.25rem]
         shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]
     
         /* Subtle glow */
         before:absolute before:inset-0
         before:rounded-[inherit]
         before:bg-gradient-to-b
         before:from-white/20
         before:to-transparent
         before:opacity-40
         before:pointer-events-none
     
         /* Edge highlight */
         after:absolute after:inset-[1px]
         after:rounded-[inherit]
         after:border
         after:border-white/30
         after:opacity-30
         after:pointer-events-none
       "
     >
       {/* iOS-style moving light sheen */}
       <div
         className="
           pointer-events-none absolute -top-1/2 left-1/2
           h-[200%] w-[40%]
           -translate-x-1/2
           rotate-12
           bg-gradient-to-r
           from-transparent
           via-white/5
           to-transparent
           opacity-10
           blur-2xl
           animate-[shine_6s_linear_infinite]
         "
       />
     
 
     
            {/* 1. WhatsApp Action */}
            <DockItem 
              href="https://wa.me/9779802393253" 
              icon={
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              }
              label="WhatsApp"
              color="bg-green-500"
            />

            {/* 2. Booking Action (Wrapped InquireButton) */}
            <BookButton className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-400 transition-all text-white">
               <CalendarDays className="w-6 h-6" />
               <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded">
                 Book
               </span>
            </BookButton>

            {/* 3. Close Button (The "Hang Up" Button) */}
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-white mt-1 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
            
          </motion.div>
        ) : (
          
          /* --- STATE 2: THE TRIGGER BUTTON (Smiley Headset) --- */
          <motion.button
          key="trigger"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 45 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="
            relative flex items-center justify-center w-15 h-15 
            rounded-full shadow-2xl z-50
            bg-[#3b57a9]
            border-2 border-white/20 
          "
        >
          {/* Replaced SVG with bot.png image */}
          {/* <img 
            src="/hero/bot.png" 
            alt="Chat Bot"
            className="w-16 h-16 object-cover relative z-10  rounded-full"
          /> */}  
         <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 800 800"
  width="40"
  height="40"
  role="img"
  aria-labelledby="openIconTitle openIconDesc"
  className="text-white relative z-10"
>
  <title id="openIconTitle">Opens Chat</title>
  <desc id="openIconDesc">This icon Opens the chat window.</desc>

  <path
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"
  />
</svg>


        
          {/* Pulsing Ring for Attention */}
          <span className="absolute inset-0 rounded-full animate-ping bg-purple-400/50 duration-2000 pointer-events-none"></span>
        </motion.button>
         

           
        )}

      </AnimatePresence>
    </div>
  );
}

// Helper Component for simple links (WhatsApp)
function DockItem({ href, icon, color, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex items-center justify-center w-12 h-12 
        rounded-full transition-all duration-300 shadow-md hover:scale-105
        ${color}
      `}
    >
      {icon}
      {/* Tooltip */}
      <span className="
        absolute right-14 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 
        bg-white/10 backdrop-blur-md border border-white/10
        text-white text-xs font-medium px-3 py-1.5 rounded-lg
        whitespace-nowrap pointer-events-none
      ">
        {label}
      </span>
    </a>
  );
}