import { CheckCircle2, XCircle, Minus } from 'lucide-react'

const ROWS = [
  { feature: 'Clinical RCT Data Published', iv: true, lamer: false, ab: true, loreal: false },
  { feature: 'Named Active Concentrations', iv: true, lamer: false, ab: true, loreal: false },
  { feature: 'Proprietary Senomorphic Peptide', iv: true, lamer: false, ab: false, loreal: false },
  { feature: 'GLP-1 / Ozempic Face Protection', iv: true, lamer: false, ab: false, loreal: false },
  { feature: 'Bio-Adaptive Personalisation', iv: true, lamer: false, ab: false, loreal: false },
  { feature: 'EU GMP Certified Manufacturing', iv: true, lamer: true, ab: true, loreal: true },
  { feature: 'PETA Cruelty-Free Certified', iv: true, lamer: false, ab: true, loreal: 'partial' },
  { feature: 'Vegan Formulations', iv: true, lamer: false, ab: false, loreal: 'partial' },
  { feature: 'Refillable / rPET Packaging', iv: true, lamer: false, ab: false, loreal: 'partial' },
  { feature: 'CoA Available on Request', iv: true, lamer: false, ab: false, loreal: false },
  { feature: 'Tiered Skin Age System', iv: true, lamer: false, ab: false, loreal: false },
  { feature: 'B2B / Clinical Partner Portal', iv: true, lamer: false, ab: true, loreal: false },
]

type CellValue = boolean | 'partial'

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true) {
    return (
      <td className={`py-5 px-6 text-center ${highlight ? 'bg-iv-gold/5' : ''}`}>
        <CheckCircle2 className="w-5 h-5 text-iv-gold mx-auto" />
      </td>
    )
  }
  if (value === 'partial') {
    return (
      <td className="py-5 px-6 text-center">
        <Minus className="w-5 h-5 text-iv-cream/30 mx-auto" />
      </td>
    )
  }
  return (
    <td className="py-5 px-6 text-center">
      <XCircle className="w-5 h-5 text-iv-cream/15 mx-auto" />
    </td>
  )
}

export function CompetitorComparison() {
  return (
    <section className="py-32 bg-iv-black border-t border-iv-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-iv-black/40 backdrop-blur-md text-iv-gold">
            Transparency Index
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-iv-white tracking-tighter uppercase mb-6">
            How We Compare
          </h2>
          <p className="text-iv-cream/50 max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Side by side with the brands that set the standard. Transparency is not a marketing claim — it is a verifiable fact.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-iv-white/5 bg-iv-deep-green/5 backdrop-blur-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-iv-white/10 bg-iv-black/60">
                <th className="py-6 px-6 text-left text-[10px] font-black text-iv-white uppercase tracking-[0.2em] w-1/2">Feature</th>
                <th className="py-6 px-6 text-center text-[10px] font-black text-iv-gold uppercase tracking-[0.2em] bg-iv-gold/5 border-l border-iv-gold/10">
                  Isola Vitale
                </th>
                <th className="py-6 px-6 text-center text-[10px] font-black text-iv-cream/40 uppercase tracking-[0.2em]">La Mer</th>
                <th className="py-6 px-6 text-center text-[10px] font-black text-iv-cream/40 uppercase tracking-[0.2em]">Aug. Bader</th>
                <th className="py-6 px-6 text-center text-[10px] font-black text-iv-cream/40 uppercase tracking-[0.2em]">L'Oréal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-iv-white/5">
              {ROWS.map(({ feature, iv, lamer, ab, loreal }) => (
                <tr key={feature} className="hover:bg-iv-white/[0.01] transition-colors">
                  <td className="py-5 px-6 text-sm text-iv-cream/70 font-light">{feature}</td>
                  <Cell value={iv} highlight />
                  <Cell value={lamer} />
                  <Cell value={ab} />
                  <Cell value={loreal} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[10px] text-iv-cream/25 mt-6 font-light uppercase tracking-widest">
          Data based on publicly available brand communications as of May 2026. ─ = partial or market-specific.
        </p>
      </div>
    </section>
  )
}
