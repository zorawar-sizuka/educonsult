// // app/api/admin/data/route.js
// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// // Prevent multiple instances in dev
// const globalForPrisma = global;
// const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// export async function GET() {
//   // Add no-store to prevent Next.js from caching old data!
//   try {
//     const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
//     const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    
//     return NextResponse.json(
//       { bookings, inquiries },
//       { headers: { 'Cache-Control': 'no-store' } } // <--- IMPORTANT
//     );
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
//   }
// } 



// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// const globalForPrisma = global;
// const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     const [bookings, inquiries, registrations, subscribers] = await Promise.all([
//       prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }),
//       prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } }),
//       prisma.eventRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
//       prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } }),
//     ]);

//     return NextResponse.json({ bookings, inquiries, registrations, subscribers });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// } 




import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all data in parallel
    const [bookings, contacts,  inquiries, registrations, subscribers] = await Promise.all([
      prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }), 
      prisma.contact.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.eventRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    // Return strictly JSON
    return NextResponse.json({
      bookings: bookings || [], 
      contacts: contacts || [],
      inquiries: inquiries || [],
      registrations: registrations || [],
      subscribers: subscribers || []
    });

  } catch (error) {
    console.error("❌ API ERROR:", error);
    // Return empty arrays instead of crashing, so the UI still loads
    return NextResponse.json({ 
      bookings: [], inquiries: [], registrations: [], subscribers: [] 
    }); 
  }
}