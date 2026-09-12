import type { APIRoute } from "astro";
import { blogPosts } from "../../data/site";
import { getBlogCitation } from "../../data/blog-citations";

export const GET: APIRoute = ({ site }) => new Response(
  blogPosts.map((post) => getBlogCitation(post, site).bibtex).join("\n"),
  { headers: { "Content-Type": "application/x-bibtex; charset=utf-8" } }
);
