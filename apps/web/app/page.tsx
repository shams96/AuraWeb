import { SystemHero } from '@/components/sections/system-hero'
import { SkinConsultation } from '@/components/diagnostic/skin-consultation'
import { ProblemSolution } from '@/components/sections/problem-solution'
import { ProblemEducationBlock } from '@/components/sections/problem-education'
import { HowItWorks } from '@/components/sections/how-it-works'
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
            title: 'Consult',
            description: '8 clinically grounded questions map your Baumann skin profile in under 2 minutes',
            icon: '🔍'
          },
          {
            title: 'Match',
            description: 'Scoring engine assigns your precise tier from four bio-adaptive protocols',
            icon: '⚡'
          },
          {
            title: 'Transform',
            description: 'Actives work in sequence — barrier first, then correction, then structural renewal',
            icon: '🛡️'
          }
        ]}
        timeline={[
          { week: '48 Hours', result: 'Skin feels measurably different — humectant complex hydrates, redness calms, barrier begins responding' },
          { week: 'Week 4', result: 'First full skin cycle complete — 97% report smoother skin and normalised hydration (n=2,450)' },
          { week: 'Week 12', result: 'Peptide-driven structural change — clinically significant firmness, volume and tone improvement' }
        ]}
      />
      <BentoFeatures />
      <IngredientScroll />
      <ScienceIngredients
        keyIngredients={[
          {
            name: 'OS-01 Senomorphic Peptide',
            description: 'Targets accumulated senescent ("zombie") cells to restore barrier function. In clinical testing (Trial IV-2024-01, 12 wks, n=120): up to 70% improvement in barrier strength vs placebo.',
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
            description: 'Encapsulated amino acid that supports collagen synthesis and dermal density. In clinical testing (Trial IV-2024-02, 8 wks, n=84): 37.6% reduction in nasolabial fold depth vs untreated.',
            benefits: ['Wrinkle Depth Reduction', 'Dermal Density', 'Deep Renewal'],
            concentration: '1.50%'
          },
          {
            name: 'Bifida Ferment Lysate',
            description: 'Clinical-grade postbiotic that reinforces the skin microbiome and reduces inflammatory signalling. In testing (Trial IV-2024-03, 6 wks, n=60): 30% faster redness reduction vs vehicle control.',
            benefits: ['Microbiome Balance', 'Inflammation Reduction', 'Barrier Support'],
            concentration: '0.50%'
          },
          {
            name: 'Ectoin Environmental Shield',
            description: 'Extremolyte from halophilic bacteria that forms a hydration shell around skin cells. In testing (Trial IV-2024-04, 4 wks, n=96): 18% TEWL reduction and 35% hydration increase vs control.',
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
