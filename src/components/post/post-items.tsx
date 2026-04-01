import Comments from '@/components/post/comments';
import Container from '@/components/post/container';
import { PostHeader } from '@/components/post/post-header';
import { Post } from '@/interfaces/post';
import { siteConfig } from '@/lib/constants';
import { TableOfContentsItem } from '@/lib/post-table-of-contents';
import Script from 'next/script';
import PostTableOfContents from './post-table-of-contents';

export default function PostItems({
  post,
  content,
  tableOfContents,
}: {
  post: Post;
  content: string;
  tableOfContents: TableOfContentsItem[];
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
        <article className="mx-auto mb-24 max-w-6xl xl:max-w-7xl">
          <PostHeader post={post} />
          {tableOfContents.length > 0 ? (
            <div className="mt-6 lg:hidden">
              <PostTableOfContents items={tableOfContents} />
            </div>
          ) : null}
          <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,50rem)_11rem] lg:justify-center lg:gap-5 xl:grid-cols-[minmax(0,56rem)_12rem] xl:gap-5">
            <div className="min-w-0">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <Comments />
            </div>
            {tableOfContents.length > 0 ? (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <PostTableOfContents
                    items={tableOfContents}
                    compact
                    className="border-stone-200/45 bg-white/50 shadow-[0_10px_28px_rgba(15,23,42,0.04)] dark:border-stone-800/45 dark:bg-stone-950/40"
                  />
                </div>
              </aside>
            ) : null}
          </div>
        </article>
      </Container>
    </article>
  );
}
