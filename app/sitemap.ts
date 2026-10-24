import type { MetadataRoute } from 'next';

const BASE_URL = 'https://lsrnutritionclub.in';

const LOCALES = ['en', 'te'] as const;

interface RouteConfig {
  path: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const ROUTES: RouteConfig[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/services/weight-loss', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/nutrition-supplements', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/mindful-eating', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/personalized-nutrition', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/skin-health', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/bone-joint-health', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/testimonials', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/coach', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-10-24T00:00:00.000Z');

  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const url = `${BASE_URL}/${locale}${route.path}`;

      entries.push({
        url,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route.path}`,
            te: `${BASE_URL}/te${route.path}`,
            'x-default': `${BASE_URL}/en${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}
