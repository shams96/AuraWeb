# CLAUDE.md — Isola Vitale / AuraWeb

Project documentation for Claude Code sessions. Keep this file current after every significant change.

---

## Rule #1 — Non-Negotiable

**Every change must cause zero adverse effects on existing working parts.**
Before touching any file, identify what depends on it. After every change, verify no regressions. Never silently remove or rename anything that another file imports.

---

## Repository Layout

```
AuraWeb/
├── apps/
│   ├── web/              # Next.js 14 storefront — primary working app
│   └── api/              # Separate API server (not currently active)
├── packages/
│   └── ui/               # Shared component library (@aurabiosphere/ui)
├── prisma/               # Database schema (PostgreSQL + Prisma)
├── data/                 # JSON file store (products.json, users.json — dev)
└── CLAUDE.md             # This file
```

---

## Active Branch

`claude/fix-client-components-audit-SwsMh`

All development goes here. Never push to `main` without explicit instruction.

---

## Git Push Method

The local proxy sometimes fails. Use the PAT directly:

```bash
git remote set-url origin https://<PAT>@github.com/shams96/AuraWeb.git
git push -u origin claude/fix-client-components-audit-SwsMh
git remote set-url origin http://local_proxy@127.0.0.1:40599/git/shams96/AuraWeb
```

The PAT is stored securely — ask the session owner. Do not commit the raw token to any file.

Always restore the proxy URL after pushing.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Auth | NextAuth v4 — CredentialsProvider + JWT |
| Passwords | bcryptjs (cost factor 12) |
| User store | `apps/web/data/users.json` (dev; PostgreSQL for prod) |
| Product store | `apps/web/data/products.json` (seeded from `lib/products.ts`) |
| Payments | Stripe — one-time (`mode: 'payment'`) + subscription (`mode: 'subscription'`) |
| Email | Resend (transactional) — key in `.env.local` |
| Icons | Lucide React |
| UI primitives | `@aurabiosphere/ui` (packages/ui) |
| Animations | Pure IntersectionObserver + CSS keyframes |

---

## Brand Identity

**Brand:** Isola Vitale
**Philosophy:** La Bella Figura — the Italian practice of living beautifully
**Positioning:** Italy owns luxury beauty (Gucci, Prada, Santa Maria Novella). Isola Vitale draws from that inheritance. Science is proof, not pitch. Ritual replaces protocol. Emotion leads, ingredients follow.
**Formulated:** Natural You Srl, Isola del Liri, Lazio, Italy
**HQ:** Allen, Texas

**Single sentence:** "In Italy, beauty is a way of life."

**Voice:** Poetic, restrained, Italian, sensory, intimate, timeless. Never clinical, aggressive, or performance-driven.

**Enemy:** Optimization culture — masculine biohacking, aggressive anti-aging, punishing wellness routines.

---

## Design System

### Colour tokens (defined in `apps/web/app/globals.css`)

All colours must use CSS variables — never hardcode hex values.

```
--iv-black         #1A1614   Main background (dark theme)
--iv-white         #FDFAF5   Primary text
--iv-cream         #FAF6EE   Secondary text
--iv-gold          #913832   Brand accent (the "red-gold")
--iv-deep-green    #0F2419   Card/surface backgrounds
--iv-formal-garden #1F5129   Mid-tone green
--iv-champagne     #E8D5B0   Light accent
--iv-red-ochre     #913832   (= iv-gold; decorative panels)
--iv-peach-dust    #FAD6C9   Light peach
--iv-deep-peacock  #005F6B   Men's line accent
--iv-text-muted    rgba(253,250,245,0.45)

Light theme (login, register, checkout):
--iv-black resolves to #FDFAF5 (warm ivory page background)
--iv-deep-green resolves to #F4EAE2 (warm parchment)
```

### Typography

Headings: `'Cormorant Garamond', 'Playfair Display', serif` via `var(--iv-font-serif)`
Body: `'Inter', system-ui` via `var(--iv-font-body)`
Labels/badges: `text-[10px] font-black uppercase tracking-[0.3em]`

Global rule in `globals.css`: `h1–h6, em, i, blockquote` all use `var(--iv-font-serif)` automatically.

### Component conventions

- Dark sections: `bg-iv-black`
- Cards: `background: var(--iv-deep-green); border: 1px solid rgba(145,56,50,0.14);`
- Gold borders: `rgba(145,56,50,0.XX)` where XX = 14–30
- Buttons: `.btn-luxury` class (globals.css)

### Scroll reveal animations

Add `data-reveal="iv-reveal-up"` and `style={{ opacity: 0 }}` to any element.
Classes: `iv-reveal-up`, `iv-reveal-fade`, `iv-reveal-left`, `iv-reveal-right`, `iv-scale-in`, `iv-word-in`

---

## Authentication Architecture

