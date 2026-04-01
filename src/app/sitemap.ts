import { getAllPosts } from '@/lib/api';
import { siteConfig } from '@/lib/constants';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...posts,
  ];
}
