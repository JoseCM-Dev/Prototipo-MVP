"use client"

import { MapPin, Users, Star, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Business } from "@/lib/mock-data"

interface FavoriteBusinessCardProps {
  business: Business
  onRemove: (id: string) => void
  onViewDetails: (id: string) => void
}

export function FavoriteBusinessCard({ business, onRemove, onViewDetails }: FavoriteBusinessCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e8edf5] relative">
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm hover:bg-red-50 text-gray-600 hover:text-red-600 h-8 w-8"
        onClick={() => onRemove(business.id)}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex">
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img src={business.image || "/placeholder.svg"} alt={business.name} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 pr-8">
              <h3 className="font-semibold text-[#0d141c] text-sm mb-1">{business.name}</h3>
              <p className="text-[#4a739c] text-xs mb-2 line-clamp-2">{business.category}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-[#4a739c] mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{business.followers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{business.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{business.location}</span>
            </div>
          </div>

          {/* Status and Action */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                business.isOpen ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
              }`}
            >
              {business.isOpen ? "Abierto" : "Cerrado"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4a739c] hover:text-[#0d141c] h-6 px-2"
              onClick={() => onViewDetails(business.id)}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Ver
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
