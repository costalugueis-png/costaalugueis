'use client'

import React from 'react'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DataTableProps {
  columns: {
    header: string
    accessor: string
    cell?: (value: any, row: any) => React.ReactNode
    width?: string
  }[]
  data: any[]
  onRowClick?: (row: any) => void
  isLoading?: boolean
}

export function DataTable({
  columns,
  data,
  onRowClick,
  isLoading = false,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = data.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200">
        <div className="space-y-3 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-zinc-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 p-6 text-center">
        <p className="text-zinc-600">Nenhum registro encontrado</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={cn(
                    'px-6 py-3 text-left text-sm font-semibold text-zinc-900',
                    column.width
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-zinc-200',
                  onRowClick && 'hover:bg-zinc-50 cursor-pointer transition-colors'
                )}
              >
                {columns.map((column, colIdx) => {
                  const value = row[column.accessor]
                  const cell = column.cell ? column.cell(value, row) : value

                  return (
                    <td
                      key={colIdx}
                      className={cn('px-6 py-4 text-sm text-zinc-900', column.width)}
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200">
          <p className="text-sm text-zinc-600">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}