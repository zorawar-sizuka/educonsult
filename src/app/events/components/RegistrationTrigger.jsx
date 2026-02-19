// src/components/EventRegistrationTrigger.jsx
'use client';

import { useState } from 'react';
import RegistrationForm from './RegistrationForm'; // ← adjust path if needed

export default function EventRegistrationTrigger({ eventTitle }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm && (
        <RegistrationForm
          eventName={eventTitle}
          onClose={() => setShowForm(false)}
        />
      )}

      <button
        onClick={() => setShowForm(true)}
        className="inline-flex justify-center items-center px-7 py-3.5 rounded-xl text-base md:text-lg font-semibold text-white bg-[#3a56a4] hover:bg-[#2f4688] focus:ring-2 focus:ring-[#3a56a4]/40 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
      >
        Register for this event
      </button>
    </>
  );
}