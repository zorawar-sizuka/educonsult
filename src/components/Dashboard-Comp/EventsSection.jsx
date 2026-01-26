// components/admin/EventsSection.jsx (updated with full edit modal)
"use client";

import React, { useState, useEffect } from "react";
import { Trash2, UploadCloud, Edit2 } from "lucide-react";
import { formatDate } from "@/utils/helper";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    longDescription: "",
    imageUrl: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const eventsRes = await fetch("/api/admin/events");
        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        const eventsJson = await eventsRes.json();
        setEvents(Array.isArray(eventsJson) ? eventsJson : []);
      } catch (e) {
        console.error("Events Fetch Error:", e);
        setError(e.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // --- EVENT HANDLERS ---
  const handleImageDrop = (e, targetState, setTargetState) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setTargetState(prev => ({ ...prev, imageUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
      longDescription: "",
      imageUrl: "",
    });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      if (!res.ok) throw new Error("Failed to create event");

      resetNewEvent();

      // Refetch events
      const eventsRes = await fetch("/api/admin/events");
      if (!eventsRes.ok) throw new Error("Failed to refetch events");
      const eventsJson = await eventsRes.json();
      setEvents(Array.isArray(eventsJson) ? eventsJson : []);
    } catch (e) {
      console.error("Create Event Error:", e);
      setError(e.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingEvent.id, ...editingEvent }),
      });
      if (!res.ok) throw new Error("Failed to update event");

      setEditModalOpen(false);
      setEditingEvent(null);

      // Refetch events
      const eventsRes = await fetch("/api/admin/events");
      if (!eventsRes.ok) throw new Error("Failed to refetch events");
      const eventsJson = await eventsRes.json();
      setEvents(Array.isArray(eventsJson) ? eventsJson : []);
    } catch (e) {
      console.error("Update Event Error:", e);
      setError(e.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm("Delete event?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");

      // Refetch events
      const eventsRes = await fetch("/api/admin/events");
      if (!eventsRes.ok) throw new Error("Failed to refetch events");
      const eventsJson = await eventsRes.json();
      setEvents(Array.isArray(eventsJson) ? eventsJson : []);
    } catch (e) {
      console.error("Delete Event Error:", e);
      setError(e.message || "Failed to delete event");
    }
  };

  const openEditModal = (event) => {
    setEditingEvent({ ...event }); // Shallow copy for editing
    setEditModalOpen(true);
  };

  if (loading && events.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-center">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Add Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <input
                required
                placeholder="Event Title"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <select
                required
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm text-slate-600"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              >
                <option value="">Select Category...</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Networking">Networking</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input
                  required
                  type="date"
                  className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <input
                  required
                  placeholder="Time"
                  className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
              <input
                required
                placeholder="Location"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />

              <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-4 text-center hover:bg-slate-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageDrop(e, newEvent, setNewEvent)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold">
                    {newEvent.imageUrl ? "Image Selected" : "Drop image"}
                  </span>
                </div>
              </div>

              <textarea
                required
                placeholder="Short Description"
                rows="2"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />

              <textarea
                placeholder="Long Description (Modal)"
                rows="4"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={newEvent.longDescription}
                onChange={(e) => setNewEvent({ ...newEvent, longDescription: e.target.value })}
              />

              <button
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "+ Publish Event"}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          {events.length === 0 && !loading ? (
            <p className="text-slate-500 text-center py-8 col-span-full">No events yet. Create one above!</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start gap-4"
              >
                <div className="flex flex-1 gap-4">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex-shrink-0">
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        className="w-full h-full object-cover"
                        alt="Event"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 truncate">{event.title}</h3>
                    <p className="text-xs text-slate-500">
                      {formatDate(event.date)} • {event.category}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-2 text-blue-200 hover:text-blue-600"
                    title="Edit"
                    disabled={loading}
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 text-red-200 hover:text-red-600"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Edit Event</h2>
            <form onSubmit={handleUpdateEvent} className="space-y-3">
              <input
                required
                placeholder="Event Title"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={editingEvent.title || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
              />
              <select
                required
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm text-slate-600"
                value={editingEvent.category || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
              >
                <option value="">Select Category...</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Networking">Networking</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input
                  required
                  type="date"
                  className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                  value={editingEvent.date ? editingEvent.date.split('T')[0] : ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                />
                <input
                  required
                  placeholder="Time"
                  className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                  value={editingEvent.time || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                />
              </div>
              <input
                required
                placeholder="Location"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={editingEvent.location || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
              />

              <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-4 text-center hover:bg-slate-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageDrop(e, editingEvent, setEditingEvent)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold">
                    {editingEvent.imageUrl ? "Image Selected" : "Drop image"}
                  </span>
                </div>
              </div>

              <textarea
                required
                placeholder="Short Description"
                rows="2"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={editingEvent.description || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
              />

              <textarea
                placeholder="Long Description (Modal)"
                rows="4"
                className="w-full p-3 bg-slate-50 rounded-xl border text-sm"
                value={editingEvent.longDescription || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, longDescription: e.target.value })}
              />

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setEditModalOpen(false); setEditingEvent(null); }}
                  className="flex-1 py-3 bg-gray-300 text-gray-800 font-bold rounded-xl hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Update Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}