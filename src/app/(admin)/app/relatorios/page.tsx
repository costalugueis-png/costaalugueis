'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Relatórios</h1>
        <p className="text-zinc-600 mt-1">Análise e relatórios do sistema</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-zinc-600">Módulo de relatórios em desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  )
}