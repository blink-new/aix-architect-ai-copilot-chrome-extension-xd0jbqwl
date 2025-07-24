import { useContext } from 'react'
import { ArchitectureContext, type ArchitectureContextType } from '../contexts/ArchitectureContext'

export function useArchitectureStore(): ArchitectureContextType {
  const context = useContext(ArchitectureContext)
  if (context === undefined) {
    throw new Error('useArchitectureStore must be used within an ArchitectureProvider')
  }
  return context
}