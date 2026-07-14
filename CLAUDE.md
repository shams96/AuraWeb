# CLAUDE.md — Isola Vitale
# Engineering Master Document — Single Source of Truth

Last updated: 2026-06-13. Keep this file current after every significant change.

---

## Rule #1 — Non-Negotiable

**Every change must cause zero adverse effects on existing working parts.**
Before touching any file, identify what depends on it. After every change, verify no regressions.
Never silently remove or rename anything that another file imports.

**Engineering Rule:** Plan → Document → Approve → Execute. Never jump to edits without a written plan in this file first.

---

## Repository Layout

```
IsolaVitale/
├── apps/
│   ├── web/              # Next.js 14 storefront — primary working app
│   └── api/              # Separate API server (not currently active)
├── packages/
│   └── ui/               # Shared component library (@isolavitale/ui)
├── BRAND-BIBLE.md        # Complete brand standard — voice, protocols, copy rules, visual language
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
git remote set-url origin http://local_proxy@127.0.0.1:44151/git/shams96/AuraWeb
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
| UI primitives | `@isolavitale/ui` (packages/ui) |
| Animations | Pure IntersectionObserver + CSS keyframes |

---

## Brand Identity

**Brand:** LIRI ROMA — The House of Liri™ (renamed from Isola Vitale, 2026-07; the old name is retired — see BRAND-BIBLE.md "Legacy names")
**Wordmark lockup:** LIRI ROMA sets on ONE line everywhere, with one uniform treatment across all placements — never stacked, never restyled per-page.
**Monogram:** **RL** (not LR — owner-confirmed 2026-07-13). See BRAND-BIBLE.md for cap-mark and provenance-seal specs.
**Philosophy:** La Bella Figura — the Italian practice of living beautifully
**Positioning:** Italy owns luxury beauty (Gucci, Prada, Armani, Santa Maria Novella). LIRI ROMA draws from that inheritance. Science is proof, not pitch. Ritual replaces protocol. Emotion leads, ingredients follow.
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

### PHASE 0 — Immediate Corrections ✅ COMPLETE

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

### PHASE 1 — Subscription Infrastructure ✅ COMPLETE

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

### PHASE 2 — Checkout Page Redesign ✅ COMPLETE

**Goal:** Replace the generic checkout page with a luxury-grade, on-brand experience.

**File:** `apps/web/app/checkout/page.tsx`

**Design spec (as shipped):**
- Background: light ivory/parchment (`#FDFAF5`) — brand owner confirmed light theme for all transactional pages. Dark checkout is explicitly rejected.
- Two-column layout on desktop: form left, order summary right (sticky)
- Single-column on mobile

**Copy spec (Langer-compliant, as shipped):**
- Page title: "Complete Your Ritual"
- Email field label: "We will reach you at"
- Shipping section heading: "Where your ritual will arrive"
- Submit button: "Complete My Ritual — ${total}"
- Trust strip: "90-Day Guarantee · Free Returns · EU GMP Certified · Cancel Anytime"

**Payment architecture (as shipped):**
- Stripe Hosted Checkout — redirect to Stripe's page after "Complete My Ritual" is clicked
- Apple Pay / Google Pay provided natively by Stripe Hosted page — no Payment Request Button needed
- Success redirect: `/success` page (contains "View My Orders" CTA for authenticated users)
- This is a deliberate architecture choice: PCI surface is Stripe's, not ours

**Architecture note:** Embedded Stripe Elements (in-page card form) is a future optional enhancement. The hosted redirect is simpler, fully functional, and PCI-minimal. Do not change unless explicitly instructed.

---

### PHASE 3 — B2B Professional Login + Product Gating ✅ COMPLETE

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

### PHASE 4 — Shop Page Langer Compliance ✅ COMPLETE

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

### PHASE 5 — Account Dashboard ✅ COMPLETE

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

### PHASE 6 — Email Flows via Resend ✅ COMPLETE

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

### PHASE 7 — iv Circle Loyalty Program ✅ COMPLETE

**Goal:** Build the loyalty mechanics referenced in navigation and registration benefits.

**File:** `apps/web/app/loyalty/page.tsx` — may already exist, verify and build if not

**Spec:**
- Points: 1 point per $1 spent. Subscription orders earn 2× points (double the base rate).
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

