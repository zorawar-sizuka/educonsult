import { NextResponse } from "next/server";

// Exact replica of your client-side data/logic (ready for future DB)
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

function calculateGPA(payload) {
  const { stream, mode, marks = {}, subjectGpas = {} } = payload;
  const subjects = STREAMS[stream]?.subjects || STREAMS.science.subjects;

  if (mode === 'gpaToMarks') {
    let totalGPA = 0;
    let count = 0;
    const details = [];

    for (const sub of subjects) {
      const val = parseFloat(subjectGpas[sub.id]);
      if (isNaN(val)) continue;
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

    if (count === 0) return null;
    const avgGPA = totalGPA / count;
    const finalGrade = GRADING_SYSTEM.find(r => avgGPA >= r.gpaRange[0] && avgGPA <= r.gpaRange[1]) || GRADING_SYSTEM[GRADING_SYSTEM.length - 1];

    return {
      gpa: avgGPA.toFixed(2),
      grade: finalGrade.grade,
      percentage: `${finalGrade.interval}%`,
      remark: finalGrade.remark,
      details,
      mode
    };
  } else {
    // marksToGpa mode
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

    return {
      gpa: finalGPA.toFixed(2),
      grade: finalGrade.grade,
      percentage: `${percentage.toFixed(1)}%`,
      remark: finalGrade.remark,
      details,
      mode
    };
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = calculateGPA(body);
    if (!result) return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    return NextResponse.json({ ok: true, result });
  } catch (e) {
    console.error("[GPA API Error]", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}