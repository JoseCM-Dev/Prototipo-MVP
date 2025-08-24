"use client"

import { ArrowLeft, Heart, Trash2, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FavoriteBusinessCard } from "@/components/favorite-business-card"
import { BusinessCard } from "@/components/business-card"
import { AppLayout } from "@/components/app-layout"
import { mockBusinesses } from "@/lib/mock-data"
import { useFavorites } from "@/hooks/use-favorites"
import { useState } from "react"
import { useRouter } from "next/navigation"

type ViewMode = "list" | "grid"
type FilterType = "all" | "open" | "closed" | "category"

export default function FavoritosPage() {
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites()
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [filter, setFilter] = useState<FilterType>("all")
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const router = useRouter()

  // Get favorite businesses
  const favoriteBusinesses = mockBusinesses.filter((business) => favorites.includes(business.id))

  // Apply filters
  const filteredBusinesses = favoriteBusinesses.filter((business) => {
    switch (filter) {
      case "open":
        return business.isOpen
      case "closed":
        return !business.isOpen
      default:
        return true
    }
  })

  const handleViewDetails = (businessId: string) => {
    console.log("[v0] View details for business:", businessId)
    // TODO: Navigate to business detail page
  }

  const handleClearAll = () => {
    clearAllFavorites()
    setShowClearConfirm(false)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#f7fafc] flex flex-col max-w-sm mx-auto">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex items-center gap-4 border-b border-[#e8edf5]">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0d141c]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#0d141c]">Favoritos</h1>
            <p className="text-sm text-[#4a739c]">{favoriteBusinesses.length} negocios guardados</p>
          </div>
          {favoriteBusinesses.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowClearConfirm(true)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </header>

        {favoriteBusinesses.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#e8edf5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-[#4a739c]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0d141c] mb-2">No tienes favoritos aún</h2>
              <p className="text-[#4a739c] text-sm mb-6 max-w-xs">
                Explora negocios y marca como favoritos los que más te interesen
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-[#0d141c] text-white hover:bg-[#1a202c] rounded-xl"
              >
                Explorar negocios
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="bg-white mx-6 mt-4 rounded-xl p-4 shadow-sm border border-[#e8edf5]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#4a739c]" />
                  <span className="text-sm font-medium text-[#0d141c]">Filtros</span>
                </div>
                <div className="flex items-center gap-1 bg-[#f7fafc] rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-7 w-7 p-0"
                  >
                    <List className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-7 w-7 p-0"
                  >
                    <Grid className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="text-xs rounded-lg"
                >
                  Todos ({favoriteBusinesses.length})
                </Button>
                <Button
                  variant={filter === "open" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("open")}
                  className="text-xs rounded-lg"
                >
                  Abiertos ({favoriteBusinesses.filter((b) => b.isOpen).length})
                </Button>
                <Button
                  variant={filter === "closed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("closed")}
                  className="text-xs rounded-lg"
                >
                  Cerrados ({favoriteBusinesses.filter((b) => !b.isOpen).length})
                </Button>
              </div>
            </div>

            {/* Favorites List */}
            <div className="flex-1 px-6 py-4">
              {viewMode === "list" ? (
                <div className="space-y-4">
                  {filteredBusinesses.map((business) => (
                    <FavoriteBusinessCard
                      key={business.id}
                      business={business}
                      onRemove={removeFavorite}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredBusinesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      id={business.id}
                      name={business.name}
                      category={business.category}
                      image={business.image}
                      followers={business.followers}
                      location={business.location}
                      isOpen={business.isOpen}
                      onFavorite={removeFavorite}
                      isFavorited={true}
                    />
                  ))}
                </div>
              )}

              {filteredBusinesses.length === 0 && filter !== "all" && (
                <div className="text-center py-8">
                  <p className="text-[#4a739c] mb-2">No hay negocios con este filtro</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilter("all")}
                    className="text-[#0d141c] border-[#e8edf5] rounded-lg"
                  >
                    Ver todos
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Clear All Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold text-[#0d141c] mb-2">¿Eliminar todos los favoritos?</h3>
              <p className="text-[#4a739c] text-sm mb-6">
                Esta acción no se puede deshacer. Se eliminarán todos los negocios de tu lista de favoritos.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 border-[#e8edf5] text-[#0d141c] rounded-lg"
                >
                  Cancelar
                </Button>
                <Button onClick={handleClearAll} className="flex-1 bg-red-500 text-white hover:bg-red-600 rounded-lg">
                  Eliminar todo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
