import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Formulations | Chiarelle',
    template: '%s | Chiarelle'
  },
  description: 'Chiarelle formulations — the science of skin vitality, formulated at Isola del Liri, Italy.',
  keywords: ['Chiarelle', 'luxury skincare', 'skin vitality', 'Skin Intelligence', 'Italian skincare', 'skin resilience'],
  authors: [{ name: 'Chiarelle' }],
  creator: 'Chiarelle',
  publisher: 'Chiarelle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000'),
  openGraph: {
    title: 'Formulations | Chiarelle',
    description: 'The science of skin vitality, formulated at Isola del Liri, Italy.',
    url: '/',
    siteName: 'Chiarelle',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chiarelle — Skin Intelligence™, Isola del Liri, Italy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formulations | Chiarelle',
    description: 'Skin Intelligence™ formulated at Isola del Liri, Italy.',
    images: ['/og-image.jpg'],
    creator: '@chiarelle',
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