### PHASE 8 — Forgot Password Flow ✅ COMPLETE

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

### PHASE 9 — Production Infrastructure ⚙️ PRISMA WIRED, NOT YET ACTIVE

**Goal:** Replace dev JSON stores with production-grade persistence.

**Current state:** Prisma client is wired (`lib/prisma.ts`) and the webhook uses it conditionally with a graceful JSON fallback when `DATABASE_URL` is absent. The JSON stores (`data/users.json`, `data/products.json`) remain the live data layer until `DATABASE_URL` is set in production.

**To activate:** Set `DATABASE_URL` in `.env.local` (or production env) → run `npx prisma migrate deploy` → JSON fallbacks will be bypassed automatically.

**Migration path:**
1. Prisma schema (`prisma/schema.prisma`) — already has User, Order, Product models — activate
2. `DATABASE_URL` in `.env.local` → PostgreSQL (Railway, Supabase, or Neon)
3. Replace `lib/user-store.ts` (fs-based) with Prisma client calls
4. Replace `lib/product-store.ts` (fs-based) with Prisma client calls
5. Cart persistence: move from sessionStorage to DB for logged-in users
6. Stripe Customer ID: store on user record after first order

---

### PHASE 10 — Customer Referral Program (iv Ambassador)

**Goal:** Transform existing customers into brand ambassadors through a structured incentive system.

**Eligibility:** All registered users who have (a) made a purchase AND (b) submitted a 5-star review OR shared on social media.

**Reward mechanics:**
- Referrer receives 10% discount on their next purchase when a referee converts
- Referee gets a welcome discount on first purchase (to be determined — suggest 10%)
- Points also credited to iv Circle loyalty balance

**User journey:**

*Referrer path:*
1. Eligible user visits `/account/referrals` → sees unique referral link + share buttons
2. Shares link (copy, Twitter/X, WhatsApp)
3. Tracks referrals: pending (clicked), converted (purchased), rewarded (discount applied)
4. On conversion: email notification + discount code applied automatically to account
5. At checkout: discount surfaced as "Ambassador reward — 10% off this order"

*Referee path:*
1. Clicks referral link → lands on homepage with `?ref=[code]` param
2. Cookie set (`iv_ref`, 30-day expiry) for attribution
3. Signs up → referral code stored on user record
4. Makes first purchase → conversion triggers referrer reward

**Technical architecture:**

*Database additions (Phase 9 Prisma migration):*
```
model Referral {
  id          String   @id @default(cuid())
  referrerId  String                         // User who shared
  refereeId   String?                        // User who converted (null until signup)
  code        String   @unique               // 8-char alphanumeric
  status      ReferralStatus @default(PENDING) // PENDING | CONVERTED | REWARDED
  rewardCode  String?                        // Stripe promo code issued on conversion
  createdAt   DateTime @default(now())
  convertedAt DateTime?
  expiresAt   DateTime                       // 90 days from creation
}
```

*New API routes:*
- `GET /api/referral/link` — returns or creates referral code for authenticated user
- `POST /api/referral/track` — called on signup when `?ref=` param present; stores attribution
- `POST /api/referral/convert` — called from webhook on first purchase; issues reward

*Link generation:* `crypto.randomBytes(4).toString('hex')` → 8-char code, stored in DB

*Attribution:* `?ref=[code]` → middleware sets `iv_ref` cookie (30 days) → on registration, API reads cookie and stores referral record

*Reward issuance:* Stripe promo code created via API (`stripe.promotionCodes.create`) with 10% off, customer-specific, one-time use

**UI components needed:**
- `/account/referrals` page — link display, share buttons, stats table (clicks, conversions, rewards earned)
- Checkout: "Ambassador reward applied — −10%" line in order summary
- Email: "Someone just used your referral link" + "Your reward is ready" notifications

**Fraud prevention:**
- Self-referral blocked: referee email cannot match referrer email
- Same-device block: if referee IP matches referrer session within 10 min, flag for review
- One reward per unique referee conversion (not per order)
- Discount codes are single-use and customer-specific in Stripe

**Edge cases:**
- Referee returns/refunds order → reward code issued but not yet used: code revoked
- Referral link expires after 90 days → new link auto-generated on next visit
- Referrer account deleted → orphaned referrals archived, not rewarded

