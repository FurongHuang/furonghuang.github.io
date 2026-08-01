# Furong Huang — Academic Website

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
- `data/charts/all-publications.png` → `public/assets/publication-history.png`

If the CV and website repositories are not adjacent in the expected layout,
set `CV_DATA_ROOT` to the CV repository path before running the command.

## Validation

```bash
npm run check
npm run build
```

## Deployment

Merging to `main` triggers `.github/workflows/deploy.yml`. GitHub Actions builds
the static Astro site and publishes it to GitHub Pages. The custom domain will
be connected only after the replacement site has been reviewed.

## Initial migration scope

- Branded responsive homepage
- Three-pillar research visualization
- Selected visual publication cards
- Searchable and filterable complete publication database
- People and teaching pages seeded from the latest CV
- Stable, synchronized full-CV download
- Automated GitHub Pages deployment
