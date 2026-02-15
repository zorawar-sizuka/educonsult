// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis;

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;



// import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const globalForPrisma = globalThis;

// function createPrismaClient() {
//   const client = new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'], // Add this
//   });


//   // Prisma v5: enable accelerate via extension only
//   return process.env.ACCELERATE_URL ? client.$extends(withAccelerate()) : client;
// }

// export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }










import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis || {};

let prismaInstance;

if (!globalForPrisma.prisma) {
  const baseClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

  if (process.env.ACCELERATE_URL) {
    try {
      prismaInstance = baseClient.$extends(withAccelerate());
      // console.log("[Prisma] Accelerate extension applied successfully");
    } catch (err) {
      // console.error("[Prisma] Accelerate extension failed:", err.message);
      prismaInstance = baseClient; // fallback
    }
  } else {
    console.log("[Prisma] No ACCELERATE_URL → using direct client");
    prismaInstance = baseClient;
  }

  globalForPrisma.prisma = prismaInstance;
}

export const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}