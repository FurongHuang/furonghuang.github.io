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

Before committing thumbnail changes, complete every step below. Do not omit the
visual steps because a script exits successfully.

1. Synchronize publication data and identify every new or changed paper.
2. Inspect the official project page and paper before choosing a visual.
3. Extract the best representative figure from the paper source when an
   official teaser is unavailable.
4. Preserve the selected figure's natural aspect ratio. Never place it inside a
   second fixed-size white canvas; the responsive card owns letterboxing.
5. Run conservative uniform-margin normalization across all assigned assets.
6. Run the coverage check and confirm every mapped asset exists and opens.
7. Generate a contact sheet containing every new or changed thumbnail and
   inspect it at readable size.
8. Inspect representative cards on the Publications page and the relevant
   Research page.
9. Check wide desktop, medium desktop/tablet, and phone layouts. The minimum
   responsive QA widths are 1440 px, approximately 873 px, and 390 px.
10. Confirm that images are sharp, correctly matched, visually prominent, and
    free of broken links, excessive whitespace, clipped labels, cropped axes,
    or horizontal overflow.
11. Replace any weak automatic choice with a curated override.
12. Build the complete site, rerun validation, and only then commit or push.

Thumbnail coverage is not the same as thumbnail quality. A workflow is not
complete merely because every card has an image.

## Margin and sizing rules

- Trim uniform source margins before saving the website asset, then retain only
  a small breathing border.
- Estimate the background from all four corners. Crop automatically only when
  those corners agree; this prevents accidental cropping of photographs and
  full-bleed illustrations.
- Keep generated figures at their natural aspect ratio. Do not embed a wide
  diagram into a 16:10 bitmap, because the page will letterbox that bitmap a
  second time and make the figure too small.
- Use `object-fit: contain` for diagrams and plots. Increase the card's visual
  area instead of switching to destructive `cover` cropping.
- Treat a large blank border or a figure occupying only a small fraction of its
  canvas as a failed thumbnail, even if the source file is technically valid.
- Margin normalization must be idempotent: running it a second time should
  report zero additional changes.

## Publication card layout rules

- On wide screens, use a two-column visual-card grid so figures are large enough
  to read.
- On medium screens, use one roomy side-by-side card rather than a narrow image
  strip.
- On phones, stack a full-width figure above the citation.
- After any thumbnail or card-style change, verify the exact rendered image
  dimensions and confirm that the document has no horizontal overflow.
- Search for at least one wide diagram, one tall figure, one plot, one
  qualitative image, and one designed title card during browser QA. A single
  attractive example is not sufficient evidence for the whole collection.

## Commands and overrides

Generate thumbnails for recent publications:

```bash
npm run sync:thumbnails
```

Re-evaluate all generated arXiv thumbnails from paper sources:

```bash
python3 scripts/sync_publication_thumbnails.py --all --refresh-generated
```

Conservatively remove oversized uniform margins from assigned thumbnails:

```bash
python3 scripts/sync_publication_thumbnails.py --normalize-existing --all
```

This normalization runs only when the four corners agree on a background color.
It preserves a small border and skips photographs or full-bleed imagery.
Immediately run the same command a second time; it must report
`Normalized 0 assigned thumbnail(s).`

Check coverage without downloading or changing files:

```bash
python3 scripts/sync_publication_thumbnails.py --check --all
```

Build the site after thumbnail and layout QA:

```bash
npm run build
```

Before committing, also run:

```bash
git diff --check
```

Automatic mappings live in
`src/data/publication-thumbnails.generated.json`. Hand-curated choices belong in
`src/data/research.yaml` and always take precedence. Curated image assets belong
under `public/assets/projects/`.

The automatic extractor inspects arXiv source bundles and favors teaser,
overview, framework, pipeline, method, and early figure environments. If it
cannot obtain a usable visual, it produces a title card rather than a document
preview.

## Release gate

Do not describe the thumbnail work as complete and do not push unless all of
the following are true:

- The paper/project visual was inspected, not inferred from its title.
- No arXiv or PDF title-page previews remain among changed thumbnails.
- Uniform margins were normalized and the second normalization run changed
  zero files.
- A contact-sheet audit covered every changed asset.
- Publications and relevant Research pages were checked at wide, medium, and
  phone widths.
- No broken images, destructive crops, excessive whitespace, or page overflow
  remain.
- Coverage check, full build, and `git diff --check` pass.
