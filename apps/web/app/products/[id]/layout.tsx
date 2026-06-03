import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Product | AuraBiosphere',
    template: '%s | AuraBiosphere'
  },
  description: 'Discover premium bio-adaptive skincare solutions tailored to your unique needs.',
  keywords: ['skincare', 'bio-adaptive', 'luxury beauty', 'clinical skincare'],
  authors: [{ name: 'AuraBiosphere' }],
  creator: 'AuraBiosphere',
  publisher: 'AuraBiosphere',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000'),
  openGraph: {
    title: 'Product | AuraBiosphere',
    description: 'Discover premium bio-adaptive skincare solutions tailored to your unique needs.',
    url: '/',
    siteName: 'AuraBiosphere',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AuraBiosphere - Luxury Bio-Adaptive Skincare',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product | AuraBiosphere',
    description: 'Discover premium bio-adaptive skincare solutions tailored to your unique needs.',
    images: ['/og-image.jpg'],
    creator: '@aurabiosphere',
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
