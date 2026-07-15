'use client'

import React from 'react'
import { useAuth } from '@/lib/auth-context'
import { mockContracts, mockDocuments } from '@/mocks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/shared/EmptyState'
import { FileText, Download } from 'lucide-react'

const documentTypeIcons: Record<string, React.ReactNode> = {
  contract: <FileText className="w-4 h-4" />,
  invoice: <FileText className="w-4 h-4" />,
  receipt: <FileText className="w-4 h-4" />,
  other: <FileText className="w-4 h-4" />,
}

const documentTypeLabels: Record<string, string> = {
  contract: 'Contrato',
  invoice: 'Fatura',
  receipt: 'Recibo',
  other: 'Outro',
}

export default function Documentos() {
  const { profile } = useAuth()
  const contract = mockContracts.find((c) => c.tenantId === profile?.userId)
  const documents = contract
    ? mockDocuments.filter((d) => d.contractId === contract.id)
    : []

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Nenhum documento disponível"
        description="Você não possui documentos disponíveis no momento"
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Documentos</h1>
        <p className="text-zinc-600 mt-1">Documentos e comprovantes disponíveis</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meus Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((document) => {
              const uploadDate = new Date(document.uploadedAt)
              const formattedDate = uploadDate.toLocaleDateString('pt-BR')

              return (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                      {documentTypeIcons[document.type]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900">{document.name}</p>
                      <p className="text-xs text-zinc-600">
                        {documentTypeLabels[document.type]} • {formattedDate}
                      </p>
                    </div>
                  </div>
                  <a
                    href={document.url}
                    download
                    className="p-2 rounded-lg text-zinc-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    title="Baixar documento"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}