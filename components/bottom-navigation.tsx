"use client"

import { Home, Compass, TrendingUp, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/hooks/use-navigation"
import { useRouter } from "next/navigation"

export function BottomNavigation() {
  const { activeTab } = useNavigation()
  const router = useRouter()

  const navItems = [
    {
      id: "inicio" as const,
      label: "Inicio",
      icon: Home,
      path: "/",
      disabled: true, // TODO: Create inicio page
    },
    {
      id: "explorar" as const,
      label: "Explorar",
      icon: Compass,
      path: "/",
    },
    {
      id: "destacados" as const,
      label: "Destacados",
      icon: TrendingUp,
      path: "/destacados",
    },
    {
      id: "favoritos" as const,
      label: "Favoritos",
      icon: Heart,
      path: "/favoritos",
    },
    {
      id: "perfil" as const,
      label: "Perfil",
      icon: User,
      path: "/perfil",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-[#ffffff] border-t border-[#e8edf5]">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          const isDisabled = item.disabled

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                isActive ? "text-[#0d141c]" : "text-[#4a739c]"
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isDisabled && router.push(item.path)}
              disabled={isDisabled}
            >
              {isActive ? (
                <div className="w-6 h-6 bg-[#0d141c] rounded-full flex items-center justify-center">
                  <Icon className="h-4 w-4 text-[#ffffff]" />
                </div>
              ) : (
                <Icon className="h-5 w-5" />
              )}
              <span className={`text-xs ${isActive ? "font-medium" : ""}`}>{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
