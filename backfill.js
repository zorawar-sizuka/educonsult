import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function main() {
  const events = await prisma.event.findMany({
    where: { slug: null },
    select: { id: true, title: true },
  });

  for (const e of events) {
    const base = slugify(e.title || "event");
    let slug = base || `event-${e.id}`;

    // Ensure uniqueness
    let i = 1;
    while (true) {
      const exists = await prisma.event.findFirst({
        where: { slug },
        select: { id: true },
      });
      if (!exists) break;
      slug = `${base}-${i++}`;
    }

    await prisma.event.update({
      where: { id: e.id },
      data: { slug },
    });
  }

  console.log(`✅ Backfilled ${events.length} slugs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
