// // components/admin/EventsSection.jsx (updated with full edit modal)
// "use client";

// import React, { useState, useEffect } from "react";
// import { Trash2, UploadCloud, Edit2 } from "lucide-react";
// import { formatDate } from "@/utils/helper";

// export default function EventsSection() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     category: "",
//     date: "",
//     time: "",
//     location: "",
//     description: "",
//     longDescription: "",
//     imageUrl: "",
//     isPublished: false,
//   });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editingEvent, setEditingEvent] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const eventsRes = await fetch("/api/admin/events");
//         if (!eventsRes.ok) throw new Error("Failed to fetch events");
//         const eventsJson = await eventsRes.json();
//         setEvents(Array.isArray(eventsJson) ? eventsJson : []);
//       } catch (e) {
//         console.error("Events Fetch Error:", e);
//         setError(e.message || "Failed to load events");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // --- EVENT HANDLERS ---
//   const handleImageDrop = async (e, targetState, setTargetState) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
  
//     // 1) instant preview (same UX)
//     const preview = URL.createObjectURL(file);
//     setTargetState((prev) => ({ ...prev, imageUrl: preview }));
  
//     try {
//       // 2) upload
//       const fd = new FormData();
//       fd.append("file", file);
  
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: fd,
//       });
  
//       const json = await res.json();
//       if (!res.ok || !json?.ok) throw new Error(json?.error || "Upload failed");
  
//       // 3) replace preview with stored URL
//       setTargetState((prev) => ({ ...prev, imageUrl: json.url }));
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       // keep preview so admin isn't blocked; but warn
//       alert("Image upload failed. Please try again.");
//     }
//   };
  

//   const handleCreateEvent = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/admin/events", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newEvent),
//       });
//       if (!res.ok) throw new Error("Failed to create event");


//       // Refetch events
//       const eventsRes = await fetch("/api/admin/events");
//       if (!eventsRes.ok) throw new Error("Failed to refetch events");
//       const eventsJson = await eventsRes.json();
//       setEvents(Array.isArray(eventsJson) ? eventsJson : []);
//     } catch (e) {
//       console.error("Create Event Error:", e);
//       setError(e.message || "Failed to create event");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateEvent = async (e) => {
//     e.preventDefault();
//     if (!editingEvent) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/admin/events", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: editingEvent.id, ...editingEvent }),
//       });
//       if (!res.ok) throw new Error("Failed to update event");

//       setEditModalOpen(false);
//       setEditingEvent(null);

//       // Refetch events
//       const eventsRes = await fetch("/api/admin/events");
//       if (!eventsRes.ok) throw new Error("Failed to refetch events");
//       const eventsJson = await eventsRes.json();
//       setEvents(Array.isArray(eventsJson) ? eventsJson : []);
//     } catch (e) {
//       console.error("Update Event Error:", e);
//       setError(e.message || "Failed to update event");
//     } finally {
//       setLoading(false);
//     }
//   };









  
//   const handleDeleteEvent = async (id) => {
//     if (!confirm("Delete event?")) return;
//     setError(null);
//     try {
//       const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete event");

//       // Refetch events
//       const eventsRes = await fetch("/api/admin/events");
//       if (!eventsRes.ok) throw new Error("Failed to refetch events");
//       const eventsJson = await eventsRes.json();
//       setEvents(Array.isArray(eventsJson) ? eventsJson : []);
//     } catch (e) {
//       console.error("Delete Event Error:", e);
//       setError(e.message || "Failed to delete event");
//     }
//   };

//   const openEditModal = (event) => {
//     setEditingEvent({ ...event }); // Shallow copy for editing
//     setEditModalOpen(true);
//   };

//   if (loading && events.length === 0) {
//     return <div className="flex justify-center items-center h-64">Loading events...</div>;
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-center">
//         <p>Error: {error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8"> 





//         <div className="lg:col-span-4">
//           <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
//           <div className="flex items-center justify-between mb-4">
//   <h2 className="text-lg font-bold text-slate-800">Add Event</h2>

//   <button
//     type="button"
//     onClick={() => setNewEvent({ ...newEvent, isPublished: !newEvent.isPublished })}
//     className={`px-3 py-1.5 rounded-full text-xs font-bold border transition
//       ${newEvent.isPublished
//         ? "bg-emerald-600 text-white border-emerald-600"
//         : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
//       }`}
//     title="Controls whether this event is visible on the public /events page"
//   >
//     {newEvent.isPublished ? "Published" : "Draft"}
//   </button>
// </div>

