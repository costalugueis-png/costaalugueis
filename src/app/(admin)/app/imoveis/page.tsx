'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { Modal } from '@/components/shared/Modal'
import { mockProperties } from '@/mocks'
import { Plus, Trash2, Edit } from 'lucide-react'
import { formatCurrency, getStatusLabel } from '@/lib/utils'

export default function ImoveisPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    type: 'apartment',
    monthlyRent: 0,
    status: 'vacant',
  })

  // Filter data
  const filteredData = mockProperties.filter((property) => {
    const matchesSearch =
      property.address.toLowerCase().includes(search.toLowerCase()) ||
      property.city.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Table columns
  const columns = [
    { header: 'Endereço', accessor: 'address', width: 'w-1/4' },
    { header: 'Cidade', accessor: 'city' },
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
            value === 'occupied'
              ? 'success'
              : value === 'vacant'
                ? 'outline'
                : 'warning'
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
      address: '',
      city: '',
      state: '',
      zipCode: '',
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      type: 'apartment',
      monthlyRent: 0,
      status: 'vacant',
    })
    setEditingId(null)
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Imóveis</h1>
          <p className="text-zinc-600 mt-1">Gestão de propriedades</p>
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
          Novo Imóvel
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
            <option value="occupied">Ocupado</option>
            <option value="vacant">Disponível</option>
            <option value="maintenance">Manutenção</option>
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
        title={editingId ? 'Editar Imóvel' : 'Novo Imóvel'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Endereço"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="col-span-2 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Cidade"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Estado"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Quartos"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Banheiros"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Área (m²)"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Aluguel mensal"
              value={formData.monthlyRent}
              onChange={(e) => setFormData({ ...formData, monthlyRent: parseInt(e.target.value) })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="vacant">Disponível</option>
              <option value="occupied">Ocupado</option>
              <option value="maintenance">Manutenção</option>
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
              {editingId ? 'Salvar Alterações' : 'Criar Imóvel'}
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