import { Heart, Eye, Users, Star } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"

interface ProfileStatsProps {
  profileType: "user" | "business"
  followers?: number
  rating?: number
  reviews?: number
}

export function ProfileStats({ profileType, followers = 0, rating = 0, reviews = 0 }: ProfileStatsProps) {
  const { favorites } = useFavorites()

  if (profileType === "user") {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e8edf5]">
        <h3 className="font-semibold text-[#0d141c] mb-3">Estadísticas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-red-50 rounded-full mb-2 mx-auto">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-[#0d141c]">{favorites.length}</p>
            <p className="text-xs text-[#4a739c]">Favoritos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mb-2 mx-auto">
              <Eye className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-[#0d141c]">127</p>
            <p className="text-xs text-[#4a739c]">Vistas</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e8edf5]">
      <h3 className="font-semibold text-[#0d141c] mb-3">Métricas del negocio</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mb-2 mx-auto">
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-lg font-bold text-[#0d141c]">{followers.toLocaleString()}</p>
          <p className="text-xs text-[#4a739c]">Seguidores</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-50 rounded-full mb-2 mx-auto">
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-lg font-bold text-[#0d141c]">{rating.toFixed(1)}</p>
          <p className="text-xs text-[#4a739c]">Rating</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-2 mx-auto">
            <Eye className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-lg font-bold text-[#0d141c]">{reviews}</p>
          <p className="text-xs text-[#4a739c]">Reseñas</p>
        </div>
      </div>
    </div>
  )
}
