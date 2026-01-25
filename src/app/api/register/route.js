import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req) {
  try {
    const body = await req.json();
    const newReg = await prisma.eventRegistration.create({
      data: {
        name: body.name,
        email: body.email,
        visitors: Number(body.visitors),
        eventName: body.eventName,
      },
    });
    return NextResponse.json(newReg);
  } catch (error) {
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}