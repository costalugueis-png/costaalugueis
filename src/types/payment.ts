export interface PaymentInstallment {
  id: string
  contractId: string
  dueDate: string
  amount: number
  status: 'pending' | 'paid' | 'overdue'
  paidAt?: string
  createdAt: string
  updatedAt: string
}