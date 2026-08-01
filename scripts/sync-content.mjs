import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const defaultCvRoot = resolve(repositoryRoot, "../..");
const cvRoot = resolve(process.env.CV_DATA_ROOT || defaultCvRoot);

const copies = [
  [
    resolve(cvRoot, "data/publications/publications.json"),
    resolve(repositoryRoot, "src/data/publications.json")
  ],
  [
    resolve(cvRoot, "output/Furong_Huang_CV_Full.pdf"),
    resolve(repositoryRoot, "public/Furong_Huang_CV.pdf")
  ],
  [
    resolve(cvRoot, "data/charts/all-publications.png"),
    resolve(repositoryRoot, "public/assets/publication-history.png")
  ]
];

for (const [source, destination] of copies) {
  if (!existsSync(source)) {
    throw new Error(`Required CV artifact not found: ${source}`);
  }
  copyFileSync(source, destination);
  console.log(`Synced ${source} -> ${destination}`);
}
