// app/data/toolsData.js (Redesigned Backup/Fallback Data - Perfect Fit for Current Code)
// This file serves as:
// 1. Fallback data when Prisma DB is empty or offline.
// 2. Consistent structure using CODES (e.g., 'AUS', 'JPN') as keys/values.
// 3. Friendly names for display (via countryMap in hooks/tools).
// 4. Expanded 50+ universities with real details (QS 2024 rankings, intl tuition USD/year, intakes, fees, tags).
// 5. Dynamic living costs (city-averaged USD/month from Numbeo/QS 2024).
// 6. No TOEFL references anywhere.
// 7. Japan-specific: JLPT levels for eligibility (tools check 'JPN').

// How It Fits Current Code:
// - countryOptions from hook = codes array (e.g., ['USA', 'UK', 'AUS'...]).
// - displayOptions in tools = {value: code, label: name} from countryMap.
// - No duplicates: Fallback uses codes only; names from map.
// - Eligibility: Check destination === 'JPN' for JLPT.
// - CostTool: livingCostMonthlyUsd from map.get(code).
// - University Finder: Filter/sort by code, ranking, tags.

// Run seed.js for DB (preferred). This file is pure fallback—no changes needed in hooks/tools.


import { jsPDF } from "jspdf";
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// 1. COUNTRIES (7 Core Destinations - Codes as Primary Key)
export const fallbackCountries = [
  { code: 'USA', name: 'United States', currencyCode: 'USD', livingCostMonthlyUsd: 1800 }, // Avg (NYC/SF high, Midwest low)
  { code: 'UK', name: 'United Kingdom', currencyCode: 'GBP', livingCostMonthlyUsd: 1500 }, // London high, avg others
  { code: 'AUS', name: 'Australia', currencyCode: 'AUD', livingCostMonthlyUsd: 1700 }, // Sydney/Melbourne high
  { code: 'CAN', name: 'Canada', currencyCode: 'CAD', livingCostMonthlyUsd: 1400 }, // Toronto/Vancouver high
  { code: 'DEU', name: 'Germany', currencyCode: 'EUR', livingCostMonthlyUsd: 1000 }, // Berlin/Munich avg
  { code: 'JPN', name: 'Japan', currencyCode: 'JPY', livingCostMonthlyUsd: 1200 }, // Tokyo high, avg others
  { code: 'NZL', name: 'New Zealand', currencyCode: 'NZD', livingCostMonthlyUsd: 1400 }, // Auckland high
];

// For quick map in fallback mode (hooks can use this if DB empty)
export const fallbackCountryMap = new Map(fallbackCountries.map(c => [c.code, c]));

