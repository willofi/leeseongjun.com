import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/interfaces/post';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CoverImage from './cover-image';
import DateFormatter from './date-formatter';
import PostCardTags from './post-card-tags';

type Props = {
  post: Post;
  pinnedLabel?: string;
  className?: string;
};

export function PostCard({ post, pinnedLabel, className }: Props) {
  const isPinned = Boolean(post.pinned);

  return (
    <Link href={`/posts/${post.slug}`} className={className ?? 'block'}>
      <Card
        className={cn(
          'group gap-0 overflow-hidden py-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.05)]',
          isPinned
            ? 'border-stone-200 bg-stone-50/80'
            : 'bg-card border-stone-200/80',
        )}
      >
        <CardContent className="p-4">
          <article className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 md:grid-cols-[120px_minmax(0,1fr)] md:gap-5">
            <div className="self-center">
              <CoverImage
                title={post.title}
                src={post.coverImage}
                ratio="square"
              />
            </div>
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <DateFormatter dateString={post.date} />
                {pinnedLabel ? (
                  <Badge
                    variant="outline"
                    className="h-4.5 border-stone-200 bg-white/65 px-1.5 text-[10px] font-medium text-stone-600"
                  >
                    {pinnedLabel}
                  </Badge>
                ) : null}
              </div>
              <div className="space-y-1">
                <h3 className="line-clamp-1 text-[15px] leading-5.5 font-semibold tracking-tight text-stone-950 md:text-base">
                  {post.title}
                </h3>
                <p className="line-clamp-1 text-sm leading-5 text-stone-600">
                  {post.previewText}
                </p>
              </div>
              {post.tags && post.tags.length > 0 ? (
                <div className="relative">
                  <PostCardTags tags={post.tags} />
                </div>
              ) : null}
            </div>
          </article>
        </CardContent>
      </Card>
    </Link>
  );
}
