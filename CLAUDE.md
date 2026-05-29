# CLAUDE.md — Isola Vitale / AuraWeb
# Engineering Master Document — Single Source of Truth

Last updated: 2026-05-29. Keep this file current after every significant change.

---

## Rule #1 — Non-Negotiable

**Every change must cause zero adverse effects on existing working parts.**
Before touching any file, identify what depends on it. After every change, verify no regressions.
Never silently remove or rename anything that another file imports.

**Engineering Rule:** Plan → Document → Approve → Execute. Never jump to edits without a written plan in this file first.

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
**Positioning:** Italy owns luxury beauty (Gucci, Prada, Armani, Santa Maria Novella). Isola Vitale draws from that inheritance. Science is proof, not pitch. Ritual replaces protocol. Emotion leads, ingredients follow.
**Formulated:** Natural You Srl, Isola del Liri, Lazio, Italy
**HQ:** Allen, Texas

**Single sentence:** "In Italy, beauty is a way of life."

**Voice:** Poetic, restrained, Italian, sensory, intimate, timeless. Never clinical, aggressive, or performance-driven.

**Enemy:** Optimization culture — masculine biohacking, aggressive anti-aging, punishing wellness routines.

---

## The Langer Doctrine — Full Implementation Specification

Daniel Langer (CEO Équité, Pepperdine Professor) defines luxury brands by Added Luxury Value (ALV):
95%+ of perceived value is emotional. The remaining 5% is functional/ingredient proof.
Isola Vitale must be engineered to this standard at every single touchpoint.

### The 4E Framework (required at every touchpoint)

| E | Principle | Implementation Rule |
|---|---|---|
| **Experience** | Every interaction must feel precious and sensory | No generic form labels. No Shopify-default copy. Every screen has a brand moment. |
| **Emotion** | Lead with transformation, not ingredients | Headlines describe *how the customer will feel*, not what the formula contains |
| **Exclusivity** | Access feels earned, not purchased | Professional portal as desire signal. Waitlist language. Consultation before purchase. |
| **Engagement** | Ongoing relationship, not transaction | Subscription framing as ritual membership. Loyalty = iv Circle. Post-purchase ritual content. |

### Customer as Protagonist Rule

Langer: "The brand is the guide. The customer is the hero of their own transformation story."

Every piece of copy must be written from the customer's perspective:
- WRONG: "Our formulation contains GLP-1 protective complexes"
- RIGHT: "Your skin's metabolic rhythm — restored to what it was designed to do"

- WRONG: "Subscribe & Save 20%"
- RIGHT: "Begin your monthly ritual — your skin expects it"

- WRONG: "⚠ You're paying £X more" (penalty/shame)
- RIGHT: "Subscribers receive this for £X less — and never run out" (invitation)

### Langer Luxury Copy Rules — Hard Constraints

**NEVER use:**
- Penalty, warning, or shame language (e.g. "⚠ You're paying more")
- Urgency/scarcity tricks ("Only 3 left!" "Limited time!")
- DTC supplement language ("clinically proven to..." in marketing copy)
- Generic e-commerce labels ("Add to Cart" should be "Begin Your Ritual")
- Aggressive upsell language ("Don't forget..." "You're missing out on...")
- Price-first framing (price is always secondary to value/transformation)

**ALWAYS use:**
- Invitation language ("Begin", "Discover", "Continue your ritual")
- Heritage and provenance ("Formulated at Isola del Liri", "Italian precision")
- Transformation language (customer-centric, emotional outcome)
- Restraint — silence is luxury ("The finest things rarely announce themselves")
- Poetic compression — one perfect sentence over three marketing sentences

### Langer Doctrine Audit Results (2026-05-29)

**Overall compliance: 78/100**

