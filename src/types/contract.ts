export interface Contract {
  id: string
  propertyId: string
  tenantId: string
  ownerId: string
  startDate: string
  endDate: string
  monthlyRent: number
  depositAmount: number
  status: 'active' | 'expired' | 'terminated'
  createdAt: string
  updatedAt: string
}