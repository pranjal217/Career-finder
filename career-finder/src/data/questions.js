export const quizQuestions = [
  // SET 1: ELIGIBILITY & ACADEMIC PROFILE (No scoring, sets constraints)
  {
    id: 'educationLevel',
    set: 1,
    type: 'eligibility',
    question: "What is your highest level of completed or current education?",
    options: [
      { text: "Schooling (Completed Class 12 / 10+2 or awaiting results)", value: "school" },
      { text: "Graduation (Completed Bachelor's Degree)", value: "graduate" },
      { text: "Postgraduate or Working Professional", value: "professional" }
    ]
  },
  {
    id: 'stream12th',
    set: 1,
    type: 'eligibility',
    question: "What was your primary stream in Class 12 (10+2)?",
    options: [
      { text: "Science with Biology (PCB - Physics, Chemistry, Biology)", value: "pcb" },
      { text: "Science without Biology (PCM - Physics, Chemistry, Math)", value: "pcm" },
      { text: "Other Streams (Commerce, Arts, Humanities, etc.)", value: "other" }
    ]
  },
  {
    id: 'gradField',
    set: 1,
    type: 'eligibility',
    question: "If you have completed graduation, what was your field of study?",
    options: [
      { text: "Life Sciences / Biology / Medical / Physiotherapy / Sports Science / Physical Education", value: "science_grad" },
      { text: "Other Fields (Commerce, Business, Arts, Engineering, etc.)", value: "other_grad" },
      { text: "Not Applicable (I am a High School Student)", value: "na" }
    ]
  },
  {
    id: 'percentage',
    set: 1,
    type: 'eligibility',
    question: "What is your aggregate academic score (percentage) in your highest qualification?",
    options: [
      { text: "40% or above", value: "above_40" },
      { text: "Below 40%", value: "below_40" }
    ]
  },
  {
    id: 'experienceLevel',
    set: 1,
    type: 'eligibility',
    question: "What best describes your sports industry experience or intent?",
    options: [
      { text: "Fresh student / No experience / Exploring options", value: "fresher" },
      { text: "Have sports experience (state player, academy worker, or intern)", value: "experienced" },
      { text: "Looking for high-level specialized research or coaching paths", value: "advanced" }
    ]
  },

  // SET 2: KEY INTERESTS
  {
    id: 'q6Interest',
    set: 2,
    type: 'interest',
    question: "Which of the following aspects of a professional sports team excites you the most?",
    options: [
      { 
        text: "Building the brand, selling ticket experiences, and securing sponsorship deals.", 
        weights: { sports_marketing: 4, sports_management: 2 } 
      },
      { 
        text: "Analyzing player game videos, metrics, and tracking tactical statistics.", 
        weights: { sports_analytics: 4, sports_science: 1 } 
      },
      { 
        text: "Designing player diets, recovery programs, and training physical stamina.", 
        weights: { sports_science: 4, sports_coaching: 2 } 
      },
      { 
        text: "Coaching player techniques, field drills, and managing overall team game tactics.", 
        weights: { sports_coaching: 4, sports_analytics: 2 } 
      },
      {
        text: "Directing match day operations, budgets, and managing the sports arena.",
        weights: { sports_management: 4, sports_marketing: 1 }
      }
    ]
  },
  {
    id: 'q7Activity',
    set: 2,
    type: 'interest',
    question: "How do you prefer to interact with a sport in your free time?",
    options: [
      { 
        text: "Analyzing trade windows, player salary negotiations, and club sponsorships.", 
        weights: { sports_management: 3, sports_marketing: 3 } 
      },
      { 
        text: "Reading about sports science research, injury updates, or bio-mechanics.", 
        weights: { sports_science: 4 } 
      },
      { 
        text: "Creating content, tracking fan trends, or managing sports social media.", 
        weights: { sports_marketing: 4 } 
      },
      { 
        text: "Developing tactical boards or playing strategy-heavy simulator/management games.", 
        weights: { sports_analytics: 4, sports_coaching: 1 } 
      }
    ]
  },

  // SET 3: CORE SKILLS
  {
    id: 'q8Strength',
    set: 3,
    type: 'interest',
    question: "What is your single greatest strength when working in a group?",
    options: [
      { 
        text: "Communication, salesmanship, and persuading others.", 
        weights: { sports_marketing: 4 } 
      },
      { 
        text: "Structured organization, budgeting, and leadership control.", 
        weights: { sports_management: 4 } 
      },
      { 
        text: "Finding hidden patterns in numbers, tables, and statistics.", 
        weights: { sports_analytics: 4 } 
      },
      { 
        text: "Scientific thinking, understanding body functions, and diagnosing details.", 
        weights: { sports_science: 4 } 
      },
      { 
        text: "Motivating people, instructing, and demonstrating movement/drills.", 
        weights: { sports_coaching: 4 } 
      }
    ]
  },
  {
    id: 'q9Problem',
    set: 3,
    type: 'interest',
    question: "Which of the following problems would you enjoy solving the most?",
    options: [
      { 
        text: "A team's sponsor pull-out needs immediate recovery through marketing campaigns.", 
        weights: { sports_marketing: 4, sports_management: 1 } 
      },
      { 
        text: "An athlete keeps pulling their hamstring and needs biomechanical profiling.", 
        weights: { sports_science: 4 } 
      },
      { 
        text: "A team needs to evaluate which undervalued player to sign using data models.", 
        weights: { sports_analytics: 4 } 
      },
      { 
        text: "A local academy is losing matches due to poor tactical coordination and moral drops.", 
        weights: { sports_coaching: 4, sports_management: 1 } 
      }
    ]
  },

  // SET 4: WORK STYLE
  {
    id: 'q10Environment',
    set: 4,
    type: 'interest',
    question: "In what work environment would you be the most productive?",
    options: [
      { 
        text: "An office environment, boardroom, or handling corporate clients.", 
        weights: { sports_management: 3, sports_marketing: 3 } 
      },
      { 
        text: "A scientific laboratory, clinical setup, or performance gym.", 
        weights: { sports_science: 4 } 
      },
      { 
        text: "Right on the field, training track, or court side with players.", 
        weights: { sports_coaching: 4, sports_science: 1 } 
      },
      { 
        text: "A tech workstation building reports, running video analysis, and coding dashboards.", 
        weights: { sports_analytics: 4 } 
      }
    ]
  }
];