| Page / Component | Score | Status | Key Gap |
|---|---|---|---|
| Homepage | 90/100 | ✅ Strong | — |
| About page | 92/100 | ✅ Strong | — |
| System/Ritual page | 88/100 | ✅ Strong | — |
| Login page | 86/100 | ✅ Strong | — |
| Register page | 84/100 | ✅ Strong | — |
| Professional/B2B page | 90/100 | ✅ Strong | — |
| Header/Nav | 85/100 | ✅ Strong | — |
| Footer | 87/100 | ✅ Strong | — |
| System Hero component | 88/100 | ✅ Strong | — |
| Bento Features | 83/100 | ✅ Good | — |
| How It Works | 82/100 | ✅ Good | — |
| Skin Consultation | 85/100 | ✅ Good | — |
| **Cart Drawer (current)** | **55/100** | ⚠️ Fix required | Penalty language added in last session ("⚠ One-time penalty") violates Langer — must be rewritten as invitation |
| **Buy Box (current)** | **55/100** | ⚠️ Fix required | Same: "+$X more" penalty framing violates doctrine — rewrite as invitation |
| **Shop page** | **65/100** | ⚠️ Improve | "Acquisition Portal" label, utilitarian filter UI, no narrative entry |
| **Checkout page** | **35/100** | 🔴 Redesign | Generic gray background, no brand voice, standard form labels, breaks doctrine at conversion moment |
| **Error states sitewide** | **60/100** | ⚠️ Audit | Some branded, some generic ("No formulations found") |

---

## Phased Engineering Roadmap

Work is sequenced by dependency and impact. No phase starts until the previous is approved.

---

### PHASE 0 — Immediate Corrections (fixes errors introduced in prior session)

**Goal:** Restore Langer compliance to cart drawer and buy box. Zero new features.

**Files:**
- `apps/web/components/layout/cart-drawer.tsx` — SubscribeToggle component
- `apps/web/components/sections/buy-box.tsx` — purchase type toggle

**Spec — Cart Drawer SubscribeToggle:**
- Subscribe tab remains first (left), One-Time second — ordering correct
- When ONE-TIME is active: remove red ⚠ panel. Replace with a soft invitation card:
  - Background: warm parchment (`#F7F4EF`), no red
  - Copy: "Subscribers receive [product] for £X less per month — and it arrives before they run out."
  - CTA button: "Join the monthly ritual" (gold, not red)
- When SUBSCRIBE is active: current green savings panel is fine — keep it

**Spec — Buy Box:**
- Remove the red `⚠ One-time penalty` warning banner entirely
- Remove "+$X more vs subscribers" red label from One-Time tab
- One-Time tab: plain label "One-Time Purchase" with greyed price, no penalty language
- Subscribe tab: keep the green savings banner and annual saving calculation
- The contrast between the two options communicates value without shaming

**Acceptance criteria:** No red, no ⚠, no "penalty", no "paying more". Luxury invites; it does not punish.

---

### PHASE 1 — Subscription Infrastructure (blocks revenue)

**Goal:** Wire subscription pricing end-to-end through Stripe. Currently the UX shows subscriptions but the API only supports one-time payments.

**Files to create/modify:**

1. `apps/web/app/api/checkout/route.ts` — add `mode: 'subscription'` path
   - If any cart item has `isSubscription: true`, route to subscription mode
   - Requires Stripe Price IDs (recurring monthly prices) — document placeholder flow
   - Subscription metadata: `{ customerId, priceId, interval: 'month' }`
   - One-time items in a subscription order handled as separate payment intent or add-on

