const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function seedCountries() {
  console.log("🌱 Seeding 7 core countries with dynamic living costs...");

  const countries = [
    // USA (avg across cities; NYC/SF high, Midwest low)
    { code: "USA", name: "United States", currencyCode: "USD", livingCostMonthlyUsd: 1800, tutionCostMonthlyUsd:17500 },
    
    // UK (London high, avg others)
    { code: "UK", name: "United Kingdom", currencyCode: "GBP", livingCostMonthlyUsd: 1500,  tutionCostMonthlyUsd: 14000 },
    
    // Australia (Sydney/Melbourne high)
    { code: "AUS", name: "Australia", currencyCode: "AUD", livingCostMonthlyUsd: 1700, tutionCostMonthlyUsd: 13500 },
    
    // Canada (Toronto/Vancouver high)
    { code: "CAN", name: "Canada", currencyCode: "CAD", livingCostMonthlyUsd: 1400, tutionCostMonthlyUsd: 11000 },
    
    // Germany (Berlin/Munich avg; low COL)
    { code: "DEU", name: "Germany", currencyCode: "EUR", livingCostMonthlyUsd: 1000, tutionCostMonthlyUsd: 2000 },
    
    // Japan (Tokyo high, avg others)
    { code: "JPN", name: "Japan", currencyCode: "JPY", livingCostMonthlyUsd: 1200, tutionCostMonthlyUsd: 6005 },
    
    // New Zealand (Auckland high)
    { code: "NZL", name: "New Zealand", currencyCode: "NZD", livingCostMonthlyUsd: 1400, tutionCostMonthlyUsd: 12000 },
  ];

  let seededCount = 0;
  for (const c of countries) {
    const existing = await prisma.country.findUnique({ where: { code: c.code } });
    if (!existing) {
      await prisma.country.create({ data: c });
      seededCount++;
    } else {
      await prisma.country.update({ where: { code: c.code }, data: c });
    }
  }

  console.log(`✅ Seeded/Updated ${seededCount} countries with dynamic living costs.`);
}

