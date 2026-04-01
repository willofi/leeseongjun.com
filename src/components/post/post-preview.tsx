import { Post } from '@/interfaces/post';
import { PostCard } from './post-card';

type Props = {
  post: Post;
};

export function PostPreview({ post }: Props) {
  return (
    <PostCard
      post={post}
      pinnedLabel={post.pinned ? 'Pinned post' : undefined}
    />
  );
}
