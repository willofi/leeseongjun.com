'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/interfaces/post';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PostPreview } from './post-preview';

const allTag = 'all';

type Props = {
  posts: Post[];
};

export function PostsFeed({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>(allTag);

  const tags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  const filteredPosts =
    selectedTag === allTag
      ? posts
      : posts.filter((post) => post.tags?.includes(selectedTag));

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <Badge variant="outline">Posts</Badge>
        <div className="flex flex-wrap gap-x-3 gap-y-2 pl-2 text-sm text-stone-500 dark:text-stone-400">
          <button
            type="button"
            onClick={() => setSelectedTag(allTag)}
            className={cn(
              'transition-colors hover:text-stone-950 dark:hover:text-stone-50',
              selectedTag === allTag &&
                'font-semibold text-stone-950 dark:text-stone-50',
            )}
          >
            #{allTag}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={cn(
                'transition-colors hover:text-stone-950 dark:hover:text-stone-50',
                selectedTag === tag &&
                  'font-semibold text-stone-950 dark:text-stone-50',
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="mb-24 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostPreview key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <Card className="border-stone-200 py-0 dark:border-stone-800">
          <CardContent className="px-5 py-10 text-sm text-stone-500 dark:text-stone-400">
            선택한 태그에 해당하는 게시글이 아직 없습니다.
          </CardContent>
        </Card>
      )}
    </section>
  );
}
