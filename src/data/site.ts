export const profile = {
  name: "Furong Huang",
  labName: "Furong Lab",
  title: "Associate Professor of Computer Science",
  institution: "University of Maryland",
  scholar: "https://scholar.google.com/citations?hl=en&user=13yyuCcAAAAJ",
  x: "https://twitter.com/furongh",
  linkedin: "https://www.linkedin.com/in/furong-huang",
  youtube: "https://www.youtube.com/@furongh",
  github: "https://github.com/FurongHuang",
  huggingface: "https://huggingface.co/furonghuang-lab"
};

export const socialLinks = [
  { id: "scholar", label: "Google Scholar", href: profile.scholar },
  { id: "x", label: "X / Twitter", href: profile.x },
  { id: "linkedin", label: "LinkedIn", href: profile.linkedin },
  { id: "youtube", label: "YouTube", href: profile.youtube },
  { id: "github", label: "GitHub", href: profile.github },
  { id: "huggingface", label: "Hugging Face", href: profile.huggingface }
];

export const researchPillars = [
  {
    id: "world-models",
    number: "01",
    title: "World models",
    shortTitle: "World models",
    subtitle: "Learn what can happen",
    description:
      "Represent physical and digital environments so agents can predict consequences, transfer across embodiments, and plan beyond direct experience.",
    href: "/research/#world-models",
    topics: [
      { label: "Embodied AI", href: "/research/embodied-ai/" },
      { label: "Multimodal learning", href: "/research/multimodal-learning/" },
      { label: "Sequential decision-making", href: "/research/sequential-decision-making/" }
    ]
  },
  {
    id: "reasoning-control",
    number: "02",
    title: "Reasoning control",
    shortTitle: "Reasoning control",
    subtitle: "Decide how to think",
    description:
      "Treat inference as a control problem: allocate computation, collaboration, evidence, and verification where they improve decisions most.",
    href: "/research/#reasoning-control",
    topics: [
      { label: "AI agents", href: "/research/ai-agents/" },
      { label: "Test-time compute", href: "/research/test-time-compute/" },
      { label: "Agentic workflows", href: "/research/agentic-workflows/" }
    ]
  },
  {
    id: "self-improvement",
    number: "03",
    title: "Trustworthy self-improvement",
    shortTitle: "Trustworthy AI",
    subtitle: "Learn from failure",
    description:
      "Build closed-loop systems that discover failures, intervene before they unfold, and convert uncertainty and hard examples into safer behavior.",
    href: "/research/#self-improvement",
    topics: [
      { label: "AI safety", href: "/research/ai-safety/" },
      { label: "Alignment", href: "/research/alignment/" },
      { label: "Robust learning", href: "/research/robust-learning/" }
    ]
  }
] as const;

export const projects = [
  {
    id: "mu0",
    pillar: "world-models",
    area: "Embodied AI",
    title: "μ0",
    summary:
      "A scalable world model that predicts semantic 3D interaction traces, learning embodiment-agnostic motion priors from video-only pretraining for downstream robot control.",
    image: "/assets/projects/mu0.png",
    year: 2026,
    links: [
      { label: "Project", href: "https://mu0-wm.github.io/" },
      { label: "Paper", href: "https://arxiv.org/abs/2606.13769" },
      { label: "Code", href: "https://github.com/Yoonkyo/mu0" },
      { label: "Models", href: "https://huggingface.co/collections/furonghuang-lab/mu0" }
    ]
  },
  {
    id: "tracegen",
    pillar: "world-models",
    area: "Embodied AI",
    title: "TraceGen",
    summary:
      "A 3D interaction-trace world model that learns transferable robot behavior from cross-embodiment human and robot video.",
    image: "/assets/projects/tracegen.png",
    year: 2026,
    links: [
      { label: "Project", href: "https://tracegen.github.io/" },
      { label: "Paper", href: "https://arxiv.org/abs/2511.21690" },
      { label: "Code", href: "https://github.com/jayLEE0301/TraceGen" },
      { label: "LinkedIn", href: "https://www.linkedin.com/posts/furong-huang_embodiedai-robotlearning-worldmodels-activity-7401447812028289025-ifCB" }
    ]
  },
  {
    id: "momagraph",
    pillar: "world-models",
    area: "Embodied AI",
    title: "MomaGraph",
    summary:
      "A state-aware unified scene graph that combines vision-language reasoning with explicit world state for long-horizon embodied task planning.",
    image: "/assets/projects/momagraph.png",
    year: 2026,
    links: [
      { label: "Project", href: "https://hybridrobotics.github.io/MomaGraph/" },
      { label: "Paper", href: "https://arxiv.org/abs/2512.16909" },
      { label: "Code", href: "https://github.com/HybridRobotics/MomaGraph" }
    ]
  },
  {
    id: "imagine-verify-execute",
    pillar: "world-models",
    area: "Embodied AI",
    title: "Imagine, Verify, Execute",
    summary:
      "An agentic exploration framework in which vision-language models imagine candidate interactions, verify their value, and execute promising actions.",
    image: "/assets/projects/imagine-verify-execute.png",
    year: 2025,
    links: [
      { label: "Project", href: "https://ive-robot.github.io/" },
      { label: "Paper", href: "https://arxiv.org/abs/2505.07815" },
      { label: "Code", href: "https://github.com/jayLEE0301/imagine_verify_execute" }
    ]
  },
  {
    id: "make-an-agent",
    pillar: "world-models",
    area: "Embodied AI",
    title: "Make-An-Agent",
    summary:
      "A behavior-prompted diffusion framework that generates generalizable robot policies for seen and unseen manipulation tasks.",
    image: "/assets/projects/make-an-agent.gif",
    year: 2024,
    links: [
      { label: "Project", href: "https://cheryyunl.github.io/make-an-agent/" },
      { label: "Paper", href: "https://arxiv.org/abs/2407.10973" }
    ]
  }
] as const;

export const selectedPublicationTitles = [
  "TraceGen: World Modeling in 3D Trace Space Enables Learning from Cross-Embodiment Videos",
  "FlowBank: Query-Adaptive Agentic Workflows Optimization through Precompute-and-Reuse",
  "PropensityBench: Evaluating Latent Safety Risks in Large Language Models via an Agentic Approach",
  "Safety Recovery in Reasoning Models Is Only a Few Early Steering Steps Away",
  "HumanEgo: Zero-Shot Robot Learning from Minutes of Human Egocentric Videos",
  "Teach a Reward Model to Correct Itself: Reward Guided Adversarial Failure Discovery for Robust Reward Modeling"
];

export const news = [
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
  }
];

export const blogPosts = [
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
