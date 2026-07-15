import React from 'react'

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="space-y-4 w-full">
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}