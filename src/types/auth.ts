export type UserRole = 'admin' | 'manager' | 'tenant' | 'owner'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  name: string
}

export interface Profile {
  id: string
  userId: string
  role: UserRole
  fullName: string
  phone?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface AuthContext {
  user: AuthUser | null
  profile: Profile | null
  isLoading: boolean
  error: string | null
}