2. `apps/web/app/api/webhooks/route.ts` — verify and extend
   - Must handle: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`
   - On `checkout.session.completed`: mark order complete, trigger confirmation email
   - On `invoice.paid`: log renewal, trigger renewal email
   - On `subscription.deleted`: update user subscription status

3. `apps/web/lib/stripe-prices.ts` — NEW file
   - Map product SKUs to Stripe Price IDs (monthly recurring)
   - Fallback: if no Price ID exists, create ad-hoc subscription with `price_data`
   - Structure: `{ [sku: string]: { oneTimeId: string; subscriptionId: string } }`

4. `apps/web/lib/cart-context.tsx`
   - Items already default to `isSubscription: true` ✅ (done)
   - Add: persist cart to `sessionStorage` so it survives page refresh

**Acceptance criteria:**
- Clicking checkout with subscribed items creates a Stripe subscription session
- Webhook logs `checkout.session.completed` with subscription data
- Cart survives page refresh

---

### PHASE 2 — Checkout Page Redesign (Langer compliance + IM8 pattern)

**Goal:** Replace the generic checkout page with a luxury-grade, on-brand experience. Currently scores 35/100 on Langer compliance.

**File:** `apps/web/app/checkout/page.tsx` — full rewrite

**Design spec:**
- Background: `bg-iv-black` (dark, not generic gray-50)
- Two-column layout on desktop: form left, order summary right (sticky)
- Single-column on mobile: summary collapsed accordion at top, form below

**Copy spec (Langer-compliant):**
- Page title: "Complete Your Ritual" (not "Checkout")
- Email field label: "We will reach you at" (not "Email Address")
- Shipping section heading: "Where your ritual will arrive" (not "Shipping Address")
- Subscription badge (if subscribed): "Your monthly ritual — ships every 30 days"
- Security note: "Your payment details are tokenised by Stripe and never touch our servers"
- Guest checkout invite: "Continue without an account" with note "You can save your details after your first order"
- Submit button: "Complete My Ritual — £{total}" (not generic "Place Order")

**Technical spec:**
- Carry subscription state from cart (check `isSubscription` on items)
- If subscription: show "Ritual Membership" badge at top of summary
- Annual saving calculation displayed in summary: "You save £X/year with your ritual membership"
- Stripe Elements embedded (no redirect to Stripe-hosted page for card)
- Apple Pay / Google Pay via Stripe Payment Request Button at top ("Express Complete")
- Trust strip: "90-Day Guarantee · Free Returns · EU GMP Certified · Cancel Anytime"
- After success: redirect to `/account/orders` with `?confirmed=true` param

**Acceptance criteria:**
- Page uses `bg-iv-black` throughout, gold accents, serif headings
- All form labels use brand voice copy above
- Subscription state visible in summary
- Payment completes successfully via Stripe Elements
- No standard Shopify/generic checkout feel

---

### PHASE 3 — B2B Professional Login + Product Gating

**Goal:** Separate the consumer and professional authentication flows completely. Gate clinical A-Series products behind role check.

**Files:**

1. `apps/web/app/login/professional/page.tsx` — NEW or verify exists
   - Separate page from `/login`
   - Left panel: B2B authority narrative ("For practitioners who demand clinical-grade formulations")
   - Right panel: email/password form, same auth flow, but role verification after login
   - On success: redirect to `/professional` dashboard (not `/account`)
   - Link to `/register/professional` for new B2B applicants

2. `apps/web/app/register/professional/page.tsx` — NEW
   - Business name, practice type, license number, country
   - Note: "Applications reviewed within 5 business days"
   - On submit: create user with role `PROFESSIONAL`, `accountType: 'business'`
   - Trigger: welcome email with "application received" message via Resend

3. `apps/web/app/shop/page.tsx` — product gating
   - Clinical tier products (`tier: 'clinical'`): if `session.user.role` is `CUSTOMER` or unauthenticated, render teaser card instead of buyable card
   - Teaser card: blurred product image, "Available to Verified Practitioners" badge, link to `/register/professional`
   - All other tiers: visible to all

4. `apps/web/components/sections/buy-box.tsx` — role check
   - If product tier is `clinical` and role is not `PROFESSIONAL`/`ADMIN`/`OWNER`: render gated state
   - Gated state: "This formulation is available exclusively to verified practitioners. Apply for professional access →"

**Acceptance criteria:**
- `/login/professional` exists and routes to `/professional` on success
- `/register/professional` exists and creates a `PROFESSIONAL` role user
- Clinical products show teaser (not buyable) to `CUSTOMER` role sessions
- Consumer products visible to all

---

### PHASE 4 — Shop Page Langer Compliance

**Goal:** Elevate the shop page from utilitarian product grid to a luxury brand moment.

**File:** `apps/web/app/shop/page.tsx`

**Changes:**
- Hero section at top (currently missing): 
  - Headline: "Eighteen formulations. Four protocols. One Italian philosophy."
  - Sub: "Each formulation is assigned to a biological stage — not an age. Find yours."
  - CTA to skin consultation: "Discover your protocol →" (scrolls to or links to consultation)

- Filter UI: currently uses functional labels — elevate
  - "All Tiers" → "All Protocols"
  - "Best Sellers" → "Most Practised"
  - Filter section heading: "Refine by protocol" (not "Filter")
  - "Showing X of Y formulations" → "X formulations in this protocol"
  - "No formulations found" → "No formulations match this selection. Explore all collections →"

- Product card copy: ensure cards show subscription invite price ("From £X/month") not just retail price

**Acceptance criteria:**
- Shop has a brand hero/intro section
- Filter labels use brand voice
- "No results" state is on-brand
- Product cards show monthly price for subscription

---

### PHASE 5 — Account Dashboard

**Goal:** Build the logged-in account experience. Currently placeholder or missing.

**Files:**
- `apps/web/app/account/page.tsx` — dashboard overview
- `apps/web/app/account/orders/page.tsx` — order history (may exist, needs Stripe wiring)
- `apps/web/app/account/subscription/page.tsx` — NEW: manage subscription

**Account dashboard spec:**
- Greeting: "Welcome back, [Name]. Your ritual awaits."
- Cards: Active Subscription, Next Shipment, Loyalty Points (iv Circle), Past Orders
- Subscription card: shows current protocol, next billing date, "Pause" / "Cancel" options
- Loyalty card: points balance, next reward tier, "How to earn more"
- Orders: list from Stripe Customer portal or webhook-stored orders

**Acceptance criteria:**
- Authenticated users see their name, subscription status, order count
- Orders list pulls from Stripe (via customer ID stored on user record)

---

### PHASE 6 — Email Flows via Resend

**Goal:** Transactional emails that maintain brand voice. Currently no emails are sent.

**Files:**
- `apps/web/lib/email.ts` — NEW: Resend client + template functions
- `apps/web/app/api/auth/register/route.ts` — trigger welcome email on registration
- `apps/web/app/api/webhooks/route.ts` — trigger order confirmation on `checkout.session.completed`

**Emails to build (in priority order):**

1. **Welcome email** (on registration)
   - Subject: "Your ritual begins, [Name]"
   - Body: La Bella Figura welcome, link to skin consultation, link to shop
   - From: `ritual@isolavitale.com`

2. **Order confirmation** (on `checkout.session.completed`)
   - Subject: "Your ritual is on its way"
   - Body: Order summary, estimated delivery, ritual instructions ("Begin with the cleanser each morning")
   - Include: subscription details if applicable ("Your next ritual ships [date]")

3. **Subscription renewal reminder** (on `invoice.upcoming` — 3 days before)
   - Subject: "Your ritual renews in 3 days"
   - Body: What's being shipped, option to pause/skip

4. **Subscription renewal confirmation** (on `invoice.paid`)
   - Subject: "Your ritual is on its way again"

**Template standard:** All email HTML must use brand fonts (web-safe fallbacks: Georgia, serif), `#1A1614` background, `#913832` gold accent, Italian-inflected copy.

