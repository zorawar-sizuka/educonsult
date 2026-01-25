const table = {
    title: "PTE Task Breakdown",
    intro:
      "PTE is organized into parts. Each part contains task types with approximate question counts.",
    mode: "pte",
    groups: [
      {
        title: "Part 1: Speaking",
        rows: [
          { itemType: "Personal Introduction (unscored)", questions: "1" },
          { itemType: "Read Aloud", questions: "6–7" },
          { itemType: "Repeat Sentence", questions: "10–12" },
          { itemType: "Describe Image", questions: "3–4" },
          { itemType: "Re-tell Lecture", questions: "1–2" },
          { itemType: "Answer Short Questions", questions: "5–6" },
        ],
      },
      {
        title: "Part 2: Writing",
        rows: [
          { itemType: "Summarize Written Text", questions: "1–2" },
          { itemType: "Write Essay", questions: "1–2" },
        ],
      },
      {
        title: "Part 3: Reading",
        rows: [
          { itemType: "Multiple-Choice: Single Option", questions: "1–2" },
          { itemType: "Multiple-Choice: Multiple Options", questions: "1–2" },
          { itemType: "Re-order Paragraphs", questions: "2–3" },
          { itemType: "Reading: Fill in the Blanks (drag and drop)", questions: "4–5" },
          { itemType: "Reading & Writing: Fill in the Blanks (drop-down list)", questions: "5–6" },
        ],
      },
      {
        title: "Part 4: Listening",
        rows: [
          { itemType: "Summarize Spoken Text", questions: "1–2" },
          { itemType: "Multiple-Choice: Multiple Options", questions: "1–2" },
          { itemType: "Fill in the Blanks", questions: "2–3" },
          { itemType: "Highlight Correct Summary", questions: "1–2" },
          { itemType: "Multiple-Choice: Single Option", questions: "1–2" },
          { itemType: "Select Missing Word", questions: "1–2" },
          { itemType: "Highlight Incorrect Words", questions: "2–3" },
          { itemType: "Write from Dictation", questions: "3–4" },
        ],
      },
    ],
  };
  
  export default table;
  