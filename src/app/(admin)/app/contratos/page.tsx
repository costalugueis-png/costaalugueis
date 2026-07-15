'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { Modal } from '@/components/shared/Modal'
import { mockContracts, mockProperties } from '@/mocks'
import { Plus, Trash2, Edit } from 'lucide-react'
import { formatCurrency, formatDate, getStatusLabel } from '@/lib/utils'

export default function ContratosPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    propertyId: '',
    tenantId: '',
    startDate: '',
    endDate: '',
    monthlyRent: 0,
    depositAmount: 0,
    status: 'active',
  })

  // Filter data
  const filteredData = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.id.toLowerCase().includes(search.toLowerCase()) ||
      contract.tenantId.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Table columns
  const columns = [
    { header: 'Contrato', accessor: 'id', width: 'w-1/6' },
    { header: 'Imóvel', accessor: 'propertyId', width: 'w-1/4' },
    { header: 'Locatário', accessor: 'tenantId', width: 'w-1/5' },
    {
      header: 'Período',
      accessor: 'startDate',
      cell: (value: string, row: any) => `${formatDate(value)} a ${formatDate(row.endDate)}`,
    },
    {
      header: 'Aluguel',
      accessor: 'monthlyRent',
      cell: (value: number) => formatCurrency(value),
    },
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
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string) => (
        <div className="flex gap-2">
          <button className="p-1 hover:bg-zinc-100 rounded transition-colors">
            <Edit className="w-4 h-4 text-zinc-600" />
          </button>
          <button className="p-1 hover:bg-red-50 rounded transition-colors">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      ),
    },
  ]

  const handleReset = () => {
    setFormData({
      propertyId: '',
      tenantId: '',
      startDate: '',
      endDate: '',
      monthlyRent: 0,
      depositAmount: 0,
      status: 'active',
    })
    setEditingId(null)
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Contratos</h1>
          <p className="text-zinc-600 mt-1">Gestão de contratos de aluguel</p>
        </div>
        <Button
          variant="orange"
          className="flex items-center gap-2"
          onClick={() => {
            handleReset()
            setModalOpen(true)
          }}
        >
          <Plus className="w-4 h-4" />
          Novo Contrato
        </Button>
      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filters={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="expired">Expirado</option>
            <option value="terminated">Encerrado</option>
          </select>
        }
      />

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={filteredData} />
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId ? 'Editar Contrato' : 'Novo Contrato'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.propertyId}
              onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
              className="col-span-2 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Selecione o Imóvel</option>
              {mockProperties.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.address}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="ID do Locatário"
              value={formData.tenantId}
              onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
              className="col-span-2 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Aluguel mensal"
              value={formData.monthlyRent}
              onChange={(e) => setFormData({ ...formData, monthlyRent: parseInt(e.target.value) })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Depósito caução"
              value={formData.depositAmount}
              onChange={(e) => setFormData({ ...formData, depositAmount: parseInt(e.target.value) })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="active">Ativo</option>
              <option value="expired">Expirado</option>
              <option value="terminated">Encerrado</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4 border-t border-zinc-200">
            <Button
              variant="orange"
              className="flex-1"
              onClick={() => {
                handleReset()
              }}
            >
              {editingId ? 'Salvar Alterações' : 'Criar Contrato'}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}