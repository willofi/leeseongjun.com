import PostItems from '@/components/post/post-items';
import { getPostBySlug, getPostSlugs } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPostFromParams(paramsPromise: Params['params']) {
  const { slug } = await paramsPromise;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return post;
}

export default async function PostPage(props: Params) {
  const post = await getPostFromParams(props.params);
  const content = await markdownToHtml(post.content || '');

  return <PostItems post={post} content={content} />;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const post = await getPostFromParams(props.params);
  const title = post.title;
  const description = post.excerpt;
  const url = `/posts/${post.slug}`;
  const imageUrl = post.ogImage?.url || post.coverImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
