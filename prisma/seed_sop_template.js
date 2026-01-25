const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const canvasTemplate = {
    name: "Canvas SOP (Default)",
    isDefault: true,
    schema: {
      brand: {
        title: "STATEMENT OF PURPOSE",
        subtitle: "A clean, professional one-page narrative",
      },
      typography: {
        fontPrimary: "Times",
        fontSecondary: "Helvetica",
      },
      layout: {
        margin: 20,
        lineHeight: 8,
        maxPages: 2,
      },
      sections: [
        {
          key: "opening",
          label: "Opening",
          prompt:
            "Start with who you are and what you're applying for. Keep it confident and direct.",
        },
        {
          key: "motivation",
          label: "Motivation",
          prompt:
            "Explain what sparked your interest and what problems you want to solve.",
        },
        {
          key: "experience",
          label: "Experience & Achievement",
          prompt:
            "Highlight a key achievement and connect it to skills relevant to your course.",
        },
        {
          key: "whyProgram",
          label: "Why this program",
          prompt:
            "Explain why the course fits your goals and how it bridges your skill gap.",
        },
        {
          key: "goals",
          label: "Goals",
          prompt:
            "Short-term and long-term goals. Show clarity and realistic ambition.",
        },
        {
          key: "closing",
          label: "Closing",
          prompt:
            "Thank the committee and summarize why you’re a strong fit.",
        },
      ],
      // This is the "render recipe" for your PDF generator.
      render: {
        headerLines: [
          "To: The Admissions Committee",
          "University: {{university}}",
          "Course: {{course}}",
        ],
        paragraphs: [
          "My name is {{name}}, and I am writing to express my strong interest in the {{course}} program at {{university}}.",
          "My motivation for pursuing this field comes from {{passion}}. Over time, this interest has shaped the way I learn, the projects I choose, and the problems I want to solve.",
          "A defining achievement in my journey is {{achievement}}. This experience strengthened my discipline, problem-solving ability, and confidence to perform at a higher academic standard.",
          "I am applying to this program because it aligns with my goals and provides the academic depth I need to grow. I am particularly excited about building stronger foundations and applying them in real-world settings.",
          "I chose to study in {{country}} due to its academic culture and global exposure. My short-term goal is to excel in graduate studies and gain practical experience, and my long-term goal is to contribute meaningfully through impactful work in my field.",
          "Thank you for considering my application. I look forward to the opportunity to contribute to and learn from the university community.",
        ],
        footer: "Sincerely,\n{{name}}",
      },
    },
  };

  // Ensure only one default
  await prisma.sOPTemplate.updateMany({
    data: { isDefault: false },
  });

  const created = await prisma.sOPTemplate.create({
    data: canvasTemplate,
    select: { id: true, name: true, isDefault: true },
  });

  console.log("✅ Seeded SOP template:", created);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
