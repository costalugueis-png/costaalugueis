import { create } from 'zustand'
import type { AuthContext, AuthUser, Profile } from '@/types/auth'
import { mockTenantUser, mockTenantProfile } from '@/mocks/auth'

interface AuthStore extends AuthContext {
  setUser: (user: AuthUser | null) => void
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: mockTenantUser,
  profile: mockTenantProfile,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, profile: null }),
}))

export const useAuth = () => useAuthStore()