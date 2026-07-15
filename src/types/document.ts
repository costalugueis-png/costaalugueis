export interface Document {
  id: string
  contractId: string
  name: string
  type: 'contract' | 'invoice' | 'receipt' | 'other'
  url: string
  uploadedAt: string
  uploadedBy: string
}