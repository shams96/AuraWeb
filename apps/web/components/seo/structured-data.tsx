/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURED DATA — Chiarelle
   JSON-LD for Google rich results, and for the crawlers behind social
   previews (Pinterest Rich Pins, LinkedIn, Google Knowledge Panel).

   Provenance discipline applies here as it does in copy:
   the house is located at Isola del Liri, Lazio — never "Rome".
   ═══════════════════════════════════════════════════════════════════════ */

const SITE = process.env.NEXT_PUBLIC_APP_URL || 'https://chiarelle.com'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Chiarelle',
    alternateName: 'The House of Clarity',
    url: SITE,
    logo: `${SITE}/og-square.jpg`,
    image: `${SITE}/og-image.jpg`,
    slogan: 'Your skin is a story worth honoring.',
    description:
      'Chiarelle is an Italian skincare house. Formulated at Isola del Liri, Lazio — matched to your biology, and proven on your own skin within forty-eight hours.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Isola del Liri, Lazio, Italy',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Isola del Liri',
      addressRegion: 'Lazio',
      addressCountry: 'IT',
    },
    sameAs: [
      'https://www.instagram.com/chiarelle',
      'https://www.tiktok.com/@chiarelle',
      'https://www.pinterest.com/chiarelle',
      'https://www.linkedin.com/company/chiarelle',
      'https://www.youtube.com/@chiarelle',
      'https://x.com/chiarelle',
      'https://www.facebook.com/chiarelle',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: 'Chiarelle',
    publisher: { '@id': `${SITE}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ProductSchemaProps {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  sku?: string
  url: string
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = 'USD',
  sku,
  url,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE}${image}`,
    sku,
    brand: {
      '@type': 'Brand',
      name: 'Chiarelle',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Natural You Srl',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Isola del Liri',
        addressRegion: 'Lazio',
        addressCountry: 'IT',
      },
    },
    offers: {
      '@type': 'Offer',
      url: url.startsWith('http') ? url : `${SITE}${url}`,
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE}/#organization` },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
