import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const coursePagePath = join(repoRoot, "src/pages/cmsc848n-fall-2026.astro");
const publicSlideRoot = join(repoRoot, "public/courses/cmsc848n/fall-2026/slides");

const argumentsByName = new Map(
  process.argv.slice(2).map((argument) => {
    const separator = argument.indexOf("=");
    return separator === -1
      ? [argument, true]
      : [argument.slice(0, separator), argument.slice(separator + 1)];
  })
);

const draftSlideRoot = resolve(
  String(argumentsByName.get("--drafts") || process.env.CMSC848N_SLIDE_DRAFTS || join(repoRoot, "..", "06_Slide_Drafts"))
);
const dryRun = argumentsByName.has("--dry-run");
const publicationRoot = join(draftSlideRoot, ".publication");
const now = argumentsByName.has("--now")
  ? new Date(String(argumentsByName.get("--now")))
  : new Date();

if (Number.isNaN(now.getTime())) {
  throw new Error("--now must be a valid ISO date-time.");
}

const getNewYorkClock = (date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const value = (type) => parts.find((part) => part.type === type)?.value || "";
  return {
    date: `${value("year")}-${value("month")}-${value("day")}`,
    minutes: Number(value("hour")) * 60 + Number(value("minute"))
  };
};

const subtractCalendarDays = (date, days) => {
  const result = new Date(`${date}T12:00:00Z`);
  result.setUTCDate(result.getUTCDate() - days);
  return result.toISOString().slice(0, 10);
};

const source = readFileSync(coursePagePath, "utf8");
const lecturePattern = /\[\s*"(\d{4}-\d{2}-\d{2})"\s*,\s*"(?:[^"\\]|\\.)*"\s*,\s*"([^"\n]+\.pptx)"\s*\]/g;
const schedule = Array.from(source.matchAll(lecturePattern), (match) => ({
  lectureDate: match[1],
  releaseDate: subtractCalendarDays(match[1], 2),
  filename: match[2],
  publicFilename: match[2].replace(/\.pptx$/i, ".pdf")
}));

if (schedule.length === 0) {
  throw new Error("No CMSC 848N slide schedule entries were found.");
}

const clock = getNewYorkClock(now);
const isDue = ({ releaseDate }) =>
  clock.date > releaseDate || (clock.date === releaseDate && clock.minutes >= 11 * 60);

const published = [];
const alreadyPublished = [];
const missingDue = [];
const blockedValidation = [];
const upcoming = [];

const getSha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

for (const entry of schedule) {
  if (basename(entry.filename) !== entry.filename) {
    throw new Error(`Unsafe slide filename in schedule: ${entry.filename}`);
  }

  if (!isDue(entry)) {
    upcoming.push(entry);
    continue;
  }

  const destination = join(publicSlideRoot, entry.publicFilename);
  if (existsSync(destination)) {
    alreadyPublished.push(entry);
    continue;
  }

  const draft = join(draftSlideRoot, entry.filename);
  if (!existsSync(draft)) {
    missingDue.push({ ...entry, reason: "The source PPTX is missing." });
    continue;
  }

  const stagedPdf = join(publicationRoot, entry.publicFilename);
  if (!existsSync(stagedPdf) || readFileSync(stagedPdf).subarray(0, 5).toString("ascii") !== "%PDF-") {
    missingDue.push({ ...entry, reason: "The staged build PDF is missing or invalid." });
    continue;
  }

  const receiptPath = join(draftSlideRoot, ".validation", `${entry.filename}.json`);
  if (!existsSync(receiptPath)) {
    blockedValidation.push({ ...entry, reason: "No validation receipt exists for this deck." });
    continue;
  }

  let receipt;
  try {
    receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
  } catch {
    blockedValidation.push({ ...entry, reason: "The validation receipt is unreadable." });
    continue;
  }

  if (
    receipt.version !== 2 ||
    receipt.filename !== entry.filename ||
    receipt.publicFilename !== entry.publicFilename
  ) {
    blockedValidation.push({ ...entry, reason: "The validation receipt does not match this deck and staged PDF." });
    continue;
  }

  if (receipt.status !== "pass") {
    blockedValidation.push({ ...entry, reason: "The latest validation did not pass." });
    continue;
  }

  if (
    !Number.isInteger(receipt.sourceSlideCount) || receipt.sourceSlideCount < 1 ||
    !Number.isInteger(receipt.stagedPdfPageCount) || receipt.stagedPdfPageCount < receipt.sourceSlideCount ||
    receipt.stagedPdfPageCount !== receipt.expectedBuildPageCount
  ) {
    blockedValidation.push({ ...entry, reason: "The validation receipt does not prove complete PowerPoint build coverage." });
    continue;
  }

  if (receipt.sourceSha256 !== getSha256(draft)) {
    blockedValidation.push({ ...entry, reason: "The deck changed after validation and must be reviewed again." });
    continue;
  }
  if (receipt.stagedPdfSha256 !== getSha256(stagedPdf)) {
    blockedValidation.push({ ...entry, reason: "The staged build PDF changed after validation and must be reviewed again." });
    continue;
  }

  if (!dryRun) {
    mkdirSync(publicSlideRoot, { recursive: true });
    copyFileSync(stagedPdf, destination);
  }
  published.push(entry);
}

const result = {
  checkedAt: now.toISOString(),
  newYorkDate: clock.date,
  draftSlideRoot,
  dryRun,
  published,
  alreadyPublished,
  missingDue,
  blockedValidation,
  upcomingCount: upcoming.length
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
