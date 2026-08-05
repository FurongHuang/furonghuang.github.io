# Publication Thumbnail Workflow

Publication thumbnails are an editorial layer of the website. They must help a
visitor understand the paper's idea; merely proving that a paper exists is not
enough.

## Non-negotiable rule

**Never use an arXiv title page, PDF first-page screenshot, abstract crop, or
generic browser preview as a publication thumbnail.**

For every new paper, perform the due diligence to inspect the paper or project
site and select a meaningful visual. The automated workflow may assist with
extraction, but its output must still be visually reviewed.

## Selection priority

Use the first available option in this order:

1. An official project-page teaser or graphical abstract that accurately
   represents the paper.
2. A strong figure extracted from the paper source, favoring:
   - the main teaser or overview;
   - the method, framework, or system diagram;
   - a clear qualitative result central to the contribution;
   - a distinctive, legible result plot when it communicates the main finding.
3. A designed title card only when neither the project site nor the paper
   contains a usable visual.

Prefer Figure 1 only when it is genuinely representative. Do not select a figure
solely because it appears first.

## Figures to avoid

- Tables, equations, algorithm listings, or dense prose
- Tiny multi-panel appendix figures
- Generic training-loss curves when a method diagram or qualitative result is
  available
- Figures that depend on an unreadable caption
- Images dominated by whitespace, legends, or microscopic labels
- Crops that remove heads, axes, labels, or essential visual context
- Publisher or arXiv page chrome, watermarks, and document headers

## Required review

Before committing thumbnail changes:

1. Run the thumbnail sync.
2. Review every new or changed thumbnail in a contact sheet.
3. Inspect the cards on the Publications page and the relevant Research page.
4. Check desktop and mobile layouts.
5. Confirm that images are sharp, uncropped, correctly matched to their papers,
   and free of broken links.
6. Replace any weak automatic choice with a curated override before pushing.

Thumbnail coverage is not the same as thumbnail quality. A workflow is not
complete merely because every card has an image.

## Commands and overrides

Generate thumbnails for recent publications:

```bash
npm run sync:thumbnails
```

Re-evaluate all generated arXiv thumbnails from paper sources:

```bash
python3 scripts/sync_publication_thumbnails.py --all --refresh-generated
```

Check coverage without downloading or changing files:

```bash
python3 scripts/sync_publication_thumbnails.py --check --all
```

Automatic mappings live in
`src/data/publication-thumbnails.generated.json`. Hand-curated choices belong in
`src/data/research.yaml` and always take precedence. Curated image assets belong
under `public/assets/projects/`.

The automatic extractor inspects arXiv source bundles and favors teaser,
overview, framework, pipeline, method, and early figure environments. If it
cannot obtain a usable visual, it produces a title card rather than a document
preview.
