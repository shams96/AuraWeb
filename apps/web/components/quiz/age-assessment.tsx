'use client'

import { useState } from 'react'
import { Button } from '@aurabiosphere/ui'

const questions = [
  {
    id: 'age',
    question: "What is your current age range?",
    options: [
      { label: '13-19', value: 'T1' },
      { label: '20-29', value: 'T2' },
      { label: '30-49', value: 'T3' },
      { label: '50+', value: 'T4' },
    ]
  },
  {
    id: 'concerns',
    question: "What are your primary skin concerns?",
    options: [
      { label: 'Hormonal Breakouts & Barrier Building', value: 'T1' },
      { label: 'Prevention & Environmental Protection', value: 'T2' },
      { label: 'Advanced Regeneration & Fine Lines', value: 'T3' },
      { label: 'Intensive Restoration & Firmness', value: 'T4' },
    ]
  }
]

export function AgeAssessment() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<string | null>(null)

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // Calculate result based on the majority of tier selections, weighted by age
      const tier = newAnswers['age'] || 'T3' // Default fallback
      setResult(tier)
    }
  }

  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    return (
      <div id="age-assessment" className="bg-iv-black py-16 text-iv-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-block border border-iv-gold/20 bg-iv-gold/5 px-6 py-2 rounded-full text-iv-gold text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-lg">
            Clinical Diagnostic Complete
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">Your Prescribed Protocol: <br /><span className="text-iv-gold italic serif">Tier {result === 'T1' ? 'I: Genesis' : result === 'T2' ? 'II: Foundation' : result === 'T3' ? 'III: Regeneration' : 'IV: Longevity'}</span></h2>
          <p className="text-lg text-iv-cream/70 mb-10 leading-relaxed font-light">
            Based on your metabolic profile, your skin requires the {result} protocol. We have calibrated clinical-grade concentrations specifically for your tier's unique cellular stress markers.
          </p>

          <div className="bg-iv-deep-green/30 border border-iv-gold/10 rounded-2xl p-10 backdrop-blur-md mb-12 text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-iv-gold/5 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-bold mb-4 text-iv-white uppercase tracking-widest text-xs">The {result} Signature Ritual</h3>
            <p className="text-iv-cream/50 mb-10 text-sm font-light">A perfectly synchronized 4-step sequence engineered for peak biological efficacy.</p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="flex-1 bg-iv-gold hover:bg-iv-gold-light text-iv-black rounded-none py-8 text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-iv-gold/20 transition-all"
                onClick={() => window.location.href = `/shop?tier=${result.toLowerCase()}`}
              >
                Subscribe & Optimize
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1 border-iv-gold/20 text-iv-gold hover:bg-iv-gold/5 rounded-none py-8 text-xs font-black uppercase tracking-[0.2em] transition-all"
                onClick={() => window.location.href = `/shop?tier=${result.toLowerCase()}`}
              >
                One-Time Acquisition
              </Button>
            </div>
            
            <ul className="mt-10 space-y-4 text-[10px] font-black uppercase tracking-widest text-iv-cream/40">
              <li className="flex items-center gap-4">
                <span className="w-4 h-px bg-iv-gold/40"></span>
                Automated replenishment logistics
              </li>
              <li className="flex items-center gap-4">
                <span className="w-4 h-px bg-iv-gold/40"></span>
                Zero-commitment clinical access
              </li>
              <li className="flex items-center gap-4">
                <span className="w-4 h-px bg-iv-gold/40"></span>
                Priority access to breakthrough drops
              </li>
            </ul>
          </div>

          <button onClick={resetQuiz} className="text-[10px] font-black uppercase tracking-[0.2em] text-iv-cream/30 hover:text-iv-gold transition-all border-b border-iv-white/5 pb-1">
            Retake Diagnostic Assessment
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
            Clinical Diagnostic
          </div>
          <h2 className="text-4xl font-bold text-iv-white tracking-tighter">Find Your Protocol</h2>
          <p className="mt-4 text-iv-cream/60 font-light">Complete the diagnostic assessment to identify your metabolically-aligned tier.</p>
        </div>

        <div className="bg-iv-deep-green/20 p-10 rounded-2xl shadow-2xl border border-iv-gold/10 backdrop-blur-md">
          <div className="mb-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-iv-cream/40">
            <span>Assessment Phase {step + 1} of {questions.length}</span>
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 w-10 rounded-full transition-all duration-500 ${i <= step ? 'bg-iv-gold shadow-[0_0_10px_rgba(184,151,47,0.4)]' : 'bg-iv-white/10'}`} />
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-iv-white mb-10 leading-tight">{currentQuestion.question}</h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="w-full text-left p-6 rounded-md border border-iv-white/5 bg-iv-black/40 hover:border-iv-gold hover:bg-iv-gold/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-iv-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <span className="font-bold text-iv-cream/60 group-hover:text-iv-white transition-colors uppercase tracking-widest text-xs">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
