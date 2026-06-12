import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from '@aurabiosphere/ui'
import { CartProvider } from '@/lib/cart-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import { AuthProvider } from '@/lib/auth-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ScrollRevealProvider } from '@/components/layout/scroll-reveal-provider'
import { ScrollProgressBar } from '@/components/layout/scroll-progress-bar'
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Isola Vitale — The Luxury House of Adaptive Skin Science',
    template: '%s | Isola Vitale'
  },
  description: 'Isola Vitale is a luxury Italian skincare house. Formulated at Isola del Liri, Italy — the science of skin vitality, calibrated to your biology, not your age.',
  keywords: ['luxury skincare', 'adaptive skin science', 'Isola Vitale', 'skin vitality', 'Italian skincare', 'Skin Intelligence', 'clinical skincare', 'La Bella Figura'],
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
    title: 'Isola Vitale — Adaptive Skin Science™',
    description: 'Isola Vitale — adaptive skin science formulated at Isola del Liri, Italy.',
    url: '/',
    siteName: 'Isola Vitale',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Isola Vitale - Luxury Skincare',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isola Vitale — Adaptive Skin Science™',
    description: 'Isola Vitale — adaptive skin science formulated at Isola del Liri, Italy.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
        <ScrollProgressBar />
        <div id="root">
          <Providers>
            <CartProvider>
              <WishlistProvider>
                <AuthProvider>
                  <div className="min-h-screen bg-background flex flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <ScrollRevealProvider />
                    <SmoothScrollProvider />
                  </div>
                  <Toaster />
                </AuthProvider>
              </WishlistProvider>
            </CartProvider>
          </Providers>
        </div>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  )
}
