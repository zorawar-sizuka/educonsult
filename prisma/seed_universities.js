import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// IMPORTANT: these must match Country.code in your DB
// Choose ONE convention and stick to it (recommended short codes)
const CODE = {
  USA: "USA",
  UK: "UK",
  AUSTRALIA: "AUS",
  JAPAN: "JPN",
  CANADA: "CAN",
  GERMANY: "DEU",
};

async function main() {
  console.log("🌱 Seeding universities...");

  // 1) Ensure countries exist (otherwise relation will fail)
  const neededCodes = [CODE.USA, CODE.UK, CODE.AUSTRALIA, CODE.JAPAN, CODE.CANADA, CODE.GERMANY];
  const existingCountries = await prisma.country.findMany({
    where: { code: { in: neededCodes } },
    select: { code: true },
  });

  const existingSet = new Set(existingCountries.map((c) => c.code));
  const missing = neededCodes.filter((c) => !existingSet.has(c));

  if (missing.length) {
    console.warn(
      "⚠️ Missing countries in DB (seed countries first):",
      missing.join(", ")
    );
    console.warn("   Skipping university seed to avoid foreign-key failures.");
    return;
  }

  // 2) Universities list
  const universities = [
    { name: "Harvard University", countryCode: CODE.USA, city: "Cambridge", ranking: 1, tuitionYearUsd: 55000, intake: "Sep", website: "https://www.harvard.edu", tags: ["ivy", "top", "research"] },
    { name: "Arizona State University", countryCode: CODE.USA, city: "Tempe", ranking: 156, tuitionYearUsd: 32000, intake: "Jan/Sep", website: "https://www.asu.edu", tags: ["public", "large"] },

    { name: "University of Oxford", countryCode: CODE.UK, city: "Oxford", ranking: 2, tuitionYearUsd: 38000, intake: "Sep", website: "https://www.ox.ac.uk", tags: ["top", "research"] },
    { name: "University of Manchester", countryCode: CODE.UK, city: "Manchester", ranking: 28, tuitionYearUsd: 29000, intake: "Sep", website: "https://www.manchester.ac.uk", tags: ["public"] },

    { name: "University of Melbourne", countryCode: CODE.AUSTRALIA, city: "Melbourne", ranking: 14, tuitionYearUsd: 45000, intake: "Feb/July", website: "https://www.unimelb.edu.au", tags: ["top"] },
    { name: "University of Sydney", countryCode: CODE.AUSTRALIA, city: "Sydney", ranking: 19, tuitionYearUsd: 42000, intake: "Feb/July", website: "https://www.sydney.edu.au", tags: ["top"] },

    { name: "University of Tokyo", countryCode: CODE.JAPAN, city: "Tokyo", ranking: 28, tuitionYearUsd: 5000, intake: "Apr/Sep", website: "https://www.u-tokyo.ac.jp", tags: ["low-tuition", "research"] },
    { name: "Kyoto University", countryCode: CODE.JAPAN, city: "Kyoto", ranking: 46, tuitionYearUsd: 5000, intake: "Apr", website: "https://www.kyoto-u.ac.jp", tags: ["research"] },

    { name: "University of Toronto", countryCode: CODE.CANADA, city: "Toronto", ranking: 21, tuitionYearUsd: 45000, intake: "Sep", website: "https://www.utoronto.ca", tags: ["top"] },

    { name: "TU Munich", countryCode: CODE.GERMANY, city: "Munich", ranking: 30, tuitionYearUsd: 0, intake: "Oct/Apr", website: "https://www.tum.de", tags: ["free-tuition", "engineering"] },
  ];

  // 3) Upsert using your unique constraint (name_countryCode)
  for (const uni of universities) {
    await prisma.university.upsert({
      where: {
        name_countryCode: { name: uni.name, countryCode: uni.countryCode },
      },
      update: {
        city: uni.city,
        ranking: uni.ranking,
        tuitionYearUsd: uni.tuitionYearUsd,
        intake: uni.intake,
        applicationFeeUsd: uni.applicationFeeUsd ?? null,
        website: uni.website ?? null,
        tags: uni.tags ?? [],
      },
      create: {
        name: uni.name,
        countryCode: uni.countryCode,
        city: uni.city ?? null,
        ranking: uni.ranking ?? null,
        tuitionYearUsd: uni.tuitionYearUsd ?? null,
        intake: uni.intake ?? null,
        applicationFeeUsd: uni.applicationFeeUsd ?? null,
        website: uni.website ?? null,
        tags: uni.tags ?? [],
      },
    });
  }

  const count = await prisma.university.count();
  console.log("✅ Universities seeded successfully. Total:", count);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
