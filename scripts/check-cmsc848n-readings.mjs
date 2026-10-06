import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Run after the Astro build. Accept a downloaded HTML path for live-site checks.
const data = JSON.parse(readFileSync(new URL("../src/data/cmsc848n-readings.json", import.meta.url), "utf8"));
const html = readFileSync(resolve(process.argv[2] || "dist/cmsc848n-fall-2026/index.html"), "utf8");
const schedule = html.match(/<section\b[^>]*id="schedule"[^>]*>([\s\S]*?)<\/section>/)?.[1];
assert.ok(schedule, "Course schedule must render.");
const scheduledDates = [...schedule.matchAll(/<time\b[^>]*datetime="(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
const readingDates = [...html.matchAll(/data-reading-date="(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
const readingLinks = [...schedule.matchAll(/href="#reading-(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
assert.deepEqual(readingDates, scheduledDates, "Every lecture must render its own reading entry in schedule order.");
assert.deepEqual(readingLinks, scheduledDates, "Every lecture must link to its reading entry, including unreleased slides and continuations.");
assert.equal(new Set(scheduledDates).size, scheduledDates.length, "Lecture dates must be unique.");
assert.deepEqual(Object.keys(data.lectures).sort(), [...scheduledDates].sort(), "The reading data must match the schedule exactly.");
assert.ok(html.includes('href="#readings"'), "The reading section must be discoverable from the page.");

const usedSources = new Set();
for (const [date, reading] of Object.entries(data.lectures)) {
  assert.ok(reading.focus.trim(), `${date}: missing reading focus.`);
  assert.ok(["current", "planned", "pending"].includes(reading.status), `${date}: invalid status.`);
  const entry = html.match(new RegExp(`<article\\b[^>]*id="reading-${date}"[^>]*>([\\s\\S]*?)<\\/article>`))?.[1];
  assert.ok(entry, `${date}: missing reading anchor.`);
  if (reading.status === "pending") {
    assert.equal(reading.core.length + reading.further.length, 0, `${date}: do not assign readings to an unconfirmed topic.`);
    assert.ok(entry.includes("Readings pending"), `${date}: pending assignment must be visible.`);
    assert.ok(!entry.includes("Read first"), `${date}: do not show an empty reading list.`);
  } else {
    assert.ok(reading.core.length > 0, `${date}: missing Read first selection.`);
    assert.ok(entry.includes("Read first"), `${date}: missing visible priority.`);
  }
  if (reading.status === "planned") assert.ok(entry.includes("Planned"), `${date}: planned status must be visible.`);
  for (const item of [...reading.core, ...reading.further]) {
    const source = data.sources[item.source];
    assert.ok(source?.title && source.citation && source.kind, `${date}: incomplete source ${item.source}.`);
    assert.equal(new URL(source.url).protocol, "https:", `${item.source}: use a public HTTPS source.`);
    assert.ok(entry.includes(`href="${source.url}"`), `${date}: missing source link ${item.source}.`);
    usedSources.add(item.source);
  }
}
assert.deepEqual([...usedSources].sort(), Object.keys(data.sources).sort(), "Remove unassigned references from the reading data.");
assert.ok(!/\/Users\/|sourceDeckPath|polishedDeckPath|\.human-redesign|Dropbox\//.test(JSON.stringify(data)), "Reading data must not expose private paths.");

// Guard the instructor-confirmed teaching sequence and relocated readings.
assert.deepEqual(data.lectures["2026-09-15"].core.map((item) => item.source), ["deepseekMath", "deepseekR1"]);
assert.deepEqual(data.lectures["2026-09-17"].core.map((item) => item.source), ["dpo", "controlledDecoding"]);
assert.deepEqual(data.lectures["2026-09-22"].core.map((item) => item.source), ["dpo", "controlledDecoding"]);
assert.deepEqual(data.lectures["2026-09-24"].core.map((item) => item.source), ["react", "webDreamer"]);
assert.deepEqual(data.lectures["2026-09-29"].core.map((item) => item.source), ["generativeAgents"]);
assert.deepEqual(data.lectures["2026-10-01"].core.map((item) => item.source), ["toolformer"]);
assert.deepEqual(data.lectures["2026-10-15"].core.map((item) => item.source), ["sweAgentV3", "miniSweAgentControlFlow"]);
assert.deepEqual(data.lectures["2026-10-20"].core.map((item) => item.source), ["sweSmith", "sweSmithTraining"]);
assert.deepEqual(data.lectures["2026-10-22"].core.map((item) => item.source), ["selfHarness", "harnessEvaluation"]);
assert.equal(data.lectures["2026-12-03"].status, "pending", "Keep the December 3 class with its topic and readings unconfirmed.");
const codingPaperVersions = {
  sweAgentV3: "2405.15793v3",
  sweSmith: "2504.21798v2",
  sweUniverse: "2602.02361v1",
  selfHarness: "2606.09498v3",
  harnessEvaluation: "2607.12227v4",
  rrsi: "2609.24972v3",
  harnessDesign: "2609.20804v1",
  autoCompact: "2610.02163v1"
};
for (const [source, version] of Object.entries(codingPaperVersions)) {
  assert.equal(data.sources[source].url, `https://arxiv.org/html/${version}`, `Keep the lecture's verified source version: ${source}.`);
}

// Keep the Week 5 slide citations under their respective lectures.
const week5SlideCitations = {
  "2026-09-29": {
    coala: "2309.02427",
    referralAugmentation: "2305.15098",
    fireAct: "2310.05915",
    ape: "2211.01910",
    sweAgent: "2405.15793",
    betterTogether: "2407.10930"
  },
  "2026-10-01": {
    codeAct: "2402.01030",
    xGrammar: "2411.15100",
    camel: "2503.18813"
  }
};
for (const [date, citations] of Object.entries(week5SlideCitations)) {
  const reading = data.lectures[date];
  const supplementarySources = new Set(reading.further.map((item) => item.source));
  for (const [source, arxivId] of Object.entries(citations)) {
    assert.ok(supplementarySources.has(source), `${date}: missing slide citation ${source}.`);
    assert.equal([...reading.core, ...reading.further].filter((item) => item.source === source).length, 1, `${date}: duplicate slide citation ${source}.`);
    assert.equal(data.sources[source].url, `https://arxiv.org/abs/${arxivId}`, `${date}: incorrect paper URL for ${source}.`);
  }
}

for (const filename of ["W3-L2-2026-Alignment-DPO-to-Controlled-Decoding.pdf", "W4-L1-2026-Planning-and-State.pdf", "W5-L1-2026-Memory-and-Context-Engineering.pdf", "W5-L2-2026-Tool-Use-and-Action-Interfaces.pdf"]) {
  assert.ok(schedule.includes(`/courses/cmsc848n/fall-2026/slides/${filename}`), `Keep the published slide link: ${filename}`);
}
const pageSource = readFileSync(new URL("../src/pages/cmsc848n-fall-2026.astro", import.meta.url), "utf8");
const revisedLectures = [
  ["2026-09-22", "Alignment from DPO to Controlled Decoding (continued)", "W3-L2-2026-Alignment-DPO-to-Controlled-Decoding.pdf"],
  ["2026-09-24", "Planning and State", "W4-L1-2026-Planning-and-State.pdf"],
  ["2026-09-29", "Memory and Context Engineering", "W5-L1-2026-Memory-and-Context-Engineering.pdf"],
  ["2026-10-01", "Tool Use and Action Interfaces", "W5-L2-2026-Tool-Use-and-Action-Interfaces.pdf"],
  ["2026-10-15", "Inside a Coding-Agent Harness", "W7-L1-2026-Inside-a-Coding-Agent-Harness.pdf"],
  ["2026-10-20", "Training Coding Agents", "W8-L1-2026-Training-Coding-Agents.pdf"],
  ["2026-10-22", "Optimizing Coding-Agent Harnesses", "W8-L2-2026-Optimizing-Coding-Agent-Harnesses.pdf"],
  ["2026-10-27", "Deep Research Agents: Search, Evidence, and Reproducible Synthesis", "W9-L1-Deep-Research-Agents-Search-Evidence-and-Reproducible-Synthesis.pptx"],
  ["2026-10-29", "Scientific Discovery Agents: Hypotheses, Experiments, and Valid Claims", "W9-L2-Scientific-Discovery-Agents-Hypotheses-Experiments-and-Valid-Claims.pptx"],
  ["2026-11-03", "World Models and Vision-Language-Action Agents", "W10-L1-World-Models-and-Vision-Language-Action-Agents.pptx"],
  ["2026-11-05", "Data-Efficient Embodied Learning and Evaluation", "W10-L2-Data-Efficient-Embodied-Learning-and-Evaluation.pptx"],
  ["2026-11-10", "Adversarial Threats Across the Agent Lifecycle", "W11-L1-Adversarial-Threats-Across-the-Agent-Lifecycle.pptx"],
  ["2026-11-12", "Defense in Depth, Monitoring, and Incident Response", "W11-L2-Defense-in-Depth-Monitoring-and-Incident-Response.pptx"],
  ["2026-11-17", "Learning from Experience: Prompts, Skills, Policies, and Continual Adaptation", "W12-L1-Learning-from-Experience-Prompts-Skills-Policies-and-Continual-Adaptation.pptx"],
  ["2026-11-19", "Self-Modifying and Evolutionary Agents", "W12-L2-Self-Modifying-and-Evolutionary-Agents.pptx"],
  ["2026-11-24", "Agent Evaluation and Deployment Evidence", "W13-L1-Agent-Evaluation-and-Deployment-Evidence.pptx"],
  ["2026-12-01", "Provenance, Watermarking, and Frontier Challenges", "W13-L2-Provenance-Watermarking-and-Frontier-Challenges.pptx"],
  ["2026-12-03", "Topic to be confirmed", null]
];
for (const lecture of revisedLectures) {
  assert.ok(pageSource.includes(`[${lecture.map((value) => JSON.stringify(value)).join(", ")}]`), `Incorrect date/topic/deck mapping: ${lecture[0]}`);
}
for (const date of ["2026-10-13", "2026-11-26"]) assert.ok(!data.lectures[date], "Do not assign lecture readings on a university break.");
assert.ok(schedule.includes("No class Tuesday, October 13 (Fall Break). W7-L1 meets Thursday, October 15."), "Clarify the Fall Break and W7-L1 meeting dates.");
assert.ok(!scheduledDates.includes("2026-10-13"), "Do not schedule a lecture during Fall Break.");
assert.ok(pageSource.includes("PDF release: ${formatReleaseDate(date)} · 11 AM"), "Distinguish the PDF release date from the lecture date.");

console.log(`CMSC 848N readings check passed: ${scheduledDates.length} lectures, ${usedSources.size} sources, all schedule links present.`);
