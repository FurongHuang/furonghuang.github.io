import { blogPosts, profile } from "./site";

type BlogPost = (typeof blogPosts)[number];
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const latexCharacters: Record<string, string> = {
  "\\": "\\textbackslash{}", "{": "\\{", "}": "\\}", "$": "\\$", "&": "\\&",
  "#": "\\#", "%": "\\%", "_": "\\_", "^": "\\textasciicircum{}", "~": "\\textasciitilde{}",
  "’": "'", "‘": "`", "“": "``", "”": "''", "–": "--", "—": "---"
};
const escapeLatex = (text: string) => text.replace(/[\\{}$&#%_^~’‘“”–—]/g, (character) => latexCharacters[character]);

export function getBlogCitation(post: BlogPost, site: URL | string = "https://furong-huang.com/") {
  const [year, month] = post.published.split("-");
  const url = new URL(`/blog/${post.slug}/`, site).href;
  const download = `/blog/${post.slug}.bib`;
  // @misc works with traditional BibTeX; protect the complete title's capitalization.
  const bibtex = `@misc{${post.citationKey},
  author = {${escapeLatex(profile.name)}},
  title = {{${escapeLatex(post.title)}}},
  year = {${year}},
  month = ${months[Number(month) - 1]},
  date = {${post.published}},
  howpublished = {Blog post},
  url = {${url}}
}
`;
  return { title: post.title, author: profile.name, date: post.date, url, download, bibtex };
}

export type BlogCitation = ReturnType<typeof getBlogCitation>;
