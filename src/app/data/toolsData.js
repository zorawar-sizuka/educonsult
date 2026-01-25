import { jsPDF } from "jspdf";

// 1. EXCHANGE RATES (Base USD) - In a real app, fetch this from an API
export const exchangeRates = {
  USD: 1,
  NPR: 134.50, // 1 USD = 134.50 NPR
  AUD: 90.20,  // 1 AUD to NPR
  CAD: 98.40,
  EUR: 145.10,
  GBP: 170.80,
  JPY: 0.92    // 1 JPY to NPR
};

// 1. ADD VALIDATION HELPERS
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// 2. EXPANDED UNIVERSITY DATABASE
export const universityDatabase = [
  // USA
  { id: 1, name: "Harvard University", country: "USA", ranking: 1, tuition: 55000, intake: "Sep" },
  { id: 2, name: "Arizona State University", country: "USA", ranking: 156, tuition: 32000, intake: "Jan/Sep" },
  // UK
  { id: 3, name: "University of Oxford", country: "UK", ranking: 2, tuition: 38000, intake: "Sep" },
  { id: 4, name: "University of Manchester", country: "UK", ranking: 28, tuition: 29000, intake: "Sep" },
  // Australia
  { id: 5, name: "University of Melbourne", country: "Australia", ranking: 14, tuition: 45000, intake: "Feb/July" },
  { id: 6, name: "Sydney University", country: "Australia", ranking: 19, tuition: 42000, intake: "Feb/July" },
  // Japan
  { id: 7, name: "University of Tokyo", country: "Japan", ranking: 28, tuition: 5000, intake: "Apr/Sep" }, // Low tuition
  { id: 8, name: "Kyoto University", country: "Japan", ranking: 46, tuition: 5000, intake: "Apr" },
  // Canada
  { id: 9, name: "University of Toronto", country: "Canada", ranking: 21, tuition: 45000, intake: "Sep" },
  // Germany
  { id: 10, name: "TU Munich", country: "Germany", ranking: 30, tuition: 0, intake: "Oct/Apr" },
];

// 3. LIVING COST CONSTANTS (Monthly Average in Local Currency converted to USD for base calc)
export const livingCosts = {
  "USA": 1500,
  "UK": 1300,
  "Australia": 1400,
  "Japan": 900,
  "Canada": 1200,
  "Germany": 950
};

// 4. SINGLE ELIGIBILITY LOGIC FUNCTION (Fixed duplicate declaration)
// 4. SINGLE ELIGIBILITY LOGIC FUNCTION
export function checkEligibility(profile) {
  const errors = {};

  // Normalize destination to ensure matching works even with lowercase/whitespace
  const isJapan = profile.destination?.trim() === "Japan";

  // ============================================================
  // 1. VALIDATION LOGIC (Separated by Destination)
  // ============================================================

  if (isJapan) {
    // --- JAPAN SPECIFIC CHECKS ---
    
    // Only check JLPT. We skip strict GPA/IELTS checks here.
    if (!profile.jlpt) {
      errors.jlpt = "JLPT Level is required for Japan";
    }

  } else {
    // --- REST OF THE WORLD (USA, UK, CANADA, ETC) CHECKS ---

    // 1. Check GPA (Only for non-Japan destinations)
    if (profile.gpa === "" || profile.gpa === undefined || profile.gpa === null) {
      errors.gpa = "GPA is required";
    } else if (parseFloat(profile.gpa) < 0 || parseFloat(profile.gpa) > 4.0) {
      errors.gpa = "GPA must be between 0.0 and 4.0";
    }

    // 2. Check English Scores
    if (!profile.testType) {
       errors.testType = "Please select IELTS or PTE"; 
    } else {
        if (profile.testType === 'PTE') {
          const maxScore = 90;
          if (profile.englishScore === "" || profile.englishScore === null) {
             errors.englishScore = "PTE Score is required";
          } else if (profile.englishScore < 0 || profile.englishScore > maxScore) {
            errors.englishScore = `PTE Score must be 0-${maxScore}`;
          }
        } else {
          // IELTS
          const maxScore = 9;
          if (profile.englishScore === "" || profile.englishScore === null) {
             errors.englishScore = "IELTS Score is required";
          } else if (profile.englishScore < 0 || profile.englishScore > maxScore) {
            errors.englishScore = `IELTS Score must be 0-${maxScore}`;
          }
        }
    }
  }

  // If we found errors, stop here
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // ============================================================
  // 2. ELIGIBILITY RESULT LOGIC
  // ============================================================

  let status = "High Probability";
  let message = "Excellent profile! You are competitive for top rankings.";
  let color = "bg-emerald-100 text-emerald-800 border-emerald-200";

  if (isJapan) {
    // --- JAPAN LOGIC ---
    if (profile.jlpt === "N5" || profile.jlpt === "N4") {
      status = "Language School Path";
      message = "With basic Japanese (N5/N4), you typically start at a Language School before University.";
      color = "bg-blue-100 text-blue-800 border-blue-200";
    } else if (profile.jlpt === "N3" || profile.jlpt === "N2" || profile.jlpt === "N1") {
      status = "Direct Entry Possible";
      message = "Your Japanese level is strong enough for vocational college or direct university entry.";
      color = "bg-emerald-100 text-emerald-800 border-emerald-200";
    } else {
       // Fallback for empty or 'Beginner'
       status = "Beginner";
       message = "Start with N5 preparation classes.";
       color = "bg-gray-100 text-gray-800 border-gray-200";
    }

  } else {
    // --- REST OF WORLD LOGIC ---
    
    // GPA Logic
    const gpaNum = parseFloat(profile.gpa);
    if (gpaNum < 2.5) {
      status = "Conditional Admission";
      message = "Direct entry is challenging. We recommend a Pathway Program.";
      color = "bg-amber-100 text-amber-800 border-amber-200";
    }

    // English Score Logic
    const scoreNum = parseFloat(profile.englishScore);
    const minScore = profile.testType === 'PTE' ? 50 : 6.0; 
    
    if (scoreNum < minScore) {
      status = "Pre-sessional Required";
      message = "Your academic score is acceptable, but you need an English course first.";
      color = "bg-orange-100 text-orange-800 border-orange-200";
    }
  }

  return { 
    success: true, 
    result: { 
      status, 
      message, 
      color 
    } 
  };
}

