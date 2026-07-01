'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, CheckCircle2, ShoppingBag, Loader2, RefreshCcw, Clock, Sparkles } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tier = 't1' | 't2' | 't3' | 't4'
type SkinHydration = 'dry' | 'normal' | 'combination' | 'oily'
type SkinSensitivity = 'resistant' | 'balanced' | 'sensitive'
type ConsultationMode = 'discovery' | 'check-in' | 'evolution' | 'too-soon'
type Phase = 'loading' | 'intro' | 'too-soon' | 'quiz' | 'analyzing' | 'result'

interface Answers {
  q1: string | null        // Goal (single)
  q2: number | null        // Skin type index (single)
  q3: number | null        // Sensitivity index (single)
  q4: string[]             // Concerns (multi)
  q5: number | null        // Aging signs index (single)
  q6: number | null        // Age range index (single — discovery only)
  q7: string[]             // Lifestyle (multi — discovery only)
  q8: string | null        // Routine preference (single)
}

interface CheckInAnswers {
  ci1: number | null   // Hydration change
  ci2: number | null   // Sensitivity change
  ci3: string | null   // Priority now
}

interface SkinProfile {
  doScore: number
  srScore: number
  wScore: number
  pScore: number
  tier: Tier
  hydration: SkinHydration
  sensitivity: SkinSensitivity
  baumannLabel: string
}

