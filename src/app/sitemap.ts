import { MetadataRoute } from 'next'
import { mockStudyPacks } from '@/lib/mock-data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://siloir.app';

  const staticRoutes = [
    '', 
    '/dashboard',
    '/create',
    '/review',
    '/settings',
    '/login',
    '/signup',
    '/features',
    '/pricing'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const dynamicStudyPackRoutes = mockStudyPacks.map(pack => ({
    url: `${siteUrl}/study/${pack.id}`,
    lastModified: new Date(pack.createdAt),
  }));

  return [
    ...staticRoutes,
    ...dynamicStudyPackRoutes
  ];
}
