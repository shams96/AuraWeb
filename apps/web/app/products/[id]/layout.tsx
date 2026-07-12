import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Formulations | LIRI ROMA',
    template: '%s | LIRI ROMA'
  },
  description: 'LIRI ROMA formulations — the science of skin vitality, formulated at Isola del Liri, Italy.',
  keywords: ['LIRI ROMA', 'luxury skincare', 'skin vitality', 'Skin Intelligence', 'Italian skincare', 'skin resilience'],
  authors: [{ name: 'LIRI ROMA' }],
  creator: 'LIRI ROMA',
  publisher: 'LIRI ROMA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000'),
  openGraph: {
    title: 'Formulations | LIRI ROMA',
    description: 'The science of skin vitality, formulated at Isola del Liri, Italy.',
    url: '/',
    siteName: 'LIRI ROMA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LIRI ROMA — Adaptive Skin Science, Isola del Liri, Italy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formulations | LIRI ROMA',
    description: 'Adaptive Skin Science formulated at Isola del Liri, Italy.',
    images: ['/og-image.jpg'],
    creator: '@liriroma',
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
