"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { useFavorites } from "./use-favorites"
import { useProfile } from "./use-profile"

interface AppState {
  isLoading: boolean
  error: string | null
  notifications: Array<{
    id: string
    message: string
    type: "info" | "success" | "warning" | "error"
    timestamp: Date
  }>
}

interface AppContextType extends AppState {
  favorites: ReturnType<typeof useFavorites>
  profile: ReturnType<typeof useProfile>
  addNotification: (message: string, type?: "info" | "success" | "warning" | "error") => void
  clearNotifications: () => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>({
    isLoading: false,
    error: null,
    notifications: [],
  })

  const favorites = useFavorites()
  const profile = useProfile()

  const addNotification = (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    }

    setAppState((prev) => ({
      ...prev,
      notifications: [...prev.notifications, notification],
    }))

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setAppState((prev) => ({
        ...prev,
        notifications: prev.notifications.filter((n) => n.id !== notification.id),
      }))
    }, 5000)
  }

  const clearNotifications = () => {
    setAppState((prev) => ({ ...prev, notifications: [] }))
  }

  const setError = (error: string | null) => {
    setAppState((prev) => ({ ...prev, error }))
  }

  const setLoading = (isLoading: boolean) => {
    setAppState((prev) => ({ ...prev, isLoading }))
  }

  const contextValue: AppContextType = {
    ...appState,
    favorites,
    profile,
    addNotification,
    clearNotifications,
    setError,
    setLoading,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export function useAppState() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider")
  }
  return context
}
