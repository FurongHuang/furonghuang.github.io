---
layout: ../../layouts/ResearchEssayLayout.astro
title: "World Models: A Multiverse We Can Act On"
description: "World models for the agentic era: possible futures, grounded neural–symbolic abstractions, and multi-principal systems that reason about consequences before acting."
deck: "The future of agents is not one predicted universe. It is a multiverse of consequences we can understand—and futures we can shape together."
date: "2026-09-11"
displayDate: "September 11, 2026"
readingTime: "30 min read"
referenceCount: 100
tags: ["World models", "Neural–symbolic AI", "Collective agency"]
---

**Hot take: world models will become one of the defining foundations of the agentic era we are stepping into.**

An agent needs more than an understanding of the world as it is. It needs to reason about **what the world could become—and how its own decisions change which future becomes reality.**

A coding agent should anticipate what a change might break, not merely produce a plausible patch. A scientific agent should reason about what different experiments would reveal, not merely propose an interesting hypothesis. An agent coordinating a team should understand how a decision changes other people's options, not merely generate a convincing plan.

In each case, the capability I care about is reasoning about consequences before acting.

This is why I think the world-model conversation needs a broader frame. Video generation, interactive environments, spatial reconstruction, and predictive representations are important advances, but they address different parts of the problem.[^sora][^genie3][^marble][^vjepa2] For agents, **imagination is not the end goal. Decision-making is.**

My argument rests on three pillars.

**First, model a multiverse, not a universe.** Represent alternative futures that an agent can compare before committing to a decision.

**Second, connect imagination to action.** Distinguish a desirable outcome from the consequences of executable choices—and establish how to get from one to the other.

**Third, build grounded abstractions.** Combine neural learning with explicit, compositional structure where it helps preserve the entities, relations, and executable operations that matter for decisions.

Together, these principles suggest a role for world models as **an internal laboratory for agency**. That laboratory need not look like a video. It might operate over objects, trajectories, latent states, programs, skills, or relationships between agents. The hardest case may be many agents, representing different people, changing a world they share.

I will use *decision-oriented world model* for a model that predicts aspects of an environment's evolution relevant to an agent's choices. This is a functional requirement, not a preferred architecture. A beautiful generated world can be valuable for entertainment without satisfying it; a compact latent model can satisfy it for a particular task without reconstructing a scene.

## Pillar 1: Model a multiverse, not a universe

A prediction says what might happen next. A decision requires comparing what might happen *under different choices*.

For a robot facing a closed drawer, the alternatives include pulling, pushing, and inspecting the latch. For a coding agent, they might be alternative patches, tests, or rollbacks. The important object is the branching structure rooted in the same present—not one especially convincing continuation.

“Multiverse” is a metaphor, not a claim about physics. Even a deterministic environment branches when we consider different actions. Uncertainty introduces additional branches: the same action may produce different outcomes because the environment is stochastic, the current state is partly hidden, or the model does not yet know the dynamics.

Those are different problems. Randomness cannot always be eliminated. Hidden state may require memory or sensing. Ignorance may be reduced by collecting better data. POMDPs formalize planning under partial observability; probabilistic model-based methods such as PILCO and PETS explicitly account for uncertainty in learned dynamics.[^pomdp][^pilco][^pets]

### Choose a policy, not a lucky outcome

There is a dangerous shortcut hidden in “choose the universe you like.”

Suppose a model generates a thousand futures for a risky action. In one, everything works. Selecting that sample does not make the action reliable. It may only mean that we searched hard enough to find an optimistic story.

An agent chooses actions—or a policy that responds to new observations. That choice changes the distribution over outcomes; it does not grant control over the random draw. Schematically,

<div class="equation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><msup><mi>&#x3C0;</mi><mo>&#x2217;</mo></msup><mo>&#x2208;</mo><mi>arg</mi><mo data-mjx-texclass="NONE">&#x2061;</mo><munder><mo data-mjx-texclass="OP" movablelimits="true">max</mo><mrow data-mjx-texclass="ORD"><mi>&#x3C0;</mi><mo>&#x2208;</mo><msub><mi mathvariant="normal">&#x3A0;</mi><mrow data-mjx-texclass="ORD"><mrow data-mjx-texclass="ORD"><mi data-mjx-auto-op="false">feasible</mi></mrow></mrow></msub></mrow></munder><msub><mrow data-mjx-texclass="ORD"><mi mathvariant="normal">&#x1D53C;</mi></mrow><mrow data-mjx-texclass="ORD"><mi>Y</mi><mo>&#x223C;</mo><msub><mi>P</mi><mi>M</mi></msub><mo stretchy="false">(</mo><mo>&#x22C5;</mo><mo>&#x2223;</mo><msub><mi>h</mi><mi>t</mi></msub><mo>,</mo><mi>&#x3C0;</mi><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">[</mo><mi>U</mi><mo stretchy="false">(</mo><mi>Y</mi><mo stretchy="false">)</mo><mo stretchy="false">]</mo><mo>,</mo></math></div>

where <math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>h</mi><mi>t</mi></msub></math> is the interaction history, <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>M</mi></math> the learned model, <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>Y</mi></math> a future trajectory, and <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>U</mi></math> the objective. Here <math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>P</mi><mi>M</mi></msub></math> is the model's predicted outcome distribution when the policy is executed. Risk-sensitive objectives and safety constraints may be necessary beyond this expected-utility formulation.

The equation is not a guarantee: its usefulness depends on the model remaining reliable where the policy takes it. Optimizing against an imperfect model can encourage decisions that exploit its errors. MOPO and MOReL address this problem in offline reinforcement learning through uncertainty penalties or pessimistic models.[^mopo][^morel] SafeDreamer separately incorporates cost constraints into world-model-based control. Its benchmark results are evidence about a specified safety objective, not a certificate for arbitrary deployment.[^safedreamer]

Nor does the model decide whose future is desirable. Predicting consequences, specifying objectives, and authorizing actions are different responsibilities. They can share a network without becoming the same problem.

### The alternatives need not be movies

A multiverse does not require enumerating every possibility or rendering thousands of videos. Alternatives can be represented through latent transitions, object trajectories, symbolic states, or value-relevant predictions.

This lineage predates the current generation of video models. Sutton's Dyna integrated learned models, planning, and reactive behavior. *World Models* learned stochastic latent dynamics and demonstrated controller learning inside a learned environment. PlaNet plans through latent dynamics; Dreamer learns behavior through imagined trajectories; MuZero uses learned transitions and value predictions inside search.[^dyna][^worldmodels][^planet][^dreamer1][^muzero]

These distinctions matter. A deterministic, value-oriented model may support excellent decisions without recovering the full probability distribution of every observable future. MuZero should not be judged as though its purpose were calibrated video simulation. Conversely, a system used to estimate failure probabilities needs evidence about uncertainty that a strong average task score does not supply.[^muzero][^valueequivalence]

The first pillar is therefore not “generate more diverse content.” It is **preserve the alternatives that could change a decision**. Diversity of scenery is not diversity of consequences.

## Pillar 2: Connect imagination to the consequences of action

Imagine asking a model to show a drawer opening. It produces a convincing sequence: a hand approaches, the handle moves, the drawer slides out.

Now ask: **What should this robot do to open this drawer?**

The drawer might be locked. The handle might require lifting before pulling. The robot might not have enough clearance. A plausible video of success does not settle any of these questions.

The first request asks for an outcome. The second requires a connection between that outcome, the current circumstances, and an executable intervention. Closing this gap is not merely a matter of improving image quality.

### Action conditioning is necessary for some uses—but not sufficient evidence of causality

Holding subsequent behavior fixed, distinguish

