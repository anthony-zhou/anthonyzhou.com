import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { matter } from './matter.js';

export const POSTS_DIR = 'posts';
export const PAGES_DIR = 'pages';
export const PUBLIC_DIR = 'public';
export const OUT_DIR = 'dist';

// --- content -------------------------------------------------------------

export function loadPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ''),
        data,
        html: marked.parse(content),
      };
    })
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
}

export function loadPages() {
  return fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(PAGES_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ''), data, content };
    });
}

function formatDate(value) {
  const d = new Date(value);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// --- templates -----------------------------------------------------------

function page({ title, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { font-size: 16px; max-width: 700px; margin: 50px auto; padding: 0 20px; line-height: 1.6; }
    img, video, object { max-width: 100%; height: auto; }
    a { color: inherit; }
    .meta { color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

function isProject(post) {
  const c = post.data.categories;
  return Array.isArray(c) ? c.includes('projects') : c === 'projects';
}

function list(posts) {
  const items = posts
    .map((p) => `  <li><a href="/${p.slug}/">${p.data.title ?? p.slug}</a></li>`)
    .join('\n');
  return `<ul>\n${items}\n</ul>`;
}

// A standalone page from pages/*.md. Supports two tokens:
//   {{posts}}    -> writing (everything not categorized as a project)
//   {{projects}} -> projects
function contentPage(pg, posts) {
  const md = pg.content
    .replaceAll('{{posts}}', list(posts.filter((p) => !isProject(p))))
    .replaceAll('{{projects}}', list(posts.filter(isProject)));
  return page({
    title: pg.data.title ?? pg.slug,
    body: marked.parse(md),
  });
}

function postPage(post) {
  const date = formatDate(post.data.date);
  return page({
    title: post.data.title ?? post.slug,
    body: `  <p><a href="/">← Home</a></p>
  <article>
    <h1>${post.data.title ?? post.slug}</h1>
    ${date ? `<p class="meta">${date}</p>` : ''}
    ${post.html}
  </article>`,
  });
}

// --- build ---------------------------------------------------------------

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true });
}

export function build() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const posts = loadPosts();

  // Standalone pages: index.md -> /, books.md -> /books/, etc.
  for (const pg of loadPages()) {
    const html = contentPage(pg, posts);
    if (pg.slug === 'index') {
      fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html);
    } else {
      writePage(pg.slug, html);
    }
  }

  for (const post of posts) {
    writePage(post.slug, postPage(post));
  }

  copyDir(PUBLIC_DIR, OUT_DIR);

  return posts.length;
}

function writePage(slug, html) {
  const dir = path.join(OUT_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
