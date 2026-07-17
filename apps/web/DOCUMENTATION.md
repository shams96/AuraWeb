# Chiarelle Website Documentation

## Overview

Chiarelle is a luxury skincare e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. The website implements an inverted Product Detail Page (PDP) structure optimized for conversion and user experience.

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **NextAuth.js** for authentication

### Backend Integration
- **Next.js API Routes** for backend communication
- **Prisma ORM** with PostgreSQL
- **Stripe** for payment processing
- **Meilisearch** for search functionality
- **Resend** for email delivery

### State Management
- **React Context** for cart, wishlist, and auth state
- **useReducer** for complex state logic
- **Custom hooks** for reusable functionality

## Project Structure

```
apps/web/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── header.tsx    # Navigation header
│   │   └── footer.tsx    # Footer component
│   ├── sections/         # Page sections
│   │   ├── product-hero.tsx  # Product hero section
│   │   └── buy-box.tsx   # Purchase section
│   └── providers.tsx     # Provider wrapper
├── lib/                  # Utility libraries
│   ├── cart-context.tsx  # Shopping cart state
│   ├── wishlist-context.tsx  # Wishlist state
│   ├── auth-context.tsx  # Authentication state
│   └── hooks.ts          # Custom hooks
└── next.config.js        # Next.js configuration
```

## Core Components

### 1. Header Component (`components/layout/header.tsx`)

**Features:**
- Responsive navigation with mobile menu
- Cart and wishlist functionality with item counters
- Search overlay with full-screen experience
- User authentication integration
- Sticky positioning with backdrop blur

**Props:**
- None (uses context for state management)

**Usage:**
```tsx
import { Header } from '@/components/layout/header'

<Header />
```

### 2. Footer Component (`components/layout/footer.tsx`)

**Features:**
- Organized link structure (Product, Routines, Company, Support)
- Social media integration
- Contact information display
- Trust badges and company information
- Responsive grid layout

**Props:**
- None (static content)

**Usage:**
```tsx
import { Footer } from '@/components/layout/footer'

<Footer />
```

### 3. Product Hero Section (`components/sections/product-hero.tsx`)

**Features:**
- Benefit-focused headline structure
- Quick use-case tiles for product benefits
- Social proof with star ratings and review count
- Product image/video with play button overlay
- Clear CTA button linking to buy box
- Trust badges display

**Props:**
```tsx
interface ProductHeroProps {
  product: {
    id: string
    name: string
    tagline: string
    description: string
    price: number
    currency: string
    image: string
    videoUrl?: string
    primaryProblem: string
    desiredOutcome: string
    format: string
    audience: string
    scienceMechanism: string
    useCases: string[]
    rating: number
    reviewCount: number
    badges: string[]
  }
}
```

**Usage:**
```tsx
import { ProductHero } from '@/components/sections/product-hero'

const product = {
  id: '1',
  name: 'Bio-Adaptive Serum',
  primaryProblem: 'skin sensitivity',
  desiredOutcome: 'calm, balanced skin',
  // ... other props
}

<ProductHero product={product} />
```

### 4. Buy Box Component (`components/sections/buy-box.tsx`)

**Features:**
- Purchase type toggle (One-Time vs Subscribe & Save)
- Quantity breaks with best value highlighting
- Variant selector for product options
- Multiple payment options (PayPal, Shop Pay)
- Key benefit bullets
- Trust badges and guarantees

**Props:**
```tsx
interface BuyBoxProps {
  product: {
    id: string
    name: string
    price: number
    currency: string
    sku: string
    variants: Array<{
      id: string
      name: string
      price: number
      compareAtPrice?: number
    }>
  }
  buyBullets: string[]
}
```

**Usage:**
```tsx
import { BuyBox } from '@/components/sections/buy-box'

const product = {
  id: '1',
  name: 'Bio-Adaptive Serum',
  price: 39,
  currency: 'USD',
  variants: [
    { id: '1', name: '30ml', price: 39 },
    { id: '2', name: '50ml', price: 59 }
  ]
}

const buyBullets = [
  'Visible support in 2-4 weeks',
  'Clinically studied actives',
  'Made in USA • cGMP',
  '30-day satisfaction guarantee'
]

<BuyBox product={product} buyBullets={buyBullets} />
```

## Context Providers

### 1. Cart Context (`lib/cart-context.tsx`)

**Features:**
- Add/remove items from cart
- Update item quantities
- Clear cart functionality
- Cart state management
- Persistent cart storage (planned)

**Usage:**
```tsx
import { useCart } from '@/lib/cart-context'

const { addItem, removeItem, updateQuantity, clearCart, state } = useCart()

// Add item to cart
addItem({
  name: 'Product Name',
  price: 39,
  currency: 'USD',
  quantity: 1,
  sku: 'PROD-001'
})
```

### 2. Wishlist Context (`lib/wishlist-context.tsx`)

**Features:**
- Add/remove items from wishlist
- Check if item is in wishlist
- Clear wishlist functionality
- Wishlist state management

