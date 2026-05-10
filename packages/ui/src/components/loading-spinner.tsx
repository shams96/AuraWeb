import * as React from "react"
import { cn } from "../lib/utils"

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
      className
    )}
    role="status"
    {...props}
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
))
LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner }
