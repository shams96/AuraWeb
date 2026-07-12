'use client'

import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export function BrandVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying]  = useState(false)
  const [muted,   setMuted]    = useState(true)

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <section className="py-24 bg-iv-black">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Label + headline */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-iv-gold mb-4">
            The LIRI ROMA Story
          </p>
          <h2 className="iv-type-h2 font-semibold text-iv-white uppercase tracking-tight">
            Science You Can <em className="text-iv-gold">See</em>
          </h2>
        </div>

        {/* Video container */}
        <div className="relative rounded-3xl overflow-hidden border border-iv-gold/10 shadow-2xl bg-iv-black group max-w-5xl mx-auto">

          <video
            ref={videoRef}
            src="/video/isola-vitale-brand.mp4"
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full aspect-video object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* Overlay — fades out while playing */}
          <div
            className={`absolute inset-0 bg-iv-black/40 transition-opacity duration-500 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
          />

          {/* Play / pause button */}
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
          >
            <span className="w-20 h-20 rounded-full flex items-center justify-center border border-iv-gold/40 bg-iv-black/60 backdrop-blur-sm hover:bg-iv-gold/20 transition-colors">
              {playing
                ? <Pause className="w-7 h-7 text-iv-gold" />
                : <Play  className="w-7 h-7 text-iv-gold ml-1" />
              }
            </span>
          </button>

          {/* Mute toggle — bottom right */}
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="absolute bottom-5 right-5 w-10 h-10 rounded-full flex items-center justify-center border border-iv-white/10 bg-iv-black/60 backdrop-blur-sm hover:border-iv-gold/40 transition-colors"
          >
            {muted
              ? <VolumeX className="w-4 h-4 text-iv-cream/60" />
              : <Volume2 className="w-4 h-4 text-iv-gold" />
            }
          </button>
        </div>

        {/* Caption */}
        <p className="text-center text-xs text-iv-cream/65 mt-6 font-light tracking-widest uppercase">
          LIRI ROMA · Milano · Clinical Skincare
        </p>

      </div>
    </section>
  )
}
