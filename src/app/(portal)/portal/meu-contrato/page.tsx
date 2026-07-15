'use client'

import React from 'react'
import { useAuth } from '@/lib/auth-context'
import { mockContracts, mockProperties } from '@/mocks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'
import { FileText } from 'lucide-react'
import { formatDate, getStatusLabel } from '@/lib/utils'

export default function MeuContrato() {
  const { profile } = useAuth()
  const contract = mockContracts.find((c) => c.tenantId === profile?.userId)
  const property = contract ? mockProperties.find((p) => p.id === contract.propertyId) : null

  if (!contract) {
    return (
      <EmptyState
        icon={FileText}
        title="Nenhum contrato vinculado"
        description="Você não possui nenhum contrato ativo no momento"
      />
    )
  }

  const isExpired = new Date(contract.endDate) < new Date()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Meu Contrato</h1>
        <p className="text-zinc-600 mt-1">Informações do contrato de locação</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Property Info */}
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-zinc-600 mb-2">Imóvel</p>
              <p className="text-base font-semibold text-zinc-900">{property?.address}</p>
              <p className="text-sm text-zinc-600 mt-1">
                {property?.city}, {property?.state}
              </p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-zinc-200">
              <div>
                <p className="text-sm text-zinc-600 mb-2">Data de Início</p>
                <p className="text-base font-semibold text-zinc-900">{formatDate(contract.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-2">Data de Término</p>
                <p className={`text-base font-semibold ${isExpired ? 'text-red-600' : 'text-zinc-900'}`}>
                  {formatDate(contract.endDate)}
                </p>
              </div>
            </div>

            {/* Contract Terms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div>
                <p className="text-sm text-zinc-600 mb-2">Aluguel Mensal</p>
                <p className="text-xl font-bold text-orange-600">R$ {contract.monthlyRent.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-2">Depósito Caução</p>
                <p className="text-xl font-bold text-zinc-900">R$ {contract.depositAmount.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-2">Status</p>
                <Badge
                  variant={
                    contract.status === 'active'
                      ? 'success'
                      : contract.status === 'expired'
                        ? 'outline'
                        : 'destructive'
                  }
                >
                  {getStatusLabel(contract.status)}
                </Badge>
              </div>
            </div>

            {/* Warnings */}
            {isExpired && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-medium text-red-800">
                  ⚠️ Este contrato expirou. Entre em contato com o proprietário para renovação.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}