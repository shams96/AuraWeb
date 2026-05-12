'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, CheckCircle2, ShoppingBag, Loader2, RefreshCcw } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tier = 't1' | 't2' | 't3' | 't4'
type SkinHydration = 'dry' | 'normal' | 'combination' | 'oily'
type SkinSensitivity = 'resistant' | 'balanced' | 'sensitive'

interface Answers {
  q1: string | null        // Goal (single)
  q2: number | null        // Skin type index (single)
  q3: number | null        // Sensitivity index (single)
  q4: string[]             // Concerns (multi)
  q5: number | null        // Aging signs index (single)
  q6: number | null        // Age range index (single)
  q7: string[]             // Lifestyle (multi — optional)
  q8: string | null        // Routine preference (single)
}

interface SkinProfile {
  doScore: number          // 0 = dry → 10 = oily
  srScore: number          // 0 = resistant → 10 = sensitive
  wScore: number           // 0 = tight → 18 = wrinkle-prone
  pScore: number           // 0 = non-pigmented → 10 = pigmented
  tier: Tier
  hydration: SkinHydration
  sensitivity: SkinSensitivity
  baumannLabel: string
}

// ─── Question data ────────────────────────────────────────────────────────────

const Q1 = {
  heading: 'What does your ideal skin look and feel like?',
  sub: 'Your answer shapes the entire direction of your protocol.',
  options: [
    { label: 'Deeply hydrated and plump',     sub: 'Restored moisture, softness and barrier strength', value: 'hydration' },
    { label: 'Clear, balanced and refined',   sub: 'Reduced oiliness, congestion and visible pores',   value: 'clarity'   },
    { label: 'Bright, even and luminous',     sub: 'Corrected tone, faded spots and natural radiance', value: 'radiance'  },
    { label: 'Firm, lifted and age-defying',  sub: 'Restored volume, definition and structural lift',  value: 'firming'   },
  ],
}

const Q2 = {
  heading: 'An hour after cleansing — nothing applied — how does your skin feel?',
  sub: 'Select the option closest to your natural skin state.',
  options: [
    { label: 'Tight, rough or flaky',      sub: 'Dry even after moisturising',              doScore: 0  },
    { label: 'Comfortable and balanced',   sub: 'Neither too dry nor too oily',             doScore: 4  },
    { label: 'Oily across the T-zone',     sub: 'Combination — shiny centre, drier cheeks', doScore: 7  },
    { label: 'Oily all over',              sub: 'Visibly shiny, pores enlarged',             doScore: 10 },
  ],
}

const Q3 = {
  heading: 'How does your skin respond to new products or changes in your environment?',
  sub: 'Consider reactions to wind, cold, heat or unfamiliar ingredients.',
  options: [
    { label: 'Rarely reacts — very resilient',           sub: 'Handles most things without issue',          srScore: 0  },
    { label: 'Occasionally mildly reactive',             sub: 'Sometimes redness or tightness',             srScore: 3  },
    { label: 'Frequently red, stinging or irritated',    sub: 'Reacts to many products and climates',       srScore: 7  },
    { label: 'I have a diagnosed skin condition',         sub: 'Rosacea, eczema, psoriasis or contact allergy', srScore: 10 },
  ],
}

const Q4 = {
  heading: 'Which skin concerns would you most like to address?',
  sub: 'Select all that apply — we use these to tailor your active ingredients.',
  options: [
    'Dryness and dehydration',
    'Breakouts or excess oil',
    'Redness or sensitivity',
    'Dark spots or uneven tone',
    'Fine lines or wrinkles',
    'Loss of firmness',
    'Dullness and lack of radiance',
    'Enlarged pores',
  ],
}

const Q5 = {
  heading: 'How would you describe the visible signs of ageing on your skin right now?',
  sub: 'Be honest — this is the most important question in your protocol match.',
  options: [
    { label: 'Youthful and firm',                     sub: 'No visible signs of ageing yet',            wScore: 0  },
    { label: 'Very early fine lines beginning',        sub: 'Just starting to notice',                   wScore: 3  },
    { label: 'Fine lines and mild loss of firmness',   sub: 'Visible but not yet pronounced',            wScore: 6  },
    { label: 'Established lines and volume loss',      sub: 'Deeper lines, sagging or hollowing',        wScore: 10 },
  ],
}

const Q6 = {
  heading: 'Which age range applies to you?',
  sub: 'Skin metabolism shifts fundamentally with each decade.',
  options: [
    { label: 'Under 28',  ageModifier: 0 },
    { label: '28 – 38',   ageModifier: 2 },
    { label: '39 – 49',   ageModifier: 4 },
    { label: '50 – 60',   ageModifier: 6 },
    { label: '60+',       ageModifier: 8 },
  ],
}

