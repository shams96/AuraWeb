'use client'

import { useEffect } from 'react'

/**
 * Observes [data-reveal] elements and applies their CSS animation classes
 * as they scroll into the viewport.
 *
 * Performance notes:
 * - Uses a single shared IntersectionObserver.
 * - MutationObserver is debounced (200 ms) and only watches for newly added
 *   nodes — it does NOT rebuild the entire observer on every mutation.
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const classes = el.dataset.reveal?.split(' ').filter(Boolean) ?? []
          if (classes.length) el.classList.add(...classes)
          observer.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe all currently-existing targets
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => observer.observe(el))

    // Watch for new nodes (lazy-loaded sections) — debounced so it doesn't
    // thrash on rapid DOM updates
    let debounceTimer: ReturnType<typeof setTimeout>
    const mutation = new MutationObserver((records) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        records.forEach(record => {
          record.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return
            const el = node as HTMLElement
            if (el.dataset?.reveal) observer.observe(el)
            el.querySelectorAll?.<HTMLElement>('[data-reveal]').forEach(child => observer.observe(child))
          })
        })
      }, 200)
    })

    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(debounceTimer)
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])

  return null
}
