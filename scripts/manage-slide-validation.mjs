import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const coursePagePath = join(repoRoot, "src/pages/cmsc848n-fall-2026.astro");

const argumentsByName = new Map(
  process.argv.slice(2).map((argument) => {
    const separator = argument.indexOf("=");
    return separator === -1
      ? [argument, true]
      : [argument.slice(0, separator), argument.slice(separator + 1)];
  })
);

const action = String(argumentsByName.get("--action") || "check");
const draftSlideRoot = resolve(
  String(argumentsByName.get("--drafts") || process.env.CMSC848N_SLIDE_DRAFTS || join(repoRoot, "..", "06_Slide_Drafts"))
);
const validationRoot = join(draftSlideRoot, ".validation");
const now = argumentsByName.has("--now")
  ? new Date(String(argumentsByName.get("--now")))
  : new Date();

if (Number.isNaN(now.getTime())) {
  throw new Error("--now must be a valid ISO date-time.");
}

const getNewYorkDate = (date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const value = (type) => parts.find((part) => part.type === type)?.value || "";
  return `${value("year")}-${value("month")}-${value("day")}`;
};

const subtractCalendarDays = (date, days) => {
  const result = new Date(`${date}T12:00:00Z`);
  result.setUTCDate(result.getUTCDate() - days);
  return result.toISOString().slice(0, 10);
};

const getSha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const source = readFileSync(coursePagePath, "utf8");
const lecturePattern = /\[\s*"(\d{4}-\d{2}-\d{2})"\s*,\s*"(?:[^"\\]|\\.)*"\s*,\s*"([^"\n]+\.pptx)"\s*\]/g;
const schedule = Array.from(source.matchAll(lecturePattern), (match) => ({
  lectureDate: match[1],
  releaseDate: subtractCalendarDays(match[1], 2),
  validationDate: subtractCalendarDays(match[1], 3),
  filename: match[2]
}));

if (schedule.length === 0) {
  throw new Error("No CMSC 848N slide schedule entries were found.");
}

for (const entry of schedule) {
  if (basename(entry.filename) !== entry.filename) {
    throw new Error(`Unsafe slide filename in schedule: ${entry.filename}`);
  }
}

if (action === "check") {
  const date = getNewYorkDate(now);
  const dueForValidation = schedule.filter((entry) => entry.validationDate === date);
  const needsValidation = [];
  const alreadyValidated = [];
  const missingDrafts = [];

  for (const entry of dueForValidation) {
    const deckPath = join(draftSlideRoot, entry.filename);
    if (!existsSync(deckPath)) {
      missingDrafts.push(entry);
      continue;
    }

    const sha256 = getSha256(deckPath);
    const receiptPath = join(validationRoot, `${entry.filename}.json`);
    if (!existsSync(receiptPath)) {
      needsValidation.push({ ...entry, deckPath, sha256, reason: "No validation receipt exists." });
      continue;
    }

    try {
      const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
      if (receipt.status === "pass" && receipt.sha256 === sha256) {
        alreadyValidated.push({ ...entry, deckPath, sha256, receiptPath });
      } else {
        needsValidation.push({
          ...entry,
          deckPath,
          sha256,
          reason: receipt.sha256 === sha256
            ? "The latest validation did not pass."
            : "The deck changed after its latest validation."
        });
      }
    } catch {
      needsValidation.push({ ...entry, deckPath, sha256, reason: "The validation receipt is unreadable." });
    }
  }

  process.stdout.write(`${JSON.stringify({
    checkedAt: now.toISOString(),
    newYorkDate: date,
    draftSlideRoot,
    validationRoot,
    needsValidation,
    alreadyValidated,
    missingDrafts
  }, null, 2)}\n`);
} else if (action === "record") {
  const filename = String(argumentsByName.get("--filename") || "");
  const status = String(argumentsByName.get("--status") || "");
  const reportPath = argumentsByName.has("--report")
    ? resolve(String(argumentsByName.get("--report")))
    : "";

  if (!schedule.some((entry) => entry.filename === filename)) {
    throw new Error("--filename must exactly match a deck in the course schedule.");
  }
  if (status !== "pass" && status !== "fail") {
    throw new Error("--status must be pass or fail.");
  }
  if (!reportPath || !existsSync(reportPath)) {
    throw new Error("--report must point to the completed validation report.");
  }

  const deckPath = join(draftSlideRoot, filename);
  if (!existsSync(deckPath)) {
    throw new Error(`The staged deck does not exist: ${deckPath}`);
  }

  const report = readFileSync(reportPath, "utf8");
  if (report.length > 100_000) {
    throw new Error("The validation report is unexpectedly large.");
  }

  const receipt = {
    version: 1,
    filename,
    sha256: getSha256(deckPath),
    status,
    validatedAt: now.toISOString(),
    report
  };
  mkdirSync(validationRoot, { recursive: true });
  const receiptPath = join(validationRoot, `${filename}.json`);
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
  process.stdout.write(`${JSON.stringify({ receiptPath, ...receipt, report: undefined }, null, 2)}\n`);
} else {
  throw new Error("--action must be check or record.");
}
