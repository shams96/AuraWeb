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
├── data/                 # JSON file store (users.json — dev auth)
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
| User store | `apps/web/data/users.json` (dev; no PostgreSQL required) |
| Icons | Lucide React |
| UI primitives | `@aurabiosphere/ui` (packages/ui) |
| Animations | Pure IntersectionObserver + CSS keyframes |

---

## Design System

### Colour tokens (defined in `apps/web/app/globals.css`)

All colours must use CSS variables — never hardcode hex values.

```
--iv-black         #1A1614   Main background
--iv-white         #FDFAF5   Primary text
--iv-cream         #FAF6EE   Secondary text
--iv-gold          #913832   Brand accent (the "red-gold")
--iv-deep-green    #0F2419   Card/surface backgrounds
--iv-formal-garden #1F5129   Mid-tone green
--iv-champagne     #E8D5B0   Light accent
--iv-red-ochre     #913832   (= iv-gold; used for decorative panels)
--iv-peach-dust    #FAD6C9   Light peach
--iv-deep-peacock  #005F6B   Men's line accent
--iv-text-muted    rgba(253,250,245,0.45)
```

### Typography

Headings: `'Playfair Display', serif`
Body: system sans-serif via Tailwind
Labels/badges: `text-[10px] font-black uppercase tracking-[0.3em]`

### Component conventions

- Dark sections: `bg-iv-black` — use `.iv-dark` class if a section needs to stay dark inside a light theme context
- Cards: `background: var(--iv-deep-green); border: 1px solid rgba(145,56,50,0.14); border-radius: ...`
- Gold accent borders: `rgba(145,56,50,0.XX)` where XX = 14–30 depending on prominence
- Buttons: use `.btn-luxury` class (defined in globals.css)

### Scroll reveal animations

`ScrollRevealProvider` (in `apps/web/components/layout/scroll-reveal-provider.tsx`) is injected in the root layout and observes all `[data-reveal]` attributes globally. To animate an element:

```tsx
<div data-reveal="iv-reveal-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
```

Available classes: `iv-reveal-up`, `iv-reveal-fade`, `iv-reveal-left`, `iv-reveal-right`, `iv-scale-in`, `iv-word-in`
Utility classes: `iv-hover-lift`, `iv-glass`, `iv-skeleton`, `iv-link-draw`, `iv-gradient-text`

---

## Authentication Architecture

### Registration flow
1. Client: `POST /api/auth/register` with `{ name, email, password, accountType }`
2. API route: bcrypt hashes password at cost 12, assigns UUID, writes to `apps/web/data/users.json`
3. Returns `{ id, email, name, role }` — client then calls `signIn('credentials', ...)`

### Login flow
1. NextAuth CredentialsProvider calls `POST /api/auth/verify` (internal)
2. Verify route: loads `users.json`, finds by email, `bcrypt.compare()`
3. Returns user object → NextAuth issues JWT

### Key files
- `apps/web/app/api/auth/register/route.ts` — registration endpoint
- `apps/web/app/api/auth/verify/route.ts` — credential verification
- `apps/web/app/api/auth/[...nextauth]/route.ts` — NextAuth config
- `apps/web/data/users.json` — user store (gitignored in prod; dev only)

### NextAuth base URL resolution
```ts
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
const apiUrl  = process.env.NEXT_PUBLIC_API_URL
const verifyUrl = apiUrl ? `${apiUrl}/api/auth/verify` : `${baseUrl}/api/auth/verify`
```

---

## Next.js App Router Rules

### `'use client'` and `export const metadata` are mutually exclusive
Pages that export `metadata` must NOT have `'use client'`. If a page needs both, extract the interactive parts into a separate client component.

### `useSearchParams()` requires a Suspense boundary
Any component using `useSearchParams()` must be wrapped in `<Suspense>` during static rendering. Pattern:

```tsx
export default function Page() {
  return <Suspense fallback={<div />}><InnerForm /></Suspense>
}
```

### Stale build cache
If `useState only works in Client Components` errors appear after verified fixes, the root cause is usually `.next` cache. Fix on Windows: `Remove-Item -Recurse -Force .next`. Fix on Linux: `rm -rf .next`.

---

## Product & Tier System

Products are defined in `apps/web/lib/products.ts`.

| Tier slug | Name | Audience |
|---|---|---|
| `t1` | Foundation Protocol | Under 28, prevention |
| `t2` | Correction Protocol | 28–38, early intervention |
| `t3` | Regeneration Protocol | 39–49, active correction |
| `t4` | Longevity Protocol | 50+, maximum potency |
| `clinical` | A-Series | B2B / professional |
| `consumer` | B-Series | General consumer |
| `best-seller` | Hero SKUs | Cross-tier |

