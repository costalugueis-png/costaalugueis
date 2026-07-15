'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const portalNavItems = [
  { label: 'Resumo', href: '/portal' },
  { label: 'Meu Imóvel', href: '/portal/meu-imovel' },
  { label: 'Contrato', href: '/portal/meu-contrato' },
  { label: 'Pagamentos', href: '/portal/pagamentos' },
  { label: 'Documentos', href: '/portal/documentos' },
  { label: 'Perfil', href: '/portal/perfil' },
]

export function PortalTopbar() {
  const { profile, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!profile) return null

  const initials = profile.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo mobile */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CA</span>
          </div>
        </div>

        {/* Menu button mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-700"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 flex-1">
          {portalNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-700 hover:text-orange-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-right">
            <div>
              <p className="text-sm font-medium text-zinc-900">{profile.fullName}</p>
              <p className="text-xs text-zinc-600">{profile.phone}</p>
            </div>
          </div>
          <div className="relative group">
            <Avatar>
              <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
              <AvatarFallback className="bg-orange-100 text-orange-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-200 hidden group-hover:block">
              <Link
                href="/portal/perfil"
                className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 border-b border-zinc-100"
              >
                Meu Perfil
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden px-4 py-4 space-y-2 border-t border-zinc-200">
          {portalNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              logout()
              setMobileMenuOpen(false)
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            Sair
          </button>
        </nav>
      )}
    </header>
  )
}