**Acceptance criteria:**
- Unique referral link generated per eligible user
- Cookie-based attribution survives page refresh and browser navigation
- Referrer notified by email on conversion
- 10% Stripe promo code applied automatically, visible at checkout
- Self-referral and duplicate conversion blocked

**Status: CODE COMPLETE — not yet in production.** All routes, UI, store, and email templates are built. Not live pending Prisma migration (Phase 9 activation).

---

## Current Sprint — Status

All phases 0–9 code complete. Awaiting go-live env var configuration (Stripe live keys, NEXTAUTH_URL, RESEND_API_KEY, DATABASE_URL).

| Phase | Status |
|---|---|
| Phase 0 — Langer copy fix | ✅ Complete |
| Phase 1 — Stripe subscription | ✅ Complete |
| Phase 2 — Checkout redesign | ✅ Complete |
| Phase 3 — B2B login + gating | ✅ Complete |
| Phase 4 — Shop compliance | ✅ Complete |
| Phase 5 — Account dashboard | ✅ Complete |
| Phase 6 — Email flows | ✅ Complete |
| Phase 7 — iv Circle loyalty | ✅ Complete |
| Phase 8 — Forgot password | ✅ Complete |
| Phase 9 — Production DB | ⚙️ Prisma wired; inactive without DATABASE_URL; JSON stores are live data layer |
| Phase 10 — Referral program | ⚙️ Code built; not in production (needs Phase 9 DB) |

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
| `t3` | Regeneration Protocol | Consumer — active regeneration | Consumer |
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

### Colour system — two-tier light/dark (`apps/web/app/globals.css`)

**The site is light-first by default.** The `:root` values resolve to the light ivory palette. Brand sections that need dark treatment use the `.iv-dark` class (applied via `data-theme="dark"` or explicit `.iv-dark` wrapper), which overrides tokens back to dark values.

**NEVER hardcode hex values — always use CSS variables.**

#### `:root` values (default — light ivory theme)

```
--iv-black         #FDFAF5   Page background (warm ivory)
--iv-white         #1A1614   Headings / primary text (charcoal)
--iv-cream         #3D2B20   Body text (warm espresso)
--iv-gold          #913832   Brand accent (the "red-gold") — unchanged
--iv-deep-green    #F4EAE2   Card/surface backgrounds (warm parchment)
--iv-champagne     #FAD6C9   Light peach accent
--iv-deep-peacock  #005A5B   Men's line accent
--iv-text-muted    #7A5C4E   Muted text (warm taupe)
```

#### `.iv-dark` override (dark luxury theme — brand/editorial pages)

```
--iv-black         #1A1614   Dark background
--iv-white         #FDFAF5   Light text
--iv-cream         #FAF6EE   Secondary text
--iv-deep-green    #0F2419   Dark card surfaces
--iv-formal-garden #1F5129   Mid-tone green
--iv-text-muted    rgba(253,250,245,0.45)
```

#### Page-level theme rule

| Page type | Theme | Rationale |
|---|---|---|
| Brand/editorial (homepage, about, system, science, shop, journal, loyalty) | `.iv-dark` | Luxury house presence |
| Transactional (checkout, login, register, account, success, forgot-password) | Default (light ivory) | Brand owner instruction: no dark on transactional pages |

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
**USD ($) sitewide** — both consumer and B2B/Clinical. Brand owner decision (HQ Allen, Texas). Use `Intl.NumberFormat` for formatting.

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

### ✅ CODE COMPLETE — All phases shipped

All pages built and verified clean. Remaining items are env-var configuration only.

### 🔴 ENV VARS REQUIRED FOR GO-LIVE

- [ ] `NEXTAUTH_URL` — set to production domain (e.g. `https://isolavitale.com`)
- [ ] `NEXTAUTH_SECRET` — rotate to a strong random secret
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — switch to Stripe live key
- [ ] `STRIPE_SECRET_KEY` — switch to Stripe live key
- [ ] `STRIPE_WEBHOOK_SECRET` — register production webhook in Stripe dashboard
- [ ] `RESEND_API_KEY` — add from resend.com (welcome/order/renewal emails)
- [ ] `DATABASE_URL` — PostgreSQL connection string (activates Prisma; JSON fallback works without it)

