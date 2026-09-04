export const TEAM_MEMBERS = [
  {
    id: 'samanyu',
    name: 'Samanyu Goyal',
    role: 'Co-Founder',
    initials: 'SG',
    tags: ['2 research papers', 'AI applications', 'Lead — Project Optimus'],
    bio: "Samanyu co-founded Collaborative Research Club to make rigorous, collaborative research accessible to high school students. His work centers on the AI application space — building and evaluating machine learning systems aimed at real problems rather than benchmarks alone — and he has authored two research papers. He leads Project Optimus, investigating geometric modifications to neural networks for improved performance, efficiency, and interpretability. His work spans machine learning, experimental design, and turning student-led inquiry into publishable research.",
  },
  {
    id: 'ram-rithvik',
    name: 'Ram Rithvik Pagadala',
    role: 'Co-Founder',
    initials: 'RP',
    tags: ['Lab operations', 'Mentorship', 'Research culture'],
    bio: 'Ram Rithvik co-founded Collaborative Research Club with a focus on building a peer-led research culture where students own the full arc of a project—from question to write-up. He helps shape lab operations, mentorship, and the collaborative workflows that keep every member contributing meaningfully across literature review, experiments, and analysis.',
  },
  {
    id: 'ashmit',
    name: 'Ashmit Pai',
    role: 'Co-Founder',
    initials: 'AP',
    tags: ['Healthcare tech', 'Clinical tooling', 'Lead — Project Lambda'],
    bio: 'Ashmit co-founded Collaborative Research Club and leads Project Lambda, developing fast, data-driven clinical prescription support tools. His research interests sit at the intersection of healthcare technology, software engineering, and evidence-backed decision systems designed for real clinical workflows.',
  },
]

export const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'Research', href: '#research' },
  { label: 'Team', href: '#team' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publish', href: '#submit' },
]

export const RESEARCH_TAGS = [
  'Biology',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Mathematics',
  'Environmental Science',
  'Neuroscience',
  'Data Science',
]

export const MISSION_PILLARS = [
  {
    id: 'collaborative',
    caption: 'Collaborative research',
    title: 'Build knowledge,\ntogether.',
    description:
      'Collaborative Research Club brings high school students together on shared research projects — dividing literature review, experiments, analysis, and writing so everyone contributes meaningfully.',
    cta: 'Get involved →',
    href: '#join-us',
    overview:
      'Research at Collaborative Research Club is a team sport. Each project runs as a small crew with clearly split responsibilities, so nobody is stuck reading papers alone or writing the whole draft the night before a deadline. Work is coordinated in project channels where drafts, data, and dead ends are all shared openly.',
    points: [
      'Every project has a lead who scopes the question and keeps the team unblocked',
      'Literature review, experiments, analysis, and writing are split across members',
      'Drafts get read and critiqued by peers before anything leaves the lab',
      'Progress happens in the open — project channels, not private docs',
    ],
  },
  {
    id: 'student-led',
    caption: 'Student-led',
    title: 'By students,\nfor curiosity.',
    description:
      'We are not a class and not a competition prep factory. We are a peer-led lab where students choose questions they care about and learn how real research actually gets done.',
    cta: 'Meet the team →',
    href: '#team',
    overview:
      'There is no teacher assigning topics here. Members bring questions they actually care about, and the lab helps turn them into something rigorous enough to defend. The point is learning how research is really done — including the messy parts that classes skip.',
    points: [
      'No application and no waiting list — introduce yourself and start contributing',
      'Members pick the projects and questions they want to work on',
      'Mentorship comes from peers who have already been through the process',
      'Open to all high school students, regardless of prior research experience',
    ],
  },
  {
    id: 'projects',
    caption: 'Real projects',
    title: 'From question\nto write-up.',
    description:
      'Every project moves through hypothesis, methods, results, and discussion — producing posters, preprints, or competition submissions that reflect genuine inquiry.',
    cta: 'View projects →',
    href: '#projects',
    overview:
      'A project is not finished when the code runs — it is finished when someone outside the lab can read what you found and judge it. Every Collaborative Research Club project is pushed all the way through to an artifact: a poster, a preprint, or a competition submission.',
    points: [
      'Hypothesis and scope defined before any experiments start',
      'Methods documented well enough for someone else to reproduce them',
      'Results reviewed honestly, including the ones that did not work',
      'Ends in a real output — poster, preprint, or competition submission',
    ],
  },
]

export const PROJECT_CATEGORIES = ['All', 'Machine Learning', 'Biology', 'Healthcare']

