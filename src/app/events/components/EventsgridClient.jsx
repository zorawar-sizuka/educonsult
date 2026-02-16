// 'use client';

// import { useMemo, useState } from "react";
// import EventModal from "./EventsModal";
// import EventsSkeleton from "./EventsSkeleton";
// import EventCard from "./EventsCard";
// import FilterBar from "./FilterBar";
// import NewsletterCTA from "./NewsLetter";

// const MONTHS = [
//   "All Months", "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// export default function EventsGridClient({ initialEvents = [] }) {
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState("All Months");

//   const filteredEvents = useMemo(() => {
//     if (selectedMonth === "All Months") return initialEvents;

//     const monthIndex = MONTHS.indexOf(selectedMonth) - 1;
//     if (monthIndex < 0) return initialEvents;

//     return initialEvents.filter((e) => {
//       const d = new Date(e.date);
//       return d.getUTCMonth() === monthIndex; // ✅ avoids timezone month shift
//     });
//   }, [initialEvents, selectedMonth]);

//   const hasEvents = initialEvents.length > 0;

//   return (
//     <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
//       {selectedEvent && (
//         <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
//       )}

//       {/* Filter Bar */}
//       <div className="mb-10 sm:mb-12">
//         <FilterBar
//           selectedMonth={selectedMonth}
//           setSelectedMonth={setSelectedMonth}
//           count={filteredEvents.length}
//         />
//       </div>

//       {/* Grid / Empty / Skeleton */}
//       {!hasEvents ? (
//         <div className="mt-6">
//           <EventsSkeleton />
//         </div>
//       ) : filteredEvents.length === 0 ? (
//         <div className="py-16 sm:py-20 text-center">
//           <p className="text-slate-500 text-base sm:text-lg">
//             No events found for <span className="font-semibold">{selectedMonth}</span>.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
//           {filteredEvents.map((event) => (
//             <EventCard
//               key={event.id}
//               event={event}
//               onClick={() => setSelectedEvent(event)}
//             />
//           ))}
//         </div>
//       )}

   
//     </section>
//   );
// }


























'use client';

import { useMemo, useState } from "react";
import Image from "next/image"; // Ensure imported
import EventModal from "./EventsModal";
import EventsSkeleton from "./EventsSkeleton";
import EventCard from "./EventsCard";
import FilterBar from "./FilterBar";
import NewsletterCTA from "./NewsLetter";
import { AnimatePresence } from "framer-motion";

const MONTHS = [
  "All Months", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function EventsGridClient({ initialEvents = [] }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("All Months");

  const filteredEvents = useMemo(() => {
    if (selectedMonth === "All Months") return initialEvents;

    const monthIndex = MONTHS.indexOf(selectedMonth) - 1;
    if (monthIndex < 0) return initialEvents;

    return initialEvents.filter((e) => {
      const d = new Date(e.date);
      return d.getUTCMonth() === monthIndex;
    });
  }, [initialEvents, selectedMonth]);

  const hasEvents = initialEvents.length > 0;

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

      {/* Filter Bar */}
      <div className="mb-10 sm:mb-12">
        <FilterBar
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          count={filteredEvents.length}
        />
      </div>

      {/* Events Grid */}
      {!hasEvents ? (
        <div className="mt-6">
          <EventsSkeleton />
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-16 sm:py-20 text-center text-slate-500 text-lg">
          No events found for <span className="font-semibold">{selectedMonth}</span>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      )}

  
    </section>
  );
}