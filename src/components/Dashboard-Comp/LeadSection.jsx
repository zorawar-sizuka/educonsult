// // components/admin/LeadsSection.jsx (updated with CSV export & fixed bulk delete)
// "use client";

// import React, { useState, useEffect } from "react";
// import { Database, Mail, Users, Trash2, Download } from "lucide-react";
// import DataTable from "@/components/Dashboard-Comp/DataTable";
// import { formatDate, prettifyEnum } from "@/utils/helper";

// export default function LeadsSection() {
//   const [dashboardData, setDashboardData] = useState({
//     bookings: [],
//     inquiries: [],
//     contacts: [],
//     registrations: [],
//     subscribers: [],
//   });

//   const [selected, setSelected] = useState({
//     bookings: [],
//     inquiries: [],
//     contacts: [],
//     registrations: [],
//     subscribers: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const dataRes = await fetch("/api/admin/data");
//         if (!dataRes.ok) throw new Error("Failed to fetch data");
//         const dataJson = await dataRes.json();

//         setDashboardData({
//           bookings: dataJson.bookings || [],
//           inquiries: dataJson.inquiries || [],
//           contacts: dataJson.contacts || [],
//           registrations: dataJson.registrations || [],
//           subscribers: dataJson.subscribers || [],
//         });
//       } catch (e) {
//         console.error("Leads Data Fetch Error:", e);
//         setError(e.message || "Failed to load leads data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // --- CHECKBOX LOGIC ---
//   const toggleSelection = (type, id) => {
//     setSelected((prev) => ({
//       ...prev,
//       [type]: prev[type].includes(id)
//         ? prev[type].filter((x) => x !== id)
//         : [...prev[type], id],
//     }));
//   };

//   const toggleAll = (type, allIds) => {
//     setSelected((prev) => {
//       const allSelected = allIds.every((id) => prev[type].includes(id));
//       return { ...prev, [type]: allSelected ? [] : allIds };
//     });
//   };

//   // --- BULK ACTION LOGIC ---
//   const handleBulkDelete = async (type, ids) => {
//     if (ids.length === 0 || !confirm(`Delete ${ids.length} selected ${type}?`)) return;

//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/admin/bulk", { // Updated to new bulk endpoint
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, ids }),
//       });
//       if (!res.ok) throw new Error("Failed to delete items");

//       // Refetch data
//       const dataRes = await fetch("/api/admin/data");
//       if (!dataRes.ok) throw new Error("Failed to refetch data");
//       const dataJson = await dataRes.json();

//       setDashboardData({
//         bookings: dataJson.bookings || [],
//         inquiries: dataJson.inquiries || [],
//         contacts: dataJson.contacts || [],
//         registrations: dataJson.registrations || [],
//         subscribers: dataJson.subscribers || [],
//       });

//       // Clear selections
//       setSelected((prev) => ({ ...prev, [type]: [] }));
//     } catch (e) {
//       console.error(`Bulk Delete Error for ${type}:`, e);
//       setError(e.message || "Failed to delete selected items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- BULK CSV EXPORT ---
//   const handleBulkExport = (type, data, columns, mapper) => {
//     const exportData = selected[type].length > 0 
//       ? data.filter(item => selected[type].includes(item.id)) 
//       : data;

//     if (exportData.length === 0) {
//       alert('No data to export');
//       return;
//     }

//     // Generate CSV
//     let csv = columns.join(',') + '\n';
//     exportData.forEach(item => {
//       const row = mapper(item).map(field => 
//         typeof field === 'string' ? `"${field.replace(/"/g, '""')}"` : field
//       ).join(',');
//       csv += row + '\n';
//     });

//     // Download
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   // Inquiries mapper helper (handles array filtering)
//   const inquiriesMapper = (item) => [
//     item.name,
//     formatDate(item.createdAt),
//     item.destination,
//     [item.gpa ? `GPA: ${item.gpa}` : null, item.englishScore, item.course]
//       .filter(Boolean)
//       .join(" | "),
//   ];

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">Loading leads...</div>;
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