### Two separate auth portals

| Portal | Route | Role | Access |
|---|---|---|---|
| Consumer | `/login` | `CUSTOMER` | Shop, account, wishlist |
| Professional / B2B | `/login/professional` | `PROFESSIONAL` / `ADMIN` / `OWNER` | Full catalog incl. Clinical A-Series, wholesale pricing |

### Registration flows

**Consumer:** `/register` → `POST /api/auth/register` (`accountType: 'personal'`) → role `CUSTOMER`
**B2B:** `/register/professional` → `POST /api/auth/register` (`accountType: 'business'`) → role `PROFESSIONAL` (pending approval in prod)

### Login flow (both portals)

1. `signIn('credentials', { email, password })` via NextAuth
2. `lib/auth.ts` `authorize()` reads `data/users.json` directly — **no HTTP roundtrip**
3. `bcrypt.compare()` verifies password
4. JWT issued with `{ id, email, name, role }`

### Key auth files

- `apps/web/lib/auth.ts` — NextAuth config, self-contained authorize (no imports from user-store)
- `apps/web/lib/user-store.ts` — shared user CRUD used by API routes
- `apps/web/app/api/auth/register/route.ts` — registration
- `apps/web/app/api/auth/verify/route.ts` — credential check (for direct API calls)
- `apps/web/app/api/auth/[...nextauth]/route.ts` — NextAuth handler
- `apps/web/data/users.json` — dev user store (format: `{ "users": [...] }`)
- `apps/web/app/login/page.tsx` — consumer login
- `apps/web/app/login/professional/page.tsx` — B2B login (**to build**)

### Admin account (seeded)

- Email: `admin@isolavitale.com`
- Password: `IsolaAdmin2024!`
- Role: `OWNER`

---

## Product & Tier System

Products defined in `apps/web/lib/products.ts`. Live catalog served from `data/products.json` via `lib/product-store.ts`.

| Tier slug | Protocol name | Audience | Portal |
|---|---|---|---|
| `t1` | Preservation Protocol | Consumer — early prevention | Consumer |
| `t2` | Refinement Protocol | Consumer — early correction | Consumer |
| `t3` | Restoration Protocol | Consumer — active restoration | Consumer |
| `t4` | Longevity Protocol | Consumer — maximum potency | Consumer |
| `clinical` | A-Series | B2B / professional ONLY | B2B (role-gated) |
| `consumer` | B-Series | General consumer | Consumer |
| `best-seller` | Hero SKUs | Cross-tier | Both |

**Product separation rule:** `clinical` tier products are ONLY visible/purchasable when `session.user.role` is `PROFESSIONAL`, `ADMIN`, or `OWNER`. Consumer users see a teaser but cannot add to cart or see wholesale pricing.

---

## Cart & Checkout — IM8-Style Flow

### Cart drawer (`components/layout/cart-drawer.tsx`)

Features already built:
- Slide-out drawer (right side)
- Subscribe & Save toggle (20% off, applies to all items)
- Free shipping progress bar (unlocks at $200)
- Cross-sell suggestions (1 complementary product per cart item)
- Welcome kit reveal (shown when subscribed)
- Trust badges (clinical formulation, EU GMP, 30-day guarantee)
- Quantity controls (+ / −)

### Checkout page (`app/checkout/page.tsx`)

IM8-style principles implemented:
- **One page** — no multi-step wizard; all fields visible and scrollable
- **Subscribe & Save** — toggle carried from cart, shown prominently at top
- **Express checkout** — Stripe Payment Request Button (Apple Pay / Google Pay) at top
- **Order summary** — sticky on desktop, collapsed accordion on mobile
- **Trust strip** — 30-day guarantee, free returns, secure payment, EU GMP
- **Guest checkout** — no forced account creation; invite to save after order
- **No redirect** — Stripe Elements embedded; payment happens on-page

### Stripe integration (`app/api/checkout/route.ts`)

- One-time: `mode: 'payment'`
- Subscription: `mode: 'subscription'` with Stripe Price IDs
- Webhook: `app/api/webhooks/route.ts` — handles `checkout.session.completed`

### Subscription pricing

| Purchase type | Discount | Stripe mode |
|---|---|---|
| One-time | Full price | `payment` |
| Subscribe & Save | −20% | `subscription` |

---

## B2B / Professional Portal

**Login:** `/login/professional`
**Register:** `/register/professional` (or apply form)
**Dashboard:** `/professional` (tiers, ordering, account manager)
**Products:** Full A-Series (clinical) + all consumer tiers at wholesale pricing

B2B accounts see:
- Clinical A-Series products (hidden from consumer shop)
- Net-30 / Net-60 payment terms (invoice checkout mode)
- Wholesale pricing (40–50% off retail)
- Minimum order quantities per SKU

---

## Skin Consultation System

