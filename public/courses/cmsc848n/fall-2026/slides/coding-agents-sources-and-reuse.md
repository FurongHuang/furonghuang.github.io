# Coding agents: sources and reuse notices

CMSC 848N, University of Maryland, Fall 2026. Instructor: Furong Huang.

| Lecture | Date | Slides |
| --- | --- | --- |
| W7-L1: Inside a Coding-Agent Harness | October 15, 2026 | [Lecture PDF](./W7-L1-2026-Inside-a-Coding-Agent-Harness.pdf) |
| W8-L1: Training Coding Agents | October 20, 2026 | [Lecture PDF](./W8-L1-2026-Training-Coding-Agents.pdf) |
| W8-L2: Optimizing Coding-Agent Harnesses | October 22, 2026 | [Lecture PDF](./W8-L2-2026-Optimizing-Coding-Agent-Harnesses.pdf) |

Slide numbers below refer to these PDFs. Paper versions and code revisions identify the sources used in the lectures. Third-party material retains the license of its source.

## W7-L1: Inside a Coding-Agent Harness

### References

- Yang et al. (2024), [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering, arXiv v3](https://arxiv.org/html/2405.15793v3).
- [SWE-agent's recorded pydicom repair trajectory](https://github.com/SWE-agent/SWE-agent/blob/3ea751c087f32b16e039a2233dd6eefecef325d5/tests/test_data/trajectories/gpt4__swe-bench-dev-easy_first_only__default__t-0.00__p-0.95__c-3.00__install-1/pydicom__pydicom-1458.traj), repository commit `3ea751c087f32b16e039a2233dd6eefecef325d5`.
- pydicom [issue #1457](https://github.com/pydicom/pydicom/issues/1457) and [pull request #1458](https://github.com/pydicom/pydicom/pull/1458). The recorded task uses pydicom base commit `8da0b9b215ebfad5756051c891def88e426787e7`.
- mini-SWE-agent, commit `04d809ceab9df28f9adaed044884180159172930`: [agent implementation](https://github.com/SWE-agent/mini-swe-agent/blob/04d809ceab9df28f9adaed044884180159172930/src/minisweagent/agents/default.py), [local environment](https://github.com/SWE-agent/mini-swe-agent/blob/04d809ceab9df28f9adaed044884180159172930/src/minisweagent/environments/local.py), and [configuration](https://github.com/SWE-agent/mini-swe-agent/blob/04d809ceab9df28f9adaed044884180159172930/src/minisweagent/config/mini.yaml).
- mini-SWE-agent [control-flow documentation](https://mini-swe-agent.com/latest/advanced/control_flow/).
- CMU, [Agents for Issue Solving](https://cmu-codegen.github.io/f2025/static_files/codegen_f2025_17_agents.pdf), Fall 2025. This lecture informed the choice of the pydicom example; its slide artwork is not reproduced.

### Figures, code, and adaptations

| Slides | Material and attribution | License and changes |
| --- | --- | --- |
| 3–11, 14 | Recorded SWE-agent actions, observations, and pydicom code from the pinned trajectory above | SWE-agent and the selected pydicom code are MIT-licensed. Excerpts shorten output and exception text, retain relevant line references, and omit surrounding setup. |
| 12 | Yang et al., SWE-agent Figure 1 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Original figure, proportionally scaled. |
| 15–19, 24, 30 | mini-SWE-agent code and configuration at the pinned commit | MIT. Simplified pseudocode, selected behavior, and explanatory examples are adaptations. |
| 20–22 | Yang et al., SWE-agent search-interface comparison | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source panels separated and enlarged, with attribution retained. |
| 23 | Yang et al., SWE-agent Table 3 | Reported values replotted as a course chart, with source attribution. |
| 25 | Lint-gate example informed by SWE-agent Figure 11 | Original course example. |

The paired-effects calculation on slide 28 and recovery probe on slide 29 are original course formulations. Slides 31–32 contain the harness checklist and connection to training, respectively, drawing on the same pinned implementations and repair trace.

Notices: [SWE-agent MIT](./reuse-notices/SWE-agent-MIT.txt), [mini-SWE-agent MIT](./reuse-notices/mini-SWE-agent-MIT.txt), [pydicom license](./reuse-notices/pydicom-MIT.txt), and [SWE-agent figure attribution](./reuse-notices/SWE-agent-paper-CC-BY-4.0.md).

## W8-L1: Training Coding Agents

### References

- Yang et al. (2025), [SWE-smith: Scaling Data for Software Engineering Agents, arXiv v2](https://arxiv.org/html/2504.21798v2).
- Chen et al. (2026), [SWE-Universe: Scale Real-World Verifiable Environments to Millions, arXiv v1](https://arxiv.org/html/2602.02361v1).
- Shao et al. (2024), [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models, arXiv v3, Section 4.1](https://arxiv.org/html/2402.03300v3#S4).
- SWE-smith documentation: [creating task instances](https://swesmith.com/guides/create_instances/), [validation and evaluation](https://swesmith.com/guides/harnesses/), and [training SWE-agents](https://swesmith.com/guides/train_swe_agent/).
- [SWE-smith dataset, revision `ea6d7173829c7ec8fa16c22055699ff2e9188091`](https://huggingface.co/datasets/SWE-bench/SWE-smith/tree/ea6d7173829c7ec8fa16c22055699ff2e9188091). The task excerpt is `oauthlib__oauthlib.1fd52536.combine_file__09vlzwgc`.
- SWE-smith repository, commit `9b74ac08118a85c39c356802f7961893af73e07f`: [trajectory collector](https://github.com/SWE-bench/SWE-smith/blob/9b74ac08118a85c39c356802f7961893af73e07f/swesmith/train/traj_mgr/collect_trajs.py), [Qwen 32B training configuration](https://github.com/SWE-bench/SWE-smith/blob/9b74ac08118a85c39c356802f7961893af73e07f/configs/train/full_ft_qwen_32b.yml), and [task-generation image](https://github.com/SWE-bench/SWE-smith/blob/9b74ac08118a85c39c356802f7961893af73e07f/docs/assets/bug_gen_overview.png).
- [Torchtune chat_dataset documentation](https://meta-pytorch.org/torchtune/stable/generated/torchtune.datasets.chat_dataset.html).
- [OAuthlib license at the task's recorded revision](https://github.com/oauthlib/oauthlib/blob/1fd5253630c03e3f12719dd8c13d43111f66a8d2/LICENSE).

### Figures, code, and adaptations

| Slides | Material and attribution | License and changes |
| --- | --- | --- |
| 4–5 | SWE-smith task metadata and an injected OAuthlib patch | Dataset card: MIT. Underlying OAuthlib code: BSD-3-Clause. Field values are abbreviated; the code shows one injected hunk. |
| 6 | SWE-smith `bug_gen_overview.png`, John Yang et al. | MIT-licensed repository asset. Source graphic reproduced without content changes. |
| 15 | SWE-smith `collect_trajs.py` | MIT. Selected, non-contiguous code excerpts. |
| 16 | SWE-smith `full_ft_qwen_32b.yml` | MIT. Selected configuration fields. |
| 19–23 | Policy-gradient derivation and multi-turn GRPO formulation, informed by DeepSeekMath Section 4.1 | Course mathematical adaptation and worked example. The formulation is not attributed to SWE-Universe's implementation. |

The SWE-smith paper is [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The reproduced task-generation image comes from the separately MIT-licensed repository asset linked above. No SWE-smith paper screenshot, SWE-Universe figure, or DeepSeekMath figure is reproduced.

Complete MIT and BSD-3-Clause terms and source attributions accompany the lecture in [W8-L1 training reuse notices](./reuse-notices/W8-L1-training-reuse-notices.txt).

## W8-L2: Optimizing Coding-Agent Harnesses

### References

- Zhang et al. (2026), [Self-Harness: Harnesses That Improve Themselves, arXiv v3](https://arxiv.org/html/2606.09498v3), including Algorithm 1, Figure 11b, and the Figure 12 example.
- Wang et al. (2026), [Rethinking the Evaluation of Harness Evolution for Agents, arXiv v4](https://arxiv.org/html/2607.12227v4).
- Xia et al. (2026), [RRSI: Regularized Recursive Self-Improvement of Agent Harnesses, arXiv v3](https://arxiv.org/html/2609.24972v3).
- RRSI official implementation, commit `be50316e1db05914068a973f322770ef08ed7ba1`: [repository and reported results](https://github.com/google-research/rrsi/tree/be50316e1db05914068a973f322770ef08ed7ba1), [selection.py](https://github.com/google-research/rrsi/blob/be50316e1db05914068a973f322770ef08ed7ba1/rrsi/selection.py), [schedule.py](https://github.com/google-research/rrsi/blob/be50316e1db05914068a973f322770ef08ed7ba1/rrsi/schedule.py), and [components.py](https://github.com/google-research/rrsi/blob/be50316e1db05914068a973f322770ef08ed7ba1/rrsi/components.py).
- Fan et al. (2026), [An Empirical Study of Harness Design for Coding Agents, arXiv v1](https://arxiv.org/html/2609.20804v1).
- Zhang et al. (2026), [AutoCompact: Learning When to Compact Context in Long-Horizon Coding Agents, arXiv v1](https://arxiv.org/html/2610.02163v1).

### Figures, code, and adaptations

| Slides | Material and attribution | License and changes |
| --- | --- | --- |
| 11 | Self-Harness Figure 11b instruction, with context from Figure 12; Hangfan Zhang et al. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Short attributed adaptation of the retained instruction. |
| 24–25 | RRSI `selection.py` and its cost-rule conditions; The rrsi Authors and Google LLC | Apache-2.0. Selected code with omissions and abbreviated context; the cost rule is expressed as equations. |
| 26 | RRSI coding results from the pinned official repository | Reported numerical values reproduced with source attribution. |
| 28 | AutoCompact Figure 2; Xuan Zhang et al. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source graphic reproduced without content changes. |
| 29 | Compaction and policy objective | Course abstraction informed by AutoCompact. |

The RRSI and empirical harness-design paper figures are not reproduced. The verification-record example, selection-bias derivations, cost calculation, and experimental designs are original course material.

The RRSI excerpt is accompanied by its [copyright and modification notices](./reuse-notices/W8-L2-RRSI-notices.txt) and the complete [Apache-2.0 license](./reuse-notices/W8-L2-RRSI-Apache-2.0.txt).