export const PROJECTS = [
  {
    id: 'optimus',
    slug: 'optimus',
    authors: ['Samanyu Goyal'],
    status: 'in-progress',
    // Set when a paper is approved: { pdf, published, doi }. `pdf` lives in
    // public/papers/ and turns on the download button on the project page.
    paper: null,
    // A cover image in public/covers/ (1200x630-ish). Null falls back to the
    // generated gradient-and-mark cover, so the gallery never looks unfinished.
    cover: null,
    title: 'Project Optimus',
    topic: 'Geometric Modification of Neural Networks',
    category: 'Machine Learning',
    tag: 'In progress',
    lead: 'Samanyu Goyal',
    description:
      'Investigating how geometric modifications to neural network structure can improve performance, efficiency, and interpretability.',
    overview:
      'Project Optimus pushes the frontier of neural network design by treating model geometry as a first-class research variable — not an afterthought. The team explores how structural modifications can unlock models that learn faster, generalize better, and remain interpretable enough for real scientific use.',
    highlights: [
      'Novel geometric transformations applied to network layers and connectivity patterns',
      'Benchmarking against standard architectures on research-relevant datasets',
      'Focus on efficiency gains without sacrificing predictive accuracy',
      'Building toward publishable methods for student-led ML research labs',
    ],
    detail: {
      methods: [
        'Architecture ablations',
        'Controlled benchmarking',
        'Efficiency profiling',
        'Interpretability analysis',
      ],
      sections: [
        {
          heading: 'The question',
          body: 'Most work on neural network design treats architecture as a set of dials — width, depth, number of heads — tuned empirically until the numbers stop improving. Project Optimus starts from a different premise: that the geometry of a network, meaning the shape of its connectivity and the structure of the spaces its representations live in, is itself a variable worth manipulating deliberately. The project asks what happens to learning dynamics, efficiency, and interpretability when that geometry is changed on purpose rather than inherited from convention.',
        },
        {
          heading: 'How we work on it',
          body: 'The team runs a loop of implement, benchmark, analyze. Each geometric modification is written as a drop-in change to a standard architecture, so a modified model and its baseline differ in exactly one respect and train under the same budget — the comparison stays honest. Every run is logged so any member of the lab can reproduce it, and experiments that do not pan out get written up alongside the ones that do.',
        },
        {
          heading: 'Where it stands',
          body: 'In progress. The current focus is the benchmarking harness and a set of trustworthy baselines, so that any later claim about an architecture rests on a comparison that was designed before the results came in rather than after.',
        },
        {
          heading: "What's next",
          body: 'Widening the set of transformations under test, tightening how efficiency is measured, and shaping the strongest findings into a write-up aimed at venues that publish student research.',
        },
      ],
      contribute:
        'Useful background: Python, some exposure to deep learning, or a willingness to read papers carefully and argue about them. Members join a project channel and pick up a slice — a transformation to implement, a baseline to reproduce, a section to draft.',
    },
  },
  {
    id: 'atlas',
    slug: 'atlas',
    authors: ['Ricky'],
    status: 'in-progress',
    paper: null,
    cover: null,
    title: 'Project Atlas',
    topic: "Computational Alzheimer's Research",
    category: 'Biology',
    tag: 'In progress',
    lead: 'Ricky',
    description:
      'A bioinformatics project using computational approaches to identify potential therapeutic targets and drug candidates for Alzheimer\'s disease.',
    overview:
      'Project Atlas bridges biology and computation to tackle one of medicine\'s hardest problems: Alzheimer\'s disease. By mining genomic, proteomic, and pathway data, the team searches for actionable drug targets and therapeutic candidates that traditional lab workflows might miss for years.',
    highlights: [
      'Large-scale analysis of Alzheimer\'s-related biomarkers and pathways',
      'Computational screening pipeline for candidate therapeutics',
      'Integration of open biomedical databases with custom student-built tools',
      'Aims to produce hypotheses ready for wet-lab validation and competition submissions',
    ],
    detail: {
      methods: [
        'Bioinformatics pipelines',
        'Open biomedical databases',
        'Pathway analysis',
        'Computational screening',
      ],
      sections: [
        {
          heading: 'The question',
          body: "Alzheimer's research does not suffer from a shortage of data. Genomic, proteomic, and pathway datasets are public and enormous, and more arrive every month. What is scarce is the time to connect them — to notice that a biomarker flagged in one study sits on a pathway that a second study implicates and a third has already characterized a compound against. Project Atlas asks how much of that connective work can be done computationally by a small team.",
        },
        {
          heading: 'How we work on it',
          body: 'The project builds a screening pipeline that pulls from open biomedical databases and looks for candidate targets across sources rather than within any one of them. Custom student-built tooling handles the joins and filters, so a hypothesis can be traced back to the exact records that produced it. Every candidate that survives the pipeline is read by hand against the literature before it goes any further.',
        },
        {
          heading: 'Where it stands',
          body: 'In progress. Work is centered on assembling the datasets and getting the pipeline to produce results that are reproducible end to end — the same inputs yielding the same shortlist — which is the prerequisite for trusting anything it surfaces.',
        },
        {
          heading: "What's next",
          body: 'Narrowing the shortlist into a small number of well-argued hypotheses, each documented well enough to hand to a wet lab for validation or to submit to research competitions.',
        },
      ],
      contribute:
        'Useful background: biology coursework, Python, or comfort reading primary literature. There is real work here for members who want to write code and for members who want to do the reading — most projects need both.',
    },
  },
  {
    id: 'lambda',
    slug: 'lambda',
    authors: ['Ashmit Pai'],
    status: 'in-progress',
    paper: null,
    cover: null,
    title: 'Project Lambda',
    topic: 'Clinical Prescription Support',
    category: 'Healthcare',
    tag: 'In progress',
    lead: 'Ashmit Pai',
    description:
      'Developing fast, data-driven tools to help doctors prescribe medications more efficiently and with stronger clinical support.',
    overview:
      'Project Lambda is built for the moment a clinician needs an answer — fast. The team designs decision-support tools that surface drug interaction risks, evidence-backed options, and prescribing pathways in seconds, reducing cognitive load in high-stakes clinical settings.',
    highlights: [
      'Rapid lookup of drug interactions and contraindication flags',
      'Evidence-linked prescribing recommendations for common scenarios',
      'Interface designed for speed — minimal clicks, maximum clarity',
      'Grounded in real clinical workflows, not abstract toy datasets',
    ],
    detail: {
      methods: [
        'Clinical data modeling',
        'Drug interaction datasets',
        'Evidence linking',
        'Workflow-first interface design',
      ],
      sections: [
        {
          heading: 'The question',
          body: 'A clinician deciding on a prescription is rarely missing the evidence. The interaction is documented, the contraindication is known, the guideline exists — but it sits several searches away, and the decision has to happen now. Project Lambda treats that gap as an interface and data problem rather than a knowledge problem: how much of what a prescriber needs can be surfaced in the seconds actually available?',
        },
        {
          heading: 'How we work on it',
          body: 'The team models prescribing scenarios against interaction and contraindication data, then designs around the constraint that matters most in a clinic — time. Recommendations are linked back to the evidence behind them rather than presented bare, so the tool argues its case instead of asking to be trusted. Design decisions are checked against how prescribing actually happens, not against a tidied-up version of it.',
        },
        {
          heading: 'Where it stands',
          body: 'In progress, and a research prototype rather than a clinical product. It is not validated for patient care and is not used to make real prescribing decisions; the goal at this stage is to establish whether the approach holds up, not to deploy it.',
        },
        {
          heading: "What's next",
          body: 'Broadening coverage beyond the initial set of scenarios, and putting the interface in front of practicing clinicians for the kind of feedback that only comes from people who do this under time pressure every day.',
        },
      ],
      contribute:
        'Useful background: software engineering, health sciences, or an interest in how information design changes decisions. Members contribute to data modeling, interface work, and the evidence review that keeps the recommendations defensible.',
    },
  },
]

