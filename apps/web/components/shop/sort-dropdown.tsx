'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Newest')

  const options = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling', 'Top Rated']

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
      >
        Sort by: {selected}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  selected === option ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
