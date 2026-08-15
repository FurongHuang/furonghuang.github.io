# Furong Lab — Academic Website

Source for [furonghuang.github.io](https://furonghuang.github.io), a visual,
data-driven academic website built with Astro and deployed by GitHub Pages.

## Local development

```bash
npm install
npm run sync
npm run dev
```

The development server prints its local preview address, normally
`http://localhost:4321`.

## Updating CV and publication data

The canonical CV repository remains the source of truth. From this repository,
run:

```bash
npm run sync
```

That command copies the latest artifacts into the website:

- `data/publications/publications.json` → `src/data/publications.json`
- `output/Furong_Huang_CV_Full.pdf` → `public/Furong_Huang_CV.pdf`

From the parent CV workspace, `make website-sync` also checks the newest arXiv
works and selects an overview, teaser, or early figure from the paper when no
curated visual exists. If no usable figure is available, it creates a designed
title card; paper title pages are never used as thumbnails.
Run `npm run sync:thumbnails` to perform the thumbnail step directly. Editorial
thumbnail choices in `src/data/research.yaml` always override generated ones.
The required selection criteria, review checklist, and override procedure are
documented in [`THUMBNAIL_WORKFLOW.md`](THUMBNAIL_WORKFLOW.md). That workflow is
a release requirement: extraction, margin normalization, contact-sheet review,
responsive browser QA, and validation must all pass before thumbnail changes
are pushed.

The publication-history chart is rendered directly from the synchronized JSON
during each Astro build; there is no separate image to update.

If the CV and website repositories are not adjacent in the expected layout,
set `CV_DATA_ROOT` to the CV repository path before running the command.

## Updating website content

The non-publication content is deliberately centralized:

- `src/data/site.ts` — research pillars, featured projects, social profiles,
  news, and blog index metadata
- `src/data/people.ts` — current group members, alumni, portraits, placements,
  and profile links
- `src/data/research.yaml` — publication-to-pillar classification and curated
  publication thumbnails
- `src/data/publication-thumbnails.generated.json` — automatically maintained
  paper-figure selections and title-card fallbacks
- `src/pages/blog/` — long-form blog posts
- `public/assets/people/` and `public/assets/projects/` — local portraits and
  project visuals

### Fall 2026 · CMSC 848N

The course hub lives at `src/pages/cmsc848n-fall-2026.astro`. Its weekly
schedule is a single data list at the top of that file. Keep decks private until
two days before their lecture. At release time, copy only the approved deck to
`public/courses/cmsc848n/fall-2026/slides/` and add its exact filename to the
`releasedSlides` set in the course page. Project signups use
`.github/ISSUE_TEMPLATE/project-signup.yml`.

The homepage uses `public/assets/bodyshot.webp`; the People page uses
`public/assets/headshot.jpg`.

The public HTML intentionally contains no plain-text email address and no
ORCID link. Email is assembled in the browser only after a small human check.

## Validation

```bash
npm run check
npm run build
```

## Deployment

Merging to `main` triggers `.github/workflows/deploy.yml`. GitHub Actions builds
the static Astro site and publishes it to GitHub Pages. The custom domain will
be connected only after the replacement site has been reviewed.

## Current site scope

- Branded responsive homepage
- Interactive three-pillar research map and dedicated Embodied AI project page
- Official project visuals and selected visual publication cards
- Searchable complete publication database with type, year, and pillar filters
- Current group and alumni pages with portraits and profile links
- News archive and migrated blog posts
- Social links and human-gated email reveal
- Stable, synchronized full-CV download
- Automated GitHub Pages deployment
