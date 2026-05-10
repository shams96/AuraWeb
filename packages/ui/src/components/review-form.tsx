import * as React from "react"
import { cn } from "../lib/utils"

export interface ReviewFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  onReviewSubmit?: (review: { rating: number; comment: string }) => void
}

const ReviewForm = React.forwardRef<
  HTMLFormElement,
  ReviewFormProps
>(({ className, onReviewSubmit, ...props }, ref) => {
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onReviewSubmit) {
      onReviewSubmit({ rating, comment })
    }
  }

  return (
    <form
      ref={ref}
      className={cn("space-y-4", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div>
        <label className="text-sm font-medium">Rating</label>
        <div className="mt-1">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-2xl focus:outline-none"
                onClick={() => setRating(star)}
              >
                {star <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="text-sm font-medium">
          Comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Submit Review
      </button>
    </form>
  )
})
ReviewForm.displayName = "ReviewForm"

export { ReviewForm }
