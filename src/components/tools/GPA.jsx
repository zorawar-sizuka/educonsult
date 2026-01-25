'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Download, ArrowRightLeft, 
  CheckCircle2, FileText, ChevronRight, School 
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- NEB Official Data ---
const GRADING_SYSTEM = [
  { grade: "A+", gpaRange: [3.61, 4.00], gpaPoint: 4.0, interval: "90 - 100", remark: "Outstanding" },
  { grade: "A",  gpaRange: [3.21, 3.60], gpaPoint: 3.6, interval: "80 - 90",  remark: "Excellent" },
  { grade: "B+", gpaRange: [2.81, 3.20], gpaPoint: 3.2, interval: "70 - 80",  remark: "Very Good" },
  { grade: "B",  gpaRange: [2.41, 2.80], gpaPoint: 2.8, interval: "60 - 70",  remark: "Good" },
  { grade: "C+", gpaRange: [2.01, 2.40], gpaPoint: 2.4, interval: "50 - 60",  remark: "Above Average" },
  { grade: "C",  gpaRange: [1.61, 2.00], gpaPoint: 2.0, interval: "40 - 50",  remark: "Average" },
  { grade: "D+", gpaRange: [1.21, 1.60], gpaPoint: 1.6, interval: "30 - 40",  remark: "Below Average" },
  { grade: "D",  gpaRange: [0.81, 1.20], gpaPoint: 1.2, interval: "20 - 30",  remark: "Poor" },
  { grade: "E",  gpaRange: [0.00, 0.80], gpaPoint: 0.8, interval: "0 - 20",   remark: "Insufficient" },
];

const STREAMS = {
  science: {
    label: "Science",
    subjects: [
      { id: 'nep', name: 'Nepali', th: 75, pr: 25 },
      { id: 'eng', name: 'English', th: 75, pr: 25 },
      { id: 'math', name: 'Mathematics', th: 75, pr: 25 },
      { id: 'phy', name: 'Physics', th: 60, pr: 40 },
      { id: 'chem', name: 'Chemistry', th: 60, pr: 40 },
      { id: 'bio', name: 'Biology / Comp', th: 60, pr: 40 },
    ]
  },
  management: {
    label: "Management",
    subjects: [
      { id: 'nep', name: 'Nepali', th: 75, pr: 25 },
      { id: 'eng', name: 'English', th: 75, pr: 25 },
      { id: 'soc', name: 'Social Studies', th: 75, pr: 25 },
      { id: 'acc', name: 'Accountancy', th: 75, pr: 25 },
      { id: 'eco', name: 'Economics', th: 75, pr: 25 },
      { id: 'bus', name: 'Business Studies', th: 75, pr: 25 },
    ]
  }
};

