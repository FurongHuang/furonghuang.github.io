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
  assert.ok(reading.core.length > 0, `${date}: missing Read first selection.`);
  assert.ok(reading.focus.trim(), `${date}: missing reading focus.`);
  assert.ok(["current", "planned"].includes(reading.status), `${date}: invalid status.`);
  const entry = html.match(new RegExp(`<article\\b[^>]*id="reading-${date}"[^>]*>([\\s\\S]*?)<\\/article>`))?.[1];
  assert.ok(entry, `${date}: missing reading anchor.`);
  assert.ok(entry.includes("Read first"), `${date}: missing visible priority.`);
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

// Guard the corrected early-semester sequence and already published W4 PDFs.
assert.deepEqual(data.lectures["2026-09-15"].core.map((item) => item.source), ["deepseekMath", "deepseekR1"]);
assert.deepEqual(data.lectures["2026-09-17"].core.map((item) => item.source), ["dpo", "controlledDecoding"]);
for (const filename of ["W4-L1-2026-Planning-and-State.pdf", "W4-L2-2026-Memory-and-Context-Engineering.pdf"]) {
  assert.ok(schedule.includes(`/courses/cmsc848n/fall-2026/slides/${filename}`), `Keep the published slide link: ${filename}`);
}
for (const date of ["2026-10-13", "2026-11-26"]) assert.ok(!data.lectures[date], "Do not assign lecture readings on a university break.");

console.log(`CMSC 848N readings check passed: ${scheduledDates.length} lectures, ${usedSources.size} sources, all schedule links present.`);