<div class="equation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>P</mi><mo stretchy="false">(</mo><mi>Y</mi><mo>&#x2223;</mo><msub><mi>h</mi><mi>t</mi></msub><mo>,</mo><mi>a</mi><mo stretchy="false">)</mo><mstyle scriptlevel="0"><mspace width="2em"></mspace></mstyle><mtext>from</mtext><mstyle scriptlevel="0"><mspace width="2em"></mspace></mstyle><mi>P</mi><mo stretchy="false">(</mo><mi>Y</mi><mo>&#x2223;</mo><msub><mi>h</mi><mi>t</mi></msub><mo>,</mo><mi>do</mi><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo>.</mo></math></div>

The first describes outcomes associated with action <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>a</mi></math> in the data. The second asks what happens when we intervene to execute it. They can agree under appropriate assumptions about recorded state, action selection, and intervention semantics; learning also requires adequate data coverage. They need not agree in arbitrary observational data.[^pearl][^causal]

Suppose people in the training videos pull drawers only after checking that they are unlocked. “Pulling predicts opening” does not establish what pulling does when the lock is engaged. The missing information may lie outside the camera view, and the dataset may contain no examples of the intervention we need to evaluate.

This failure mode also has a concrete experimental counterpart. CoCo, a recent action-controllable video-model paper, studies predictors that continue familiar motion patterns while responding inadequately to changed controls. Its consistency tests are useful diagnostics of action dependence—not a general proof of causal identification.[^coco]

This is not an argument that useful control requires a symbolic causal graph. It is an argument against assuming that a prompt, an action token, or a latent representation automatically establishes intervention fidelity. CITRIS illustrates a more explicit approach: its causal-identification results rely on temporal structure and observed intervention targets, not unrestricted passive video alone.[^citris]

The “multiverse” discussed here primarily concerns prospective decisions. Identifying what would have happened in one particular past episode under a different action is a stronger, retrospective counterfactual question, requiring additional assumptions.[^pearl]

### Two directions must meet

An agent needs a forward connection: **if I execute this action, what might happen?** It also needs a planning or control connection: **given the outcome I seek, what feasible actions should I execute?**

The second need not be a separately trained inverse-dynamics model. Search, trajectory optimization, a goal-conditioned policy, or a learned action decoder may supply it. But an imagined endpoint alone does not establish reachability.

“Open the drawer” is also incomplete as an abstract action unless its implementation is specified. Its consequences depend on the controller, the gripper, and the termination conditions. Similarly, “obtain approval” is not an action an organizational agent can simply execute; it is an outcome involving someone else's decision.

There is another distinction between an **agent action** and an **editor command**. Moving forward and removing a wall may both alter a generated environment, but only one may be available to its inhabitant. Genie 3 explicitly distinguishes promptable world events from actions the agent performs directly.[^genie3] An editable universe is not automatically an actionable one.

### The bridge is already being built

It would be wrong to divide the field into video models that merely imagine and latent models that genuinely act.

Deep Visual Foresight used action-conditioned visual prediction for robot planning well before today's video foundations. UniSim investigates simulation conditioned on high-level instructions and low-level controls. UniPi takes a different route: generate a task-directed video plan and translate it into actions. DreamZero jointly models future video and robot actions, learning from heterogeneous robot data.[^visualforesight][^unisim][^unipi][^dreamzero]

Cosmos Policy provides another explicit bridge: robot demonstration post-training adapts a video model to generate actions, future images, and values that support planning. LAPA takes a different route, learning latent actions from video before grounding a policy with robot data. DreamDojo likewise uses latent proxy actions for human-video pretraining, followed by target-robot post-training.[^cosmospolicy][^lapa][^dreamdojo]

These are distinct mechanisms. A model that proposes a good trajectory, a model that predicts the effect of a candidate action, and a model that emits an action alongside a future video are not interchangeable—even when all improve control. Learning from action-free video can reduce the cost of grounding; it does not make grounding unnecessary.

Feature-space methods supply another route. DINO-WM predicts pretrained visual features under actions and plans toward goal features. V-JEPA 2 separates broad video pretraining from an action-conditioned robot stage. Its “unlabeled” robot data include end-effector state signals used to construct actions; its pick-and-place experiments use two intermediate subgoal images in addition to the final goal image. “Zero-shot” refers to transfer to new environments, not to an absence of action grounding.[^dinowm][^vjepa2]

Dreamer 4 connects scalable video modeling to behavior learning, but its offline Minecraft experiment uses data containing actions and event annotations, plus a task-prompt sequence at evaluation. This is evidence for a powerful learning pipeline—not for solving arbitrary physical tasks from passive video alone.[^dreamer4]

The right question is **what establishes the connection between the predicted future and the action interface available to the agent?** The answer must come from the actual training and evaluation protocol, not the family name.

### Grounding must survive execution

An imagined future is a hypothesis about the world. Acting tests that hypothesis.

A useful system predicts, executes a bounded step, observes, and revises. Sometimes its next action should gather information rather than immediately advance the task: inspecting the latch may be more valuable than another forceful pull. Plan2Explore makes information-seeking part of model-based behavior, using imagined futures to guide exploration.[^plan2explore]

Longer rollouts are not automatically better. MBPO demonstrates the usefulness of short synthetic rollouts branched from real experience; its lesson is to match the use of a model to its reliability, not to maximize imagined duration indiscriminately.[^mbpo]

The internal laboratory earns its value by reducing costly mistakes outside it—not by insulating the agent from corrective evidence.

## Pillar 3: Build grounded neural–symbolic abstractions

Suppose we could improve a world model in either of two ways: render the drawer's wood grain more accurately, or represent whether its latch is engaged.

For opening it, the second may matter more. For finding a matching replacement panel, the first may matter. Relevance is not an intrinsic property of a pixel. It depends on the decision.

My research bet is that **grounded neural–symbolic abstractions will be especially valuable when agents must compose unfamiliar tasks, explain consequential decisions, or coordinate with other agents.** That is a direction to test, not a declaration that every world model must contain a logic engine.

### Neither pixels alone nor symbols detached from experience

Neural learning can connect noisy observations to useful representations and learn continuous, uncertain dynamics. Symbolic structure can make entities, relations, predicates, and action semantics explicit. The opportunity is to combine them without pretending that either solves the other's hardest problems.

For the drawer, the model might retain continuous geometry alongside relations such as *handle-part-of-drawer*, uncertain state such as *latch-engaged*, and an action whose preconditions and effects refer to those variables. For a coding agent, the equivalent structure might include dependencies, version state, and an operation's side effects.

The distinction is not “vectors versus words.” A latent variable does not become a useful symbol because we give it a name. A scene graph is not yet a dynamics model because we can read its edges. A predicate earns its place when it has a grounded meaning and supports predictions or constraints that can be checked.

Consider *unlocked(drawer)*. How is it inferred? What evidence would change it? Is it unknown, or known to be false? Does its meaning remain consistent when a different controller tries to open the drawer? Those questions matter more than whether the representation looks interpretable.

**The goal is not to make a model speak in symbols. It is to make its abstractions answerable to experience.**

### A substantial literature already connects skills, symbols, and planning

*From Skills to Symbols* derives grounded representations sufficient for planning with specified high-level skills. Latplan learns propositional planning models from image transitions. PDSketch combines supplied domain structure with learned components. These differ in what is learned, what is given, and what the resulting abstraction supports.[^skills2symbols][^latplan][^pdsketch]

Neuro-symbolic bilevel planning couples symbolic operators with learned policies and continuous-parameter samplers. PDDLStream supplies a complementary planning framework connecting symbolic search to black-box continuous samplers; it is not itself a learned world model.[^bilevelskills][^pddlstream]

VisualPredicator is particularly direct: it learns abstract world models using predicates that combine neural and symbolic computation, evaluated across five simulated robotic domains. Its reported limitations also expose the bottleneck: unreliable perceptual predicates can undermine otherwise structured planning.[^visualpredicator]

This literature should sit alongside—not underneath—the latent-prediction and video-generation traditions. Hierarchical predictive proposals such as H-JEPA also emphasize abstraction, but do not by that fact establish explicit symbolic semantics.[^hjepa] “Abstract,” “object-centric,” and “neural–symbolic” are related concepts, not synonyms.