**Acceptance criteria:**
- Welcome email sent on new registration
- Order confirmation sent on Stripe webhook
- No generic "Order #12345 confirmed" subject lines — all use brand voice

---

### PHASE 7 — iv Circle Loyalty Program

**Goal:** Build the loyalty mechanics referenced in navigation and registration benefits.

**File:** `apps/web/app/loyalty/page.tsx` — may already exist, verify and build if not

**Spec:**
- Points: 1 point per £1 spent. Subscription earns 2× points.
- Tiers: Acqua (0–499), Verde (500–1999), Oro (2000+)
- Redemption: 100 points = £1 off
- Earn events: purchase, referral, consultation completion, review submission
- Points stored on user record (JSON for dev, DB for prod)

**Page sections:**
- Current tier badge + points balance
- Points history (earn/redeem log)
- How to earn more (checklist with earn values)
- Redeem: input to apply points at checkout

**Acceptance criteria:**
- Points balance visible on account dashboard
- Points earned on order completion (via webhook)
- Points redeemable at checkout as discount

---

### PHASE 8 — Forgot Password Flow

**Goal:** `/forgot-password` currently returns 404. Linked from login page.

**Files:**
- `apps/web/app/forgot-password/page.tsx` — email input form
- `apps/web/app/reset-password/page.tsx` — new password form (receives token)
- `apps/web/app/api/auth/forgot-password/route.ts` — generate token, send email
- `apps/web/app/api/auth/reset-password/route.ts` — verify token, update password

