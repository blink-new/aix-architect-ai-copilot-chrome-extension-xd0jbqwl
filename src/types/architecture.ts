export interface ArchitectureComponent {
  id: string
  name: string
  type: 'business' | 'application' | 'data' | 'technology'
  description: string
  maturity: number
  importance: number
  dependencies: string[]
  risks: string[]
  opportunities: string[]
}

export interface BusinessCapability {
  id: string
  name: string
  description: string
  maturity: number
  importance: number
  processes: string[]
  systems: string[]
  gaps: string[]
}

export interface ArchitectureVision {
  id: string
  title: string
  description: string
  objectives: string[]
  stakeholders: string[]
  constraints: string[]
  assumptions: string[]
  components: ArchitectureComponent[]
  capabilities: BusinessCapability[]
  timeline: {
    phase: string
    duration: string
    deliverables: string[]
    status: 'planned' | 'in-progress' | 'completed'
  }[]
}

export interface ScenarioAnalysis {
  id: string
  scenario: string
  framework: string
  analysis: {
    businessArchitecture: {
      capabilities: BusinessCapability[]
      processes: string[]
      stakeholders: string[]
    }
    applicationArchitecture: {
      applications: string[]
      services: string[]
      interfaces: string[]
    }
    dataArchitecture: {
      entities: string[]
      flows: string[]
      governance: string[]
    }
    technologyArchitecture: {
      infrastructure: string[]
      platforms: string[]
      networks: string[]
    }
  }
  recommendations: string[]
  risks: string[]
  opportunities: string[]
  vision: ArchitectureVision
}