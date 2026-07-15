'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Usuários</h1>
        <p className="text-zinc-600 mt-1">Gestão de usuários do sistema</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-zinc-600">Módulo de usuários em desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  )
}