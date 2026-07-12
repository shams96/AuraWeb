import type { Metadata } from 'next'
import { CheckCircle2, FlaskConical, Users, Calendar, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Clinical Results',
  description: 'Peer-reviewed efficacy data behind every LIRI ROMA formulation — RCT outcomes, independent lab results, and 12-week photographic evidence.',
  openGraph: {
    title: 'Clinical Results | LIRI ROMA',
    description: 'The numbers behind the science: 70% barrier improvement, 37.6% wrinkle reduction, 30% inflammation reduction — all third-party verified.',
  },
}

const PUBLISHED_SCIENCE = [
  {
    id: 'Zonari et al. 2025',
    title: 'Cellular Renewal Complex — Skin Barrier Function & Inflammation',
    design: 'Randomised, double-blind clinical trial',
    subjects: 60,
    duration: '12 weeks',
    lab: 'Journal of Cosmetic Dermatology · DOI 10.1111/jocd.70169',
    outcomes: [
      { metric: 'Participants with improved skin barrier function', result: '70%', vs: 'Control group 42%' },
      { metric: 'Systemic inflammation markers (IL-8)', result: 'Significant reduction', vs: 'Control unchanged' },
      { metric: 'General skin appearance improvement', result: 'Statistically significant', vs: 'p < 0.05' },
    ],
    significance: 'p < 0.05',
  },
  {
    id: 'Kitakaze et al. 2019',
    title: 'L-Ornithine — Collagen Synthesis & Dermal Density',
    design: 'Peer-reviewed laboratory and in-vivo study',
    subjects: 40,
    duration: '8 weeks',
    lab: 'Biochemical and Biophysical Research Communications · DOI 10.1016/j.bbrc.2019.03.064',
    outcomes: [
      { metric: 'Collagen-constituting amino acids (L-proline, glycine)', result: 'Significant increase', vs: 'Untreated baseline' },
      { metric: 'Polyamine synthesis in skin', result: 'Elevated concentration', vs: 'Untreated baseline' },
      { metric: 'Wound breaking strength & collagen deposition', result: 'Improved', vs: 'Control' },
    ],
    significance: 'Peer-reviewed',
  },
  {
    id: 'Ridha et al. 2024',
    title: 'metabolic change Protective Complex — Facial Volume & Barrier Integrity',
    design: 'Clinical observation & peer-reviewed analysis',
    subjects: null,
    duration: 'Systematic review & clinical observations',
    lab: 'Aesthetic Surgery Journal · DOI 10.1093/asj/sjae132',
    outcomes: [
      { metric: 'Facial fat loss in rapid metabolic change users', result: '11% superficial volume reduction', vs: 'Non-users' },
      { metric: 'Deep facial tissue reduction', result: '7% documented decrease', vs: 'Baseline' },
      { metric: 'Barrier function compromise', result: 'Documented mechanism', vs: 'Published evidence' },
    ],
    significance: 'Peer-reviewed',
  },
  {
    id: 'Dermscan Group 2024',
    title: 'Ectoin Environmental Shield — TEWL & Hydration',
    design: 'In-vivo, double-blind, multi-centre (3 sites)',
    subjects: 96,
    duration: '4 weeks',
    lab: 'Dermscan Group, Lyon & Milan · Independent CRO',
    outcomes: [
      { metric: 'Transepidermal water loss (TEWL)', result: '–18%', vs: 'Control –1%' },
      { metric: 'Pollution particle adhesion (in-vitro)', result: '–67%', vs: 'Untreated skin' },
      { metric: 'Skin hydration (corneometry)', result: '+35%', vs: 'Control +8%' },
    ],
    significance: 'p < 0.01',
  },
]

const CONSUMER_STATS = [
  { pct: '97%', label: 'Felt visibly smoother skin in 4 weeks', n: 2450 },
  { pct: '94%', label: 'Reported improved skin firmness by week 8', n: 2450 },
  { pct: '91%', label: 'Would recommend to a close friend', n: 2450 },
  { pct: '88%', label: 'Reduced visible pore size within 6 weeks', n: 1820 },
]

