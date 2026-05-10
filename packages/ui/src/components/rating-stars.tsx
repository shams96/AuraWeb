import * as React from "react"
import { cn } from "../lib/utils"

export interface RatingStarsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  rating?: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  onRatingChange?: (rating: number) => void
  interactive?: boolean
}

const RatingStars = React.forwardRef<
  HTMLDivElement,
  RatingStarsProps
>(({ 
  className, 
  rating = 0, 
  maxRating = 5, 
  size = "md",
  onRatingChange,
  interactive = false,
  ...props 
}, ref) => {
  const [hoverRating, setHoverRating] = React.useState(0)

  const handleClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  const handleMouseEnter = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0)
    }
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  const displayRating = interactive ? hoverRating || rating : rating

  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-1", className)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= displayRating
        
        return (
          <button
            key={index}
            type="button"
            className={cn(
              "transition-colors focus:outline-none",
              sizeClasses[size],
              interactive ? "cursor-pointer" : "cursor-default"
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            disabled={!interactive}
          >
            {isFilled ? (
              <svg
                className="text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : (
              <svg
                className="text-gray-300 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </button>
        )
      })}
    </div>
  )
})
RatingStars.displayName = "RatingStars"

export { RatingStars }
