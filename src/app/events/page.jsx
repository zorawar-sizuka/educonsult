

import { Suspense } from "react";
import EventsHero from "./components/EventsHero";
import EventsGridServer from "./components/Eventsgrid.server";
import EventsGridSkeleton from "./components/EventsSkeleton"; // your skeleton UI
import NewsletterCTA from "./components/NewsLetter";

export default function EventsPage() {
  return (
    <>
      <EventsHero /> {/* renders instantly */}

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGridServer /> {/* streams in below */}
      </Suspense> 
    
        {/* Newsletter */}
        <div className="my-16 sm:my-20 lg:my-24 ">
        <NewsletterCTA />
      </div>
    </>
  );
}