Shop page accepts `?tier=t1` etc. as a filter parameter.

---

## Skin Consultation System

**File**: `apps/web/components/diagnostic/skin-consultation.tsx`
**Replaces**: `skin-scan.tsx` (camera-based — retired)

### Why survey over camera

Research across La Mer, Tatcha, Sisley, Augustinus Bader, Chanel, Clinique, and clinical literature confirms:
- Camera AI is unreliable on melanin-rich skin (Fitzpatrick IV–VI); all major brands combine it with human consultation
- Baumann questionnaire outperforms selfie analysis for accurate skin typing across all ethnicities
- No luxury brand currently captures lifestyle data (sleep, stress, environment, hormones) in their online quiz — this is our differentiator

### Scoring engine — Baumann 4-axis model

| Axis | Range | Driver questions |
|---|---|---|
| D/O (hydration) | 0 = dry → 10 = oily | Q2 skin type + lifestyle |
| S/R (sensitivity) | 0 = resistant → 10 = sensitive | Q3 reactivity + lifestyle |
| W/T (aging) | 0 = tight → 18 = wrinkle-prone | Q5 aging signs + Q6 age range + lifestyle |
| P/N (pigmentation) | 0 = non-pigmented → 10 = pigmented | Q4 dark spot concern + Q7 sun exposure |

### Tier mapping (driven by W score)

| W score | Tier |
|---|---|
| 0–3 | t1 — Foundation |
| 4–7 | t2 — Correction |
| 8–12 | t3 — Regeneration |
| 13+ | t4 — Longevity |

### Question flow (8 questions, ~2 min)

1. Skin goal / aspiration (emotional anchor)
2. Skin type — 1 hour after cleansing, nothing applied (D/O axis)
3. Sensitivity — reaction to new products / environment (S/R axis)
4. Concerns — multi-select, all that apply
5. Aging pattern (W/T axis)
6. Age range (W/T modifier)
7. Lifestyle factors — optional multi-select (cross-axis deltas)
8. Routine depth preference

### Result screen

- Baumann skin label (e.g. "Combination-Balanced")
- Tier assignment with clinical rationale paragraph
- 4 metric cards (hydration, sensitivity, pigmentation risk, tier)
- Key active ingredients list
- Full AM + PM routine with product names, roles, and prices
- CTA: `Shop Your Protocol → /shop?tier=tX`

---

## Results Timeline

**File**: `apps/web/components/sections/results-timeline.tsx`

Uses CSS Grid `grid-cols-[1fr_auto_1fr]` so the connector line always spans full height.
Cards alternate left/right. Centre column contains gold dot with glow shadow.
Connector line: `position: absolute; left: 50%; background: linear-gradient(...var(--iv-gold)...); opacity: 0.35`.
Mobile: `md:hidden` stacked layout with dot + card side-by-side.

---

## Camera Scan (Retired)

**File**: `apps/web/components/diagnostic/skin-scan.tsx` (kept but no longer used in any page)

The camera approach was retired because:
1. Silent fallback to a fake report when camera access failed — users never saw a real scan
2. Camera AI cannot measure hydration, sebum, TEWL, or pH — the four most clinically meaningful parameters
3. Destructive to trust if a customer receives a wrong recommendation

If camera functionality is revisited, the `camera_denied` state (no fake fallback, clear permission instructions, Try Again button) must be kept. The "Bypass Camera" button must never be re-added.

---

## Common Patterns

### Inline style vs Tailwind

Use Tailwind for layout (grid, flex, spacing, responsive). Use inline `style` for brand colour tokens and anything using `var(--iv-*)`. Never mix — pick one per property.

### TypeScript array literal types

When an array contains string literals used as union types, add an explicit type annotation to prevent inference as `string`:

```ts
const ROWS: Array<{ feature: string; iv: CellValue }> = [...]
```

### Currency display

All consumer prices display in GBP (£). Clinical/B2B prices may use USD. Use `currency: 'GBP'` in `Intl.NumberFormat`.

---

## What Still Needs Doing

| Priority | Task |
|---|---|
| High | PostgreSQL migration — replace `data/users.json` with real DB for production |
| High | Stripe integration — PCI-compliant checkout (Stripe Elements, not raw card fields) |
| Medium | `skin-consultation.tsx` — wire results to a real saved profile once auth is in place |
| Medium | Shop page — verify `?tier=` filter works correctly with all tier slugs |
| Low | Apply `iv-dark` escape class to hero sections that should stay dramatically dark |
| Low | Verify `results-timeline.tsx` connector renders correctly on all breakpoints |
