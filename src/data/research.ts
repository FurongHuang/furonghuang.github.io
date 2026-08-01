export type PillarId = "world-models" | "reasoning-control" | "self-improvement";

export const pillarMeta: Record<PillarId, { label: string; shortLabel: string; color: string }> = {
  "world-models": { label: "Pillar 1 · World models", shortLabel: "World models", color: "teal" },
  "reasoning-control": { label: "Pillar 2 · Reasoning control", shortLabel: "Reasoning control", color: "coral" },
  "self-improvement": { label: "Pillar 3 · Trustworthy self-improvement", shortLabel: "Trustworthy AI", color: "violet" }
};

const trustworthyPattern = /safety|secure|security|attack|adversarial|poison|backdoor|watermark|fairness|\bfair\b|bias|privacy|trust|robust|alignment|reward hacking|hallucination|refusal|harmful|vulnerab|equit|spurious/i;
const reasoningPattern = /reason|thought|test[- ]time|decod|agent|workflow|planning|\bplan\b|critic|reward model|q[- ]?star|collab|search|compute|reflection|scientist|soundness|inference[- ]time/i;

const publicationPillarByTitle: Record<string, PillarId> = {
  "TraceGen: World Modeling in 3D Trace Space Enables Learning from Cross-Embodiment Videos": "world-models",
  "MomaGraph: State-Aware Unified Scene Graphs with Vision-Language Model for Embodied Task Planning": "world-models",
  "Imagine, Verify, Execute: Agentic Exploration with Vision-Language Models": "world-models",
  "Make-An-Agent: A Generalizable Policy Network Generator with Behavior-Prompted Diffusion": "world-models",
  "HumanEgo: Zero-Shot Robot Learning from Minutes of Human Egocentric Videos": "world-models",
  "ROVER: Benchmarking Reciprocal Cross-Modal Reasoning for Omnimodal Generation": "world-models",
  "Mementos: A Comprehensive Benchmark for Multimodal Large Language Model Reasoning over Image Sequences": "world-models",
  "HallusionBench: An Advanced Diagnostic Suite for Entangled Language Hallucination & Visual Illusion in Large Vision-Language Models": "world-models",
  "Zebra-CoT: A Dataset for Interleaved Vision-Language Reasoning": "world-models",
  "GenFlowRL: Shaping Rewards with Generative Object-Centric Flow in Visual Reinforcement Learning": "world-models",
  "DrM: Mastering Visual Reinforcement Learning through Dormant Ratio Minimization": "world-models",
  "TACO: Temporal Latent Action-Driven Contrastive Loss for Visual Reinforcement Learning": "world-models",
  "COPlanner: Plan to Roll Out Conservatively but to Explore Optimistically for Model-Based RL": "world-models",
  "Agentic Critical Training": "reasoning-control",
  "Transfer Q-star: Principled Decoding for LLM Alignment": "reasoning-control",
  "Collab: Controlled Decoding using Mixture of Agents for LLM Alignment": "reasoning-control",
  "FlowBank: Query-Adaptive Agentic Workflows Optimization through Precompute-and-Reuse": "reasoning-control",
  "Token-Level LLM Collaboration via FusionRoute": "reasoning-control",
  "GenARM: Reward Guided Generation with Autoregressive Reward Model for Test-Time Alignment": "reasoning-control",
  "PropensityBench: Evaluating Latent Safety Risks in Large Language Models via an Agentic Approach": "self-improvement",
  "Safety Recovery in Reasoning Models Is Only a Few Early Steering Steps Away": "self-improvement",
  "AdvBDGen: A Robust Framework for Generating Adaptive and Stealthy Backdoors in LLM Alignment Attacks": "self-improvement",
  "AutoDAN: Interpretable Gradient-Based Adversarial Attacks on Large Language Models": "self-improvement",
  "WAVES: Benchmarking the Robustness of Image Watermarks": "self-improvement",
  "Teach a Reward Model to Correct Itself: Reward Guided Adversarial Failure Discovery for Robust Reward Modeling": "self-improvement",
  "MaxMin-RLHF: Alignment with Diverse Human Preferences": "self-improvement",
  "SAIL: Self-improving Efficient Online Alignment of Large Language Models": "self-improvement",
  "Shadowcast: Stealthy Data Poisoning Attacks Against Vision-Language Models": "self-improvement",
  "Beyond Worst-case Attacks: Robust RL with Adaptive Defense via Non-dominated Policies": "self-improvement"
};

export function classifyPublication(title: string): PillarId {
  if (publicationPillarByTitle[title]) return publicationPillarByTitle[title];
  if (trustworthyPattern.test(title)) return "self-improvement";
  if (reasoningPattern.test(title)) return "reasoning-control";
  return "world-models";
}

export const publicationThumbnailByTitle: Record<string, string> = {
  "TraceGen: World Modeling in 3D Trace Space Enables Learning from Cross-Embodiment Videos": "/assets/projects/tracegen.png",
  "MomaGraph: State-Aware Unified Scene Graphs with Vision-Language Model for Embodied Task Planning": "/assets/projects/momagraph.png",
  "Imagine, Verify, Execute: Agentic Exploration with Vision-Language Models": "/assets/projects/imagine-verify-execute.png",
  "Make-An-Agent: A Generalizable Policy Network Generator with Behavior-Prompted Diffusion": "/assets/projects/make-an-agent.gif",
  "ROVER: Benchmarking Reciprocal Cross-Modal Reasoning for Omnimodal Generation": "/assets/projects/rover.png",
  "Mementos: A Comprehensive Benchmark for Multimodal Large Language Model Reasoning over Image Sequences": "/assets/projects/mementos.png",
  "GenFlowRL: Shaping Rewards with Generative Object-Centric Flow in Visual Reinforcement Learning": "/assets/projects/genflowrl.png",
  "Agentic Critical Training": "/assets/projects/agentic-critical-training.png",
  "FlowBank: Query-Adaptive Agentic Workflows Optimization through Precompute-and-Reuse": "/assets/projects/flowbank.png",
  "GenARM: Reward Guided Generation with Autoregressive Reward Model for Test-Time Alignment": "/assets/projects/genarm.png",
  "AdvBDGen: A Robust Framework for Generating Adaptive and Stealthy Backdoors in LLM Alignment Attacks": "/assets/projects/advbdgen.png",
  "WAVES: Benchmarking the Robustness of Image Watermarks": "/assets/projects/waves.jpg"
};
