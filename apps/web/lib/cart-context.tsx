'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number       // current price (post-discount if subscribed)
  basePrice: number   // always the one-time price; used to recalculate on toggle
  currency: string
  quantity: number
  image?: string
  sku?: string
  isSubscription?: boolean
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_SUBSCRIPTION'; payload: string }
  | { type: 'SET_ALL_SUBSCRIPTION'; payload: boolean }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean }

const SUB_DISCOUNT = 0.20   // 20 % off for subscriptions

const initialState: CartState = { items: [], isOpen: false }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i)
          .filter(i => i.quantity > 0),
      }

    case 'TOGGLE_SUBSCRIPTION': {
      return {
        ...state,
        items: state.items.map(i => {
          if (i.id !== action.payload) return i
          const nowSub = !i.isSubscription
          return {
            ...i,
            isSubscription: nowSub,
            price: nowSub ? Math.round(i.basePrice * (1 - SUB_DISCOUNT)) : i.basePrice,
          }
        }),
      }
    }

    case 'SET_ALL_SUBSCRIPTION': {
      const sub = action.payload
      return {
        ...state,
        items: state.items.map(i => ({
          ...i,
          isSubscription: sub,
          price: sub ? Math.round(i.basePrice * (1 - SUB_DISCOUNT)) : i.basePrice,
        })),
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload }

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleSubscription: (id: string) => void
  setAllSubscription: (sub: boolean) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const base = item.basePrice ?? item.price
    // Default to subscribed unless caller explicitly passes isSubscription: false
    const isSub = item.isSubscription !== false
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        id: item.sku || item.name,
        basePrice: base,
        isSubscription: isSub,
        price: isSub ? Math.round(base * (1 - SUB_DISCOUNT)) : base,
      },
    })
  }

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem:          (id)           => dispatch({ type: 'REMOVE_ITEM',          payload: id }),
      updateQuantity:      (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY',      payload: { id, quantity } }),
      toggleSubscription:  (id)           => dispatch({ type: 'TOGGLE_SUBSCRIPTION',  payload: id }),
      setAllSubscription:  (sub)          => dispatch({ type: 'SET_ALL_SUBSCRIPTION', payload: sub }),
      clearCart:           ()             => dispatch({ type: 'CLEAR_CART' }),
      toggleCart:          ()             => dispatch({ type: 'TOGGLE_CART' }),
      setCartOpen:         (open)         => dispatch({ type: 'SET_CART_OPEN',         payload: open }),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
