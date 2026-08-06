export type BenchmarkCategory = "embodied" | "reasoning" | "trust";
export type BenchmarkPillar = "world-models" | "reasoning-control" | "self-improvement";

export interface BenchmarkResource {
  id: string;
  title: string;
  year: number;
  category: BenchmarkCategory;
  pillar: BenchmarkPillar;
  types: Array<"Dataset" | "Benchmark" | "Competition" | "Platform">;
  modalities: string[];
  summary: string;
  scale?: string;
  image: string;
  imagePosition?: string;
  featured?: boolean;
  links: Array<{ label: string; href: string }>;
}

export const benchmarkCategories = {
  embodied: {
    label: "Embodied intelligence and world models",
    shortLabel: "Embodied systems",
    description: "Data and evaluation for scene understanding, interaction traces, physical reasoning, memory, and transferable robot behavior."
  },
  reasoning: {
    label: "Reasoning and generalization",
    shortLabel: "Reasoning",
    description: "Benchmarks that probe scientific judgment, multimodal reasoning, task difficulty, temporal structure, and generalization."
  },
  trust: {
    label: "Safety, reliability and content integrity",
    shortLabel: "Trust and safety",
    description: "Stress tests for latent risk, hallucination, false refusal, unlearning, watermark robustness, and generative-model trustworthiness."
  }
} as const;

export const benchmarkPillars = {
  "world-models": "World models",
  "reasoning-control": "Reasoning as control",
  "self-improvement": "Trustworthy self-improvement"
} as const;

