import { parse } from "yaml";
import researchYaml from "./research.yaml?raw";

export type PillarId = "world-models" | "reasoning-control" | "self-improvement";
export type ProjectTheme = "teal" | "coral" | "violet";
export type ImageFit = "cover" | "contain";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ResearchProject {
  id: string;
  area: string;
  title: string;
  summary: string;
  year: number;
  image?: string;
  video?: string;
  imageFit?: ImageFit;
  imagePosition?: string;
  visualLabel?: string;
  theme?: ProjectTheme;
  relatedTitle?: string;
  links: readonly ProjectLink[];
}

export interface FeaturedProject extends ResearchProject {
  pillar: PillarId;
}

export interface ResearchArea {
  slug: string;
  pillar: PillarId;
  title: string;
  kicker: string;
  question: string;
  intro: string;
  methods: readonly string[];
  projects: readonly ResearchProject[];
}

export interface ResearchPillar {
  id: PillarId;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  href: string;
  topics: readonly ProjectLink[];
  featuredArea: {
    title: string;
    description: string;
    href: string;
    image: string;
    imageAlt: string;
    imageFit?: ImageFit;
    imagePosition?: string;
    featuredProjectId: string;
  };
}

export interface PublicationSocialLink {
  label: string;
  url: string;
}

const pillarIds = new Set<PillarId>(["world-models", "reasoning-control", "self-improvement"]);
const themes = new Set<ProjectTheme>(["teal", "coral", "violet"]);
const imageFits = new Set<ImageFit>(["cover", "contain"]);

function objectAt(value: unknown, context: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`research.yaml: ${context} must be an object`);
  }
  return value as Record<string, unknown>;
}

function listAt(value: unknown, context: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`research.yaml: ${context} must be a list`);
  return value;
}

function stringAt(record: Record<string, unknown>, field: string, context: string): string {
  if (typeof record[field] !== "string" || !record[field]) {
    throw new Error(`research.yaml: ${context}.${field} must be a non-empty string`);
  }
  return record[field];
}

function optionalStringAt(record: Record<string, unknown>, field: string, context: string): string | undefined {
  const value = record[field];
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw new Error(`research.yaml: ${context}.${field} must be a string`);
  return value;
}

function pillarAt(record: Record<string, unknown>, field: string, context: string): PillarId {
  const value = stringAt(record, field, context) as PillarId;
  if (!pillarIds.has(value)) throw new Error(`research.yaml: ${context}.${field} has unknown pillar ${value}`);
  return value;
}

function imageFitAt(record: Record<string, unknown>, field: string, context: string): ImageFit | undefined {
  const value = optionalStringAt(record, field, context) as ImageFit | undefined;
  if (value && !imageFits.has(value)) throw new Error(`research.yaml: ${context}.${field} must be cover or contain`);
  return value;
}

function linksAt(value: unknown, context: string): ProjectLink[] {
  return listAt(value, context).map((item, index) => {
    const link = objectAt(item, `${context}[${index}]`);
    return {
      label: stringAt(link, "label", `${context}[${index}]`),
      href: stringAt(link, "href", `${context}[${index}]`)
    };
  });
}

function projectAt(value: unknown, context: string, featured = false): ResearchProject | FeaturedProject {
  const project = objectAt(value, context);
  const year = project.year;
  if (typeof year !== "number" || !Number.isInteger(year)) {
    throw new Error(`research.yaml: ${context}.year must be an integer`);
  }
  const theme = optionalStringAt(project, "theme", context) as ProjectTheme | undefined;
  if (theme && !themes.has(theme)) throw new Error(`research.yaml: ${context}.theme has unknown value ${theme}`);

  const result: ResearchProject = {
    id: stringAt(project, "id", context),
    area: stringAt(project, "area", context),
    title: stringAt(project, "title", context),
    summary: stringAt(project, "summary", context),
    year,
    image: optionalStringAt(project, "image", context),
    video: optionalStringAt(project, "video", context),
    imageFit: imageFitAt(project, "imageFit", context),
    imagePosition: optionalStringAt(project, "imagePosition", context),
    visualLabel: optionalStringAt(project, "visualLabel", context),
    theme,
    relatedTitle: optionalStringAt(project, "relatedTitle", context),
    links: linksAt(project.links, `${context}.links`)
  };

  return featured ? { ...result, pillar: pillarAt(project, "pillar", context) } : result;
}

const raw = objectAt(parse(researchYaml), "root");

