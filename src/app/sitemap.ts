import { getSortedPostsData } from '@/lib/posts';
import type { MetadataRoute } from 'next';
 
const SITE_URL = 'https://hamzaeraoui.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, date }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/opensource`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];


  return [...staticPages, ...postEntries];
}
