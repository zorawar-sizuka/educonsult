import React from 'react';

export default function Notifier({ content, position = "top-left" }) {
  // 1. Determine specific positioning classes
  let positionClasses = "left-10"; // Default
  let flexClasses = "";

  if (position === "top-right") {
    positionClasses = "right-10";
    flexClasses = "flex-row-reverse"; // Flip Dash to the outside
  } else if (position === "top-center") {
    // perfectly center within the relative container
    positionClasses = "left-1/2 -translate-x-1/2"; 
  }

  return (
    // Full-width Overlay
    <div className="absolute top-2 left-4 w-full z-50 pointer-events-none">
      
      {/* Alignment Container (Matches your page layout) */}
      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        
        {/* The Notifier Badge */}
        <div className={`absolute top-6 ${positionClasses} ${flexClasses} flex items-center gap-4 transition-all duration-300`}>
          
          {/* The Blue Dash */}
          <div className="w-10 h-0.5 bg-blue-600 rounded-full shadow-sm flex-shrink-0"></div>
          
          {/* The Content Text */}
          <span className="text-xl font-medium text-gray-800 tracking-tight whitespace-nowrap">
            {content}
          </span>
        </div>

      </div>
    </div>
  );
}