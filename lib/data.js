export const TEAM_MEMBERS = [
  {
    id: 'samanyu',
    name: 'Samanyu Goyal',
    role: 'Co-Founder',
    initials: 'SG',
    tags: ['2 research papers', 'AI applications', 'Lead — Project Optimus'],
    bio: "Samanyu co-founded Apollo Labs to make rigorous, collaborative research accessible to high school students. His work centers on the AI application space — building and evaluating machine learning systems aimed at real problems rather than benchmarks alone — and he has authored two research papers. He leads Project Optimus, investigating geometric modifications to neural networks for improved performance, efficiency, and interpretability. His work spans machine learning, experimental design, and turning student-led inquiry into publishable research.",
  },
  {
    id: 'ram-rithvik',
    name: 'Ram Rithvik Pagadala',
    role: 'Co-Founder',
    initials: 'RP',
    tags: ['Lab operations', 'Mentorship', 'Research culture'],
    bio: 'Ram Rithvik co-founded Apollo Labs with a focus on building a peer-led research culture where students own the full arc of a project—from question to write-up. He helps shape lab operations, mentorship, and the collaborative workflows that keep every member contributing meaningfully across literature review, experiments, and analysis.',
  },
  {
    id: 'ashmit',
    name: 'Ashmit Pai',
    role: 'Co-Founder',
    initials: 'AP',
    tags: ['Healthcare tech', 'Clinical tooling', 'Lead — Project Lambda'],
    bio: 'Ashmit co-founded Apollo Labs and leads Project Lambda, developing fast, data-driven clinical prescription support tools. His research interests sit at the intersection of healthcare technology, software engineering, and evidence-backed decision systems designed for real clinical workflows.',
  },
]

export const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'Research', href: '#research' },
  { label: 'Team', href: '#team' },
  { label: 'Projects', href: '#projects' },
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
      'Apollo Labs brings high school students together on shared research projects — dividing literature review, experiments, analysis, and writing so everyone contributes meaningfully.',
    cta: 'See how we work →',
    href: '#research',
  },
  {
    id: 'student-led',
    caption: 'Student-led',
    title: 'By students,\nfor curiosity.',
    description:
      'We are not a class and not a competition prep factory. We are a peer-led lab where students choose questions they care about and learn how real research actually gets done.',
    cta: 'Meet the team →',
    href: '#team',
  },
  {
    id: 'projects',
    caption: 'Real projects',
    title: 'From question\nto write-up.',
    description:
      'Every project moves through hypothesis, methods, results, and discussion — producing posters, preprints, or competition submissions that reflect genuine inquiry.',
    cta: 'View projects →',
    href: '#projects',
  },
]

export const PROJECT_CATEGORIES = ['All', 'Machine Learning', 'Biology', 'Healthcare']

export const PROJECTS = [
  {
    id: 'optimus',
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
  },
  {
    id: 'atlas',
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
  },
  {
    id: 'lambda',
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
  },
]

export const CONTACT_EMAIL = 'samanyu.goyal2010@gmail.com'

export const CALENDLY_URL = 'https://calendly.com/samanyu-aiprojects/30min'

export const DISCORD_URL = 'https://discord.gg/pvgqDxX2NE'

/** Shown next to the invite link so people can see where it goes before clicking. */
export const DISCORD_HANDLE = 'discord.gg/pvgqDxX2NE'

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
      'Collaborate on an active Apollo Labs research team — literature review, experiments, analysis, and writing.',
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
