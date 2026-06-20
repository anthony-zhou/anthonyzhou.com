// Minimal YAML frontmatter parser (ported from the old src/matter.ts).
export function matter(input) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(input);
  if (!match) return { data: {}, content: input };

  const [, frontmatter, content] = match;
  return { data: parseYamlBlock(frontmatter), content: content.replace(/^\r?\n/, '') };
}

function parseYamlBlock(block) {
  const data = {};
  const lines = block.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {
      i++;
      continue;
    }

    const keyMatch = /^(\w[\w-]*):\s*(.*)$/.exec(line);
    if (!keyMatch) {
      i++;
      continue;
    }

    const [, key, rest] = keyMatch;

    // Block list:
    //   tags:
    //     - foo
    //     - bar
    if (rest === '') {
      const items = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s*/.test(lines[j])) {
        items.push(parseValue(lines[j].replace(/^\s*-\s*/, '')));
        j++;
      }
      if (items.length) {
        data[key] = items;
        i = j;
        continue;
      }
    }

    data[key] = parseValue(rest);
    i++;
  }

  return data;
}

function parseValue(raw) {
  const val = raw.trim();

  // Inline array: tags: [foo, bar]
  if (/^\[.*\]$/.test(val)) {
    return val.slice(1, -1).split(',').map((s) => parseValue(s.trim())).filter((s) => s !== '');
  }

  // Quoted string
  if (/^".*"$/.test(val) || /^'.*'$/.test(val)) return val.slice(1, -1);

  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === '') return null;
  if (!isNaN(Number(val)) && val !== '') return Number(val);

  return val;
}