// 5. SOP GENERATOR LOGIC WITH ERROR HANDLING

export function generateSOP(data) {
  try {
    if (!data || typeof data !== "object") throw new Error("Invalid data");
    const required = ["name", "university", "course", "country", "passion", "achievement"];
    const missing = required.filter((k) => !String(data[k] || "").trim());
    if (missing.length) throw new Error(`Missing: ${missing.join(", ")}`);

    const doc = new jsPDF({ unit: "pt", format: "a4" }); // points = easier layout
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    // ---- Theme tokens (tweak these later if you want) ----
    const M = 48;               // margin
    const headerH = 92;         // top band height
    const cardH = 62;           // info card height
    const line = 16;            // base line height

    const COLORS = {
      ink: [15, 23, 42],        // slate-900
      muted: [100, 116, 139],   // slate-500
      soft: [226, 232, 240],    // slate-200
      bg: [248, 250, 252],      // slate-50
      brand: [17, 24, 39],      // almost-black
      accent: [59, 130, 246],   // blue-500
      white: [255, 255, 255],
    };

    // ---- Helpers ----
    const set = (font, style, size, color = COLORS.ink) => {
      doc.setFont(font, style);
      doc.setFontSize(size);
      doc.setTextColor(...color);
    };

    const hr = (y) => {
      doc.setDrawColor(...COLORS.soft);
      doc.setLineWidth(1);
      doc.line(M, y, pageW - M, y);
    };

    const wrap = (text, maxW) => doc.splitTextToSize(String(text || ""), maxW);

    const ensureSpace = (y, needed) => {
      if (y + needed <= pageH - M) return y;
      doc.addPage();
      drawHeader(); // keep the style consistent on new pages
      return headerH + M;
    };

    const roundedRect = (x, y, w, h, r) => {
      doc.roundedRect(x, y, w, h, r, r, "S");
    };

    const fillRoundedRect = (x, y, w, h, r) => {
      doc.roundedRect(x, y, w, h, r, r, "F");
    };

    const drawHeader = () => {
      // header band
      doc.setFillColor(...COLORS.brand);
      doc.rect(0, 0, pageW, headerH, "F");

      // Accent stripe
      doc.setFillColor(...COLORS.accent);
      doc.rect(0, headerH - 6, pageW, 6, "F");

      // Title
      set("helvetica", "bold", 20, COLORS.white);
      doc.text("STATEMENT OF PURPOSE", M, 44);

      set("helvetica", "normal", 11, [203, 213, 225]); // slate-300-ish
      doc.text("A structured, professional narrative", M, 64);

      // Date on the right
      const dateStr = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
      set("helvetica", "normal", 10, [203, 213, 225]);
      doc.text(dateStr, pageW - M, 44, { align: "right" });
    };

    const infoCards = (startY) => {
      const gap = 12;
      const w = (pageW - M * 2 - gap) / 2;

      const cards = [
        { label: "Applicant", value: data.name },
        { label: "Target Country", value: data.country },
        { label: "University", value: data.university },
        { label: "Program", value: data.course },
      ];

      let y = startY;

      doc.setDrawColor(...COLORS.soft);
      doc.setLineWidth(1);

      for (let i = 0; i < cards.length; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = M + col * (w + gap);
        const yy = y + row * (cardH + gap);

        doc.setFillColor(...COLORS.bg);
        fillRoundedRect(x, yy, w, cardH, 12);

        // label
        set("helvetica", "bold", 9, COLORS.muted);
        doc.text(String(cards[i].label).toUpperCase(), x + 14, yy + 20);

        // value
        set("helvetica", "bold", 12, COLORS.ink);
        const v = wrap(cards[i].value, w - 28);
        doc.text(v.slice(0, 2), x + 14, yy + 42);
      }

      return y + (cardH * 2) + gap; // bottom y
    };

    const section = (y, title, body) => {
      y = ensureSpace(y, 80);

      // section title
      set("helvetica", "bold", 12, COLORS.ink);
      doc.text(title, M, y);

      // tiny accent underline
      doc.setDrawColor(...COLORS.accent);
      doc.setLineWidth(2);
      doc.line(M, y + 6, M + 42, y + 6);

      y += 18;

      // section body
      set("times", "normal", 12, COLORS.ink);
      const lines = wrap(body, pageW - M * 2);
      for (const ln of lines) {
        y = ensureSpace(y, line + 12);
        doc.text(ln, M, y);
        y += line;
      }

      y += 10;
      return y;
    };

    const footer = (pageNum, pageCount) => {
      const y = pageH - 26;
      doc.setDrawColor(...COLORS.soft);
      doc.setLineWidth(1);
      doc.line(M, y - 12, pageW - M, y - 12);

      set("helvetica", "normal", 9, COLORS.muted);
      doc.text(`${data.name}`, M, y);
      doc.text(`Page ${pageNum} of ${pageCount}`, pageW - M, y, { align: "right" });
    };

    // ---- Build document ----
    drawHeader();

    let y = headerH + 28;

    // intro paragraph in a subtle block
    doc.setFillColor(...COLORS.bg);
    fillRoundedRect(M, y, pageW - M * 2, 72, 14);

    set("times", "normal", 12, COLORS.ink);
    const intro = `My name is ${data.name}, and I am writing to express my strong interest in the ${data.course} program at ${data.university}.`;
    const introLines = wrap(intro, pageW - M * 2 - 24);
    doc.text(introLines, M + 12, y + 28);
    y += 92;

    // info cards
    y = infoCards(y);
    y += 18;

    hr(y);
    y += 18;

    // Sections (more “professional document” style)
    y = section(
      y,
      "Motivation",
      `My motivation for pursuing this field comes from ${data.passion}. Over time, this interest has shaped the way I learn, the projects I choose, and the problems I want to solve.`
    );

    y = section(
      y,
      "Experience & Achievement",
      `A defining achievement in my journey is ${data.achievement}. This experience strengthened my discipline, problem-solving ability, and confidence to perform at a higher academic standard.`
    );

    y = section(
      y,
      "Why This Program",
      `I am applying to this program because it aligns with my goals and provides the academic depth I need to grow. I am particularly excited to build stronger foundations and apply them to real-world challenges.`
    );

    y = section(
      y,
      "Why Study in " + data.country,
      `I chose to study in ${data.country} due to its academic culture, global exposure, and opportunities for professional growth. I believe this environment will help me mature academically and personally.`
    );

    y = section(
      y,
      "Goals",
      `My short-term goal is to excel in graduate studies and gain practical experience. My long-term goal is to contribute meaningfully through impactful work in my field, applying the skills and perspective I gain from this program.`
    );

    y = ensureSpace(y, 70);
    hr(y);
    y += 18;

    set("times", "normal", 12, COLORS.ink);
    doc.text("Thank you for considering my application.", M, y);
    y += 22;

    set("times", "italic", 12, COLORS.ink);
    doc.text("Sincerely,", M, y);
    y += 18;

    set("times", "bold", 12, COLORS.ink);
    doc.text(data.name, M, y);

    // Footers on all pages
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      footer(p, pageCount);
    }

    doc.save(`${String(data.name).replace(/\s+/g, "_")}_SOP.pdf`);
    return { success: true, message: "SOP generated successfully" };
  } catch (error) {
    console.error("Error generating SOP:", error);
    return { success: false, message: `Failed to generate SOP: ${error.message}` };
  }
}
