import { Check, CreditCard, Truck, Shield, AlertCircle } from 'lucide-react'
import { Button } from '@aurabiosphere/ui'

interface BuyBoxProps {
  product: {
    id: string
    name: string
    price: number
    currency: string
    sku: string
    variants: Array<{
      id: string
      name: string
      price: number
      compareAtPrice?: number
    }>
  }
  selectedVariant?: string | null
  buyBullets: string[]
}

export function BuyBox({ product, selectedVariant, buyBullets }: BuyBoxProps) {
  // Find the selected variant
  const currentVariant = product.variants.find(v => v.id === selectedVariant) || product.variants[0]
  
  // Calculate quantity breaks based on the selected variant
  const quantityBreaks = [
    { quantity: 1, price: currentVariant.price, label: '1 jar', perUnit: currentVariant.price, currency: product.currency },
    { quantity: 2, price: currentVariant.price * 1.8, label: '2 jars', perUnit: (currentVariant.price * 1.8) / 2, currency: product.currency },
    { quantity: 3, price: currentVariant.price * 2.4, label: '3 jars', perUnit: (currentVariant.price * 2.4) / 3, currency: product.currency },
  ]

  const bestValueIndex = quantityBreaks.reduce((bestIndex, current, index, array) => 
    current.perUnit < array[bestIndex].perUnit ? index : bestIndex, 0
  )

  return (
    <section id="buy-box" className="py-12 bg-iv-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-iv-deep-green/30 rounded-2xl p-6 md:p-10 shadow-2xl border border-iv-gold/10 backdrop-blur-md">
            {/* Product Title and Rating */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-iv-white mb-1">
                {product.name}
              </h2>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'text-iv-gold' : 'text-iv-white/20'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs font-medium text-iv-cream/60 ml-2">
                  4.0 (127 reviews)
                </span>
              </div>
            </div>

            {/* Purchase Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-iv-gold/20 bg-iv-black p-1">
                <button className="px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-md bg-iv-gold text-iv-black shadow-lg">
                  One-Time
                </button>
                <button className="px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-md text-iv-cream/60 hover:text-iv-white transition-colors">
                  Subscribe & Save (15%)
                </button>
              </div>
            </div>

            {/* Quantity Breaks */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-iv-white mb-6 text-center uppercase tracking-widest text-xs">
                Choose Your Quantity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quantityBreaks.map((breakItem, index) => (
                  <div
                    key={index}
                    className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                      index === 0
                        ? 'border-iv-gold bg-iv-gold/5 shadow-[0_0_20px_rgba(184,151,47,0.1)]'
                        : 'border-iv-white/10 hover:border-iv-gold/40'
                    } ${index === bestValueIndex ? 'border-iv-gold/60' : ''}`}
                  >
                    {index === bestValueIndex && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-iv-gold text-iv-black text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full">
                          Best Value
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-iv-white">
                        {breakItem.currency === 'USD' ? '$' : ''}{breakItem.price}
                      </div>
                      <div className="text-sm text-iv-cream/70 mt-1">
                        {breakItem.label}
                      </div>
                      <div className="text-xs text-iv-cream/40 mt-2 font-mono">
                        {breakItem.currency === 'USD' ? '$' : ''}{breakItem.perUnit.toFixed(2)}/jar
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Custom Quantity Input */}
              <div className="mt-8 flex items-center justify-center space-x-6">
                <span className="text-xs font-bold uppercase tracking-widest text-iv-cream/60">Custom Quantity</span>
                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 rounded-full border border-iv-gold/20 flex items-center justify-center bg-iv-black hover:border-iv-gold transition-colors">
                    <span className="text-iv-gold text-xl leading-none">-</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    className="w-16 h-10 text-center border border-iv-gold/20 rounded-lg bg-iv-black text-iv-white font-bold"
                    aria-label="Quantity"
                  />
                  <button className="w-10 h-10 rounded-full border border-iv-gold/20 flex items-center justify-center bg-iv-black hover:border-iv-gold transition-colors">
                    <span className="text-iv-gold text-xl leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-iv-white mb-6 text-center uppercase tracking-widest text-xs">
                Select Variant
              </h3>
              <div className="flex justify-center space-x-4">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`px-8 py-3 rounded-lg border cursor-pointer transition-all ${
                      selectedVariant === variant.id
                        ? 'border-iv-gold bg-iv-gold/5 text-iv-white font-bold'
                        : 'border-iv-white/10 text-iv-cream/60 hover:border-iv-gold/40'
                    }`}
                  >
                    {variant.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mb-10">
              <Button
                size="lg"
                className="w-full py-6 text-lg font-bold uppercase tracking-widest bg-iv-gold text-iv-black hover:bg-iv-gold-light shadow-xl hover:shadow-iv-gold/20 border-none rounded-md"
                disabled
              >
                <div className="flex items-center justify-center space-x-3">
                  <span>Add to Cart</span>
                </div>
              </Button>
              
              <div className="flex justify-center space-x-4 mt-6">
                <Button variant="outline" size="lg" className="flex-1 border-iv-white/10 text-iv-cream/60 bg-iv-black hover:border-iv-gold hover:text-iv-gold" disabled>
                  <CreditCard className="w-4 h-4 mr-2" />
                  PayPal
                </Button>
                <Button variant="outline" size="lg" className="flex-1 border-iv-white/10 text-iv-cream/60 bg-iv-black hover:border-iv-gold hover:text-iv-gold" disabled>
                  <Truck className="w-4 h-4 mr-2" />
                  Shop Pay
                </Button>
              </div>
            </div>

            {/* Key Bullets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-b border-iv-white/5 pb-10">
              {buyBullets.map((bullet, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-iv-gold mt-1 flex-shrink-0" />
                  <span className="text-sm text-iv-cream/70 leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 pt-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-iv-cream/40">
                <Shield className="w-4 h-4 text-iv-gold/60" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-iv-cream/40">
                <Truck className="w-4 h-4 text-iv-gold/60" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-iv-cream/40">
                <Shield className="w-4 h-4 text-iv-gold/60" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