const Q7 = {
  heading: 'Do any of these factors apply to your daily life?',
  sub: 'Lifestyle affects skin biology more than most people realise. Select all that apply, or skip if none.',
  options: [
    { label: 'High or chronic stress',                            srDelta: 1,  wDelta: 1             },
    { label: 'Fewer than 7 hours of sleep most nights',                        wDelta: 1             },
    { label: 'Urban environment with high pollution',             srDelta: 1,  doDelta: -1           },
    { label: 'Regular or prolonged sun exposure',                              pDelta: 2             },
    { label: 'Hormonal changes (pregnancy, menopause or HRT)',    srDelta: 1,  pDelta: 1             },
  ],
}

const Q8 = {
  heading: 'How involved would you like your daily skincare routine to be?',
  sub: 'We will tailor your protocol to suit your lifestyle.',
  options: [
    { label: 'Minimal',      sub: '2–3 steps — fast and effortless',   value: 'minimal'  },
    { label: 'Balanced',     sub: '4–5 steps — intentional and clear',  value: 'balanced' },
    { label: 'Full ritual',  sub: '6+ steps — immersive and complete',  value: 'full'     },
  ],
}

// ─── Scoring engine ───────────────────────────────────────────────────────────

function computeProfile(a: Answers): SkinProfile {
  // Base scores from single-choice questions
  let doScore = a.q2 !== null ? Q2.options[a.q2].doScore : 5
  let srScore = a.q3 !== null ? Q3.options[a.q3].srScore : 3
  let wScore  = (a.q5 !== null ? Q5.options[a.q5].wScore : 0)
              + (a.q6 !== null ? Q6.options[a.q6].ageModifier : 0)
  let pScore  = 0

  // Concern signals
  if (a.q4.includes('Dark spots or uneven tone')) pScore  += 4
  if (a.q4.includes('Fine lines or wrinkles'))    wScore  += 1
  if (a.q4.includes('Dryness and dehydration'))   doScore -= 1

  // Lifestyle deltas
  a.q7.forEach(label => {
    const opt = Q7.options.find(o => o.label === label)
    if (!opt) return
    if (opt.srDelta) srScore += opt.srDelta
    if (opt.wDelta)  wScore  += opt.wDelta
    if (opt.pDelta)  pScore  += opt.pDelta
    if (opt.doDelta) doScore += opt.doDelta
  })

  // Clamp
  doScore = Math.max(0, Math.min(10, doScore))
  srScore = Math.max(0, Math.min(10, srScore))
  wScore  = Math.max(0, Math.min(18, wScore))
  pScore  = Math.max(0, Math.min(10, pScore))

  // Classify axes
  const hydration: SkinHydration =
    doScore <= 2 ? 'dry' : doScore <= 4 ? 'normal' : doScore <= 7 ? 'combination' : 'oily'
  const sensitivity: SkinSensitivity =
    srScore <= 2 ? 'resistant' : srScore <= 6 ? 'balanced' : 'sensitive'

  const hydrationLabel = hydration.charAt(0).toUpperCase() + hydration.slice(1)
  const sensitivityLabel = sensitivity.charAt(0).toUpperCase() + sensitivity.slice(1)
  const baumannLabel = `${hydrationLabel}-${sensitivityLabel}`

  // Tier — driven primarily by combined age + aging-pattern W score
  const tier: Tier =
    wScore >= 13 ? 't4' : wScore >= 8 ? 't3' : wScore >= 4 ? 't2' : 't1'

  return { doScore, srScore, wScore, pScore, tier, hydration, sensitivity, baumannLabel }
}

// ─── Protocol definitions ─────────────────────────────────────────────────────

interface ProductRec { id: string; name: string; role: string; price: string; priceNum: number; image?: string }

interface Protocol {
  name: string
  tagline: string
  description: string
  am: ProductRec[]
  pm: ProductRec[]
  ingredients: string[]
  tierSlug: string
}

const IMG = { serum: '/images/products/isola_serum.png', col: '/images/products/isola_collection.png' }

