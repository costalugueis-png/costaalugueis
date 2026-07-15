import React from 'react'
import { PortalLayout } from '@/components/layout/PortalLayout'

export const metadata = {
  title: 'Portal - Costa Aluguéis',
  description: 'Portal do locatário',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PortalLayout>{children}</PortalLayout>
}