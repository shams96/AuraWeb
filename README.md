# Isola Vitale - Advanced Clinical E-commerce Platform

A modern, production-ready, ultra-luxury e-commerce platform built specifically for the **Isola Vitale 4-Tier Metabolically-Aligned Skincare System**. Engineered with Next.js 14, App Router, and TypeScript.

This platform integrates the December 2025 Dermatology Conference Breakthroughs, establishing an 18-24 month technology lead over legacy competitors like La Mer and Augustinus Bader through transparent clinical-grade percentage displays and a frictionless subscription-first architecture.

## 🌟 Core Innovations & Features

### The 4-Tier Clinical Funnel
- **Dynamic Age Assessment**: Interactive clinical quiz that precisely routes users into their prescribed Tier (T1-T4).
- **Tier-Specific Navigation**: Centralized dropdown routing ensuring users only shop formulations tailored to their cellular age.
- **Breakthrough Technology Integration**: Explicit UI badging for proprietary actives (e.g., *OS-01 Senomorphic Peptides 0.30%*, *NMN Longevity Complex 0.50%*, *Bifida Ferment Lysate*).

### Frictionless Commerce (D2C Optimized)
- **Subscription-First Add-to-Cart**: "Subscribe & Save 20%" 1-click architecture.
- **Slide-Out Cart Drawer**: Bypasses stagnant `/cart` pages by injecting a glassmorphic drawer directly onto the active screen, minimizing friction.
- **Premium Checkout**: Visual delineation between One-Time and Subscription items, fully localized to Euros (€).

### Storefront Architecture (Next.js 14)
- **Home Page**: High-conversion System Hero, Interactive Quiz, validated Clinical Science dossiers.
- **Shop Directory**: T1-T4 filtered grid, prominent Clinical Series badging.
- **Content Authority Pages**: The Science, The System, Ingredients, Routines, Journal, and About sections engineered to mimic the comprehensive authority of the IM8 website.

### Backend Infrastructure
- **API**: RESTful API with Next.js API Routes.
- **Database**: PostgreSQL with Prisma ORM.
- **Authentication**: NextAuth.js.
- **Payments**: Stripe Webhooks configured for subscription state tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.0.0 or later
- pnpm 8.0.0 or later
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/isolavitale.git
   cd isolavitale
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and fill in your credentials.

4. **Start the development server**
   ```bash
   pnpm dev
   ```

   This will start the Isola Vitale storefront at `http://localhost:3000`.

## 📁 Project Structure

```
isolavitale/
├── apps/
│   ├── web/              # Next.js storefront (Main D2C App)
│   ├── admin/            # Administrative dashboard
│   └── api/              # Backend services
├── packages/
│   ├── config/           # Shared configurations
│   └── ui/               # Isola Vitale component library
├── prisma/               # Database schema for T1-T4 logic
└── public/               # Brand assets and imagery
```

## 🎨 Branding & Styling
The UI abandons the generic layout for a deep, luxury aesthetic.
- **Design Tokens**: Emerald, Gold, and Deep Black dark-mode aesthetics.
- **Typography**: Refined, clinical typography for a premium medical-grade feel.
- **Micro-Animations**: Glassmorphism and smooth transition states to encourage user interaction.

## 🤝 Contribution Guidelines
All updates MUST adhere to the Isola Vitale naming conventions. The legacy "Isola Vitale" branding is officially deprecated. Ensure all clinical percentages added match the official Dec 2025 Research Dossier specifications.

---
*Formulated in partnership with Natural You Srl, Isola del Liri, Italy.*
