export interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  area: number
  type: 'apartment' | 'house' | 'commercial'
  ownerId: string
  tenantId?: string
  monthlyRent: number
  status: 'vacant' | 'occupied' | 'maintenance'
  createdAt: string
  updatedAt: string
}

export interface PropertyStats {
  total: number
  vacant: number
  occupied: number
  maintenance: number
}