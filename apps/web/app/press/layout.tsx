import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press',
  description: 'Chiarel in the press, and the story of the house.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
