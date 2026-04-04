import Container from '@/components/post/container';
import { PostCard } from '@/components/post/post-card';
import { PostsFeed } from '@/components/post/posts-feed';
import { getAllPosts } from '@/lib/api';

export default function Home() {
  const allPosts = getAllPosts();
  const pinnedPosts = allPosts.filter((post) => post.pinned);
  const visiblePinnedPosts =
    pinnedPosts.length > 0 ? pinnedPosts : allPosts.slice(0, 1);
  const feedPosts = allPosts.filter(
    (post) =>
      !visiblePinnedPosts.some((pinnedPost) => pinnedPost.slug === post.slug),
  );

  return (
    <section className="mx-auto pt-8 pb-16 md:pt-12 md:pb-24">
      <Container>
        {visiblePinnedPosts.length > 0 ? (
          <section className="mb-5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {visiblePinnedPosts.map((post) => (
              <PostCard key={post.slug} post={post} pinnedLabel="Pinned post" />
            ))}
          </section>
        ) : null}
        {feedPosts.length > 0 ? <PostsFeed posts={feedPosts} /> : null}
      </Container>
    </section>
  );
}
