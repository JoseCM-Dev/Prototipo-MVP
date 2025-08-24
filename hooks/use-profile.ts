"use client"

import { useState, useEffect } from "react"

export type ProfileType = "user" | "business"

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  location: string
  interests: string[]
  joinedDate: string
  profileType: "user"
}

export interface BusinessProfile {
  id: string
  name: string
  email: string
  logo?: string
  description: string
  category: string
  location: string
  services: string[]
  followers: number
  rating: number
  reviews: number
  isVerified: boolean
  joinedDate: string
  profileType: "business"
}

export type Profile = UserProfile | BusinessProfile

const defaultUserProfile: UserProfile = {
  id: "1",
  name: "María González",
  email: "maria@example.com",
  location: "Centro, Medellín",
  interests: ["Cafeterías", "Restaurantes", "Librerías", "Gimnasios"],
  joinedDate: "2024-01-15",
  profileType: "user",
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(defaultUserProfile)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("localconnect-profile")
    const savedTheme = localStorage.getItem("localconnect-theme")

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile))
      } catch (error) {
        console.error("[v0] Error loading profile from localStorage:", error)
      }
    }

    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark")
    }
  }, [])

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("localconnect-profile", JSON.stringify(profile))
  }, [profile])

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("localconnect-theme", theme)
  }, [theme])

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const switchProfileType = (newType: ProfileType) => {
    if (newType === "business" && profile.profileType === "user") {
      const businessProfile: BusinessProfile = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        description: "",
        category: "",
        location: profile.location,
        services: [],
        followers: 0,
        rating: 0,
        reviews: 0,
        isVerified: false,
        joinedDate: profile.joinedDate,
        profileType: "business",
      }
      setProfile(businessProfile)
    } else if (newType === "user" && profile.profileType === "business") {
      const userProfile: UserProfile = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        location: profile.location,
        interests: [],
        joinedDate: profile.joinedDate,
        profileType: "user",
      }
      setProfile(userProfile)
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return {
    profile,
    theme,
    updateProfile,
    switchProfileType,
    toggleTheme,
  }
}