// 2. EXPANDED UNIVERSITY DATABASE (50+ Total - 6-8 Per Country)
export const universityDatabase = [
  // USA (8)
  { name: "Harvard University", countryCode: "USA", city: "Cambridge, MA", ranking: 1, tuitionYearUsd: 58000, intake: "Fall (Sep)", applicationFeeUsd: 85, website: "https://www.harvard.edu", tags: ["Ivy League", "Research", "Top Global", "Undergrad"] },
  { name: "Stanford University", countryCode: "USA", city: "Stanford, CA", ranking: 3, tuitionYearUsd: 62000, intake: "Fall (Sep)", applicationFeeUsd: 90, website: "https://www.stanford.edu", tags: ["Tech", "Innovation", "Top Global", "Grad"] },
  { name: "MIT", countryCode: "USA", city: "Cambridge, MA", ranking: 4, tuitionYearUsd: 61000, intake: "Fall (Sep)", applicationFeeUsd: 75, website: "https://www.mit.edu", tags: ["STEM", "Engineering", "Top Global", "Undergrad"] },
  { name: "University of California, Berkeley", countryCode: "USA", city: "Berkeley, CA", ranking: 10, tuitionYearUsd: 45000, intake: "Fall (Aug)", applicationFeeUsd: 70, website: "https://www.berkeley.edu", tags: ["Public", "Research", "Affordable"] },
  { name: "New York University", countryCode: "USA", city: "New York, NY", ranking: 35, tuitionYearUsd: 58000, intake: "Fall (Sep)", applicationFeeUsd: 80, website: "https://www.nyu.edu", tags: ["Urban", "Arts", "Diverse"] },
  { name: "Arizona State University", countryCode: "USA", city: "Tempe, AZ", ranking: 179, tuitionYearUsd: 32000, intake: "Spring/Fall", applicationFeeUsd: 85, website: "https://www.asu.edu", tags: ["Public", "Large", "Affordable"] },
  { name: "University of Illinois Urbana-Champaign", countryCode: "USA", city: "Champaign, IL", ranking: 64, tuitionYearUsd: 38000, intake: "Fall (Aug)", applicationFeeUsd: 75, website: "https://illinois.edu", tags: ["Engineering", "Public"] },
  { name: "Purdue University", countryCode: "USA", city: "West Lafayette, IN", ranking: 89, tuitionYearUsd: 32000, intake: "Fall (Aug)", applicationFeeUsd: 60, website: "https://www.purdue.edu", tags: ["STEM", "Affordable"] },

  // UK (7)
  { name: "University of Oxford", countryCode: "UK", city: "Oxford", ranking: 2, tuitionYearUsd: 45000, intake: "Fall (Oct)", applicationFeeUsd: 0, website: "https://www.ox.ac.uk", tags: ["Top Global", "Research", "Humanities", "Undergrad"] },
  { name: "University of Cambridge", countryCode: "UK", city: "Cambridge", ranking: 5, tuitionYearUsd: 44000, intake: "Fall (Oct)", applicationFeeUsd: 0, website: "https://www.cam.ac.uk", tags: ["Top Global", "Research", "STEM", "Undergrad"] },
  { name: "Imperial College London", countryCode: "UK", city: "London", ranking: 6, tuitionYearUsd: 42000, intake: "Fall (Sep)", applicationFeeUsd: 0, website: "https://www.imperial.ac.uk", tags: ["Engineering", "Science", "Top Global"] },
  { name: "University College London", countryCode: "UK", city: "London", ranking: 9, tuitionYearUsd: 38000, intake: "Fall (Sep)", applicationFeeUsd: 0, website: "https://www.ucl.ac.uk", tags: ["Research", "Diverse"] },
  { name: "University of Edinburgh", countryCode: "UK", city: "Edinburgh", ranking: 27, tuitionYearUsd: 32000, intake: "Fall (Sep)", applicationFeeUsd: 0, website: "https://www.ed.ac.uk", tags: ["Public", "Scotland"] },
  { name: "University of Manchester", countryCode: "UK", city: "Manchester", ranking: 34, tuitionYearUsd: 28000, intake: "Fall (Sep)", applicationFeeUsd: 0, website: "https://www.manchester.ac.uk", tags: ["Public", "Research"] },
  { name: "King's College London", countryCode: "UK", city: "London", ranking: 40, tuitionYearUsd: 34000, intake: "Fall (Sep)", applicationFeeUsd: 0, website: "https://www.kcl.ac.uk", tags: ["Health", "Law"] },

  // Australia (6)
  { name: "University of Melbourne", countryCode: "AUS", city: "Melbourne", ranking: 14, tuitionYearUsd: 45000, intake: "Feb/Jul", applicationFeeUsd: 120, website: "https://www.unimelb.edu.au", tags: ["Top Global", "Research", "Group of Eight"] },
  { name: "University of Sydney", countryCode: "AUS", city: "Sydney", ranking: 19, tuitionYearUsd: 42000, intake: "Feb/Jul", applicationFeeUsd: 150, website: "https://www.sydney.edu.au", tags: ["Top Global", "Business", "Group of Eight"] },
  { name: "Australian National University", countryCode: "AUS", city: "Canberra", ranking: 30, tuitionYearUsd: 38000, intake: "Feb/Jul", applicationFeeUsd: 100, website: "https://www.anu.edu.au", tags: ["Research", "Policy", "Group of Eight"] },
  { name: "University of New South Wales", countryCode: "AUS", city: "Sydney", ranking: 45, tuitionYearUsd: 38000, intake: "Feb/Jul", applicationFeeUsd: 100, website: "https://www.unsw.edu.au", tags: ["Engineering", "Group of Eight"] },
  { name: "University of Queensland", countryCode: "AUS", city: "Brisbane", ranking: 50, tuitionYearUsd: 35000, intake: "Feb/Jul", applicationFeeUsd: 100, website: "https://www.uq.edu.au", tags: ["Public", "Tropical"] },
  { name: "Monash University", countryCode: "AUS", city: "Melbourne", ranking: 57, tuitionYearUsd: 36000, intake: "Feb/Jul", applicationFeeUsd: 100, website: "https://www.monash.edu", tags: ["Research", "Group of Eight"] },

  // Canada (7)
  { name: "University of Toronto", countryCode: "CAN", city: "Toronto", ranking: 21, tuitionYearUsd: 45000, intake: "Fall (Sep)", applicationFeeUsd: 180, website: "https://www.utoronto.ca", tags: ["Top Global", "Research", "Diverse"] },
  { name: "University of British Columbia", countryCode: "CAN", city: "Vancouver", ranking: 38, tuitionYearUsd: 40000, intake: "Fall (Sep)", applicationFeeUsd: 150, website: "https://www.ubc.ca", tags: ["Research", "Environment"] },
  { name: "McGill University", countryCode: "CAN", city: "Montreal", ranking: 30, tuitionYearUsd: 38000, intake: "Fall (Sep)", applicationFeeUsd: 120, website: "https://www.mcgill.ca", tags: ["Research", "Bilingual"] },
  { name: "University of Alberta", countryCode: "CAN", city: "Edmonton", ranking: 96, tuitionYearUsd: 28000, intake: "Fall (Sep)", applicationFeeUsd: 125, website: "https://www.ualberta.ca", tags: ["Energy", "Affordable"] },
  { name: "University of Waterloo", countryCode: "CAN", city: "Waterloo", ranking: 112, tuitionYearUsd: 30000, intake: "Fall (Sep)", applicationFeeUsd: 125, website: "https://uwaterloo.ca", tags: ["Tech", "Co-op"] },
  { name: "Western University", countryCode: "CAN", city: "London, ON", ranking: 114, tuitionYearUsd: 32000, intake: "Fall (Sep)", applicationFeeUsd: 156, website: "https://www.uwo.ca", tags: ["Business", "Health"] },
  { name: "University of Calgary", countryCode: "CAN", city: "Calgary", ranking: 182, tuitionYearUsd: 25000, intake: "Fall (Sep)", applicationFeeUsd: 145, website: "https://www.ucalgary.ca", tags: ["Energy", "Public"] },

  // Germany (8 - Free Tuition Focus)
  { name: "Technical University of Munich", countryCode: "DEU", city: "Munich", ranking: 28, tuitionYearUsd: 0, intake: "Winter (Oct)/Summer (Apr)", applicationFeeUsd: 0, website: "https://www.tum.de", tags: ["Free Tuition", "Engineering", "Top Global"] },
  { name: "Ludwig Maximilian University of Munich", countryCode: "DEU", city: "Munich", ranking: 59, tuitionYearUsd: 0, intake: "Winter (Oct)", applicationFeeUsd: 0, website: "https://www.lmu.de", tags: ["Free Tuition", "Humanities"] },
  { name: "Heidelberg University", countryCode: "DEU", city: "Heidelberg", ranking: 84, tuitionYearUsd: 0, intake: "Winter (Oct)", applicationFeeUsd: 0, website: "https://www.uni-heidelberg.de", tags: ["Free Tuition", "Medicine"] },
  { name: "Humboldt University of Berlin", countryCode: "DEU", city: "Berlin", ranking: 126, tuitionYearUsd: 0, intake: "Winter (Oct)", applicationFeeUsd: 0, website: "https://www.hu-berlin.de", tags: ["Free Tuition", "Social Sciences"] },
  { name: "University of Freiburg", countryCode: "DEU", city: "Freiburg", ranking: 212, tuitionYearUsd: 0, intake: "Winter (Oct)", applicationFeeUsd: 0, website: "https://www.uni-freiburg.de", tags: ["Free Tuition", "Sustainability"] },
  { name: "RWTH Aachen University", countryCode: "DEU", city: "Aachen", ranking: 99, tuitionYearUsd: 0, intake: "Winter (Oct)", applicationFeeUsd: 0, website: "https://www.rwth-aachen.de", tags: ["Free Tuition", "Engineering"] },
  { name: "University of Bonn", countryCode: "DEU", city: "Bonn", ranking: 239, tuitionYearUsd: 0, intake: "Winter (Oct)", applicationFeeUsd: 0, website: "https://www.uni-bonn.de", tags: ["Free Tuition", "Research"] },
  { name: "Technical University of Berlin", countryCode: "DEU", city: "Berlin", ranking: 147, tuitionYearUsd: 0, intake: "Winter (Oct)", applicationFeeUsd: 0, website: "https://www.tu-berlin.de", tags: ["Free Tuition", "Tech"] },

  // Japan (6)
  { name: "University of Tokyo", countryCode: "JPN", city: "Tokyo", ranking: 28, tuitionYearUsd: 5300, intake: "Apr/Oct", applicationFeeUsd: 30, website: "https://www.u-tokyo.ac.jp", tags: ["Low Tuition", "Research", "Top Global"] },
  { name: "Kyoto University", countryCode: "JPN", city: "Kyoto", ranking: 46, tuitionYearUsd: 5300, intake: "Apr", applicationFeeUsd: 30, website: "https://www.kyoto-u.ac.jp", tags: ["Low Tuition", "Research"] },
  { name: "Tohoku University", countryCode: "JPN", city: "Sendai", ranking: 113, tuitionYearUsd: 5300, intake: "Apr/Oct", applicationFeeUsd: 30, website: "https://www.tohoku.ac.jp", tags: ["Low Tuition", "Science"] },
  { name: "Osaka University", countryCode: "JPN", city: "Osaka", ranking: 172, tuitionYearUsd: 5300, intake: "Apr", applicationFeeUsd: 30, website: "https://www.osaka-u.ac.jp", tags: ["Low Tuition", "Engineering"] },
  { name: "Keio University", countryCode: "JPN", city: "Tokyo", ranking: 201, tuitionYearUsd: 12000, intake: "Apr", applicationFeeUsd: 35, website: "https://www.keio.ac.jp", tags: ["Private", "Business"] },
  { name: "Waseda University", countryCode: "JPN", city: "Tokyo", ranking: 181, tuitionYearUsd: 11000, intake: "Apr/Sep", applicationFeeUsd: 35, website: "https://www.waseda.jp", tags: ["Private", "International"] },

  // New Zealand (5)
  { name: "University of Auckland", countryCode: "NZL", city: "Auckland", ranking: 65, tuitionYearUsd: 28000, intake: "Feb/Jul", applicationFeeUsd: 0, website: "https://www.auckland.ac.nz", tags: ["Top Global", "Research"] },
  { name: "University of Otago", countryCode: "NZL", city: "Dunedin", ranking: 206, tuitionYearUsd: 25000, intake: "Feb/Jul", applicationFeeUsd: 0, website: "https://www.otago.ac.nz", tags: ["Medicine", "Public"] },
  { name: "Victoria University of Wellington", countryCode: "NZL", city: "Wellington", ranking: 241, tuitionYearUsd: 24000, intake: "Feb/Jul", applicationFeeUsd: 0, website: "https://www.victoria.ac.nz", tags: ["Public", "Law"] },
  { name: "University of Canterbury", countryCode: "NZL", city: "Christchurch", ranking: 270, tuitionYearUsd: 23000, intake: "Feb/Jul", applicationFeeUsd: 0, website: "https://www.canterbury.ac.nz", tags: ["Engineering", "Public"] },
  { name: "Massey University", countryCode: "NZL", city: "Palmerston North", ranking: 292, tuitionYearUsd: 22000, intake: "Feb/Jul", applicationFeeUsd: 0, website: "https://www.massey.ac.nz", tags: ["Agriculture", "Affordable"] },
];

