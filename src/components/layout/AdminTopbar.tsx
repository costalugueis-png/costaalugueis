'use client'

import React from 'react'
import { useAuth } from '@/lib/auth-context'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Bell } from 'lucide-react'

export function AdminTopbar() {
  const { profile, logout } = useAuth()

  if (!profile) return null

  const initials = profile.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-30 md:ml-64">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">Costa Aluguéis</h1>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-zinc-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="hidden sm:flex items-center gap-3 text-right pl-4 border-l border-zinc-200">
            <div>
              <p className="text-sm font-medium text-zinc-900">{profile.fullName}</p>
              <p className="text-xs text-zinc-600 capitalize">{profile.role}</p>
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
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}