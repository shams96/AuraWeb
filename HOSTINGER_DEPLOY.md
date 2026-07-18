# Deploying Chiarel to Hostinger

Two supported ways to deploy. Pick one.

## Option A — Git auto-deploy (hPanel → Node.js → Git)

This now works, with two fixes applied to make it work:

1. **Point Application Root at `apps/web`, not the repo root.** The repo is an npm-workspaces monorepo, and Hostinger's Node.js app runner doesn't understand workspaces — that's what caused the earlier "build logs are null" failure (it was trying to resolve a workspace build from the root and silently no-op'ing). `apps/web` is fully self-contained (its own `package.json`, all dependencies declared directly, zero dependency on the monorepo/workspaces), so pointing Hostinger directly at that subdirectory sidesteps the whole problem.
2. **The build now happens automatically on `npm install`.** `apps/web/package.json`'s `postinstall` script runs `prisma generate && next build` — so whatever triggers `npm install` (Hostinger's own install step, or a git push if auto-install is on) also produces a fresh production build. There's no separate "build command" to configure.

**hPanel settings:**
- **Application root**: `apps/web` (the subdirectory, not the repo root)
- **Application startup file**: `server.js` (a custom Next.js server committed at `apps/web/server.js` — Hostinger's Passenger-style runner needs a literal JS entry file, not an npm script)
- **Node.js version**: 20.x
- **Application URL**: `chiarel.com`
- After connecting: run **NPM Install** (triggers the build via postinstall), then **Restart**.
- Set the environment variables listed below.

If it still fails: check the install/build log for the actual error (it should no longer be empty) — most likely cause at that point is a memory/timeout limit on shared hosting during `next build`, in which case fall back to Option B.

## Option B — Manual pre-built zip upload (fallback, no build happens on their servers)

`chiarel-hostinger-deploy.zip` (repo root, ~37MB) — a Next.js "standalone" production build. It's self-contained: includes a minimal `node_modules` (only what's actually used at runtime, not the full dev dependency tree), the compiled app, static assets, and the JSON data files. You do **not** need to run `npm install` on the server — it's already inside the zip.

Entry point once unzipped: **`apps/web/server.js`** (the auto-generated standalone one, packaged inside the zip — separate from the hand-written `apps/web/server.js` used by Option A's Git deploy; both happen to share the same filename and role but are built differently).

### Upload steps (hPanel)

1. In hPanel, go to **Websites → [your site] → Advanced → Node.js**.
2. Create a new Node.js application (or edit the existing one):
   - **Node.js version**: 20.x (matches what this was built with)
   - **Application root**: pick a folder, e.g. `chiarel` (this is where you'll upload into)
   - **Application startup file**: `apps/web/server.js`
   - **Application URL**: your domain (`chiarel.com`)
3. Go to **File Manager**, navigate into the application root folder you just set, and upload `chiarel-hostinger-deploy.zip`.
4. Extract it in place — after extraction the folder should directly contain `apps/`, `node_modules/`, and `package.json` (not nested inside another subfolder). If File Manager extracts into a subfolder, move the contents up one level.
5. Back in the Node.js app screen, set the **environment variables** (see list below), then click **Restart** / **Run**.

## Required environment variables

Set these in hPanel's Node.js app environment variable UI — do not put real secrets in any file you upload.

| Variable | What it is | Notes |
|---|---|---|
| `NEXTAUTH_URL` | `https://chiarel.com` | Must match your live domain exactly, including `https://` |
| `NEXTAUTH_SECRET` | a long random string | Generate one: `openssl rand -base64 32` (or any password generator, 32+ chars). Never reuse the dev placeholder. |
| `NEXT_PUBLIC_APP_URL` | `https://chiarel.com` | Used for absolute URLs (emails, OG tags, sitemap) |
| `STRIPE_SECRET_KEY` | `sk_live_...` | From your Stripe dashboard — **live** key for production, not `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | From Stripe Dashboard → Developers → Webhooks, after you register `https://chiarel.com/api/webhooks/stripe` as an endpoint there |
| `RESEND_API_KEY` | `re_...` | From resend.com — required for order/welcome emails to send. `chiarel.com` must also be a verified sending domain in Resend, or emails will fail silently. |
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

1. Visit `https://chiarel.com` and confirm the homepage loads with the Chiarel wordmark and no errors.
2. Log in with the seed admin account (`admin@chiarel.com` — check `apps/web/data/users.json` for the seeded password hash, or register a fresh account and manually promote its role to `OWNER` in that file).
3. Register Stripe's webhook endpoint (`https://chiarel.com/api/webhooks/stripe`) in the Stripe dashboard and confirm `STRIPE_WEBHOOK_SECRET` matches.
4. Send a test order end-to-end and confirm the confirmation email arrives (validates `RESEND_API_KEY` and domain verification).
