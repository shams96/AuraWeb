import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui-lib'
import { CartProvider } from '@/lib/cart-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import { AuthProvider } from '@/lib/auth-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ScrollRevealProvider } from '@/components/layout/scroll-reveal-provider'
import { ScrollProgressBar } from '@/components/layout/scroll-progress-bar'
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider'
import Script from 'next/script'
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'LIRI ROMA — The House of Liri',
    template: '%s | LIRI ROMA'
  },
  description: 'Your skin is a story worth honoring. An Italian skincare house formulated at Isola del Liri, Lazio — matched to your biology, and proven on your own skin within forty-eight hours.',
  keywords: ['LIRI ROMA', 'Skin Intelligence', 'luxury skincare', 'Italian skincare', 'Isola del Liri', 'skin protocol', 'personalised skincare', 'House of Liri'],
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
    title: 'LIRI ROMA — The House of Liri',
    description: 'Your skin is a story worth honoring. Matched to your biology, proven on your own skin within forty-eight hours. Formulated at Isola del Liri, Lazio, Italy.',
    url: '/',
    siteName: 'LIRI ROMA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LIRI ROMA — Your skin is a story worth honoring',
        type: 'image/jpeg',
      },
      {
        // Square — Pinterest, Instagram, WhatsApp previews
        url: '/og-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'LIRI ROMA — The House of Liri',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    countryName: 'Italy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIRI ROMA — The House of Liri',
    description: 'Your skin is a story worth honoring. Matched to your biology, proven within forty-eight hours.',
    images: ['/og-image.jpg'],
    site: '@liriroma',
    creator: '@liriroma',
  },
  other: {
    // Pinterest Rich Pins
    'pinterest-rich-pin': 'true',
    'og:see_also': 'https://www.instagram.com/liriroma',
    // WhatsApp / iMessage lean on OG; Telegram reads these
    'telegram:channel': '@liriroma',
    // Apple / iMessage rich link
    'apple-mobile-web-app-title': 'LIRI ROMA',
    // LinkedIn reads OG but respects author
    'article:publisher': 'https://www.linkedin.com/company/liriroma',
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
        <meta name="theme-color" content="#F0F2EB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        <OrganizationSchema />
        <WebSiteSchema />
        {/* GTM loads only when a real container id is configured — never a placeholder */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
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
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
      </body>
    </html>
  )
}
