import * as React from "react"
import { cn } from "../lib/utils"

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  collapsible?: boolean
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children?: React.ReactNode
}

const Accordion = React.forwardRef<
  HTMLDivElement,
  AccordionProps
>(({ className, type = "single", collapsible = true, value, onValueChange, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
})
Accordion.displayName = "Accordion"

export { Accordion }