**Flow:**
1. User enters email → POST to `/api/auth/forgot-password`
2. API generates `crypto.randomUUID()` token, stores on user record with 1hr expiry
3. Resend email with link: `https://[domain]/reset-password?token=[token]`
4. User clicks link → lands on `/reset-password` → enters new password
5. API verifies token not expired → `bcrypt.hash()` new password → clear token

**Acceptance criteria:**
- Forgot password link from login page works
- Email delivered with reset link
- Password successfully updated
- Token expires after 1 hour

---

### PHASE 9 — Production Infrastructure

**Goal:** Replace dev JSON stores with production-grade persistence.

**Not for current sprint — document the migration path only.**

**Migration path:**
1. Prisma schema (`prisma/schema.prisma`) — already has User, Order, Product models — activate
2. `DATABASE_URL` in `.env.local` → PostgreSQL (Railway, Supabase, or Neon)
3. Replace `lib/user-store.ts` (fs-based) with Prisma client calls
4. Replace `lib/product-store.ts` (fs-based) with Prisma client calls
5. Cart persistence: move from sessionStorage to DB for logged-in users
6. Stripe Customer ID: store on user record after first order

---

## Current Sprint — Active Work

**Phase 0 is approved for immediate execution.**
Phases 1–8 require approval before starting.

Phase 0 tasks:
- [ ] Fix cart-drawer.tsx: remove penalty language, replace with Langer-compliant invitation
- [ ] Fix buy-box.tsx: remove penalty language, replace with Langer-compliant invitation

---

## Authentication Architecture

### Two separate auth portals

| Portal | Route | Role | Access |
|---|---|---|---|
| Consumer | `/login` | `CUSTOMER` | Shop, account, wishlist |
| Professional / B2B | `/login/professional` | `PROFESSIONAL` / `ADMIN` / `OWNER` | Full catalog incl. Clinical A-Series, wholesale pricing |

### Registration flows

**Consumer:** `/register` → `POST /api/auth/register` (`accountType: 'personal'`) → role `CUSTOMER`
**B2B:** `/register/professional` → `POST /api/auth/register` (`accountType: 'business'`) → role `PROFESSIONAL`

### Login flow

1. `signIn('credentials', { email, password })` via NextAuth
2. `lib/auth.ts` `authorize()` reads `data/users.json` directly — no HTTP roundtrip
3. `bcrypt.compare()` verifies password
4. JWT issued with `{ id, email, name, role }`

### Key auth files

| File | Purpose |
|---|---|
| `apps/web/lib/auth.ts` | NextAuth config — self-contained authorize, no user-store import |
| `apps/web/lib/user-store.ts` | Shared user CRUD for API routes |
| `apps/web/app/api/auth/register/route.ts` | Registration endpoint |
| `apps/web/app/api/auth/[...nextauth]/route.ts` | NextAuth handler |
| `apps/web/data/users.json` | Dev user store — format: `{ "users": [...] }` |
| `apps/web/app/login/page.tsx` | Consumer login |
| `apps/web/app/login/professional/page.tsx` | B2B login (Phase 3) |

