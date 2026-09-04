export const TEAM_MEMBERS = [
  {
    id: 'rithvik',
    name: 'Ram Rithvik Pagadala',
    role: 'President',
    context: 'Official club officer',
    kind: 'leadership',
  },
  {
    id: 'white',
    name: 'Andrew White',
    role: 'Faculty Advisor',
    context: 'California High School',
    kind: 'leadership',
  },
  {
    id: 'khushal',
    name: 'Khushal Papula',
    role: 'Founder',
    context: 'Founding team',
    kind: 'founder',
  },
  {
    id: 'nihar',
    name: 'Nihar Manchikalapudi',
    role: 'Founder',
    context: 'Founding team',
    kind: 'founder',
  },
]

export const OFFICIAL_CLUB_RECORD_URL =
  'https://chs.srvusd.net/Student-Activities/Student-Activities/Leadership-ASB-Information/index.html'

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  { label: 'People', href: '#people' },
]

export const PROCESS_STEPS = [
  {
    id: 'question',
    number: '01',
    title: 'Question',
    description: 'Narrow an idea until it can be tested, compared, or studied.',
    output: 'A focused research question',
  },
  {
    id: 'sources',
    number: '02',
    title: 'Sources',
    description: 'Read what already exists and keep the source trail attached.',
    output: 'A traceable starting point',
  },
  {
    id: 'method',
    number: '03',
    title: 'Method',
    description: 'State what the team plans to do before interpreting an outcome.',
    output: 'A method another student can assess',
  },
  {
    id: 'record',
    number: '04',
    title: 'Record',
    description: 'Separate observations, limits, unfinished work, and next steps.',
    output: 'A project note that can be reviewed',
  },
]