//   const sections = [
//     {
//       type: "bookings",
//       title: "Recent Bookings",
//       icon: Database,
//       data: dashboardData.bookings,
//       columns: ["Name", "Email", "Phone", "Date", "Message"],
//       mapper: (item) => [
//         item.name,
//         item.email,
//         item.phone || "-",
//         formatDate(item.date),
//         item.message || "-",
//       ],
//     },
//     {
//       type: "inquiries",
//       title: "Inquiry Leads",
//       icon: Database,
//       data: dashboardData.inquiries,
//       columns: ["Name", "Date", "Destination", "Stats (GPA/Eng/Course)"],
//       mapper: inquiriesMapper,
//     },
//     {
//       type: "contacts",
//       title: "Recent Contacts",
//       icon: Mail,
//       data: dashboardData.contacts,
//       columns: ["Name", "Email", "Service", "Message", "Created"],
//       mapper: (item) => [
//         item.fullName,
//         item.email,
//         prettifyEnum(item.service),
//         item.message || "-",
//         formatDate(item.createdAt),
//       ],
//     },
//     {
//       type: "registrations",
//       title: "Event Registrations",
//       icon: Users,
//       data: dashboardData.registrations,
//       columns: ["Name", "Email", "Date", "Event", "Visitors"],
//       mapper: (item) => [
//         item.name,
//         item.email,
//         formatDate(item.createdAt),
//         item.eventName,
//         item.visitors,
//       ],
//     },
//     {
//       type: "subscribers",
//       title: "Newsletter Subscribers",
//       icon: Mail,
//       data: dashboardData.subscribers,
//       columns: ["Email", "Joined"],
//       mapper: (item) => [item.email, formatDate(item.createdAt)],
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {sections.map((section) => {
//         const { type, title, icon, data, columns, mapper } = section;
//         const selectedIds = selected[type];
//         const allIds = data.map((item) => item.id); // Assume each item has 'id'

//         return (
//           <div key={type} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
//             {/* Bulk Actions Bar */}
//             {selectedIds.length > 0 && (
//               <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 gap-2">
//                 <span className="text-sm text-blue-800 text-center sm:text-left">
//                   {selectedIds.length} {type} selected
//                 </span>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <button
//                     onClick={() => handleBulkExport(type, data, columns, mapper)}
//                     className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition"
//                   >
//                     <Download className="w-4 h-4" />
//                     Export CSV
//                   </button>
//                   <button
//                     onClick={() => handleBulkDelete(type, selectedIds)}
//                     disabled={loading}
//                     className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 disabled:opacity-60 transition"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete Selected
//                   </button>
//                 </div>
//               </div>
//             )}

//             <DataTable
//               title={title}
//               icon={icon}
//               data={data}
//               columns={columns}
//               mapper={mapper}
//               selectedIds={selectedIds}
//               onToggle={(id) => toggleSelection(type, id)}
//               onToggleAll={(ids) => toggleAll(type, ids)}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// } 












"use client";

import React, { useState, useEffect } from "react";
import { Database, Mail, Users, Trash2, Download, AlertCircle, RefreshCw } from "lucide-react";
import DataTable from "@/components/Dashboard-Comp/DataTable";
import { formatDate, prettifyEnum } from "@/utils/helper";

// Reusable Skeleton Row
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-4"><div className="h-4 w-3/4 bg-slate-200 rounded"></div></td>
    <td className="p-4"><div className="h-4 w-1/2 bg-slate-200 rounded"></div></td>
    <td className="p-4"><div className="h-4 w-2/3 bg-slate-200 rounded"></div></td>
    <td className="p-4"><div className="h-4 w-1/3 bg-slate-200 rounded"></div></td>
    <td className="p-4"><div className="h-4 w-1/4 bg-slate-200 rounded"></div></td>
  </tr>
);

// Reusable Loading Section (with min time + skeleton)
const LoadingSection = ({ title, icon: Icon, columns }) => {
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1500); // 1.5s minimum loader
    return () => clearTimeout(timer);
  }, []);

  if (!minTimePassed) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon className="w-6 h-6 text-slate-400" />
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-500">Loading {title.toLowerCase()}...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-slate-400" />
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 text-left text-sm font-semibold text-slate-600">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Error Section (per table)
const ErrorSection = ({ title, icon: Icon, error, onRetry }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 text-center">
    <div className="flex flex-col items-center gap-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <h3 className="text-xl font-bold text-slate-800">{title} Failed</h3>
      <p className="text-slate-600 max-w-md">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        <RefreshCw className="w-5 h-5" />
        Retry
      </button>
    </div>
  </div>
);

