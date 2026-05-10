export interface Product {
  id: string
  name: string
  price: number
  tier: 'clinical' | 'consumer' | 't1' | 't2' | 't3' | 't4' | 'best-seller'
  image: string
  badge?: string
  rating: number
  reviewCount: number
  tags: string[]
  description: string
  collection?: string
  volume?: string
  finish?: string
  hardware?: string
  decoration?: string
  refillable?: boolean
  isNew?: boolean
  isBestSeller?: boolean
  category?: string
  tagline?: string
  primaryProblem?: string
  desiredOutcome?: string
  format?: string
  audience?: string
  scienceMechanism?: string
  useCases?: string[]
  variants?: Array<{
    id: string
    name: string
    price: number
    compareAtPrice?: number
  }>
}

export const HERO_SKUS: Product[] = [
  {
    id: 'terra-radiance-cream',
    name: 'Terra Radiance Cream',
    price: 245,
    tier: 'best-seller',
    collection: 'The Daily Collection',
    volume: '50 ml',
    finish: 'Deep Emerald satin matte opaque glass',
    hardware: 'Real Champagne Gold metal cap',
    decoration: 'Debossed IV monogram; optional emerald gradient spray',
    refillable: true,
    image: '/images/products/terra_radiance.png',
    badge: 'Hero SKU',
    rating: 5.0,
    reviewCount: 2450,
    tags: ['Cream', 'Refillable', 'Daily'],
    description: 'A luxurious airless jar cream formulated with Deep Emerald satin matte opaque glass.',
    isBestSeller: true
  },
  {
    id: 'gentle-cellular-cleanser',
    name: 'Gentle Cellular Cleanser',
    price: 85,
    tier: 'best-seller',
    collection: 'The Daily Collection',
    volume: '150 ml',
    finish: 'Satin matte clear glass (spray matte)',
    hardware: 'Real Champagne Gold metal collar',
    decoration: 'Minimalist clinical labeling',
    image: '/images/products/gentle_cleanser.png',
    badge: 'Essential',
    rating: 4.9,
    reviewCount: 1890,
    tags: ['Cleanser', 'Daily'],
    description: 'Satin matte clear glass airless pump for daily metabolic waste removal.',
    isBestSeller: true
  },
  {
    id: 'eye-contour-complex',
    name: 'Eye Contour Complex',
    price: 195,
    tier: 'best-seller',
    collection: 'The Daily Collection',
    volume: '15 ml',
    finish: 'Opaque Cloud Dancer',
    hardware: 'Real Champagne Gold metal collar',
    decoration: 'Clean clinical aesthetic',
    image: '/images/products/eye_contour.png',
    badge: 'Best Seller',
    rating: 4.8,
    reviewCount: 1240,
    tags: ['Eye Care', 'Clinical'],
    description: 'Opaque Cloud Dancer airless pump for targeted eye rejuvenation.',
    isBestSeller: true
  },
  {
    id: 'obsidian-vitale-cream',
    name: 'Obsidian Vitale Cream',
    price: 295,
    tier: 'best-seller',
    collection: 'Cellular Chronos Collection',
    volume: '50 ml',
    finish: 'Smoky Charcoal satin matte opaque glass',
    hardware: 'Real Champagne Gold metal cap',
    decoration: 'Debossed IV monogram',
    refillable: true,
    image: '/images/products/obsidian_cream.png',
    badge: 'Age-Defying',
    rating: 5.0,
    reviewCount: 3100,
    tags: ['Cream', 'Refillable', 'Chronos'],
    description: 'Smoky Charcoal satin matte opaque glass airless jar for intensive age-defying precision.',
    isBestSeller: true
  },
  {
    id: 'chrono-lift-serum',
    name: 'Chrono-Lift Serum',
    price: 345,
    tier: 'best-seller',
    collection: 'Cellular Chronos Collection',
    volume: '30 ml',
    finish: 'Peach Dust opaque glass',
    hardware: 'Real Champagne Gold metal collar',
    decoration: 'Chronos accent color',
    image: '/images/products/chrono_lift.png',
    badge: 'Chronos',
    rating: 4.9,
    reviewCount: 2150,
    tags: ['Serum', 'Chronos'],
    description: 'Peach Dust opaque glass airless pump for targeted volume and lift.',
    isBestSeller: true
  }
]