//             <form onSubmit={handleCreateEvent} className="space-y-3">
//               <input
//                 required
//                 placeholder="Event Title"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={newEvent.title}
//                 onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//               />
//               <select
//                 required
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm text-slate-600"
//                 value={newEvent.category}
//                 onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
//               >
//                 <option value="">Select Category...</option>
//                 <option value="Exhibition">Exhibition</option>
//                 <option value="Workshop">Workshop</option>
//                 <option value="Seminar">Seminar</option>
//                 <option value="Webinar">Webinar</option>
//                 <option value="Networking">Networking</option>
//               </select>
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   required
//                   type="date"
//                   className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                   value={newEvent.date}
//                   onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//                 />
//                 <input
//                   required
//                   placeholder="Time"
//                   className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                   value={newEvent.time}
//                   onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
//                 />
//               </div>
//               <input
//                 required
//                 placeholder="Location"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={newEvent.location}
//                 onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
//               />

//               <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-4 text-center hover:bg-slate-100 transition">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageDrop(e, newEvent, setNewEvent)}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//                 <div className="flex flex-col items-center justify-center text-slate-500">
//                   <UploadCloud className="w-8 h-8 mb-2" />
//                   <span className="text-xs font-bold">
//                     {newEvent.imageUrl ? "Image Selected" : "Drop image"}
//                   </span>
//                 </div>
//               </div>

//               <textarea
//                 required
//                 placeholder="Short Description"
//                 rows="2"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={newEvent.description}
//                 onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//               />

//               <textarea
//                 placeholder="Long Description (Modal)"
//                 rows="4"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={newEvent.longDescription}
//                 onChange={(e) => setNewEvent({ ...newEvent, longDescription: e.target.value })}
//               />

//               <button
//                 disabled={loading}
//                 className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
//               >
//                {loading ? "Saving..." : newEvent.isPublished ? "+ Publish Event" : "+ Save Draft"}

//               </button>
//             </form>
//           </div> 
//         </div>







