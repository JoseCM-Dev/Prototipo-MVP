"use client"

import { useState, useEffect } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("localconnect-favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("[v0] Error loading favorites from localStorage:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("localconnect-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (businessId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(businessId)) {
        return [...prev, businessId]
      }
      return prev
    })
  }

  const removeFavorite = (businessId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== businessId))
  }

  const toggleFavorite = (businessId: string) => {
    setFavorites((prev) => (prev.includes(businessId) ? prev.filter((id) => id !== businessId) : [...prev, businessId]))
  }

  const isFavorite = (businessId: string) => {
    return favorites.includes(businessId)
  }

  const clearAllFavorites = () => {
    setFavorites([])
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
  }
}
