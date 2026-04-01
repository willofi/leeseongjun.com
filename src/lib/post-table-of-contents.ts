export type TableOfContentsItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

function stripInlineMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function createHeadingSlugger() {
  const seen = new Map<string, number>();

  return (value: string) => {
    const normalizedValue = stripInlineMarkdown(value);
    const baseSlug = slugify(normalizedValue) || 'section';
    const count = seen.get(baseSlug) ?? 0;

    seen.set(baseSlug, count + 1);

    return count === 0 ? baseSlug : `${baseSlug}-${count}`;
  };
}

export function extractTableOfContents(markdown: string) {
  const lines = markdown.split('\n');
  const items: TableOfContentsItem[] = [];
  const getHeadingId = createHeadingSlugger();
  let fenceMarker: '```' | '~~~' | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('```') || trimmedLine.startsWith('~~~')) {
      const marker = trimmedLine.startsWith('```') ? '```' : '~~~';
      fenceMarker = fenceMarker === marker ? null : marker;
      continue;
    }

    if (fenceMarker) {
      continue;
    }

    const match = line.match(/^(#{1,3})\s+(.+?)\s*#*\s*$/);

    if (!match) {
      continue;
    }

    const level = match[1].length as 1 | 2 | 3;
    const text = stripInlineMarkdown(match[2]);

    if (!text) {
      continue;
    }

    items.push({
      id: getHeadingId(text),
      text,
      level,
    });
  }

  return items;
}
