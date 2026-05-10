'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@aurabiosphere/ui'

export function SystemHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-iv-black text-iv-white py-12 md:py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/products/isola_collection.png"
          alt="Isola Vitale System"
          fill
          className="object-cover object-center opacity-30 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-iv-black via-iv-black/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-iv-black via-transparent to-transparent" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex flex-wrap items-center gap-4 border border-iv-gold/30 rounded-full px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] bg-iv-black/60 backdrop-blur-xl">
            <span className="text-iv-gold">IV-PKG-RFQ-001</span>
            <span className="text-iv-gold/30">•</span>
            <span className="text-iv-cream/80 italic">2026 Hero SKU Launch Phase</span>
            <span className="text-iv-gold/30">•</span>
            <span className="text-iv-cream/60">Isola del Liri, Italy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-[0.9] tracking-tighter uppercase">
            Metabolic <br />
            <span className="text-iv-gold italic serif lowercase">precision</span> <br />
            <span className="text-iv-white/90">Authority</span>
          </h1>
          
          <p className="text-base md:text-lg text-iv-cream/70 max-w-2xl leading-relaxed font-extralight tracking-tight">
            The world's first 4-tier metabolically-aligned system. Bridging ancient botanical wisdom with 2026 pharmaceutical breakthroughs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <button 
              className="bg-iv-gold hover:bg-iv-gold-light text-iv-black text-[10px] font-black px-12 py-8 rounded-none tracking-[0.3em] uppercase shadow-[0_20px_50px_rgba(184,151,47,0.3)] hover:shadow-iv-gold/40 transition-all duration-500 cursor-pointer active:scale-95"
              onClick={() => {
                const element = document.getElementById('skin-scan')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Diagnostic Access
            </button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-iv-gold/20 text-iv-gold hover:bg-iv-gold/10 text-[10px] font-black px-12 py-8 rounded-none tracking-[0.3em] uppercase transition-all duration-500 backdrop-blur-sm"
              onClick={() => window.location.href = '/shop/best-sellers'}
            >
              View Hero SKUs
            </Button>
          </div>
        </div>
      </div>
      
      {/* Visual Accents */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="flex flex-col items-end space-y-4">
          <div className="w-px h-32 bg-gradient-to-b from-transparent to-iv-gold/40" />
          <p className="text-[10px] font-black text-iv-gold/40 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Milano Heritage</p>
        </div>
      </div>
    </section>
  )
}
