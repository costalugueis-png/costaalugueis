'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Building2,
  FileText,
  CreditCard,
  Wallet,
  User,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

const portalNavItems = [
  {
    label: 'Resumo',
    href: '/portal',
    icon: Home,
  },
  {
    label: 'Meu Imóvel',
    href: '/portal/meu-imovel',
    icon: Building2,
  },
  {
    label: 'Contrato',
    href: '/portal/meu-contrato',
    icon: FileText,
  },
  {
    label: 'Pagamentos',
    href: '/portal/pagamentos',
    icon: CreditCard,
  },
  {
    label: 'Documentos',
    href: '/portal/documentos',
    icon: Wallet,
  },
  {
    label: 'Perfil',
    href: '/portal/perfil',
    icon: User,
  },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-zinc-200">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">CA</span>
        </div>
        <span className="font-semibold text-zinc-900">Costa Aluguéis</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {portalNavItems.map((item) => {
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
  )
}