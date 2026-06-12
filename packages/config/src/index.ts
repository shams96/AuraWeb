import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Environment variables schema
export const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // NextAuth.js
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  
  // Stripe
  STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  
  // Resend (Email)
  RESEND_API_KEY: z.string(),
  
  // Meilisearch
  MEILISEARCH_URL: z.string().url(),
  MEILISEARCH_MASTER_KEY: z.string(),
  
  // Vercel (for production)
  VERCEL_URL: z.string().url().optional(),
  
  // Analytics (optional)
  SENTRY_DSN: z.string().optional(),
  
  // File Upload (optional)
  CLOUDFLARE_R2_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().optional(),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().optional(),
  CLOUDFLARE_R2_BUCKET_NAME: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

// App configuration
export const appConfig = {
  name: 'Isola Vitale',
  description: 'Luxury bio-adaptive skincare solutions',
  url: process.env.VERCEL_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/isolavitale',
    instagram: 'https://instagram.com/isolavitale',
    facebook: 'https://facebook.com/isolavitale',
  },
  features: {
    reviews: true,
    ugc: true,
    routines: true,
    sustainability: true,
    gifting: true,
  },
} as const;

// Pagination settings
export const pagination = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 36, 48],
} as const;

// Currency settings
export const currency = {
  code: 'USD',
  symbol: '$',
  precision: 2,
  format: (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: currency.precision,
      maximumFractionDigits: currency.precision,
    }).format(value);
  },
} as const;

// Authentication settings
export const auth = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  callbacks: {
    session: {
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
  },
} as const;

// Email settings
export const email = {
  from: 'Isola Vitale <ritual@isolavitale.com>',
  support: 'support@isolavitale.com',
} as const;

// Search settings
export const search = {
  indexPrefix: 'isolavitale_',
  maxResults: 50,
  synonyms: {
    'vit c': ['vitamin c', 'ascorbic acid'],
    'aha': ['alpha hydroxy acid'],
    'bha': ['beta hydroxy acid'],
    'spf': ['sun protection factor'],
    'ttw': ['time to wow'],
  },
} as const;

// Shipping settings
export const shipping = {
  freeShippingThreshold: 100, // USD
  zones: [
    {
      id: 'domestic',
      name: 'Domestic',
      countries: ['US'],
      rates: [
        { type: 'flat', amount: 5.99 },
        { type: 'free', minAmount: 100 },
      ],
    },
    {
      id: 'international',
      name: 'International',
      countries: [],
      rates: [
        { type: 'flat', amount: 15.99 },
      ],
    },
  ],
} as const;

// Tax settings
export const tax = {
  enabled: true,
  provider: 'stripe', // or 'taxjar'
  defaultRate: 0.08, // 8%
} as const;

// Image settings
export const image = {
  sizes: {
    thumbnail: { width: 100, height: 100 },
    small: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 },
    xlarge: { width: 2400, height: 2400 },
  },
  formats: ['webp', 'avif', 'jpg'],
  quality: 80,
  placeholder: {
    blur: 10,
    color: '#f3f4f6',
  },
} as const;

// SEO settings
export const seo = {
  titleTemplate: '%s | Isola Vitale',
  defaultTitle: 'Isola Vitale - Luxury Bio-Adaptive Skincare',
  defaultDescription: 'Experience the future of skincare with Isola Vitale\'s bio-adaptive formulations that combine clinical efficacy with sensory indulgence.',
} as const;