//         <div className="lg:col-span-8 space-y-4">
//           {events.length === 0 && !loading ? (
//             <p className="text-slate-500 text-center py-8 col-span-full">No events yet. Create one above!</p>
//           ) : (
//             events.map((event) => (
//               <div
//                 key={event.id}
//                 className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start gap-4"
//               >
//                 <div className="flex flex-1 gap-4">
//                   <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex-shrink-0">
//                     {event.imageUrl && (
//                       <img
//                         src={event.imageUrl}
//                         className="w-full h-full object-cover"
//                         alt="Event"
//                       />
//                     )}
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <h3 className="font-bold text-slate-900 truncate">{event.title}</h3>
//                     <p className="text-xs text-slate-500">
//                       {formatDate(event.date)} • {event.category}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 self-start sm:self-auto">
//                   <button
//                     onClick={() => openEditModal(event)}
//                     className="p-2 text-blue-200 hover:text-blue-600"
//                     title="Edit"
//                     disabled={loading}
//                   >
//                     <Edit2 className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteEvent(event.id)}
//                     className="p-2 text-red-200 hover:text-red-600"
//                     disabled={loading}
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {editModalOpen && editingEvent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
//           <div className="flex items-center justify-between mb-4">
//   <h2 className="text-lg font-bold text-slate-800">Edit Event</h2>

//   <button
//     type="button"
//     onClick={() =>
//       setEditingEvent({ ...editingEvent, isPublished: !editingEvent.isPublished })
//     }
//     className={`px-3 py-1.5 rounded-full text-xs font-bold border transition
//       ${editingEvent.isPublished
//         ? "bg-emerald-600 text-white border-emerald-600"
//         : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
//       }`}
//     title="Controls whether this event is visible on the public /events page"
//   >
//     {editingEvent.isPublished ? "Published" : "Draft"}
//   </button>
// </div>

//             <form onSubmit={handleUpdateEvent} className="space-y-3">
//               <input
//                 required
//                 placeholder="Event Title"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={editingEvent.title || ""}
//                 onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
//               />
//               <select
//                 required
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm text-slate-600"
//                 value={editingEvent.category || ""}
//                 onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
//               >
//                 <option value="">Select Category...</option>
//                 <option value="Exhibition">Exhibition</option>
//                 <option value="Workshop">Workshop</option>
//                 <option value="Seminar">Seminar</option>
//                 <option value="Webinar">Webinar</option>
//                 <option value="Networking">Networking</option>
//               </select>
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   required
//                   type="date"
//                   className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                   value={editingEvent.date ? editingEvent.date.split('T')[0] : ""}
//                   onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
//                 />
//                 <input
//                   required
//                   placeholder="Time"
//                   className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                   value={editingEvent.time || ""}
//                   onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
//                 />
//               </div>
//               <input
//                 required
//                 placeholder="Location"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={editingEvent.location || ""}
//                 onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
//               />

//               <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-4 text-center hover:bg-slate-100 transition">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageDrop(e, editingEvent, setEditingEvent)}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//                 <div className="flex flex-col items-center justify-center text-slate-500">
//                   <UploadCloud className="w-8 h-8 mb-2" />
//                   <span className="text-xs font-bold">
//                     {editingEvent.imageUrl ? "Image Selected" : "Drop image"}
//                   </span>
//                 </div>
//               </div>

//               <textarea
//                 required
//                 placeholder="Short Description"
//                 rows="2"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={editingEvent.description || ""}
//                 onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
//               />

//               <textarea
//                 placeholder="Long Description (Modal)"
//                 rows="4"
//                 className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
//                 value={editingEvent.longDescription || ""}
//                 onChange={(e) => setEditingEvent({ ...editingEvent, longDescription: e.target.value })}
//               />

//               <div className="flex gap-2 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => { setEditModalOpen(false); setEditingEvent(null); }}
//                   className="flex-1 py-3 bg-gray-300 text-gray-800 font-bold rounded-xl hover:bg-gray-400 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   disabled={loading}
//                   className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
//                 >
//                   {loading ? "Saving..." : "Update Event"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div> 








//       )}
//     </>
//   );
// } 













// components/admin/EventsSection.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Trash2, UploadCloud, Edit2, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { formatDate } from "@/utils/helper";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    longDescription: "",
    imageUrl: "",
    isPublished: false,
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const json = await res.json();
      setEvents(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error("Events fetch error:", err);
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload (Vercel Blob) - shared for new + edit
  const handleImageUpload = async (e, setStateFn) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant preview
    const previewUrl = URL.createObjectURL(file);
    setStateFn((prev) => ({ ...prev, imageUrl: previewUrl }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Upload failed");

      // Replace preview with permanent URL
      setStateFn((prev) => ({ ...prev, imageUrl: json.url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Using preview only.");
    }
  };

  // Create new event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError(null);

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to create event");
      }

      // Reset form
      setNewEvent({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        description: "",
        longDescription: "",
        imageUrl: "",
        isPublished: false,
      });

      // Refetch events
      await fetchEvents();
    } catch (err) {
      console.error("Create event error:", err);
      setCreateError(err.message || "Failed to create event");
    } finally {
      setCreateLoading(false);
    }
  };

  // Update event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    setEditLoading(true);
    setEditError(null);

    try {
      const res = await fetch("/api/admin/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to update event");
      }

      setEditModalOpen(false);
      setEditingEvent(null);

      // Refetch events
      await fetchEvents();
    } catch (err) {
      console.error("Update event error:", err);
      setEditError(err.message || "Failed to update event");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete event
  const handleDeleteEvent = async (id) => {
    if (!confirm("Delete this event permanently?")) return;

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");

      // Refetch events
      await fetchEvents();
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete event");
    }
  };

  const openEditModal = (event) => {
    setEditingEvent({ ...event }); // Copy to avoid mutating original
    setEditModalOpen(true);
    setEditError(null);
  };

  // ── RENDER ──
  if (loading && events.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-800 font-medium mb-4">{error}</p>
        <button
          onClick={fetchEvents}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-5 h-5" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Create Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Event</h2>

              <button
                type="button"
                onClick={() => setNewEvent((prev) => ({ ...prev, isPublished: !prev.isPublished }))}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all
                  ${newEvent.isPublished
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                  }`}
                title="Toggle visibility on public /events page"
              >
                {newEvent.isPublished ? "Published" : "Draft"}
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <input
                required
                placeholder="Event Title *"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />

              <select
                required
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-slate-600"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              >
                <option value="">Select Category *</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Networking">Networking</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="date"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <input
                  required
                  placeholder="Time (e.g. 2:00 PM)"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>

              <input
                required
                placeholder="Location *"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />

              {/* Image Upload */}
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-6 text-center hover:bg-slate-100 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setNewEvent)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <UploadCloud className="w-10 h-10 mb-3 text-indigo-500" />
                  <span className="text-sm font-medium">
                    {newEvent.imageUrl ? "Image Selected (click to change)" : "Upload Event Image"}
                  </span>
                  {newEvent.imageUrl && (
                    <img
                      src={newEvent.imageUrl}
                      alt="Preview"
                      className="mt-4 max-h-32 rounded-lg shadow-sm object-cover"
                    />
                  )}
                </div>
              </div>

              <textarea
                required
                placeholder="Short Description *"
                rows="3"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />

              <textarea
                placeholder="Long Description (shown in modal)"
                rows="5"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={newEvent.longDescription}
                onChange={(e) => setNewEvent({ ...newEvent, longDescription: e.target.value })}
              />

              <button
                disabled={createLoading}
                className={`w-full py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2
                  ${createLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : newEvent.isPublished
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {createLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : newEvent.isPublished ? (
                  "+ Publish Event"
                ) : (
                  "+ Save Draft"
                )}
              </button>

              {createError && (
                <p className="text-red-600 text-sm text-center mt-2">{createError}</p>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: Events List */}
        <div className="lg:col-span-8 space-y-6">
          {events.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-8 text-center text-slate-500">
              No events yet. Create one using the form on the left!
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start gap-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-1 gap-5">
                  <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                          ${event.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                      >
                        {event.isPublished ? "Published" : "Draft"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(event.date)} • {event.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 truncate">{event.title}</h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{event.description}</p>
                  </div>
                </div>

                <div className="flex gap-3 self-start sm:self-center">
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-2.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Event"
                    disabled={loading}
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    title="Delete Event"
                    disabled={loading}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 pb-4 border-b">
              <h2 className="text-xl font-bold text-slate-800">Edit Event</h2>

              <button
                type="button"
                onClick={() =>
                  setEditingEvent((prev) => ({
                    ...prev,
                    isPublished: !prev.isPublished,
                  }))
                }
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all
                  ${editingEvent.isPublished
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                  }`}
                title="Toggle public visibility"
              >
                {editingEvent.isPublished ? "Published" : "Draft"}
              </button>
            </div>

            {editError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
                {editError}
              </div>
            )}

            <form onSubmit={handleUpdateEvent} className="space-y-5">
              <input
                required
                placeholder="Event Title *"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={editingEvent.title || ""}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
              />

              <select
                required
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-slate-600"
                value={editingEvent.category || ""}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, category: e.target.value })
                }
              >
                <option value="">Select Category *</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Networking">Networking</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="date"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  value={editingEvent.date ? editingEvent.date.split("T")[0] : ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, date: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Time (e.g. 2:00 PM)"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  value={editingEvent.time || ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, time: e.target.value })
                  }
                />
              </div>

              <input
                required
                placeholder="Location *"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={editingEvent.location || ""}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, location: e.target.value })
                }
              />

              {/* Image Upload */}
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-6 text-center hover:bg-slate-100 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setEditingEvent)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <UploadCloud className="w-10 h-10 mb-3 text-indigo-500" />
                  <span className="text-sm font-medium">
                    {editingEvent.imageUrl ? "Image Selected (click to change)" : "Upload or Update Image"}
                  </span>
                  {editingEvent.imageUrl && (
                    <img
                      src={editingEvent.imageUrl}
                      alt="Preview"
                      className="mt-4 max-h-40 rounded-lg shadow-sm object-cover"
                    />
                  )}
                </div>
              </div>

              <textarea
                required
                placeholder="Short Description *"
                rows="3"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={editingEvent.description || ""}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, description: e.target.value })
                }
              />

              <textarea
                placeholder="Long Description (shown in modal)"
                rows="5"
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={editingEvent.longDescription || ""}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, longDescription: e.target.value })
                }
              />

              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setEditModalOpen(false);
                    setEditingEvent(null);
                    setEditError(null);
                  }}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={editLoading}
                  className={`flex-1 py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2
                    ${editLoading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                >
                  {editLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Update Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}