import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Circle',
  description: 'What opens as you stay with the house.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
