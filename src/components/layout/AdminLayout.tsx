'use client'

import React from 'react'
import { useAuth } from '@/lib/auth-context'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth()

  if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Acesso Negado</h1>
          <p className="text-zinc-600 mb-4">Você não tem permissão para acessar esta área.</p>
          <a href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
            Voltar para login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <AdminTopbar />
        <main className="flex-1 overflow-auto pt-4 md:pt-0">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}