### 🟡 POST-LAUNCH (optional enhancements)

- [ ] Skin consultation results saved to user profile
- [ ] B2B Net-30 invoicing (Stripe Invoice mode)
- [ ] Analytics dashboard
- [ ] Press / journal CMS
- [ ] **Phase 10** — Referral program (fully documented in roadmap, postponed)

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
NEXTAUTH_URL=http://localhost:5000
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
| Stripe webhook | `app/api/webhooks/stripe/route.ts` — **URL: `/api/webhooks/stripe`** (register this exact path in Stripe dashboard) |
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
| Email client + sender | `lib/resend.ts` (Resend client, FROM_EMAIL = `ritual@isolavitale.com`) |
| Email templates | `lib/email-templates.ts` (welcome, order confirmation, renewal reminder, referral reward) |
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

---

## PERMANENT BUILD SPECIFICATION — Isola Vitale™ Digital Flagship

> Added: 2026-06-13. This section is the canonical architectural constitution for all future development.

---

### Platform Vision

This website is not a temporary marketing website. It is the digital flagship of ISOLA VITALE™ and must support:

- Direct-to-Consumer (Launch)
- Future B2B Platform
- Future Clinic Portal
- Future Mobile Applications
- Future International Expansion
- Future Professional Education Platform
- Future APIs and Integrations

**Build once. Scale progressively. Avoid premature complexity. Avoid rebuilding.**

---

### Implementation Principles

#### Entity-First Architecture (CTO Directive)

Build the database and CMS around **entities**, not pages.

| Entity | Notes |
|---|---|
| Technologies | Skin Intelligence™ technology entries |
| Protocols | T1–T4 + Clinical A-Series |
| Products | Full catalog with variants |
| Journal Articles | Editorial content |
| FAQs | Structured Q&A |
| Testimonials | Customer + clinical reviews |
| Media Assets | Images, video, PDF, icons |
| Assessments | Skin consultation questions + scoring rules |
| Reports | My Vitale Report™ output |

Pages render entities. Entities do not live inside pages.

This single decision enables: mobile apps, clinic portal, B2B dashboard, multilingual sites, AI concierge — without expensive rewrites.

---

### Deployment Philosophy

Optimize for: low cost at launch · high flexibility · incremental scalability · simplicity · performance · maintainability

**Launch stack (do not deviate):**

| Layer | Technology |
|---|---|
| Hosting | Hostinger VPS |
| Source control | GitHub |
| CI/CD | GitHub Actions |
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| ORM | Prisma |
| Database | PostgreSQL |
| CDN/DNS | Cloudflare Free |
| Payments | Stripe |
| Email | Resend |
| Media | Cloudflare R2 or Hostinger storage |

**Never introduce (without explicit founder instruction):**
- AWS microservices
- Kubernetes
- Docker orchestration
- Enterprise message queues
- Overengineered abstractions

Architect so components can migrate to enterprise infrastructure without major rewrites.

---

### Content Management System

The website must be fully editable by non-technical users. No code changes required for normal content updates.

**CMS must support editing of:**
- Homepage sections
- Collections and product information
- Journal / blog articles
- Protocol pages
- Technology / science pages
- FAQ entries
- Testimonials
- Navigation and footer
- Legal pages (Privacy, Terms, Shipping, Returns)
- SEO metadata (title, description, OG image) per page and per entity
- Structured data / schema.org markup

**CMS must include:**
- Rich text editor (headings, bold, italic, links, lists, blockquote)
- Image upload and selection from media library
- Video embed and upload
- PDF upload and link
- Draft / Preview / Published states
- Scheduled publishing
- Version history with rollback
- Slug management

**CMS must NOT require:**
- Developer to deploy a content change
- Code review for text edits
- Rebuild for editorial changes (use ISR or on-demand revalidation)

---

### SEO — Built In, Not Bolted On

SEO is a first-class architectural concern, not a plugin.

**Technical SEO requirements:**

