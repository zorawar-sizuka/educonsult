const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedCountries() {
  if (!prisma.country) {
    throw new Error("Prisma client has no `country` model. Run migrate + generate first.");
  }

  const countries = [
    { code: "USA", name: "United States", currencyCode: "USD", livingCostMonthlyUsd: 1500 },
    { code: "UK", name: "United Kingdom", currencyCode: "GBP", livingCostMonthlyUsd: 1600 },
    { code: "Australia", name: "Australia", currencyCode: "AUD", livingCostMonthlyUsd: 1700 },
    { code: "Japan", name: "Japan", currencyCode: "JPY", livingCostMonthlyUsd: 1300 },
    { code: "Canada", name: "Canada", currencyCode: "CAD", livingCostMonthlyUsd: 1500 },

    // If you want Germany, add it here:
    // { code: "Germany", name: "Germany", currencyCode: "EUR", livingCostMonthlyUsd: 1200 },
  ];

  for (const c of countries) {
    await prisma.country.upsert({
      where: { code: c.code },
      update: {
        name: c.name,
        currencyCode: c.currencyCode,
        livingCostMonthlyUsd: c.livingCostMonthlyUsd,
      },
      create: c,
    });
  }

  console.log("✅ Seeded countries:", countries.length);
}

async function seedUniversities() {
  if (!prisma.university) {
    throw new Error("Prisma client has no `university` model. Run migrate + generate first.");
  }

  // IMPORTANT: countryCode must match Country.code exactly
  const universities = [
    // USA
    {
      name: "Harvard University",
      countryCode: "USA",
      city: "Cambridge",
      ranking: 1,
      tuitionYearUsd: 55000,
      intake: "Sep",
      website: "https://www.harvard.edu",
      tags: ["ivy", "top", "research"],
    },
    {
      name: "Arizona State University",
      countryCode: "USA",
      city: "Tempe",
      ranking: 156,
      tuitionYearUsd: 32000,
      intake: "Jan/Sep",
      website: "https://www.asu.edu",
      tags: ["public", "large"],
    },

    // UK
    {
      name: "University of Oxford",
      countryCode: "UK",
      city: "Oxford",
      ranking: 2,
      tuitionYearUsd: 38000,
      intake: "Sep",
      website: "https://www.ox.ac.uk",
      tags: ["top", "research"],
    },
    {
      name: "University of Manchester",
      countryCode: "UK",
      city: "Manchester",
      ranking: 28,
      tuitionYearUsd: 29000,
      intake: "Sep",
      website: "https://www.manchester.ac.uk",
      tags: ["public"],
    },

    // Australia (code is "Australia" in your seed)
    {
      name: "University of Melbourne",
      countryCode: "Australia",
      city: "Melbourne",
      ranking: 14,
      tuitionYearUsd: 45000,
      intake: "Feb/July",
      website: "https://www.unimelb.edu.au",
      tags: ["top"],
    },
    {
      name: "University of Sydney",
      countryCode: "Australia",
      city: "Sydney",
      ranking: 19,
      tuitionYearUsd: 42000,
      intake: "Feb/July",
      website: "https://www.sydney.edu.au",
      tags: ["top"],
    },

    // Japan (code is "Japan")
    {
      name: "University of Tokyo",
      countryCode: "Japan",
      city: "Tokyo",
      ranking: 28,
      tuitionYearUsd: 5000,
      intake: "Apr/Sep",
      website: "https://www.u-tokyo.ac.jp",
      tags: ["low-tuition", "research"],
    },
    {
      name: "Kyoto University",
      countryCode: "Japan",
      city: "Kyoto",
      ranking: 46,
      tuitionYearUsd: 5000,
      intake: "Apr",
      website: "https://www.kyoto-u.ac.jp",
      tags: ["research"],
    },

    // Canada (code is "Canada")
    {
      name: "University of Toronto",
      countryCode: "Canada",
      city: "Toronto",
      ranking: 21,
      tuitionYearUsd: 45000,
      intake: "Sep",
      website: "https://www.utoronto.ca",
      tags: ["top"],
    },

    // Germany example REMOVED because you don't have Country.code="Germany" seeded.
    // If you add Germany to countries above, you can add TU Munich back.
  ];

  // Quick guard: ensure referenced countries exist
  const uniqueCodes = [...new Set(universities.map((u) => u.countryCode))];
  const existing = await prisma.country.findMany({
    where: { code: { in: uniqueCodes } },
    select: { code: true },
  });
  const ok = new Set(existing.map((c) => c.code));
  const missing = uniqueCodes.filter((c) => !ok.has(c));
  if (missing.length) {
    throw new Error(
      `Cannot seed universities. Missing Country codes: ${missing.join(", ")}`
    );
  }

  for (const uni of universities) {
    await prisma.university.upsert({
      where: {
        name_countryCode: {
          name: uni.name,
          countryCode: uni.countryCode,
        },
      },
      update: {
        city: uni.city ?? null,
        ranking: uni.ranking ?? null,
        tuitionYearUsd: uni.tuitionYearUsd ?? null,
        intake: uni.intake ?? null,
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
  console.log("✅ Seeded universities. Total in DB:", count);
}

async function main() {
  console.log("🌱 Running seed...");
  await seedCountries();
  await seedUniversities();
  console.log("🌱 Done.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
