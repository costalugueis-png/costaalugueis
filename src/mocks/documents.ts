import type { Document } from '@/types/document'

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    contractId: 'contract-1',
    name: 'Contrato de Locação - Junho 2024',
    type: 'contract',
    url: '/documents/contract-1.pdf',
    uploadedAt: '2024-06-01T10:00:00Z',
    uploadedBy: 'admin-1',
  },
  {
    id: 'doc-2',
    contractId: 'contract-1',
    name: 'Recibo de Depósito Caução',
    type: 'receipt',
    url: '/documents/deposit-1.pdf',
    uploadedAt: '2024-06-01T10:15:00Z',
    uploadedBy: 'admin-1',
  },
  {
    id: 'doc-3',
    contractId: 'contract-1',
    name: 'Fatura Junho 2024',
    type: 'invoice',
    url: '/documents/invoice-1.pdf',
    uploadedAt: '2024-06-05T09:00:00Z',
    uploadedBy: 'manager-1',
  },
  {
    id: 'doc-4',
    contractId: 'contract-1',
    name: 'Fatura Julho 2024',
    type: 'invoice',
    url: '/documents/invoice-2.pdf',
    uploadedAt: '2024-07-05T09:00:00Z',
    uploadedBy: 'manager-1',
  },
]