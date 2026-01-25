import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📝 Attempting to book:", body); // Log input

    // Validate Date
    if (!body.date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const result = await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        date: new Date(body.date).toISOString(), // Ensure ISO format
        message: body.message,
      },
    });

    console.log("✅ Booking Saved:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Booking Error:", error); // Print the actual error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}