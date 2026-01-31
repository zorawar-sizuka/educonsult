// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis;

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;





import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis;

function makeClient() {
  // If ACCELERATE_URL is not set, this will create a normal Prisma client.
  // If Prisma 7 forces accelerateUrl/adapter in your setup, then you MUST set it.
  const client = new PrismaClient(
    process.env.ACCELERATE_URL
      ? { accelerateUrl: process.env.ACCELERATE_URL }
      : {}
  );

  // IMPORTANT: $extends returns a new client
  return process.env.ACCELERATE_URL ? client.$extends(withAccelerate()) : client;
}

export const prisma = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
