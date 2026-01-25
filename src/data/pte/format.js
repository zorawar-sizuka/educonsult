const format = {
    title: "Format of the PTE Academic Test",
    intro:
      "PTE Academic is a computer-based English language test that evaluates your Speaking, Writing, Reading, and Listening skills in a single integrated session.",
  
    steps: [
      {
        id: "speaking-writing",
        label: "Speaking & Writing",
        meta: "Part 1 • ~54–67 minutes",
        iconKey: "mic",
        color: "#0E7490",
        description:
          "This section begins with an unscored personal introduction and continues with tasks such as Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture, Summarize Written Text, and Essay Writing. It evaluates pronunciation, fluency, grammar, vocabulary, and written communication.",
      },
      {
        id: "reading",
        label: "Reading",
        meta: "Part 2 • ~29–30 minutes",
        iconKey: "book",
        color: "#F97316",
        description:
          "The Reading section includes tasks like Multiple-Choice questions, Re-order Paragraphs, and Fill in the Blanks. It measures your ability to understand written English, identify main ideas, and interpret information accurately.",
      },
      {
        id: "listening",
        label: "Listening",
        meta: "Part 3 • ~30–43 minutes",
        iconKey: "headphones",
        color: "#06B6D4",
        description:
          "In this section, you listen to audio or video clips and answer questions such as Summarize Spoken Text, Highlight Correct Summary, Select Missing Word, and Write from Dictation. It assesses listening comprehension and note-taking skills.",
      },
      {
        id: "duration",
        label: "Total Test Duration",
        meta: "Single sitting • ~2 hours",
        iconKey: "pencil",
        color: "#10B981",
        description:
          "PTE Academic is completed in one continuous session without breaks. All sections are taken on a computer, and responses are scored using AI-based assessment for speed and consistency.",
      },
    ],
  };
  
  export default format;
  