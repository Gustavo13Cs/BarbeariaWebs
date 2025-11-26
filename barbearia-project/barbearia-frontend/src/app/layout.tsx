import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/AuthContext"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Barbeiro - Sistema de Gerenciamento",
  description: "Sistema de gerenciamento para barbearias",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