**File**: `apps/web/components/diagnostic/skin-consultation.tsx`

8-question Baumann scoring → tier assignment → full AM/PM ritual CTA.
Protocols named: Preservation · Refinement · Restoration · Longevity (no age brackets).

---

## Next.js App Router Rules

### `'use client'` and `export const metadata` are mutually exclusive

### `useSearchParams()` requires `<Suspense>` wrapper

### Stale build cache → `rm -rf apps/web/.next`

---

## Common Patterns

### Inline style vs Tailwind
Use Tailwind for layout. Use inline `style` for `var(--iv-*)` tokens.

### Currency
Consumer: GBP (£). B2B/Clinical: USD ($). Use `Intl.NumberFormat`.

---

## Production Launch Checklist

### ✅ COMPLETE

- [x] Brand narrative — La Bella Figura, Isola del Liri, Italian positioning
- [x] Shanill House removed sitewide
- [x] Navigation streamlined (7 items)
- [x] 4 protocols renamed — no age brackets anywhere
- [x] Font consistency — Cormorant Garamond via CSS variables globally
- [x] Admin product management — full CRUD, image upload, drag-drop
- [x] Product store — live JSON, admin edits appear on storefront immediately
- [x] Auth fix — no HTTP roundtrip, direct bcrypt verify
- [x] Cart drawer — subscribe toggle, shipping bar, cross-sell, welcome kit
- [x] Stripe checkout API — one-time payment mode
- [x] Shop filtering — tier, collection, format
- [x] Skin consultation — 8Q Baumann scoring, tier assignment
- [x] All brand pages — about (La Bella Figura), science, clinical-results, routines, system

### 🔴 BLOCKS LAUNCH

- [ ] **B2B Professional login page** — `/login/professional` (separate from consumer)
- [ ] **B2B product gating** — clinical A-Series hidden from consumer sessions
- [ ] **Stripe subscription mode** — `mode: 'subscription'` with real Price IDs for Subscribe & Save
- [ ] **IM8-style checkout page** — single page, Stripe Elements embedded, subscription upsell prominent
- [ ] **Forgot password page** — `/forgot-password` (linked from login, currently 404)
- [ ] **Stripe webhook** — verify `checkout.session.completed` handler is complete

### 🟡 BEFORE LAUNCH

- [ ] **Order confirmation email** — Resend API key + transactional template
- [ ] **B2B registration** — `/register/professional` with approval flow
- [ ] **Account orders page** — show past orders from Stripe (currently placeholder)
- [ ] **NEXTAUTH_URL** — set to production domain before deploy
- [ ] **Stripe keys** — switch from test to live keys in production `.env`

### 🟢 POST-LAUNCH

- [ ] PostgreSQL migration — replace `data/users.json` with real DB
- [ ] Prisma schema activation — users, orders, subscriptions tables
- [ ] Skin consultation → save results to user profile
- [ ] iv Circle loyalty — points accrual wired to Stripe orders
- [ ] B2B Net-30 invoicing — Stripe Invoice mode
- [ ] Analytics dashboard — wire to real Stripe + order data
- [ ] Press / journal — CMS or markdown-based content management

---

## Environment Variables (`.env.local`)

```
NEXTAUTH_URL=http://localhost:3000           # → production URL before deploy
NEXTAUTH_SECRET=iv-dev-secret-change-in-production

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=                       # → set from Stripe dashboard

RESEND_API_KEY=                              # → add from resend.com

# Production only:
# DATABASE_URL=postgresql://...
```

---

## File Map — Key Files

| Purpose | Path |
|---|---|
| Homepage | `app/page.tsx` |
| Hero section | `components/sections/system-hero.tsx` |
| Skin consultation | `components/diagnostic/skin-consultation.tsx` |
| Header/nav | `components/layout/header.tsx` |
| Footer | `components/layout/footer.tsx` |
| Cart drawer | `components/layout/cart-drawer.tsx` |
| Cart context | `lib/cart-context.tsx` |
| Checkout page | `app/checkout/page.tsx` |
| Checkout API | `app/api/checkout/route.ts` |
| Stripe webhook | `app/api/webhooks/route.ts` |
| Consumer login | `app/login/page.tsx` |
| B2B login | `app/login/professional/page.tsx` |
| Register | `app/register/page.tsx` |
| Auth config | `lib/auth.ts` |
| User store | `lib/user-store.ts` |
| Product store | `lib/product-store.ts` |
| Products seed | `lib/products.ts` |
| Admin products | `app/admin/products/page.tsx` |
| Admin layout | `app/admin/layout.tsx` |
| Shop | `app/shop/page.tsx` |
| System/Ritual | `app/system/page.tsx` |
| About | `app/about/page.tsx` |
| Professional/B2B | `app/professional/page.tsx` |
| Globals CSS | `app/globals.css` |
