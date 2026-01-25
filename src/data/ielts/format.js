const format = {
    title: "Format of the IELTS Test",
    intro:
      "IELTS is divided into four parts. Each section checks a different real-world English skill and is scored separately.",
    steps: [
      {
        id: "listening",
        label: "Listening",
        meta: "30 mins • 4 Sections",
        iconKey: "headphones", 
        color: "#0E7490",
        description:
          "You listen to recordings and answer 40 questions based on what you hear. You have about 30 minutes to complete the test.",
      },
      {
        id: "reading",
        label: "Reading",
        meta: "60 mins • 3 Sections",
        iconKey: "book", 
        color: "#F97316",
        description:
          "You read passages and answer questions that test comprehension, skimming/scanning, and identifying key ideas.",
      },
      {
        id: "writing",
        label: "Writing",
        meta: "60 mins • 2 Tasks",
        iconKey: "pencil", 
        color: "#06B6D4",
        description:
          "You complete two tasks. Task 1 is a report/letter (depending on test type) and Task 2 is an essay.",
      },
      {
        id: "speaking",
        label: "Speaking",
        meta: "10–14 mins • 3 Parts",
        iconKey: "mic", 
        color: "#EF4444",
        description:
          "A face-to-face interview with an examiner: introduction, long turn, and discussion.",
      },
    ],
  };
  
  export default format;
  