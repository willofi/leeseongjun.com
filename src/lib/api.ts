import { Post } from '@/interfaces/post';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const postsDirectory = join(process.cwd(), 'posts');
const previewTextLength = 180;

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/[#*_~>-]/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizePost(post: Post): Post {
  return {
    ...post,
    pinned: Boolean(post.pinned),
    tags: Array.isArray(post.tags) ? post.tags : [],
    previewText: stripMarkdown(post.content).slice(0, previewTextLength),
  };
}

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return normalizePost({ ...data, slug: realSlug, content } as Post);
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
