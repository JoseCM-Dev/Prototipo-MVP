"use client"

import { MapPin, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BusinessListItemProps {
  id: string
  name: string
  category: string
  image: string
  followers: number
  location: string
  isOpen?: boolean
  onFavorite?: (id: string) => void
  isFavorited?: boolean
  onViewMore?: (id: string) => void
}

export function BusinessListItem({
  id,
  name,
  category,
  image,
  followers,
  location,
  isOpen = true,
  onFavorite,
  isFavorited = false,
  onViewMore,
}: BusinessListItemProps) {
  return (
    <div className="bg-[#ffffff] rounded-xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {isOpen && (
            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">Abierto</span>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => onFavorite?.(id)}>
            <Heart className={`h-3 w-3 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </Button>
        </div>
        <h3 className="font-semibold text-[#0d141c] text-base mb-1">{name}</h3>
        <p className="text-[#4a739c] text-sm mb-2">{category}</p>
        <div className="flex items-center gap-4 text-xs text-[#4a739c] mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{followers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-[#0d141c] border-[#e8edf5] rounded-lg bg-transparent"
          onClick={() => onViewMore?.(id)}
        >
          Ver más
        </Button>
      </div>
      <div className="ml-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
