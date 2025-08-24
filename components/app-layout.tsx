import type React from "react"
import { BottomNavigation } from "./bottom-navigation"

interface AppLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
}

export function AppLayout({ children, showNavigation = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7fafc] flex flex-col max-w-sm mx-auto">
      <div className="flex-1">{children}</div>
      {showNavigation && <BottomNavigation />}
    </div>
  )
}
