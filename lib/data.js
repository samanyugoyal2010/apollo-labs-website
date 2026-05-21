export const TEAM_MEMBERS = [
  {
    id: 'samanyu',
    name: 'Samanyu Goyal',
    role: 'Co-Founder',
    initials: 'SG',
    bio: 'Samanyu co-founded Apollo Labs to make rigorous, collaborative research accessible to high school students. He leads Project Optimus, investigating geometric modifications to neural networks for improved performance, efficiency, and interpretability. His work spans machine learning, experimental design, and turning student-led inquiry into publishable research.',
  },
  {
    id: 'ram-rithvik',
    name: 'Ram Rithvik Pagadala',
    role: 'Co-Founder',
    initials: 'RP',
    bio: 'Ram Rithvik co-founded Apollo Labs with a focus on building a peer-led research culture where students own the full arc of a project—from question to write-up. He helps shape lab operations, mentorship, and the collaborative workflows that keep every member contributing meaningfully across literature review, experiments, and analysis.',
  },
  {
    id: 'ashmit',
    name: 'Ashmit Pai',
    role: 'Co-Founder',
    initials: 'AP',
    bio: 'Ashmit co-founded Apollo Labs and leads Project Lambda, developing fast, data-driven clinical prescription support tools. His research interests sit at the intersection of healthcare technology, software engineering, and evidence-backed decision systems designed for real clinical workflows.',
  },
  {
    id: 'rithvik',
    name: 'Rithvik Boyapati',
    role: 'Head of Engineering',
    initials: 'RB',
    bio: 'My research interests focus on computer science, engineering, and intelligent communication systems, with a particular interest in optical communication, embedded systems, artificial intelligence, and cybersecurity. I am especially interested in how emerging technologies can be used to create faster, more secure, and more efficient communication systems. Through my OPTICS project (Optical Performance of Transmitter Interfaces, Communication, and Signals), I have explored Li-Fi and light-based wireless communication using lasers, photodiodes, microcontrollers, and signal processing techniques. I am also interested in robotics, machine learning, and network engineering, especially in applications involving automation, healthcare technology, and secure systems. Currently, I am working on projects involving optical data transmission, embedded hardware systems, and robotics programming, while continuing to explore the intersection of AI, communication technology, and cybersecurity.',
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

export const CALENDLY_URL = 'https://calendly.com/samanyu-goyal2010/meeting'

export const JOIN_OPTIONS = [
  {
    id: 'researcher',
    title: 'Join a project',
    description:
      'Collaborate on an active Apollo Labs research team — literature review, experiments, analysis, and writing.',
    cta: 'Apply as a researcher',
  },
  {
    id: 'propose',
    title: 'Propose a project',
    description:
      'Bring a question you care about. We help you shape it into a real hypothesis-to-write-up research project.',
    cta: 'Pitch your idea',
  },
  {
    id: 'partner',
    title: 'Partner with us',
    description:
      'Teachers, mentors, and organizations — collaborate with our student-led lab on outreach or resources.',
    cta: 'Start a conversation',
  },
]