### Abstract actions need executable meaning

State abstraction and action abstraction must be designed together. The options framework gives temporally extended actions an initiation condition, execution policy, and termination rule.[^options] Calling an operation “repair,” “investigate,” or “delegate” supplies none of these by itself.

A high-level plan might say: check the latch, grasp the handle, pull, verify opening. A useful hybrid model connects those steps to continuous execution and represents duration, costs, and failure where they matter. If the implementation changes, the predicted consequences may change even though the action's name does not.

The connection should work both ways. High-level reasoning constrains execution; execution supplies evidence that can revise the high-level model. If a supposedly unlocked drawer remains closed, the system should reconsider the predicate, the controller, or the adequacy of its abstraction—not simply generate a more confident explanation.

Our MomaGraph work explores a related interface through state-aware scene graphs that connect spatial and functional relationships, actionable parts, and task planning. Its graphs update as execution changes the observed scene. This is evidence for a useful structured representation and planning interface, not by itself a calibrated simulator of arbitrary interventions.[^momagraph]

Our μ0 work takes a complementary route through continuous 3D interaction traces connected to downstream action experts. These traces separate reusable interaction structure from robot-specific execution; they are not automatically symbolic predicates.[^mu0] TACO, PRISE, and TraceVLA address other pieces: state–action representation, temporal action abstraction, and visual history for policies.[^taco][^prise][^tracevla]

The question across these approaches is whether a proposed transition at one level can be realized—and checked—at the level below.

### Compress detail, not uncertainty or accountability

Explicit structure is not a license to turn every uncertain observation into a Boolean fact. An unseen latch is unknown, not necessarily disengaged. A useful abstraction may combine continuous variables, uncertain predicates, and memory. POMDPs and predictive state representations supply different formal ways to make history and uncertainty part of state.[^pomdp][^psr]

Bisimulation and value equivalence further clarify that sufficiency is relative to a decision problem.[^bisimulation][^valueequivalence] If an abstraction discards color, a later “pick the red object” task may require recovering it. DIAMOND's Atari results are a useful counterweight to indiscriminate compression: seemingly small visual details can matter for control.[^diamond]

There is a less obvious extension. An abstraction that retains an object's location but discards its owner may suffice for moving it, yet fail when the question is whether the agent should move it. Which distinctions matter depends not only on physical feasibility, but also on the objectives and constraints the system must respect.

**The framework can be widely reusable without one fixed abstraction being universally sufficient.** The representation should expand or refine when a new decision makes an omitted distinction consequential.

The strongest objection to neural–symbolic modeling is therefore real: it can introduce brittle ontologies, grounding errors, and expensive interfaces. It can freeze the wrong concepts into a system. A readable mistake is still a mistake, and a formal check is only as applicable as its model and assumptions.

My claim is narrower: where compositional reasoning and explicit constraints matter, grounded symbolic structure is a promising way to make neural predictions usable, contestable, and correctable. It must earn that role against strong latent models, direct policies, and exact tools—not inherit it from the word “symbolic.”

## A field guide to the major schools

The literature is not one contest between pixels and latents. Three axes are often mixed together: **what is represented; how predictions are grounded in actions; and how the model is used**—for search, policy training, evaluation, or data generation.

The following map organizes major traditions by their central design choice. They overlap; the same system can occupy several rows. The references below point to the original papers and reports, with publication types noted where the distinction matters.

| Tradition | Representative work and mechanism | The question it must answer |
|---|---|---|
| **Probabilistic dynamics and model-based learning** | Dyna, PILCO, PETS, and MBPO learn dynamics for planning or synthetic experience; uncertainty and rollout horizon are central.[^dyna][^pilco][^pets][^mbpo] | When does the learned model improve decisions despite estimation error? |
| **Latent imagination and control** | World Models, PlaNet, and Dreamer learn compact dynamics for planning or behavior learning; DreamerV2 uses discrete latent states and DreamerV3 emphasizes a broadly reusable learning algorithm.[^worldmodels][^planet][^dreamer1][^dreamer2][^dreamer3] | Is reuse in the algorithm, the pretrained model, or both? What adaptation remains necessary? |
| **Decision-oriented latent models** | MuZero and TD-MPC2 learn control-relevant latent dynamics without requiring observation reconstruction.[^muzero][^tdmpc2] | Which objectives and decision problems does the representation support? |
| **Generative models used for control** | Action-conditioned Atari prediction, Deep Visual Foresight, SimPLe, IRIS, DIAMOND, iVideoGPT, and Dreamer 4 connect visual dynamics to planning or behavior learning.[^oh2015][^visualforesight][^simple][^iris][^diamond][^ivideogpt][^dreamer4] | Does improved visual modeling translate into better closed-loop behavior? |
| **Broad video and interactive world generation** | Sora's 2024 report and Cosmos develop video foundations; Genie 1–3, UniSim, GameNGen, and LingBot-World investigate interactive generated environments.[^sora][^cosmos][^genie][^genie2][^genie3][^unisim][^gamengen][^lingbot] | Are controls faithful to a target environment, or interfaces for editing a generated one? |
| **Trajectory synthesis and world–action modeling** | Trajectory Transformer and Diffuser synthesize trajectories; UniPi, DreamZero, Cosmos Policy, LAPA, and DreamDojo connect video priors, plans, or latent actions to execution in distinct ways.[^trajectory][^diffuser][^unipi][^dreamzero][^cosmospolicy][^lapa][^dreamdojo] | Does a proposed plan correspond to a feasible execution, including failures and recovery? |
| **Predictive feature representations** | I-JEPA and V-JEPA establish feature-prediction approaches; DINO-WM, V-JEPA 2, V-JEPA 2.1, and LeWorldModel explore prediction, planning, or richer representations.[^ijepa][^vjepa1][^dinowm][^vjepa2][^vjepa21][^lewm] | Which features preserve control-relevant detail? Which models actually include action-conditioned dynamics? |
| **Spatial representations and generated 3D worlds** | NeRF and 3D Gaussian Splatting are scene-representation foundations; Marble and Atlas develop generated spatial environments and broader spatial modeling.[^nerf][^gsplat][^marble][^atlas] | Is the evidence about changed viewpoints, or changed physical interventions? |
| **Object-centric predictive models** | C-SWM, SlotFormer, and PLATO learn object-based representations and interactions rather than treating a scene as an undifferentiated image.[^cswm][^slotformer][^plato] | Can the representation preserve identity, relations, and hidden physical properties as scenes become more complex? |
| **Grounded neural–symbolic abstraction** | From Skills to Symbols, Latplan, PDSketch, and VisualPredicator connect grounded representations to planning; MomaGraph contributes a state-aware scene-graph interface.[^skills2symbols][^latplan][^pdsketch][^visualpredicator][^momagraph] | Which predicates and action semantics are learned, which are supplied, and how are grounding errors detected? |
| **Structured physical and interaction models** | Graph-network simulators, MeshGraphNets, Fourier neural operators, and μ0 model particles, meshes, fields, or interaction traces.[^gns][^meshgraph][^fno][^mu0] | What structure transfers, and which omitted variables invalidate a prediction? |
| **Driving-specific world models** | GAIA-1 and DriveDreamer connect driving context and controls to future scenes; Waymo reports a camera-and-lidar world model adapted from Genie 3.[^gaia1][^drivedreamer][^waymo] | Do simulated responses and rare events agree with real driving outcomes? |
| **Language, program, and digital-environment models** | RAP uses language-model predictions in planning; WorldCoder learns executable environment programs; Dynalang learns multimodal dynamics; DynaWeb and WAC use learned web consequences for training or action correction.[^rap][^worldcoder][^dynalang][^dynaweb][^wac] | Is the transition faithful to the external system, rather than merely plausible text or runnable code? |
| **Causal and mechanism-oriented models** | Causal representation learning and CITRIS study intervention-relevant variables and conditions for identification.[^causal][^citris] | Which causal conclusions follow from the available data and assumptions? |
| **Models of other agents and social interaction** | Interactive POMDPs, ToMnet, MAMBA, Generative Agents, SOTOPIA, and CICERO address different pieces of predicting or acting with other decision-makers.[^ipomdp][^tomnet][^mamba][^generativeagents][^sotopia][^cicero] | Is the evidence about believable behavior, predictive fidelity, strategic performance, or cooperative learning? |
| **Multi-principal objectives and governed interaction** | Assistance games, cooperative AI, causal games, and authenticated delegation supply foundations and constraints—not one completed collective world model.[^mpag][^cooperativeai][^causalgames][^delegation] | Whose objectives, information, commitments, and authority must the model and execution system distinguish? |

