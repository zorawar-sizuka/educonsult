const table = {
    title: "IELTS Section Breakdown",
    intro:
      "A high-level view of each section, time allocation, question count, and common item types.",
    mode: "ielts",
    table: {
      columns: [
        { key: "section", label: "Test Section", widthClass: "w-[200px]" },
        { key: "time", label: "Time Allocation", widthClass: "w-[180px]" },
        { key: "questions", label: "Total Number of Questions", widthClass: "w-[220px]" },
        { key: "types", label: "Item Types" },
      ],
      rows: [
        {
          section: "Listening",
          time: "30 minutes",
          questions: "40 items",
          itemTypes: [
            "Multiple Choice",
            "Matching",
            "Plan/Map/Diagram Labeling",
            "Form/Narrative/Note/Flowchart/Summary Completion",
            "Sentence Completion",
          ],
        },
        {
          section: "Reading",
          time: "60 minutes",
          questions: "40 items",
          itemTypes: [
            "Multiple Choice",
            "Matching",
            "Plan/Map/Diagram Labeling",
            "Summary/Idea/Information/Opinion Completion",
            "True/False, Yes/No",
            "Sentence/Summary/Note/Table/Flowchart/Matching",
            "Diagram/Chart/Graph/Figure Classification",
          ],
        },
        {
          section: "Writing",
          time: "60 minutes",
          questions: "2 tasks",
          itemTypes: [
            "Task 1: Graph/Table/Chart/Diagram Description",
            "Task 2: Essay Writing",
          ],
        },
        {
          section: "Speaking",
          time: "11–15 minutes",
          questions: "3 parts",
          itemTypes: [
            "Part 1: Introduction and Interview",
            "Part 2: Individual Long Turn (Cue card)",
            "Part 3: Two-way Discussion",
          ],
        },
      ],
    },
  };
  
  export default table;
  