export const benchmarkResources: BenchmarkResource[] = [
  {
    id: "momagraph",
    title: "MomaGraph-Scenes and MomaGraph-Bench",
    year: 2026,
    category: "embodied",
    pillar: "world-models",
    types: ["Dataset", "Benchmark"],
    modalities: ["Vision", "Robotics", "Scene graphs"],
    summary: "Task-driven spatial-functional scene graphs and a six-capability evaluation suite for embodied planning and scene understanding.",
    scale: "1,050 task-oriented subgraphs; 6,278 multiview images; 350+ household scenes",
    image: "/assets/projects/momagraph.webp",
    featured: true,
    links: [
      { label: "Project", href: "https://hybridrobotics.github.io/MomaGraph/" },
      { label: "Dataset", href: "https://huggingface.co/datasets/cheryyunl/momagraph_train" },
      { label: "Benchmark", href: "https://huggingface.co/datasets/cheryyunl/MomaGraph-Bench" },
      { label: "Paper", href: "https://arxiv.org/abs/2512.16909" }
    ]
  },
  {
    id: "tracegen",
    title: "TraceForge-123K and TraceGen Benchmark",
    year: 2026,
    category: "embodied",
    pillar: "world-models",
    types: ["Dataset", "Benchmark"],
    modalities: ["Video", "3D traces", "Robotics"],
    summary: "A cross-embodiment corpus and held-out evaluation suite for learning transferable world models from human and robot videos.",
    scale: "123K videos; 1.8M observation-trace-language triplets; five evaluation environments",
    image: "/assets/projects/tracegen.png",
    featured: true,
    links: [
      { label: "Project", href: "https://tracegen.github.io/" },
      { label: "Dataset collection", href: "https://huggingface.co/collections/furonghuang-lab/tracegen" },
      { label: "Benchmark", href: "https://huggingface.co/furonghuang-lab/TraceGenBenchmark" },
      { label: "Code", href: "https://github.com/jayLEE0301/TraceGen" }
    ]
  },
  {
    id: "mu0",
    title: "μ₀ Evaluation Dataset",
    year: 2026,
    category: "embodied",
    pillar: "world-models",
    types: ["Dataset", "Benchmark"],
    modalities: ["Vision", "3D traces", "Robotics"],
    summary: "Released evaluation episodes, normalization statistics, and model artifacts for transferable 3D interaction-trace prediction.",
    scale: "Evaluation episodes spanning human and robot embodiments",
    image: "/assets/projects/mu0-teaser-still.webp",
    featured: true,
    links: [
      { label: "Project", href: "https://mu0-wm.github.io/" },
      { label: "Evaluation data", href: "https://huggingface.co/furonghuang-lab/mu0" },
      { label: "Code", href: "https://github.com/Yoonkyo/mu0" },
      { label: "Paper", href: "https://arxiv.org/abs/2606.13769" }
    ]
  },
  {
    id: "sequential-eqa",
    title: "Sequential Embodied Question Answering",
    year: 2026,
    category: "embodied",
    pillar: "world-models",
    types: ["Benchmark"],
    modalities: ["Vision", "Language", "Embodied AI"],
    summary: "An evaluation setting for persistent visual-semantic memory across multiple questions and continuous embodied operation.",
    image: "/assets/projects/auto-arxiv-2607-21571.webp",
    links: [{ label: "Paper and benchmark", href: "https://arxiv.org/abs/2607.21571" }]
  },
  {
    id: "morse-500",
    title: "MORSE-500",
    year: 2025,
    category: "embodied",
    pillar: "world-models",
    types: ["Dataset", "Benchmark"],
    modalities: ["Video", "Language", "Physical reasoning"],
    summary: "A programmatically controllable video benchmark for abstract, physical, planning, spatial, and temporal multimodal reasoning.",
    scale: "500 scripted videos with controllable physical and temporal structure",
    image: "/assets/projects/morse-500.png",
    links: [
      { label: "Project", href: "https://morse-500.github.io/" },
      { label: "Paper", href: "https://arxiv.org/abs/2506.05523" }
    ]
  },
  {
    id: "soundnessbench",
    title: "SoundnessBench",
    year: 2026,
    category: "reasoning",
    pillar: "reasoning-control",
    types: ["Dataset", "Benchmark"],
    modalities: ["Text", "Scientific reasoning", "AI agents"],
    summary: "Tests whether AI research agents can distinguish methodologically sound proposals from plausible but flawed research ideas.",
    scale: "1,099 machine-learning research proposals",
    image: "/assets/projects/soundnessbench.png",
    featured: true,
    links: [
      { label: "Project", href: "https://hosytuyen.github.io/projects/SoundnessBench" },
      { label: "Dataset", href: "https://huggingface.co/datasets/hosytuyen/SoundnessBench" },
      { label: "Paper", href: "https://arxiv.org/abs/2605.30329" }
    ]
  },
  {
    id: "tsrbench",
    title: "TSRBench",
    year: 2026,
    category: "reasoning",
    pillar: "reasoning-control",
    types: ["Dataset", "Benchmark"],
    modalities: ["Time series", "Vision", "Language"],
    summary: "A multi-task, multimodal time-series reasoning benchmark for evaluating generalist models across heterogeneous temporal tasks.",
    image: "/assets/projects/tsrbench.webp",
    links: [{ label: "Project and benchmark", href: "https://tsrbench.github.io/" }]
  },
  {
    id: "rover",
    title: "ROVER",
    year: 2025,
    category: "reasoning",
    pillar: "world-models",
    types: ["Dataset", "Benchmark"],
    modalities: ["Image", "Video", "Audio", "3D"],
    summary: "Benchmarks reciprocal reasoning between multimodal understanding and generation across image, video, audio, and 3D.",
    image: "/assets/projects/rover.png",
    featured: true,
    links: [
      { label: "Project", href: "https://roverbench.github.io/" },
      { label: "Code", href: "https://github.com/cheryyunl/ROVER" }
    ]
  },
  {
    id: "easy2hard",
    title: "Easy2Hard-Bench",
    year: 2024,
    category: "reasoning",
    pillar: "reasoning-control",
    types: ["Dataset", "Benchmark"],
    modalities: ["Text", "Code", "Mathematics"],
    summary: "Standardized continuous difficulty labels for profiling language-model performance and easy-to-hard generalization.",
    image: "/assets/projects/easy2hard.webp",
    links: [
      { label: "Project", href: "https://easy2hardbench.github.io/home/" },
      { label: "Paper", href: "https://arxiv.org/abs/2409.18433" },
      { label: "Code", href: "https://github.com/umd-huang-lab/Easy2Hard-Bench" }
    ]
  },
  {
    id: "mementos",
    title: "Mementos",
    year: 2024,
    category: "reasoning",
    pillar: "world-models",
    types: ["Dataset", "Benchmark"],
    modalities: ["Image sequences", "Language", "Multimodal"],
    summary: "Evaluates whether multimodal language models can reason over coherent image sequences rather than isolated frames.",
    image: "/assets/projects/mementos-sequences.webp",
    featured: true,
    links: [
      { label: "Project", href: "https://mementos-bench.github.io/" },
      { label: "Dataset", href: "https://huggingface.co/datasets/furonghuang-lab/Mementos" },
      { label: "Code", href: "https://github.com/umd-huang-lab/Mementos" }
    ]
  },
  {
    id: "zebra-cot",
    title: "Zebra-CoT",
    year: 2025,
    category: "reasoning",
    pillar: "reasoning-control",
    types: ["Dataset", "Benchmark"],
    modalities: ["Vision", "Language", "Reasoning traces"],
    summary: "A dataset for teaching and evaluating interleaved vision-language chains of thought instead of text-only explanations.",
    image: "/assets/projects/zebra-cot.png",
    links: [
      { label: "Dataset", href: "https://huggingface.co/datasets/multimodal-reasoning-lab/Zebra-CoT" },
      { label: "Paper", href: "https://arxiv.org/abs/2507.16746" }
    ]
  },
  {
    id: "easy-to-hard-vision",
    title: "Easy-to-Hard Generalization Datasets",
    year: 2021,
    category: "reasoning",
    pillar: "reasoning-control",
    types: ["Dataset", "Benchmark"],
    modalities: ["Images", "Classification", "Generalization"],
    summary: "Controlled image-classification datasets for studying how models generalize from easy training examples to harder test examples.",
    image: "/assets/projects/auto-arxiv-2108-06011.webp",
    links: [{ label: "Paper and datasets", href: "https://arxiv.org/abs/2108.06011" }]
  },
  {
    id: "propensitybench",
    title: "PropensityBench",
    year: 2025,
    category: "trust",
    pillar: "self-improvement",
    types: ["Benchmark", "Platform"],
    modalities: ["Text", "AI agents", "Safety"],
    summary: "Agentic red-teaming environments surface latent behavioral risks that may remain hidden in single-turn safety tests.",
    image: "/assets/projects/propensitybench.png",
    featured: true,
    links: [
      { label: "Project", href: "https://scale.com/research/propensitybench" },
      { label: "Code and benchmark", href: "https://github.com/scaleapi/propensity-evaluation" }
    ]
  },
  {
    id: "trustgen",
    title: "TrustGen",
    year: 2025,
    category: "trust",
    pillar: "self-improvement",
    types: ["Benchmark", "Platform"],
    modalities: ["Text", "Images", "Vision-language"],
    summary: "A dynamic benchmarking platform for evaluating trustworthiness across generative language, image, and vision-language models.",
    image: "/assets/projects/trustgen.png",
    links: [
      { label: "Documentation", href: "https://trustgen.github.io/trustgen_docs/" },
      { label: "Paper", href: "https://arxiv.org/abs/2502.14296" }
    ]
  },
  {
    id: "erasing-invisible",
    title: "Erasing the Invisible",
    year: 2024,
    category: "trust",
    pillar: "self-improvement",
    types: ["Dataset", "Benchmark", "Competition"],
    modalities: ["Images", "Watermarking", "Adversarial attacks"],
    summary: "A NeurIPS competition, dataset, and evaluation toolkit for stress-testing image watermarks under black-box and beige-box attacks.",
    image: "/assets/projects/erasing-invisible-report.webp",
    links: [
      { label: "Project", href: "https://erasinginvisible.github.io" },
      { label: "Competition", href: "https://www.codabench.org/competitions/3821/" }
    ]
  },
  {
    id: "waves",
    title: "WAVES",
    year: 2024,
    category: "trust",
    pillar: "self-improvement",
    types: ["Benchmark", "Platform"],
    modalities: ["Images", "Watermarking", "Robustness"],
    summary: "A standardized benchmark and stress-testing toolkit for image-watermark detection and identification under diverse attacks.",
    image: "/assets/projects/waves.jpg",
    featured: true,
    links: [{ label: "Project and benchmark", href: "https://wavesbench.github.io/" }]
  },
  {
    id: "hallusionbench",
    title: "HallusionBench",
    year: 2024,
    category: "trust",
    pillar: "self-improvement",
    types: ["Dataset", "Benchmark"],
    modalities: ["Vision", "Language", "Hallucination"],
    summary: "A diagnostic benchmark that disentangles language hallucination from visual illusion in large vision-language models.",
    image: "/assets/projects/hallusionbench.png",
    links: [{ label: "Benchmark and code", href: "https://github.com/tianyi-lab/HallusionBench" }]
  },
  {
    id: "autohallusion",
    title: "AutoHallusion",
    year: 2024,
    category: "trust",
    pillar: "self-improvement",
    types: ["Dataset", "Benchmark", "Platform"],
    modalities: ["Vision", "Language", "Hallucination"],
    summary: "Automatically generates diverse visual-reasoning stress tests for diagnosing hallucination failures in vision-language models.",
    image: "/assets/projects/auto-arxiv-2406-10900.webp",
    links: [{ label: "Benchmark and code", href: "https://github.com/wuxiyang1996/AutoHallusion" }]
  },
  {
    id: "phtest",
    title: "PHTest",
    year: 2024,
    category: "trust",
    pillar: "self-improvement",
    types: ["Dataset", "Benchmark"],
    modalities: ["Text", "Safety", "False refusal"],
    summary: "Pseudo-harmful prompts for measuring false refusals and the tradeoff between safety alignment and model helpfulness.",
    image: "/assets/projects/phtest.webp",
    links: [
      { label: "Dataset", href: "https://huggingface.co/datasets/furonghuang-lab/PHTest" },
      { label: "Code", href: "https://github.com/umd-huang-lab/FalseRefusal" },
      { label: "Paper", href: "https://arxiv.org/abs/2409.00598" }
    ]
  },
  {
    id: "fictitious-identities",
    title: "Fictitious Facial Identity Dataset",
    year: 2025,
    category: "trust",
    pillar: "self-improvement",
    types: ["Dataset", "Benchmark"],
    modalities: ["Faces", "Vision-language", "Unlearning"],
    summary: "A controlled dataset for evaluating whether vision-language models can reliably unlearn fictitious facial identities.",
    image: "/assets/projects/vlm-unlearning.webp",
    links: [{ label: "Paper and dataset", href: "https://arxiv.org/abs/2411.03554" }]
  }
];
