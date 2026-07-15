'use client'

import React from 'react'
import { useAuth } from '@/lib/auth-context'
import { mockProperties } from '@/mocks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'
import { Building2 } from 'lucide-react'
import { getStatusLabel } from '@/lib/utils'

export default function MeuImovel() {
  const { profile } = useAuth()
  const property = mockProperties.find((p) => p.tenantId === profile?.userId)

  if (!property) {
    return (
      <EmptyState
        icon={Building2}
        title="Nenhum imóvel vinculado"
        description="Você não possui nenhum imóvel alugado no momento"
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Meu Imóvel</h1>
        <p className="text-zinc-600 mt-1">Informações detalhadas do imóvel alugado</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Imóvel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900">{property.address}</h2>
                  <p className="text-zinc-600 mt-1">
                    {property.city}, {property.state} - {property.zipCode}
                  </p>
                </div>
                <Badge
                  variant={
                    property.status === 'occupied'
                      ? 'success'
                      : property.status === 'vacant'
                        ? 'outline'
                        : 'warning'
                  }
                >
                  {getStatusLabel(property.status)}
                </Badge>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-zinc-200">
              <div>
                <p className="text-sm text-zinc-600 mb-2">Tipo</p>
                <p className="text-base font-semibold text-zinc-900 capitalize">{property.type}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-2">Área</p>
                <p className="text-base font-semibold text-zinc-900">{property.area}m²</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-2">Quartos</p>
                <p className="text-base font-semibold text-zinc-900">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-2">Banheiros</p>
                <p className="text-base font-semibold text-zinc-900">{property.bathrooms}</p>
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
              <div>
                <p className="text-sm text-zinc-600 mb-2">Aluguel Mensal</p>
                <p className="text-xl font-bold text-orange-600">R$ {property.monthlyRent.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-2">Data da Locação</p>
                <p className="text-base font-semibold text-zinc-900">{new Date(property.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}