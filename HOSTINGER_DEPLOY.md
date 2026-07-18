# Deploying Chiarelle to Hostinger (Node.js hosting, manual upload)

## What was prepared

`chiarelle-hostinger-deploy.zip` (repo root, ~37MB) — a Next.js "standalone" production build. It's self-contained: includes a minimal `node_modules` (only what's actually used at runtime, not the full dev dependency tree), the compiled app, static assets, and the JSON data files. You do **not** need to run `npm install` on the server — it's already inside the zip.

Entry point once unzipped: **`apps/web/server.js`**

## Upload steps (hPanel)

1. In hPanel, go to **Websites → [your site] → Advanced → Node.js**.
2. Create a new Node.js application (or edit the existing one):
   - **Node.js version**: 20.x (matches what this was built with)
   - **Application root**: pick a folder, e.g. `chiarelle` (this is where you'll upload into)
   - **Application startup file**: `apps/web/server.js`
   - **Application URL**: your domain (`chiarelle.com`)
3. Go to **File Manager**, navigate into the application root folder you just set, and upload `chiarelle-hostinger-deploy.zip`.
4. Extract it in place — after extraction the folder should directly contain `apps/`, `node_modules/`, and `package.json` (not nested inside another subfolder). If File Manager extracts into a subfolder, move the contents up one level.
5. Back in the Node.js app screen, set the **environment variables** (see list below), then click **Restart** / **Run**.

## Required environment variables

Set these in hPanel's Node.js app environment variable UI — do not put real secrets in any file you upload.

| Variable | What it is | Notes |
|---|---|---|
| `NEXTAUTH_URL` | `https://chiarelle.com` | Must match your live domain exactly, including `https://` |
| `NEXTAUTH_SECRET` | a long random string | Generate one: `openssl rand -base64 32` (or any password generator, 32+ chars). Never reuse the dev placeholder. |
| `NEXT_PUBLIC_APP_URL` | `https://chiarelle.com` | Used for absolute URLs (emails, OG tags, sitemap) |
| `STRIPE_SECRET_KEY` | `sk_live_...` | From your Stripe dashboard — **live** key for production, not `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | From Stripe Dashboard → Developers → Webhooks, after you register `https://chiarelle.com/api/webhooks/stripe` as an endpoint there |
| `RESEND_API_KEY` | `re_...` | From resend.com — required for order/welcome emails to send. `chiarelle.com` must also be a verified sending domain in Resend, or emails will fail silently. |
| `DATABASE_URL` | *(optional)* | Only needed if you're activating PostgreSQL (see caveat below). Leave unset to keep using the JSON file store. |
| `NODE_ENV` | `production` | Some hosting panels set this automatically — confirm it's `production`, not `development` |

Do **not** set `ADMIN_SEED_PASSWORD` or `INTERNAL_API_SECRET` unless you know you need them — they're optional/internal.

## Important caveat: the data store

This app currently runs on a **JSON file data store** (`apps/web/data/users.json`, `products.json`, `assessments.json`) instead of a real database — `DATABASE_URL` isn't set, so Prisma/Postgres stays inactive and the app reads/writes these JSON files directly on disk.

This has real consequences on shared hosting:
- **Every order, every new user registration, every admin product edit is written to these files on the server's disk.**
- If you ever re-upload/re-extract the zip to deploy an update, **you will overwrite and lose all that data** unless you first download the current `apps/web/data/*.json` from the server and re-upload them after extracting the new build.
- Shared hosting typically doesn't guarantee persistent disk storage across app restarts/migrations the way a VPS would.

**Recommendation**: before taking real customer orders, set up a real Postgres database (Hostinger offers managed databases, or use a free tier like Neon/Supabase) and set `DATABASE_URL` — this activates the Prisma path already wired into the codebase, with no code changes needed. Until then, treat this as a working demo/soft-launch, not a durable production data layer.

## After deploying

1. Visit `https://chiarelle.com` and confirm the homepage loads with the Chiarelle wordmark and no errors.
2. Log in with the seed admin account (`admin@chiarelle.com` — check `apps/web/data/users.json` for the seeded password hash, or register a fresh account and manually promote its role to `OWNER` in that file).
3. Register Stripe's webhook endpoint (`https://chiarelle.com/api/webhooks/stripe`) in the Stripe dashboard and confirm `STRIPE_WEBHOOK_SECRET` matches.
4. Send a test order end-to-end and confirm the confirmation email arrives (validates `RESEND_API_KEY` and domain verification).
