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
const polishReceiptRoot = join(draftSlideRoot, ".polish");
const polishedRoot = join(draftSlideRoot, ".polished");
const publicationRoot = join(draftSlideRoot, ".publication");
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
const getPublishedFilename = (filename) => filename.replace(/\.pptx$/i, ".pdf");
const isPdf = (path) => readFileSync(path).subarray(0, 5).toString("ascii") === "%PDF-";
const hasBuildCoverage = (receipt) =>
  Number.isInteger(receipt.sourceSlideCount) && receipt.sourceSlideCount > 0 &&
  Number.isInteger(receipt.stagedPdfPageCount) && receipt.stagedPdfPageCount >= receipt.sourceSlideCount &&
  receipt.stagedPdfPageCount === receipt.expectedBuildPageCount;
const source = readFileSync(coursePagePath, "utf8");
const lecturePattern = /\[\s*"(\d{4}-\d{2}-\d{2})"\s*,\s*"(?:[^"\\]|\\.)*"\s*,\s*"([^"\n]+\.pptx)"\s*\]/g;
const schedule = Array.from(source.matchAll(lecturePattern), (match) => ({
  lectureDate: match[1],
  releaseDate: subtractCalendarDays(match[1], 2),
  validationDate: subtractCalendarDays(match[1], 3),
  polishDate: subtractCalendarDays(match[1], 7),
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

if (action === "check-polish") {
  const date = getNewYorkDate(now);
  const dueForPolish = schedule.filter((entry) => entry.polishDate <= date && entry.lectureDate >= date);
  const needsPolish = [];
  const alreadyPolished = [];
  const missingDrafts = [];

  for (const entry of dueForPolish) {
    const sourceDeckPath = join(draftSlideRoot, entry.filename);
    const polishedDeckPath = join(polishedRoot, entry.filename);
    const receiptPath = join(polishReceiptRoot, `${entry.filename}.json`);
    if (!existsSync(sourceDeckPath)) {
      missingDrafts.push(entry);
      continue;
    }

    const sourceSha256 = getSha256(sourceDeckPath);
    const polishedSha256 = existsSync(polishedDeckPath) ? getSha256(polishedDeckPath) : null;
    if (!existsSync(receiptPath)) {
      needsPolish.push({
        ...entry,
        sourceDeckPath,
        polishedDeckPath,
        sourceSha256,
        polishedSha256,
        reason: polishedSha256
          ? "No polish receipt exists for the private derivative."
          : "No polished private derivative exists."
      });
      continue;
    }

    try {
      const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
      if (
        receipt.version === 1 &&
        receipt.status === "pass" &&
        receipt.filename === entry.filename &&
        receipt.sourceSha256 === sourceSha256 &&
        polishedSha256 &&
        receipt.polishedSha256 === polishedSha256
      ) {
        alreadyPolished.push({
          ...entry,
          sourceDeckPath,
          polishedDeckPath,
          sourceSha256,
          polishedSha256,
          receiptPath
        });
      } else {
        needsPolish.push({
          ...entry,
          sourceDeckPath,
          polishedDeckPath,
          sourceSha256,
          polishedSha256,
          reason: receipt.version !== 1 || receipt.filename !== entry.filename
            ? "The polish receipt does not match this deck."
            : receipt.status !== "pass"
              ? "The latest polish pass did not pass."
              : receipt.sourceSha256 !== sourceSha256
                ? "The source deck changed after its latest polish pass."
                : "The polished derivative changed after its latest polish pass."
        });
      }
    } catch {
      needsPolish.push({
        ...entry,
        sourceDeckPath,
        polishedDeckPath,
        sourceSha256,
        polishedSha256,
        reason: "The polish receipt is unreadable."
      });
    }
  }

  process.stdout.write(`${JSON.stringify({
    checkedAt: now.toISOString(),
    newYorkDate: date,
    draftSlideRoot,
    polishReceiptRoot,
    polishedRoot,
    needsPolish,
    alreadyPolished,
    missingDrafts
  }, null, 2)}\n`);
} else if (action === "record-polish") {
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
    throw new Error("--report must point to the completed polish report.");
  }

  const sourceDeckPath = join(draftSlideRoot, filename);
  const polishedDeckPath = join(polishedRoot, filename);
  if (!existsSync(sourceDeckPath)) {
    throw new Error(`The source deck does not exist: ${sourceDeckPath}`);
  }
  if (status === "pass" && !existsSync(polishedDeckPath)) {
    throw new Error(`The polished private derivative does not exist: ${polishedDeckPath}`);
  }

  const report = readFileSync(reportPath, "utf8");
  if (report.length > 100_000) {
    throw new Error("The polish report is unexpectedly large.");
  }

  const receipt = {
    version: 1,
    filename,
    sourceSha256: getSha256(sourceDeckPath),
    polishedSha256: existsSync(polishedDeckPath) ? getSha256(polishedDeckPath) : null,
    status,
    polishedAt: now.toISOString(),
    report
  };
  mkdirSync(polishReceiptRoot, { recursive: true });
  const receiptPath = join(polishReceiptRoot, `${filename}.json`);
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
  process.stdout.write(`${JSON.stringify({ receiptPath, ...receipt, report: undefined }, null, 2)}\n`);
} else if (action === "check") {
  const date = getNewYorkDate(now);
  const dueForValidation = schedule.filter((entry) => entry.validationDate <= date && entry.lectureDate >= date);
  const needsValidation = [];
  const alreadyValidated = [];
  const missingDrafts = [];

  for (const entry of dueForValidation) {
    const sourceDeckPath = join(draftSlideRoot, entry.filename);
    const deckPath = join(polishedRoot, entry.filename);
    const publicFilename = getPublishedFilename(entry.filename);
    const stagedPdfPath = join(publicationRoot, publicFilename);
    if (!existsSync(sourceDeckPath)) {
      missingDrafts.push(entry);
      continue;
    }

    const sourceSha256 = getSha256(sourceDeckPath);
    const polishReceiptPath = join(polishReceiptRoot, `${entry.filename}.json`);
    if (!existsSync(deckPath) || !existsSync(polishReceiptPath)) {
      needsValidation.push({
        ...entry,
        publicFilename,
        sourceDeckPath,
        deckPath,
        stagedPdfPath,
        sourceSha256,
        polishedSha256: existsSync(deckPath) ? getSha256(deckPath) : null,
        stagedPdfSha256: null,
        reason: "A current passing polish receipt and private polished derivative are required."
      });
      continue;
    }

    let polishReceipt;
    try {
      polishReceipt = JSON.parse(readFileSync(polishReceiptPath, "utf8"));
    } catch {
      needsValidation.push({
        ...entry,
        publicFilename,
        sourceDeckPath,
        deckPath,
        stagedPdfPath,
        sourceSha256,
        polishedSha256: getSha256(deckPath),
        stagedPdfSha256: null,
        reason: "The polish receipt is unreadable."
      });
      continue;
    }

    const polishedSha256 = getSha256(deckPath);
    if (
      polishReceipt.version !== 1 ||
      polishReceipt.status !== "pass" ||
      polishReceipt.filename !== entry.filename ||
      polishReceipt.sourceSha256 !== sourceSha256 ||
      polishReceipt.polishedSha256 !== polishedSha256
    ) {
      needsValidation.push({
        ...entry,
        publicFilename,
        sourceDeckPath,
        deckPath,
        stagedPdfPath,
        sourceSha256,
        polishedSha256,
        stagedPdfSha256: null,
        reason: "The polished derivative is missing, failed, or outdated relative to the source deck."
      });
      continue;
    }

    const stagedPdfSha256 = existsSync(stagedPdfPath) && isPdf(stagedPdfPath)
      ? getSha256(stagedPdfPath)
      : null;
    const receiptPath = join(validationRoot, `${entry.filename}.json`);
    if (!existsSync(receiptPath)) {
      needsValidation.push({
        ...entry,
        publicFilename,
        sourceDeckPath,
        deckPath,
        stagedPdfPath,
        sourceSha256,
        polishedSha256,
        stagedPdfSha256,
        reason: stagedPdfSha256
          ? "No validation receipt exists."
          : "The staged build PDF is missing or invalid."
      });
      continue;
    }

    try {
      const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
      if (
        receipt.version === 3 &&
        receipt.status === "pass" &&
        receipt.sourceSha256 === sourceSha256 &&
        receipt.polishedSha256 === polishedSha256 &&
        stagedPdfSha256 &&
        receipt.stagedPdfSha256 === stagedPdfSha256 &&
        hasBuildCoverage(receipt)
      ) {
        alreadyValidated.push({
          ...entry,
          publicFilename,
          deckPath,
          sourceDeckPath,
          stagedPdfPath,
          sourceSha256,
          polishedSha256,
          stagedPdfSha256,
          receiptPath
        });
      } else {
        needsValidation.push({
          ...entry,
          publicFilename,
          sourceDeckPath,
          deckPath,
          stagedPdfPath,
          sourceSha256,
          polishedSha256,
          stagedPdfSha256,
          reason: !stagedPdfSha256
            ? "The staged build PDF is missing or invalid."
            : receipt.version !== 3
              ? "The validation receipt predates polished-deck validation."
              : receipt.status !== "pass"
                ? "The latest validation did not pass."
                : receipt.sourceSha256 !== sourceSha256
                  ? "The source deck changed after its latest validation."
                  : receipt.polishedSha256 !== polishedSha256
                    ? "The polished derivative changed after its latest validation."
                    : receipt.stagedPdfSha256 !== stagedPdfSha256
                      ? "The staged build PDF changed after its latest validation."
                      : "The validation receipt does not prove complete PowerPoint build coverage."
        });
      }
    } catch {
      needsValidation.push({
        ...entry,
        publicFilename,
        sourceDeckPath,
        deckPath,
        stagedPdfPath,
        sourceSha256,
        polishedSha256,
        stagedPdfSha256,
        reason: "The validation receipt is unreadable."
      });
    }
  }

  process.stdout.write(`${JSON.stringify({
    checkedAt: now.toISOString(),
    newYorkDate: date,
    draftSlideRoot,
    validationRoot,
    polishReceiptRoot,
    polishedRoot,
    publicationRoot,
    needsValidation,
    alreadyValidated,
    missingDrafts
  }, null, 2)}\n`);
} else if (action === "record") {
  const filename = String(argumentsByName.get("--filename") || "");
  const status = String(argumentsByName.get("--status") || "");
  const getPositiveIntegerArgument = (name) => {
    const value = Number(argumentsByName.get(name));
    return Number.isInteger(value) && value > 0 ? value : null;
  };
  const sourceSlideCount = getPositiveIntegerArgument("--source-slides");
  const stagedPdfPageCount = getPositiveIntegerArgument("--build-pages");
  const expectedBuildPageCount = getPositiveIntegerArgument("--expected-build-pages");
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

  const sourceDeckPath = join(draftSlideRoot, filename);
  const deckPath = join(polishedRoot, filename);
  const polishReceiptPath = join(polishReceiptRoot, `${filename}.json`);
  if (!existsSync(sourceDeckPath)) {
    throw new Error(`The source deck does not exist: ${sourceDeckPath}`);
  }
  if (!existsSync(deckPath) || !existsSync(polishReceiptPath)) {
    throw new Error("A polished private derivative and its polish receipt are required before validation.");
  }
  const polishReceipt = JSON.parse(readFileSync(polishReceiptPath, "utf8"));
  const sourceSha256 = getSha256(sourceDeckPath);
  const polishedSha256 = getSha256(deckPath);
  if (
    polishReceipt.version !== 1 ||
    polishReceipt.status !== "pass" ||
    polishReceipt.filename !== filename ||
    polishReceipt.sourceSha256 !== sourceSha256 ||
    polishReceipt.polishedSha256 !== polishedSha256
  ) {
    throw new Error("The polished derivative is missing, failed, or outdated relative to the source deck.");
  }
  const publicFilename = getPublishedFilename(filename);
  const stagedPdfPath = join(publicationRoot, publicFilename);
  const stagedPdfIsValid = existsSync(stagedPdfPath) && isPdf(stagedPdfPath);
  if (status === "pass" && !stagedPdfIsValid) {
    throw new Error(`The staged build PDF does not exist or is invalid: ${stagedPdfPath}`);
  }
  if (status === "pass" && (!sourceSlideCount || !stagedPdfPageCount || !expectedBuildPageCount)) {
    throw new Error("Passing validation requires positive --source-slides, --build-pages, and --expected-build-pages counts.");
  }
  if (status === "pass" && stagedPdfPageCount !== expectedBuildPageCount) {
    throw new Error("The staged PDF page count does not match PowerPoint's total PrintSteps count.");
  }
  if (status === "pass" && stagedPdfPageCount < sourceSlideCount) {
    throw new Error("The staged PDF has fewer pages than the source deck has slides.");
  }

  const report = readFileSync(reportPath, "utf8");
  if (report.length > 100_000) {
    throw new Error("The validation report is unexpectedly large.");
  }

  const receipt = {
    version: 3,
    filename,
    publicFilename,
    sourceSha256,
    polishedSha256,
    stagedPdfSha256: stagedPdfIsValid ? getSha256(stagedPdfPath) : null,
    sourceSlideCount,
    stagedPdfPageCount,
    expectedBuildPageCount,
    status,
    validatedAt: now.toISOString(),
    report
  };
  mkdirSync(validationRoot, { recursive: true });
  const receiptPath = join(validationRoot, `${filename}.json`);
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
  process.stdout.write(`${JSON.stringify({ receiptPath, ...receipt, report: undefined }, null, 2)}\n`);
} else {
  throw new Error("--action must be check-polish, record-polish, check, or record.");
}
