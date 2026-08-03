export const profile = {
  name: "Furong Huang",
  labName: "Furong Lab",
  title: "Associate Professor of Computer Science",
  institution: "University of Maryland",
  location: "Brendan Iribe Center",
  scholar: "https://scholar.google.com/citations?hl=en&user=13yyuCcAAAAJ",
  x: "https://twitter.com/furongh",
  linkedin: "https://www.linkedin.com/in/furong-huang",
  youtube: "https://www.youtube.com/@furongh",
  github: "https://github.com/FurongHuang",
  huggingface: "https://huggingface.co/furonghuang-lab"
};

export const affiliations = [
  { label: "Department of Computer Science", href: "https://www.cs.umd.edu/" },
  { label: "Center for Machine Learning · UMIACS", href: "https://ml.umd.edu/" },
  { label: "Maryland Robotics Center", href: "https://robotics.umd.edu/" },
  { label: "Applied Mathematics, Statistics, and Scientific Computation", href: "https://amsc.umd.edu/" },
  { label: "Department of Electrical and Computer Engineering", href: "https://ece.umd.edu/" }
] as const;

export const selectedRecognition = [
  { year: "2026", title: "NVIDIA Academic Grant", detail: "Support for frontier academic research in artificial intelligence." },
  { year: "2024", title: "NeurIPS workshop Best Paper Award", detail: "New Frontiers in Adversarial Machine Learning (AdvML Frontier)." },
  { year: "2024", title: "NSF NAIRR Pilot Award", detail: "Guardians of Integrity in AI: Establishing Trust, Originality, and Ethical Standards." },
  { year: "2023", title: "Microsoft Accelerate Foundation Models Research Award", detail: "Recognition and support for foundation-model research." },
  { year: "2022", title: "MIT Technology Review Innovators Under 35", detail: "Asia Pacific honoree for work on trustworthy artificial intelligence." },
  { year: "2019–2022", title: "Three JP Morgan Faculty Research Awards", detail: "AI security, robust and fair financial models, and learning over financial data streams." }
] as const;

export const applicationAreas = [
  { title: "Biology and medicine", detail: "Learning structure in brain-cell populations and human-disease hierarchies, with applications extending to therapeutic discovery." },
  { title: "Robotics and embodied systems", detail: "World models and transferable policies that help agents understand scenes, predict interaction, and act through physical bodies." },
  { title: "Resilient infrastructure", detail: "Sequential decision-making and multi-agent learning for systems such as power grids operating under uncertainty and disruption." },
  { title: "Financial integrity", detail: "Robust, private, and fair learning for financial models exposed to changing data and adversarial behavior." },
  { title: "Content authenticity", detail: "Benchmarks, attacks, and defenses for hallucination, data poisoning, AI-generated content, and invisible watermarks." },
  { title: "Efficient adaptation", detail: "Methods for updating, routing, and fine-tuning large industrial models while controlling computation and data requirements." }
] as const;

export const legacyProjects = [
  {
    id: "protected",
    area: "Robust reinforcement learning",
    title: "PROTECTED",
    summary: "Adaptive robust RL moves beyond a single worst-case policy by selecting among non-dominated policies as attack conditions change.",
    visualLabel: "PR",
    theme: "violet" as const,
    year: 2024,
    links: [
      { label: "Project", href: "https://protected-beyond-worst-case.github.io/home/" },
      { label: "Paper", href: "https://arxiv.org/abs/2402.12673" }
    ]
  },
  {
    id: "phtest",
    area: "AI safety and usability",
    title: "PHTest",
    summary: "A large diagnostic dataset and red-teaming method for measuring when safety-aligned language models incorrectly refuse harmless requests.",
    visualLabel: "PH",
    theme: "violet" as const,
    year: 2024,
    links: [
      { label: "Project", href: "https://phtest-frf.github.io/" },
      { label: "Paper", href: "https://arxiv.org/abs/2409.00598" },
      { label: "Code", href: "https://github.com/umd-huang-lab/FalseRefusal" }
    ]
  },
  {
    id: "elbert",
    area: "Long-term fairness",
    title: "ELBERT",
    summary: "A sequential fairness framework that measures equal long-term benefit rates while preserving useful decision-making policies.",
    visualLabel: "EL",
    theme: "violet" as const,
    year: 2024,
    links: [
      { label: "Project", href: "https://elbert-long-term-fairness.github.io/home/" },
      { label: "Paper", href: "https://arxiv.org/abs/2309.03426" },
      { label: "Code", href: "https://github.com/umd-huang-lab/ELBERT" }
    ]
  },
  {
    id: "easy2hard",
    area: "Generalization",
    title: "Easy2Hard-Bench",
    summary: "Standardized continuous difficulty labels reveal how language models generalize across mathematics, programming, chess, and reasoning tasks.",
    visualLabel: "E2H",
    theme: "teal" as const,
    year: 2024,
    links: [
      { label: "Project", href: "https://easy2hardbench.github.io/home/" },
      { label: "Paper", href: "https://arxiv.org/abs/2409.18433" },
      { label: "Code", href: "https://github.com/umd-huang-lab/Easy2Hard-Bench" }
    ]
  },
  {
    id: "dyart",
    area: "Adversarial robustness",
    title: "DyART",
    summary: "Dynamics-aware robust training tracks how decision boundaries move and prioritizes vulnerable examples with the smallest margins.",
    visualLabel: "Dy",
    theme: "teal" as const,
    year: 2023,
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2302.03015" },
      { label: "Code", href: "https://github.com/umd-huang-lab/Dynamics-Aware-Robust-Training" }
    ]
  }
] as const;

