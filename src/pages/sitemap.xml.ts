import type { APIRoute } from "astro";
import { researchAreas } from "../data/researchAreas";
import { blogPosts } from "../data/site";

export const prerender = true;

const staticRoutes = [
  "/",
  "/research/",
  "/research/embodied-ai/",
  "/benchmarks/",
  "/publications/",
  "/people/",
  "/news/",
  "/blog/",
  "/teaching/",
  "/cv/",
  "/join/"
];

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site || new URL("https://furong-huang.com");
  const routes = [
    ...staticRoutes,
    ...researchAreas.map((area) => `/research/${area.slug}/`),
    ...blogPosts.map((post) => `/blog/${post.slug}/`)
  ];
  const urls = Array.from(new Set(routes))
    .sort()
    .map((route) => `  <url><loc>${new URL(route, baseUrl).href}</loc></url>`)
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
