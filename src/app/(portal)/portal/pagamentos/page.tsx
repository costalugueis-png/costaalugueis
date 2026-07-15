'use client'

import React from 'react'
import { useAuth } from '@/lib/auth-context'
import { mockContracts, mockPayments } from '@/mocks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'
import { CreditCard } from 'lucide-react'
import { formatCurrency, formatDate, getStatusLabel } from '@/lib/utils'

export default function Pagamentos() {
  const { profile } = useAuth()
  const contract = mockContracts.find((c) => c.tenantId === profile?.userId)
  const payments = contract ? mockPayments.filter((p) => p.contractId === contract.id) : []

  if (payments.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="Nenhum pagamento registrado"
        description="Você não possui pagamentos registrados no momento"
      />
    )
  }

  const stats = {
    total: payments.length,
    paid: payments.filter((p) => p.status === 'paid').length,
    pending: payments.filter((p) => p.status === 'pending').length,
    overdue: payments.filter((p) => p.status === 'overdue').length,
  }

  const totalPaid = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = payments
    .filter((p) => p.status === 'pending' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Pagamentos</h1>
        <p className="text-zinc-600 mt-1">Histórico e status de seus pagamentos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-zinc-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-zinc-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-zinc-600 mb-1">Pagos</p>
            <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-zinc-600 mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-zinc-600 mb-1">Vencidos</p>
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-zinc-600 mb-2">Total Pago</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-zinc-600 mb-2">Total Pendente</p>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(totalPending)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900">
                    Vencimento: {formatDate(payment.dueDate)}
                  </p>
                  {payment.paidAt && (
                    <p className="text-xs text-zinc-600">
                      Pago em: {formatDate(payment.paidAt)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-zinc-900">
                    {formatCurrency(payment.amount)}
                  </p>
                  <Badge
                    variant={
                      payment.status === 'paid'
                        ? 'success'
                        : payment.status === 'pending'
                          ? 'pending'
                          : 'destructive'
                    }
                  >
                    {getStatusLabel(payment.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}