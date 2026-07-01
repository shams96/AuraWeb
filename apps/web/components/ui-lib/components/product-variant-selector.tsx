"use client"

import * as React from "react"
import { cn } from "../lib/utils"

export interface ProductVariantSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variants?: Array<{ id: string; name: string; price?: number }>
  selectedVariant?: string
  onVariantChange?: (variantId: string) => void
}

const ProductVariantSelector = React.forwardRef<
  HTMLDivElement,
  ProductVariantSelectorProps
>(({ 
  className, 
  variants = [], 
  selectedVariant, 
  onVariantChange, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap gap-2", className)}
    {...props}
  >
    {variants.map((variant) => (
      <button
        key={variant.id}
        onClick={() => onVariantChange?.(variant.id)}
        className={cn(
          "px-3 py-2 text-sm rounded-md border transition-colors",
          selectedVariant === variant.id
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-foreground border-border hover:bg-muted"
        )}
      >
        {variant.name}
        {variant.price && ` - $${variant.price}`}
      </button>
    ))}
  </div>
))
ProductVariantSelector.displayName = "ProductVariantSelector"

export { ProductVariantSelector }