const meta = objectAt(raw.pillar_meta, "pillar_meta");
export const pillarMeta = Object.fromEntries(
  [...pillarIds].map((id) => {
    const record = objectAt(meta[id], `pillar_meta.${id}`);
    return [id, {
      label: stringAt(record, "label", `pillar_meta.${id}`),
      shortLabel: stringAt(record, "shortLabel", `pillar_meta.${id}`),
      color: stringAt(record, "color", `pillar_meta.${id}`)
    }];
  })
) as Record<PillarId, { label: string; shortLabel: string; color: string }>;

export const researchPillars = listAt(raw.pillars, "pillars").map((value, index): ResearchPillar => {
  const pillar = objectAt(value, `pillars[${index}]`);
  const featuredArea = objectAt(pillar.featuredArea, `pillars[${index}].featuredArea`);
  return {
    id: pillarAt(pillar, "id", `pillars[${index}]`),
    number: stringAt(pillar, "number", `pillars[${index}]`),
    title: stringAt(pillar, "title", `pillars[${index}]`),
    shortTitle: stringAt(pillar, "shortTitle", `pillars[${index}]`),
    subtitle: stringAt(pillar, "subtitle", `pillars[${index}]`),
    description: stringAt(pillar, "description", `pillars[${index}]`),
    href: stringAt(pillar, "href", `pillars[${index}]`),
    topics: linksAt(pillar.topics, `pillars[${index}].topics`),
    featuredArea: {
      title: stringAt(featuredArea, "title", `pillars[${index}].featuredArea`),
      description: stringAt(featuredArea, "description", `pillars[${index}].featuredArea`),
      href: stringAt(featuredArea, "href", `pillars[${index}].featuredArea`),
      image: stringAt(featuredArea, "image", `pillars[${index}].featuredArea`),
      imageAlt: stringAt(featuredArea, "imageAlt", `pillars[${index}].featuredArea`),
      imageFit: imageFitAt(featuredArea, "imageFit", `pillars[${index}].featuredArea`),
      imagePosition: optionalStringAt(featuredArea, "imagePosition", `pillars[${index}].featuredArea`),
      featuredProjectId: stringAt(featuredArea, "featuredProjectId", `pillars[${index}].featuredArea`)
    }
  };
});

export const projects = listAt(raw.featured_projects, "featured_projects")
  .map((value, index) => projectAt(value, `featured_projects[${index}]`, true) as FeaturedProject);

export const selectedPublicationTitles = listAt(raw.selected_publication_titles, "selected_publication_titles")
  .map((value, index) => {
    if (typeof value !== "string") throw new Error(`research.yaml: selected_publication_titles[${index}] must be a string`);
    return value;
  });

export const researchAreas = listAt(raw.areas, "areas").map((value, index): ResearchArea => {
  const area = objectAt(value, `areas[${index}]`);
  return {
    slug: stringAt(area, "slug", `areas[${index}]`),
    pillar: pillarAt(area, "pillar", `areas[${index}]`),
    title: stringAt(area, "title", `areas[${index}]`),
    kicker: stringAt(area, "kicker", `areas[${index}]`),
    question: stringAt(area, "question", `areas[${index}]`),
    intro: stringAt(area, "intro", `areas[${index}]`),
    methods: listAt(area.methods, `areas[${index}].methods`).map((method, methodIndex) => {
      if (typeof method !== "string") throw new Error(`research.yaml: areas[${index}].methods[${methodIndex}] must be a string`);
      return method;
    }),
    projects: listAt(area.projects, `areas[${index}].projects`)
      .map((project, projectIndex) => projectAt(project, `areas[${index}].projects[${projectIndex}]`))
  };
});

export const researchAreaBySlug = new Map(researchAreas.map((area) => [area.slug, area]));

const publicationOverrides = listAt(raw.publication_overrides, "publication_overrides");
export const publicationPillarByTitle: Record<string, PillarId> = {};
export const publicationThumbnailByTitle: Record<string, string> = {};
export const publicationSocialLinksByTitle: Record<string, PublicationSocialLink[]> = {};

publicationOverrides.forEach((value, index) => {
  const context = `publication_overrides[${index}]`;
  const override = objectAt(value, context);
  const title = stringAt(override, "title", context);
  if (override.pillar !== undefined) publicationPillarByTitle[title] = pillarAt(override, "pillar", context);
  if (override.thumbnail !== undefined) publicationThumbnailByTitle[title] = stringAt(override, "thumbnail", context);
  if (override.social_links !== undefined) {
    publicationSocialLinksByTitle[title] = listAt(override.social_links, `${context}.social_links`).map((item, linkIndex) => {
      const link = objectAt(item, `${context}.social_links[${linkIndex}]`);
      return {
        label: stringAt(link, "label", `${context}.social_links[${linkIndex}]`),
        url: stringAt(link, "url", `${context}.social_links[${linkIndex}]`)
      };
    });
  }
});