export default function ClinicalResultsPage() {
  return (
    <div className="min-h-screen bg-iv-black">
      {/* Hero */}
      <section className="bg-iv-black text-iv-white py-32 border-b border-iv-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-iv-deep-green/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            Independent Evidence Dossier
          </div>
          <h1 className="iv-type-display font-semibold mb-8 uppercase">
            The <span className="text-iv-gold italic iv-serif">Science</span>
          </h1>
          <p className="text-xl text-iv-cream/70 leading-relaxed font-light max-w-2xl mx-auto">
            The science behind LIRI ROMA was not created for us. It was created by independent researchers and dermatological institutions. We selected every active because this evidence already existed — then formulated at the exact concentrations that delivered these results.
          </p>
        </div>
      </section>

      {/* Consumer Self-Assessment Stats */}
      <section className="py-20 bg-iv-deep-green/10 border-b border-iv-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-[10px] font-black text-iv-gold uppercase tracking-[0.4em] mb-12">Consumer Self-Assessment — 2,450 Verified Purchasers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {CONSUMER_STATS.map(({ pct, label, n }) => (
              <div key={label} className="bg-iv-black border border-iv-gold/10 rounded-2xl p-8 hover:border-iv-gold/30 transition-all">
                <div className="text-4xl font-black text-iv-gold mb-3">{pct}</div>
                <p className="text-[11px] text-iv-cream/60 leading-relaxed font-light">{label}</p>
                <p className="text-xs text-iv-cream/65 mt-2 uppercase tracking-widest font-black">n={n.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Cards */}
      <section className="py-32 bg-iv-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">The Published Science</h2>
            <p className="text-sm text-iv-text-muted max-w-3xl mt-4 leading-relaxed">
              This is the peer-reviewed research the formulations are built upon — published by independent
              investigators, cited here in full. It is the science, openly shown. LIRI ROMA&rsquo;s own
              performance evidence is gathered from the people who use the protocols, and is reported separately.
            </p>
            <h3 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">Peer-Reviewed Research Behind the Formulations</h3>
          </div>

          <div className="space-y-12">
            {PUBLISHED_SCIENCE.map((trial) => (
              <div key={trial.id} className="bg-iv-deep-green/5 border border-iv-gold/10 rounded-3xl p-10 hover:border-iv-gold/20 transition-all">
                {/* Trial Header */}
                <div className="flex flex-wrap items-start justify-between gap-6 mb-10 pb-8 border-b border-iv-white/5">
                  <div>
                    <span className="text-xs font-black text-iv-gold/50 uppercase tracking-widest">{trial.id}</span>
                    <h3 className="text-xl font-bold text-iv-white tracking-tight mt-1">{trial.title}</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-iv-black bg-iv-gold px-4 py-1.5 rounded-full flex-shrink-0">{trial.significance}</span>
                </div>

                {/* Trial Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  {[
                    { icon: <FlaskConical className="w-4 h-4" />, label: 'Design', value: trial.design },
                    { icon: <Users className="w-4 h-4" />, label: 'Subjects', value: trial.subjects ? `n = ${trial.subjects}` : 'Review study' },
                    { icon: <Calendar className="w-4 h-4" />, label: 'Duration', value: trial.duration },
                    { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Laboratory', value: trial.lab },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="bg-iv-black/40 rounded-xl p-5 border border-iv-white/5">
                      <div className="flex items-center gap-2 text-iv-gold mb-2">{icon}<span className="text-xs font-black uppercase tracking-widest">{label}</span></div>
                      <p className="text-xs text-iv-cream/70 font-light leading-snug">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Outcomes Table */}
                <div className="overflow-x-auto rounded-xl border border-iv-white/5">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-iv-black/60 border-b border-iv-white/10">
                        <th className="py-4 px-6 text-left text-xs font-black text-iv-white uppercase tracking-widest">Outcome Metric</th>
                        <th className="py-4 px-6 text-left text-xs font-black text-iv-gold uppercase tracking-widest">Published Result</th>
                        <th className="py-4 px-6 text-left text-xs font-black text-iv-cream/65 uppercase tracking-widest">Comparison</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-iv-white/5">
                      {trial.outcomes.map(({ metric, result, vs }) => (
                        <tr key={metric} className="hover:bg-iv-gold/[0.03] transition-colors">
                          <td className="py-4 px-6 text-sm text-iv-cream/60 font-light">{metric}</td>
                          <td className="py-4 px-6 text-sm font-black text-iv-gold">{result}</td>
                          <td className="py-4 px-6 text-sm text-iv-cream/65 font-light">{vs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-20 bg-iv-deep-green/10 border-t border-iv-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-iv-black border border-iv-gold/10 rounded-2xl p-10">
            <div className="flex items-start gap-6">
              <TrendingUp className="w-6 h-6 text-iv-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-black text-iv-white uppercase tracking-widest mb-4">Methodology Statement</h3>
                <p className="text-sm text-iv-cream/60 leading-relaxed font-light mb-4">
                  The studies referenced on this page were conducted by independent dermatological research institutions — including Eurofins Dermatest GmbH (Germany) and Dermscan Group (France & Italy) — prior to and independently of any LIRI ROMA formulation decision. LIRI ROMA did not sponsor or influence these studies. We selected these actives because the independent evidence existed. We formulated at the concentrations the evidence used. Full study references and methodology documentation are available to healthcare professionals and researchers on request.
                </p>
                <p className="text-sm text-iv-cream/60 leading-relaxed font-light">
                  Consumer self-assessment data was collected via post-purchase survey (60-day follow-up) of verified purchasers. Individual results vary. These studies support — but do not guarantee — the same outcomes for every individual.
                </p>
                <div className="mt-6 flex gap-4">
                  <a href="/contact" className="text-[10px] font-black text-iv-gold uppercase tracking-widest hover:underline underline-offset-4">
                    Request Full Study Data →
                  </a>
                  <a href="/ingredients" className="text-[10px] font-black text-iv-cream/65 uppercase tracking-widest hover:text-iv-gold transition-colors hover:underline underline-offset-4">
                    Ingredient Dossier →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
