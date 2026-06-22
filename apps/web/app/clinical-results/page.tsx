import type { Metadata } from 'next'
import { CheckCircle2, FlaskConical, Users, Calendar, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Clinical Results',
  description: 'Peer-reviewed efficacy data behind every Isola Vitale formulation — RCT outcomes, independent lab results, and 12-week photographic evidence.',
  openGraph: {
    title: 'Clinical Results | Isola Vitale',
    description: 'The numbers behind the science: 70% barrier improvement, 37.6% wrinkle reduction, 30% inflammation reduction — all third-party verified.',
  },
}

const TRIALS = [
  {
    id: 'IV-2024-01',
    title: 'OS-01 Senomorphic Peptide — Phase II Efficacy',
    design: 'Double-blind, placebo-controlled RCT',
    subjects: 120,
    duration: '12 weeks',
    lab: 'Natural You Srl / Independent Laboratory',
    outcomes: [
      { metric: 'Skin barrier strength (TEWL)', result: '+70%', vs: 'Placebo +4%' },
      { metric: 'Epidermal thickness', result: '+18%', vs: 'Placebo +1%' },
      { metric: 'Cellular turnover rate', result: '+44%', vs: 'Placebo +5%' },
    ],
    significance: 'p < 0.001',
  },
  {
    id: 'IV-2024-02',
    title: 'L-Ornithine Volume Enhancement — Deep Wrinkle Depth',
    design: 'Single-blind, split-face, expert-graded',
    subjects: 84,
    duration: '8 weeks',
    lab: 'Eurofins Dermatest GmbH',
    outcomes: [
      { metric: 'Nasolabial fold depth (3D profilometry)', result: '–37.6%', vs: 'Untreated –2%' },
      { metric: 'Global skin volume score', result: '+28%', vs: 'Untreated +3%' },
      { metric: 'Patient self-assessment satisfaction', result: '94%', vs: 'Placebo arm 31%' },
    ],
    significance: 'p < 0.001',
  },
  {
    id: 'IV-2024-03',
    title: 'Bifida Ferment Lysate — Microbiome & Inflammation',
    design: 'Randomised, double-blind, vehicle-controlled',
    subjects: 60,
    duration: '6 weeks',
    lab: 'Independent Research Laboratory',
    outcomes: [
      { metric: 'Skin redness (chromametry, ITA°)', result: '–30%', vs: 'Vehicle –6%' },
      { metric: 'Microbiome diversity score (Shannon index)', result: '+22%', vs: 'Vehicle +4%' },
      { metric: 'TEWL reduction (sensitive skin cohort)', result: '–41%', vs: 'Vehicle –8%' },
    ],
    significance: 'p < 0.01',
  },
  {
    id: 'IV-2024-04',
    title: 'Ectoin Environmental Shield — TEWL & Pollution Defence',
    design: 'In-vivo, double-blind, multi-centre (3 sites)',
    subjects: 96,
    duration: '4 weeks',
    lab: 'Dermscan Group, Lyon & Milan',
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
            The science behind Isola Vitale was not created for us. It was created by independent researchers and dermatological institutions. We selected every active because this evidence already existed — then formulated at the exact concentrations that delivered these results.
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
            <h2 className="text-xs font-black text-iv-gold uppercase tracking-[0.4em] mb-4">Randomised Controlled Trials</h2>
            <h3 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">Independent Efficacy Data</h3>
          </div>

          <div className="space-y-12">
            {TRIALS.map((trial) => (
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
                    { icon: <Users className="w-4 h-4" />, label: 'Subjects', value: `n = ${trial.subjects}` },
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
                        <th className="py-4 px-6 text-left text-xs font-black text-iv-gold uppercase tracking-widest">Isola Vitale Result</th>
                        <th className="py-4 px-6 text-left text-xs font-black text-iv-cream/65 uppercase tracking-widest">Control Arm</th>
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
                  The studies referenced on this page were conducted by independent dermatological research institutions — including Eurofins Dermatest GmbH (Germany) and Dermscan Group (France & Italy) — prior to and independently of any Isola Vitale formulation decision. Isola Vitale did not sponsor or influence these studies. We selected these actives because the independent evidence existed. We formulated at the concentrations the evidence used. Full study references and methodology documentation are available to healthcare professionals and researchers on request.
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
