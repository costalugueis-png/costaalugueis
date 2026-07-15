'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { Modal } from '@/components/shared/Modal'
import { mockPayments, mockContracts } from '@/mocks'
import { Plus, Trash2, Edit, Eye } from 'lucide-react'
import { formatCurrency, formatDate, getStatusLabel } from '@/lib/utils'

export default function PagamentosPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [formData, setFormData] = useState({
    contractId: '',
    dueDate: '',
    amount: 0,
    status: 'pending',
  })

  // Filter data
  const filteredData = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.contractId.toLowerCase().includes(search.toLowerCase()) ||
      payment.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Table columns
  const columns = [
    { header: 'Contrato', accessor: 'contractId', width: 'w-1/6' },
    {
      header: 'Vencimento',
      accessor: 'dueDate',
      cell: (value: string) => formatDate(value),
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number) => formatCurrency(value),
    },
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
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string, row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedPayment(row)
              setDetailsOpen(true)
            }}
            className="p-1 hover:bg-blue-50 rounded transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </button>
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
      contractId: '',
      dueDate: '',
      amount: 0,
      status: 'pending',
    })
    setEditingId(null)
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Pagamentos</h1>
          <p className="text-zinc-600 mt-1">Gestão de pagamentos</p>
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
          Novo Pagamento
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
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="overdue">Vencido</option>
          </select>
        }
      />

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={filteredData} />
        </CardContent>
      </Card>

      {/* Modal - Novo/Editar */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId ? 'Editar Pagamento' : 'Novo Pagamento'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.contractId}
              onChange={(e) => setFormData({ ...formData, contractId: e.target.value })}
              className="col-span-2 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Selecione o Contrato</option>
              {mockContracts.map((contract) => (
                <option key={contract.id} value={contract.id}>
                  {contract.id} - {contract.tenantId}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Valor"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="col-span-2 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
              <option value="overdue">Vencido</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4 border-t border-zinc-200">
            <Button
              variant="orange"
              className="flex-1"
              onClick={() => handleReset()}
            >
              {editingId ? 'Salvar Alterações' : 'Criar Pagamento'}
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

      {/* Modal - Detalhes */}
      <Modal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="Detalhes do Pagamento"
      >
        {selectedPayment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-600 mb-1">Contrato</p>
                <p className="font-semibold text-zinc-900">{selectedPayment.contractId}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-1">Valor</p>
                <p className="font-semibold text-zinc-900">{formatCurrency(selectedPayment.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-1">Vencimento</p>
                <p className="font-semibold text-zinc-900">{formatDate(selectedPayment.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-600 mb-1">Status</p>
                <Badge
                  variant={
                    selectedPayment.status === 'paid'
                      ? 'success'
                      : selectedPayment.status === 'pending'
                        ? 'pending'
                        : 'destructive'
                  }
                >
                  {getStatusLabel(selectedPayment.status)}
                </Badge>
              </div>
            </div>
            {selectedPayment.paidAt && (
              <div>
                <p className="text-sm text-zinc-600 mb-1">Data de Pagamento</p>
                <p className="font-semibold text-zinc-900">{formatDate(selectedPayment.paidAt)}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}