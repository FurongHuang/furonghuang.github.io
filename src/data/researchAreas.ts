import type { PillarId } from "./research";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ResearchProject {
  id: string;
  area: string;
  title: string;
  summary: string;
  year: number;
  image?: string;
  visualLabel?: string;
  theme?: "teal" | "coral" | "violet";
  relatedTitle?: string;
  links: readonly ProjectLink[];
}

export interface ResearchArea {
  slug: string;
  pillar: PillarId;
  title: string;
  kicker: string;
  question: string;
  intro: string;
  methods: readonly string[];
  projects: readonly ResearchProject[];
}

export const researchAreas: readonly ResearchArea[] = [
  {
    slug: "multimodal-learning",
    pillar: "world-models",
    title: "Multimodal learning",
    kicker: "Connect perception, language, and generation",
    question: "How can a model reason across modalities instead of merely recognizing each one?",
    intro:
      "We build diagnostic benchmarks, structured datasets, and learning objectives that expose whether multimodal systems truly connect evidence across images, video, language, and generation.",
    methods: ["Cross-modal reasoning", "Sequential visual understanding", "Diagnostic evaluation", "Interleaved vision-language data"],
    projects: [
      {
        id: "rover",
        area: "Multimodal learning",
        title: "ROVER",
        summary:
          "A benchmark for reciprocal reasoning between understanding and generation across image, video, audio, and 3D modalities.",
        year: 2025,
        image: "/assets/projects/rover.png",
        relatedTitle: "ROVER: Benchmarking Reciprocal Cross-Modal Reasoning for Omnimodal Generation",
        links: [
          { label: "Project", href: "https://roverbench.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2511.01163" },
          { label: "Code", href: "https://github.com/cheryyunl/ROVER" }
        ]
      },
      {
        id: "mementos",
        area: "Multimodal learning",
        title: "Mementos",
        summary:
          "A comprehensive benchmark that tests whether multimodal language models can reason over coherent sequences of images.",
        year: 2024,
        image: "/assets/projects/mementos.png",
        relatedTitle: "Mementos: A Comprehensive Benchmark for Multimodal Large Language Model Reasoning over Image Sequences",
        links: [
          { label: "Project", href: "https://mementos-bench.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2401.10529" },
          { label: "Code", href: "https://github.com/umd-huang-lab/Mementos" }
        ]
      },
      {
        id: "hallusionbench",
        area: "Multimodal learning",
        title: "HallusionBench",
        summary:
          "A diagnostic suite for disentangling visual illusion from language hallucination in large vision-language models.",
        year: 2024,
        visualLabel: "HB",
        theme: "teal",
        relatedTitle: "HallusionBench: An Advanced Diagnostic Suite for Entangled Language Hallucination & Visual Illusion in Large Vision-Language Models",
        links: [
          { label: "Paper", href: "https://arxiv.org/abs/2310.14566" },
          { label: "Code", href: "https://github.com/tianyi-lab/HallusionBench" }
        ]
      },
      {
        id: "zebra-cot",
        area: "Multimodal learning",
        title: "Zebra-CoT",
        summary:
          "A dataset for teaching and evaluating interleaved vision-language chains of thought rather than text-only explanations.",
        year: 2025,
        visualLabel: "Z·CoT",
        theme: "teal",
        relatedTitle: "Zebra-CoT: A Dataset for Interleaved Vision-Language Reasoning",
        links: [
          { label: "Paper", href: "https://arxiv.org/abs/2507.16746" },
          { label: "Dataset", href: "https://huggingface.co/datasets/multimodal-reasoning-lab/Zebra-CoT" }
        ]
      }
    ]
  },
  {
    slug: "sequential-decision-making",
    pillar: "world-models",
    title: "Sequential decision-making",
    kicker: "Learn representations that improve action",
    question: "What should an agent remember, predict, and explore in order to act well over time?",
    intro:
      "We study representation learning, model-based planning, and reward construction for agents that must learn from pixels, sparse feedback, and changing environments.",
    methods: ["Visual reinforcement learning", "Model-based planning", "Object-centric rewards", "Representation learning"],
    projects: [
      {
        id: "genflowrl",
        area: "Sequential decision-making",
        title: "GenFlowRL",
        summary:
          "Generative object-centric flow supplies dense, semantically meaningful rewards for visual reinforcement learning.",
        year: 2025,
        image: "/assets/projects/genflowrl.png",
        relatedTitle: "GenFlowRL: Shaping Rewards with Generative Object-Centric Flow in Visual Reinforcement Learning",
        links: [
          { label: "Project", href: "https://colinyu1.github.io/genflowrl/" },
          { label: "Paper", href: "https://arxiv.org/abs/2508.11049" }
        ]
      },
      {
        id: "drm",
        area: "Sequential decision-making",
        title: "DrM",
        summary:
          "Dormant-ratio minimization keeps neural capacity active and improves sample efficiency in visual reinforcement learning.",
        year: 2024,
        visualLabel: "DrM",
        theme: "teal",
        relatedTitle: "DrM: Mastering Visual Reinforcement Learning through Dormant Ratio Minimization",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2310.19668" }]
      },
      {
        id: "taco",
        area: "Sequential decision-making",
        title: "TACO",
        summary:
          "Temporal latent actions and contrastive learning produce action-aware representations from image observations.",
        year: 2023,
        visualLabel: "TACO",
        theme: "teal",
        relatedTitle: "TACO: Temporal Latent Action-Driven Contrastive Loss for Visual Reinforcement Learning",
        links: [
          { label: "Paper", href: "https://arxiv.org/abs/2306.13229" },
          { label: "Code", href: "https://github.com/FrankZheng2022/TACO" }
        ]
      },
      {
        id: "coplanner",
        area: "Sequential decision-making",
        title: "COPlanner",
        summary:
          "A model-based RL planner that rolls out conservatively while directing exploration toward optimistic possibilities.",
        year: 2024,
        visualLabel: "CO",
        theme: "teal",
        relatedTitle: "COPlanner: Plan to Roll Out Conservatively but to Explore Optimistically for Model-Based RL",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2310.07220" }]
      }
    ]
  },
  {
    slug: "ai-agents",
    pillar: "reasoning-control",
    title: "AI agents",
    kicker: "Turn models into purposeful systems",
    question: "How can an agent decide what to do, verify its progress, and recover when the first plan fails?",
    intro:
      "We develop agents that couple reasoning with action, critique, experimentation, and safety evaluation—especially where success requires long-horizon coordination.",
    methods: ["Planning and verification", "Tool use", "Self-critique", "Agentic evaluation"],
    projects: [
      {
        id: "agentic-critical-training",
        area: "AI agents",
        title: "Agentic Critical Training",
        summary:
          "An agent-training framework that converts critique and revision into a learning signal for more reliable multi-step behavior.",
        year: 2026,
        image: "/assets/projects/agentic-critical-training.png",
        relatedTitle: "Agentic Critical Training",
        links: [
          { label: "Project", href: "https://attention-is-all-i-need.github.io/ACT/" },
          { label: "Paper", href: "https://arxiv.org/abs/2603.08706" }
        ]
      },
      {
        id: "ive-agents",
        area: "AI agents",
        title: "Imagine, Verify, Execute",
        summary:
          "An embodied agent imagines candidate interactions, verifies which ones are informative, and executes a targeted exploration plan.",
        year: 2025,
        image: "/assets/projects/imagine-verify-execute.png",
        relatedTitle: "Imagine, Verify, Execute: Agentic Exploration with Vision-Language Models",
        links: [
          { label: "Project", href: "https://ive-robot.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2505.07815" },
          { label: "Code", href: "https://github.com/jayLEE0301/imagine_verify_execute" }
        ]
      },
      {
        id: "soundnessbench",
        area: "AI agents",
        title: "SoundnessBench",
        summary:
          "An evaluation of whether AI scientist agents produce experiments and conclusions that are methodologically sound, not merely plausible.",
        year: 2026,
        visualLabel: "SB",
        theme: "coral",
        links: [
          { label: "Project", href: "https://hosytuyen.github.io/projects/SoundnessBench" },
          { label: "Paper", href: "https://arxiv.org/abs/2605.30329" },
          { label: "LinkedIn", href: "https://www.linkedin.com/posts/furong-huang_the-ai-scientist-can-run-experiments-but-activity-7466545951898492928-fYGg" }
        ]
      },
      {
        id: "propensitybench-agents",
        area: "AI agents",
        title: "PropensityBench",
        summary:
          "Agentic red-teaming reveals latent behavioral propensities that may not appear in single-turn safety tests.",
        year: 2025,
        visualLabel: "PB",
        theme: "coral",
        relatedTitle: "PropensityBench: Evaluating Latent Safety Risks in Large Language Models via an Agentic Approach",
        links: [
          { label: "Paper", href: "https://arxiv.org/abs/2511.20703" },
          { label: "Code", href: "https://github.com/scaleapi/propensity-evaluation" }
        ]
      }
    ]
  },
  {
    slug: "test-time-compute",
    pillar: "reasoning-control",
    title: "Test-time compute",
    kicker: "Spend computation where it changes the answer",
    question: "How should a model allocate search, steering, and collaboration at inference time?",
    intro:
      "We treat decoding as a control problem: use rewards, value estimates, lightweight interventions, and multiple models to guide generation without retraining the base model.",
    methods: ["Reward-guided decoding", "Early-step steering", "Value-guided search", "Mixture-of-agent decoding"],
    projects: [
      {
        id: "genarm",
        area: "Test-time compute",
        title: "GenARM",
        summary:
          "An autoregressive reward model guides generation token by token, turning alignment into a controllable test-time procedure.",
        year: 2024,
        image: "/assets/projects/genarm.png",
        relatedTitle: "GenARM: Reward Guided Generation with Autoregressive Reward Model for Test-Time Alignment",
        links: [
          { label: "Project", href: "https://genarm.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2410.08193" },
          { label: "Code", href: "https://github.com/Yuancheng-Xu/GenARM" }
        ]
      },
      {
        id: "safety-recovery",
        area: "Test-time compute",
        title: "Safety Recovery",
        summary:
          "Small interventions during a few early reasoning steps can redirect unsafe trajectories before they become difficult to recover.",
        year: 2026,
        visualLabel: "SR",
        theme: "coral",
        relatedTitle: "Safety Recovery in Reasoning Models Is Only a Few Early Steering Steps Away",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2602.11096" }]
      },
      {
        id: "transfer-q-star",
        area: "Test-time compute",
        title: "Transfer Q★",
        summary:
          "A principled decoding method transfers value guidance across models to improve aligned generation at inference time.",
        year: 2024,
        visualLabel: "Q★",
        theme: "coral",
        relatedTitle: "Transfer Q-star: Principled Decoding for LLM Alignment",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2405.20495" }]
      },
      {
        id: "collab-test-time",
        area: "Test-time compute",
        title: "Collab",
        summary:
          "Controlled decoding combines a mixture of agents so complementary model strengths can guide a single aligned response.",
        year: 2025,
        visualLabel: "C+",
        theme: "coral",
        relatedTitle: "Collab: Controlled Decoding using Mixture of Agents for LLM Alignment",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2503.21720" }]
      }
    ]
  },
  {
    slug: "agentic-workflows",
    pillar: "reasoning-control",
    title: "Agentic workflows",
    kicker: "Compose specialized reasoning into systems",
    question: "Can an agent assemble the right workflow for each query instead of using one fixed pipeline?",
    intro:
      "We study how agents select, reuse, route, and coordinate reasoning components so complex workflows become adaptive, efficient, and auditable.",
    methods: ["Workflow optimization", "Precompute and reuse", "Model routing", "Multi-agent coordination"],
    projects: [
      {
        id: "flowbank",
        area: "Agentic workflows",
        title: "FlowBank",
        summary:
          "A bank of reusable workflow fragments enables query-adaptive optimization without rebuilding every agentic pipeline from scratch.",
        year: 2026,
        image: "/assets/projects/flowbank.png",
        relatedTitle: "FlowBank: Query-Adaptive Agentic Workflows Optimization through Precompute-and-Reuse",
        links: [
          { label: "Project", href: "https://agentic-flowbank.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2606.11290" },
          { label: "Code", href: "https://github.com/lingzhiyxp/FlowBank" }
        ]
      },
      {
        id: "act-workflows",
        area: "Agentic workflows",
        title: "Agentic Critical Training",
        summary:
          "Structured critical cycles teach agents to propose, inspect, and revise multi-stage solutions as a coherent workflow.",
        year: 2026,
        image: "/assets/projects/agentic-critical-training.png",
        relatedTitle: "Agentic Critical Training",
        links: [
          { label: "Project", href: "https://attention-is-all-i-need.github.io/ACT/" },
          { label: "Paper", href: "https://arxiv.org/abs/2603.08706" }
        ]
      },
      {
        id: "fusionroute",
        area: "Agentic workflows",
        title: "FusionRoute",
        summary:
          "Token-level routing lets language models collaborate dynamically rather than assigning an entire query to only one model.",
        year: 2026,
        visualLabel: "FR",
        theme: "coral",
        relatedTitle: "Token-Level LLM Collaboration via FusionRoute",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2601.05106" }]
      },
      {
        id: "collab-workflows",
        area: "Agentic workflows",
        title: "Collab",
        summary:
          "A controlled mixture-of-agents workflow combines model proposals during decoding to improve alignment and capability.",
        year: 2025,
        visualLabel: "C+",
        theme: "coral",
        relatedTitle: "Collab: Controlled Decoding using Mixture of Agents for LLM Alignment",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2503.21720" }]
      }
    ]
  },
  {
    slug: "ai-safety",
    pillar: "self-improvement",
    title: "AI safety",
    kicker: "Find dangerous behavior before deployment",
    question: "How can we expose latent risks that ordinary evaluations and static red-teaming miss?",
    intro:
      "We build adaptive attacks, agentic evaluations, and stress tests that reveal hidden failure modes across language models, generative systems, and deployed content safeguards.",
    methods: ["Agentic red-teaming", "Adaptive attacks", "Backdoor evaluation", "Safety benchmarking"],
    projects: [
      {
        id: "propensitybench-safety",
        area: "AI safety",
        title: "PropensityBench",
        summary:
          "An agentic evaluation framework probes models across multi-turn environments to surface latent safety-relevant propensities.",
        year: 2025,
        visualLabel: "PB",
        theme: "violet",
        relatedTitle: "PropensityBench: Evaluating Latent Safety Risks in Large Language Models via an Agentic Approach",
        links: [
          { label: "Paper", href: "https://arxiv.org/abs/2511.20703" },
          { label: "Code", href: "https://github.com/scaleapi/propensity-evaluation" }
        ]
      },
      {
        id: "advbdgen",
        area: "AI safety",
        title: "AdvBDGen",
        summary:
          "A robust framework for generating adaptive, stealthy backdoors that stress-test the resilience of LLM alignment defenses.",
        year: 2026,
        image: "/assets/projects/advbdgen.png",
        relatedTitle: "AdvBDGen: A Robust Framework for Generating Adaptive and Stealthy Backdoors in LLM Alignment Attacks",
        links: [
          { label: "Project", href: "https://pankayaraj.github.io/AdvBDGen/index.html" },
          { label: "Paper", href: "https://arxiv.org/abs/2410.11283" },
          { label: "Code", href: "https://github.com/pankayaraj/AAAI_2026_AdvBDGen" }
        ]
      },
      {
        id: "autodan",
        area: "AI safety",
        title: "AutoDAN",
        summary:
          "Interpretable gradient-based adversarial prompts expose instruction-following vulnerabilities in aligned language models.",
        year: 2024,
        visualLabel: "AD",
        theme: "violet",
        relatedTitle: "AutoDAN: Interpretable Gradient-Based Adversarial Attacks on Large Language Models",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2310.15140" }]
      },
      {
        id: "waves-safety",
        area: "AI safety",
        title: "WAVES",
        summary:
          "A benchmark and red-team framework for measuring how image-watermark methods hold up under diverse attacks.",
        year: 2024,
        image: "/assets/projects/waves.jpg",
        relatedTitle: "WAVES: Benchmarking the Robustness of Image Watermarks",
        links: [
          { label: "Project", href: "https://wavesbench.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2401.08573" }
        ]
      }
    ]
  },
  {
    slug: "alignment",
    pillar: "self-improvement",
    title: "Alignment",
    kicker: "Turn feedback into reliable behavior",
    question: "How can models improve from diverse preferences and their own discovered failures?",
    intro:
      "We design reward models, online learning procedures, and decoding algorithms that make alignment more robust, equitable, and efficient.",
    methods: ["Reward-model self-correction", "Online alignment", "Preference diversity", "Reward-guided generation"],
    projects: [
      {
        id: "reform",
        area: "Alignment",
        title: "ReForm",
        summary:
          "Reward-guided adversarial failure discovery teaches a reward model to identify and correct weaknesses in its own judgments.",
        year: 2026,
        visualLabel: "RF",
        theme: "violet",
        relatedTitle: "Teach a Reward Model to Correct Itself: Reward Guided Adversarial Failure Discovery for Robust Reward Modeling",
        links: [
          { label: "Paper", href: "https://arxiv.org/abs/2507.06419" },
          { label: "Code", href: "https://github.com/pankayaraj/ACL_2026_REFORM" }
        ]
      },
      {
        id: "genarm-alignment",
        area: "Alignment",
        title: "GenARM",
        summary:
          "Autoregressive rewards steer generation directly at test time, providing fine-grained control without retraining the generator.",
        year: 2024,
        image: "/assets/projects/genarm.png",
        relatedTitle: "GenARM: Reward Guided Generation with Autoregressive Reward Model for Test-Time Alignment",
        links: [
          { label: "Project", href: "https://genarm.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2410.08193" },
          { label: "Code", href: "https://github.com/Yuancheng-Xu/GenARM" }
        ]
      },
      {
        id: "maxmin-rlhf",
        area: "Alignment",
        title: "MaxMin-RLHF",
        summary:
          "A max-min objective aligns language models without letting majority preferences erase systematically under-served groups.",
        year: 2024,
        visualLabel: "MM",
        theme: "violet",
        relatedTitle: "MaxMin-RLHF: Alignment with Diverse Human Preferences",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2402.08925" }]
      },
      {
        id: "sail",
        area: "Alignment",
        title: "SAIL",
        summary:
          "A self-improving online alignment loop learns efficiently from model-generated responses and continually updated feedback.",
        year: 2024,
        visualLabel: "SAIL",
        theme: "violet",
        relatedTitle: "SAIL: Self-improving Efficient Online Alignment of Large Language Models",
        links: [
          { label: "Paper", href: "https://arxiv.org/abs/2406.15567" },
          { label: "OpenReview", href: "https://openreview.net/forum?id=9m8dF6oAsd" }
        ]
      }
    ]
  },
  {
    slug: "robust-learning",
    pillar: "self-improvement",
    title: "Robust learning",
    kicker: "Learn reliably under attack and shift",
    question: "How can a learning system adapt when its data, environment, or adversary changes?",
    intro:
      "We study robust objectives and adaptive defenses across reinforcement learning, vision-language models, generative content, and adversarially corrupted training data.",
    methods: ["Adaptive defense", "Data-poisoning resilience", "Robust reinforcement learning", "Watermark robustness"],
    projects: [
      {
        id: "waves-robust",
        area: "Robust learning",
        title: "WAVES",
        summary:
          "A standardized evaluation exposes where image watermarks remain detectable—and where adaptive attacks break them.",
        year: 2024,
        image: "/assets/projects/waves.jpg",
        relatedTitle: "WAVES: Benchmarking the Robustness of Image Watermarks",
        links: [
          { label: "Project", href: "https://wavesbench.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2401.08573" }
        ]
      },
      {
        id: "advbdgen-robust",
        area: "Robust learning",
        title: "AdvBDGen",
        summary:
          "Adaptive backdoor generation provides a stronger adversary for testing and improving the robustness of alignment defenses.",
        year: 2026,
        image: "/assets/projects/advbdgen.png",
        relatedTitle: "AdvBDGen: A Robust Framework for Generating Adaptive and Stealthy Backdoors in LLM Alignment Attacks",
        links: [
          { label: "Project", href: "https://pankayaraj.github.io/AdvBDGen/index.html" },
          { label: "Paper", href: "https://arxiv.org/abs/2410.11283" },
          { label: "Code", href: "https://github.com/pankayaraj/AAAI_2026_AdvBDGen" }
        ]
      },
      {
        id: "shadowcast",
        area: "Robust learning",
        title: "Shadowcast",
        summary:
          "A stealthy data-poisoning attack reveals how small, targeted corruptions can alter the behavior of vision-language models.",
        year: 2024,
        visualLabel: "SC",
        theme: "violet",
        relatedTitle: "Shadowcast: Stealthy Data Poisoning Attacks Against Vision-Language Models",
        links: [
          { label: "Project", href: "https://vlm-poison.github.io/" },
          { label: "Paper", href: "https://arxiv.org/abs/2402.06659" },
          { label: "Code", href: "https://github.com/umd-huang-lab/VLM-Poisoning" }
        ]
      },
      {
        id: "non-dominated-defense",
        area: "Robust learning",
        title: "Adaptive Robust RL",
        summary:
          "Non-dominated policies let a reinforcement-learning agent adapt its defense to attacks beyond a single fixed worst case.",
        year: 2024,
        visualLabel: "RRL",
        theme: "violet",
        relatedTitle: "Beyond Worst-case Attacks: Robust RL with Adaptive Defense via Non-dominated Policies",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2402.12673" }]
      }
    ]
  }
] as const;

export const researchAreaBySlug = new Map(researchAreas.map((area) => [area.slug, area]));
