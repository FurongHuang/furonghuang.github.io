import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const inlineTags = "a|em|strong|abbr|code";
const checks = [
  {
    label: "missing space before inline element",
    pattern: new RegExp(`[\\p{L}\\p{N})]<(?:${inlineTags})\\b`, "gu")
  },
  {
    label: "missing space after inline element",
    pattern: new RegExp(`</(?:${inlineTags})>[\\p{L}\\p{N}(]`, "gu")
  }
];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  }));
  return nested.flat();
}

const failures = [];
for (const file of await htmlFiles(root)) {
  const html = await readFile(file, "utf8");
  for (const check of checks) {
    for (const match of html.matchAll(check.pattern)) {
      const start = Math.max(0, match.index - 55);
      const end = Math.min(html.length, match.index + match[0].length + 55);
      failures.push({
        file: relative(root, file),
        label: check.label,
        excerpt: html.slice(start, end).replace(/\\s+/g, " ")
      });
    }
  }
}

if (failures.length) {
  console.error("Rendered spacing check failed:");
  for (const failure of failures) {
    console.error(`- ${failure.file}: ${failure.label}\n  ${failure.excerpt}`);
  }
  process.exitCode = 1;
} else {
  console.log("Rendered spacing check passed.");
}
