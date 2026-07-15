'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function Perfil() {
  const { profile, setProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || '',
    phone: profile?.phone || '',
  })

  const initials = profile?.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    if (profile) {
      setProfile({
        ...profile,
        fullName: formData.fullName,
        phone: formData.phone,
      })
      setIsEditing(false)
    }
  }

  if (!profile) return null

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Meu Perfil</h1>
        <p className="text-zinc-600 mt-1">Gerencie suas informações pessoais</p>
      </div>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-zinc-600 mb-2">Foto atual do perfil</p>
              <Button variant="outline" size="sm">
                Alterar Foto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Informações Pessoais</CardTitle>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button
                  variant="orange"
                  size="sm"
                  onClick={handleSave}
                >
                  Salvar Alterações
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({
                      fullName: profile.fullName,
                      phone: profile.phone || '',
                    })
                  }}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-600 mb-1">Email</p>
              <p className="text-base font-medium text-zinc-900">{profile.userId}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 mb-1">Tipo de Usuário</p>
              <Badge variant="pending">
                {profile.role === 'tenant' ? 'Locatário' : profile.role}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-zinc-600 mb-1">Data de Cadastro</p>
              <p className="text-base font-medium text-zinc-900">
                {new Date(profile.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full sm:w-auto">
            Alterar Senha
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}