'use client'

import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a container element.
 * Any child with [data-reveal] gets the CSS class added when it enters the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal()
 *   <section ref={ref}>
 *     <h2 data-reveal="iv-reveal-up iv-stagger">…</h2>
 *   </section>
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const classes = el.dataset.reveal?.split(' ') ?? []
            el.classList.add(...classes)
            observer.unobserve(el)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
