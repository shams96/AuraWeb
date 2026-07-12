import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping',
  description: 'How your ritual arrives, and when.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