| Requirement | Implementation |
|---|---|
| Dynamic `<title>` and `<meta description>` | Per-page and per-entity, editable in CMS |
| Open Graph tags | og:title, og:description, og:image per page |
| Twitter/X card tags | summary_large_image on all content pages |
| Canonical URLs | Automatic, no duplicate content |
| Structured data | Product, Article, FAQ, BreadcrumbList, Organization schema.org |
| XML sitemap | Auto-generated at `/sitemap.xml`, updated on publish |
| Robots.txt | Served at `/robots.txt`, configurable per environment |
| Hreflang tags | Required when i18n launches (US/GCC/EU) |
| Core Web Vitals | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| Image optimization | Next.js Image component, WebP/AVIF, lazy load, explicit width/height |
| Heading hierarchy | Single H1 per page, logical H2/H3 cascade |
| Internal linking | Protocol pages link to products; journal links to protocols |
| Breadcrumbs | On all product, protocol, and article pages |
| 404 handling | On-brand 404 page, no broken internal links |
| Redirect management | 301 redirects manageable without code deploy |

**Content SEO rules:**
- Every product has unique meta title, meta description, and OG image — editable in admin
- Every journal article has slug, meta title, meta description, featured image — editable in CMS
- Every protocol page has structured data (MedicalWebPage or equivalent)
- FAQ pages use FAQPage schema.org markup
- No thin pages — every page has meaningful unique content
- Product pages include review schema when reviews exist

**SEO fields required on every entity:**
```
seoTitle        String?   // Falls back to name if null
seoDescription  String?   // Falls back to shortDescription if null
ogImage         String?   // Falls back to primary image if null
canonicalUrl    String?   // Override if needed (e.g. international variants)
noIndex         Boolean   @default(false)  // For staging/private pages
```

**Sitemap architecture:**
- `/sitemap.xml` — index sitemap
- `/sitemap/pages.xml` — static pages
- `/sitemap/products.xml` — all active products
- `/sitemap/journal.xml` — all published articles
- `/sitemap/protocols.xml` — all protocol pages
- Revalidate on publish via webhook or on-demand ISR

---

### Media Management

Centralized media library — not per-component uploads.

**Support:** images · video · PDF · icons · documents · downloadable resources

**Requirements:**
- Upload from admin, auto-optimize on ingest
- Auto-generate WebP and AVIF variants
- Responsive srcset generation
- Alt text required field (accessibility + SEO)
- Asset tagging and search
- Asset reuse across pages and products
- Usage tracking (which pages reference an asset)

---

### Role-Based Access Control

| Role | Permissions |
|---|---|
| Owner / Founder | Full access — all settings, all data, all permissions |
| Administrator | All except destructive operations (delete all, reset DB) |
| Marketing Manager | Edit pages, media, promotions, SEO. Cannot modify permissions or products |
| Content Editor | Edit content (text, images, articles, FAQs). Cannot publish products or modify prices |
| Customer Support | View orders, process refunds, view customer accounts. Cannot edit content |
| Future B2B Manager | B2B module access only (future) |
| Future Educator | Education module access only (future) |

Permissions are granular. New roles can be added without code changes.

---

### Customer-Facing Features

**Launch requirements (all built):**
Homepage · Collections · Products · Journal · Science Center · Protocols · Skin Intelligence · Contact · FAQ · About

**Customer accounts:**
Registration · Login · Password Reset · Email Verification · Profile Management · Address Book · Order History · Wishlist · Saved Assessments · Saved Reports · Communication Preferences

---

### Vitale Skin Intelligence™ — Modular Architecture

**Phase 1 (build now with clean foundations):**
- Questionnaire Engine — questions, types, branching logic
- Rule Engine — scoring rules per answer
- Scoring Engine — weighted aggregate score
- Protocol Assignment — score → T1/T2/T3/T4 mapping
- Technology Recommendations — protocol → active technologies
- Product Recommendations — protocol + skin concerns → product list
- My Vitale Report™ — branded PDF/web output

**Phase 2 (architect for, do not build):**
- Longitudinal tracking — compare reports over time
- Image analysis — selfie-based skin assessment

**Phase 3 (do not architect yet):**
- LLM integration
- ML personalization

Do not overengineer Phase 1. Build the data model so Phase 2 can extend it without migration.

---

### Internationalization

Prepare for: United States · GCC (UAE, Saudi) · Europe (UK, DE, FR)