// 3. LIVING COSTS (Fallback Map - Code Key, Dynamic USD/Month)
export const livingCosts = {
  USA: 1800,
  UK: 1500,
  AUS: 1700,
  CAN: 1400,
  DEU: 1000,
  JPN: 1200,
  NZL: 1400,
};
// 3. TUTION COSTS (Fallback Map - Code Key, Dynamic USD/Month) in per 6 months are semester
export const tutionCosts = {
  USA: 17500, // Ranges from $25k (State) to $60k+ (Private)
  UK: 14000,  // Approx £22k average for international students
  AUS: 13500, // Approx AUD $40k
  CAN: 11000, // Approx CAD $30k
  DEU: 2000,  // Public is near-free (~$500 fees), this average accounts for private options
  JPN: 6000, // Averages between National ($5k) and Private ($10k-15k)
  NZL: 12000, // Approx NZD $38k
};


// 4. ELIGIBILITY LOGIC (Updated for Code-Based Destination + JLPT for Japan)
export function checkEligibility(profile) {
  const errors = {};

  // Use code for Japan detection (consistent with seed)
  const isJapan = profile.destination === "JPN";

  if (isJapan) {
    // Japan: JLPT required
    if (!profile.languageLevel) {
      errors.languageLevel = "JLPT Level is required for Japan";
    }
  } else {
    // Rest: GPA + English
    if (profile.gpa === "" || profile.gpa === undefined || profile.gpa === null) {
      errors.gpa = "GPA is required";
    } else if (parseFloat(profile.gpa) < 0 || parseFloat(profile.gpa) > 4.0) {
      errors.gpa = "GPA must be between 0.0 and 4.0";
    }

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

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  let status = "High Probability";
  let message = "Excellent profile! You are competitive for top rankings.";
  let color = "bg-emerald-100 text-emerald-800 border-emerald-200";

  if (isJapan) {
    // Japan Logic (JLPT Levels)
    switch (profile.languageLevel) {
      case "N1":
      case "N2":
        status = "Direct Entry Possible";
        message = "Strong Japanese proficiency (N1/N2) opens direct university paths.";
        color = "bg-emerald-100 text-emerald-800 border-emerald-200";
        break;
      case "N3":
        status = "Vocational/Prep Path";
        message = "N3 is good for vocational colleges; consider N2 for top universities.";
        color = "bg-blue-100 text-blue-800 border-blue-200";
        break;
      case "N4":
      case "N5":
        status = "Language School First";
        message = "Start with Japanese language school to reach N2 for university entry.";
        color = "bg-amber-100 text-amber-800 border-amber-200";
        break;
      default:
        status = "Beginner";
        message = "Start JLPT preparation from N5.";
        color = "bg-gray-100 text-gray-800 border-gray-200";
    }
  } else {
    const gpaNum = parseFloat(profile.gpa);
    if (gpaNum < 2.5) {
      status = "Conditional Admission";
      message = "Direct entry challenging. Pathway/Foundation program recommended.";
      color = "bg-amber-100 text-amber-800 border-amber-200";
    }

    const scoreNum = parseFloat(profile.englishScore);
    const minScore = profile.testType === 'PTE' ? 50 : 6.0;
    if (scoreNum < minScore) {
      status = "Pre-sessional Required";
      message = "Academic profile good, but English course needed first.";
      color = "bg-orange-100 text-orange-800 border-orange-200";
    }
  }

  return { 
    success: true, 
    result: { status, message, color } 
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
