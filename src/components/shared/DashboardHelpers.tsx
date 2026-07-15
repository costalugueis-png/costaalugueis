import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface DashboardGridProps {
  children: React.ReactNode
}

export function DashboardGrid({ children }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  )
}

interface AlertCardProps {
  title: string
  message: string
  type: 'info' | 'warning' | 'danger' | 'success'
  icon?: React.ReactNode
}

const alertStyles = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  danger: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
}

export function AlertCard({
  title,
  message,
  type,
  icon,
}: AlertCardProps) {
  return (
    <Card className={`border-2 ${alertStyles[type]}`}>
      <CardContent className="p-4 flex gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-sm opacity-90 mt-1">{message}</p>
        </div>
      </CardContent>
    </Card>
  )
}