A few boundaries are worth emphasizing. I-JEPA is an image representation method, not by itself an action-conditioned dynamics simulator. The original NeRF and Gaussian Splatting papers concern scene representation and rendering, not manipulation dynamics. And ToMnet's agent-modeling experiments do not establish a simulator of human organizations.[^ijepa][^nerf][^gsplat][^tomnet]

Likewise, company research announcements—such as Genie 3, Marble, Atlas, and the Waymo World Model—are evidence of what their developers report, not independent validation of general control reliability. The Cosmos family must be discussed at the variant level: its documentation separately identifies base generation, multiview, and robot action-conditioned models.[^genie3][^marble][^atlas][^waymo][^cosmos]

The most promising connections may cross these traditions. A video foundation can supply broad perceptual priors; a structured representation can expose interaction variables; a planner can use an action-conditioned model; an exact simulator can check a critical transition. This is a research direction, not a claim that stacking these components automatically produces a reliable agent.

## When the world contains other agents—and other principals

The drawer does not have a private objective. A supplier does. That changes what a world model must represent.

Imagine three agents arranging a delivery. One represents a buyer with an urgent deadline, another a supplier with limited stock, and a third a logistics provider with competing obligations. A plan may be physically possible and attractive to the buyer while being unacceptable to the supplier—or dependent on a commitment nobody has actually made.

This is where the three pillars become more demanding. There are multiple preferred futures, actions influence other decision-makers rather than controlling them, and the abstraction must preserve more than physical state.

### More agents is not the same as more principals

By *principal*, I mean a person or organization whose interests an agent is meant to represent and whose delegation defines part of its authority. One principal can use many agents; one agent can serve several principals. Even agents serving one principal need not coordinate perfectly.

Multi-principal assistance games explicitly study a single agent helping multiple humans with different preferences. That is an important foundation, but not the same setting as many independently operated agents negotiating on behalf of different people.[^mpag] Cooperative AI more broadly studies the challenges of understanding, communication, commitment, and conflicting interests.[^cooperativeai]

The architectural consequence, in my view, is that a multi-principal world model should not silently replace distinct objectives with a single “team reward.” Choosing an aggregation rule is itself a decision about whose interests count. Predicting outcomes does not confer authority to make that decision, and affected people may include parties who have no agent at the table.

**“Choose the universe you like” becomes: whose preferred universe, at whose expense, and with whose agreement?**

### Three kinds of state matter

I would organize the representation around three connected layers—not as a settled architecture, but as a useful design hypothesis.

The **operational layer** describes resources, inventories, locations, system state, and dependencies: what is available and what can physically or digitally happen.

The **epistemic layer** describes information and uncertainty: what each participant has observed, what has been communicated, and what remains private or disputed. Beliefs about other participants are estimates, not access to their minds. Interactive POMDPs formalize planning with beliefs about the environment and models of other agents; their nested reasoning also illustrates the computational difficulty.[^ipomdp]

The **institutional layer** describes declared roles, permissions, obligations, and commitments: who can approve a purchase, who has accepted a delivery date, and what authorization has expired or been revoked. These are not merely another set of facts for a generative model to invent. Their status should be checked against the relevant trusted records and execution controls.

Together, these layers separate three superficially similar worlds: the supplier can deliver, the supplier is likely to agree to deliver, and the supplier has committed to deliver. Conflating them produces a plan that sounds complete while leaving its most important transition unresolved.

### Other agents are not actuators

For a robot motor, an action interface may let us specify a command. For another principal's agent, the available action may be a request, offer, or disclosure. The recipient can accept, refuse, misunderstand, delay, or counteroffer.

A collective world model therefore needs to distinguish the environment's response to joint actions from its prediction of which actions other participants will choose. The latter depends on their information, objectives, capabilities, and policies. Even when the physical dynamics remain unchanged, changing the other participants can change the consequences of my actions. Work on causal reasoning in games makes the distinction between interventions and strategic responses explicit.[^causalgames]

This suggests a demanding transfer test: replace a cooperative counterpart with a different policy while holding the task and interface fixed. Does the model update its expectations, or does it keep predicting the cooperation its original plan required?

The prediction itself can also change the interaction. Suppose a shared forecast of scarce inventory prompts every buyer to order earlier. The forecast is now an input to the behavior it predicts. I would test a collective world model under adoption of its recommendations and changes in participants' policies—not only against logs collected before anyone relied on it. This is a further research requirement, not a capability established by realistic social simulation.

Communication belongs inside the action model. Sending a proposal can change another agent's beliefs and options. But *sent*, *received*, *understood*, *accepted*, and *executed* are different states. A predicted acceptance is not a commitment; a likely approval is not authorization.

Authenticated-delegation research addresses identity and bounded authority as explicit infrastructure concerns.[^delegation] My design conclusion is that a learned model may predict the consequences of seeking permission, while a separate trusted mechanism checks whether permission actually exists. **A world model may predict consent. It must not manufacture consent.**

### Shared reality does not require shared private state

It is tempting to imagine one enormous world model containing everyone's knowledge and preferences. I would instead investigate interoperable models with a carefully defined shared state and private local information.

The common-information approach to decentralized control provides a formal precedent for separating shared history from local information. Its setting is a team control problem, not a solution to conflicting principals' objectives.[^commoninfo] The broader design lesson I draw is to coordinate over what needs to be shared without assuming that everything is observable or should be disclosed.

In the delivery example, the supplier might disclose an available quantity and a binding deadline without revealing its full inventory strategy. Participants can agree on the meaning and status of that commitment while retaining different private forecasts and priorities.

Shared predictions, shared preferences, shared permissions, and shared memory are four different design choices. None automatically implies the others. Nor should a system force agreement where different information reasonably produces different beliefs. Several agents repeating one report do not create several independent observations.

Here neural–symbolic abstraction has a particularly useful potential role: explicit entities and commitment states can provide a common interface, while learned models handle uncertain responses and continuous operational dynamics. The interface would support coordination—not establish universal trust or eliminate strategic behavior.

### Abstraction is also an alignment choice

Two outcomes can have the same total throughput while allocating delays to different people. Two operations can produce identical files while differing in whether confidential information was disclosed. If the representation merges those cases, a planner cannot reason about the difference later.

That is the deeper connection to the third pillar. In a multi-principal setting, “decision-relevant” must be defined against the specified interests, rights, and constraints of the supported interaction—not only one requesting agent's success metric.

I would want a collective world model to preserve alternatives with different distributions of benefits, burdens, information, and control. A separate, authorized decision procedure would then choose among them. Better prediction can expose a tradeoff; it cannot settle the legitimacy of the tradeoff.

Even apparently successful coordination deserves scrutiny. The multi-agent risk literature distinguishes miscoordination, conflict, and collusion: agents can coordinate with one another in ways that harm principals or outsiders.[^multiagentrisk] “The agents reached agreement” is therefore not a sufficient success criterion.

### What the existing literature establishes—and what remains a research goal

ToMnet learns to predict other agents' behavior in controlled environments; MAMBA studies world-model-based cooperative learning. Generative Agents and SOTOPIA explore simulated social behavior and social-interaction evaluation. They provide useful components and testbeds, not validated forecasts of arbitrary human organizations.[^tomnet][^mamba][^generativeagents][^sotopia]

