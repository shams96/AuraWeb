'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="py-16 bg-iv-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-iv-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-iv-cream/70">
            Everything you need to know about The Vitale Concentrate™ and the Isola Vitale ritual
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="bg-iv-deep-green/30 rounded-xl shadow-2xl overflow-hidden border border-iv-gold/10 backdrop-blur-sm transition-all duration-300"
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between group focus:outline-none"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <h3 className="text-lg font-semibold text-iv-white flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-iv-gold/20 text-iv-gold border border-iv-gold/40 rounded-full flex items-center justify-center mr-4 text-xs font-bold shadow-inner">
                      {index + 1}
                    </span>
                    <span className="mt-0.5">{faq.question}</span>
                  </h3>
                  <span className={`ml-4 flex-shrink-0 text-iv-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-iv-cream/60 ml-12 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-iv-gold/5 text-iv-gold/80 px-8 py-4 rounded-full border border-iv-gold/20 shadow-lg">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-widest">Still have questions? Our skincare experts are here to help</span>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-iv-deep-green/20 p-8 rounded-xl border border-iv-gold/10 text-center hover:border-iv-gold/40 transition-colors group">
            <div className="w-14 h-14 bg-iv-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-iv-gold/20 group-hover:bg-iv-gold group-hover:text-iv-black transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-iv-white mb-2 uppercase tracking-widest text-xs">Email Support</h3>
            <p className="text-xs text-iv-cream/65 mb-4">Response within 24 hours</p>
            <a href="mailto:support@isolavitale.it" className="text-iv-gold hover:text-iv-gold-light text-sm font-bold">
              support@isolavitale.it
            </a>
          </div>

          <div className="bg-iv-deep-green/20 p-8 rounded-xl border border-iv-gold/10 text-center hover:border-iv-gold/40 transition-colors group">
            <div className="w-14 h-14 bg-iv-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-iv-gold/20 group-hover:bg-iv-gold group-hover:text-iv-black transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-iv-white mb-2 uppercase tracking-widest text-xs">Live Chat</h3>
            <p className="text-xs text-iv-cream/65 mb-4">Chat with our experts</p>
            <button className="text-iv-gold hover:text-iv-gold-light text-sm font-bold uppercase tracking-widest">
              Start Chat
            </button>
          </div>

          <div className="bg-iv-deep-green/20 p-8 rounded-xl border border-iv-gold/10 text-center hover:border-iv-gold/40 transition-colors group">
            <div className="w-14 h-14 bg-iv-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-iv-gold/20 group-hover:bg-iv-gold group-hover:text-iv-black transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold text-iv-white mb-2 uppercase tracking-widest text-xs">Phone Support</h3>
            <p className="text-xs text-iv-cream/65 mb-4">Mon-Fri 9AM-6PM CET</p>
            <a href="tel:+390776123456" className="text-iv-gold hover:text-iv-gold-light text-sm font-bold">
              +39 0776 123456
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
