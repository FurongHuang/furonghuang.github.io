export const profile = {
  name: "Furong Huang",
  title: "Associate Professor of Computer Science",
  institution: "University of Maryland",
  email: "furongh@cs.umd.edu",
  scholar: "https://scholar.google.com/citations?user=13yyuCcAAAAJ",
  orcid: "https://orcid.org/0000-0001-5171-145X",
  github: "https://github.com/FurongHuang",
  linkedin: "https://www.linkedin.com/in/furong-huang"
};

export const researchPillars = [
  {
    id: "world-models",
    number: "01",
    title: "World models",
    subtitle: "Learn what can happen",
    description:
      "Represent physical and digital environments so agents can predict consequences, transfer across embodiments, and plan beyond direct experience.",
    topics: ["Embodied AI", "Robotics", "Multimodal learning"]
  },
  {
    id: "reasoning-control",
    number: "02",
    title: "Reasoning control",
    subtitle: "Decide how to think",
    description:
      "Treat inference as a control problem: allocate computation, collaboration, evidence, and verification where they improve decisions most.",
    topics: ["AI agents", "Test-time compute", "Planning"]
  },
  {
    id: "self-improvement",
    number: "03",
    title: "Trustworthy self-improvement",
    subtitle: "Learn from failure",
    description:
      "Build closed-loop systems that discover failures, intervene before they unfold, and convert uncertainty and hard examples into safer behavior.",
    topics: ["AI safety", "Alignment", "Robust learning"]
  }
];

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
    date: "June 2026",
    type: "Talk",
    title: "Building Self-Improving Foundation Models",
    detail: "Auditors, actuators, and amplifiers for trustworthy AI."
  },
  {
    date: "April 2026",
    type: "Publications",
    title: "Seven papers accepted to ICML 2026",
    detail: "New work spanning reasoning control, multimodal systems, safety, and equitable AI."
  },
  {
    date: "January 2026",
    type: "Recognition",
    title: "Five papers accepted to ICLR 2026",
    detail: "Including one oral presentation."
  }
];