**Architecture requirements:**
- All user-facing strings via i18n keys — no hardcoded English in components
- Currency: multi-currency support via locale context (USD, AED, GBP, EUR)
- Locale routing: `/en`, `/ar`, `/en-gb`, `/de` — use Next.js i18n routing
- RTL support: Arabic requires `dir="rtl"` — Tailwind has RTL utilities
- Regional pricing: price overrides per locale stored in DB
- Regional tax rules: configurable per country
- Regional shipping: rules stored in DB, not hardcoded

Do not hardcode: currency symbols · date formats · phone formats · address formats

---

### Analytics — Event Architecture

Implement event tracking from day one. Schema must scale.

**Core events to track:**

| Event | Trigger |
|---|---|
| `page_view` | Every page load |
| `scroll_depth` | 25%, 50%, 75%, 100% |
| `cta_click` | Every CTA button |
| `assessment_start` | Skin quiz opens |
| `assessment_complete` | Quiz submitted |
| `protocol_assigned` | Protocol result shown |
| `product_view` | PDP viewed |
| `add_to_cart` | Item added |
| `checkout_start` | Checkout opened |
| `purchase` | Order confirmed |
| `email_signup` | Newsletter / waitlist |
| `referral_click` | Referral link clicked |
| `referral_convert` | Referee purchases |
| `journal_read` | Article viewed > 30s |
| `search_query` | Search performed |

Events stored in DB for internal analytics. Also forward to GA4 or PostHog via server-side event sink (no client-side tracking bloat).

---

### Feature Flags

Feature flags allow gradual rollout without code deploys.

**Flags required:**

| Flag | Controls |
|---|---|
| `feature_assessment` | Enable/disable skin quiz |
| `feature_journal` | Enable/disable journal section |
| `feature_community` | Enable/disable community features |
| `feature_referrals` | Enable/disable referral program |
| `feature_b2b` | Enable/disable B2B portal |
| `feature_loyalty` | Enable/disable iv Circle |
| `feature_reviews` | Enable/disable product reviews |
| `feature_waitlist` | Show waitlist instead of buy button |

Flags stored in DB. Editable in admin without code deploy. Support per-role overrides (e.g. `feature_b2b` on for PROFESSIONAL role even if globally off).

---

### Search

**Launch:**
- Site search across products, journal, FAQs, protocols
- Filter by: type · protocol · tag

**Architecture:**
- Meilisearch (already in stack) — index all entities on publish
- Search index updated via webhook on content change
- Prepare schema for semantic/vector search upgrade (embedding field on entities)

---

### Future B2B Architecture

Do not build B2B now. Architect so it does not require migration.

**DB models must be extensible for:**
- `Organization` model (clinic, practice, retailer)
- `ProfessionalAccount` linking User → Organization
- `WholesalePrice` — product price overrides per organization tier
- `PurchaseOrder` — net-30 invoicing
- `EducationCourse`, `Certification`, `TrainingModule`
- `ClinicReport` — diagnostic reports tied to practitioner

Current `User.role = PROFESSIONAL` is the seed. Do not collapse B2B into consumer flows.

---

### AI Safety Directive

If information is missing:

1. Search attached documents
2. Search existing codebase
3. Search configuration files
4. Search content files

If still unresolved — **DO NOT INVENT.**

Flag the issue. Provide:
- Option A (with pros, cons, trade-offs)
- Option B (with pros, cons, trade-offs)
- Option C (with pros, cons, trade-offs)

**Never:**
- Silently create new brand systems
- Silently introduce new terminology
- Silently reinterpret ISOLA VITALE™
- Invent copy, product names, or brand claims
- Add features not requested

Responsibility: **implementation fidelity**, not creative reinvention.

---

### Final Deliverables Standard

Before any major implementation phase, generate:
- `CHANGELOG.md` — what changed and why
- `ARCHITECTURE_AUDIT.md` — current state vs. spec gaps
- `BRAND_COMPLIANCE_REPORT.md` — Langer doctrine compliance

After implementation, generate:
- `FINAL_AUDIT.md` with scores:
  - Brand Fidelity Score
  - Luxury Experience Score
  - Conversion Score
  - Performance Score
  - Accessibility Score
  - SEO Score
  - Constitution Compliance Score
  - Future Readiness Score
