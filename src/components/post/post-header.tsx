import { PostTitle } from '@/components/post/post-title';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Post } from '@/interfaces/post';
import CoverImage from './cover-image';
import DateFormatter from './date-formatter';

type Props = {
  post: Post;
};

export function PostHeader({ post }: Props) {
  return (
    <section className="mx-auto mt-6 max-w-5xl">
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Article</Badge>
          {post.pinned ? <Badge variant="outline">Pinned</Badge> : null}
        </div>
        <PostTitle>{post.title}</PostTitle>
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          <DateFormatter dateString={post.date} />
        </div>
        {post.tags && post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-stone-500 dark:text-stone-400">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="transition-colors hover:text-stone-950 dark:hover:text-stone-50"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <Card className="overflow-hidden border-0 p-3 shadow-none ring-0 md:p-4">
        <div className="mx-auto max-w-3xl sm:mx-auto">
          <CoverImage
            title={post.title}
            src={post.coverImage}
            ratio="landscape"
          />
        </div>
      </Card>
    </section>
  );
}
