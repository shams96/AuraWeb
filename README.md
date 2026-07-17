# Chiarelle — The House of Clarity

A modern, production-ready, ultra-luxury e-commerce platform built for **Chiarelle**, a Skin Intelligence™ company — formulation guided by biology, not birthdate. Engineered with Next.js 14, App Router, and TypeScript.

Four protocols matched to biological stage rather than age bracket, with transparent clinical-grade concentration displays and a subscription-first architecture.

## 🌟 Core Innovations & Features

### The Protocol Funnel
- **Skin Consultation**: Interactive clinical quiz that routes users into their matched protocol (T1–T4).
- **Protocol-Specific Navigation**: Centralized dropdown routing ensuring users only shop formulations matched to their biological stage.
- **Breakthrough Technology Integration**: Explicit UI badging for proprietary actives (e.g., Cellular Renewal Complex, DWAT Restoration Complex, Bifida Ferment Lysate).

### Frictionless Commerce (D2C Optimized)
- **Subscription-First Add-to-Cart**: Ritual membership 1-click architecture.
- **Slide-Out Cart Drawer**: Bypasses stagnant `/cart` pages by injecting a glassmorphic drawer directly onto the active screen, minimizing friction.
- **Premium Checkout**: Visual delineation between One-Time and Subscription items, fully localized to USD ($).

### Storefront Architecture (Next.js 14)
- **Home Page**: High-conversion System Hero, Interactive Consultation, validated Clinical Science dossiers.
- **Shop Directory**: Protocol-filtered grid, Clinical A-Series badging for verified professionals.
- **Content Authority Pages**: The Science, The System, Ingredients, Routines, Journal, and About sections.

### Backend Infrastructure
- **API**: RESTful API with Next.js API Routes.
- **Database**: PostgreSQL with Prisma ORM (JSON file store is the active dev data layer until `DATABASE_URL` is set).
- **Authentication**: NextAuth.js.
- **Payments**: Stripe Webhooks configured for subscription state tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.0.0 or later
- npm
- PostgreSQL database (optional for dev — JSON store works without it)
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shams96/chiarelle.git
   cd chiarelle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example apps/web/.env.local
   ```
   Edit `apps/web/.env.local` and fill in your credentials.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start the Chiarelle storefront at `http://localhost:5000`.

## 📁 Project Structure

```
Chiarelle/
├── apps/
│   ├── web/              # Next.js storefront (Main D2C App)
│   ├── admin/            # Administrative dashboard
│   └── api/              # Backend services
├── packages/
│   └── ui/               # Shared component library
├── prisma/               # Database schema
└── public/               # Brand assets and imagery
```

## 🎨 Branding & Styling
The UI is built around a light-first ivory luxury palette with dark editorial sections.
- **Design Tokens**: Cloud Dancer, Peach Dust, Red Ochre, Garden Green, Deep Ocean — see `BRAND-BIBLE.md`.
- **Typography**: Libre Bodoni (display) and Inter (body).
- **Micro-Animations**: Glassmorphism and smooth transition states to encourage user interaction.

## 🤝 Contribution Guidelines
All updates MUST adhere to the Chiarelle naming conventions in `BRAND-BIBLE.md` and `brand-voice.md`. Legacy branding (Isola Vitale, LIRI ROMA) is retired — never use it. Ensure all clinical percentages added match the official Research Dossier specifications.

---
*Formulated in partnership with Natural You Srl, Isola del Liri, Italy.*
