import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://isolavitale.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/shop', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/shop/best-sellers', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/system', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ingredients', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/science', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/routines', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/routines/morning', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/routines/evening', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/routines/sensitive', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/routines/acne', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/journal', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
    { url: '/professional', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/loyalty', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/clinical-results', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/sustainability', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/faq', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/careers', priority: 0.4, changeFrequency: 'monthly' as const },
    { url: '/press', priority: 0.4, changeFrequency: 'monthly' as const },
    { url: '/shipping', priority: 0.4, changeFrequency: 'yearly' as const },
    { url: '/returns', priority: 0.4, changeFrequency: 'yearly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return staticPages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
