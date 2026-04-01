import { createHeadingSlugger } from '@/lib/post-table-of-contents';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';

type HastNode = {
  type?: string;
  tagName?: string;
  value?: string;
  children?: HastNode[];
  properties?: Record<string, unknown>;
};

function getNodeText(node: HastNode): string {
  if (typeof node.value === 'string') {
    return node.value;
  }

  if (!node.children || node.children.length === 0) {
    return '';
  }

  return node.children.map(getNodeText).join('');
}

function addHeadingIds(tree: HastNode) {
  const getHeadingId = createHeadingSlugger();

  const visit = (node: HastNode) => {
    if (!node) {
      return;
    }

    if (node.type === 'element' && /^h[1-6]$/.test(node.tagName ?? '')) {
      const text = getNodeText(node).trim();

      if (text) {
        node.properties = {
          ...node.properties,
          id: getHeadingId(text),
        };
      }
    }

    node.children?.forEach(visit);
  };

  visit(tree);
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(() => addHeadingIds)
    .use(rehypeHighlight, {
      detect: false,
      ignoreMissing: true,
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
