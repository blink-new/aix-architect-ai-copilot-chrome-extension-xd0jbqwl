import { useState, useCallback } from 'react'
import type { ScenarioAnalysis, ArchitectureVision, ArchitectureComponent, BusinessCapability } from '../types/architecture'

interface ArchitectureStore {
  scenarios: ScenarioAnalysis[]
  currentVision: ArchitectureVision | null
  components: ArchitectureComponent[]
  capabilities: BusinessCapability[]
}

export function useArchitectureStore() {
  const [store, setStore] = useState<ArchitectureStore>({
    scenarios: [],
    currentVision: null,
    components: [],
    capabilities: []
  })

  const addScenario = useCallback((scenario: ScenarioAnalysis) => {
    setStore(prev => ({
      ...prev,
      scenarios: [...prev.scenarios, scenario],
      currentVision: scenario.vision,
      components: scenario.vision.components,
      capabilities: scenario.vision.capabilities
    }))
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

  return {
    ...store,
    addScenario,
    updateVision,
    addComponent,
    updateComponent,
    addCapability,
    getComponentsByType,
    getCapabilitiesByMaturity
  }
}