import { Check, X } from 'lucide-react'

interface ProblemSolutionProps {
  title: string
  description: string
  problems: string[]
  solution: {
    title: string
    description: string
    benefits: string[]
  }
}

export function ProblemSolution({ title, description, problems, solution }: ProblemSolutionProps) {
  return (
    <section className="py-16 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-iv-white mb-6">
              {title}
            </h2>
            <p className="text-xl text-iv-cream/80 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Problems Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-8">
                <X className="w-6 h-6 text-red-500" />
                <h3 className="text-2xl font-semibold text-iv-white">The Problem</h3>
              </div>
              
              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-iv-cream/70 leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-8">
                <Check className="w-6 h-6 text-iv-gold" />
                <h3 className="text-2xl font-semibold text-iv-white">Our Solution</h3>
              </div>
              
              <div className="bg-iv-deep-green/50 rounded-2xl shadow-2xl p-8 border border-iv-gold/20 backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-iv-gold mb-4">
                  {solution.title}
                </h4>
                <p className="text-iv-cream/80 mb-6 leading-relaxed">
                  {solution.description}
                </p>
                
                <div className="space-y-4">
                  {solution.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-iv-gold flex-shrink-0" />
                      <span className="text-iv-cream/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
