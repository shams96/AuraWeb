'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface WishlistItem {
  id: string
  name: string
  price: number
  currency: string
  image?: string
  sku?: string
}

interface WishlistState {
  items: WishlistItem[]
  isOpen: boolean
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'TOGGLE_WISHLIST' }
  | { type: 'SET_WISHLIST_OPEN'; payload: boolean }

const initialState: WishlistState = {
  items: [],
  isOpen: false,
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return state // Item already exists in wishlist
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload }],
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }
    
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      }
    
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    
    case 'SET_WISHLIST_OPEN':
      return {
        ...state,
        isOpen: action.payload,
      }
    
    default:
      return state
  }
}

interface WishlistContextType {
  state: WishlistState
  addItem: (item: Omit<WishlistItem, 'id'>) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  toggleWishlist: () => void
  setWishlistOpen: (open: boolean) => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  const addItem = (item: Omit<WishlistItem, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, id: item.sku || item.name } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const toggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST' })
  }

  const setWishlistOpen = (open: boolean) => {
    dispatch({ type: 'SET_WISHLIST_OPEN', payload: open })
  }

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        clearWishlist,
        toggleWishlist,
        setWishlistOpen,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