export default function LeadsSection() {
  // Data & Selection State (per table)
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    inquiries: [],
    contacts: [],
    registrations: [],
    subscribers: [],
  });

  const [selected, setSelected] = useState({
    bookings: [],
    inquiries: [],
    contacts: [],
    registrations: [],
    subscribers: [],
  });

  // Per-table loading & error states
  const [loadStates, setLoadStates] = useState({
    bookings: { loading: true, error: null },
    inquiries: { loading: true, error: null },
    contacts: { loading: true, error: null },
    registrations: { loading: true, error: null },
    subscribers: { loading: true, error: null },
  });

  // Fetch all data once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRes = await fetch("/api/admin/data");
        if (!dataRes.ok) throw new Error("Failed to fetch admin data");

        const dataJson = await dataRes.json();

        setDashboardData({
          bookings: dataJson.bookings || [],
          inquiries: dataJson.inquiries || [],
          contacts: dataJson.contacts || [],
          registrations: dataJson.registrations || [],
          subscribers: dataJson.subscribers || [],
        });

        // Clear all loading states on success
        setLoadStates({
          bookings: { loading: false, error: null },
          inquiries: { loading: false, error: null },
          contacts: { loading: false, error: null },
          registrations: { loading: false, error: null },
          subscribers: { loading: false, error: null },
        });
      } catch (err) {
        console.error("Leads Data Fetch Error:", err);
        const errorMsg = err.message || "Failed to load leads data";

        // Set error on all tables (or you can be more granular if API supports per-type errors)
        setLoadStates({
          bookings: { loading: false, error: errorMsg },
          inquiries: { loading: false, error: errorMsg },
          contacts: { loading: false, error: errorMsg },
          registrations: { loading: false, error: errorMsg },
          subscribers: { loading: false, error: errorMsg },
        });
      }
    };

    fetchData();
  }, []);

  // Toggle single checkbox
  const toggleSelection = (type, id) => {
    setSelected((prev) => ({
      ...prev,
      [type]: prev[type].includes(id)
        ? prev[type].filter((x) => x !== id)
        : [...prev[type], id],
    }));
  };

  // Toggle all checkboxes in a table
  const toggleAll = (type, allIds) => {
    setSelected((prev) => {
      const allSelected = allIds.every((id) => prev[type].includes(id));
      return { ...prev, [type]: allSelected ? [] : allIds };
    });
  };

  // Bulk delete for a specific type
  const handleBulkDelete = async (type, ids) => {
    if (ids.length === 0 || !confirm(`Delete ${ids.length} selected ${type}?`)) return;

    setLoadStates((prev) => ({ ...prev, [type]: { loading: true, error: null } }));

    try {
      const res = await fetch("/api/admin/bulk", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ids }),
      });

      if (!res.ok) throw new Error("Bulk delete failed");

      // Refetch all data to reflect changes
      const dataRes = await fetch("/api/admin/data");
      if (!dataRes.ok) throw new Error("Failed to refetch data");
      const dataJson = await dataRes.json();

      setDashboardData({
        bookings: dataJson.bookings || [],
        inquiries: dataJson.inquiries || [],
        contacts: dataJson.contacts || [],
        registrations: dataJson.registrations || [],
        subscribers: dataJson.subscribers || [],
      });

      // Clear selection for this type
      setSelected((prev) => ({ ...prev, [type]: [] }));
    } catch (err) {
      console.error(`Bulk Delete Error for ${type}:`, err);
      setLoadStates((prev) => ({
        ...prev,
        [type]: { loading: false, error: err.message || "Failed to delete items" },
      }));
    }
  };

  // Bulk CSV export (unchanged logic)
  const handleBulkExport = (type, data, columns, mapper) => {
    const exportData = selected[type].length > 0
      ? data.filter((item) => selected[type].includes(item.id))
      : data;

    if (exportData.length === 0) {
      alert("No data to export");
      return;
    }

    let csv = columns.join(",") + "\n";
    exportData.forEach((item) => {
      const row = mapper(item).map((field) =>
        typeof field === "string" ? `"${field.replace(/"/g, '""')}"` : field
      ).join(",");
      csv += row + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Inquiries mapper (unchanged)
  const inquiriesMapper = (item) => [
    item.name,
    formatDate(item.createdAt),
    item.destination,
    [item.gpa ? `GPA: ${item.gpa}` : null, item.englishScore, item.course]
      .filter(Boolean)
      .join(" | "),
  ];

  const sections = [
    {
      type: "bookings",
      title: "Recent Bookings",
      icon: Database,
      data: dashboardData.bookings,
      columns: ["Name", "Email", "Phone", "Date", "Message"],
      mapper: (item) => [
        item.name,
        item.email,
        item.phone || "-",
        formatDate(item.date),
        item.message || "-",
      ],
    },
    {
      type: "inquiries",
      title: "Inquiry Leads",
      icon: Database,
      data: dashboardData.inquiries,
      columns: ["Name", "Date", "Destination", "Stats (GPA/Eng/Course)"],
      mapper: inquiriesMapper,
    },
    {
      type: "contacts",
      title: "Recent Contacts",
      icon: Mail,
      data: dashboardData.contacts,
      columns: ["Name", "Email", "Service", "Message", "Created"],
      mapper: (item) => [
        item.fullName,
        item.email,
        prettifyEnum(item.service),
        item.message || "-",
        formatDate(item.createdAt),
      ],
    },
    {
      type: "registrations",
      title: "Event Registrations",
      icon: Users,
      data: dashboardData.registrations,
      columns: ["Name", "Email", "Date", "Event", "Visitors"],
      mapper: (item) => [
        item.name,
        item.email,
        formatDate(item.createdAt),
        item.eventName,
        item.visitors,
      ],
    },
    {
      type: "subscribers",
      title: "Newsletter Subscribers",
      icon: Mail,
      data: dashboardData.subscribers,
      columns: ["Email", "Joined"],
      mapper: (item) => [item.email, formatDate(item.createdAt)],
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const { type, title, icon: Icon, data, columns, mapper } = section;
        const { loading, error } = loadStates[type];
        const selectedIds = selected[type];
        const allIds = data.map((item) => item.id);

        return (
          <div key={type} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            {/* Bulk Actions Bar - only show when loaded and has selection */}
            {!loading && !error && selectedIds.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 gap-2">
                <span className="text-sm text-blue-800 text-center sm:text-left">
                  {selectedIds.length} {type} selected
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleBulkExport(type, data, columns, mapper)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                  <button
                    onClick={() => handleBulkDelete(type, selectedIds)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Selected
                  </button>
                </div>
              </div>
            )}

            {/* Loading / Error / Data States */}
            {loading ? (
              <LoadingSection title={title} icon={Icon} columns={columns} />
            ) : error ? (
              <ErrorSection
                title={title}
                icon={Icon}
                error={error}
                onRetry={() => {
                  setLoadStates((prev) => ({ ...prev, [type]: { loading: true, error: null } }));
                  // Trigger full refetch (you can make per-table fetch if needed)
                  window.location.reload(); // Simple retry - or implement per-table refetch
                }}
              />
            ) : (
              <DataTable
                title={title}
                icon={Icon}
                data={data}
                columns={columns}
                mapper={mapper}
                selectedIds={selectedIds}
                onToggle={(id) => toggleSelection(type, id)}
                onToggleAll={(ids) => toggleAll(type, ids)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}