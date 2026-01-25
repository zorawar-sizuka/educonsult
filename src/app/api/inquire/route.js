// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("📝 Attempting inquiry:", body);

//     const result = await prisma.inquiry.create({
//       data: {
//         name: body.name,
//         email: body.email,
//         destination: body.destination,
//         gpa: body.gpa,
//         englishScore: body.englishScore,
//         course: body.course,
//       },
//     });

//     console.log("✅ Inquiry Saved:", result);
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("❌ Inquiry Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// } 








import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📝 Incoming Inquiry:", body); // Debug log

    // Validate required fields
    if (!body.name || !body.email || !body.destination) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the record with ALL fields
    const newInquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        destination: body.destination,
        // Make sure these match your Frontend JSON keys exactly
        gpa: body.gpa || "",         
        englishScore: body.englishScore || "", 
        course: body.course || "",
      },
    });

    console.log("✅ Inquiry Saved:", newInquiry);
    return NextResponse.json({ success: true, data: newInquiry });

  } catch (error) {
    console.error("🔥 Error creating inquiry:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}