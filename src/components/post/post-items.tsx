import Comments from '@/components/post/comments';
import Container from '@/components/post/container';
import { PostHeader } from '@/components/post/post-header';
import { Post } from '@/interfaces/post';
import { siteConfig } from '@/lib/constants';
import Script from 'next/script';

export default function PostItems({
  post,
  content,
}: {
  post: Post;
  content: string;
}) {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    image: [`${siteConfig.url}${post.ogImage.url}`],
    mainEntityOfPage: `${siteConfig.url}/posts/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  return (
    <article className="pt-4 pb-20 md:pt-6">
      <Script
        id={`post-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Container>
        <article className="mx-auto mb-24 max-w-5xl">
          <PostHeader post={post} />
          <div className="mt-8">
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <Comments />
        </article>
      </Container>
    </article>
  );
}
