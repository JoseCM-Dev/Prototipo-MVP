"use client"

import { Search, Sparkles, X, TrendingUp, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import type { Business } from "@/lib/mock-data"

interface AISearchProps {
  businesses: Business[]
  onSearchResults: (results: Business[]) => void
  onClearSearch: () => void
}

const searchSuggestions = [
  "Café cerca de mí",
  "Restaurantes abiertos ahora",
  "Gimnasios con entrenador personal",
  "Librerías con eventos",
  "Salones de belleza",
  "Panaderías artesanales",
]

const trendingSearches = ["Comida internacional", "Espacios de coworking", "Clases de yoga", "Barbería moderna"]

export function AISearch({ businesses, onSearchResults, onClearSearch }: AISearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  // Simulate AI-powered search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        const filtered = searchSuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setAiSuggestions(filtered.slice(0, 3))
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setAiSuggestions([])
    }
  }, [searchQuery])

  const handleSearch = (query: string) => {
    console.log("[v0] AI Search query:", query)

    if (!query.trim()) {
      onClearSearch()
      return
    }

    // Simulate AI-powered search with intelligent matching
    const results = businesses.filter((business) => {
      const searchTerms = query.toLowerCase().split(" ")
      const businessText = `${business.name} ${business.category} ${business.location}`.toLowerCase()

      return searchTerms.some(
        (term) =>
          businessText.includes(term) ||
          // AI-like semantic matching
          (term.includes("café") && businessText.includes("café")) ||
          (term.includes("comida") && businessText.includes("restaurante")) ||
          (term.includes("libro") && businessText.includes("librería")) ||
          (term.includes("pan") && businessText.includes("panadería")),
      )
    })

    onSearchResults(results)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch(suggestion)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSuggestions(false)
    onClearSearch()
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4a739c]" />
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchQuery)
            }
          }}
          placeholder="Buscar negocios"
          className="pl-10 pr-12 bg-[#e8edf5] border-none text-[#4a739c] placeholder:text-[#4a739c] rounded-xl h-12"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-[#4a739c]"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {isSearching && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <Sparkles className="h-4 w-4 text-[#4a739c] animate-pulse" />
          </div>
        )}
      </div>

      {/* AI Suggestions Dropdown */}
      {showSuggestions && (searchQuery.length > 0 || !searchQuery) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-[#e8edf5] z-50 max-h-80 overflow-y-auto">
          {/* AI-powered suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="p-3 border-b border-[#e8edf5]">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#4a739c]" />
                <span className="text-sm font-medium text-[#4a739c]">Sugerencias IA</span>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-[#f7fafc] rounded-lg text-sm text-[#0d141c]"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Trending searches */}
          {!searchQuery && (
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-[#4a739c]" />
                <span className="text-sm font-medium text-[#4a739c]">Tendencias</span>
              </div>
              {trendingSearches.map((trend, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-[#f7fafc] rounded-lg text-sm text-[#0d141c]"
                  onClick={() => handleSuggestionClick(trend)}
                >
                  {trend}
                </button>
              ))}
            </div>
          )}

          {/* Recent searches placeholder */}
          {!searchQuery && (
            <div className="p-3 border-t border-[#e8edf5]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-[#4a739c]" />
                <span className="text-sm font-medium text-[#4a739c]">Búsquedas recientes</span>
              </div>
              <div className="text-sm text-[#4a739c] px-3 py-2">No hay búsquedas recientes</div>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close suggestions */}
      {showSuggestions && <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />}
    </div>
  )
}
