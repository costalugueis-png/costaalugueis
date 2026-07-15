'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface Profile {
  id: string
  user_id: string
  full_name?: string
  phone?: string
  avatar_url?: string
  role: string
  created_at: string
  updated_at: string
}

interface SettingsFormProps {
  initialProfile?: Profile | null
}

export default function SettingsForm({ initialProfile }: SettingsFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [formData, setFormData] = useState({
    full_name: initialProfile?.full_name || '',
    phone: initialProfile?.phone || '',
  })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error('Sessão expirada')
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user.id)

      if (error) {
        throw error
      }

      setMessage({
        type: 'success',
        text: 'Configurações salvas com sucesso!',
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erro ao salvar configurações',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alert Messages */}
      {message && (
        <Alert className={message.type === 'success' ? 'bg-green-900 border-green-700' : 'bg-red-900 border-red-700'}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <AlertDescription className={message.type === 'success' ? 'text-green-100' : 'text-red-100'}>
              {message.text}
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Personal Information Section */}
      <Card className="bg-slate-700 border-slate-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Informações Pessoais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-slate-300">
              Nome Completo
            </Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">
              Telefone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-500"
            />
          </div>
        </div>
      </Card>

      {/* Account Information Section */}
      <Card className="bg-slate-700 border-slate-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Informações da Conta</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-slate-300 text-sm">Tipo de Usuário</Label>
            <div className="mt-2 px-4 py-3 bg-slate-800 border border-slate-600 rounded-md text-slate-300 capitalize">
              {initialProfile?.role || 'Carregando...'}
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-sm">Membro desde</Label>
            <div className="mt-2 px-4 py-3 bg-slate-800 border border-slate-600 rounded-md text-slate-300">
              {initialProfile?.created_at 
                ? new Date(initialProfile.created_at).toLocaleDateString('pt-BR')
                : 'Carregando...'
              }
            </div>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      </div>
    </form>
  )
}
