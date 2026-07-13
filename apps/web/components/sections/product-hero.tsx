'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, Shield, Sparkles, RefreshCw, User } from 'lucide-react'
import { Button } from '@/components/ui-lib'

interface ProductHeroProps {
  product: {
    id: string
    name: string
    tagline: string
    description: string
    price: number
    currency: string
    image: string
    videoUrl?: string
    primaryProblem: string
    desiredOutcome: string
    format: string
    audience: string
    scienceMechanism: string
    useCases: string[]
    rating: number
    reviewCount: number
    badges: string[]
    sku?: string
  }
}

export function ProductHero({ product }: ProductHeroProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)

  const handlePlayVideo = () => {
    setIsPlayingVideo(true)
  }

  return (
    <section className="relative overflow-hidden bg-iv-black pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-iv-gold/[0.03] rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-iv-deep-green/[0.05] rounded-full blur-[100px] -ml-72 -mb-72 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-12">
            {/* Context Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-4 border border-iv-gold/20 rounded-full px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.3em] bg-iv-gold/5 backdrop-blur-xl">
                <span className="text-iv-gold">Clinical Asset No. {product.sku || 'IV-2026'}</span>
                <span className="w-1 h-1 bg-iv-gold/40 rounded-full"></span>
                <span className="text-iv-white/60">{product.audience}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-iv-white leading-[0.85] tracking-tighter uppercase">
                {product.name.split(' ').slice(0, -1).join(' ')} <br />
                <span className="text-iv-gold italic serif lowercase">{product.name.split(' ').pop()}</span>
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-iv-gold/20"></div>
                <p className="text-xl md:text-2xl text-iv-cream/80 iv-serif italic tracking-wide">
                  {product.tagline}
                </p>
                <div className="h-px flex-1 bg-iv-gold/20"></div>
              </div>
              
              <p className="text-lg text-iv-cream/60 max-w-xl leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Protocol Summary Card */}
            <div className="bg-iv-deep-green/10 border border-iv-gold/10 p-8 rounded-3xl backdrop-blur-sm relative group hover:border-iv-gold/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Shield className="w-16 h-16 text-iv-gold" />
              </div>
              <h3 className="text-[10px] font-black text-iv-white mb-6 flex items-center uppercase tracking-[0.3em]">
                Metabolic Protocol Focus
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.useCases.slice(0, 4).map((use, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border border-iv-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-iv-gold rounded-full" />
                    </div>
                    <span className="text-xs text-iv-cream/80 font-medium tracking-tight leading-snug">{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-iv-gold text-iv-black hover:bg-iv-gold-light rounded-none px-16 py-10 text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(184,151,47,0.3)] hover:shadow-iv-gold/40 transition-all duration-500"
                asChild
              >
                <a href="#buy-box">
                  Configure Acquisition
                </a>
              </Button>
              <div className="flex items-center gap-3 px-6 py-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-iv-black bg-iv-deep-green flex items-center justify-center text-[8px] font-bold overflow-hidden">
                      <User className="w-4 h-4 text-iv-gold/40" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black text-iv-white/40 uppercase tracking-widest">
                  Joined by 2.4k+ Members
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Elevated Image */}
          <div className="relative group perspective-1000">
            {/* Background Halo */}
            <div className="absolute -inset-10 bg-iv-gold/10 rounded-full blur-[80px] group-hover:bg-iv-gold/20 transition-all duration-1000 opacity-40 animate-pulse"></div>
            
            {/* Floating Container */}
            <div className="relative aspect-square md:aspect-[4/5] bg-gradient-to-b from-iv-deep-green/20 to-iv-black border border-iv-gold/10 overflow-hidden rounded-[40px] shadow-2xl backdrop-blur-md animate-float">
              {isPlayingVideo ? (
                <div className="w-full h-full flex items-center justify-center">
                  <RefreshCw className="h-12 w-12 text-iv-gold animate-spin" />
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-iv-black via-transparent to-transparent z-10" />
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-12 group-hover:scale-110 transition-all [transition-duration:2000ms] ease-out z-0"
                    priority
                  />
                  
                  {/* Glass Card Details */}
                  <div className="absolute bottom-10 left-10 right-10 z-20 bg-iv-black/40 backdrop-blur-xl border border-iv-white/10 p-6 rounded-3xl shadow-2xl transform translate-z-20 group-hover:translate-y-[-10px] transition-all duration-700">
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-iv-gold uppercase tracking-[0.4em]">Formula Grade</p>
                        <p className="text-lg font-bold text-iv-white italic serif">Pharmaceutical</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-iv-gold uppercase tracking-[0.4em]">Review Rating</p>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-iv-white">{product.rating}</span>
                          <Sparkles className="w-4 h-4 text-iv-gold" />
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-iv-white/10 mb-4" />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-iv-cream/65 leading-relaxed">
                      Optimized for Advanced Dermal Volume Restoration & Longevity.
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {/* Professional Seal */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border border-iv-gold/20 rounded-full flex items-center justify-center bg-iv-black/80 backdrop-blur-xl shadow-2xl z-30 animate-spin-slow">
              <div className="text-center">
                <p className="text-[7px] font-black text-iv-gold uppercase tracking-[0.5em] leading-none mb-1">Authentic</p>
                <p className="text-[10px] font-bold text-iv-white italic serif">Metabolic</p>
                <p className="text-[7px] font-black text-iv-gold uppercase tracking-[0.5em] leading-none mt-1">Science</p>
              </div>
              <div className="absolute inset-2 border border-iv-gold/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .translate-z-20 {
          transform: translateZ(20px);
        }
      `}</style>
    </section>
  )
}