CICERO offers a different kind of evidence: it combines language with strategic reasoning in Diplomacy, a game with explicit rules and measurable outcomes. That is a meaningful demonstration of interaction-aware decision-making, with a much more defined environment than an open-ended organization.[^cicero]

My research thesis is to connect these strands: grounded state and action abstractions, uncertainty about other participants, and explicit commitments and authority. The empirical question is whether that combination improves decisions and transfer—not whether a simulated society produces convincing conversations.

**A world model for collective agency should help us discover futures we can reach together. It should not give one agent the power to choose everyone else's future.**

## Beyond robotics: what counts as a world?

Once “world” means an evolving system rather than a rendered physical scene, the scope becomes much broader. An organizational model might need permissions, dependencies, commitments, and beliefs—not a photorealistic office. A software model might need execution state and side effects—not another screenshot.

The table below is a map of **candidate applications and useful abstractions**, not a list of domains already solved by current world models.

| Domain | State and action abstractions worth considering | Consequences worth predicting |
|---|---|---|
| Robotics and household assistance | Objects, contact, affordances; grasp, move, inspect | Completion, damage, recovery, information gained |
| Manufacturing | Materials, machines, process stages; adjust, assemble, maintain | Yield, defects, wear, downtime |
| Driving, aviation, and navigation | Geometry, motion, intent, visibility; maneuver, route | Progress, collisions, interaction responses |
| Games and interactive environments | Rules, inventory, objectives, persistent state; moves, skills | Progression, delayed effects, opponent responses |
| Engineering and physical science | Fields, particles, boundary conditions; design or control changes | Stability, efficiency, failure |
| Chemistry, materials, and biology | Molecular or mechanistic state; experimental interventions | Reactions, material properties, biological responses |
| Healthcare research and decision support | Patient history and uncertain physiological state; tests, treatments | Benefits, adverse events, information value |
| Agriculture and ecosystems | Soil, crops, water, ecological interactions; management actions | Growth, resource use, resilience |
| Climate, energy, and infrastructure | Coupled environmental and network states; operating or policy scenarios | Reliability, emissions, cascading failures |
| Logistics and supply chains | Inventory, queues, capacity, dependencies; allocate, reroute | Delays, shortages, cost, resilience |
| Economics, markets, and public policy | Resources, institutions, incentives, beliefs; interventions | Strategic responses, distributional effects, regime changes |
| Software, web, and computer-use agents | Program and interface state, permissions; edits, tool calls | Correctness, side effects, reversibility |
| Computing systems and cybersecurity | Workloads, services, access relationships; schedule, configure, defend | Latency, outages, contention, exposure |
| Scientific discovery and formal reasoning | Hypotheses, evidence, proof obligations; experiment, deduce | Information gain, falsification, verified progress |
| Education and personalized assistance | Beliefs about knowledge and needs; explanation, practice, feedback | Learning, retention, misunderstanding |
| Organizations and multi-agent collaboration | Knowledge, authority, commitments; delegate, communicate, negotiate | Coordination, conflict, bottlenecks, accountability |
| Architecture, design, and creative media | Spatial constraints, design intent, narrative state; edit, interact | Feasibility, experience, consistency |

The shared structure is decisions with consequences, not a shared representation of everything.

The difficulty also varies sharply. Predicting an intervention from observational healthcare or policy data requires causal assumptions; generating a plausible trajectory is not clinical or policy validation.[^pearl][^causal] In multi-agent settings, the model must allow for other participants' information and behavior, rather than treating every actor as an object following a fixed script.[^tomnet][^mamba] Shared predictions do not imply shared preferences or legitimate authority to act.

And not every problem needs a learned simulator. When an exact executor is cheap and safely available, run it. A coding agent should use tests and sandboxes; a theorem prover should verify a proof, not accept an imagined verification. The opportunity is to learn where prediction buys something and use exact mechanisms where they are available.

## What would count as real progress?

The three pillars imply three tests.

**Does the model branch faithfully?** Compare alternative executable actions from matched initial conditions. Separate sensitivity to actions from irrelevant visual variation. Where probabilistic forecasts are provided, evaluate their calibration and failure estimates—not just sample quality. A deterministic feature model needs an additional uncertainty mechanism before it can be assessed as a probability forecaster.

**Do its predictions improve acting?** Measure closed-loop success, harmful side effects, recovery, and performance on infeasible goals. Compare against strong direct policies and exact or simpler models, with data, pretraining, and compute accounted for. A model should earn its cost through better decisions, safer learning, or useful reuse.

**Does its abstraction retain what a new decision requires?** Change the goal, horizon, embodiment, or relevant variable. Test adaptation data and computational cost as well as success. A representation that ignores background color should not be rewarded for also ignoring a safety indicator.

Different benchmarks test different pieces. Physion evaluates physical-event prediction; Physion++ adds latent properties that must be inferred from motion and interaction. WorldModelBench assesses video-level instruction following and physical behavior. MIND targets memory consistency and action control through revisitation. WorldGym examines whether learned-environment policy evaluations correspond to real-robot outcomes.[^physion][^physionpp][^wmbench][^mind][^worldgym]

These are complementary tests, not interchangeable “world understanding” scores. A model can pass a visual-consistency test and still rank actions incorrectly. It can predict average outcomes well while being untrustworthy on rare failures.

A small, decisive experiment could use a resettable drawer environment. Compare concrete pixel-predictive, feature-predictive, and structured implementations alongside a direct policy and a privileged reference model. Hold interaction data and action interfaces fixed, and disclose differences in pretraining and compute. Vary appearance, goals, and mechanics separately.

Crucially, when a lock is genuinely unobservable, do not demand that the model guess its state. Give the agent informative history or a probing action; evaluate whether it represents uncertainty and chooses to inspect. Otherwise, an experiment intended to test abstraction would actually test access to impossible information.

Then move a subset of these comparisons to physical execution. A single benchmark cannot settle which architecture is best, but it can expose whether a claimed improvement concerns realism, action grounding, or decision-relevant abstraction.

A complementary multi-principal test could use a small procurement simulator with buyer, supplier, and logistics agents. Keep operational dynamics fixed while varying private deadlines, counterpart policies, who receives a message, and whether an authorization has been revoked. Compare a direct agent, a model with an unstructured history, a structured-state model, and a grounded neural–symbolic model that also predicts counterpart responses. Match available information and account for compute; use a privileged reference only as a diagnostic upper bound.

Report outcomes for each principal, not only aggregate throughput. Measure prediction calibration, agreement failures, privacy leakage, and unauthorized action attempts separately from calls blocked by the execution system. Ablate the model's representation of permissions without disabling actual authorization enforcement. Test whether it requests clarification or consent when appropriate instead of confidently completing an invalid plan. These are proposed experiments, not results already established by the cited systems.

### The strongest objection to my opening claim

Much of this is model-based control, state abstraction, and causal reasoning under a fashionable name. That objection is partly right. Those traditions already supply much of the conceptual foundation.[^dyna][^options][^valueequivalence][^causal]

The research opportunity, as I see it, is to turn these capabilities into broadly reusable models—and show when that reuse pays off. Reusing a learning algorithm across tasks is not the same as reusing a pretrained model across environments.

There is a second objection: perhaps agents will internalize enough consequence knowledge without a separate simulator. The Othello sequence-model study provides a bounded example of learned internal state representations without an explicitly supplied board model; it does not establish general-purpose causal understanding.[^othello]

My conviction is about the capability to reason about consequences, not a requirement that every agent run an explicit world-model module at every step. Such a module must still demonstrate an advantage over a strong policy that has already internalized what it needs.

The evidence should decide. If a large video model wins under comparable conditions, it has earned its place. If a compact structured model wins, its abstraction has earned its place. If a direct policy or exact executor wins, a learned world model may be unnecessary for that task.