const PROTOCOLS: Record<Tier, Protocol> = {
  t1: {
    name: 'Tier I — Foundation Protocol',
    tagline: 'Prevention & daily resilience',
    tierSlug: 't1',
    description:
      'Your skin shows excellent baseline vitality. The Foundation Protocol\'s mission is protection: fortifying your microbiome, establishing a consistent daily ritual, and preventing the environmental damage that accumulates invisibly in your twenties before it ever becomes visible.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',   role: 'Microbiome-safe morning cleanse', price: '$85',  priceNum: 85,  image: IMG.serum },
      { id: '5b',                        name: '5B Consumer Hydrating Mist', role: 'Prep and first hydration layer',  price: '$75',  priceNum: 75,  image: IMG.col  },
      { id: '3b',                        name: '3B Consumer SPF 30+',         role: 'Broad-spectrum UV protection',    price: '$95',  priceNum: 95,  image: IMG.col  },
    ],
    pm: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', role: 'Evening metabolic waste removal', price: '$85',  priceNum: 85,  image: IMG.serum },
      { id: 'terra-radiance-cream',      name: 'Terra Radiance Cream',      role: 'Overnight barrier nourishment',   price: '$245', priceNum: 245, image: IMG.col  },
    ],
    ingredients: [
      'Bifida Ferment Lysate 0.50% (Microbiome balance)',
      'Ectoin (Environmental stress shield)',
      'Niacinamide 4% (Pore refinement)',
      'SPF 30+ UV filters',
    ],
  },
  t2: {
    name: 'Tier II — Correction Protocol',
    tagline: 'Early intervention & active correction',
    tierSlug: 't2',
    description:
      'Your skin carries early signs of environmental and lifestyle wear. The Correction Protocol introduces clinically active compounds to intercept these changes before they become established — restoring radiance, reinforcing your barrier, and correcting tone while the window for easy reversal is still open.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',    role: 'pH-balanced morning cleanse',  price: '$85',  priceNum: 85,  image: IMG.serum },
      { id: '1b',                        name: '1B Consumer Peptide Essence', role: 'Daily cellular renewal serum', price: '$175', priceNum: 175, image: IMG.serum },
      { id: '3b',                        name: '3B Consumer SPF 30+',          role: 'Broad-spectrum UV defence',    price: '$95',  priceNum: 95,  image: IMG.col  },
    ],
    pm: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', role: 'Deep evening cleanse',            price: '$85',  priceNum: 85,  image: IMG.serum },
      { id: 't2-02',                    name: 'T2-02 Young Adult Gel',      role: 'Metabolically aligned treatment', price: '$110', priceNum: 110, image: IMG.col  },
      { id: '4b',                       name: '4B Consumer Night Repair',   role: 'Overnight cellular recovery',    price: '$195', priceNum: 195, image: IMG.col  },
    ],
    ingredients: [
      'GLP-1 Skin Protection Complex (Metabolic alignment)',
      'Bifida Ferment Lysate (Barrier reinforcement)',
      'Vitamin C — Ascorbyl Glucoside (Tone correction)',
      'SPF 30+ UV filters',
    ],
  },
  t3: {
    name: 'Tier III — Regeneration Protocol',
    tagline: 'Deep regeneration & structural renewal',
    tierSlug: 't3',
    description:
      'Your skin requires active regeneration at the cellular level. The Regeneration Protocol deploys OS-01 Senomorphic Peptides — shown to reduce zombie-cell accumulation by 30% — combined with L-Ornithine to restore dermal volume and firmness lost to time and cumulative stress. This is targeted biological intervention, not surface treatment.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', role: 'Microbiome-preserving cleanse',       price: '$85',  priceNum: 85,  image: IMG.serum },
      { id: 'chrono-lift-serum',         name: 'Chrono-Lift Serum',         role: 'Targeted volume and structural lift', price: '$345', priceNum: 345, image: '/images/products/obsidian_cream.png' },
      { id: '3a',                         name: '3A Clinical SPF 50+',        role: 'Ectoin-boosted UV defence',          price: '$195', priceNum: 195, image: IMG.col  },
    ],
    pm: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',      role: 'Evening cellular reset',        price: '$85',  priceNum: 85,  image: IMG.serum },
      { id: 't3-03',                    name: 'T3-03 Mature Intervention Gel', role: 'OS-01 + DWAT night treatment',  price: '$165', priceNum: 165, image: IMG.col  },
      { id: 'obsidian-vitale-cream',     name: 'Obsidian Vitale Cream',         role: 'Age-defying night restoration', price: '$295', priceNum: 295, image: '/images/products/obsidian_cream.png' },
    ],
    ingredients: [
      'OS-01 Senomorphic Peptides (Senescence reduction −30%)',
      'L-Ornithine (Dermal volume restoration)',
      'DWAT Complex (Deep structural support)',
      'Ectoin Shield SPF 50+',
    ],
  },
  t4: {
    name: 'Tier IV — Longevity Protocol',
    tagline: 'Maximum-potency cellular longevity',
    tierSlug: 't4',
    description:
      'Your skin calls for our most intensive intervention. The Longevity Protocol deploys clinical-grade NMN, GLP-1 complex, and OS-01 together in a comprehensive AM/PM system engineered to visibly transform skin at the metabolic level. This is the same formulation tier used in professional clinical settings — without the clinic appointment.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',    role: 'Microbiome-safe clinical cleanse',  price: '$85',  priceNum: 85,  image: IMG.serum },
      { id: '1a',                        name: '1A Clinical Peptide Essence', role: 'OS-01 + GLP-1 cellular activation', price: '$390', priceNum: 390, image: IMG.serum },
      { id: '3a',                         name: '3A Clinical SPF 50+',         role: 'Maximum UV protection with Ectoin', price: '$195', priceNum: 195, image: IMG.col  },
    ],
    pm: [
      { id: '6a',                    name: '6A Clinical Gentle Cleanser', role: 'Pharmaceutical-grade deep cleanse',   price: '$110', priceNum: 110, image: IMG.col  },
      { id: '4a',                    name: '4A Clinical Night Repair',     role: 'L-Ornithine + NMN overnight renewal', price: '$345', priceNum: 345, image: IMG.col  },
      { id: 'obsidian-vitale-cream', name: 'Obsidian Vitale Cream',        role: 'Intensive cellular restoration',      price: '$295', priceNum: 295, image: '/images/products/obsidian_cream.png' },
    ],
    ingredients: [
      'OS-01 Senomorphic Peptides (Maximum senescence reversal)',
      'NMN — NAD+ Precursor (Cellular energy restoration)',
      'GLP-1 Skin Protection Complex (Metabolic realignment)',
      'L-Ornithine + DWAT (Volume and barrier restoration)',
    ],
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TOTAL = 8