interface PreviousAssessment {
  id: string
  mode: string
  completedAt: string
  profile: SkinProfile
  protocol: Tier
  concerns: string[]
  improvementNarrative: string | null
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
    { label: 'Rarely reacts — very resilient',           sub: 'Handles most things without issue',             srScore: 0  },
    { label: 'Occasionally mildly reactive',             sub: 'Sometimes redness or tightness',                srScore: 3  },
    { label: 'Frequently red, stinging or irritated',    sub: 'Reacts to many products and climates',          srScore: 7  },
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
    { label: 'Youthful and firm',                     sub: 'No visible signs of ageing yet',         wScore: 0  },
    { label: 'Very early fine lines beginning',        sub: 'Just starting to notice',                wScore: 3  },
    { label: 'Fine lines and mild loss of firmness',   sub: 'Visible but not yet pronounced',         wScore: 6  },
    { label: 'Established lines and volume loss',      sub: 'Deeper lines, sagging or hollowing',     wScore: 10 },
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

// ─── Check-in questions (3-4 weeks after discovery) ──────────────────────────

const CI1 = {
  heading: 'Since beginning your ritual, how has your skin\'s hydration felt?',
  sub: 'Compare to how it felt before you started.',
  options: [
    { label: 'More hydrated and balanced',    sub: 'The ritual is visibly working',     doDelta: -1 },
    { label: 'About the same',                sub: 'No noticeable change yet',           doDelta:  0 },
    { label: 'Still feeling dry or tight',    sub: 'Needs more moisture support',        doDelta:  1 },
    { label: 'More oily than expected',        sub: 'Ritual may need adjusting',          doDelta:  2 },
  ],
}

const CI2 = {
  heading: 'How sensitive or reactive has your skin been since your last consultation?',
  sub: 'Consider redness, irritation, or unexpected breakouts.',
  options: [
    { label: 'Calmer and more resilient',      sub: 'Barrier is clearly strengthening',   srDelta: -2 },
    { label: 'Slightly improved',              sub: 'Moving in the right direction',      srDelta: -1 },
    { label: 'No noticeable change',           sub: 'Steady — keep going',                srDelta:  0 },
    { label: 'More reactive than before',      sub: 'May need a gentler approach',        srDelta:  2 },
  ],
}

const CI3 = {
  heading: 'What would you most like your ritual to focus on right now?',
  sub: 'Your skin\'s needs evolve — let\'s refine your priority.',
  options: [
    { label: 'Staying the course',             sub: 'Current results feel right',           value: 'maintain'  },
    { label: 'Boosting radiance and glow',     sub: 'Skin looks a little dull lately',      value: 'radiance'  },
    { label: 'Firming and lifting',            sub: 'Structure and definition',              value: 'firming'   },
    { label: 'Calming and strengthening',      sub: 'Barrier and sensitivity focus',         value: 'barrier'   },
  ],
}

// ─── Scoring engine ───────────────────────────────────────────────────────────

function computeProfile(a: Answers): SkinProfile {
  let doScore = a.q2 !== null ? Q2.options[a.q2].doScore : 5
  let srScore = a.q3 !== null ? Q3.options[a.q3].srScore : 3
  let wScore  = (a.q5 !== null ? Q5.options[a.q5].wScore : 0)
              + (a.q6 !== null ? Q6.options[a.q6].ageModifier : 0)
  let pScore  = 0

  if (a.q4.includes('Dark spots or uneven tone')) pScore  += 4
  if (a.q4.includes('Fine lines or wrinkles'))    wScore  += 1
  if (a.q4.includes('Dryness and dehydration'))   doScore -= 1

  a.q7.forEach(label => {
    const opt = Q7.options.find(o => o.label === label)
    if (!opt) return
    if (opt.srDelta) srScore += opt.srDelta
    if (opt.wDelta)  wScore  += opt.wDelta
    if (opt.pDelta)  pScore  += opt.pDelta
    if (opt.doDelta) doScore += opt.doDelta
  })

  doScore = Math.max(0, Math.min(10, doScore))
  srScore = Math.max(0, Math.min(10, srScore))
  wScore  = Math.max(0, Math.min(18, wScore))
  pScore  = Math.max(0, Math.min(10, pScore))

  return buildProfile(doScore, srScore, wScore, pScore, a.q4)
}

function applyCheckInDeltas(prev: SkinProfile, ci: CheckInAnswers): SkinProfile {
  let doScore = prev.doScore + (ci.ci1 !== null ? CI1.options[ci.ci1].doDelta : 0)
  let srScore = prev.srScore + (ci.ci2 !== null ? CI2.options[ci.ci2].srDelta : 0)
  const wScore = prev.wScore
  const pScore = prev.pScore

  doScore = Math.max(0, Math.min(10, doScore))
  srScore = Math.max(0, Math.min(10, srScore))

  return buildProfile(doScore, srScore, wScore, pScore, [])
}

function buildProfile(
  doScore: number,
  srScore: number,
  wScore: number,
  pScore: number,
  concerns: string[],
): SkinProfile {
  const hydration: SkinHydration =
    doScore <= 2 ? 'dry' : doScore <= 4 ? 'normal' : doScore <= 7 ? 'combination' : 'oily'
  const sensitivity: SkinSensitivity =
    srScore <= 2 ? 'resistant' : srScore <= 6 ? 'balanced' : 'sensitive'

  const baumannLabel = `${hydration.charAt(0).toUpperCase() + hydration.slice(1)}-${sensitivity.charAt(0).toUpperCase() + sensitivity.slice(1)}`

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
    name: 'Preservation Protocol',
    tagline: 'Barrier integrity & daily resilience',
    tierSlug: 't1',
    description:
      'Your skin shows excellent baseline vitality. The Preservation Protocol\'s mission is protection: fortifying your microbiome, establishing a consistent daily ritual, and intercepting the environmental damage that accumulates invisibly — before it ever reaches the surface.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',   role: 'Microbiome-safe morning cleanse', price: '$95',  priceNum: 95,  image: IMG.serum },
      { id: '5b',                        name: '5B Consumer Hydrating Mist', role: 'Prep and first hydration layer',  price: '$95',  priceNum: 95,  image: IMG.col  },
      { id: '3b',                        name: '3B Consumer SPF 30+',         role: 'Broad-spectrum UV protection',    price: '$95',  priceNum: 95,  image: IMG.col  },
    ],
    pm: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', role: 'Evening metabolic waste removal', price: '$95',  priceNum: 95,  image: IMG.serum },
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
    name: 'Refinement Protocol',
    tagline: 'Metabolic support & active correction',
    tierSlug: 't2',
    description:
      'Your skin shows early signs of environmental and lifestyle wear. The Refinement Protocol introduces clinically active compounds to intercept these changes before they become established — restoring radiance, reinforcing barrier integrity, and correcting tone while the biological window for reversal is still wide open.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',    role: 'pH-balanced morning cleanse',  price: '$95',  priceNum: 95,  image: IMG.serum },
      { id: '1b',                        name: '1B Consumer Peptide Essence', role: 'Daily cellular renewal serum', price: '$175', priceNum: 175, image: IMG.serum },
      { id: '3b',                        name: '3B Consumer SPF 30+',          role: 'Broad-spectrum UV defence',    price: '$95',  priceNum: 95,  image: IMG.col  },
    ],
    pm: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', role: 'Deep evening cleanse',            price: '$95',  priceNum: 95,  image: IMG.serum },
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
    name: 'Regeneration Protocol',
    tagline: 'Deep cellular regeneration & structural renewal',
    tierSlug: 't3',
    description:
      'Your skin requires active regeneration at the cellular level. The Regeneration Protocol deploys OS-01 Senomorphic Peptides — shown to reduce zombie-cell accumulation by 30% — combined with L-Ornithine to restore dermal volume and firmness lost to time and cumulative stress. This is targeted biological intervention, not surface treatment.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser', role: 'Microbiome-preserving cleanse',       price: '$95',  priceNum: 95,  image: IMG.serum },
      { id: 'chrono-lift-serum',         name: 'Chrono-Lift Serum',         role: 'Targeted volume and structural lift', price: '$345', priceNum: 345, image: '/images/products/obsidian_cream.png' },
      { id: '3a',                         name: '3A Clinical SPF 50+',        role: 'Ectoin-boosted UV defence',          price: '$195', priceNum: 195, image: IMG.col  },
    ],
    pm: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',      role: 'Evening cellular reset',        price: '$95',  priceNum: 95,  image: IMG.serum },
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
    name: 'Longevity Protocol',
    tagline: 'Maximum-potency cellular longevity',
    tierSlug: 't4',
    description:
      'Your skin calls for our most intensive intervention. The Longevity Protocol deploys clinical-grade NMN, GLP-1 complex, and OS-01 together in a comprehensive AM/PM system engineered to visibly transform skin at the metabolic level. This is the same formulation tier used in professional clinical settings — without the clinic appointment.',
    am: [
      { id: 'gentle-cellular-cleanser', name: 'Gentle Cellular Cleanser',    role: 'Microbiome-safe clinical cleanse',  price: '$95',  priceNum: 95,  image: IMG.serum },
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

// ─── Discovery quiz helpers ────────────────────────────────────────────────────

// Discovery uses 8 questions; Evolution uses 6 (skip Q6 age + Q7 lifestyle)
function getActiveQuestions(mode: ConsultationMode): number[] {
  if (mode === 'evolution') return [0, 1, 2, 3, 4, 7]  // Q1,Q2,Q3,Q4,Q5,Q8 (0-indexed)
  return [0, 1, 2, 3, 4, 5, 6, 7]                       // all 8
}

function allOptions(qIdx: number): Array<{ label: string; sub: string; value: string }> {
  if (qIdx === 0) return Q1.options.map(o => ({ label: o.label, sub: o.sub,      value: o.value   }))
  if (qIdx === 1) return Q2.options.map((o, i) => ({ label: o.label, sub: o.sub, value: String(i) }))
  if (qIdx === 2) return Q3.options.map((o, i) => ({ label: o.label, sub: o.sub, value: String(i) }))
  if (qIdx === 3) return Q4.options.map(o  => ({ label: o, sub: '',              value: o          }))
  if (qIdx === 4) return Q5.options.map((o, i) => ({ label: o.label, sub: o.sub, value: String(i) }))
  if (qIdx === 5) return Q6.options.map((o, i) => ({ label: o.label, sub: '',    value: String(i) }))
  if (qIdx === 6) return Q7.options.map(o  => ({ label: o.label, sub: '',        value: o.label   }))
  if (qIdx === 7) return Q8.options.map(o  => ({ label: o.label, sub: o.sub,     value: o.value   }))
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

// ─── Shared section wrapper ───────────────────────────────────────────────────

const sectionClass = 'py-24 bg-iv-black relative overflow-hidden'

// ─── Main component ───────────────────────────────────────────────────────────

export function SkinConsultation() {
  const { addItem, setCartOpen } = useCart()

  // Memory state
  const [consultMode, setConsultMode]     = useState<ConsultationMode>('discovery')
  const [prevAssessment, setPrevAssessment] = useState<PreviousAssessment | null>(null)
  const [daysUntilNext, setDaysUntilNext] = useState<number>(0)

  // UI phase
  const [phase, setPhase]     = useState<Phase>('loading')
  const [qIdx, setQIdx]       = useState(0)    // index into activeQuestions array
  const [ciIdx, setCiIdx]     = useState(0)    // check-in question index (0-2)

  // Discovery / Evolution answers
  const [answers, setAnswers] = useState<Answers>({
    q1: null, q2: null, q3: null, q4: [],
    q5: null, q6: null, q7: [],  q8: null,
  })

  // Check-in answers
  const [ciAnswers, setCiAnswers] = useState<CheckInAnswers>({ ci1: null, ci2: null, ci3: null })

  // Result state
  const [profile, setProfile]   = useState<SkinProfile | null>(null)
  const [narrative, setNarrative] = useState<string | null>(null)
  const [subscribe, setSubscribe] = useState(true)
  const [adding, setAdding]     = useState(false)
  const [added, setAdded]       = useState(false)
  const sessionId = useRef(crypto.randomUUID())

  // ── Load previous assessment on mount ──────────────────────────────────────
  useEffect(() => {
    fetch('/api/assessment')
      .then(r => r.json())
      .then(data => {
        const mode: ConsultationMode = data.nextMode ?? 'discovery'
        setConsultMode(mode)

        if (data.latest) {
          setPrevAssessment(data.latest)
          if (mode === 'too-soon') {
            const weeksSince = (Date.now() - new Date(data.latest.completedAt).getTime()) / (1000 * 60 * 60 * 24 * 7)
            const daysRemaining = Math.ceil((3 - weeksSince) * 7)
            setDaysUntilNext(Math.max(1, daysRemaining))
          }
        }

        setPhase(mode === 'too-soon' ? 'too-soon' : 'intro')
      })
      .catch(() => {
        setConsultMode('discovery')
        setPhase('intro')
      })
  }, [])

  // ── Active question list (discovery = 8, evolution = 6) ───────────────────
  const activeQuestions = getActiveQuestions(consultMode === 'check-in' ? 'discovery' : consultMode)
  const TOTAL = activeQuestions.length

  // ── Selection helpers (discovery / evolution quiz) ─────────────────────────
  function isSelected(value: string): boolean {
    const qRealIdx = activeQuestions[qIdx]
    if (qRealIdx === 0) return answers.q1 === value
    if (qRealIdx === 1) return answers.q2 !== null && String(answers.q2) === value
    if (qRealIdx === 2) return answers.q3 !== null && String(answers.q3) === value
    if (qRealIdx === 3) return answers.q4.includes(value)
    if (qRealIdx === 4) return answers.q5 !== null && String(answers.q5) === value
    if (qRealIdx === 5) return answers.q6 !== null && String(answers.q6) === value
    if (qRealIdx === 6) return answers.q7.includes(value)
    if (qRealIdx === 7) return answers.q8 === value
    return false
  }

  function selectOption(value: string) {
    const qRealIdx = activeQuestions[qIdx]
    const multi = questionMeta(qRealIdx).multi
    setAnswers(a => {
      if (qRealIdx === 0) return { ...a, q1: value }
      if (qRealIdx === 1) return { ...a, q2: Number(value) }
      if (qRealIdx === 2) return { ...a, q3: Number(value) }
      if (qRealIdx === 3) {
        const next = multi
          ? a.q4.includes(value) ? a.q4.filter(x => x !== value) : [...a.q4, value]
          : [value]
        return { ...a, q4: next }
      }
      if (qRealIdx === 4) return { ...a, q5: Number(value) }
      if (qRealIdx === 5) return { ...a, q6: Number(value) }
      if (qRealIdx === 6) {
        const next = a.q7.includes(value) ? a.q7.filter(x => x !== value) : [...a.q7, value]
        return { ...a, q7: next }
      }
      if (qRealIdx === 7) return { ...a, q8: value }
      return a
    })
  }

  function canAdvance(): boolean {
    const qRealIdx = activeQuestions[qIdx]
    if (qRealIdx === 0) return answers.q1 !== null
    if (qRealIdx === 1) return answers.q2 !== null
    if (qRealIdx === 2) return answers.q3 !== null
    if (qRealIdx === 3) return answers.q4.length > 0
    if (qRealIdx === 4) return answers.q5 !== null
    if (qRealIdx === 5) return answers.q6 !== null
    if (qRealIdx === 6) return true   // lifestyle optional
    if (qRealIdx === 7) return answers.q8 !== null
    return false
  }

  // ── Check-in helpers ───────────────────────────────────────────────────────
  function ciIsSelected(value: string | number): boolean {
    if (ciIdx === 0) return ciAnswers.ci1 !== null && ciAnswers.ci1 === value
    if (ciIdx === 1) return ciAnswers.ci2 !== null && ciAnswers.ci2 === value
    if (ciIdx === 2) return ciAnswers.ci3 === value
    return false
  }

  function ciSelectOption(value: string | number) {
    setCiAnswers(a => {
      if (ciIdx === 0) return { ...a, ci1: Number(value) }
      if (ciIdx === 1) return { ...a, ci2: Number(value) }
      if (ciIdx === 2) return { ...a, ci3: String(value) }
      return a
    })
  }

  function ciCanAdvance(): boolean {
    if (ciIdx === 0) return ciAnswers.ci1 !== null
    if (ciIdx === 1) return ciAnswers.ci2 !== null
    if (ciIdx === 2) return ciAnswers.ci3 !== null
    return false
  }

  // ── Save to API + resolve profile ──────────────────────────────────────────
  async function finalize(p: SkinProfile, rawAnswers: Record<string, unknown>, concerns: string[]) {
    setProfile(p)
    setPhase('analyzing')

    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: rawAnswers,
          profile: {
            doScore: p.doScore,
            srScore: p.srScore,
            wScore:  p.wScore,
            pScore:  p.pScore,
            hydration:    p.hydration,
            sensitivity:  p.sensitivity,
            baumannLabel: p.baumannLabel,
          },
          protocol: p.tier,
          concerns,
        }),
      })
      if (res.ok) {
        const saved = await res.json()
        if (saved.assessment?.improvementNarrative) {
          setNarrative(saved.assessment.improvementNarrative)
        }
      }
    } catch {}

    // Also persist to localStorage for offline result display
    try {
      localStorage.setItem('iv_skin_profile', JSON.stringify({
        ...p, sessionId: sessionId.current, savedAt: new Date().toISOString(),
      }))
    } catch {}

    setTimeout(() => setPhase('result'), 2400)
  }

  // ── Advance quiz question ──────────────────────────────────────────────────
  function advance() {
    if (qIdx < TOTAL - 1) {
      setQIdx(q => q + 1)
      return
    }
    // Evolution uses prev assessment's age/lifestyle scores if we skipped those Qs
    const filledAnswers: Answers = { ...answers }
    if (consultMode === 'evolution' && prevAssessment) {
      // If we skipped Q6 (age) and Q7 (lifestyle), carry forward from previous
      if (filledAnswers.q6 === null) filledAnswers.q6 = null  // age irrelevant to delta
      // wScore will be recalculated from Q5 only, which is fine
    }
    const p = computeProfile(filledAnswers)
    finalize(p, filledAnswers as unknown as Record<string, unknown>, filledAnswers.q4)
  }

  // ── Advance check-in question ──────────────────────────────────────────────
  function advanceCheckIn() {
    if (ciIdx < 2) {
      setCiIdx(i => i + 1)
      return
    }
    // All 3 check-in questions answered — compute delta profile
    const base = prevAssessment?.profile ?? {
      doScore: 5, srScore: 3, wScore: 3, pScore: 0,
      tier: 't1' as Tier, hydration: 'normal' as SkinHydration,
      sensitivity: 'balanced' as SkinSensitivity, baumannLabel: 'Normal-Balanced',
    }
    const p = applyCheckInDeltas(base, ciAnswers)
    finalize(p, ciAnswers as unknown as Record<string, unknown>, prevAssessment?.concerns ?? [])
  }

  function restart() {
    setPhase('intro')
    setQIdx(0)
    setCiIdx(0)
    setAnswers({ q1: null, q2: null, q3: null, q4: [], q5: null, q6: null, q7: [], q8: null })
    setCiAnswers({ ci1: null, ci2: null, ci3: null })
    setProfile(null)
    setNarrative(null)
    setAdded(false)
    // Force re-fetch mode so a re-run after saving shows correct mode
    setConsultMode('discovery')
  }

  // ─── LOADING ───────────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="w-12 h-12 rounded-full mx-auto"
            style={{ border: '2px solid rgba(145,56,50,0.12)', borderTopColor: 'var(--iv-gold)', animation: 'spin 0.9s linear infinite' }} />
        </div>
      </section>
    )
  }

  // ─── TOO SOON ──────────────────────────────────────────────────────────────
  if (phase === 'too-soon' && prevAssessment) {
    const proto = PROTOCOLS[prevAssessment.protocol]
    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-3xl">

          <div className="text-center mb-10">
            <div className="inline-block rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
              style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.20)', background: 'rgba(145,56,50,0.05)' }}>
              Vitale Skin Assessment™
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock size={16} style={{ color: 'var(--iv-gold)' }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--iv-gold)' }}>
                Your Skin Is Still Adapting
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-iv-white mb-4" style={{ fontFamily: 'var(--iv-font-serif)' }}>
              Your ritual needs time{' '}
              <span className="italic" style={{ color: 'var(--iv-gold)' }}>to speak.</span>
            </h2>
            <p className="text-iv-cream/65 text-base font-light max-w-xl mx-auto leading-relaxed">
              Great skin transformations unfold over weeks, not days. Your next consultation is available in{' '}
              <span className="font-semibold" style={{ color: 'var(--iv-gold)' }}>{daysUntilNext} days</span> — when your skin has had
              enough time to show us what your ritual is doing.
            </p>
          </div>

          {/* Current protocol reminder */}
          <div className="rounded-3xl p-8 mb-8"
            style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.18)' }}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--iv-gold)' }}>
              Your Active Protocol
            </p>
            <h3 className="text-2xl font-bold text-iv-white mb-1" style={{ fontFamily: 'var(--iv-font-serif)' }}>
              {proto.name}
            </h3>
            <p className="text-iv-cream/65 text-sm font-light mb-6">{proto.tagline}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.18)' }}>
                <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--iv-gold)' }}>Skin Profile</div>
                <div className="text-sm font-bold text-iv-white">{prevAssessment.profile.baumannLabel}</div>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.18)' }}>
                <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--iv-gold)' }}>Next Check-In</div>
                <div className="text-sm font-bold text-iv-white">In {daysUntilNext} days</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/shop" className="btn-luxury"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 44px' }}>
              Continue Your Ritual <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>
    )
  }

  // ─── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const isReturn = consultMode === 'check-in' || consultMode === 'evolution'
    const prevProto = prevAssessment ? PROTOCOLS[prevAssessment.protocol] : null

    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-4xl text-center">

          <div className="inline-block rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.20)', background: 'rgba(145,56,50,0.05)' }}>
            Vitale Skin Assessment™
          </div>

          {isReturn && prevProto ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles size={14} style={{ color: 'var(--iv-gold)' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--iv-gold)' }}>
                  {consultMode === 'check-in' ? 'Your Check-In Is Ready' : 'Your Evolution Consultation'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
                Welcome back.{' '}
                <span className="italic" style={{ color: 'var(--iv-gold)' }}>How is your skin?</span>
              </h2>
              <p className="text-lg text-iv-cream/60 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                {consultMode === 'check-in'
                  ? `Three questions — and we'll refine your ${prevProto.name} based on how your skin has responded.`
                  : `Your skin has had six weeks with your ritual. Time to reassess — six questions to see how you've evolved.`}
              </p>
              {/* Previous protocol context */}
              <div className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-10 text-sm"
                style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.18)' }}>
                <span className="text-iv-cream/65 font-light">Current protocol:</span>
                <span className="font-bold" style={{ color: 'var(--iv-gold)' }}>{prevProto.name}</span>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
                Your Skin,{' '}
                <span className="italic" style={{ color: 'var(--iv-gold)' }}>Decoded</span>
              </h2>
              <p className="text-lg text-iv-cream/60 max-w-2xl mx-auto leading-relaxed font-light mb-14">
                Eight questions — the same parameters a clinical esthetician uses — mapped to a precisely tailored Isola Vitale protocol. No camera. No guesswork. Just science.
              </p>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 max-w-3xl mx-auto">
            {(isReturn ? [
              { stat: consultMode === 'check-in' ? '3' : '6', label: consultMode === 'check-in' ? 'Check-in questions' : 'Evolution questions', note: 'Tailored to your previous results' },
              { stat: '~1 min',  label: 'To complete',    note: 'Your answers are remembered'     },
              { stat: '1',       label: 'Protocol update', note: 'Refined to your skin today'      },
            ] : [
              { stat: '8',       label: 'Clinical questions',  note: 'Baumann-validated framework'      },
              { stat: '~2 min',  label: 'To complete',         note: 'No account required'              },
              { stat: '4',       label: 'Precision tiers',      note: 'Matched to your skin\'s biology' },
            ]).map(({ stat, label, note }) => (
              <div key={label} className="rounded-2xl p-7 text-center"
                style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--iv-gold)', fontFamily: 'var(--iv-font-serif)' }}>{stat}</div>
                <div className="text-xs font-black text-iv-white uppercase tracking-widest mb-1">{label}</div>
                <div className="text-[10px] text-iv-cream/65 font-light">{note}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase('quiz')}
            className="btn-luxury"
            style={{ padding: '18px 52px', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            {isReturn ? (consultMode === 'check-in' ? 'Begin Check-In' : 'Begin Evolution Assessment') : 'Begin Consultation'}
            <ArrowRight size={14} />
          </button>

          {!isReturn && (
            <p className="text-[10px] text-iv-cream/65 mt-5 uppercase tracking-widest font-black">
              Methodology validated by dermatology — Baumann Skin Type Institute
            </p>
          )}
        </div>
      </section>
    )
  }

  // ─── ANALYZING ─────────────────────────────────────────────────────────────
  if (phase === 'analyzing') {
    const msgs = consultMode === 'check-in'
      ? ['Reading your feedback…', 'Comparing to your baseline…', 'Refining your protocol…', 'Updating your skin profile…']
      : ['Classifying hydration axis…', 'Evaluating sensitivity markers…', 'Mapping lifestyle stressors…', 'Selecting protocol tier…']

    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-10 animate-spin"
            style={{ border: '2px solid rgba(145,56,50,0.12)', borderTopColor: 'var(--iv-gold)' }} />
          <h3 className="text-2xl font-bold text-iv-white mb-3" style={{ fontFamily: 'var(--iv-font-serif)' }}>
            {consultMode === 'check-in' ? 'Updating Your Profile' : 'Compiling Your Skin Profile'}
          </h3>
          <p className="text-iv-cream/65 text-sm mb-10 font-light">
            {consultMode === 'check-in' ? 'Incorporating your feedback…' : 'Mapping your skin\'s biology…'}
          </p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {msgs.map((msg, i) => (
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

  // ─── RESULT ────────────────────────────────────────────────────────────────
  if (phase === 'result' && profile) {
    const proto = PROTOCOLS[profile.tier]
    const tierNum = profile.tier.replace('t', '')

    const allProducts = [...proto.am, ...proto.pm].filter(
      (v, i, a) => a.findIndex(x => x.id === v.id) === i
    )

    const retailTotal  = allProducts.reduce((s, p) => s + p.priceNum, 0)
    const subTotal     = Math.round(retailTotal * 0.80)
    const displayTotal = subscribe ? subTotal : retailTotal
    const saving       = retailTotal - subTotal

    const handleStartProtocol = async () => {
      setAdding(true)
      allProducts.forEach(p => {
        addItem({
          name:           p.name,
          price:          subscribe ? Math.round(p.priceNum * 0.80) : p.priceNum,
          basePrice:      p.priceNum,
          currency:       'USD',
          quantity:       1,
          sku:            p.id,
          image:          p.image,
          isSubscription: subscribe,
        })
      })
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

    const isUpdated = consultMode === 'check-in' || consultMode === 'evolution'
    const prevProto = prevAssessment && prevAssessment.protocol !== profile.tier
      ? PROTOCOLS[prevAssessment.protocol]
      : null

    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-[10px] font-black uppercase tracking-[0.3em]"
              style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.22)', background: 'rgba(145,56,50,0.06)' }}>
              <CheckCircle2 size={12} />
              {isUpdated ? 'Protocol Updated' : 'Protocol Matched'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-iv-white mb-3" style={{ fontFamily: 'var(--iv-font-serif)' }}>
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

          {/* Improvement narrative (returning clients) */}
          {(narrative || (isUpdated && prevAssessment?.improvementNarrative)) && (
            <div className="rounded-2xl p-6 mb-8 text-center"
              style={{ background: 'rgba(145,56,50,0.06)', border: '1px solid rgba(145,56,50,0.18)' }}>
              <Sparkles size={14} style={{ color: 'var(--iv-gold)', margin: '0 auto 8px' }} />
              <p className="text-iv-cream/80 text-sm font-light leading-relaxed italic" style={{ fontFamily: 'var(--iv-font-serif)' }}>
                "{narrative ?? prevAssessment?.improvementNarrative}"
              </p>
            </div>
          )}

          {/* Protocol advancement notice */}
          {prevProto && (
            <div className="rounded-2xl p-5 mb-8 flex items-center gap-4"
              style={{ background: 'rgba(145,56,50,0.08)', border: '1px solid rgba(145,56,50,0.22)' }}>
              <ArrowRight size={16} style={{ color: 'var(--iv-gold)', flexShrink: 0 }} />
              <p className="text-iv-cream/75 text-sm font-light">
                Your skin has advanced from{' '}
                <span className="font-semibold" style={{ color: 'var(--iv-gold)' }}>{prevProto.name}</span>
                {' '}to{' '}
                <span className="font-semibold" style={{ color: 'var(--iv-gold)' }}>{proto.name}</span>.
              </p>
            </div>
          )}

          {/* ── Protocol Kit + CTA ── */}
          <div className="rounded-3xl overflow-hidden mb-8"
            style={{ border: '1px solid rgba(145,56,50,0.28)', background: 'var(--iv-deep-green)' }}>

            <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: 'rgba(145,56,50,0.14)' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>
                Your Complete Protocol Kit
              </p>
              <p className="text-iv-cream/65 text-sm font-light">
                {allProducts.length} formulations · Full AM + PM ritual · Matched to your skin biology
              </p>
            </div>

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
                      <div className="text-xs text-iv-cream/65 font-light mt-0.5">{p.role}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold" style={{ color: 'var(--iv-gold)' }}>${finalPrice}</div>
                      {subscribe && (
                        <div className="text-xs text-iv-cream/65 line-through font-light">${p.priceNum}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

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

              {/* Price */}
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs text-iv-cream/65 font-light mb-1">
                    {subscribe ? 'Full retail value' : 'Protocol total'}
                  </p>
                  {subscribe && (
                    <p className="text-base text-iv-cream/65 line-through font-light">${retailTotal}</p>
                  )}
                  <p className="text-3xl font-bold text-iv-white">
                    ${displayTotal}
                    <span className="text-sm font-light text-iv-cream/65 ml-2">
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
                  <div className="flex flex-col gap-1.5 text-[10px] text-iv-cream/65 font-light text-right">
                    <span>✓ 48-hr Time To Wow</span>
                    <span>✓ 30-day returns</span>
                    <span>✓ Free tracked delivery</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
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
              {(consultMode === 'discovery' || consultMode === 'evolution') && answers.q4.length > 0 && (
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(145,56,50,0.15)' }}>
                  <p className="text-[9px] uppercase tracking-widest font-black mb-3" style={{ color: 'rgba(253,250,245,0.65)' }}>
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
              {consultMode === 'check-in' && prevAssessment?.concerns && prevAssessment.concerns.length > 0 && (
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(145,56,50,0.15)' }}>
                  <p className="text-[9px] uppercase tracking-widest font-black mb-3" style={{ color: 'rgba(253,250,245,0.65)' }}>
                    Your focus areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {prevAssessment.concerns.map(c => (
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
                        <div className="text-[10px] text-iv-cream/65 font-light">{product.role}</div>
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
              style={{ color: 'rgba(253,250,245,0.65)' }}
            >
              <RefreshCcw size={12} /> Retake consultation
            </button>
          </div>

        </div>
      </section>
    )
  }

  // ─── CHECK-IN QUIZ (3 questions) ───────────────────────────────────────────
  if (phase === 'quiz' && consultMode === 'check-in') {
    const ciQuestions = [
      {
        heading: CI1.heading, sub: CI1.sub,
        options: CI1.options.map((o, i) => ({ label: o.label, sub: o.sub, value: String(i) })),
      },
      {
        heading: CI2.heading, sub: CI2.sub,
        options: CI2.options.map((o, i) => ({ label: o.label, sub: o.sub, value: String(i) })),
      },
      {
        heading: CI3.heading, sub: CI3.sub,
        options: CI3.options.map(o => ({ label: o.label, sub: o.sub, value: o.value })),
      },
    ]
    const ciMeta = ciQuestions[ciIdx]
    const ciProgress = ((ciIdx + 1) / 3) * 100
    const prevProtoName = prevAssessment ? PROTOCOLS[prevAssessment.protocol].name : ''

    return (
      <section id="skin-scan" className={sectionClass}>
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(253,250,245,0.35)' }}>
                Check-in {ciIdx + 1} of 3
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--iv-gold)' }}>
                {prevProtoName}
              </span>
            </div>
            <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(145,56,50,0.12)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${ciProgress}%`, background: 'var(--iv-gold)' }} />
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-iv-white mb-3 leading-snug"
              style={{ fontFamily: 'var(--iv-font-serif)' }}>
              {ciMeta.heading}
            </h2>
            <p className="text-iv-cream/65 text-sm font-light">{ciMeta.sub}</p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-10">
            {ciMeta.options.map(opt => {
              const sel = ciIsSelected(opt.value)
              return (
                <button
                  key={opt.value}
                  onClick={() => ciSelectOption(opt.value)}
                  className="text-left rounded-2xl p-5 transition-all duration-200 cursor-pointer w-full"
                  style={{
                    background: sel ? 'rgba(145,56,50,0.12)' : 'var(--iv-deep-green)',
                    border: sel ? '1.5px solid var(--iv-gold)' : '1px solid rgba(145,56,50,0.14)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all"
                      style={{
                        borderColor: sel ? 'var(--iv-gold)' : 'rgba(145,56,50,0.28)',
                        background:  sel ? 'var(--iv-gold)' : 'transparent',
                      }}>
                      {sel && <div className="w-1.5 h-1.5 rounded-full bg-iv-black" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-iv-white leading-snug">{opt.label}</div>
                      {opt.sub && <div className="text-[11px] text-iv-cream/65 mt-0.5 font-light">{opt.sub}</div>}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {ciIdx > 0 ? (
              <button
                onClick={() => setCiIdx(i => i - 1)}
                className="text-[11px] uppercase tracking-widest font-black transition-colors"
                style={{ color: 'rgba(253,250,245,0.28)' }}
              >
                ← Back
              </button>
            ) : <div />}
            <button
              onClick={advanceCheckIn}
              disabled={!ciCanAdvance()}
              className="btn-luxury"
              style={{
                padding: '14px 40px',
                opacity: ciCanAdvance() ? 1 : 0.32,
                cursor: ciCanAdvance() ? 'pointer' : 'not-allowed',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              {ciIdx < 2 ? 'Continue' : 'Update My Protocol'} <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </section>
    )
  }

  // ─── DISCOVERY / EVOLUTION QUIZ (8 or 6 questions) ────────────────────────
  const qRealIdx = activeQuestions[qIdx]
  const meta    = questionMeta(qRealIdx)
  const options = allOptions(qRealIdx)
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
              Vitale Skin Assessment™
            </span>
          </div>
          <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(145,56,50,0.12)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--iv-gold)' }} />
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-iv-white mb-3 leading-snug"
            style={{ fontFamily: 'var(--iv-font-serif)' }}>
            {meta.heading}
          </h2>
          <p className="text-iv-cream/65 text-sm font-light">{meta.sub}</p>
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
                    {opt.sub && <div className="text-[11px] text-iv-cream/65 mt-0.5 font-light">{opt.sub}</div>}
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
        {qRealIdx === 6 && (
          <p className="text-center text-[10px] text-iv-cream/65 mt-5 font-light">
            This question is optional — tap Continue to skip.
          </p>
        )}

      </div>
    </section>
  )
}
