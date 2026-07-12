import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns',
  description: 'The TTW™ standard, and how the house stands behind it.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
