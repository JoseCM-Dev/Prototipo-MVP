"use client"

import { TrendingUp, Eye, Users, MapPin, Star, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WeeklyHighlight } from "@/lib/mock-data"

interface WeeklyHighlightCardProps {
  highlight: WeeklyHighlight
  onFollow?: (id: string) => void
  isFollowing?: boolean
}

export function WeeklyHighlightCard({ highlight, onFollow, isFollowing = false }: WeeklyHighlightCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e8edf5]">
      {/* Trending Badge */}
      <div className="relative">
        <img src={highlight.image || "/placeholder.svg"} alt={highlight.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />#{highlight.trendingRank} Trending
        </div>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
          +{highlight.growthPercentage}% esta semana
        </div>
      </div>

      <div className="p-4">
        {/* Business Info */}
        <div className="mb-3">
          <h3 className="font-bold text-[#0d141c] text-lg mb-1">{highlight.name}</h3>
          <p className="text-[#4a739c] text-sm mb-2">{highlight.category}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-xs text-[#4a739c] mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{highlight.followers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{highlight.weeklyViews}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{highlight.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{highlight.location}</span>
            </div>
          </div>
        </div>

        {/* Special Offer */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Tag className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Oferta de la semana</span>
          </div>
          <p className="text-sm text-blue-700">{highlight.specialOffer}</p>
        </div>

        {/* Weekly Growth */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-[#0d141c]">
              <span className="font-semibold text-green-600">+{highlight.weeklyGrowth}</span> nuevos seguidores
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onFollow?.(highlight.id)}
            className={`flex-1 rounded-xl ${
              isFollowing
                ? "bg-[#e8edf5] text-[#0d141c] hover:bg-[#d1d9e6]"
                : "bg-[#0d141c] text-white hover:bg-[#1a202c]"
            }`}
          >
            {isFollowing ? "Siguiendo" : "Seguir"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-[#e8edf5] text-[#0d141c] rounded-xl hover:bg-[#f7fafc] bg-transparent"
          >
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  )
}
