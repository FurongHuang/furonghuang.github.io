import type { APIRoute, GetStaticPaths } from "astro";
import { blogPosts } from "../../data/site";
import { getBlogCitation } from "../../data/blog-citations";

export const getStaticPaths = (() => blogPosts.map((post) => ({
  params: { slug: post.slug },
  props: { post }
}))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => new Response(getBlogCitation(props.post, site).bibtex, {
  headers: { "Content-Type": "application/x-bibtex; charset=utf-8" }
});
