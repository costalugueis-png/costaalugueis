import React from 'react'
import { Search } from 'lucide-react'

interface FilterBarProps {
  search?: string
  onSearchChange?: (value: string) => void
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function FilterBar({
  search,
  onSearchChange,
  filters,
  actions,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        {onSearchChange && (
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        {/* Filters */}
        {filters && <div className="flex gap-2 flex-wrap md:flex-nowrap">{filters}</div>}

        {/* Actions */}
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  )
}