### Admin account (seeded)

- Email: `admin@isolavitale.com`
- Password: `IsolaAdmin2024!`
- Role: `OWNER`

---

## Product & Tier System

Products defined in `apps/web/lib/products.ts`. Live catalog served from `data/products.json`.

| Tier slug | Protocol name | Audience | Portal |
|---|---|---|---|
| `t1` | Preservation Protocol | Consumer — early prevention | Consumer |
| `t2` | Refinement Protocol | Consumer — early correction | Consumer |
| `t3` | Restoration Protocol | Consumer — active restoration | Consumer |
| `t4` | Longevity Protocol | Consumer — maximum potency | Consumer |
| `clinical` | A-Series | B2B / professional ONLY | B2B (role-gated, Phase 3) |
| `consumer` | B-Series | General consumer | Consumer |
| `best-seller` | Hero SKUs | Cross-tier | Both |

**Product separation rule:** `clinical` tier products are ONLY visible/purchasable when `session.user.role` is `PROFESSIONAL`, `ADMIN`, or `OWNER`. Consumer users see a teaser but cannot add to cart or see pricing.

---

## Cart & Checkout Architecture

### Cart drawer (`components/layout/cart-drawer.tsx`)

Built:
- Subscribe & Save toggle — subscription is default/featured (left tab)
- Invitation language when one-time selected (Phase 0 fix pending)
- Free shipping bar (unlocks at $200)
- Cross-sell suggestions (1 complementary product per cart item)
- Welcome kit reveal (shown when subscribed)
- Trust badges
- Quantity controls

### Checkout page (`app/checkout/page.tsx`)

Target state (Phase 2):
- `bg-iv-black` throughout — brand palette, not generic gray
- "Complete Your Ritual" heading
- Subscription membership badge visible in summary
- Stripe Elements embedded (no hosted redirect)
- Apple Pay / Google Pay via Payment Request Button
- All form labels use brand voice copy (see Phase 2 spec)

### Stripe integration

| Mode | When | File |
|---|---|---|
| `payment` | All items one-time | `app/api/checkout/route.ts` |
| `subscription` | Any item subscribed | `app/api/checkout/route.ts` (Phase 1) |
| Webhook | Fulfillment + email triggers | `app/api/webhooks/route.ts` (Phase 1) |

---

## Subscription Pricing Model

| Purchase type | Price | Stripe mode | UX framing |
|---|---|---|---|
| Subscribe (default) | −20% of retail | `subscription` | Featured, first, green savings banner |
| One-time | Full retail | `payment` | Secondary, invitation to subscribe shown |

**Copy rule for subscription default:**
- Cart/buy-box default state: subscription selected
- When one-time chosen: show invitation (not penalty) to return to subscription
- Language: "Subscribers receive this for £X less — and their ritual arrives before they run out"
- Annual saving calculation: always show yearly figure to amplify value

---

## Design System

### Colour tokens (`apps/web/app/globals.css`)

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
--iv-black resolves to #FDFAF5 (warm ivory)
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
- Never use red for errors — use `rgba(145,56,50,0.8)` (gold-red) as it stays on-brand

### Scroll reveal animations

`data-reveal="iv-reveal-up"` + `style={{ opacity: 0 }}` on any element.
Classes: `iv-reveal-up`, `iv-reveal-fade`, `iv-reveal-left`, `iv-reveal-right`, `iv-scale-in`, `iv-word-in`

---

## Next.js App Router Rules

- `'use client'` and `export const metadata` are mutually exclusive
- `useSearchParams()` requires `<Suspense>` wrapper
- Stale build cache → `rm -rf apps/web/.next`

---

## Common Patterns

### Inline style vs Tailwind
Use Tailwind for layout. Use inline `style` for `var(--iv-*)` tokens.

### Currency
Consumer: GBP (£). B2B/Clinical: USD ($). Use `Intl.NumberFormat`.

### Error states
All error messages must maintain brand voice. No generic "Something went wrong."
Example: "We couldn't process your order. Our concierge team is available at [phone]."

