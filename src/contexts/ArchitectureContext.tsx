import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { ScenarioAnalysis, ArchitectureVision, ArchitectureComponent, BusinessCapability } from '../types/architecture'

interface ArchitectureStore {
  scenarios: ScenarioAnalysis[]
  currentVision: ArchitectureVision | null
  components: ArchitectureComponent[]
  capabilities: BusinessCapability[]
}

interface ArchitectureContextType extends ArchitectureStore {
  addScenario: (scenario: ScenarioAnalysis) => void
  updateVision: (vision: ArchitectureVision) => void
  addComponent: (component: ArchitectureComponent) => void
  updateComponent: (id: string, updates: Partial<ArchitectureComponent>) => void
  addCapability: (capability: BusinessCapability) => void
  getComponentsByType: (type: ArchitectureComponent['type']) => ArchitectureComponent[]
  getCapabilitiesByMaturity: (minMaturity: number) => BusinessCapability[]
  clearData: () => void
}

const ArchitectureContext = createContext<ArchitectureContextType | undefined>(undefined)

export function ArchitectureProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<ArchitectureStore>({
    scenarios: [],
    currentVision: null,
    components: [],
    capabilities: []
  })

  const addScenario = useCallback((scenario: ScenarioAnalysis) => {
    console.log('ArchitectureProvider: Adding scenario', {
      scenarioId: scenario.id,
      componentsCount: scenario.vision.components.length,
      capabilitiesCount: scenario.vision.capabilities.length
    })
    
    setStore(prev => {
      const newStore = {
        ...prev,
        scenarios: [...prev.scenarios, scenario],
        currentVision: scenario.vision,
        components: scenario.vision.components,
        capabilities: scenario.vision.capabilities
      }
      
      console.log('ArchitectureProvider: Store updated', {
        scenarios: newStore.scenarios.length,
        components: newStore.components.length,
        capabilities: newStore.capabilities.length
      })
      
      return newStore
    })
  }, [])

  const updateVision = useCallback((vision: ArchitectureVision) => {
    setStore(prev => ({
      ...prev,
      currentVision: vision,
      components: vision.components,
      capabilities: vision.capabilities
    }))
  }, [])

  const addComponent = useCallback((component: ArchitectureComponent) => {
    setStore(prev => ({
      ...prev,
      components: [...prev.components, component]
    }))
  }, [])

  const updateComponent = useCallback((id: string, updates: Partial<ArchitectureComponent>) => {
    setStore(prev => ({
      ...prev,
      components: prev.components.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      )
    }))
  }, [])

  const addCapability = useCallback((capability: BusinessCapability) => {
    setStore(prev => ({
      ...prev,
      capabilities: [...prev.capabilities, capability]
    }))
  }, [])

  const getComponentsByType = useCallback((type: ArchitectureComponent['type']) => {
    return store.components.filter(comp => comp.type === type)
  }, [store.components])

  const getCapabilitiesByMaturity = useCallback((minMaturity: number) => {
    return store.capabilities.filter(cap => cap.maturity >= minMaturity)
  }, [store.capabilities])

  const clearData = useCallback(() => {
    setStore({
      scenarios: [],
      currentVision: null,
      components: [],
      capabilities: []
    })
  }, [])

  const value: ArchitectureContextType = {
    ...store,
    addScenario,
    updateVision,
    addComponent,
    updateComponent,
    addCapability,
    getComponentsByType,
    getCapabilitiesByMaturity,
    clearData
  }

  return (
    <ArchitectureContext.Provider value={value}>
      {children}
    </ArchitectureContext.Provider>
  )
}

export { ArchitectureContext }
export type { ArchitectureContextType }