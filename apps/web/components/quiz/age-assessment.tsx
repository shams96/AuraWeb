'use client'

import { useState } from 'react'
import { Button } from '@aurabiosphere/ui'

const PROTOCOL_NAMES: Record<string, string> = {
  T1: 'Preservation Protocol',
  T2: 'Refinement Protocol',
  T3: 'Restoration Protocol',
  T4: 'Longevity Protocol',
}

const questions = [
  {
    id: 'concerns',
    question: 'What best describes your skin right now?',
    options: [
      { label: 'Strong baseline — I want to protect and maintain what I have',         value: 'T1' },
      { label: 'Early changes — I want to correct tone and reinforce my barrier',       value: 'T2' },
      { label: 'Visible signs — I need active regeneration and structural support',     value: 'T3' },
      { label: 'Deep correction — I want maximum-potency cellular restoration',         value: 'T4' },
    ],
  },
]

export function AgeAssessment() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult]   = useState<string | null>(null)

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setResult(newAnswers['concerns'])
    }
  }

  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    const name = PROTOCOL_NAMES[result] ?? 'Restoration Protocol'
    return (
      <div id="age-assessment" className="bg-iv-black py-16 text-iv-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-block border border-iv-gold/20 bg-iv-gold/5 px-6 py-2 rounded-full text-iv-gold text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-lg">
            Protocol Assigned
          </div>
          <h2 className="iv-type-h2 font-semibold mb-6 text-iv-white uppercase tracking-tight">
            Your Prescribed Protocol:<br />
            <em className="text-iv-gold" style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{name}</em>
          </h2>
          <p className="text-lg text-iv-cream/70 mb-10 leading-relaxed font-light">
            Based on your skin profile, your biology calls for the {name}. We have calibrated clinical-grade concentrations precisely for your cellular requirements.
          </p>

          <div className="bg-iv-deep-green/30 border border-iv-gold/10 rounded-2xl p-10 backdrop-blur-md mb-12 text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-iv-gold/5 rounded-full blur-2xl" />
            <h3 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.3em] mb-4">Your Signature Ritual</h3>
            <p className="text-iv-cream/50 mb-10 text-sm font-light">A precision-sequenced AM + PM system engineered for peak biological efficacy.</p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="flex-1 bg-iv-gold hover:bg-iv-gold-light text-iv-black rounded-none py-8 text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-iv-gold/20 transition-all"
                onClick={() => window.location.href = `/shop?tier=${result.toLowerCase()}`}
              >
                Shop Your Protocol
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-iv-gold/20 text-iv-gold hover:bg-iv-gold/5 rounded-none py-8 text-xs font-black uppercase tracking-[0.2em] transition-all"
                onClick={() => window.location.href = '/consultation'}
              >
                Full Skin Analysis
              </Button>
            </div>
          </div>

          <button onClick={resetQuiz} className="text-[10px] font-black uppercase tracking-[0.2em] text-iv-cream/30 hover:text-iv-gold transition-all border-b border-iv-white/5 pb-1">
            Retake Assessment
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[step]

  return (
    <div id="age-assessment" className="bg-iv-black py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Protocol Finder
          </div>
          <h2 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">Find Your Protocol</h2>
          <p className="mt-4 text-iv-cream/60 font-light">Answer one question. Receive your precision-matched biological protocol.</p>
        </div>

        <div className="bg-iv-deep-green/20 p-10 rounded-2xl shadow-2xl border border-iv-gold/10 backdrop-blur-md">
          <h3 className="text-xl font-semibold text-iv-white mb-10 leading-tight">{currentQuestion.question}</h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="w-full text-left p-6 rounded-md border border-iv-white/5 bg-iv-black/40 hover:border-iv-gold hover:bg-iv-gold/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-iv-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <span className="font-medium text-iv-cream/60 group-hover:text-iv-white transition-colors text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
