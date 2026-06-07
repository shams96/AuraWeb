"use client"

import * as React from "react"
import { cn } from "../lib/utils"

export interface ProductGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images?: string[]
}

const ProductGallery = React.forwardRef<
  HTMLDivElement,
  ProductGalleryProps
>(({ className, images = [], ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid grid-cols-1 gap-4", className)}
    {...props}
  >
    {images.length > 0 ? (
      images.map((image, index) => (
        <div key={index} className="aspect-square rounded-lg bg-muted">
          <img
            src={image}
            alt={`Product image ${index + 1}`}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      ))
    ) : (
      <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">No images available</span>
      </div>
    )}
  </div>
))
ProductGallery.displayName = "ProductGallery"

export { ProductGallery }
