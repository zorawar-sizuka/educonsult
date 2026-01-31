import { NextResponse } from "next/server";

function checkEligibility(profile) {
  const errors = {};

  const isJapan = profile.destination === "JPN";

  if (isJapan) {
    if (!profile.languageLevel) {
      errors.languageLevel = "JLPT Level is required for Japan";
    }
  } else {
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

export async function POST(req) {
  try {
    const body = await req.json();
    const response = checkEligibility(body);

    if (!response.success) {
      // Return validation errors (component will handle as generic message)
      return NextResponse.json({ ok: true, result: { status: "Needs work", message: "Please re-check your inputs.", color: "bg-red-50 border-red-200 text-red-700" } });
    }

    return NextResponse.json({ ok: true, result: response.result });
  } catch (e) {
    console.error("[Eligibility API Error]", e);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}