"use client"

import * as React from "react"
import { cn } from "../lib/utils"

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

const Tabs = React.forwardRef<
  HTMLDivElement,
  TabsProps
>(({ className, value, onValueChange, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
})
Tabs.displayName = "Tabs"

export { Tabs }
