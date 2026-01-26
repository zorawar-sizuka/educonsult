// --- COMPONENT: DATA TABLE (SAFE) ---

import { CheckSquare, Download, Square } from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable"


export default function DataTable  ({
    title,
    icon: Icon,
    data,
    columns,
    mapper,
    selectedIds,
    onToggle,
    onToggleAll,
  })  { 
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