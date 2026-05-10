import { SystemHero } from '@/components/sections/system-hero'
import { SkinConsultation } from '@/components/diagnostic/skin-consultation'
import { ProblemSolution } from '@/components/sections/problem-solution'
import { ProblemEducationBlock } from '@/components/sections/problem-education'
import { HowItWorks } from '@/components/sections/how-it-works'
import { ScienceIngredients } from '@/components/sections/science-ingredients'
import { ResultsTimeline } from '@/components/sections/results-timeline'
import { Testimonials } from '@/components/sections/testimonials'
import { UGCSection } from '@/components/sections/ugc'
import { BuyBox } from '@/components/sections/buy-box'
import { FAQSection } from '@/components/sections/faq'
import { Newsletter } from '@/components/sections/newsletter'
import { StickyFooterCTA } from '@/components/sections/sticky-footer-cta'

export default function HomePage() {
  // Mock product data
  const product = {
    id: 'isola-illuminating-c-serum',
    name: 'Isola Vitale Illuminating C-Serum',
    tagline: 'A concentrated, bio-adaptive elixir for profound luminosity',
    description: 'A concentrated, bio-adaptive elixir that intelligently responds to your skin\'s unique stress markers. Formulated with our proprietary botanical blend, it delivers a potent dose of luminosity while fortifying the skin\'s natural barrier.',
    price: 295,
    currency: 'USD',
    image: '/images/products/isola_serum.png',
    videoUrl: '',
    primaryProblem: 'Dullness & Uneven Texture',
    desiredOutcome: 'Radiant, Fortified Skin',
    format: 'Serum',
    audience: 'All Skin Types',
    scienceMechanism: 'Bio-Adaptive Botanical Matrix',
    useCases: ['Apply 3-4 drops morning and night', 'Gently press into face and neck', 'Brightens Complexion', 'Strengthens Barrier'],
    rating: 4.9,
    reviewCount: 1850,
    badges: ['Dermatologist Tested', 'Bio-Adaptive', 'Cruelty-Free']
  }

  // Mock testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      content: 'This serum has completely transformed my sensitive skin. No more redness or irritation!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      timeframe: '8 weeks'
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      content: 'Finally found something that works for my reactive skin. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      timeframe: '6 weeks'
    },
    {
      name: 'Emma Davis',
      role: 'Teacher',
      content: 'The results are incredible. My skin feels stronger and looks healthier than ever.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
      timeframe: '12 weeks'
    }
  ]

  // Mock FAQs
  const faqs = [
    {
      question: 'How long does it take to see results?',
      answer: 'Most users see improvements within 2-4 weeks, with optimal results after 8 weeks of consistent use.'
    },
    {
      question: 'Is this product suitable for all skin types?',
      answer: 'Yes, our Bio-Adaptive Serum is formulated for all skin types, including sensitive skin. The adaptive technology adjusts to your skin\'s needs.'
    },
    {
      question: 'What makes this different from other serums?',
      answer: 'Our proprietary Bio-Adaptive Technology allows the serum to respond intelligently to your skin\'s changing needs throughout the day.'
    },
    {
      question: 'Can I use this with other skincare products?',
      answer: 'Yes, it works well with most skincare routines. Apply after cleansing and before moisturizer for best results.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day satisfaction guarantee. If you\'re not happy with the results, return it for a full refund.'
    }
  ]

  // Mock buy bullets
  const buyBullets = [
    '30-day satisfaction guarantee',
    'Free shipping on orders over $50',
    'Clinically tested and dermatologist approved',
    'Cruelty-free and sustainable packaging'
  ]

  return (
    <main>
      <SystemHero />
      <SkinConsultation />
      <ProblemSolution
        title="The Skin Sensitivity Crisis"
        description="Millions struggle with sensitive, reactive skin that flares up at the slightest trigger. Traditional solutions often make things worse."
        problems={[
          'Constant redness and irritation',
          'Overactive immune response to environmental factors',
          'Weakened skin barrier function',
          'Difficulty finding compatible products'
        ]}
        solution={{
          title: 'Bio-Adaptive Technology',
          description: 'Our revolutionary serum adapts to your skin\'s needs in real-time, providing exactly what your skin requires when it needs it most.',
          benefits: [
            'Intelligent response to skin stress',
            'Strengthens natural barrier function',
            'Reduces inflammation and redness',
            'Compatible with all skin types'
          ]
        }}
      />
      <ProblemEducationBlock
        problem="Skin Sensitivity"
        context={[
          'Modern lifestyle factors like pollution, stress, and screen time are increasing skin sensitivity',
          'Traditional skincare often uses harsh actives that damage the skin barrier',
          'Over 50% of adults report having sensitive skin at some point',
          'Skin sensitivity affects quality of life and self-confidence'
        ]}
      />
      <HowItWorks
        steps={[
          {
            title: 'Scan',
            description: 'Bio-Adaptive sensors analyze your skin\'s current state',
            icon: '🔍'
          },
          {
            title: 'Adapt',
            description: 'Formula adjusts to deliver the right actives at the right time',
            icon: '⚡'
          },
          {
            title: 'Protect',
            description: 'Strengthens skin barrier and prevents future sensitivity',
            icon: '🛡️'
          }
        ]}
        timeline={[
          { week: 'Week 1-2', result: 'Initial calming of redness and irritation' },
          { week: 'Week 3-4', result: 'Strengthened skin barrier, reduced sensitivity' },
          { week: 'Week 5-8', result: 'Improved skin resilience and overall health' },
          { week: 'Week 8+', result: 'Long-term protection and optimal skin balance' }
        ]}
      />
      <ScienceIngredients
        keyIngredients={[
          {
            name: 'OS-01 Senomorphic Peptide',
            description: 'Advanced cellular senescence targeting technology designed to eliminate aging cells and boost barrier function by 70%.',
            benefits: ['Cellular Longevity', 'Barrier Repair', 'Firmness'],
            concentration: '0.30%'
          },
          {
            name: 'DWAT Restoration Science',
            description: 'Proprietary dermal white adipose tissue volume restoration complex for immediate and long-term facial contour improvement.',
            benefits: ['Volume Restoration', 'Facial Sculpting', 'Collagen Remodeling'],
            concentration: '0.75%'
          },
          {
            name: 'GLP-1 Protection Technology',
            description: 'Pioneering prevention against facial volume deflation (Ozempic Face), securing a critical lead in the high-growth metabolic skincare market.',
            benefits: ['Deflation Prevention', 'Metabolic Support', 'Volume Retention'],
            concentration: '1.25%'
          },
          {
            name: 'L-Ornithine Volume Enhancement',
            description: 'Clinically validated amino acid technology delivering up to 37.6% reduction in deep wrinkle depth for advanced mature skin.',
            benefits: ['Wrinkle Depth Reduction', 'Maturation Support', 'Deep Renewal'],
            concentration: '1.50%'
          },
          {
            name: 'Bifida Ferment Lysate',
            description: 'Clinical-grade postbiotic technology standardized for 30% faster inflammation reduction and microbiome homeostasis.',
            benefits: ['Microbiome Balance', 'Inflammation Control', 'Rapid Healing'],
            concentration: '0.50%'
          },
          {
            name: 'Ectoin Environmental Shield',
            description: 'Standardized extremolyte technology providing 18% improvement in transepidermal water loss and total urban pollution defense.',
            benefits: ['Environmental Defense', 'Hydration Retention', 'Pollution Barrier'],
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
            description: 'Comprehensive Bio-Adaptive results achieved. NMN-supported cellular energy restores dermal metabolism. Senescence reduction measurable. Volume and firmness improvements are clinically significant.',
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
            { id: '30ml', name: '30ml Bottle', price: 195, compareAtPrice: 215 },
            { id: '50ml', name: '50ml Bottle', price: 295, compareAtPrice: 325 }
          ]
        }}
        buyBullets={buyBullets}
      />
      <FAQSection faqs={faqs} />
      <Newsletter />
      <StickyFooterCTA
        product={product}
        offerText="Limited Time: Free Gift"
      />
    </main>
  )
}