## An internal laboratory for agency

This is the sense in which I think world models will be foundational to the agentic era. Their value is not simply that they can show worlds we have not seen. It is that they can help agents reason about consequences they have not yet incurred.

The multiverse supplies the alternatives. Action grounding connects them to choices an agent can actually execute. Grounded abstraction makes their relevant structure explicit without pretending away uncertainty.

For collective agency, that structure includes whose interests, information, commitments, and authority are at stake. Neural–symbolic modeling is one promising way to connect these distinctions to learned predictions and executable plans. Its value will be measured by what agents can do more reliably together—not by how impressive the representation looks.

None of this removes the need to observe, test, or revise a plan. An internal laboratory is useful precisely because its hypotheses can be checked against what happens outside it.

The research objective is not a perfect copy of reality. It is a model that exposes reachable alternatives at a resolution where good choices become tractable.

**Not merely a universe that looks convincing. A multiverse whose differences we can understand—and whose reachable futures we can shape together.**

---

*Literature scope: foundational work and representative developments available by September 11, 2026. Research papers, preprints, and first-party announcements are distinguished in the references. Application proposals and evaluation recommendations are the author's synthesis, not reported experimental results.*

## References

[^sora]: OpenAI (February 15, 2024; technical report). [Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/).

[^genie3]: Google DeepMind (August 5, 2025; research announcement). [Genie 3: A new frontier for world models](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/).

