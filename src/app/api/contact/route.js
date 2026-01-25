import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// UI dropdown label -> Prisma enum value
const SERVICE_MAP = {
  "Career Counseling": "CAREER_COUNSELING",
  "University Shortlisting": "UNIVERSITY_SHORTLISTING",
  "SOP / LOR Support": "SOP_LOR_SUPPORT",
  "Scholarship Guidance": "SCHOLARSHIP_GUIDANCE",
  "Visa Counseling": "VISA_COUNSELING",
  "Pre-Departure Briefing": "PRE_DEPARTURE_BRIEFING",
  "Language Preparation": "LANGUAGE_PREPARATION",
  Other: "OTHER",
};

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📝 Attempting Contact:", body);

    // Validate required fields
    if (!body.fullName || !body.email || !body.service) {
      return NextResponse.json(
        { error: "fullName, email and service are required" },
        { status: 400 }
      );
    }

    const serviceEnum = SERVICE_MAP[body.service];
    if (!serviceEnum) {
      return NextResponse.json(
        {
          error: "Invalid service value",
          allowed: Object.keys(SERVICE_MAP),
        },
        { status: 400 }
      );
    }

    const result = await prisma.contact.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        service: serviceEnum, // ✅ enum stored in DB
        message: body.message || null,
      },
    });

    console.log("✅ Contact Saved:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Contact Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
