'use client'

import React from 'react'
import { mockProperties, mockContracts, mockPayments } from '@/mocks'
import { StatCard } from '@/components/shared/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCard, DashboardGrid } from '@/components/shared/DashboardHelpers'
import { DataTable } from '@/components/shared/DataTable'
import {
  Building2,
  FileText,
  CreditCard,
  AlertCircle,
  TrendingUp,
  Users,
} from 'lucide-react'
import { formatCurrency, formatDate, getStatusLabel } from '@/lib/utils'

export default function AdminDashboard() {
  // Calculate stats
  const totalProperties = mockProperties.length
  const occupiedProperties = mockProperties.filter((p) => p.status === 'occupied').length
  const vacantProperties = mockProperties.filter((p) => p.status === 'vacant').length
  const maintenanceProperties = mockProperties.filter((p) => p.status === 'maintenance').length

  const totalContracts = mockContracts.length
  const activeContracts = mockContracts.filter((c) => c.status === 'active').length
  const expiredContracts = mockContracts.filter((c) => c.status === 'expired').length

  const totalRevenue = mockProperties.reduce((sum, p) => sum + p.monthlyRent, 0)
  const pendingPayments = mockPayments.filter((p) => p.status === 'pending' || p.status === 'overdue')
  const overduePayments = mockPayments.filter((p) => p.status === 'overdue')
  const paidPaymentsThisMonth = mockPayments.filter((p) => {
    if (!p.paidAt) return false
    const paidDate = new Date(p.paidAt)
    const now = new Date()
    return paidDate.getMonth() === now.getMonth() && paidDate.getFullYear() === now.getFullYear()
  })

  // Table columns
  const contractColumns = [
    { header: 'Imóvel', accessor: 'propertyId', width: 'w-1/3' },
    { header: 'Locatário', accessor: 'tenantId', width: 'w-1/4' },
    { header: 'Aluguel', accessor: 'monthlyRent', cell: (value: number) => formatCurrency(value) },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <Badge
          variant={
            value === 'active'
              ? 'success'
              : value === 'expired'
                ? 'outline'
                : 'destructive'
          }
        >
          {getStatusLabel(value)}
        </Badge>
      ),
    },
  ]

  const paymentColumns = [
    { header: 'Contrato', accessor: 'contractId', width: 'w-1/4' },
    {
      header: 'Vencimento',
      accessor: 'dueDate',
      cell: (value: string) => formatDate(value),
    },
    { header: 'Valor', accessor: 'amount', cell: (value: number) => formatCurrency(value) },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <Badge
          variant={
            value === 'paid'
              ? 'success'
              : value === 'pending'
                ? 'pending'
                : 'destructive'
          }
        >
          {getStatusLabel(value)}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-600 mt-1">Resumo geral do sistema</p>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {overduePayments.length > 0 && (
          <AlertCard
            type="danger"
            title="Pagamentos Vencidos"
            message={`Você tem ${overduePayments.length} pagamento(s) vencido(s) que requerem atenção`}
            icon={<AlertCircle className="w-5 h-5" />}
          />
        )}
        {vacantProperties > 0 && (
          <AlertCard
            type="warning"
            title="Imóveis Disponíveis"
            message={`Você tem ${vacantProperties} imóvel(is) disponível(is) para aluguel`}
            icon={<Building2 className="w-5 h-5" />}
          />
        )}
      </div>

      {/* Stats */}
      <DashboardGrid>
        <StatCard
          title="Total de Imóveis"
          value={totalProperties}
          icon={Building2}
          color="orange"
        />
        <StatCard
          title="Imóveis Ocupados"
          value={occupiedProperties}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Imóveis Disponíveis"
          value={vacantProperties}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Contratos Ativos"
          value={activeContracts}
          icon={FileText}
          color="green"
        />
      </DashboardGrid>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Receita Média Mensal"
          value={formatCurrency(totalRevenue)}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Pagamentos Pendentes"
          value={formatCurrency(pendingPayments.reduce((sum, p) => sum + p.amount, 0))}
          icon={CreditCard}
          color={pendingPayments.length > 0 ? 'red' : 'green'}
        />
        <StatCard
          title="Pagamentos Recebidos (Mês)"
          value={formatCurrency(paidPaymentsThisMonth.reduce((sum, p) => sum + p.amount, 0))}
          icon={CreditCard}
          color="green"
        />
      </div>

      {/* Recent Contracts */}
      <Card>
        <CardHeader>
          <CardTitle>Contratos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={contractColumns} data={mockContracts.slice(0, 5)} />
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={paymentColumns} data={mockPayments.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  )
}