export const ALL_PRODUCTS: Product[] = [
  ...HERO_SKUS,
  // CLINICAL A-SERIES
  { id: '1a', name: '1A Clinical Peptide Essence', price: 390, tier: 'clinical', image: '/images/products/isola_serum.png', badge: 'OS-01 + GLP-1', rating: 5.0, reviewCount: 210, tags: ['Treatment', 'B2B'], description: 'Professional grade cellular essence.', isBestSeller: true },
  { id: '2a', name: '2A Clinical Barrier Cream', price: 310, tier: 'clinical', image: '/images/products/isola_collection.png', badge: 'DWAT + Bifida', rating: 4.9, reviewCount: 185, tags: ['Cream', 'B2B'], description: 'Professional grade barrier restoration.', category: 'Bundles' },
  { id: '3a', name: '3A Clinical SPF 50+ Sunscreen', price: 195, tier: 'clinical', image: '/images/products/isola_collection.png', badge: 'Ectoin Shield', rating: 4.8, reviewCount: 142, tags: ['SPF', 'B2B'], description: 'Professional grade UV protection.' },
  { id: '4a', name: '4A Clinical Night Repair', price: 345, tier: 'clinical', image: '/images/products/isola_collection.png', badge: 'L-Ornithine + NMN', rating: 5.0, reviewCount: 295, tags: ['Treatment', 'B2B'], description: 'Professional grade night repair.', category: 'Bundles' },
  { id: '5a', name: '5A Clinical Hydrating Mist', price: 145, tier: 'clinical', image: '/images/products/isola_collection.png', badge: 'Ectoin + Bifida', rating: 4.8, reviewCount: 110, tags: ['Toner', 'B2B'], description: 'Professional grade hydration.' },
  { id: '6a', name: '6A Clinical Gentle Cleanser', price: 110, tier: 'clinical', image: '/images/products/isola_collection.png', badge: 'Microbiome Safe', rating: 4.9, reviewCount: 310, tags: ['Cleanser', 'B2B'], description: 'Professional grade gentle cleansing.' },
  { id: '7a', name: '7A Clinical Eye Treatment', price: 245, tier: 'clinical', image: '/images/products/isola_collection.png', badge: '5 Breakthroughs', rating: 5.0, reviewCount: 180, tags: ['Treatment', 'B2B'], description: 'Professional grade eye rejuvenation.' },

  // CONSUMER B-SERIES
  { id: '1b', name: '1B Consumer Peptide Essence', price: 175, tier: 'consumer', image: '/images/products/isola_serum.png', badge: 'Daily Renewal', rating: 4.8, reviewCount: 420, tags: ['Treatment'], description: 'Advanced consumer grade essence.', isNew: true },
  { id: '2b', name: '2B Consumer Barrier Cream', price: 145, tier: 'consumer', image: '/images/products/isola_collection.png', badge: 'Daily Support', rating: 4.7, reviewCount: 380, tags: ['Cream'], description: 'Advanced consumer grade support.' },
  { id: '3b', name: '3B Consumer SPF 30+ Sunscreen', price: 95, tier: 'consumer', image: '/images/products/isola_collection.png', badge: 'UV Shield', rating: 4.6, reviewCount: 512, tags: ['SPF'], description: 'Advanced consumer grade UV shield.' },
  { id: '4b', name: '4B Consumer Night Repair', price: 195, tier: 'consumer', image: '/images/products/isola_collection.png', badge: 'Overnight Support', rating: 4.8, reviewCount: 320, tags: ['Treatment'], description: 'Advanced consumer grade night repair.' },
  { id: '5b', name: '5B Consumer Hydrating Mist', price: 75, tier: 'consumer', image: '/images/products/isola_collection.png', badge: 'Hydration', rating: 4.9, reviewCount: 290, tags: ['Toner'], description: 'Advanced consumer grade hydration.' },
  { id: '6b', name: '6B Consumer Gentle Cleanser', price: 68, tier: 'consumer', image: '/images/products/isola_collection.png', badge: 'Best Seller', rating: 4.8, reviewCount: 890, tags: ['Cleanser'], description: 'Advanced consumer grade cleansing.', isBestSeller: true },
  { id: '7b', name: '7B Consumer Eye Treatment', price: 145, tier: 'consumer', image: '/images/products/isola_collection.png', badge: 'Eye Protection', rating: 4.7, reviewCount: 410, tags: ['Treatment'], description: 'Advanced consumer grade eye protection.' },

  // 4-TIER AGE-SPECIFIC SYSTEM
  { id: 't1-01', name: 'T1-01 Adolescent Protection Gel', price: 75, tier: 't1', image: '/images/products/isola_collection.png', badge: 'Bifida 0.30%', rating: 4.8, reviewCount: 120, tags: ['Cleanser'], description: 'Metabolically aligned for Tier 1.', isNew: true },
  { id: 't2-02', name: 'T2-02 Young Adult Gel', price: 110, tier: 't2', image: '/images/products/isola_collection.png', badge: 'GLP-1 Protection', rating: 4.7, reviewCount: 340, tags: ['Serum'], description: 'Metabolically aligned for Tier 2.' },
  { id: 't3-03', name: 'T3-03 Mature Intervention Gel', price: 165, tier: 't3', image: '/images/products/isola_collection.png', badge: 'OS-01 + DWAT', rating: 4.9, reviewCount: 630, tags: ['Treatment'], description: 'Metabolically aligned for Tier 3.' },
  { id: 't4-04', name: 'T4-04 Advanced Renewal Gel', price: 225, tier: 't4', image: '/images/products/isola_collection.png', badge: 'Maximum Potency', rating: 4.9, reviewCount: 840, tags: ['Treatment'], description: 'Metabolically aligned for Tier 4.' },
]
