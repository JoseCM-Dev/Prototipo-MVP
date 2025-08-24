"use client"

import { ArrowLeft, TrendingUp, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WeeklyHighlightCard } from "@/components/weekly-highlight-card"
import { AppLayout } from "@/components/app-layout"
import { weeklyHighlights } from "@/lib/mock-data"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DestacadosPage() {
  const [following, setFollowing] = useState<string[]>([])
  const router = useRouter()

  const handleFollow = (businessId: string) => {
    setFollowing((prev) => (prev.includes(businessId) ? prev.filter((id) => id !== businessId) : [...prev, businessId]))
  }

  const currentWeek = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <AppLayout>
      {/* Header */}
      <header className="bg-white px-6 py-4 flex items-center gap-4 border-b border-[#e8edf5]">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0d141c]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[#0d141c]">Destacados</h1>
          <p className="text-sm text-[#4a739c]">Semana del {currentWeek}</p>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="bg-white mx-6 mt-4 rounded-xl p-4 shadow-sm border border-[#e8edf5]">
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-5 w-5 text-orange-500" />
          <h2 className="font-semibold text-[#0d141c]">Resumen semanal</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-[#0d141c]">{weeklyHighlights.length}</p>
            <p className="text-xs text-[#4a739c]">Destacados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">+12.5%</p>
            <p className="text-xs text-[#4a739c]">Crecimiento</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">3.2K</p>
            <p className="text-xs text-[#4a739c]">Vistas totales</p>
          </div>
        </div>
      </div>

      {/* Weekly Highlights */}
      <div className="flex-1 px-6 py-4 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-[#0d141c]" />
          <h2 className="text-lg font-semibold text-[#0d141c]">Negocios más populares</h2>
        </div>

        {weeklyHighlights.map((highlight) => (
          <WeeklyHighlightCard
            key={highlight.id}
            highlight={highlight}
            onFollow={handleFollow}
            isFollowing={following.includes(highlight.id)}
          />
        ))}

        {/* Weekly Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Tendencias de la semana</h3>
          </div>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Los restaurantes internacionales lideran en popularidad</li>
            <li>• Gimnasios y bienestar en crecimiento del 38%</li>
            <li>• Cafeterías mantienen alta demanda constante</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  )
}
