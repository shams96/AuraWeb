'use client'

import { useCart } from '@/lib/cart-context'
import { Button } from '@aurabiosphere/ui'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function CartDrawer() {
  const { state, updateQuantity, removeItem, setCartOpen } = useCart()
  const router = useRouter()

  if (!state.isOpen) return null

  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    setCartOpen(false)
    router.push('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
              <p className="text-gray-500">Your cart is empty.</p>
              <Button onClick={() => { setCartOpen(false); router.push('/shop') }} className="bg-emerald-600 hover:bg-emerald-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img src={item.image || '/images/products/isola_collection.png'} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        {item.isSubscription && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1">
                            <span>🔄</span> Subscribe & Save
                          </span>
                        )}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          className="p-1 px-2 hover:bg-gray-50 text-gray-600"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          className="p-1 px-2 hover:bg-gray-50 text-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <Button 
              size="lg" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6"
              onClick={handleCheckout}
            >
              Proceed to Secure Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