export const foundationalPublicationTitles = [
  "High-Dimensional Gaussian Graphical Model Selection: Walk-Summability and Local Separation Criterion",
  "High-Dimensional Structure Learning of Ising Models: Local Separation Criterion",
  "Learning High-Dimensional Mixtures of Graphical Models",
  "Escaping From Saddle Points - Online Stochastic Gradient for Tensor Decomposition",
  "Learning Deep ResNet Blocks Sequentially using Boosting Theory"
] as const;

export const socialLinks = [
  { id: "scholar", label: "Google Scholar", href: profile.scholar },
  { id: "x", label: "X / Twitter", href: profile.x },
  { id: "linkedin", label: "LinkedIn", href: profile.linkedin },
  { id: "youtube", label: "YouTube", href: profile.youtube },
  { id: "github", label: "GitHub", href: profile.github },
  { id: "huggingface", label: "Hugging Face", href: profile.huggingface }
];

export {
  frontierPublicationTitles,
  impactPublicationTitles,
  projects,
  researchPillars,
  selectedPublicationTitles
} from "./researchContent";

export const news = [
  {
    date: "August 2026",
    type: "Talk",
    title: "Reasoning as Control: Toward Self-Improving Agentic Systems",
    detail: "Featured talk at the Agentic AI Summit 2026 at UC Berkeley, spanning control across thinking, actions, and workflow.",
    href: "https://rdi.berkeley.edu/events/agentic-ai-summit-2026"
  },
  {
    date: "July 2026",
    type: "Teaching",
    title: "Generative AI Agents at DeepLearn 2026",
    detail: "An advanced summer-school course on agent architectures, reasoning, alignment, safety, and world models."
  },
  {
    date: "June 2026",
    type: "Talk",
    title: "Building Self-Improving Foundation Models",
    detail: "Auditors, actuators, and amplifiers for trustworthy AI.",
    href: "https://furong-huang.com/wp-content/uploads/2026/06/Building-Self-Improving-Foundation-Models_June_2026.pdf"
  },
  {
    date: "June 2026",
    type: "Talk",
    title: "Reasoning as Control",
    detail: "Adaptive test-time compute for planning agents.",
    href: "https://furong-huang.com/wp-content/uploads/2026/06/Test-Time_Thinking_Control_June_2026.pdf"
  },
  {
    date: "April 2026",
    type: "Publications",
    title: "Seven papers accepted to ICML 2026",
    detail: "Work spanning reasoning, safety, multimodal systems, scientific prediction, and multi-agent learning."
  },
  {
    date: "April 2026",
    type: "Impact",
    title: "PropensityBench adopted in Meta Muse",
    detail: "The agentic safety benchmark is used in the released Muse Spark MSL model."
  },
  {
    date: "February 2026",
    type: "Publications",
    title: "TraceGen accepted to CVPR 2026",
    detail: "World modeling in 3D trace space for cross-embodiment robot learning.",
    href: "https://tracegen.github.io/"
  },
  {
    date: "January 2026",
    type: "Recognition",
    title: "Five papers accepted to ICLR 2026",
    detail: "Including MomaGraph, selected for an oral presentation."
  },
  {
    date: "November 2025",
    type: "Recognition",
    title: "AAAI 2026 oral",
    detail: "One paper accepted and selected for an oral presentation."
  },
  {
    date: "September 2025",
    type: "Publications",
    title: "Four papers accepted to NeurIPS 2025",
    detail: "Including one spotlight presentation."
  },
  {
    date: "August 2025",
    type: "Keynote",
    title: "World-model learning for generalist agents",
    detail: "Keynote at the RLC workshop on Reinforcement Learning Beyond Rewards.",
    href: "https://rlbrew2-workshop.github.io/"
  },
  {
    date: "June 2025",
    type: "Keynote",
    title: "Computer Vision in the Wild",
    detail: "Keynote at the fourth CVPR Workshop on Computer Vision in the Wild.",
    href: "https://computer-vision-in-the-wild.github.io/"
  },
  {
    date: "April 2025",
    type: "Keynote",
    title: "Test-Time Thinking for Trust",
    detail: "Keynote at the second Texas Colloquium on Distributed Learning on enhancing generative AI agents."
  },
  {
    date: "April 2025",
    type: "Keynote",
    title: "Erasing the Invisible",
    detail: "Keynote at the ICLR Generative AI Watermarking Workshop on stress-testing watermark robustness."
  },
  {
    date: "April 2025",
    type: "Keynote",
    title: "World models for sequential decision-making",
    detail: "Keynote at the ICLR World Models Workshop on learning foundation models for action."
  },
  {
    date: "October 2024",
    type: "Keynote",
    title: "Towards Generative AI Security",
    detail: "Keynote at the New York Academy of Sciences Annual Machine Learning Symposium on stress-testing and alignment."
  },
  {
    date: "May 2024",
    type: "Career",
    title: "Promotion to associate professor with tenure",
    detail: "Promotion in the University of Maryland Department of Computer Science, effective July 1, 2024."
  },
  {
    date: "May 2024",
    type: "Talk",
    title: "Integrity in AI at the U.S. SEC",
    detail: "A talk for the SEC AI Community of Practice on multimodal approaches to misinformation and content authenticity."
  },
  {
    date: "May 2024",
    type: "Public engagement",
    title: "AskScience AMA on artificial intelligence",
    detail: "A public Reddit discussion about machine learning, trustworthy AI, and current research questions."
  },
  {
    date: "January 2024",
    type: "Service",
    title: "NSF–Amazon Fairness in AI PI Meeting",
    detail: "Chair and organizer of the Fairness in Artificial Intelligence principal-investigator meeting."
  },
  {
    date: "September 2023",
    type: "Talk",
    title: "Trustworthy Machine Learning in an Ever-Changing World",
    detail: "University of Maryland Department of Computer Science colloquium.",
    href: "https://youtu.be/jW8GaerC7qQ"
  }
];

