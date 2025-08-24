"use client"

import { SlidersHorizontal, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BusinessCard } from "@/components/business-card"
import { BusinessListItem } from "@/components/business-list-item"
import { AISearch } from "@/components/ai-search"
import { AIAssistant } from "@/components/ai-assistant"
import { AppLayout } from "@/components/app-layout"
import { mockBusinesses } from "@/lib/mock-data"
import { useFavorites } from "@/hooks/use-favorites"
import { useState } from "react"

export default function DescubrePage() {
  const { toggleFavorite, isFavorite } = useFavorites()
  const [searchResults, setSearchResults] = useState(mockBusinesses)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  const handleViewMore = (businessId: string) => {
    console.log("[v0] View more clicked for business:", businessId)
    // TODO: Navigate to business detail page
  }

  const handleSearchResults = (results: typeof mockBusinesses) => {
    setSearchResults(results)
    setIsSearchActive(true)
  }

  const handleClearSearch = () => {
    setSearchResults(mockBusinesses)
    setIsSearchActive(false)
  }

  const recommendedBusinesses = isSearchActive ? [] : mockBusinesses.slice(0, 2)
  const nearbyBusinesses = isSearchActive ? [] : mockBusinesses.slice(2, 4)

  return (
    <AppLayout>
      {/* Header */}
      <header className="bg-[#ffffff] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#0d141c]">Descubre</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-[#0d141c]" onClick={() => setShowAIAssistant(true)}>
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0d141c]">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* AI Search Bar */}
      <div className="px-6 py-4">
        <AISearch businesses={mockBusinesses} onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-20">
        {isSearchActive && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#0d141c] mb-4">
              Resultados de búsqueda ({searchResults.length})
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((business) => (
                  <BusinessListItem
                    key={business.id}
                    id={business.id}
                    name={business.name}
                    category={business.category}
                    image={business.image}
                    followers={business.followers}
                    location={business.location}
                    isOpen={business.isOpen}
                    onFavorite={toggleFavorite}
                    isFavorited={isFavorite(business.id)}
                    onViewMore={handleViewMore}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#4a739c] mb-2">No se encontraron resultados</p>
                <p className="text-sm text-[#4a739c]">Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </section>
        )}

        {/* Recomendados para ti */}
        {!isSearchActive && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#0d141c] mb-4">Recomendados para ti</h2>
            <div className="grid grid-cols-2 gap-3">
              {recommendedBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  id={business.id}
                  name={business.name}
                  category={business.category}
                  image={business.image}
                  followers={business.followers}
                  location={business.location}
                  isOpen={business.isOpen}
                  onFavorite={toggleFavorite}
                  isFavorited={isFavorite(business.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Cerca de ti */}
        {!isSearchActive && (
          <section>
            <h2 className="text-lg font-semibold text-[#0d141c] mb-4">Cerca de ti</h2>
            <div className="space-y-4">
              {nearbyBusinesses.map((business) => (
                <BusinessListItem
                  key={business.id}
                  id={business.id}
                  name={business.name}
                  category={business.category}
                  image={business.image}
                  followers={business.followers}
                  location={business.location}
                  isOpen={business.isOpen}
                  onFavorite={toggleFavorite}
                  isFavorited={isFavorite(business.id)}
                  onViewMore={handleViewMore}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />
    </AppLayout>
  )
}
