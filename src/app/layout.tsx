import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Costa Aluguéis - Sistema de Gestão de Aluguéis',
  description: 'Sistema de gestão de aluguéis e contratos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}