---

## Production Launch Checklist

### ✅ COMPLETE

- [x] Brand narrative — La Bella Figura, Isola del Liri, Italian positioning sitewide
- [x] Shanill House removed sitewide (trademark risk)
- [x] Navigation streamlined
- [x] 4 protocols renamed — no age brackets anywhere
- [x] Font consistency — Cormorant Garamond via CSS variables globally
- [x] Admin product management — full CRUD, image upload, drag-drop
- [x] Product store — live JSON, admin edits appear on storefront immediately
- [x] Auth fix — no HTTP roundtrip, direct bcrypt verify, self-contained authorize()
- [x] Cart drawer — subscribe-first toggle, shipping bar, cross-sell, welcome kit
- [x] Stripe checkout API — one-time payment mode
- [x] Shop filtering — tier, collection, format
- [x] Skin consultation — 8Q Baumann scoring, tier assignment
- [x] All brand pages — about, science, clinical-results, routines, system/ritual
- [x] Subscription-first default — items added to cart default to isSubscription: true

### 🔴 BLOCKS LAUNCH

- [ ] **Phase 0** — Fix penalty language in cart-drawer + buy-box (Langer violation)
- [ ] **Phase 1** — Stripe subscription mode (`mode: 'subscription'` with Price IDs)
- [ ] **Phase 1** — Stripe webhook complete (order confirmation, subscription events)
- [ ] **Phase 2** — Checkout page redesign (currently 35/100 Langer compliance, must reach 85+)
- [ ] **Phase 3** — B2B Professional login page (`/login/professional`)
- [ ] **Phase 3** — B2B product gating (clinical A-Series hidden from CUSTOMER role)
- [ ] **Phase 8** — Forgot password page (`/forgot-password` — currently 404, linked from login)

### 🟡 BEFORE LAUNCH

- [ ] **Phase 4** — Shop page Langer compliance (hero section, brand copy, filter labels)
- [ ] **Phase 5** — Account dashboard (subscription status, order history, loyalty points)
- [ ] **Phase 6** — Email flows via Resend (welcome, order confirmation, renewal)
- [ ] NEXTAUTH_URL set to production domain
- [ ] Stripe keys switched from test to live

### 🟢 POST-LAUNCH

- [ ] **Phase 7** — iv Circle loyalty program (points, tiers, redemption)
- [ ] **Phase 9** — PostgreSQL migration (replace JSON stores)
- [ ] Prisma schema activation
- [ ] Skin consultation results saved to user profile
- [ ] B2B Net-30 invoicing (Stripe Invoice mode)
- [ ] Analytics dashboard
- [ ] Press / journal CMS

---

## Environment Variables (`.env.local`)

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=iv-dev-secret-change-in-production

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=              # set from Stripe dashboard

RESEND_API_KEY=                     # add from resend.com

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
| Register (consumer) | `app/register/page.tsx` |
| Register (B2B) | `app/register/professional/page.tsx` |
| Forgot password | `app/forgot-password/page.tsx` |
| Reset password | `app/reset-password/page.tsx` |
| Auth config | `lib/auth.ts` |
| User store | `lib/user-store.ts` |
| Product store | `lib/product-store.ts` |
| Products seed | `lib/products.ts` |
| Stripe price map | `lib/stripe-prices.ts` |
| Email client | `lib/email.ts` |
| Admin products | `app/admin/products/page.tsx` |
| Admin layout | `app/admin/layout.tsx` |
| Shop | `app/shop/page.tsx` |
| System/Ritual | `app/system/page.tsx` |
| About | `app/about/page.tsx` |
| Professional/B2B | `app/professional/page.tsx` |
| Account dashboard | `app/account/page.tsx` |
| Account orders | `app/account/orders/page.tsx` |
| Account subscription | `app/account/subscription/page.tsx` |
| Loyalty (iv Circle) | `app/loyalty/page.tsx` |
| Globals CSS | `app/globals.css` |
