'use client'

import { useEffect } from 'react'

/* Native smooth scroll provider — no external dependency.
   Uses a rAF interpolation loop for Lenis-like inertia feel.
   Falls back gracefully on reduced-motion preference. */
export function SmoothScrollProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let currentY = window.scrollY
    let targetY = window.scrollY
    let raf: number
    let active = false

    const LERP = 0.092 // interpolation factor — higher = snappier

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function tick() {
      if (Math.abs(targetY - currentY) > 0.5) {
        currentY = lerp(currentY, targetY, LERP)
        window.scrollTo(0, currentY)
      } else {
        currentY = targetY
        active = false
        return
      }
      raf = requestAnimationFrame(tick)
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const max = document.documentElement.scrollHeight - window.innerHeight
      targetY = Math.max(0, Math.min(max, targetY + e.deltaY * 1.0))
      if (!active) {
        active = true
        raf = requestAnimationFrame(tick)
      }
    }

    /* Sync on native scroll (touch, keyboard, programmatic) */
    function onScroll() {
      if (!active) {
        currentY = window.scrollY
        targetY = window.scrollY
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