[^marble]: World Labs (November 12, 2025; product/research announcement). [Marble: A Multimodal World Model](https://www.worldlabs.ai/blog/marble-world-model).

[^vjepa2]: Assran et al. (2025). [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985v1). For the action-conditioning data and evaluation protocol, see §§3.1 and 4.2–4.3.

[^pomdp]: Kaelbling, L. P., Littman, M. L., and Cassandra, A. R. (1998). [Planning and Acting in Partially Observable Stochastic Domains](https://people.csail.mit.edu/lpk/papers/aij98-pomdp.pdf). *Artificial Intelligence*, 101, 99–134.

[^pilco]: Deisenroth, M. P., and Rasmussen, C. E. (2011). [PILCO: A Model-Based and Data-Efficient Approach to Policy Search](https://mlg.eng.cam.ac.uk/pub/pdf/DeiRas11.pdf). *ICML*.

[^pets]: Chua et al. (2018). [Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models](https://arxiv.org/abs/1805.12114).

[^mopo]: Yu et al. (2020). [MOPO: Model-based Offline Policy Optimization](https://arxiv.org/abs/2005.13239). *NeurIPS*.

[^morel]: Kidambi, R., Rajeswaran, A., Netrapalli, P., and Joachims, T. (2020). [MOReL: Model-Based Offline Reinforcement Learning](https://arxiv.org/abs/2005.05951). *NeurIPS*.

[^safedreamer]: Huang, W., Ji, J., Xia, C., Zhang, B., and Yang, Y. (2023 preprint; ICLR 2024). [SafeDreamer: Safe Reinforcement Learning with World Models](https://arxiv.org/abs/2307.07176).

[^dyna]: Sutton, R. S. (1991). [Dyna, an Integrated Architecture for Learning, Planning, and Reacting](https://doi.org/10.1145/122344.122377). *ACM SIGART Bulletin*, 2(4), 160–163.

[^worldmodels]: Ha, D., and Schmidhuber, J. (2018). [World Models](https://worldmodels.github.io/). Research article and project page; the related NeurIPS 2018 proceedings paper is titled *Recurrent World Models Facilitate Policy Evolution*.

[^planet]: Hafner et al. (2019). [Learning Latent Dynamics for Planning from Pixels](https://research.google/pubs/learning-latent-dynamics-for-planning-from-pixels/). *ICML*. PlaNet.

[^dreamer1]: Hafner et al. (2019 preprint; 2020 conference). [Dream to Control: Learning Behaviors by Latent Imagination](https://arxiv.org/abs/1912.01603). *ICLR*. Dreamer.

[^muzero]: Schrittwieser et al. (2019 preprint; 2020 journal publication). [Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model](https://arxiv.org/abs/1911.08265).

[^valueequivalence]: Grimm et al. (2020). [The Value Equivalence Principle for Model-Based Reinforcement Learning](https://arxiv.org/abs/2011.03506).

[^pearl]: Pearl (2018). [Theoretical Impediments to Machine Learning With Seven Sparks from the Causal Revolution](https://arxiv.org/abs/1801.04016).

[^causal]: Schölkopf et al. (2021). [Towards Causal Representation Learning](https://arxiv.org/abs/2102.11107).

[^coco]: Shi et al. (August 2026). [Overcoming Statistical Bias in Action-Controllable World Models](https://arxiv.org/abs/2608.04653). Preprint. CoCo.

[^citris]: Lippe et al. (2022). [CITRIS: Causal Identifiability from Temporal Intervened Sequences](https://proceedings.mlr.press/v162/lippe22a.html). *ICML*, PMLR 162, 13557–13603.

[^visualforesight]: Finn, C., and Levine, S. (2016 preprint; 2017 conference). [Deep Visual Foresight for Planning Robot Motion](https://arxiv.org/abs/1610.00696). *ICRA*.

[^unisim]: Yang et al. (2023). [Learning Interactive Real-World Simulators](https://arxiv.org/abs/2310.06114).

[^unipi]: Du et al. (2023). [Learning Universal Policies via Text-Guided Video Generation](https://arxiv.org/abs/2302.00111). *NeurIPS*. UniPi.

[^dreamzero]: Ye et al. (2026). [World Action Models are Zero-shot Policies](https://arxiv.org/abs/2602.15922). Preprint. DreamZero.

[^cosmospolicy]: Kim et al. (2026). [Cosmos Policy: Fine-Tuning Video Models for Visuomotor Control and Planning](https://arxiv.org/abs/2601.16163). Research paper; distinct from the Cosmos-Predict2.5 report.

[^lapa]: Ye et al. (2024 preprint; ICLR 2025). [Latent Action Pretraining from Videos](https://arxiv.org/abs/2410.11758). LAPA.

[^dreamdojo]: Gao et al. (2026). [DreamDojo: A Generalist Robot World Model from Large-Scale Human Videos](https://arxiv.org/abs/2602.06949). Preprint.

[^dinowm]: Zhou et al. (2024 preprint). [DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning](https://arxiv.org/abs/2411.04983).

[^dreamer4]: Hafner, D., Yan, W., and Lillicrap, T. (2025). [Training Agents Inside of Scalable World Models](https://arxiv.org/abs/2509.24527v1). Dreamer 4. See the experiments section for the offline VPT data and task-prompt sequence.

[^plan2explore]: Sekar et al. (2020). [Planning to Explore via Self-Supervised World Models](https://arxiv.org/abs/2005.05960). *ICML*. Plan2Explore.

[^mbpo]: Janner et al. (2019). [When to Trust Your Model: Model-Based Policy Optimization](https://arxiv.org/abs/1906.08253).

[^hjepa]: Dawid, A., and LeCun, Y. (2023 preprint; 2024 journal publication). [Introduction to Latent Variable Energy-Based Models: A Path Towards Autonomous Machine Intelligence](https://arxiv.org/abs/2306.02572). *Journal of Statistical Mechanics: Theory and Experiment*, 2024, 104011. Exposition of a proposed architecture, not a general-control benchmark result.

[^bisimulation]: Zhang et al. (2020 preprint; 2021 conference publication). [Learning Invariant Representations for Reinforcement Learning without Reconstruction](https://arxiv.org/abs/2006.10742).

[^diamond]: Alonso et al. (2024). [Diffusion for World Modeling: Visual Details Matter in Atari](https://arxiv.org/abs/2405.12399). *NeurIPS*. DIAMOND.

[^psr]: Littman, M. L., Sutton, R. S., and Singh, S. (2001 conference; 2002 proceedings). [Predictive Representations of State](https://papers.nips.cc/paper_files/paper/2001/file/1e4d36177d71bbb3558e43af9577d70e-Paper.pdf). *Advances in Neural Information Processing Systems*, 14.

[^options]: Sutton, R. S., Precup, D., and Singh, S. (1999). [Between MDPs and Semi-MDPs: A Framework for Temporal Abstraction in Reinforcement Learning](https://www-anw.cs.umass.edu/~barto/courses/cs687/Sutton-Precup-Singh-AIJ99.pdf). *Artificial Intelligence*, 112, 181–211.

[^taco]: Zheng et al. (2023). [TACO: Temporal Latent Action-Driven Contrastive Loss for Visual Reinforcement Learning](https://arxiv.org/abs/2306.13229).

[^prise]: Zheng et al. (2024). [PRISE: LLM-Style Sequence Compression for Learning Temporal Action Abstractions in Control](https://arxiv.org/abs/2402.10450).

[^tracevla]: Zheng et al. (2024 preprint). [TraceVLA: Visual Trace Prompting Enhances Spatial-Temporal Awareness for Generalist Robotic Policies](https://arxiv.org/abs/2412.10345).

[^mu0]: Lee et al. (2026). [μ0: A Scalable 3D Interaction-Trace World Model](https://arxiv.org/abs/2606.13769v2). Preprint. Distinguish video-based trace pretraining from downstream action-expert training.

[^dreamer2]: Hafner, D., Lillicrap, T., Norouzi, M., and Ba, J. (2020 preprint; ICLR 2021). [Mastering Atari with Discrete World Models](https://arxiv.org/abs/2010.02193). DreamerV2.

[^dreamer3]: Hafner, D., Pasukonis, J., Ba, J., and Lillicrap, T. (2025). [Mastering Diverse Control Tasks through World Models](https://danijar.com/project/dreamerv3/). *Nature*. DreamerV3; the 2023 preprint appeared under the earlier title *Mastering Diverse Domains through World Models*.

[^tdmpc2]: Hansen, Su, and Wang (2023 preprint; 2024 conference publication). [TD-MPC2: Scalable, Robust World Models for Continuous Control](https://arxiv.org/abs/2310.16828).

[^oh2015]: Oh, J., Guo, X., Lee, H., Lewis, R. L., and Singh, S. (2015). [Action-Conditional Video Prediction using Deep Networks in Atari Games](https://papers.nips.cc/paper_files/paper/2015/hash/6ba3af5d7b2790e73f0de32e5c8c1798-Abstract.html). *Advances in Neural Information Processing Systems*, 28.

[^simple]: Kaiser et al. (2019 preprint; 2020 conference). [Model-Based Reinforcement Learning for Atari](https://arxiv.org/abs/1903.00374). *ICLR*. SimPLe.

[^iris]: Micheli, V., Alonso, E., and Fleuret, F. (2022 preprint; 2023 conference). [Transformers are Sample-Efficient World Models](https://arxiv.org/abs/2209.00588). *ICLR*. IRIS.

[^ivideogpt]: Wu et al. (2024). [iVideoGPT: Interactive VideoGPTs are Scalable World Models](https://arxiv.org/abs/2405.15223). *NeurIPS*.

[^cosmos]: NVIDIA (2025 preprint; revised 2026). [World Simulation with Video Foundation Models for Physical AI](https://arxiv.org/abs/2511.00062). Technical report. The [Cosmos-Predict2.5 model documentation](https://research.nvidia.com/labs/cosmos-lab/cosmos-predict2.5/) separately lists base, multiview, and robot action-conditioned variants; accessed September 11, 2026.

[^genie]: Bruce et al. (2024). [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391).

[^genie2]: Google DeepMind (December 4, 2024). [Genie 2: A large-scale foundation world model](https://deepmind.google/blog/genie-2-a-large-scale-foundation-world-model/). First-party research announcement.

[^gamengen]: Valevski, D., Leviathan, Y., Arar, M., and Fruchter, S. (2024 preprint; ICLR 2025). [Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837). GameNGen.

[^lingbot]: Robbyant Team et al. (2026). [Advancing Open-source World Models](https://arxiv.org/abs/2601.20540). Technical report. LingBot-World.

[^trajectory]: Janner, M., Li, Q., and Levine, S. (2021). [Offline Reinforcement Learning as One Big Sequence Modeling Problem](https://arxiv.org/abs/2106.02039). *NeurIPS*. Trajectory Transformer.

[^diffuser]: Janner, M., Du, Y., Tenenbaum, J. B., and Levine, S. (2022). [Planning with Diffusion for Flexible Behavior Synthesis](https://arxiv.org/abs/2205.09991). *ICML*. Diffuser.

[^ijepa]: Assran et al. (2023). [Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://arxiv.org/abs/2301.08243). I-JEPA.

[^vjepa1]: Bardes et al. (2024). [Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471). *Transactions on Machine Learning Research*. V-JEPA.

[^vjepa21]: Mur-Labadia et al. (2026). [V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning](https://arxiv.org/abs/2603.14482). Preprint; first released in March 2026.

[^lewm]: Maes, L., Le Lidec, Q., Scieur, D., LeCun, Y., and Balestriero, R. (2026). [LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels](https://arxiv.org/abs/2603.19312). Preprint.

[^nerf]: Mildenhall et al. (2020). [NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis](https://arxiv.org/abs/2003.08934). *ECCV*.

[^gsplat]: Kerbl, B., Kopanas, G., Leimkühler, T., and Drettakis, G. (2023). [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://arxiv.org/abs/2308.04079). *ACM Transactions on Graphics*, 42(4).

[^atlas]: World Labs (September 1, 2026; research announcement). [Atlas: A World Model for Spatial Intelligence](https://www.worldlabs.ai/blog/atlas).

[^cswm]: Kipf, T., van der Pol, E., and Welling, M. (2019 preprint; ICLR 2020). [Contrastive Learning of Structured World Models](https://arxiv.org/abs/1911.12247). C-SWM.

[^slotformer]: Wu, Z., Dvornik, N., Greff, K., Kipf, T., and Garg, A. (2022 preprint; ICLR 2023). [SlotFormer: Unsupervised Visual Dynamics Simulation with Object-Centric Models](https://arxiv.org/abs/2210.05861).

[^plato]: Piloto, L. S., Weinstein, A., Battaglia, P., and Botvinick, M. (2022). [Intuitive physics learning in a deep-learning model inspired by developmental psychology](https://doi.org/10.1038/s41562-022-01394-8). *Nature Human Behaviour*. PLATO; see also the authors’ [research explanation](https://deepmind.google/blog/intuitive-physics-learning-in-a-deep-learning-model-inspired-by-developmental-psychology/).

[^gns]: Sanchez-Gonzalez et al. (2020). [Learning to Simulate Complex Physics with Graph Networks](https://arxiv.org/abs/2002.09405).

[^meshgraph]: Pfaff, T., Fortunato, M., Sanchez-Gonzalez, A., and Battaglia, P. W. (2020 preprint; 2021 conference). [Learning Mesh-Based Simulation with Graph Networks](https://arxiv.org/abs/2010.03409). *ICLR*. MeshGraphNets.

[^fno]: Li, Z., et al. (2020 preprint). [Fourier Neural Operator for Parametric Partial Differential Equations](https://arxiv.org/abs/2010.08895).

[^gaia1]: Hu et al. (2023). [GAIA-1: A Generative World Model for Autonomous Driving](https://arxiv.org/abs/2309.17080). Technical report.

[^drivedreamer]: Wang et al. (2023 preprint; 2024 conference). [DriveDreamer: Towards Real-world-driven World Models for Autonomous Driving](https://arxiv.org/abs/2309.09777). *ECCV*.

[^waymo]: Waymo (February 6, 2026). [The Waymo World Model: A New Frontier for Autonomous Driving Simulation](https://waymo.com/blog/2026/02/the-waymo-world-model-a-new-frontier-for-autonomous-driving-simulation/). First-party research announcement.

[^rap]: Hao et al. (2023). [Reasoning with Language Model is Planning with World Model](https://arxiv.org/abs/2305.14992).

[^worldcoder]: Tang, Key, and Ellis (2024). [WorldCoder, a Model-Based LLM Agent: Building World Models by Writing Code and Interacting with the Environment](https://arxiv.org/abs/2402.12275).

[^dynalang]: Lin et al. (2023 preprint; ICML 2024). [Learning to Model the World with Language](https://arxiv.org/abs/2308.01399). Dynalang.

[^dynaweb]: Ding et al. (2026). [DynaWeb: Model-Based Reinforcement Learning of Web Agents](https://arxiv.org/abs/2601.22149v2). Preprint.

[^wac]: Shen et al. (2026). [World-Model-Augmented Web Agents with Action Correction](https://arxiv.org/abs/2602.15384). Preprint. WAC.

[^tomnet]: Rabinowitz et al. (2018). [Machine Theory of Mind](https://arxiv.org/abs/1802.07740). ToMnet.

[^mamba]: Egorov, V., and Shpilman, A. (2022). [Scalable Multi-Agent Model-Based Reinforcement Learning](https://arxiv.org/abs/2205.15023). *AAMAS*. MAMBA; unrelated to the later Mamba state-space-model architecture.

[^physion]: Bear et al. (2021). [Physion: Evaluating Physical Prediction from Vision in Humans and Machines](https://arxiv.org/abs/2106.08261). Benchmark paper; the arXiv version was subsequently revised.

[^physionpp]: Tung et al. (2023). [Physion++: Evaluating Physical Scene Understanding that Requires Online Inference of Different Physical Properties](https://arxiv.org/abs/2306.15668).

[^wmbench]: Li et al. (2025). [WorldModelBench: Judging Video Generation Models As World Models](https://arxiv.org/abs/2502.20694).

[^mind]: Ye, Y., et al. (2026). [MIND: Benchmarking Memory Consistency and Action Control in World Models](https://arxiv.org/abs/2602.08025). Preprint.

[^worldgym]: Quevedo et al. (2025). [WorldGym: World Model as An Environment for Policy Evaluation](https://arxiv.org/abs/2506.00613v3). The cited preprint version is dated September 30, 2025.

[^othello]: Li et al. (2022 preprint; ICLR 2023). [Emergent World Representations: Exploring a Sequence Model Trained on a Synthetic Task](https://arxiv.org/abs/2210.13382). Study of a sequence model trained on Othello moves.

[^skills2symbols]: Konidaris, G., Kaelbling, L. P., and Lozano-Pérez, T. (2018). [From Skills to Symbols: Learning Symbolic Representations for Abstract High-Level Planning](https://www.jair.org/index.php/jair/article/view/11175). *Journal of Artificial Intelligence Research*, 61, 215–289. [DOI](https://doi.org/10.1613/jair.5575).

[^latplan]: Asai, M., Kajino, H., Fukunaga, A., and Muise, C. (2021 preprint; 2022 journal publication). [Classical Planning in Deep Latent Space](https://arxiv.org/abs/2107.00110). *Journal of Artificial Intelligence Research*. Latplan.

[^pdsketch]: Mao, J., Lozano-Pérez, T., Tenenbaum, J. B., and Kaelbling, L. P. (2022). [PDSketch: Integrated Domain Programming, Learning, and Planning](https://proceedings.neurips.cc/paper_files/paper/2022/hash/efe36e55d80a94d1726f660b8d237a0f-Abstract-Conference.html). *NeurIPS*. The [2023 arXiv version](https://arxiv.org/abs/2303.05501) is titled *PDSketch: Integrated Planning Domain Programming and Learning*.

[^bilevelskills]: Silver, T., Athalye, A., Tenenbaum, J. B., Lozano-Pérez, T., and Kaelbling, L. P. (CoRL 2022; proceedings 2023). [Learning Neuro-Symbolic Skills for Bilevel Planning](https://proceedings.mlr.press/v205/silver23a.html). PMLR 205, 701–714.

[^visualpredicator]: Liang, Y., et al. (2024 preprint; ICLR 2025). [VisualPredicator: Learning Abstract World Models with Neuro-Symbolic Predicates for Robot Planning](https://arxiv.org/abs/2410.23156v2). The [full text](https://arxiv.org/html/2410.23156) describes predicate construction and selection; Appendix B.5 discusses predicate unreliability.

[^pddlstream]: Garrett, C. R., Lozano-Pérez, T., and Kaelbling, L. P. (2018 preprint; ICAPS 2020). [PDDLStream: Integrating Symbolic Planners and Blackbox Samplers via Optimistic Adaptive Planning](https://arxiv.org/abs/1802.08705). A planning framework, not by itself a learned environmental model.

[^momagraph]: Ju, Y., et al. (2025 preprint; revised February 2026). [MomaGraph: State-Aware Unified Scene Graphs with Vision-Language Model for Embodied Task Planning](https://arxiv.org/abs/2512.16909v2). See §4.3 for graph updates during execution; distinguish observed state updates from a learned distribution over arbitrary interventions.

[^ipomdp]: Gmytrasiewicz, P. J., and Doshi, P. (2005). [A Framework for Sequential Planning in Multi-Agent Settings](https://doi.org/10.1613/jair.1579). *Journal of Artificial Intelligence Research*, 24, 49–79. [Author preprint archived in 2011](https://arxiv.org/abs/1109.2135). Interactive POMDPs.

[^mpag]: Fickinger, A., Zhuang, S., Critch, A., Hadfield-Menell, D., and Russell, S. (2020). [Multi-Principal Assistance Games: Definition and Collegial Mechanisms](https://arxiv.org/abs/2012.14536). Preprint. Its formal setting has one assisting agent and multiple human principals.

[^cooperativeai]: Dafoe, A., et al. (2020). [Open Problems in Cooperative AI](https://arxiv.org/abs/2012.08630). Research agenda, not a single evaluated world-model system.

[^causalgames]: Hammond, L., Fox, J., Everitt, T., Carey, R., Abate, A., and Wooldridge, M. (2023). [Reasoning about Causality in Games](https://arxiv.org/abs/2301.02324). *Artificial Intelligence*. [DOI](https://doi.org/10.1016/j.artint.2023.103919).

[^generativeagents]: Park, J. S., et al. (2023). [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442). *UIST*. Its simulated-community evaluation concerns believable behavior, not calibrated forecasts of arbitrary real people.

[^sotopia]: Zhou, X., et al. (2023 preprint; ICLR 2024). [SOTOPIA: Interactive Evaluation for Social Intelligence in Language Agents](https://arxiv.org/abs/2310.11667).

[^cicero]: Meta Fundamental AI Research Diplomacy Team (FAIR) et al. (2022). [Human-level play in the game of Diplomacy by combining language models with strategic reasoning](https://doi.org/10.1126/science.ade9097). *Science*. [CICERO project](https://ai.meta.com/research/cicero/).

[^delegation]: South, T., et al. (2025). [Authenticated Delegation and Authorized AI Agents](https://arxiv.org/abs/2501.09674). Preprint proposing an authenticated delegation framework; not a learned world model or an adopted universal authorization standard.

[^multiagentrisk]: Hammond, L., et al. (2025). [Multi-Agent Risks from Advanced AI](https://arxiv.org/abs/2502.14143). Cooperative AI Foundation technical report. Distinguishes miscoordination, conflict, and collusion.

[^commoninfo]: Nayyar, A., Mahajan, A., and Teneketzis, D. (2012 preprint; 2013 journal publication). [Decentralized Stochastic Control with Partial History Sharing: A Common Information Approach](https://arxiv.org/abs/1209.1695). *IEEE Transactions on Automatic Control*, 58(7), 1644–1658. A decentralized-team control framework, not a resolution of conflicting principal objectives.