export default function GPACalculator() {
  const [stream, setStream] = useState('science');
  const [mode, setMode] = useState('marksToGpa'); 
  const [marks, setMarks] = useState({});
  const [subjectGpas, setSubjectGpas] = useState({});
  const [result, setResult] = useState(null);

  // --- Logic ---
  const handleMarksChange = (id, type, val, max) => {
    if (val > max) return; 
    setMarks(prev => ({ ...prev, [`${id}_${type}`]: val }));
  };

  const handleGpaChange = (id, val) => {
    if (val > 4.0) return;
    setSubjectGpas(prev => ({ ...prev, [id]: val }));
  };

  const calculate = () => {
    const subjects = STREAMS[stream].subjects;

    if (mode === 'gpaToMarks') {
      let totalGPA = 0;
      let count = 0;
      const details = [];

      for (const sub of subjects) {
        const val = parseFloat(subjectGpas[sub.id]);
        if (isNaN(val)) continue;
        if (val < 0.8 || val > 4.0) {
          alert(`Subject GPA for ${sub.name} must be between 0.8 and 4.0`);
          return;
        }
        totalGPA += val;
        count++;

        const gradeInfo = GRADING_SYSTEM.find(r => val >= r.gpaRange[0] && val <= r.gpaRange[1]) || GRADING_SYSTEM[GRADING_SYSTEM.length - 1];
        details.push({
            name: sub.name,
            obtained: val.toFixed(2), 
            grade: gradeInfo.grade,
            remark: gradeInfo.remark
        });
      }

      if (count === 0) return;
      const avgGPA = totalGPA / count;
      const finalGrade = GRADING_SYSTEM.find(r => avgGPA >= r.gpaRange[0] && avgGPA <= r.gpaRange[1]) || GRADING_SYSTEM[GRADING_SYSTEM.length - 1];

      setResult({
        gpa: avgGPA.toFixed(2),
        grade: finalGrade.grade,
        percentage: `${finalGrade.interval}%`,
        remark: finalGrade.remark,
        details,
        mode
      });

    } else {
      let totalGP = 0;
      let totalObtained = 0;
      let totalFull = 0;

      const details = subjects.map(sub => {
        const th = parseFloat(marks[`${sub.id}_th`] || 0);
        const pr = parseFloat(marks[`${sub.id}_pr`] || 0);
        const total = th + pr;
        const full = sub.th + sub.pr;
        
        totalObtained += total;
        totalFull += full;

        const p = (total / full) * 100;
        let point = 0.8;
        if (p >= 90) point = 4.0;
        else if (p >= 80) point = 3.6;
        else if (p >= 70) point = 3.2;
        else if (p >= 60) point = 2.8;
        else if (p >= 50) point = 2.4;
        else if (p >= 40) point = 2.0;
        else if (p >= 30) point = 1.6;
        else if (p >= 20) point = 1.2;

        totalGP += point;
        return { name: sub.name, obtained: total, full, gp: point.toFixed(1) };
      });

      const finalGPA = totalGP / subjects.length;
      const percentage = (totalObtained / totalFull) * 100;
      const finalGrade = GRADING_SYSTEM.find(r => finalGPA >= r.gpaRange[0] && finalGPA <= r.gpaRange[1]) || GRADING_SYSTEM[GRADING_SYSTEM.length - 1];

      setResult({
        gpa: finalGPA.toFixed(2),
        grade: finalGrade.grade,
        percentage: `${percentage.toFixed(1)}%`,
        remark: finalGrade.remark,
        details,
        mode
      });
    }
  };

  // --- Professional PDF Generation ---
  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();

    // 1. BRAND HEADER (Dark Blue/Slate)
    doc.setFillColor(15, 23, 42); // Slate-900
    doc.rect(0, 0, 210, 45, 'F');
    
    // Logo Placeholder (Text based)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("ACADEMIC PROJECTION", 14, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184); // Slate-400
    doc.text("PROVISIONAL GRADE REPORT | NEB STANDARD", 14, 32);

    // Date/Time Right Aligned
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 196, 25, null, null, "right");
    doc.text(`Stream: ${STREAMS[stream].label}`, 196, 32, null, null, "right");

    // 2. STUDENT SUMMARY CARD
    const summaryY = 55;
    
    // Draw Box
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.setFillColor(248, 250, 252); // Slate-50
    doc.roundedRect(14, summaryY, 182, 35, 2, 2, 'FD');

    // Labels
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text("FINAL GPA", 24, summaryY + 12);
    doc.text("GRADE", 80, summaryY + 12);
    doc.text("PERCENTAGE", 120, summaryY + 12);
    doc.text("REMARK", 160, summaryY + 12);

    // Values
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42); // Slate-900
    
    doc.text(result.gpa, 24, summaryY + 22);
    doc.text(result.grade, 80, summaryY + 22);
    doc.text(result.percentage, 120, summaryY + 22);
    
    doc.setFontSize(12);
    doc.setTextColor(5, 150, 105); // Emerald-600
    doc.text(result.remark, 160, summaryY + 22);

    // 3. SUBJECT DETAILS TABLE
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("Subject Breakdown", 14, summaryY + 50);

    const subjectHeaders = mode === 'marksToGpa' 
        ? [['SUBJECT', 'FULL MARKS', 'OBTAINED', 'GPA POINT']] 
        : [['SUBJECT', 'INPUT GPA', 'ESTIMATED GRADE', 'VERDICT']];

    const subjectBody = result.details.map(d => 
        mode === 'marksToGpa' 
        ? [d.name, d.full, d.obtained, d.gp] 
        : [d.name, d.obtained, d.grade, d.remark]
    );

    autoTable(doc, {
        startY: summaryY + 55,
        head: subjectHeaders,
        body: subjectBody,
        theme: 'grid',
        headStyles: { 
            fillColor: [241, 245, 249], // Slate-100
            textColor: [71, 85, 105],   // Slate-600
            fontStyle: 'bold',
            lineWidth: 0
        },
        styles: {
            fontSize: 10,
            cellPadding: 6,
            lineColor: [226, 232, 240], // Slate-200
            textColor: [51, 65, 85]     // Slate-700
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255]
        }
    });

    // 4. NEB REFERENCE TABLE (Compact)
    const refY = doc.lastAutoTable.finalY + 15;
    
    // Check if new page is needed
    if (refY > 240) doc.addPage();

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("NEB Grading System Reference", 14, refY > 240 ? 20 : refY);
    
    const refBody = GRADING_SYSTEM.map(r => [r.grade, `${r.interval}%`, r.gpaPoint.toFixed(1), r.remark]);
    
    autoTable(doc, {
        startY: refY > 240 ? 25 : refY + 5,
        head: [['GRADE', 'PERCENTAGE INTERVAL', 'GPA POINT', 'DESCRIPTION']],
        body: refBody,
        theme: 'striped',
        headStyles: { 
            fillColor: [15, 23, 42], // Slate-900
            textColor: [255, 255, 255],
            fontSize: 8
        },
        styles: {
            fontSize: 8,
            cellPadding: 2,
        }
    });

    // 5. FOOTER
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // Slate-400
        doc.text("This document is a computer-generated estimate based on current NEB standards.", 14, 285);
        doc.text(`Page ${i} of ${pageCount}`, 196, 285, null, null, "right");
    }

    doc.save("NEB_Official_Result.pdf");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 md:p-8">
      
      {/* Header Bar */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
             <School className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">NEB GPA Projector</h1>
            <p className="text-slate-500 text-xs font-medium">Class 11/12 • Official 2080 Scale</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
           <button
             onClick={() => { setMode(prev => prev === 'marksToGpa' ? 'gpaToMarks' : 'marksToGpa'); setResult(null); }}
             style={{ backgroundColor: '#bbf250' }} 
             className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-slate-900 hover:brightness-105 transition-all shadow-sm"
           >
             <ArrowRightLeft className="w-4 h-4" />
             {mode === 'marksToGpa' ? 'Input: MARKS' : 'Input: GPA'}
           </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* INPUT SECTION */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex gap-2">
            {Object.keys(STREAMS).map(key => (
              <button
                key={key}
                onClick={() => { setStream(key); setResult(null); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                  stream === key 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {STREAMS[key].label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                 Subject Details
               </h3>
               {mode === 'gpaToMarks' && (
                 <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 px-2 py-1 rounded">
                   Range: 0.8 - 4.0
                 </span>
               )}
            </div>
            
            <div className="p-6 space-y-4">
              {STREAMS[stream].subjects.map((sub) => (
                <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center gap-4 py-2 border-b border-slate-50 last:border-0">
                  <div className="w-40 shrink-0 font-medium text-sm text-slate-700">{sub.name}</div>
                  
                  {mode === 'marksToGpa' ? (
                    <div className="flex gap-3 w-full">
                       <div className="relative w-full">
                         <input 
                           type="number" 
                           placeholder={sub.th} 
                           className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all font-mono"
                           onChange={(e) => handleMarksChange(sub.id, 'th', e.target.value, sub.th)}
                         />
                         <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-bold tracking-wider">TH</span>
                       </div>
                       <div className="relative w-full">
                         <input 
                           type="number" 
                           placeholder={sub.pr} 
                           className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all font-mono"
                           onChange={(e) => handleMarksChange(sub.id, 'pr', e.target.value, sub.pr)}
                         />
                         <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-bold tracking-wider">PR</span>
                       </div>
                    </div>
                  ) : (
                    <div className="w-full">
                       <input 
                         type="number" 
                         step="0.05"
                         placeholder="e.g. 3.6" 
                         className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#bbf250] focus:border-[#bbf250] focus:outline-none transition-all font-mono"
                         onChange={(e) => handleGpaChange(sub.id, e.target.value)}
                       />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 pt-0">
              <button 
                onClick={calculate}
                className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
              >
                Generate Result <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* OUTPUT SECTION */}
        <div className="lg:col-span-5 space-y-6">

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative overflow-hidden rounded-2xl border border-emerald-100 shadow-sm"
                style={{ backgroundColor: '#ecfdf5' }}
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-emerald-100/50 p-2 rounded-full backdrop-blur-sm">
                     <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>

                <div className="p-8">
                   <div className="text-emerald-800 text-[10px] font-bold uppercase tracking-widest mb-2">Calculated GPA</div>
                   <div className="text-6xl font-extrabold text-emerald-950 mb-8 tracking-tighter">{result.gpa}</div>
                   
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-emerald-100/50">
                         <div className="text-[10px] text-emerald-700 font-bold uppercase mb-1">Percentage</div>
                         <div className="text-xl font-bold text-emerald-900">{result.percentage}</div>
                      </div>
                      <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-emerald-100/50">
                         <div className="text-[10px] text-emerald-700 font-bold uppercase mb-1">Grade</div>
                         <div className="text-xl font-bold text-emerald-900">{result.grade}</div>
                      </div>
                   </div>
                   
                   <div className="flex items-start gap-3 mb-8 bg-emerald-100/30 p-4 rounded-xl border border-emerald-100/50">
                      <div className="mt-0.5"><FileText className="w-4 h-4 text-emerald-700" /></div>
                      <div className="text-sm text-emerald-900 leading-snug">
                        <span className="font-bold">Verdict: {result.remark}</span><br/>
                        <span className="opacity-70 text-xs">Based on 2080 NEB Grading Standards.</span>
                      </div>
                   </div>

                   <button 
                     onClick={downloadPDF}
                     className="w-full py-4 rounded-xl font-bold text-sm text-emerald-950 bg-emerald-300/80 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
                   >
                     <Download className="w-4 h-4" /> Download Official Report
                   </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50">
                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-5">
                    <Calculator className="w-6 h-6 text-slate-300" />
                 </div>
                 <h4 className="text-slate-900 font-semibold">Ready to Project</h4>
                 <p className="text-slate-500 text-sm mt-2 max-w-[240px] leading-relaxed">
                    Enter your internal or final marks on the left to generate an official-style GPA report.
                 </p>
              </div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wide">Grading Reference</span>
                <span className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded shadow-sm">NEB 2080</span>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead>
                   <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase tracking-wider">
                     <th className="font-bold p-3">Grade</th>
                     <th className="font-bold p-3">GPA Point</th>
                     <th className="font-bold p-3 text-right">Interval</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {GRADING_SYSTEM.map((row, i) => (
                     <tr key={i} className={`group hover:bg-slate-50 transition-colors ${result?.grade === row.grade ? 'bg-emerald-50/60' : ''}`}>
                       <td className="p-3 font-bold text-slate-700 group-hover:text-slate-900">
                         {row.grade}
                         {result?.grade === row.grade && <span className="ml-2 text-emerald-500 text-[10px]">●</span>}
                       </td>
                       <td className="p-3 text-slate-500 font-mono text-xs">{row.gpaPoint.toFixed(1)}</td>
                       <td className="p-3 text-slate-500 text-right text-xs font-mono">{row.interval}%</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}