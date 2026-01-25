const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedCountries() {
  const countries = [
    { code: "USA", name: "United States", currencyCode: "USD", livingCostMonthlyUsd: 1500 },
    { code: "UK", name: "United Kingdom", currencyCode: "GBP", livingCostMonthlyUsd: 1600 },
    { code: "Australia", name: "Australia", currencyCode: "AUD", livingCostMonthlyUsd: 1700 },
    { code: "Japan", name: "Japan", currencyCode: "JPY", livingCostMonthlyUsd: 1300 },
    { code: "Canada", name: "Canada", currencyCode: "CAD", livingCostMonthlyUsd: 1500 },
    { code: "Germany", name: "Germany", currencyCode: "EUR", livingCostMonthlyUsd: 950 },
    { code: "Nepal", name: "Nepal", currencyCode: "NPR", livingCostMonthlyUsd: 400 },
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
  const universities = [
    { name: "Harvard University", countryCode: "USA", city: "Cambridge", ranking: 1, tuitionYearUsd: 55000, intake: "Sep", website: "https://www.harvard.edu", tags: ["ivy","top","research"] },
    { name: "Arizona State University", countryCode: "USA", city: "Tempe", ranking: 156, tuitionYearUsd: 32000, intake: "Jan/Sep", website: "https://www.asu.edu", tags: ["public","large"] },

    { name: "University of Oxford", countryCode: "UK", city: "Oxford", ranking: 2, tuitionYearUsd: 38000, intake: "Sep", website: "https://www.ox.ac.uk", tags: ["top","research"] },
    { name: "University of Manchester", countryCode: "UK", city: "Manchester", ranking: 28, tuitionYearUsd: 29000, intake: "Sep", website: "https://www.manchester.ac.uk", tags: ["public"] },

    { name: "University of Melbourne", countryCode: "Australia", city: "Melbourne", ranking: 14, tuitionYearUsd: 45000, intake: "Feb/July", website: "https://www.unimelb.edu.au", tags: ["top"] },
    { name: "University of Sydney", countryCode: "Australia", city: "Sydney", ranking: 19, tuitionYearUsd: 42000, intake: "Feb/July", website: "https://www.sydney.edu.au", tags: ["top"] },

    { name: "University of Tokyo", countryCode: "Japan", city: "Tokyo", ranking: 28, tuitionYearUsd: 5000, intake: "Apr/Sep", website: "https://www.u-tokyo.ac.jp", tags: ["low-tuition","research"] },
    { name: "Kyoto University", countryCode: "Japan", city: "Kyoto", ranking: 46, tuitionYearUsd: 5000, intake: "Apr", website: "https://www.kyoto-u.ac.jp", tags: ["research"] },

    { name: "University of Toronto", countryCode: "Canada", city: "Toronto", ranking: 21, tuitionYearUsd: 45000, intake: "Sep", website: "https://www.utoronto.ca", tags: ["top"] },

    { name: "TU Munich", countryCode: "Germany", city: "Munich", ranking: 30, tuitionYearUsd: 0, intake: "Oct/Apr", website: "https://www.tum.de", tags: ["free-tuition","engineering"] },
  ];

  for (const u of universities) {
    await prisma.university.upsert({
      where: { name_countryCode: { name: u.name, countryCode: u.countryCode } },
      update: u,
      create: u,
    });
  }

  console.log("✅ Seeded universities:", universities.length);
}

async function main() {
  console.log("🌱 Seeding tools database...");
  await seedCountries();
  await seedUniversities();
  console.log("✅ Done.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
