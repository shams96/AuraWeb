import { SystemHero } from '@/components/sections/system-hero'
import { SkinConsultation } from '@/components/diagnostic/skin-consultation'
import { ProblemSolution } from '@/components/sections/problem-solution'
import { ProblemEducationBlock } from '@/components/sections/problem-education'
import { VitaleResilienceMatrix } from '@/components/sections/vitale-resilience-matrix'
import { HowItWorks } from '@/components/sections/how-it-works'
import { BrandVideo } from '@/components/sections/brand-video'
import { BentoFeatures } from '@/components/sections/bento-features'
import { IngredientScroll } from '@/components/sections/ingredient-scroll'
import { ScienceIngredients } from '@/components/sections/science-ingredients'
import { ResultsTimeline } from '@/components/sections/results-timeline'
import { Testimonials } from '@/components/sections/testimonials'
import { UGCSection } from '@/components/sections/ugc'
import { BuyBox } from '@/components/sections/buy-box'
import { FAQSection } from '@/components/sections/faq'
import { Newsletter } from '@/components/sections/newsletter'
import { StickyFooterCTA } from '@/components/sections/sticky-footer-cta'

export default function HomePage() {
  // Hero product data
  const product = {
    id: 'isola-vitale-concentrate',
    name: 'The Vitale Concentrate™',
    tagline: 'The first serum formulated for the biological reality of modern life',
    description: 'A precision-concentrated adaptive serum that tends to all four sources of your skin\'s vitality — the energy to renew, the living barrier, the power to protect, and structure that holds — in a single daily ritual. Formulated at Natural You Srl, Isola del Liri, Italy.',
    price: 295,
    currency: 'USD',
    image: '/images/products/isola_serum.png',
    videoUrl: '',
    primaryProblem: 'Environmental & Biological Stress',
    desiredOutcome: 'Resilient, Vitally Strong Skin',
    format: 'Concentrated Serum',
    audience: 'All Skin Types',
    scienceMechanism: 'Skin Intelligence™',
    useCases: ['Apply 3–4 drops morning and evening', 'Press gently into face and neck', 'Builds cumulative resilience over time', 'Your skin grows stronger with every application'],
    rating: 4.9,
    reviewCount: 1850,
    badges: ['Clinically Trialled', 'EU GMP Certified', 'Cruelty-Free']
  }

  // Testimonials
  const testimonials = [
    {
      name: 'Valentina R.',
      role: 'Milan',
      content: 'My skin has not felt this resilient since my twenties. The texture change after week four was remarkable — everything else I was using finally started working the way it should.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      timeframe: '8 weeks'
    },
    {
      name: 'James T.',
      role: 'London',
      content: 'I travel constantly between time zones. My skin used to show every flight. Now it recovers in a day. I did not expect a skincare product to change that, but it genuinely has.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      timeframe: '6 weeks'
    },
    {
      name: 'Isabelle M.',
      role: 'Paris',
      content: 'I have used La Mer, I have used Augustinus Bader. This is different. It does not feel like luxury skincare. It feels like your skin simply deciding to be well again.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      timeframe: '12 weeks'
    }
  ]

  // FAQs
  const faqs = [
    {
      question: 'When will I notice a difference?',
      answer: 'The humectant and barrier complex produces a measurable sensory change within 48 hours — skin feels different before it looks different. Surface texture visibly improves by week four, the first complete epidermal turnover cycle. Structural changes — firmness, resilience, tone — are clinically significant at 12 weeks of consistent morning and evening use.'
    },
    {
      question: 'Is The Vitale Concentrate™ suited to all skin types?',
      answer: 'Yes. Our formulations work with the four sources of vitality that govern skin health, whatever your skin type. Made without common sensitisers, it is designed for daily use at every biological stage — including sensitive and reactive skin.'
    },
    {
      question: 'What sets this apart from other luxury serums?',
      answer: 'Most serums chase a single concern. The Vitale Concentrate tends to four at once — the energy your skin uses to renew, the living barrier that keeps it resilient, its ability to protect itself, and the firmness that holds it. It does not treat symptoms. It improves the conditions that determine how your skin responds to everything else.'
    },
    {
      question: 'How does it integrate with my current ritual?',
      answer: 'Apply 3–4 drops morning and evening after cleansing, before any moisturiser or SPF. It layers cleanly under all formulations. Over time, you may find your skin requires less correction from other products — which is the intended outcome.'
    },
    {
      question: 'What is the Isola Vitale guarantee?',
      answer: 'We offer a 90-day ritual guarantee. If after three months of consistent use you do not experience a measurable improvement in skin resilience and vitality, we will arrange a full refund — no explanation required. We are confident in the science.'
    }
  ]

  // Buy box trust points
  const buyBullets = [
    '90-day ritual guarantee — return if your skin does not respond',
    'Complimentary delivery on all orders',
    '4 independent clinical trials · EU GMP certified',
    'Cruelty-free · Formulated at Isola del Liri, Italy'
  ]

  return (
    <main>
      <SystemHero />
      <SkinConsultation />
      <ProblemSolution
        title="Modern Life Is Asking Too Much of Your Skin"
        description="Skin evolved over millennia for natural environments. It was never designed for air conditioning, blue light, chronic stress, urban pollution, and transcontinental travel — all in the same week."
        problems={[
          'Climate-controlled interiors strip barrier moisture continuously',
          'Blue light and urban pollution accelerate oxidative stress',
          'Chronic stress disrupts circadian repair cycles',
          'Conventional skincare addresses symptoms, not resilience'
        ]}
        solution={{
          title: 'The Science of Vitality',
          description: 'Four biological systems that address the root causes of modern skin stress — not its surface manifestations. The Vitale Concentrate™ is built entirely around this thinking.',
          benefits: [
            'Restores the energy your skin uses to renew and repair itself',
            'Rebuilds a living barrier that adapts rather than reacts',
            'Protects systematically against the daily environmental burden',
            'Supports firmness and structure from the inside out'
          ]
        }}
      />
      <ProblemEducationBlock
        problem="Skin Resilience"
        context={[
          'The average urban professional spends 90% of their day in climate-controlled environments — the single greatest modern stressor to barrier function',
          'Blue light exposure from screens now rivals UV in cumulative oxidative burden on skin cells',
          'Cortisol from chronic stress directly impairs the skin barrier and suppresses collagen synthesis',
          'Most luxury skincare addresses visible symptoms while leaving the underlying resilience capacity untouched'
        ]}
      />
      <HowItWorks
        steps={[
          {
            title: 'Assess',
            description: '8 clinically grounded questions map your skin\'s biological stage and current resilience capacity in under 2 minutes',
            icon: '🔍'
          },
          {
            title: 'Align',
            description: 'Your profile is matched to the precise Vitale protocol — one of four rituals built around your skin\'s biological stage, not your age',
            icon: '⚡'
          },
          {
            title: 'Adapt',
            description: 'Actives work in biological sequence — renewing from within, strengthening your skin\'s natural resilience, season after season',
            icon: '🛡️'
          }
        ]}
        timeline={[
          { week: '48 Hours', result: 'Skin feels measurably different — humectant complex hydrates, redness calms, barrier begins responding' },
          { week: 'Week 4', result: 'First full skin cycle complete — 97% report smoother skin and normalised hydration (n=2,450)' },
          { week: 'Week 12', result: 'Peptide-driven structural change — clinically significant firmness, volume and tone improvement' }
        ]}
      />
      <VitaleResilienceMatrix />
      <BentoFeatures />
      <BrandVideo />
      <IngredientScroll />
      <ScienceIngredients
        keyIngredients={[
          {
            name: 'OS-01 Senomorphic Peptide',
            description: 'Targets accumulated senescent cells to restore barrier function. In a published RCT (Zonari et al., J Cosmet Dermatol 2025, n=60, 12 wks): 70% of participants showed improved skin barrier function.',
            benefits: ['Cellular Longevity', 'Barrier Repair', 'Firmness'],
            concentration: '0.30%'
          },
          {
            name: 'DWAT Restoration Science',
            description: 'Dermal white adipose tissue complex supports healthy adipocyte signalling and collagen remodelling for gradual, natural-looking volume restoration.',
            benefits: ['Volume Restoration', 'Facial Sculpting', 'Collagen Remodeling'],
            concentration: '0.75%'
          },
          {
            name: 'GLP-1 Protection Technology',
            description: 'Peptide complex designed to support skin elasticity during periods of metabolic change, helping to maintain structural integrity and prevent volume deflation.',
            benefits: ['Elasticity Support', 'Metabolic Resilience', 'Volume Retention'],
            concentration: '1.25%'
          },
          {
            name: 'L-Ornithine Volume Enhancement',
            description: 'Encapsulated amino acid that supports collagen synthesis and dermal density. Published research (Kitakaze et al., BBRC 2019) confirms L-ornithine increases collagen-constituting amino acids and polyamines in skin.',
            benefits: ['Wrinkle Depth Reduction', 'Dermal Density', 'Deep Renewal'],
            concentration: '1.50%'
          },
          {
            name: 'Bifida Ferment Lysate',
            description: 'Postbiotic that reinforces the skin microbiome and supports barrier resilience. Formulated at a microbiome-conscious concentration — included to support, not to overclaim.',
            benefits: ['Microbiome Balance', 'Inflammation Reduction', 'Barrier Support'],
            concentration: '0.50%'
          },
          {
            name: 'Ectoin Environmental Shield',
            description: 'Extremolyte from halophilic bacteria that forms a hydration shell around skin cells. Independent multi-centre testing (Dermscan Group, Lyon & Milan, 4 wks, n=96): 18% TEWL reduction and 35% hydration increase vs control.',
            benefits: ['Environmental Defence', 'Hydration Retention', 'Pollution Barrier'],
            concentration: '1.00%'
          }
        ]}
        mechanism="Formulated in partnership with Natural You Srl, Isola del Liri, our 18 enhanced formulations integrate DWAT Restoration Science and GLP-1 preventive protection technologies to outpace conventional luxury brands by 18-24 months."
      />
      <ResultsTimeline
        timeline={[
          {
            period: 'Days 1 – 3',
            title: 'Immediate Sensory Response',
            description: 'Humectant complex draws moisture into the stratum corneum within 24–48 hours. Redness and reactivity visibly calm. Skin feels immediately more comfortable.',
            icon: '💧'
          },
          {
            period: 'Week 2',
            title: 'Barrier Reinforcement',
            description: 'Bifida Ferment Lysate and Ectoin begin restoring microbiome balance. Transepidermal water loss (TEWL) measurably decreases. Skin holds moisture more efficiently between applications.',
            icon: '🛡️'
          },
          {
            period: 'Week 4',
            title: 'First Full Skin Cycle',
            description: 'One complete epidermal turnover cycle (~28 days) achieved. Surface texture is visibly smoother. Pore appearance refined. Hydration normalises across all skin types.',
            icon: '🔄'
          },
          {
            period: 'Week 8',
            title: 'Visible Tone Correction',
            description: 'GLP-1 Protection Complex and antioxidant actives produce measurable tone improvement after two complete turnover cycles. Dark spots begin fading. Radiance markedly increased.',
            icon: '✨'
          },
          {
            period: 'Week 12',
            title: 'Peptide-Driven Structural Change',
            description: 'OS-01 Senomorphic Peptides show first clinical results at the three-month mark. Collagen synthesis stimulated by L-Ornithine produces a measurable early improvement in skin firmness and bounce.',
            icon: '📈'
          },
          {
            period: 'Week 24',
            title: 'Cellular Transformation',
            description: 'All four vitality systems at full response. NMN-supported cellular energy restores dermal metabolism. Senescence reduction measurable. Volume and firmness improvements are clinically significant.',
            icon: '🌟'
          }
        ]}
      />
      <Testimonials testimonials={testimonials} />
      <UGCSection testimonials={testimonials} />
      <BuyBox
        product={{
          ...product,
          sku: 'BAS-001',
          variants: [
            { id: '30ml', name: '30 ml — Discovery', price: 195, compareAtPrice: 215 },
            { id: '50ml', name: '50 ml — Ritual', price: 295, compareAtPrice: 325 }
          ]
        }}
        buyBullets={buyBullets}
      />
      <FAQSection faqs={faqs} />
      <Newsletter />
      <StickyFooterCTA
        product={product}
        offerText="Begin Your 90-Day Ritual"
      />
    </main>
  )
}
