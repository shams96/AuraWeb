import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Formulations | Isola Vitale',
    template: '%s | Isola Vitale'
  },
  description: 'Isola Vitale formulations — the science of skin vitality, formulated at Isola del Liri, Italy.',
  keywords: ['Isola Vitale', 'luxury skincare', 'skin vitality', 'Skin Intelligence', 'Italian skincare', 'skin resilience'],
  authors: [{ name: 'Isola Vitale' }],
  creator: 'Isola Vitale',
  publisher: 'Isola Vitale',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000'),
  openGraph: {
    title: 'Formulations | Isola Vitale',
    description: 'The science of skin vitality, formulated at Isola del Liri, Italy.',
    url: '/',
    siteName: 'Isola Vitale',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Isola Vitale — Adaptive Skin Science, Isola del Liri, Italy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formulations | Isola Vitale',
    description: 'Adaptive Skin Science formulated at Isola del Liri, Italy.',
    images: ['/og-image.jpg'],
    creator: '@isolavitale',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