function allOptions(qIdx: number): Array<{ label: string; sub: string; value: string }> {
  if (qIdx === 0) return Q1.options.map(o => ({ label: o.label, sub: o.sub,           value: o.value      }))
  if (qIdx === 1) return Q2.options.map((o, i) => ({ label: o.label, sub: o.sub,      value: String(i)    }))
  if (qIdx === 2) return Q3.options.map((o, i) => ({ label: o.label, sub: o.sub,      value: String(i)    }))
  if (qIdx === 3) return Q4.options.map(o  => ({ label: o, sub: '',                   value: o            }))
  if (qIdx === 4) return Q5.options.map((o, i) => ({ label: o.label, sub: o.sub,      value: String(i)    }))
  if (qIdx === 5) return Q6.options.map((o, i) => ({ label: o.label, sub: '',         value: String(i)    }))
  if (qIdx === 6) return Q7.options.map(o  => ({ label: o.label, sub: '',             value: o.label      }))
  if (qIdx === 7) return Q8.options.map(o  => ({ label: o.label, sub: o.sub,         value: o.value      }))
  return []
}

function questionMeta(qIdx: number): { heading: string; sub: string; multi: boolean } {
  if (qIdx === 0) return { heading: Q1.heading, sub: Q1.sub, multi: false }
  if (qIdx === 1) return { heading: Q2.heading, sub: Q2.sub, multi: false }
  if (qIdx === 2) return { heading: Q3.heading, sub: Q3.sub, multi: false }
  if (qIdx === 3) return { heading: Q4.heading, sub: Q4.sub, multi: true  }
  if (qIdx === 4) return { heading: Q5.heading, sub: Q5.sub, multi: false }
  if (qIdx === 5) return { heading: Q6.heading, sub: Q6.sub, multi: false }
  if (qIdx === 6) return { heading: Q7.heading, sub: Q7.sub, multi: true  }
  if (qIdx === 7) return { heading: Q8.heading, sub: Q8.sub, multi: false }
  return { heading: '', sub: '', multi: false }
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SkinConsultation() {
  const { addItem, setCartOpen } = useCart()
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'analyzing' | 'result'>('intro')
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    q1: null, q2: null, q3: null, q4: [],
    q5: null, q6: null, q7: [],  q8: null,
  })
  const [profile, setProfile] = useState<SkinProfile | null>(null)
  const [subscribe, setSubscribe] = useState(true)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const sessionId = useRef(crypto.randomUUID())

  // Selection helpers
  function isSelected(value: string): boolean {
    if (qIdx === 0) return answers.q1 === value
    if (qIdx === 1) return answers.q2 !== null && String(answers.q2) === value
    if (qIdx === 2) return answers.q3 !== null && String(answers.q3) === value
    if (qIdx === 3) return answers.q4.includes(value)
    if (qIdx === 4) return answers.q5 !== null && String(answers.q5) === value
    if (qIdx === 5) return answers.q6 !== null && String(answers.q6) === value
    if (qIdx === 6) return answers.q7.includes(value)
    if (qIdx === 7) return answers.q8 === value
    return false
  }

  function selectOption(value: string) {
    const multi = questionMeta(qIdx).multi
    setAnswers(a => {
      if (qIdx === 0) return { ...a, q1: value }
      if (qIdx === 1) return { ...a, q2: Number(value) }
      if (qIdx === 2) return { ...a, q3: Number(value) }
      if (qIdx === 3) {
        const next = multi
          ? a.q4.includes(value) ? a.q4.filter(x => x !== value) : [...a.q4, value]
          : [value]
        return { ...a, q4: next }
      }
      if (qIdx === 4) return { ...a, q5: Number(value) }
      if (qIdx === 5) return { ...a, q6: Number(value) }
      if (qIdx === 6) {
        const next = a.q7.includes(value) ? a.q7.filter(x => x !== value) : [...a.q7, value]
        return { ...a, q7: next }
      }
      if (qIdx === 7) return { ...a, q8: value }
      return a
    })
  }

  function canAdvance(): boolean {
    if (qIdx === 0) return answers.q1 !== null
    if (qIdx === 1) return answers.q2 !== null
    if (qIdx === 2) return answers.q3 !== null
    if (qIdx === 3) return answers.q4.length > 0
    if (qIdx === 4) return answers.q5 !== null
    if (qIdx === 5) return answers.q6 !== null
    if (qIdx === 6) return true  // lifestyle is optional
    if (qIdx === 7) return answers.q8 !== null
    return false
  }

  function advance() {
    if (qIdx < TOTAL - 1) {
      setQIdx(q => q + 1)
      return
    }
    // Final question — compute and show result
    const p = computeProfile(answers)
    setProfile(p)
    const proto = PROTOCOLS[p.tier]
    const recs = [...proto.am, ...proto.pm]
      .filter((v, i, a) => a.findIndex(x => x.id === v.id) === i)
      .map(({ id, name, priceNum }) => ({ id, name, price: priceNum }))
    try {
      const saved = { ...p, sessionId: sessionId.current, savedAt: new Date().toISOString() }
      localStorage.setItem('iv_skin_profile', JSON.stringify(saved))
    } catch {}
    fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId.current,
        tier: p.tier,
        baumannLabel: p.baumannLabel,
        scores: { doScore: p.doScore, srScore: p.srScore, wScore: p.wScore, pScore: p.pScore },
        answers,
        recommendedProducts: recs,
      }),
    }).catch(() => {})
    setPhase('analyzing')
    setTimeout(() => setPhase('result'), 2400)
  }

  function restart() {
    setPhase('intro')
    setQIdx(0)
    setAnswers({ q1: null, q2: null, q3: null, q4: [], q5: null, q6: null, q7: [], q8: null })
    setProfile(null)
  }

  // ── Shared section wrapper ───────────────────────────────────────────────
  const sectionClass = 'py-24 bg-iv-black relative overflow-hidden'

  // ── Intro ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-4xl text-center">

          <div className="inline-block rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.20)', background: 'rgba(145,56,50,0.05)' }}>
            Bio-Adaptive Skin Consultation
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-iv-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Skin,{' '}
            <span className="italic" style={{ color: 'var(--iv-gold)' }}>Decoded</span>
          </h2>

          <p className="text-lg text-iv-cream/60 max-w-2xl mx-auto leading-relaxed font-light mb-14">
            Eight questions — the same parameters a clinical esthetician uses — mapped to a precisely tailored Isola Vitale protocol. No camera. No guesswork. Just science.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 max-w-3xl mx-auto">
            {[
              { stat: '8',       label: 'Clinical questions',   note: 'Baumann-validated framework'          },
              { stat: '~2 min',  label: 'To complete',          note: 'No account required'                  },
              { stat: '4',       label: 'Precision tiers',       note: 'Matched to your skin\'s biology'     },
            ].map(({ stat, label, note }) => (
              <div key={label} className="rounded-2xl p-7 text-center"
                style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--iv-gold)', fontFamily: "'Playfair Display', serif" }}>{stat}</div>
                <div className="text-xs font-black text-iv-white uppercase tracking-widest mb-1">{label}</div>
                <div className="text-[10px] text-iv-cream/35 font-light">{note}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase('quiz')}
            className="btn-luxury"
            style={{ padding: '18px 52px', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            Begin Consultation <ArrowRight size={14} />
          </button>

          <p className="text-[10px] text-iv-cream/25 mt-5 uppercase tracking-widest font-black">
            Methodology validated by dermatology — Baumann Skin Type Institute
          </p>
        </div>
      </section>
    )
  }

  // ── Analyzing ────────────────────────────────────────────────────────────
  if (phase === 'analyzing') {
    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-10 animate-spin"
            style={{ border: '2px solid rgba(145,56,50,0.12)', borderTopColor: 'var(--iv-gold)' }} />
          <h3 className="text-2xl font-bold text-iv-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Compiling Your Skin Profile
          </h3>
          <p className="text-iv-cream/35 text-sm mb-10 font-light">
            Mapping your responses to the Bio-Adaptive matrix…
          </p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {[
              'Classifying hydration axis…',
              'Evaluating sensitivity markers…',
              'Mapping lifestyle stressors…',
              'Selecting protocol tier…',
            ].map((msg, i) => (
              <div key={i} className="flex items-center gap-3 text-[10px] font-mono" style={{ color: 'rgba(253,250,245,0.30)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--iv-gold)', opacity: 0.5 }} />
                {msg}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── Result ───────────────────────────────────────────────────────────────
  if (phase === 'result' && profile) {
    const proto = PROTOCOLS[profile.tier]
    const tierNum = profile.tier.replace('t', '')

    // Deduplicated product list (cleanser appears in both AM and PM — add once)
    const allProducts = [...proto.am, ...proto.pm].filter(
      (v, i, a) => a.findIndex(x => x.id === v.id) === i
    )

    const retailTotal   = allProducts.reduce((s, p) => s + p.priceNum, 0)
    const subTotal      = Math.round(retailTotal * 0.80)
    const displayTotal  = subscribe ? subTotal : retailTotal
    const saving        = retailTotal - subTotal

    const handleStartProtocol = async () => {
      setAdding(true)
      allProducts.forEach(p => {
        addItem({
          name:           p.name,
          price:          subscribe ? Math.round(p.priceNum * 0.80) : p.priceNum,
          currency:       'USD',
          quantity:       1,
          sku:            p.id,
          image:          p.image,
          isSubscription: subscribe,
        })
      })
      // Mark as added-to-cart in server record
      fetch('/api/consultation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId.current, addedToCart: true }),
      }).catch(() => {})
      setAdding(false)
      setAdded(true)
      setTimeout(() => setCartOpen(true), 120)
    }

    const metricCards = [
      { label: 'Hydration',         value: profile.hydration.charAt(0).toUpperCase() + profile.hydration.slice(1) },
      { label: 'Reactivity',        value: profile.sensitivity.charAt(0).toUpperCase() + profile.sensitivity.slice(1) },
      { label: 'Pigmentation Risk', value: profile.pScore >= 6 ? 'Elevated' : profile.pScore >= 3 ? 'Moderate' : 'Low' },
      { label: 'Protocol Tier',     value: `Tier ${tierNum} of IV` },
    ]

    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-[10px] font-black uppercase tracking-[0.3em]"
              style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.22)', background: 'rgba(145,56,50,0.06)' }}>
              <CheckCircle2 size={12} /> Protocol Matched
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-iv-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {proto.name}
            </h2>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-5" style={{ color: 'var(--iv-gold)' }}>
              {proto.tagline}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-iv-white"
              style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
              Skin profile:&nbsp;
              <span className="font-black" style={{ color: 'var(--iv-gold)' }}>{profile.baumannLabel}</span>
            </div>
          </div>

          {/* ── Protocol Kit + CTA (main purchase block) ── */}
          <div className="rounded-3xl overflow-hidden mb-8"
            style={{ border: '1px solid rgba(145,56,50,0.28)', background: 'var(--iv-deep-green)' }}>

            {/* Kit header */}
            <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: 'rgba(145,56,50,0.14)' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>
                Your Complete Protocol Kit
              </p>
              <p className="text-iv-cream/50 text-sm font-light">
                {allProducts.length} formulations · Full AM + PM ritual · Matched to your skin biology
              </p>
            </div>

            {/* Product list */}
            <div className="px-8 py-6 space-y-3">
              {allProducts.map(p => {
                const finalPrice = subscribe ? Math.round(p.priceNum * 0.80) : p.priceNum
                return (
                  <div key={p.id} className="flex items-center gap-4 rounded-xl p-4"
                    style={{ background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(145,56,50,0.08)' }}>
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                      style={{ background: 'rgba(145,56,50,0.10)' }}>
                      {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-iv-white">{p.name}</div>
                      <div className="text-xs text-iv-cream/35 font-light mt-0.5">{p.role}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold" style={{ color: 'var(--iv-gold)' }}>
                        ${finalPrice}
                      </div>
                      {subscribe && (
                        <div className="text-xs text-iv-cream/30 line-through font-light">${p.priceNum}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Subscription toggle + pricing */}
            <div className="px-8 pb-8">
              {/* Toggle */}
              <div className="rounded-2xl p-1 flex mb-6"
                style={{ background: 'rgba(0,0,0,0.30)', border: '1px solid rgba(145,56,50,0.18)' }}>
                <button
                  onClick={() => setSubscribe(true)}
                  className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  style={{
                    background: subscribe ? 'var(--iv-gold)' : 'transparent',
                    color:      subscribe ? 'var(--iv-white)' : 'rgba(253,250,245,0.35)',
                  }}
                >
                  Subscribe &amp; Save 20%
                </button>
                <button
                  onClick={() => setSubscribe(false)}
                  className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  style={{
                    background: !subscribe ? 'rgba(145,56,50,0.20)' : 'transparent',
                    color:      !subscribe ? 'var(--iv-cream)' : 'rgba(253,250,245,0.35)',
                  }}
                >
                  One-Time Purchase
                </button>
              </div>

              {/* Price anchor */}
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs text-iv-cream/35 font-light mb-1">
                    {subscribe ? 'Full retail value' : 'Protocol total'}
                  </p>
                  {subscribe && (
                    <p className="text-base text-iv-cream/25 line-through font-light">${retailTotal}</p>
                  )}
                  <p className="text-3xl font-bold text-iv-white">
                    ${displayTotal}
                    <span className="text-sm font-light text-iv-cream/40 ml-2">
                      {subscribe ? '/month' : 'one-time'}
                    </span>
                  </p>
                  {subscribe && (
                    <p className="text-xs font-black mt-1" style={{ color: 'var(--iv-gold)' }}>
                      You save ${saving} — cancel anytime
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex flex-col gap-1.5 text-[10px] text-iv-cream/40 font-light text-right">
                    <span>✓ 48-hr Time To Wow</span>
                    <span>✓ 30-day returns</span>
                    <span>✓ Free tracked delivery</span>
                  </div>
                </div>
              </div>

              {/* Primary CTA */}
              <button
                onClick={handleStartProtocol}
                disabled={adding || added}
                className="w-full flex items-center justify-center gap-3 rounded-2xl transition-all"
                style={{
                  padding: '18px 32px',
                  background: added ? 'rgba(74,222,128,0.15)' : 'var(--iv-gold)',
                  color: added ? '#4ade80' : 'var(--iv-white)',
                  border: added ? '1px solid rgba(74,222,128,0.30)' : 'none',
                  fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase',
                }}
              >
                {adding ? (
                  <><Loader2 size={16} className="animate-spin" /> Adding to Cart…</>
                ) : added ? (
                  <><CheckCircle2 size={16} /> Protocol Added — View Cart</>
                ) : (
                  <><ShoppingBag size={16} /> Start My Protocol</>
                )}
              </button>
              {added && (
                <button
                  onClick={() => setCartOpen(true)}
                  className="w-full mt-3 text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-colors"
                  style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.25)' }}
                >
                  Review Cart &amp; Checkout →
                </button>
              )}
            </div>
          </div>

          {/* ── Clinical Rationale + Metrics ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-8">
            <div className="lg:col-span-2 rounded-3xl p-8"
              style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--iv-gold)' }}>
                Why This Protocol
              </p>
              <p className="text-iv-cream/75 leading-relaxed text-[0.93rem] font-light mb-7">{proto.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {metricCards.map(({ label, value }) => (
                  <div key={label} className="rounded-xl p-4"
                    style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(145,56,50,0.10)' }}>
                    <div className="text-[9px] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--iv-gold)' }}>{label}</div>
                    <div className="text-sm font-bold text-iv-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8"
              style={{ background: 'rgba(145,56,50,0.05)', border: '1px solid rgba(145,56,50,0.18)' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--iv-gold)' }}>
                Key Actives
              </p>
              <div className="space-y-4">
                {proto.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--iv-gold)' }} />
                    <span className="text-[0.82rem] text-iv-cream/70 font-light leading-snug">{ing}</span>
                  </div>
                ))}
              </div>
              {answers.q4.length > 0 && (
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(145,56,50,0.15)' }}>
                  <p className="text-[9px] uppercase tracking-widest font-black mb-3" style={{ color: 'rgba(253,250,245,0.25)' }}>
                    Concerns addressed
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {answers.q4.map(c => (
                      <span key={c} className="text-[9px] rounded-full px-3 py-1 font-black uppercase tracking-wide"
                        style={{ background: 'rgba(145,56,50,0.10)', color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.18)' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── AM/PM routine detail ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
            {([
              { label: 'Morning Ritual', icon: '☀', steps: proto.am },
              { label: 'Evening Ritual', icon: '☽', steps: proto.pm },
            ]).map(({ label, icon, steps }) => (
              <div key={label} className="rounded-3xl p-8"
                style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2"
                  style={{ color: 'var(--iv-gold)' }}>
                  <span>{icon}</span> {label}
                </p>
                <div className="space-y-3">
                  {steps.map((product, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.20)' }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
                        style={{ background: 'rgba(145,56,50,0.15)', color: 'var(--iv-gold)' }}>
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-iv-white truncate">{product.name}</div>
                        <div className="text-[10px] text-iv-cream/35 font-light">{product.role}</div>
                      </div>
                      <div className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--iv-gold)' }}>
                        {product.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Retake */}
          <div className="text-center">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black transition-colors"
              style={{ color: 'rgba(253,250,245,0.25)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(253,250,245,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,250,245,0.25)')}
            >
              <RefreshCcw size={12} /> Retake consultation
            </button>
          </div>

        </div>
      </section>
    )
  }

  // ── Quiz question ─────────────────────────────────────────────────────────
  const meta    = questionMeta(qIdx)
  const options = allOptions(qIdx)
  const progress = ((qIdx + 1) / TOTAL) * 100
  const useGrid = !meta.multi && options.length <= 3

  return (
    <section id="skin-scan" className={sectionClass}>
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(253,250,245,0.35)' }}>
              Question {qIdx + 1} of {TOTAL}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--iv-gold)' }}>
              Bio-Adaptive Consultation
            </span>
          </div>
          <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(145,56,50,0.12)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--iv-gold)' }} />
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-iv-white mb-3 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {meta.heading}
          </h2>
          <p className="text-iv-cream/40 text-sm font-light">{meta.sub}</p>
        </div>

        {/* Options */}
        <div className={`gap-3 mb-10 ${useGrid ? 'grid grid-cols-1 md:grid-cols-3' : 'flex flex-col'}`}>
          {options.map(opt => {
            const sel = isSelected(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => selectOption(opt.value)}
                className="text-left rounded-2xl p-5 transition-all duration-200 cursor-pointer w-full"
                style={{
                  background: sel ? 'rgba(145,56,50,0.12)' : 'var(--iv-deep-green)',
                  border: sel ? '1.5px solid var(--iv-gold)' : '1px solid rgba(145,56,50,0.14)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200"
                    style={{
                      borderColor: sel ? 'var(--iv-gold)' : 'rgba(145,56,50,0.28)',
                      background:  sel ? 'var(--iv-gold)' : 'transparent',
                    }}>
                    {sel && <div className="w-1.5 h-1.5 rounded-full bg-iv-black" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-iv-white leading-snug">{opt.label}</div>
                    {opt.sub && <div className="text-[11px] text-iv-cream/35 mt-0.5 font-light">{opt.sub}</div>}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {qIdx > 0 ? (
            <button
              onClick={() => setQIdx(q => q - 1)}
              className="text-[11px] uppercase tracking-widest font-black transition-colors"
              style={{ color: 'rgba(253,250,245,0.28)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(253,250,245,0.60)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,250,245,0.28)')}
            >
              ← Back
            </button>
          ) : <div />}

          <button
            onClick={advance}
            disabled={!canAdvance()}
            className="btn-luxury"
            style={{
              padding: '14px 40px',
              opacity: canAdvance() ? 1 : 0.32,
              cursor: canAdvance() ? 'pointer' : 'not-allowed',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            {qIdx < TOTAL - 1 ? 'Continue' : 'View My Protocol'} <ChevronRight size={14} />
          </button>
        </div>

        {/* Lifestyle skip hint */}
        {qIdx === 6 && (
          <p className="text-center text-[10px] text-iv-cream/20 mt-5 font-light">
            This question is optional — tap Continue to skip.
          </p>
        )}

      </div>
    </section>
  )
}
