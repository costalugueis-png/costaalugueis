import type { AuthUser, Profile } from '@/types/auth'

export const mockAdminUser: AuthUser = {
  id: 'admin-1',
  email: 'admin@costaalugueis.com',
  role: 'admin',
  name: 'Admin Sistema',
}

export const mockAdminProfile: Profile = {
  id: 'profile-admin-1',
  userId: 'admin-1',
  role: 'admin',
  fullName: 'Administrador Sistema',
  phone: '(11) 98765-4321',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

export const mockManagerUser: AuthUser = {
  id: 'manager-1',
  email: 'manager@costaalugueis.com',
  role: 'manager',
  name: 'Gerenciador',
}

export const mockManagerProfile: Profile = {
  id: 'profile-manager-1',
  userId: 'manager-1',
  role: 'manager',
  fullName: 'João Gerenciador',
  phone: '(11) 98765-4322',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

export const mockTenantUser: AuthUser = {
  id: 'tenant-1',
  email: 'tenant@example.com',
  role: 'tenant',
  name: 'João Locatário',
}

export const mockTenantProfile: Profile = {
  id: 'profile-tenant-1',
  userId: 'tenant-1',
  role: 'tenant',
  fullName: 'João Silva Locatário',
  phone: '(11) 99999-8888',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tenant',
  createdAt: '2024-06-01T00:00:00Z',
  updatedAt: '2024-06-01T00:00:00Z',
}

export const mockOwnerUser: AuthUser = {
  id: 'owner-1',
  email: 'owner@example.com',
  role: 'owner',
  name: 'Maria Proprietária',
}

export const mockOwnerProfile: Profile = {
  id: 'profile-owner-1',
  userId: 'owner-1',
  role: 'owner',
  fullName: 'Maria Santos Proprietária',
  phone: '(11) 97777-5555',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=owner',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}