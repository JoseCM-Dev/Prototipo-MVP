"use client"

import {
  ArrowLeft,
  Camera,
  Edit3,
  Settings,
  Moon,
  Sun,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Building,
  UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProfileStats } from "@/components/profile-stats"
import { AppLayout } from "@/components/app-layout"
import { useProfile } from "@/hooks/use-profile"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PerfilPage() {
  const { profile, theme, updateProfile, switchProfileType, toggleTheme } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(profile)
  const router = useRouter()

  const handleSave = () => {
    updateProfile(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
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
            <h1 className="text-xl font-bold text-[#0d141c]">Perfil</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="text-[#0d141c]">
            <Edit3 className="h-5 w-5" />
          </Button>
        </header>

        <div className="flex-1 px-6 py-4 space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e8edf5]">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {profile.profileType === "business" ? (
                    <Building className="h-10 w-10 text-white" />
                  ) : (
                    <UserIcon className="h-10 w-10 text-white" />
                  )}
                </div>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-[#0d141c] hover:bg-[#1a202c]"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="font-semibold text-lg"
                      placeholder="Nombre"
                    />
                    <Input
                      value={editForm.location}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                      className="text-sm"
                      placeholder="Ubicación"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-[#0d141c]">{profile.name}</h2>
                    <p className="text-[#4a739c] text-sm">{profile.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          profile.profileType === "business" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                        }`}
                      >
                        {profile.profileType === "business" ? "Negocio" : "Usuario"}
                      </span>
                      {profile.profileType === "business" && "isVerified" in profile && profile.isVerified && (
                        <Shield className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Profile Type Switcher */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={profile.profileType === "user" ? "default" : "outline"}
                size="sm"
                onClick={() => switchProfileType("user")}
                className="flex-1 rounded-lg"
                disabled={isEditing}
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Usuario
              </Button>
              <Button
                variant={profile.profileType === "business" ? "default" : "outline"}
                size="sm"
                onClick={() => switchProfileType("business")}
                className="flex-1 rounded-lg"
                disabled={isEditing}
              >
                <Building className="h-4 w-4 mr-2" />
                Negocio
              </Button>
            </div>

            {/* Profile Details */}
            {profile.profileType === "business" && "description" in profile && (
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <Textarea
                      value={editForm.profileType === "business" ? editForm.description : ""}
                      onChange={(e) =>
                        setEditForm((prev) =>
                          prev.profileType === "business" ? { ...prev, description: e.target.value } : prev,
                        )
                      }
                      placeholder="Descripción del negocio"
                      className="min-h-[80px]"
                    />
                    <Input
                      value={editForm.profileType === "business" ? editForm.category : ""}
                      onChange={(e) =>
                        setEditForm((prev) =>
                          prev.profileType === "business" ? { ...prev, category: e.target.value } : prev,
                        )
                      }
                      placeholder="Categoría"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-[#0d141c] text-sm">{profile.description}</p>
                    <p className="text-[#4a739c] text-sm">Categoría: {profile.category}</p>
                  </>
                )}
              </div>
            )}

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-[#e8edf5] text-[#0d141c] rounded-lg bg-transparent"
                >
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="flex-1 bg-[#0d141c] text-white hover:bg-[#1a202c] rounded-lg">
                  Guardar
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <ProfileStats
            profileType={profile.profileType}
            followers={profile.profileType === "business" ? profile.followers : undefined}
            rating={profile.profileType === "business" ? profile.rating : undefined}
            reviews={profile.profileType === "business" ? profile.reviews : undefined}
          />

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e8edf5] overflow-hidden">
            <div className="p-4 border-b border-[#e8edf5]">
              <h3 className="font-semibold text-[#0d141c]">Configuración</h3>
            </div>
            <div className="divide-y divide-[#e8edf5]">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-[#f7fafc] transition-colors"
                onClick={toggleTheme}
              >
                <div className="flex items-center gap-3">
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 text-[#4a739c]" />
                  ) : (
                    <Sun className="h-5 w-5 text-[#4a739c]" />
                  )}
                  <span className="text-[#0d141c]">Tema</span>
                </div>
                <span className="text-[#4a739c] text-sm capitalize">{theme === "light" ? "Claro" : "Oscuro"}</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 hover:bg-[#f7fafc] transition-colors">
                <Bell className="h-5 w-5 text-[#4a739c]" />
                <span className="text-[#0d141c]">Notificaciones</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 hover:bg-[#f7fafc] transition-colors">
                <Settings className="h-5 w-5 text-[#4a739c]" />
                <span className="text-[#0d141c]">Configuración avanzada</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 hover:bg-[#f7fafc] transition-colors">
                <HelpCircle className="h-5 w-5 text-[#4a739c]" />
                <span className="text-[#0d141c]">Ayuda y soporte</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-red-600">
                <LogOut className="h-5 w-5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>

          {/* Interests/Services */}
          {profile.profileType === "user" && "interests" in profile && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e8edf5]">
              <h3 className="font-semibold text-[#0d141c] mb-3">Intereses</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-[#e8edf5] text-[#4a739c] text-sm rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.profileType === "business" && "services" in profile && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e8edf5]">
              <h3 className="font-semibold text-[#0d141c] mb-3">Servicios</h3>
              {profile.services.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[#4a739c] text-sm">No hay servicios configurados</p>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
