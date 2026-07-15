'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  FileText,
  CreditCard,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'

const adminNavItems = [
  {
    label: 'Dashboard',
    href: '/app/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Imóveis',
    href: '/app/imoveis',
    icon: Building2,
  },
  {
    label: 'Contratos',
    href: '/app/contratos',
    icon: FileText,
  },
  {
    label: 'Pagamentos',
    href: '/app/pagamentos',
    icon: CreditCard,
  },
  {
    label: 'Relatórios',
    href: '/app/relatorios',
    icon: BarChart3,
  },
  {
    label: 'Usuários',
    href: '/app/usuarios',
    icon: Users,
  },
  {
    label: 'Configurações',
    href: '/app/configuracoes',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-zinc-200 fixed left-0 top-0 h-screen">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CA</span>
          </div>
          <span className="font-semibold text-zinc-900">Costa Aluguel</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium',
                  isActive
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-zinc-700 hover:bg-zinc-50'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-zinc-200">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-zinc-700 hover:bg-zinc-50 text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white border border-zinc-200 text-zinc-700"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar */}
      {open && (
        <aside className="fixed inset-0 z-30 bg-black/50 md:hidden">
          <div className="w-64 bg-white h-full flex flex-col">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span className="font-semibold text-zinc-900">Costa Aluguel</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium',
                      isActive
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-zinc-700 hover:bg-zinc-50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="px-4 py-4 border-t border-zinc-200">
              <button
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-zinc-700 hover:bg-zinc-50 text-sm font-medium transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}