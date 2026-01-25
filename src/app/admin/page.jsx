"use client";

import React, { useState, useEffect } from "react";
import {
  Database,
  Trash2,
  Download,
  UploadCloud,
  Users,
  Mail,
  CheckSquare,
  Square,
} from "lucide-react";
import Lottie from "lottie-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- HELPER: FORMAT DATE ---
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const prettifyEnum = (val) =>
  String(val || "")
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// --- HELPER: PDF GENERATOR ---
const generatePDF = (title, columns, data) => {
  const doc = new jsPDF();
  doc.text(title, 14, 20);

  const cleanData = (data || []).map((row) =>
    (row || []).map((cell) =>
      Array.isArray(cell) ? cell.join(", ") : cell ? String(cell) : "-"
    )
  );

  autoTable(doc, {
    startY: 30,
    head: [columns],
    body: cleanData,
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, "_")}.pdf`);
};

// --- COMPONENT: DATA TABLE (SAFE) ---
const DataTable = ({
  title,
  icon: Icon,
  data,
  columns,
  mapper,
  selectedIds,
  onToggle,
  onToggleAll,
}) => {
  const safeData = Array.isArray(data) ? data : [];
  const safeSelected = Array.isArray(selectedIds) ? selectedIds : [];

  const allIds = safeData.map((d) => d.id);
  const isAllSelected =
    allIds.length > 0 && allIds.every((id) => safeSelected.includes(id));

  const handleDownload = () => {
    const selectedData = safeData.filter((item) => safeSelected.includes(item.id));
    if (selectedData.length === 0)
      return alert("Select at least one row to download.");

    const mappedData = selectedData.map(mapper);
    generatePDF(title, columns, mappedData);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-slate-500" />
          <h2 className="font-bold text-slate-700">
            {title} ({safeData.length})
          </h2>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition"
        >
          <Download className="w-4 h-4" /> Download Selected PDF
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-50 font-bold">
            <tr>
              <th className="px-6 py-3 w-10">
                <button
                  onClick={() => onToggleAll(allIds)}
                  className="hover:text-slate-800"
                >
                  {isAllSelected ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {safeData.map((item) => {
              const isSelected = safeSelected.includes(item.id);
              const rowData = mapper(item);

              return (
                <tr
                  key={item.id}
                  className={`border-b border-slate-50 hover:bg-slate-50/50 ${
                    isSelected ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggle(item.id)}
                      className="hover:text-slate-800"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  </td>

                  {(rowData || []).map((cell, index) => (
                    <td key={index} className="px-6 py-4">
                      {Array.isArray(cell) ? (
                        <div className="flex flex-wrap gap-2">
                          {cell.length > 0 ? (
                            cell.map((stat, i) => {
                              let colorClass = "bg-slate-100 text-slate-600";
                              if (String(stat).includes("GPA"))
                                colorClass =
                                  "bg-emerald-100 text-emerald-700 border border-emerald-200";
                              else if (String(stat).match(/IELTS|PTE/i))
                                colorClass =
                                  "bg-blue-100 text-blue-700 border border-blue-200";
                              else
                                colorClass =
                                  "bg-purple-100 text-purple-700 border border-purple-200";

                              return (
                                <span
                                  key={i}
                                  className={`text-[10px] font-bold px-2 py-1 rounded-md ${colorClass}`}
                                >
                                  {stat}
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </div>
                      ) : (
                        <span
                          className={
                            index === 0
                              ? "font-bold text-slate-700"
                              : "text-slate-600"
                          }
                        >
                          {cell ?? "-"}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("leads");
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    inquiries: [],
    contacts: [],       // ✅ added
    registrations: [],
    subscribers: [],
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visitorCount, setVisitorCount] = useState(500);
  const [selected, setSelected] = useState({
    bookings: [],
    inquiries: [],
    contacts: [],       // ✅ added
    registrations: [],
    subscribers: [],
  });

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

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRes = await fetch("/api/admin/data");
        const dataJson = await dataRes.json();

        setDashboardData({
          bookings: dataJson.bookings || [],
          inquiries: dataJson.inquiries || [],
          contacts: dataJson.contacts || [], // ✅ added
          registrations: dataJson.registrations || [],
          subscribers: dataJson.subscribers || [],
        });

        const eventsRes = await fetch("/api/admin/events");
        const eventsJson = await eventsRes.json();
        setEvents(Array.isArray(eventsJson) ? eventsJson : []);
      } catch (e) {
        console.error("Dashboard Fetch Error:", e);
        // keep safe defaults
      }
    };

    fetchData();

    fetch("/lottie/dashboard.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie Load Error:", err));

    setVisitorCount(500 + Math.floor(Math.random() * 100));
  }, []);

  // --- CHECKBOX LOGIC ---
  const toggleSelection = (type, id) => {
    setSelected((prev) => ({
      ...prev,
      [type]: prev[type].includes(id)
        ? prev[type].filter((x) => x !== id)
        : [...prev[type], id],
    }));
  };

  const toggleAll = (type, allIds) => {
    setSelected((prev) => {
      const allSelected = allIds.every((id) => prev[type].includes(id));
      return { ...prev, [type]: allSelected ? [] : allIds };
    });
  };

  // --- EVENT HANDLERS ---
  const handleImageDrop = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setNewEvent({ ...newEvent, imageUrl: reader.result });
    reader.readAsDataURL(file);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/admin/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
    });

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

    const eventsRes = await fetch("/api/admin/events");
    const eventsJson = await eventsRes.json();
    setEvents(Array.isArray(eventsJson) ? eventsJson : []);
    setLoading(false);
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm("Delete event?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });

    const eventsRes = await fetch("/api/admin/events");
    const eventsJson = await eventsRes.json();
    setEvents(Array.isArray(eventsJson) ? eventsJson : []);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* LOTTIE HERO SECTION */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center my-18">
            <div className="w-[60%] ">
              {animationData && (
                <Lottie classID="aspect-square" animationData={animationData} loop={true} />
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mt-4 tracking-tight">
              <span className="text-blue-600 italic">Dashboard</span>
            </h1>
            <p className="text-slate-500 max-w-xl">
              Smart tools for smart students. Real-time data, instant validation, and PDF generation.
            </p>
          </div>

          {/* TABS */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-serif text-slate-900">Admin Dashboard</h1>
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                  activeTab === "leads"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-500"
                }`}
              >
                Leads & Data
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                  activeTab === "events"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-500"
                }`}
              >
                Events CMS
              </button>
            </div>
          </div>

          {/* === TAB 1: LEADS & DATA === */}
          {activeTab === "leads" && (
            <div>
              {/* 1. BOOKINGS */}
              <DataTable
                title="Recent Bookings"
                icon={Database}
                data={dashboardData.bookings}
                columns={["Name", "Email", "Phone", "Date", "Message"]}
                mapper={(item) => [
                  item.name,
                  item.email,
                  item.phone || "-",
                  formatDate(item.date),
                  item.message || "-",
                ]}
                selectedIds={selected.bookings}
                onToggle={(id) => toggleSelection("bookings", id)}
                onToggleAll={(ids) => toggleAll("bookings", ids)}
              />

              {/* 2. INQUIRIES */}
              <DataTable
                title="Inquiry Leads"
                icon={Database}
                data={dashboardData.inquiries}
                columns={["Name", "Date", "Destination", "Stats (GPA/Eng/Course)"]}
                mapper={(item) => [
                  item.name,
                  formatDate(item.createdAt),
                  item.destination,
                  [item.gpa ? `GPA: ${item.gpa}` : null, item.englishScore, item.course].filter(Boolean),
                ]}
                selectedIds={selected.inquiries}
                onToggle={(id) => toggleSelection("inquiries", id)}
                onToggleAll={(ids) => toggleAll("inquiries", ids)}
              />

              {/* 3. CONTACTS */}
              <DataTable
                title="Recent Contacts"
                icon={Mail}
                data={dashboardData.contacts}
                columns={["Name", "Email", "Service", "Message", "Created"]}
                mapper={(item) => [
                  item.fullName,
                  item.email,
                  prettifyEnum(item.service),
                  item.message || "-",
                  formatDate(item.createdAt),
                ]}
                selectedIds={selected.contacts}
                onToggle={(id) => toggleSelection("contacts", id)}
                onToggleAll={(ids) => toggleAll("contacts", ids)}
              />

              {/* 4. EVENT REGISTRATIONS */}
              <DataTable
                title="Event Registrations"
                icon={Users}
                data={dashboardData.registrations}
                columns={["Name", "Email", "Date", "Event", "Visitors"]}
                mapper={(item) => [
                  item.name,
                  item.email,
                  formatDate(item.createdAt),
                  item.eventName,
                  item.visitors,
                ]}
                selectedIds={selected.registrations}
                onToggle={(id) => toggleSelection("registrations", id)}
                onToggleAll={(ids) => toggleAll("registrations", ids)}
              />

              {/* 5. SUBSCRIBERS */}
              <DataTable
                title="Newsletter Subscribers"
                icon={Mail}
                data={dashboardData.subscribers}
                columns={["Email", "Joined"]}
                mapper={(item) => [item.email, formatDate(item.createdAt)]}
                selectedIds={selected.subscribers}
                onToggle={(id) => toggleSelection("subscribers", id)}
                onToggleAll={(ids) => toggleAll("subscribers", ids)}
              />
            </div>
          )}

          {/* === TAB 2: EVENTS CMS === */}
          {activeTab === "events" && (
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
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
                        onChange={handleImageDrop}
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
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-start"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            className="w-full h-full object-cover"
                            alt="Event"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{event.title}</h3>
                        <p className="text-xs text-slate-500">
                          {formatDate(event.date)} • {event.category}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-2 text-red-200 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
