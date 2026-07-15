import React from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'

export const metadata = {
  title: 'Admin - Costa Aluguéis',
  description: 'Área administrativa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}