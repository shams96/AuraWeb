import * as React from "react"
import { cn } from "../lib/utils"

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const Modal = React.forwardRef<
  HTMLDivElement,
  ModalProps
>(({ className, open, onOpenChange, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
})
Modal.displayName = "Modal"

export { Modal }