**Usage:**
```tsx
import { useWishlist } from '@/lib/wishlist-context'

const { addItem, removeItem, isInWishlist, state } = useWishlist()

// Add item to wishlist
addItem({
  name: 'Product Name',
  price: 39,
  currency: 'USD',
  sku: 'PROD-001'
})

// Check if item is in wishlist
const isItemInWishlist = isInWishlist('PROD-001')
```

### 3. Auth Context (`lib/auth-context.tsx`)

**Features:**
- User authentication state
- Session management
- Loading states
- Authentication status checking

**Usage:**
```tsx
import { useAuth } from '@/lib/auth-context'

const { user, isLoading, isAuthenticated } = useAuth()
```

## Inverted PDP Structure

The website implements an inverted Product Detail Page structure optimized for conversion:

### 1. Hero Section (Above the Fold)
- **Headline**: Clear problem/benefit messaging
- **Sub-headline**: What it solves + target audience
- **Primary CTA**: "See Options" (links to Buy Box)
- **Packshot**: Product image or video
- **Visual Style**: Color-aligned to product theme

### 2. Quick Use-Case Tiles
- 3-4 tiles highlighting key benefits
- Each tile links to on-page anchor
- Scannable format for quick understanding

### 3. Social Proof
- Star rating + review count
- Press/trust badges
- Early customer testimonials

### 4. Buy Box (20-25% Scroll Depth)
- Product title + ratings
- Purchase type toggle
- Quantity breaks with pricing
- Variant selector
- Add to cart + payment options
- Key benefit bullets
- Trust badges

### 5. Problem/Education Block
- Why this problem is rising
- Scannable list + infographic
- Environmental/lifestyle context

### 6. How It Works
- 3-step process with timeline
- Expected results timeline
- Clear process visualization

### 7. Science/Ingredients
- Key ingredients with benefits
- Dose transparency
- Clinically studied callouts

### 8. UGC + Before/After
- Customer photos/videos
- Time-bound expectations
- Real results showcase

### 9. FAQ Section
- Conversion-focused questions
- Common objections addressed
- Quick answers for concerns

### 10. Sticky Footer CTA
- Persistent CTA while scrolling
- Fast scroll back to Buy Box
- Current offer display

## Styling System

### Design Tokens
- **Primary Color**: Emerald/Teal gradient
- **Secondary Colors**: Grayscale palette
- **Typography**: Modern, clean sans-serif
- **Spacing**: Consistent padding/margins
- **Border Radius**: Rounded corners (lg: 0.5rem, xl: 0.75rem, 2xl: 1rem)

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: Responsive grid layouts
- **Typography**: Responsive font sizes

### Component Styling
- **Consistent Spacing**: Using Tailwind spacing scale
- **Hover States**: Interactive feedback
- **Focus States**: Keyboard navigation support
- **Transitions**: Smooth animations

## Performance Optimization

### Image Optimization
- Next.js Image component for automatic optimization
- WebP/AVIF format support
- Lazy loading
- Responsive images

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting
- Component-level splitting

### Caching Strategy
- Static generation where possible
- Incremental static regeneration
- API route caching

## Security Considerations

### Authentication
- NextAuth.js for secure authentication
- JWT token management
- Session handling
- Protected routes

### Data Protection
- Input validation
- XSS prevention
- CSRF protection
- Secure headers

### Payment Security
- Stripe integration for PCI compliance
- No sensitive data on client-side
- Secure checkout process

## SEO Optimization

### Meta Tags
- Dynamic title and description generation
- Open Graph tags for social sharing
- Twitter Card support
- Favicon and app icons

### Structured Data
- Product schema markup
- Breadcrumb navigation
- FAQ schema
- Review schema

### Performance
- Core Web Vitals optimization
- Mobile-friendly design
- Fast loading times
- Clean URL structure

## Deployment

### Environment Setup
- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm start`
- Export: `npm run export`

### Environment Variables
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_MASTER_KEY=masterKey
RESEND_API_KEY=your-resend-key
```

### Docker Support
- Multi-stage builds
- Optimized production images
- Environment-specific configurations

## Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Run tests: `npm run test`
4. Check types: `npm run type-check`
5. Lint code: `npm run lint`
6. Submit pull request

### Code Style
- TypeScript strict mode
- ESLint for linting
- Prettier for formatting
- Consistent component structure

### Component Guidelines
- Use TypeScript interfaces
- Implement proper error handling
- Add accessibility attributes
- Include loading states
- Write JSDoc comments

## Future Enhancements

### Planned Features
- Internationalization (i18n)
- Dark/light mode toggle
- Advanced search with filters
- Product comparison
- Wishlist sharing
- Gift cards
- Subscription management
- Advanced analytics
- A/B testing framework

### Technical Improvements
- Server components migration
- Edge functions implementation
- Database optimization
- CDN integration
- Advanced caching strategies
- Performance monitoring
- Error tracking
- Automated testing

## Support

For technical support or questions:
- GitHub Issues: Create an issue for bugs or feature requests
- Documentation: Check this documentation for implementation details
- Code Review: Follow the contributing guidelines for PRs

---

*Last Updated: November 2025*
*Version: 1.0.0*
