import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "p-001",
    slug: "example-project-1",
    title: "Example Project One",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      },
      {
        name: "Second Author"
      }
    ],
    discipline: "Artificial Intelligence",
    type: "Research Paper",
    status: "Published",
    year: 2026,
    date: "2026-04-18",
    featured: true,
    emphasis: "featured",
    summary: "A one-line placeholder summary for example project 1, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 1. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 14,
    links: {
      paper: "#",
      github: "#"
    },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Placeholder copy for the background section of example project 1. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Background, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "research-question",
        heading: "Research Question",
        body: [
          "Placeholder copy for the research question section of example project 1. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Research Question, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "Placeholder copy for the methodology section of example project 1. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Methodology, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "matrix",
          caption: "Figure 1 \u2014 Placeholder figure for example project 1. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Placeholder copy for the results section of example project 1. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Results, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "Placeholder copy for the discussion section of example project 1. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Discussion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "Placeholder copy for the conclusion section of example project 1. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Conclusion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-002",
    slug: "example-project-2",
    title: "Example Project Two",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      }
    ],
    discipline: "Computer Science",
    type: "Software",
    status: "Published",
    year: 2026,
    date: "2026-03-02",
    featured: false,
    emphasis: "standard",
    summary: "A one-line placeholder summary for example project 2, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 2. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 9,
    links: {
      github: "#",
      demo: "#"
    },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Placeholder copy for the problem section of example project 2. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Problem, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "motivation",
        heading: "Motivation",
        body: [
          "Placeholder copy for the motivation section of example project 2. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Motivation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "Placeholder copy for the design section of example project 2. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Design, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "interface",
          caption: "Figure 1 \u2014 Placeholder figure for example project 2. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "implementation",
        heading: "Implementation",
        body: [
          "Placeholder copy for the implementation section of example project 2. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Implementation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "testing",
        heading: "Testing",
        body: [
          "Placeholder copy for the testing section of example project 2. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Testing, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "future-work",
        heading: "Future Work",
        body: [
          "Placeholder copy for the future work section of example project 2. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Future Work, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-003",
    slug: "example-project-3",
    title: "Example Project Three",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      },
      {
        name: "Second Author"
      }
    ],
    discipline: "Engineering",
    type: "Engineering",
    status: "Published",
    year: 2025,
    date: "2025-11-14",
    featured: false,
    emphasis: "standard",
    summary: "A one-line placeholder summary for example project 3, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 3. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 11,
    links: {
      github: "#",
      demo: "#"
    },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Placeholder copy for the problem section of example project 3. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Problem, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "motivation",
        heading: "Motivation",
        body: [
          "Placeholder copy for the motivation section of example project 3. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Motivation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "Placeholder copy for the design section of example project 3. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Design, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "solid",
          caption: "Figure 1 \u2014 Placeholder figure for example project 3. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "implementation",
        heading: "Implementation",
        body: [
          "Placeholder copy for the implementation section of example project 3. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Implementation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "testing",
        heading: "Testing",
        body: [
          "Placeholder copy for the testing section of example project 3. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Testing, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "future-work",
        heading: "Future Work",
        body: [
          "Placeholder copy for the future work section of example project 3. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Future Work, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-004",
    slug: "example-project-4",
    title: "Example Project Four",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      }
    ],
    discipline: "Environmental Science",
    type: "Experiment",
    status: "Published",
    year: 2026,
    date: "2026-02-09",
    featured: true,
    emphasis: "wide",
    summary: "A one-line placeholder summary for example project 4, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 4. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 12,
    links: {
      paper: "#",
      github: "#"
    },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Placeholder copy for the background section of example project 4. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Background, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "research-question",
        heading: "Research Question",
        body: [
          "Placeholder copy for the research question section of example project 4. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Research Question, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "Placeholder copy for the methodology section of example project 4. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Methodology, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "cells",
          caption: "Figure 1 \u2014 Placeholder figure for example project 4. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Placeholder copy for the results section of example project 4. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Results, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "Placeholder copy for the discussion section of example project 4. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Discussion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "Placeholder copy for the conclusion section of example project 4. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Conclusion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-005",
    slug: "example-project-5",
    title: "Example Project Five",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      },
      {
        name: "Second Author"
      }
    ],
    discipline: "Biology",
    type: "Research Paper",
    status: "In Review",
    year: 2026,
    date: "2026-01-27",
    featured: false,
    emphasis: "standard",
    summary: "A one-line placeholder summary for example project 5, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 5. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 10,
    links: {
      paper: "#",
      github: "#"
    },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Placeholder copy for the background section of example project 5. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Background, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "research-question",
        heading: "Research Question",
        body: [
          "Placeholder copy for the research question section of example project 5. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Research Question, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "Placeholder copy for the methodology section of example project 5. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Methodology, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "cells",
          caption: "Figure 1 \u2014 Placeholder figure for example project 5. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Placeholder copy for the results section of example project 5. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Results, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "Placeholder copy for the discussion section of example project 5. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Discussion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "Placeholder copy for the conclusion section of example project 5. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Conclusion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-006",
    slug: "example-project-6",
    title: "Example Project Six",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      }
    ],
    discipline: "Robotics",
    type: "Engineering",
    status: "In Progress",
    year: 2026,
    date: "2026-05-06",
    featured: false,
    emphasis: "standard",
    summary: "A one-line placeholder summary for example project 6, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 6. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 10,
    links: {
      github: "#",
      demo: "#"
    },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Placeholder copy for the problem section of example project 6. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Problem, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "motivation",
        heading: "Motivation",
        body: [
          "Placeholder copy for the motivation section of example project 6. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Motivation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "Placeholder copy for the design section of example project 6. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Design, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "solid",
          caption: "Figure 1 \u2014 Placeholder figure for example project 6. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "implementation",
        heading: "Implementation",
        body: [
          "Placeholder copy for the implementation section of example project 6. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Implementation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "testing",
        heading: "Testing",
        body: [
          "Placeholder copy for the testing section of example project 6. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Testing, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "future-work",
        heading: "Future Work",
        body: [
          "Placeholder copy for the future work section of example project 6. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Future Work, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-007",
    slug: "example-project-7",
    title: "Example Project Seven",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      },
      {
        name: "Second Author"
      }
    ],
    discipline: "Mathematics",
    type: "Research Paper",
    status: "Published",
    year: 2025,
    date: "2025-12-08",
    featured: false,
    emphasis: "standard",
    summary: "A one-line placeholder summary for example project 7, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 7. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 13,
    links: {
      paper: "#",
      github: "#"
    },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Placeholder copy for the background section of example project 7. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Background, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "research-question",
        heading: "Research Question",
        body: [
          "Placeholder copy for the research question section of example project 7. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Research Question, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "Placeholder copy for the methodology section of example project 7. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Methodology, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "curves",
          caption: "Figure 1 \u2014 Placeholder figure for example project 7. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Placeholder copy for the results section of example project 7. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Results, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "Placeholder copy for the discussion section of example project 7. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Discussion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "Placeholder copy for the conclusion section of example project 7. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Conclusion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-008",
    slug: "example-project-8",
    title: "Example Project Eight",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      }
    ],
    discipline: "Computer Science",
    type: "Software",
    status: "Published",
    year: 2026,
    date: "2026-03-21",
    featured: false,
    emphasis: "standard",
    summary: "A one-line placeholder summary for example project 8, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 8. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 11,
    links: {
      github: "#",
      demo: "#"
    },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Placeholder copy for the problem section of example project 8. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Problem, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "motivation",
        heading: "Motivation",
        body: [
          "Placeholder copy for the motivation section of example project 8. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Motivation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "Placeholder copy for the design section of example project 8. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Design, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "interface",
          caption: "Figure 1 \u2014 Placeholder figure for example project 8. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "implementation",
        heading: "Implementation",
        body: [
          "Placeholder copy for the implementation section of example project 8. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Implementation, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "testing",
        heading: "Testing",
        body: [
          "Placeholder copy for the testing section of example project 8. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Testing, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "future-work",
        heading: "Future Work",
        body: [
          "Placeholder copy for the future work section of example project 8. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Future Work, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  },
  {
    id: "p-009",
    slug: "example-project-9",
    title: "Example Project Nine",
    authors: [
      {
        name: "Author Name",
        role: "Lead"
      },
      {
        name: "Second Author"
      }
    ],
    discipline: "Engineering",
    type: "Experiment",
    status: "Published",
    year: 2025,
    date: "2025-10-19",
    featured: false,
    emphasis: "standard",
    summary: "A one-line placeholder summary for example project 9, written long enough to show how a real summary wraps inside a project card.",
    abstract: "Placeholder abstract for example project 9. This block stands in for the full abstract a student would submit, and is sized to reflect a realistic length so the expanding panel inside the project preview can be judged properly. It runs to roughly a hundred words, describing the question, the approach, and the headline result in a single unbroken paragraph \u2014 the convention most journals use. Real abstracts will replace this text once projects are loaded from the database, and no layout change should be needed when they do.",
    tags: [
      "Placeholder",
      "Example",
      "Prototype Data"
    ],
    readingTime: 9,
    links: {
      paper: "#",
      github: "#"
    },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Placeholder copy for the background section of example project 9. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Background, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "research-question",
        heading: "Research Question",
        body: [
          "Placeholder copy for the research question section of example project 9. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Research Question, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "Placeholder copy for the methodology section of example project 9. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Methodology, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ],
        figure: {
          variant: "solid",
          caption: "Figure 1 \u2014 Placeholder figure for example project 9. Captions sit under the artwork with a signal rule on the left."
        }
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Placeholder copy for the results section of example project 9. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Results, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "Placeholder copy for the discussion section of example project 9. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Discussion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "Placeholder copy for the conclusion section of example project 9. This paragraph exists to show how long-form body text sits inside the Apollo reading column \u2014 the measure, the leading, and the spacing between paragraphs. Real project writing will replace it once content is loaded from the database.",
          "A second paragraph, so the rhythm between blocks of text can be judged rather than guessed at. Sentence length here is deliberately varied. The section heading above reads Conclusion, and the numbering in the table of contents tracks whatever sections a project actually defines."
        ]
      }
    ]
  }
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const byDiscipline = PROJECTS.filter(
    (p) => p.id !== project.id && p.discipline === project.discipline,
  );
  const byTag = PROJECTS.filter(
    (p) =>
      p.id !== project.id &&
      !byDiscipline.includes(p) &&
      p.tags.some((t) => project.tags.includes(t)),
  );
  const rest = PROJECTS.filter(
    (p) => p.id !== project.id && !byDiscipline.includes(p) && !byTag.includes(p),
  );
  return [...byDiscipline, ...byTag, ...rest].slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function authorLine(project: Project): string {
  const names = project.authors.map((a) => a.name);
  if (names.length <= 2) return names.join(" & ");
  return `${names[0]} +${names.length - 1}`;
}

export function disciplineCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of PROJECTS) {
    counts.set(p.discipline, (counts.get(p.discipline) ?? 0) + 1);
  }
  return counts;
}
