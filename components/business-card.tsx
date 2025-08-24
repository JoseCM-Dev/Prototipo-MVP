"use client"

import { MapPin, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BusinessCardProps {
  id: string
  name: string
  category: string
  image: string
  followers: number
  location: string
  isOpen?: boolean
  onFavorite?: (id: string) => void
  isFavorited?: boolean
}

export function BusinessCard({
  id,
  name,
  category,
  image,
  followers,
  location,
  isOpen = true,
  onFavorite,
  isFavorited = false,
}: BusinessCardProps) {
  return (
    <div className="bg-[#ffffff] rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-square relative">
        <img src={image || "/placeholder.svg"} alt={`${name} interior`} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={() => onFavorite?.(id)}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-[#0d141c] text-sm">{name}</h3>
          {isOpen && (
            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">Abierto</span>
          )}
        </div>
        <p className="text-[#4a739c] text-xs mb-2">{category}</p>
        <div className="flex items-center justify-between text-xs text-[#4a739c]">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{followers.toLocaleString()} seguidores</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
