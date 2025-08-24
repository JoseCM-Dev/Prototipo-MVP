"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export type NavigationTab = "inicio" | "explorar" | "destacados" | "favoritos" | "perfil"

export function useNavigation() {
  const [activeTab, setActiveTab] = useState<NavigationTab>("explorar")
  const pathname = usePathname()

  // Update active tab based on current pathname
  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("explorar")
    } else if (pathname === "/destacados") {
      setActiveTab("destacados")
    } else if (pathname === "/favoritos") {
      setActiveTab("favoritos")
    } else if (pathname === "/perfil") {
      setActiveTab("perfil")
    } else {
      setActiveTab("explorar")
    }
  }, [pathname])

  return {
    activeTab,
    setActiveTab,
  }
}