export const blogPosts = [
  {
    slug: "when-students-shape-the-science",
    date: "May 22, 2026",
    title: "When Students Shape the Science",
    excerpt:
      "Six graduating researchers, six intellectual arcs, and one evolving lab vision spanning data, governance, alignment, fairness, self-improvement, and physical AI.",
    tags: ["Mentorship", "Lab vision", "Research journey"]
  },
  {
    slug: "reasoning-as-control",
    date: "July 30, 2026",
    title: "Reasoning as Control: Toward Self-Improving Agentic Systems",
    excerpt:
      "Self-improvement belongs not only inside the model, but also in the infrastructure that controls thinking, action, evaluation, and workflow composition.",
    tags: ["Agentic AI", "Test-time control", "Self-improvement"]
  },
  {
    slug: "physical-language-for-robotics",
    date: "June 14, 2026",
    title: "Robotics Needs a Better Physical Language",
    excerpt:
      "Why the next generation of robot world models may depend less on bigger pixel predictors and more on compact, structured representations of interaction.",
    tags: ["Physical AI", "World models", "Robot learning"]
  },
  {
    slug: "where-has-furong-been",
    date: "September 24, 2024",
    title: "Where Has Furong Been? Behind the Scenes of Our NeurIPS Competition",
    excerpt:
      "The candid story of turning a research question about image-watermark robustness into a live NeurIPS competition—and the under-recognized service work behind it.",
    tags: ["AI content detection", "Image watermarks", "Academic service"]
  },
  {
    slug: "neurips-2022",
    date: "November 23, 2022",
    title: "NeurIPS ’22 Main Conference Papers from Furong Lab @ UMD",
    excerpt:
      "Six papers spanning fairness under distribution shift, robust reinforcement learning, distributed training, model invariance, and trustworthy machine learning.",
    tags: ["NeurIPS", "Publications", "Lab news"]
  }
];
