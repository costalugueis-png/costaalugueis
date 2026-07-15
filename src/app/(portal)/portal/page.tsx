'use client'

import React from 'react'
import { useAuth } from '@/lib/auth-context'
import { mockProperties, mockContracts, mockPayments } from '@/mocks'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, FileText, CreditCard, AlertCircle } from 'lucide-react'
import { formatCurrency, formatDate, getStatusLabel } from '@/lib/utils'

export default function PortalDashboard() {
  const { profile } = useAuth()

  const tenantProperty = mockProperties.find((p) => p.tenantId === profile?.userId)
  const tenantContract = mockContracts.find((c) => c.tenantId === profile?.userId)
  const tenantPayments = mockPayments.filter((p) => p.contractId === tenantContract?.id)

  const pendingPayments = tenantPayments.filter((p) => p.status === 'pending' || p.status === 'overdue')
  const nextPayment = tenantPayments.find((p) => p.status === 'pending')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Bem-vindo, {profile?.fullName}</h1>
        <p className="text-zinc-600 mt-1">Aqui está um resumo das suas informações</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Imóvel"
          value={tenantProperty?.address.split(',')[0] || 'N/A'}
          icon={Building2}
          color="orange"
        />
        <StatCard
          title="Aluguel Mensal"
          value={formatCurrency(tenantProperty?.monthlyRent || 0)}
          icon={CreditCard}
          color="green"
        />
        <StatCard
          title="Contrato"
          value={getStatusLabel(tenantContract?.status || 'inactive')}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Pagamentos Pendentes"
          value={pendingPayments.length}
          icon={AlertCircle}
          color={pendingPayments.length > 0 ? 'red' : 'green'}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações do Imóvel</CardTitle>
          </CardHeader>
          <CardContent>
            {tenantProperty ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Endereço</p>
                  <p className="text-base font-medium text-zinc-900">{tenantProperty.address}</p>
                  <p className="text-sm text-zinc-600">
                    {tenantProperty.city}, {tenantProperty.state} - {tenantProperty.zipCode}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Quartos</p>
                    <p className="text-lg font-semibold text-zinc-900">{tenantProperty.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Banheiros</p>
                    <p className="text-lg font-semibold text-zinc-900">{tenantProperty.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Área</p>
                    <p className="text-lg font-semibold text-zinc-900">{tenantProperty.area}m²</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Status</p>
                  <Badge variant={tenantProperty.status === 'occupied' ? 'success' : 'warning'}>
                    {getStatusLabel(tenantProperty.status)}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-zinc-600">Nenhum imóvel vinculado</p>
            )}
          </CardContent>
        </Card>

        {/* Next Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Próximo Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            {nextPayment ? (
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-zinc-600 mb-1">Valor</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(nextPayment.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Vencimento</p>
                  <p className="text-base font-medium text-zinc-900">
                    {formatDate(nextPayment.dueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Status</p>
                  <Badge
                    variant={
                      nextPayment.status === 'pending'
                        ? 'pending'
                        : nextPayment.status === 'overdue'
                          ? 'destructive'
                          : 'success'
                    }
                  >
                    {getStatusLabel(nextPayment.status)}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-zinc-600">Nenhum pagamento pendente</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {tenantPayments.length > 0 ? (
            <div className="space-y-3">
              {tenantPayments.slice(0, 5).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{formatDate(payment.dueDate)}</p>
                    <p className="text-xs text-zinc-600">{getStatusLabel(payment.status)}</p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900">{formatCurrency(payment.amount)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-600">Nenhum pagamento registrado</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}