import { marked } from 'marked';

// Renders markdown with footnote support, which marked lacks natively.
//
// Syntax:
//   a claim[^1] ... and another[^note]
//   [^1]: the first footnote
//   [^note]: the second footnote
//
// Footnotes are numbered by order of first reference (the id is just a label),
// matching Pandoc/GitHub behavior, and collected into a list at the end with
// links back to each reference. Definitions are single-line.
export function renderMarkdown(md) {
  // 1. Pull definition lines ([^id]: text) out of the body.
  const defs = new Map();
  const body = md.replace(/^\[\^([^\]]+)\]:[ \t]*(.*)$/gm, (_, id, text) => {
    defs.set(id.trim(), text.trim());
    return '';
  });

  // 2. Replace each reference with a numbered superscript link, numbering by
  //    order of appearance. Unknown ids are left untouched.
  const order = [];
  const num = new Map();
  const withRefs = body.replace(/\[\^([^\]]+)\]/g, (match, rawId) => {
    const id = rawId.trim();
    if (!defs.has(id)) return match;
    if (!num.has(id)) {
      order.push(id);
      num.set(id, order.length);
    }
    return `<sup class="footnote-ref" id="fnref-${id}"><a href="#fn-${id}">${num.get(id)}</a></sup>`;
  });

  let html = marked.parse(withRefs);

  // 3. Append the footnotes list (only those actually referenced).
  if (order.length) {
    const items = order
      .map((id) => {
        const inner = marked.parseInline(defs.get(id));
        return `  <li id="fn-${id}">${inner} <a href="#fnref-${id}" class="footnote-backref" aria-label="Back to reference">↩</a></li>`;
      })
      .join('\n');
    html += `<hr class="footnotes-sep" />\n<ol class="footnotes">\n${items}\n</ol>\n`;
  }

  return html;
}
