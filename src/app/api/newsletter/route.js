import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    // Simple validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Upsert = Create if new, Update if exists (prevents crashing on duplicates)
    const subscriber = await prisma.subscriber.upsert({
      where: { email: email },
      update: {}, // Do nothing if exists
      create: { email: email },
    });

    return NextResponse.json({ success: true, data: subscriber });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}