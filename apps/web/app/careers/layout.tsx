import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Work with Chiarelle — The House of Clarity.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
