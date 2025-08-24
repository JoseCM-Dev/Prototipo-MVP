"use client"

import { Sparkles, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

const quickQuestions = [
  "¿Qué restaurantes están abiertos ahora?",
  "¿Cuáles son los cafés más populares?",
  "¿Hay gimnasios cerca del centro?",
  "¿Qué negocios tienen descuentos?",
]

const aiResponses: Record<string, string> = {
  restaurantes:
    "Encontré 3 restaurantes abiertos cerca de ti: Restaurante Sabor del Mundo (Zona Rosa), Café El Aroma (Centro), y otros más. ¿Te gustaría ver más detalles?",
  cafés:
    "Los cafés más populares son Café El Aroma con 1,250 seguidores y excelentes reseñas. También hay otras opciones cerca de ti.",
  gimnasios:
    "Sí, hay gimnasios disponibles. FitLife está en la zona deportiva con entrenamiento personalizado y 1,456 seguidores.",
  descuentos:
    "Esta semana hay ofertas especiales en varios negocios destacados. ¿Te interesa alguna categoría en particular?",
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte a descubrir negocios hoy?", isUser: false },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }])

    // Simulate AI response
    setTimeout(() => {
      const lowerMessage = message.toLowerCase()
      let response = "Interesante pregunta. Déjame buscar información relevante para ti..."

      // Simple keyword matching for demo
      for (const [keyword, aiResponse] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(keyword)) {
          response = aiResponse
          break
        }
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 1000)

    setInputMessage("")
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="w-full max-w-sm mx-auto bg-white rounded-t-2xl h-[70vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e8edf5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0d141c]">Asistente IA</h3>
              <p className="text-xs text-[#4a739c]">En línea</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser ? "bg-[#0d141c] text-white" : "bg-[#f7fafc] text-[#0d141c]"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Quick questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-[#4a739c] font-medium">Preguntas rápidas:</p>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-[#e8edf5] hover:bg-[#d1d9e6] rounded-xl text-sm text-[#0d141c] transition-colors"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#e8edf5]">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(inputMessage)
                }
              }}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-[#f7fafc] border-[#e8edf5] rounded-xl"
            />
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              className="bg-[#0d141c] hover:bg-[#1a202c] rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