export const PROJECTS = [
  {
    id: 'optimus',
    slug: 'optimus',
    authors: ['Samanyu Goyal'],
    status: 'in-progress',
    stage: 'Initial project note',
    paper: null,
    cover: null,
    title: 'Project Optimus',
    topic: 'Geometric Modification of Neural Networks',
    category: 'Machine Learning',
    tag: 'In progress',
    lead: 'Samanyu Goyal',
    question:
      'What changes when neural-network geometry is altered while the dataset, training budget, and evaluation method stay fixed?',
    currentWork: 'Define the benchmark setup and fixed baselines.',
    boundary: null,
    evidence: {
      recordLabel: 'Initial project note',
      lastUpdated: null,
      adultSponsor: null,
      sources: [],
      codeUrl: null,
      dataStatus: 'Not published',
      resultsStatus: 'No results reported',
    },
    description:
      'Testing whether changes to neural-network geometry affect learning behavior, compute cost, or interpretability.',
    overview:
      'Project Optimus compares selected structural changes with fixed baseline models. The team is defining datasets, training budgets, and evaluation measures before drawing conclusions.',
    highlights: [
      'Change one architectural variable at a time',
      'Compare each run with a fixed baseline',
      'Record datasets, training budgets, and evaluation measures',
      'Report negative results alongside positive ones',
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
          heading: 'The Question',
          body: 'What changes when the geometry of a neural network is altered while the dataset, training budget, and evaluation method stay fixed? The project focuses on learning behavior, compute cost, and interpretability.',
        },
        {
          heading: 'Planned Method',
          body: 'Each test changes one part of a standard architecture and compares it with a fixed baseline under the same training budget. The team plans to record settings and outcomes for each run.',
        },
        {
          heading: 'Current Stage',
          body: 'The current task is to establish the benchmark setup and baseline results before testing structural changes.',
        },
        {
          heading: 'Next Step',
          body: 'Run the first controlled comparisons, review the records, and revise the test plan before adding more changes.',
        },
      ],
    },
  },
  {
    id: 'atlas',
    slug: 'atlas',
    authors: ['Ricky'],
    status: 'in-progress',
    stage: 'Initial project note',
    paper: null,
    cover: null,
    title: 'Project Atlas',
    topic: "Computational Alzheimer's Research",
    category: 'Biology',
    tag: 'In progress',
    lead: 'Ricky',
    question:
      "Can a traceable data workflow connect public Alzheimer's biomarker, pathway, and compound records without losing the source behind each candidate?",
    currentWork: 'Assemble the first dataset set and test repeatable output.',
    boundary: 'Candidate outputs are research hypotheses, not medical findings.',
    evidence: {
      recordLabel: 'Initial project note',
      lastUpdated: null,
      adultSponsor: null,
      sources: [],
      codeUrl: null,
      dataStatus: 'Not published',
      resultsStatus: 'No results reported',
    },
    description:
      "Building a traceable workflow for comparing public data about Alzheimer's biomarkers, pathways, and candidate compounds.",
    overview:
      "Project Atlas is assembling public Alzheimer's datasets and planning a workflow for finding relationships across biomarkers, pathways, and candidate compounds. Any candidate must remain connected to its source and be checked against published literature.",
    highlights: [
      'Keep a source record for each imported dataset',
      'Test whether the same inputs produce the same shortlist',
      'Check candidates against published literature by hand',
      'Treat every candidate as a hypothesis, not a medical finding',
    ],
    detail: {
      methods: [
        'Bioinformatics workflow design',
        'Open biomedical databases',
        'Pathway analysis',
        'Source review',
      ],
      sections: [
        {
          heading: 'The Question',
          body: "Can a small, reproducible data workflow connect public Alzheimer's biomarker, pathway, and compound records without losing the source trail behind each candidate?",
        },
        {
          heading: 'Planned Method',
          body: 'The team plans to import selected public records, join them by documented identifiers, and preserve the source for each output. Candidate outputs would then be checked against published literature.',
        },
        {
          heading: 'Current Stage',
          body: 'The team is assembling the first dataset set and defining how repeated runs will be compared.',
        },
        {
          heading: 'Next Step',
          body: 'Document the first end-to-end run, review false matches, and decide whether the filters are specific enough to continue.',
        },
      ],
    },
  },
  {
    id: 'lambda',
    slug: 'lambda',
    authors: ['Ashmit Pai'],
    status: 'in-progress',
    stage: 'Initial project note',
    paper: null,
    cover: null,
    title: 'Project Lambda',
    topic: 'Clinical Prescription Support',
    category: 'Healthcare',
    tag: 'In progress',
    lead: 'Ashmit Pai',
    question:
      'How quickly can a prototype present relevant prescription evidence while keeping the source, uncertainty, and warning type clear?',
    currentWork: 'Define test scenarios and verify source links.',
    boundary:
      'Research prototype only. It is not validated for patient care or prescribing decisions.',
    evidence: {
      recordLabel: 'Initial project note',
      lastUpdated: null,
      adultSponsor: null,
      sources: [],
      codeUrl: null,
      dataStatus: 'Not published',
      resultsStatus: 'No results reported',
    },
    description:
      'Studying how prescription evidence and safety information could be presented quickly in a research prototype.',
    overview:
      'Project Lambda is a research prototype for presenting prescription evidence. It is not validated for patient care and is not used to make treatment or prescribing decisions.',
    highlights: [
      'Link each displayed item to its evidence source',
      'Separate interaction flags from recommendations',
      'Measure retrieval time and comprehension in test scenarios',
      'Keep the prototype outside patient care',
    ],
    detail: {
      methods: [
        'Clinical data modeling',
        'Drug interaction datasets',
        'Evidence linking',
        'Interface testing',
      ],
      sections: [
        {
          heading: 'The Question',
          body: 'How quickly can a prototype present relevant prescription evidence while keeping the source, uncertainty, and type of warning clear?',
        },
        {
          heading: 'Planned Method',
          body: 'The team plans to model test scenarios against interaction and contraindication data, then record the time and steps needed to locate source evidence. The prototype does not issue prescriptions.',
        },
        {
          heading: 'Current Stage',
          body: 'This is an early research prototype, not a clinical product. It is not validated for patient care and is not used to make treatment decisions.',
        },
        {
          heading: 'Next Step',
          body: 'Define a small set of test scenarios, verify the source links, and decide what feedback is needed before widening the study.',
        },
      ],
    },
  },
]

export const DISCORD_URL = 'https://discord.gg/pvgqDxX2NE'
