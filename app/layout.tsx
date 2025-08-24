import type React from "react"
import { Geist, Manrope } from "next/font/google"
import { AppProvider } from "@/hooks/use-app-state"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
