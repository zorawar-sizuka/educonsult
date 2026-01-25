
  // 1. DEFINE THE COMMON DATA ONCE
const commonCourses = [
    { 
      title: "Computer Science & IT", 
      desc: "Software Engineering, AI, Data Science, and Cyber Security.",
      icon: "Cpu" 
    },
    { 
      title: "Business & Management", 
      desc: "MBA, Finance, Marketing, International Business, and Analytics.",
      icon: "PieChart" 
    },
    { 
      title: "Engineering", 
      desc: "Mechanical, Civil, Electrical, and Mechatronics Engineering.",
      icon: "Cog" 
    },
    { 
      title: "Health & Medicine", 
      desc: "MBBS, Nursing, Public Health, and Biotechnology.",
      icon: "HeartPulse" 
    },
    { 
      title: "Law & Politics", 
      desc: "International Law, Corporate Law, and Political Science.",
      icon: "Gavel" 
    },
    { 
      title: "Arts & Design", 
      desc: "Architecture, Graphic Design, Fashion, and Media Studies.",
      icon: "Palette" 
    }
  ]; 


  ///////ACTUAL DATA OK /////////
  export const countriesData = [
    // ------------------------------------------------------------------------------------
    // 1. UNITED KINGDOM (UK)
    // ------------------------------------------------------------------------------------
    {
      slug: 'uk',
      name: 'United Kingdom',
      tagline: 'Home to the world’s oldest and most prestigious universities.',
      heroImage: '/country_hero/uk_hero.avif', // Big Ben
      
      // Theme Config (Royal Red)
      themeColor: 'bg-red-600',
      lightThemeColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
  
      stats: [
        { label: 'Avg Tuition', value: '£15k - £35k' },
        { label: 'Post-Study Work', value: '2 Years' },
        { label: 'Intakes', value: 'Sep / Jan' },
      ],
  
      universities: [
        { name: 'Cardiff Metropolitan University', logo: '/scroller/uk_universities/1.png' },
        { name: 'University of Creative Arts', logo: '/scroller/uk_universities/2.png' },
        { name: 'University of West England ', logo: '/scroller/uk_universities/3.png' },
        { name: 'Oxford International Education Group', logo: '/scroller/uk_universities/4.png' },
        { name: 'University of Chester', logo: '/scroller/uk_universities/5.png' }, 
        { name: 'University of Greenwich', logo: '/scroller/uk_universities/6.png' }, 
        { name: 'Abertay', logo: '/scroller/uk_universities/7.png' }, 
        { name: 'University of Suffolk', logo: '/scroller/uk_universities/8.png' }, 
        { name: 'University of East London', logo: '/scroller/uk_universities/9.png' },  
        { name: 'Study Group', logo: '/scroller/uk_universities/10.png' },
      ],
  
      whyFeatures: [
        { title: 'Academic Excellence', desc: 'The UK is home to 4 of the top 10 universities in the world according to QS Rankings.', icon: 'GraduationCap', span: 'col-span-1 md:col-span-2' },
        { title: 'Short Duration', desc: 'Complete a Masters in just 1 year, saving you a year of tuition and living costs.', icon: 'Clock', span: 'col-span-1' },
        { title: 'Cultural Hub', desc: 'A melting pot of history, culture, and modern innovation right at your doorstep.', icon: 'Landmark', span: 'col-span-1' },
        { title: 'Global Careers', desc: 'The Graduate Route Visa allows you to work for 2 years after graduation without a sponsor.', icon: 'Briefcase', span: 'col-span-1 md:col-span-2' },
      ],
  
      requirements: [
        {
          title: "Academic",
          details: [
            "Undergraduate: 60% - 80% in High School / A-Levels.",
            "Postgraduate: Minimum 55% - 65% in Bachelor's degree.",
            "Specific subject requirements vary by course."
          ]
        },
        {
          title: "English Language",
          details: [
            "IELTS: 6.0 - 7.5 overall.",
            "TOEFL / PTE are widely accepted.",
            "Waivers available if Year 12 English score is > 70% (University specific)."
          ]
        },
        {
          title: "Documents",
          details: [
            "Statement of Purpose (SOP)",
            "Two Letters of Recommendation (LOR)",
            "Updated CV / Resume",
            "Valid Passport"
          ]
        }
      ] ,
      courses: commonCourses
    },
  
    // ------------------------------------------------------------------------------------
    // 2. UNITED STATES (USA)
    // ------------------------------------------------------------------------------------
    {
      slug: 'usa',
      name: 'United States',
      tagline: 'The land of opportunity and global leader in research and innovation.',
      heroImage: '/country_hero/usa_hero.avif', // NYC Skyline
  
      // Theme Config (Navy Blue)
      themeColor: 'bg-blue-700',
      lightThemeColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
  
      stats: [
        { label: 'Avg Tuition', value: '$20k - $60k' },
        { label: 'OPT Period', value: '1 - 3 Years' },
        { label: 'Intakes', value: 'Aug / Jan' },
      ],
  
      universities: [ 
      
        { name: 'Harvard University', logo: '/scroller/usa_universities/1.png' },
        { name: 'Stanford University,', logo: '/scroller/usa_universities/2.png' },
        { name: 'University of California', logo: '/scroller/usa_universities/3.png' },
        { name: 'University of Washington', logo: '/scroller/usa_universities/4.pngng' },
        { name: 'Columbia University', logo: '/scroller/usa_universities/5.png' }, 
        { name: 'Yale University', logo: '/scroller/usa_universities/6.png' }, 
        { name: 'Pennsylvania', logo: '/scroller/usa_universities/7.png' }, 
        { name: 'Chicago University",', logo: '/scroller/usa_universities/8.png' }, 
        { name: 'Princeton University",', logo: '/scroller/usa_universities/9.png' }, 
        
      ],
  
      whyFeatures: [
        { title: 'STEM OPT', desc: 'STEM graduates can stay and work for up to 3 years after graduation.', icon: 'TrendingUp', span: 'col-span-1 md:col-span-2' },
        { title: 'Flexible Curriculum', desc: 'The US education system allows you to change majors and customize your degree.', icon: 'Globe', span: 'col-span-1' },
        { title: 'Research Powerhouse', desc: 'Access to the highest research funding and state-of-the-art facilities.', icon: 'GraduationCap', span: 'col-span-1' },
        { title: 'Campus Life', desc: 'Experience a vibrant campus culture with diverse clubs, sports, and communities.', icon: 'Sun', span: 'col-span-1 md:col-span-2' },
      ],
  
      requirements: [
        {
          title: "Academic",
          details: [
            "Undergraduate: SAT/ACT (Optional for many now) + High School Diploma.",
            "Postgraduate: GRE/GMAT (Course dependent) + Bachelor's Degree (4 years).",
            "GPA: 3.0+ on a 4.0 scale is generally preferred."
          ]
        },
        {
          title: "English Language",
          details: [
            "TOEFL iBT: 80 - 100+.",
            "IELTS: 6.5 - 7.5.",
            "Duolingo English Test is increasingly accepted."
          ]
        },
        {
          title: "Documents",
          details: [
            "Statement of Purpose (SOP)",
            "3 Letters of Recommendation",
            "Financial Proof (I-20 requirement)",
            "WES Evaluation (if applicable)"
          ]
        }
      ], 
    courses: commonCourses,
    },
  
    // ------------------------------------------------------------------------------------
    // 3. CANADA
    // ------------------------------------------------------------------------------------
    {
      slug: 'canada',
      name: 'Canada',
      tagline: 'World-class education with the most welcoming immigration policies.',
      heroImage: '/country_hero/canada_hero.avif', // Toronto CN Tower
  
      // Theme Config (Maple Red - darker/warmer than UK)
      themeColor: 'bg-red-500',
      lightThemeColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
  
      stats: [
        { label: 'Avg Tuition', value: 'CAD 15k - 40k' },
        { label: 'PGWP', value: 'Up to 3 Years' },
        { label: 'Intakes', value: 'Sep / Jan / May' },
      ],
  
      universities: [
        { name: 'University of Toronto', logo: '/scroller/canada_universities/1.png' },
        { name: 'The University of British Columbia', logo: '/scroller/canada_universities/2.png' },
        { name: 'McGill', logo: '/scroller/canada_universities/3.png' },
        { name: 'Mc Master University', logo: '/scroller/canada_universities/4.png' }, 
        { name: 'University of Alberta', logo: '/scroller/canada_universities/5.png' },
        { name: 'University de Montreal', logo: '/scroller/canada_universities/6.png' },
        { name: 'University of Waterloo', logo: '/scroller/canada_universities/7.png' },
        { name: 'Western University Canada', logo: '/scroller/canada_universities/8.png' }, 
        { name: 'Queens University', logo: '/scroller/canada_universities/9.png' },
        { name: 'uOttawa', logo: '/scroller/canada_universities/10.png' },
      ],
  
      whyFeatures: [
        { title: 'PR Pathway', desc: 'Canada offers clear pathways to Permanent Residency for international graduates.', icon: 'ShieldCheck', span: 'col-span-1 md:col-span-2' },
        { title: 'Affordability', desc: 'Tuition fees are generally lower compared to the US and UK.', icon: 'DollarSign', span: 'col-span-1' },
        { title: 'Quality of Life', desc: 'Consistently ranked among the best countries for quality of life and safety.', icon: 'Sun', span: 'col-span-1' },
        { title: 'Tech Boom', desc: 'Growing tech hubs in Toronto and Vancouver offering massive employment.', icon: 'TrendingUp', span: 'col-span-1 md:col-span-2' },
      ],
  
      requirements: [
        {
          title: "Academic",
          details: [
            "Undergraduate: 70% average in Grade 12.",
            "Postgraduate: 70-75% in Bachelor's degree (3 or 4 years).",
            "Backlogs: Ideally less than 5 backlogs."
          ]
        },
        {
          title: "English Language",
          details: [
            "IELTS: 6.5 overall (no band less than 6.0) is standard.",
            "SDS Stream requires strict IELTS scores.",
            "PTE is also accepted for Non-SDS applications."
          ]
        },
        {
          title: "Documents",
          details: [
            "Statement of Purpose",
            "Study Permit Application",
            "GIC (Guaranteed Investment Certificate) of CAD 10k/20k",
            "Letter of Acceptance (LOA)"
          ]
        }
      ] ,
      courses: commonCourses,
    } ,

    

// ------------------------------------------------------------------------------------
  // 4. AUSTRALIA
  // ------------------------------------------------------------------------------------
  {
    slug: 'australia',
    name: 'Australia',
    tagline: 'A world-class education with an unbeatable lifestyle.',
    heroImage: '/country_hero/australia_hero.avif', // Sydney Opera House

    // Theme Config (Teal/Ocean)
    themeColor: 'bg-teal-600',
    lightThemeColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',

    stats: [
      { label: 'Avg Tuition', value: 'AUD 20k - 45k' },
      { label: 'Post-Study Work', value: '2 - 4 Years' },
      { label: 'Intakes', value: 'Feb / July' },
    ],

    universities: [ 

      

      { name: 'University of Melbourne', logo: '/scroller/australia_universities/1.png' },
      { name: 'UNSW Sydney', logo: '/scroller/australia_universities/2.png' },
      { name: 'University of Sydney', logo: '/scroller/australia_universities/3.png' },
      { name: 'Australian National University', logo: '/scroller/australia_universities/4.png' },
      { name: 'Monash University', logo: '/scroller/australia_universities/5.png' }, 
      { name: 'The University of Queensland', logo: '/scroller/australia_universities/6.png' },
      { name: 'The University of Western Australia', logo: '/scroller/australia_universities/7.png' },
      { name: 'The University of Adelaide', logo: '/scroller/australia_universities/8.png' },
      { name: 'University of Technology Sydney', logo: '/scroller/australia_universities/9.png' },
      { name: 'RMIT', logo: '/scroller/australia_universities/10.png' },
    ],

    whyFeatures: [
      { title: 'Global Recognition', desc: 'Home to 7 of the top 100 universities in the world (Group of Eight).', icon: 'GraduationCap', span: 'col-span-1 md:col-span-2' },
      { title: 'Post-Study Work', desc: 'Generous work rights of up to 4-5 years, especially in regional areas.', icon: 'Briefcase', span: 'col-span-1' },
      { title: 'High Quality of Life', desc: 'Famous for its laid-back lifestyle, beaches, and sunny weather.', icon: 'Sun', span: 'col-span-1' },
      { title: 'Multicultural', desc: 'One of the most diverse and welcoming nations for international students.', icon: 'Globe', span: 'col-span-1 md:col-span-2' },
    ],

    requirements: [
      {
        title: "Academic",
        details: [
          "Undergraduate: Year 12 equivalent (ATAR) or Foundation Year.",
          "Postgraduate: Bachelor's degree from a recognized university.",
          "GTE (Genuine Temporary Entrant) assessment is crucial."
        ]
      },
      {
        title: "English Language",
        details: [
          "IELTS: 6.0 - 7.0 overall (University dependent).",
          "PTE Academic is widely accepted and popular.",
          "TOEFL iBT scores are also valid."
        ]
      },
      {
        title: "Documents",
        details: [
          "Academic Transcripts",
          "Valid Passport",
          "Overseas Student Health Cover (OSHC) is mandatory.",
          "Statement of Purpose (GTE Statement)"
        ]
      }
    ], 
    courses: commonCourses,
  },

  // ------------------------------------------------------------------------------------
  // 5. GERMANY
  // ------------------------------------------------------------------------------------
  {
    slug: 'germany',
    name: 'Germany',
    tagline: 'Engineering excellence and tuition-free education in the heart of Europe.',
    heroImage: '/country_hero/germany_hero.avif', // Neuschwanstein Castle or Berlin

    // Theme Config (Amber/Gold - Distinct from UK Red/US Blue)
    themeColor: 'bg-amber-600',
    lightThemeColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',

    stats: [
      { label: 'Public Tuition', value: '€0 - €300 / sem' },
      { label: 'Job Seeker Visa', value: '18 Months' },
      { label: 'Intakes', value: 'Sep / Mar' },
    ],

    universities: [
      { name: 'TU Munich', logo: '/scroller/germany_universities/1.jpg' },
      { name: 'LMU Munich', logo: '/scroller/germany_universities/2.png' },
      { name: 'Heidelberg University', logo: '/scroller/germany_universities/3.jpg' },
      { name: 'Humboldt University', logo: '/scroller/germany_universities/4.png'},
      { name: 'RWTH Aachen', logo: '/scroller/germany_universities/5.png'},
    ],

    whyFeatures: [
      { title: 'Low Costs', desc: 'Most public universities charge zero tuition fees, only a small semester contribution.', icon: 'DollarSign', span: 'col-span-1 md:col-span-2' },
      { title: 'Strong Economy', desc: 'The largest economy in Europe with massive demand for engineers and IT pros.', icon: 'TrendingUp', span: 'col-span-1' },
      { title: 'Schengen Travel', desc: 'Your student visa allows you to travel freely across 27 European countries.', icon: 'Globe', span: 'col-span-1' },
      { title: 'Innovation', desc: 'Home to global giants like BMW, Siemens, SAP, and Volkswagen.', icon: 'Briefcase', span: 'col-span-1 md:col-span-2' },
    ],

    requirements: [
      {
        title: "Academic",
        details: [
          "Undergraduate: 13 years of schooling usually required (Studienkolleg).",
          "Postgraduate: Relevant Bachelor's degree with good grades.",
          "German Universities are strict about subject relevance."
        ]
      },
      {
        title: "English/German",
        details: [
          "English Taught: IELTS 6.5+ or TOEFL.",
          "German Taught: TestDaF or DSH level B2/C1.",
          "Basic German (A1/A2) is recommended for daily life even for English courses."
        ]
      },
      {
        title: "Documents",
        details: [
          "APS Certificate (Country specific requirement)",
          "Blocked Account (Sperrkonto) with ~€11k/year",
          "Letter of Motivation",
          "CV in Europass Format"
        ]
      }
    ], 
    courses: commonCourses,
  },

  // ------------------------------------------------------------------------------------
  // 6. NEW ZEALAND
  // ------------------------------------------------------------------------------------
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    tagline: 'Pure landscapes and a forward-thinking education system.',
    heroImage: '/country_hero/newzealand_hero.avif', // Milford Sound

    // Theme Config (Fern Green/Black)
    themeColor: 'bg-emerald-700',
    lightThemeColor: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',

    stats: [
      { label: 'Avg Tuition', value: 'NZD 25k - 45k' },
      { label: 'Post-Study Work', value: 'Up to 3 Years' },
      { label: 'Intakes', value: 'Feb / July' },
    ],

    universities: [ 

        { name: 'University of Auckland', logo: '/scroller/newzealand_universities/1.png' },
        { name: 'University of Otago', logo: '/scroller/newzealand_universities/2.png'},
        { name: 'University of Waikato', logo: '/scroller/newzealand_universities/3.png' },
        { name: 'University of NewZealand', logo: '/scroller/newzealand_universities/4.png' },
        { name: 'Victoria University of Wellington', logo: '/scroller/newzealand_universities/5.png' }, 
        { name: 'University of Canterbury', logo: '/scroller/newzealand_universities/6.png' },
        { name: 'Lincoln University', logo: '/scroller/newzealand_universities/7.png'},
        { name: 'AUT University', logo: '/scroller/newzealand_universities/8.png' },
        { name: 'Southern University of Technology NewZealand', logo: '/scroller/newzealand_universities/9.png' },
        { name: 'EIT', logo: '/scroller/newzealand_universities/10.png' },
    ],

    whyFeatures: [
      { title: 'Safety First', desc: 'Consistently ranked as one of the safest and most peaceful countries on Earth.', icon: 'ShieldCheck', span: 'col-span-1 md:col-span-2' },
      { title: 'Practical Learning', desc: 'Universities focus on research-led teaching with hands-on application.', icon: 'GraduationCap', span: 'col-span-1' },
      { title: 'Work-Life Balance', desc: 'Study in a country that prioritizes mental health and outdoor exploration.', icon: 'Sun', span: 'col-span-1' },
      { title: 'Green List', desc: 'Specific pathways for roles on the "Green List" of hard-to-fill skilled jobs.', icon: 'Briefcase', span: 'col-span-1 md:col-span-2' },
    ],

    requirements: [
      {
        title: "Academic",
        details: [
          "Undergraduate: NCEA Level 3 equivalent.",
          "Postgraduate: Bachelor's degree (B average usually required).",
          "Recognition of Prior Learning (RPL) is possible."
        ]
      },
      {
        title: "English Language",
        details: [
          "IELTS: 6.0 - 6.5.",
          "PTE and TOEFL iBT accepted.",
          "NZCEL certificates also recognized."
        ]
      },
      {
        title: "Documents",
        details: [
          "Offer of Place",
          "Evidence of Funds (NZD 20k/year)",
          "Medical & Chest X-ray certificates",
          "Police Clearance Certificate"
        ]
      }
    ], 
    courses: commonCourses,
  },

  // ------------------------------------------------------------------------------------
  // 7. JAPAN
  // ------------------------------------------------------------------------------------
  {
    slug: 'japan',
    name: 'Japan',
    tagline: 'Where ancient tradition meets futuristic innovation.',
    heroImage: '/country_hero/japan_hero.avif', // Mt Fuji / Pagoda

    // Theme Config (Cherry Blossom / Flag Red)
    themeColor: 'bg-rose-500',
    lightThemeColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',

    stats: [
      { label: 'Avg Tuition', value: '¥800k - ¥1.5m' },
      { label: 'Job Stability', value: 'Very High' },
      { label: 'Intakes', value: 'Apr / Sep' },
    ],

    universities: [ 

      { name: 'UTokyo', logo: '/scroller/japan_universities/1.png' },
      { name: 'Kyoto University', logo: '/scroller/japan_universities/2.png'},
      { name: 'University of Osaka', logo: '/scroller/japan_universities/3.png' },
      { name: 'Institute of Science Tokyo', logo: '/scroller/japan_universities/4.png' },
      { name: 'Tohoku University', logo: '/scroller/japan_universities/5.png' }, 
      { name: 'Nagoya University', logo: '/scroller/japan_universities/6.png' },
      { name: 'Kyushu University', logo: '/scroller/japan_universities/7.png'},
      { name: 'Hokaido University', logo: '/scroller/japan_universities/8.png' },
      { name: 'Waseda University', logo: '/scroller/japan_universities/9.png' },
      { name: 'Keio University', logo: '/scroller/japan_universities/10.png' },
    ],

    whyFeatures: [
      { title: 'Tech Giant', desc: 'World leader in robotics, automotive, and electronics industries.', icon: 'TrendingUp', span: 'col-span-1 md:col-span-2' },
      { title: 'Safety & Hygiene', desc: 'Impeccable safety records and one of the cleanest public environments.', icon: 'ShieldCheck', span: 'col-span-1' },
      { title: 'Affordable', desc: 'Tuition is significantly lower than US/UK/Aus, with many scholarships (MEXT).', icon: 'DollarSign', span: 'col-span-1' },
      { title: 'Career Path', desc: 'Aging population means massive demand for skilled young international workers.', icon: 'Briefcase', span: 'col-span-1 md:col-span-2' },
    ],

    requirements: [
      {
        title: "Academic",
        details: [
          "Undergraduate: 12 years of formal education.",
          "Postgraduate: 16 years of education (Bachelor's degree).",
          "Entrance Exams (EJU) often required for public unis."
        ]
      },
      {
        title: "Language",
        details: [
          "English Track: IELTS/TOEFL accepted for English programs.",
          "Japanese Track: JLPT N2 or N1 required for most traditional courses.",
          "Language schools available for preparatory year."
        ]
      },
      {
        title: "Documents",
        details: [
          "Certificate of Eligibility (COE)",
          "Financial Support Proof",
          "Exam Scores (EJU / JLPT)",
          "Research Proposal (for Postgrad)"
        ]
      }
    ], 
    courses: commonCourses,
  }





  ];
  