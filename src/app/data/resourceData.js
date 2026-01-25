import { FileText, CheckSquare, GraduationCap } from 'lucide-react';

export const resourcesData = {
  hero: {
    title: "Everything you need for your journey",
    subtitle: "Free downloadable guides, checklists, and expert articles to help you navigate your study abroad application with confidence.",
    image: "/resources/resource_hero.avif" 
  },

  // 1. DOWNLOAD CARDS DATA
  guides: [
    {
      title: "The Ultimate SOP Guide",
      desc: "A step-by-step workbook to help you write a Statement of Purpose that gets you accepted.",
      icon: FileText,
      // Exact colors from your Blue Card reference
      bgColor: "bg-[#EFF6FF]", // Light Blue
      iconBg: "bg-[#3B82F6]",   // Blue Icon Circle
      iconColor: "text-white",
      textColor: "text-[#1E3A8A]",
      downloadUrl: "/resources/downloadables/sop-guide.pdf" // <--- File must be in public/downloads/
    },
    {
      title: "Visa Document Checklist",
      desc: "Never miss a document. Our comprehensive checklist ensures your visa application is complete.",
      icon: CheckSquare,
      // Exact colors from your Green Card reference
      bgColor: "bg-[#ECFDF5]", // Light Green
      iconBg: "bg-[#10B981]",   // Green Icon Circle
      iconColor: "text-white",
      textColor: "text-[#064E3B]",
      downloadUrl: "/resources/downloadables/sop-guide.pdf"
    },
    {
      title: "Scholarship Handbook",
      desc: "A curated list of global scholarships for international students with deadlines.",
      icon: GraduationCap,
      // Exact colors from your Sky Blue Card reference
      bgColor: "bg-[#E0F2FE]", // Light Sky
      iconBg: "bg-[#0EA5E9]",   // Sky Icon Circle
      iconColor: "text-white",
      textColor: "text-[#0C4A6E]",
      downloadUrl: "/resources/downloadables/sop-guide.pdf"
    }
  ],

  // 2. BLOG DATA (With Full Content for Popup)
  blogs: [
    {
      id: 1,
      title: "IELTS vs PTE: Which one should you take?",
      desc: "A detailed comparison of the two major English proficiency tests.",
      image: "/resources/blogs/blog1.avif", 
      tags: ["Exam Prep", "English"],
      // content: HTML-ready text for the popup
      content: `
        <p class="mb-4">Choosing between IELTS and PTE is one of the most common dilemmas for study abroad aspirants. Both are widely accepted, but they test your skills differently.</p>
        <h3 class="text-xl font-bold mb-2">1. The Format</h3>
        <p class="mb-4"><strong>IELTS</strong> is a traditional paper-based (or computer-delivered) test involving human interaction for the speaking section. <strong>PTE</strong> is 100% computer-based, meaning your speaking is graded by an AI.</p>
        <h3 class="text-xl font-bold mb-2">2. Scoring</h3>
        <p class="mb-4">Many students find it easier to score high in PTE because the AI grading is consistent and predictable. However, IELTS is often preferred by universities with strict academic requirements.</p>
        <h3 class="text-xl font-bold mb-2">Conclusion</h3>
        <p>If you are comfortable speaking to a computer, PTE might be your best bet. If you prefer a natural conversation, stick to IELTS.</p>
      `
    },
    {
      id: 2,
      title: "Cost of Living in the UK: 2024 Guide",
      desc: "Breakdown of monthly expenses for students in London vs. other cities.",
      image: "/resources/blogs/blog2.avif", 
      tags: ["Budgeting", "UK"],
      content: `
        <p class="mb-4">Studying in the UK is an investment. Understanding the costs upfront can save you from financial stress later.</p>
        <h3 class="text-xl font-bold mb-2">London vs. The Rest</h3>
        <p class="mb-4">London living costs are approx. £1,300-£1,500 per month (excluding tuition). Outside London (e.g., Manchester, Leeds), this drops to £900-£1,100.</p>
        <h3 class="text-xl font-bold mb-2">Major Expenses</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Rent:</strong> £500 - £900 depending on location.</li>
          <li><strong>Groceries:</strong> £150 - £200 per month.</li>
          <li><strong>Transport:</strong> £50 - £100 (get a student railcard!).</li>
        </ul>
      `
    } ,
    {
      id: 3,
      title: "The Art of Writing a Winning Statement of Purpose (SOP)",
      desc: "Learn how to craft a compelling story that convinces admissions committees.",
      image: "/resources/blogs/blog3.avif", 
      tags: ["Admissions", "Tips"],
      content: `
        <p class="mb-4">Your grades tell universities <em>what</em> you studied, but your Statement of Purpose (SOP) tells them <em>who</em> you are. It is often the deciding factor for borderline applications.</p>
        <h3 class="text-xl font-bold mb-2">1. The Hook</h3>
        <p class="mb-4">Don't start with "I have always wanted to study..." Instead, start with a specific problem you want to solve or a moment that sparked your curiosity. Make the admissions officer want to keep reading.</p>
        <h3 class="text-xl font-bold mb-2">2. Connect the Dots</h3>
        <p class="mb-4">A great SOP bridges your past (experience), your present (why this course?), and your future (career goals). Be specific about why you chose <em>this specific university</em>—mention professors or labs you admire.</p>
        <h3 class="text-xl font-bold mb-2">Conclusion</h3>
        <p>Authenticity beats vocabulary. Write your own story, be honest about your gaps, and proofread multiple times.</p>
      `
    },
    {
      id: 4,
      title: "Top 3 Countries with Best Post-Study Work Rights in 2024",
      desc: "Maximize your ROI by choosing a destination that lets you work after graduation.",
      image: "/resources/blogs/blog4.avif", 
      tags: ["Visa", "Career"],
      content: `
        <p class="mb-4">Studying abroad is a huge investment. For many students, the ability to work internationally after graduation is key to recovering that investment (ROI).</p>
        <h3 class="text-xl font-bold mb-2">1. United Kingdom (The Graduate Route)</h3>
        <p class="mb-4">The UK offers a straightforward <strong>2-year post-study work visa</strong> for Masters graduates, and 3 years for PhDs. You don't need a job offer beforehand to apply.</p>
        <h3 class="text-xl font-bold mb-2">2. Australia</h3>
        <p class="mb-4">Australia recently updated its policies. Depending on your degree level, you can stay for <strong>2 to 4 years</strong>. Bonus: Studying in regional areas often grants you extra time on your visa.</p>
        <h3 class="text-xl font-bold mb-2">3. Canada</h3>
        <p class="mb-4">Despite recent caps, the <strong>PGWP (Post-Graduation Work Permit)</strong> remains one of the most flexible open work permits, allowing you to work for any employer for up to 3 years.</p>
        <h3 class="text-xl font-bold mb-2">Summary</h3>
        <p>Choose your destination not just based on the university ranking, but on where you see yourself living and working for the next 5 years.</p>
      `
    },
  ]
};