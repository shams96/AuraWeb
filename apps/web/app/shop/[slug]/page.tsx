'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ShopCollectionRedirect({ params }: { params: { slug: string } }) {
  const router = useRouter()
  
  useEffect(() => {
    // If it's a known collection, redirect with param
    if (['new-arrivals', 'bundles'].includes(params.slug)) {
      router.push(`/shop?collection=${params.slug}`)
    } else {
      // Otherwise maybe it's a product ID or just go to shop
      router.push('/shop')
    }
  }, [params.slug, router])

  return (
    <div className="min-h-screen bg-iv-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-iv-gold border-t-transparent rounded-full animate-spin mx-auto mb-8" />
        <p className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em]">Optimizing Collection</p>
      </div>
    </div>
  )
}
