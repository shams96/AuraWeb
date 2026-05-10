'use client'

import { useEffect } from 'react'

/**
 * Drop this anywhere in the component tree (e.g. root layout).
 * Observes all [data-reveal] elements and applies their CSS animation classes
 * as they scroll into the viewport.
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observe = () => {
      const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement
              const classes = el.dataset.reveal?.split(' ').filter(Boolean) ?? []
              if (classes.length) el.classList.add(...classes)
              observer.unobserve(el)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
      targets.forEach((el) => observer.observe(el))
      return observer
    }

    // Initial pass
    let observer = observe()

    // Re-scan when new content appears (e.g. lazy-loaded sections)
    const mutation = new MutationObserver(() => {
      observer.disconnect()
      observer = observe()
    })
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])

  return null
}
