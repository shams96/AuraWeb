import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Work with LIRI ROMA — the House of Liri.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