export const CONTACT_EMAIL = 'samanyu.goyal2010@gmail.com'

export const CALENDLY_URL = 'https://calendly.com/samanyu-aiprojects/30min'

export const DISCORD_URL = 'https://discord.gg/pvgqDxX2NE'

export const DISCORD_PERKS = [
  'Meet the team and every active researcher',
  'Project channels for Optimus, Atlas, and Lambda',
  'Ask questions, share drafts, get feedback',
  'Hear about new projects before anyone else',
]

export const JOIN_OPTIONS = [
  {
    id: 'researcher',
    title: 'Join a project',
    description:
      'Collaborate on an active Collaborative Research Club research team — literature review, experiments, analysis, and writing.',
    cta: 'Find your project on Discord',
    action: 'discord',
  },
  {
    id: 'propose',
    title: 'Propose a project',
    description:
      'Bring a question you care about. We help you shape it into a real hypothesis-to-write-up research project.',
    cta: 'Pitch it on Discord',
    action: 'discord',
  },
  {
    id: 'partner',
    title: 'Partner with us',
    description:
      'Teachers, mentors, and organizations — collaborate with our student-led lab on outreach or resources.',
    cta: 'Start a conversation',
    action: 'email',
  },
]

/**
 * Where paper submissions land for review. Kept separate from CONTACT_EMAIL:
 * general enquiries and manuscripts go to different people.
 */
export const REVIEW_EMAIL = 'ashmitpai2009@gmail.com'

/** Fields offered in the "Field of research" picker on the submission form. */
export const SUBMISSION_FIELDS = [
  'Machine Learning',
  'Computer Science',
  'Biology',
  'Neuroscience',
  'Healthcare',
  'Chemistry',
  'Physics',
  'Mathematics',
  'Environmental Science',
  'Data Science',
  'Other',
]

/** What a submission needs to clear review — shown next to the form. */
export const SUBMISSION_CHECKLIST = [
  'A finished paper or project write-up, exported as a PDF',
  'An abstract of roughly 150–250 words, written for a non-specialist',
  'Every author named, with the school each of them attends',
  'Methods described well enough that someone else could repeat them',
  'Sources cited, and any data or code you can share linked',
]