async function seedUniversities() {
  console.log("🌱 Seeding 6-8 universities per country for rigorous filtering...");

  const universities = [
    // USA (8 – Elite + Affordable Mix)
    {
      name: "Harvard University",
      countryCode: "USA",
      city: "Cambridge, MA",
      ranking: 4,
      tuitionYearUsd: 58000,
      livingCostYearUsd: 25000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 85,
      website: "https://www.harvard.edu",
      tags: ["Ivy League", "Research", "Top Global", "Undergrad", "Graduate"]
    },
    {
      name: "Stanford University",
      countryCode: "USA",
      city: "Stanford, CA",
      ranking: 6,
      tuitionYearUsd: 62000,
      livingCostYearUsd: 28000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 90,
      website: "https://www.stanford.edu",
      tags: ["Tech", "Innovation", "Top Global", "Graduate", "Undergrad"]
    },
    {
      name: "MIT",
      countryCode: "USA",
      city: "Cambridge, MA",
      ranking: 1,
      tuitionYearUsd: 61000,
      livingCostYearUsd: 25000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 75,
      website: "https://www.mit.edu",
      tags: ["STEM", "Engineering", "Top Global", "Research", "Undergrad"]
    },
    {
      name: "University of California, Berkeley",
      countryCode: "USA",
      city: "Berkeley, CA",
      ranking: 12,
      tuitionYearUsd: 48000,
      livingCostYearUsd: 22000,
      adminFeeUsd: null,
      intake: "Fall (Aug)",
      applicationFeeUsd: 70,
      website: "https://www.berkeley.edu",
      tags: ["Public", "Research", "Affordable Public", "STEM"]
    },
    {
      name: "New York University",
      countryCode: "USA",
      city: "New York, NY",
      ranking: 43,
      tuitionYearUsd: 62000,
      livingCostYearUsd: 30000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 80,
      website: "https://www.nyu.edu",
      tags: ["Urban", "Arts", "Diverse", "Business"]
    },
    {
      name: "Arizona State University",
      countryCode: "USA",
      city: "Tempe, AZ",
      ranking: 179,
      tuitionYearUsd: 34000,
      livingCostYearUsd: 18000,
      adminFeeUsd: null,
      intake: "Spring/Fall",
      applicationFeeUsd: 85,
      website: "https://www.asu.edu",
      tags: ["Public", "Large", "Affordable", "Innovation"]
    },
    {
      name: "University of Illinois Urbana-Champaign",
      countryCode: "USA",
      city: "Champaign, IL",
      ranking: 69,
      tuitionYearUsd: 40000,
      livingCostYearUsd: 17000,
      adminFeeUsd: null,
      intake: "Fall (Aug)",
      applicationFeeUsd: 75,
      website: "https://illinois.edu",
      tags: ["Engineering", "Public", "Research"]
    },
    {
      name: "Purdue University",
      countryCode: "USA",
      city: "West Lafayette, IN",
      ranking: 89,
      tuitionYearUsd: 32000,
      livingCostYearUsd: 16000,
      adminFeeUsd: null,
      intake: "Fall (Aug)",
      applicationFeeUsd: 60,
      website: "https://www.purdue.edu",
      tags: ["STEM", "Engineering", "Affordable Public"]
    },
  
    // UK (7 – Oxbridge + Strong Regionals)
    {
      name: "University of Oxford",
      countryCode: "GBR",
      city: "Oxford",
      ranking: 3,
      tuitionYearUsd: 48000,
      livingCostYearUsd: 18000,
      adminFeeUsd: null,
      intake: "Fall (Oct)",
      applicationFeeUsd: 0,
      website: "https://www.ox.ac.uk",
      tags: ["Top Global", "Research", "Humanities", "Undergrad"]
    },
    {
      name: "University of Cambridge",
      countryCode: "GBR",
      city: "Cambridge",
      ranking: 5,
      tuitionYearUsd: 47000,
      livingCostYearUsd: 17500,
      adminFeeUsd: null,
      intake: "Fall (Oct)",
      applicationFeeUsd: 0,
      website: "https://www.cam.ac.uk",
      tags: ["Top Global", "Research", "STEM", "Undergrad"]
    },
    {
      name: "Imperial College London",
      countryCode: "GBR",
      city: "London",
      ranking: 2,
      tuitionYearUsd: 45000,
      livingCostYearUsd: 22000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 0,
      website: "https://www.imperial.ac.uk",
      tags: ["Engineering", "Science", "Top Global", "Research"]
    },
    {
      name: "University College London",
      countryCode: "GBR",
      city: "London",
      ranking: 9,
      tuitionYearUsd: 40000,
      livingCostYearUsd: 22000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 0,
      website: "https://www.ucl.ac.uk",
      tags: ["Research", "Diverse", "Urban"]
    },
    {
      name: "University of Edinburgh",
      countryCode: "GBR",
      city: "Edinburgh",
      ranking: 27,
      tuitionYearUsd: 35000,
      livingCostYearUsd: 16000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 0,
      website: "https://www.ed.ac.uk",
      tags: ["Public", "Scotland", "Research"]
    },
    {
      name: "University of Manchester",
      countryCode: "GBR",
      city: "Manchester",
      ranking: 34,
      tuitionYearUsd: 32000,
      livingCostYearUsd: 15000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 0,
      website: "https://www.manchester.ac.uk",
      tags: ["Public", "Research", "Engineering"]
    },
    {
      name: "King's College London",
      countryCode: "GBR",
      city: "London",
      ranking: 40,
      tuitionYearUsd: 38000,
      livingCostYearUsd: 22000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 0,
      website: "https://www.kcl.ac.uk",
      tags: ["Health", "Law", "Urban"]
    },
  
    // Australia (6 – Group of Eight Focus)
    {
      name: "University of Melbourne",
      countryCode: "AUS",
      city: "Melbourne",
      ranking: 13,
      tuitionYearUsd: 48000,
      livingCostYearUsd: 22000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 120,
      website: "https://www.unimelb.edu.au",
      tags: ["Top Global", "Research", "Group of Eight"]
    },
    {
      name: "University of Sydney",
      countryCode: "AUS",
      city: "Sydney",
      ranking: 18,
      tuitionYearUsd: 45000,
      livingCostYearUsd: 23000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 150,
      website: "https://www.sydney.edu.au",
      tags: ["Top Global", "Business", "Group of Eight"]
    },
    {
      name: "Australian National University",
      countryCode: "AUS",
      city: "Canberra",
      ranking: 30,
      tuitionYearUsd: 40000,
      livingCostYearUsd: 20000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 100,
      website: "https://www.anu.edu.au",
      tags: ["Research", "Policy", "Group of Eight"]
    },
    {
      name: "University of New South Wales",
      countryCode: "AUS",
      city: "Sydney",
      ranking: 19,
      tuitionYearUsd: 42000,
      livingCostYearUsd: 22000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 100,
      website: "https://www.unsw.edu.au",
      tags: ["Engineering", "Group of Eight"]
    },
    {
      name: "University of Queensland",
      countryCode: "AUS",
      city: "Brisbane",
      ranking: 40,
      tuitionYearUsd: 38000,
      livingCostYearUsd: 19000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 100,
      website: "https://www.uq.edu.au",
      tags: ["Public", "Research", "Group of Eight"]
    },
    {
      name: "Monash University",
      countryCode: "AUS",
      city: "Melbourne",
      ranking: 37,
      tuitionYearUsd: 39000,
      livingCostYearUsd: 21000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 100,
      website: "https://www.monash.edu",
      tags: ["Research", "Group of Eight", "Health"]
    },
  
    // Canada (7 – Research Powerhouses)
    {
      name: "University of Toronto",
      countryCode: "CAN",
      city: "Toronto",
      ranking: 25,
      tuitionYearUsd: 48000,
      livingCostYearUsd: 18000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 180,
      website: "https://www.utoronto.ca",
      tags: ["Top Global", "Research", "Diverse"]
    },
    {
      name: "University of British Columbia",
      countryCode: "CAN",
      city: "Vancouver",
      ranking: 38,
      tuitionYearUsd: 42000,
      livingCostYearUsd: 17000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 150,
      website: "https://www.ubc.ca",
      tags: ["Research", "Environment", "Top Global"]
    },
    {
      name: "McGill University",
      countryCode: "CAN",
      city: "Montreal",
      ranking: 29,
      tuitionYearUsd: 40000,
      livingCostYearUsd: 15000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 120,
      website: "https://www.mcgill.ca",
      tags: ["Research", "Bilingual", "Medicine"]
    },
    {
      name: "University of Alberta",
      countryCode: "CAN",
      city: "Edmonton",
      ranking: 96,
      tuitionYearUsd: 30000,
      livingCostYearUsd: 14000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 125,
      website: "https://www.ualberta.ca",
      tags: ["Energy", "Affordable Public"]
    },
    {
      name: "University of Waterloo",
      countryCode: "CAN",
      city: "Waterloo",
      ranking: 112,
      tuitionYearUsd: 32000,
      livingCostYearUsd: 14000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 125,
      website: "https://uwaterloo.ca",
      tags: ["Tech", "Co-op", "Engineering"]
    },
    {
      name: "Western University",
      countryCode: "CAN",
      city: "London, ON",
      ranking: 114,
      tuitionYearUsd: 34000,
      livingCostYearUsd: 13000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 156,
      website: "https://www.uwo.ca",
      tags: ["Business", "Health"]
    },
    {
      name: "University of Calgary",
      countryCode: "CAN",
      city: "Calgary",
      ranking: 182,
      tuitionYearUsd: 28000,
      livingCostYearUsd: 14000,
      adminFeeUsd: null,
      intake: "Fall (Sep)",
      applicationFeeUsd: 145,
      website: "https://www.ucalgary.ca",
      tags: ["Energy", "Public"]
    },
  
    // Germany (8 – Tuition-Free Focus)
   // Germany (8 – Tuition-Free Focus + Real Admin Fees)
{
  name: "Technical University of Munich",
  countryCode: "DEU",
  city: "Munich",
  ranking: 28,
  tuitionYearUsd: 600,                    // No tuition for most internationals
  livingCostYearUsd: 13000,
  adminFeeUsd: null,                     // ~€300/semester × 2 (real TUM semester fee + contribution)
  intake: "Winter (Oct)/Summer (Apr)",
  applicationFeeUsd: 0,
  website: "https://www.tum.de",
  tags: ["Free Tuition", "Engineering", "Top Global"]
},
{
  name: "Ludwig Maximilian University of Munich",
  countryCode: "DEU",
  city: "Munich",
  ranking: 59,
  tuitionYearUsd: 500,
  livingCostYearUsd: 13000,
  adminFeeUsd: null,                     // ~€250/semester × 2 (typical LMU fee)
  intake: "Winter (Oct)",
  applicationFeeUsd: 0,
  website: "https://www.lmu.de",
  tags: ["Free Tuition", "Humanities", "Research"]
},
{
  name: "Heidelberg University",
  countryCode: "DEU",
  city: "Heidelberg",
  ranking: 84,
  tuitionYearUsd: 400,
  livingCostYearUsd: 12000,
  adminFeeUsd: null,                     // ~€200/semester × 2
  intake: "Winter (Oct)",
  applicationFeeUsd: 0,
  website: "https://www.uni-heidelberg.de",
  tags: ["Free Tuition", "Medicine", "Research"]
},
{
  name: "Humboldt University of Berlin",
  countryCode: "DEU",
  city: "Berlin",
  ranking: 126,
  tuitionYearUsd: 450,
  livingCostYearUsd: 12500,
  adminFeeUsd: null,                     // ~€225/semester × 2
  intake: "Winter (Oct)",
  applicationFeeUsd: 0,
  website: "https://www.hu-berlin.de",
  tags: ["Free Tuition", "Social Sciences"]
},
{
  name: "University of Freiburg",
  countryCode: "DEU",
  city: "Freiburg",
  ranking: 212,
  tuitionYearUsd: 400,
  livingCostYearUsd: 11000,
  adminFeeUsd: null,                     // ~€200/semester × 2
  intake: "Winter (Oct)",
  applicationFeeUsd: 0,
  website: "https://www.uni-freiburg.de",
  tags: ["Free Tuition", "Sustainability"]
},
{
  name: "RWTH Aachen University",
  countryCode: "DEU",
  city: "Aachen",
  ranking: 99,
  tuitionYearUsd: 600,
  livingCostYearUsd: 11500,
  adminFeeUsd: null,                     // ~€300/semester × 2 (higher due to engineering facilities)
  intake: "Winter (Oct)",
  applicationFeeUsd: 0,
  website: "https://www.rwth-aachen.de",
  tags: ["Free Tuition", "Engineering"]
},
{
  name: "University of Bonn",
  countryCode: "DEU",
  city: "Bonn",
  ranking: 239,
  tuitionYearUsd: 400,
  livingCostYearUsd: 10500,
  adminFeeUsd: null,
  intake: "Winter (Oct)",
  applicationFeeUsd: 0,
  website: "https://www.uni-bonn.de",
  tags: ["Free Tuition", "Research"]
},
{
  name: "Technical University of Berlin",
  countryCode: "DEU",
  city: "Berlin",
  ranking: 147,
  tuitionYearUsd: 600,
  livingCostYearUsd: 12500,
  adminFeeUsd: null,                     // ~€300/semester × 2
  intake: "Winter (Oct)",
  applicationFeeUsd: 0,
  website: "https://www.tu-berlin.de",
  tags: ["Free Tuition", "Tech", "Engineering"]
},
    // Japan (6 – National + Private)
    {
      name: "University of Tokyo",
      countryCode: "JPN",
      city: "Tokyo",
      ranking: 32,
      tuitionYearUsd: 5300,
      livingCostYearUsd: 14000,
      adminFeeUsd: null,
      intake: "Apr/Oct",
      applicationFeeUsd: 30,
      website: "https://www.u-tokyo.ac.jp",
      tags: ["Low Tuition", "Research", "Top Global"]
    },
    {
      name: "Kyoto University",
      countryCode: "JPN",
      city: "Kyoto",
      ranking: 50,
      tuitionYearUsd: 5300,
      livingCostYearUsd: 13000,
      adminFeeUsd: null,
      intake: "Apr",
      applicationFeeUsd: 30,
      website: "https://www.kyoto-u.ac.jp",
      tags: ["Low Tuition", "Research"]
    },
    {
      name: "Tohoku University",
      countryCode: "JPN",
      city: "Sendai",
      ranking: 113,
      tuitionYearUsd: 5300,
      livingCostYearUsd: 12000,
      adminFeeUsd: null,
      intake: "Apr/Oct",
      applicationFeeUsd: 30,
      website: "https://www.tohoku.ac.jp",
      tags: ["Low Tuition", "Science"]
    },
    {
      name: "Osaka University",
      countryCode: "JPN",
      city: "Osaka",
      ranking: 175,
      tuitionYearUsd: 5300,
      livingCostYearUsd: 13000,
      adminFeeUsd: null,
      intake: "Apr",
      applicationFeeUsd: 30,
      website: "https://www.osaka-u.ac.jp",
      tags: ["Low Tuition", "Engineering"]
    },
    {
      name: "Keio University",
      countryCode: "JPN",
      city: "Tokyo",
      ranking: 201,
      tuitionYearUsd: 12000,
      livingCostYearUsd: 15000,
      adminFeeUsd: null,
      intake: "Apr",
      applicationFeeUsd: 35,
      website: "https://www.keio.ac.jp",
      tags: ["Private", "Business", "International"]
    },
    {
      name: "Waseda University",
      countryCode: "JPN",
      city: "Tokyo",
      ranking: 181,
      tuitionYearUsd: 11000,
      livingCostYearUsd: 15000,
      adminFeeUsd: null,
      intake: "Apr/Sep",
      applicationFeeUsd: 35,
      website: "https://www.waseda.jp",
      tags: ["Private", "International", "Liberal Arts"]
    },
  
    // New Zealand (5 – Research + Affordable)
    {
      name: "University of Auckland",
      countryCode: "NZL",
      city: "Auckland",
      ranking: 65,
      tuitionYearUsd: 30000,
      livingCostYearUsd: 16000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 0,
      website: "https://www.auckland.ac.nz",
      tags: ["Top Global", "Research"]
    },
    {
      name: "University of Otago",
      countryCode: "NZL",
      city: "Dunedin",
      ranking: 206,
      tuitionYearUsd: 27000,
      livingCostYearUsd: 14000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 0,
      website: "https://www.otago.ac.nz",
      tags: ["Medicine", "Public"]
    },
    {
      name: "Victoria University of Wellington",
      countryCode: "NZL",
      city: "Wellington",
      ranking: 241,
      tuitionYearUsd: 26000,
      livingCostYearUsd: 15000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 0,
      website: "https://www.victoria.ac.nz",
      tags: ["Public", "Law"]
    },
    {
      name: "University of Canterbury",
      countryCode: "NZL",
      city: "Christchurch",
      ranking: 270,
      tuitionYearUsd: 25000,
      livingCostYearUsd: 14000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 0,
      website: "https://www.canterbury.ac.nz",
      tags: ["Engineering", "Public"]
    },
    {
      name: "Massey University",
      countryCode: "NZL",
      city: "Palmerston North",
      ranking: 292,
      tuitionYearUsd: 24000,
      livingCostYearUsd: 13000,
      adminFeeUsd: null,
      intake: "Feb/Jul",
      applicationFeeUsd: 0,
      website: "https://www.massey.ac.nz",
      tags: ["Agriculture", "Affordable"]
    }
  ]; 


  let seededCount = 0;
  for (const uni of universities) {
    try {
      await prisma.university.upsert({
        where: {
          name_countryCode: {
            name: uni.name,
            countryCode: uni.countryCode,
          },
        },
        update: uni,
        create: uni,
      });
      seededCount++;
    } catch (e) {
      console.warn(`⚠️ Skip uni ${uni.name}: ${e.message}`);
    }
  }

  const totalUnis = await prisma.university.count();
  console.log(`✅ Seeded/Updated ${seededCount} universities. Total in DB: ${totalUnis}`);
}

async function main() {
  console.log("🌱 Running focused seed for 7 countries + 50+ unis...");
  
  // 1. Seed countries first
  await seedCountries();
  
  // 2. Then universities
  await seedUniversities();
  
  console.log("🌱 Seed complete! Run `npx prisma studio` to explore.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });