import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Map, 
  Download, 
  Layers, 
  BarChart3, 
  Network, 
  Calendar,
  Zap,
  Eye,
  Settings,
  Building,
  Database,
  Server,
  Users
} from 'lucide-react'
import type { Framework } from '../App'
import type { ArchitectureVision, ArchitectureComponent, BusinessCapability } from '../types/architecture'

interface VisualMapperProps {
  framework: Framework
  architectureData?: ArchitectureVision | null
  components?: ArchitectureComponent[]
  capabilities?: BusinessCapability[]
}

export function VisualMapper({ framework, architectureData, components = [], capabilities = [] }: VisualMapperProps) {
  const [selectedVisualization, setSelectedVisualization] = useState('heatmap')
  const [isGenerating, setIsGenerating] = useState(false)

  const hasData = architectureData && (components.length > 0 || capabilities.length > 0)
  
  // Debug logging
  console.log('VisualMapper received:', { 
    architectureData, 
    components: components.length, 
    capabilities: capabilities.length,
    hasData,
    componentsData: components,
    capabilitiesData: capabilities
  })

  // Force show data if we have any components or capabilities
  const shouldShowData = components.length > 0 || capabilities.length > 0

  const visualizationTypes = [
    { id: 'heatmap', label: 'Capability Heatmap', icon: BarChart3 },
    { id: 'architecture', label: 'Architecture Layers', icon: Layers },
    { id: 'network', label: 'Dependency Network', icon: Network },
    { id: 'roadmap', label: 'Strategic Roadmap', icon: Calendar }
  ]

  const generateVisualization = async () => {
    setIsGenerating(true)
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  const exportOptions = [
    { format: 'PowerPoint', extension: 'pptx' },
    { format: 'PDF', extension: 'pdf' },
    { format: 'ArchiMate', extension: 'archimate' },
    { format: 'Visio', extension: 'vsdx' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Visual Mapper</h1>
          <p className="text-slate-600">AI-powered architecture visualization and diagramming</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Map className="h-3 w-3 mr-1" />
            {framework} Mapping
          </Badge>
          <Button 
            onClick={generateVisualization}
            disabled={isGenerating}
            className="bg-green-600 hover:bg-green-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Visual'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Controls Panel */}
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Visualization Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Visualization Type
                </label>
                <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visualizationTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Framework Focus
                </label>
                <Select value={framework}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TOGAF">TOGAF ADM</SelectItem>
                    <SelectItem value="Zachman">Zachman Framework</SelectItem>
                    <SelectItem value="ISO42001">ISO 42001</SelectItem>
                    <SelectItem value="Custom">Custom Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Quick Actions</label>
                {visualizationTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <Button
                      key={type.id}
                      variant={selectedVisualization === type.id ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedVisualization(type.id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {type.label}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {exportOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export to {option.format}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Canvas */}
        <div className="col-span-9">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  {visualizationTypes.find(v => v.id === selectedVisualization)?.label}
                </CardTitle>
                <Badge variant="secondary">
                  {framework} Framework
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="h-full bg-slate-50 rounded-lg m-6 relative overflow-hidden">
                {isGenerating ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                      <p className="text-slate-600">Generating {visualizationTypes.find(v => v.id === selectedVisualization)?.label}...</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 h-full">
                    {selectedVisualization === 'heatmap' && (
                      <CapabilityHeatmap capabilities={capabilities} shouldShowData={shouldShowData} />
                    )}
                    {selectedVisualization === 'architecture' && (
                      <ArchitectureLayers components={components} framework={framework} shouldShowData={shouldShowData} />
                    )}
                    {selectedVisualization === 'network' && (
                      <DependencyNetwork components={components} shouldShowData={shouldShowData} />
                    )}
                    {selectedVisualization === 'roadmap' && (
                      <StrategicRoadmap architectureData={architectureData} shouldShowData={shouldShowData} />
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CapabilityHeatmap({ capabilities, shouldShowData }: { capabilities: BusinessCapability[], shouldShowData: boolean }) {
  console.log('CapabilityHeatmap render:', { capabilities: capabilities.length, shouldShowData })
  
  if (!shouldShowData || capabilities.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Business Capability Heatmap</h3>
        <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <div className="text-center text-slate-500">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No Capability Data Available</p>
            <p className="text-sm">Use the Strategy Coach to analyze a scenario and generate capability models</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Business Capability Heatmap</h3>
      <div className="grid grid-cols-3 gap-4">
        {capabilities.map((cap, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${
              cap.maturity >= 80 ? 'bg-green-100 border-green-300' :
              cap.maturity >= 60 ? 'bg-yellow-100 border-yellow-300' :
              'bg-red-100 border-red-300'
            }`}
          >
            <h4 className="font-medium text-slate-900 mb-2">{cap.name}</h4>
            <p className="text-xs text-slate-600 mb-3">{cap.description}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Maturity</span>
                <span>{cap.maturity}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    cap.maturity >= 80 ? 'bg-green-500' :
                    cap.maturity >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${cap.maturity}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Importance</span>
                <span>{cap.importance}%</span>
              </div>
              {cap.gaps && cap.gaps.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-red-700">Key Gaps:</p>
                  <p className="text-xs text-red-600">{cap.gaps.slice(0, 2).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArchitectureLayers({ components, framework, shouldShowData }: { 
  components: ArchitectureComponent[], 
  framework: Framework, 
  shouldShowData: boolean 
}) {
  console.log('ArchitectureLayers render:', { components: components.length, shouldShowData })
  
  if (!shouldShowData || components.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{framework} Architecture Layers</h3>
        <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <div className="text-center text-slate-500">
            <Layers className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No Architecture Components Available</p>
            <p className="text-sm">Use the Strategy Coach to analyze a scenario and generate architecture layers</p>
          </div>
        </div>
      </div>
    )
  }

  const layerIcons = {
    business: Building,
    application: Server,
    data: Database,
    technology: Network
  }

  const layerColors = {
    business: 'border-green-200 bg-green-50',
    application: 'border-blue-200 bg-blue-50',
    data: 'border-purple-200 bg-purple-50',
    technology: 'border-orange-200 bg-orange-50'
  }

  const layerNames = {
    business: 'Business Architecture',
    application: 'Application Architecture', 
    data: 'Data Architecture',
    technology: 'Technology Architecture'
  }

  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.type]) {
      acc[component.type] = []
    }
    acc[component.type].push(component)
    return acc
  }, {} as Record<string, ArchitectureComponent[]>)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{framework} Architecture Layers</h3>
      <div className="space-y-3">
        {Object.entries(groupedComponents).map(([layerType, layerComponents]) => {
          const Icon = layerIcons[layerType as keyof typeof layerIcons] || Building
          return (
            <div key={layerType} className={`rounded-lg border-2 p-4 ${layerColors[layerType as keyof typeof layerColors]}`}>
              <div className="flex items-center mb-3">
                <Icon className="h-5 w-5 mr-2 text-slate-700" />
                <h4 className="font-medium text-slate-900">{layerNames[layerType as keyof typeof layerNames]}</h4>
                <Badge variant="secondary" className="ml-2">{layerComponents.length}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {layerComponents.map((component, compIndex) => (
                  <div key={compIndex} className="bg-white rounded p-2 border">
                    <p className="text-sm font-medium text-slate-900">{component.name}</p>
                    <p className="text-xs text-slate-600 mt-1">{component.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">Maturity: {component.maturity}%</span>
                      <span className="text-xs text-slate-500">Priority: {component.importance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DependencyNetwork({ components, shouldShowData }: { components: ArchitectureComponent[], shouldShowData: boolean }) {
  console.log('DependencyNetwork render:', { components: components.length, shouldShowData })
  
  if (!shouldShowData || components.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">System Dependency Network</h3>
        <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <div className="text-center text-slate-500">
            <Network className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No Dependency Data Available</p>
            <p className="text-sm">Use the Strategy Coach to analyze a scenario and generate component dependencies</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">System Dependency Network</h3>
      <div className="bg-white rounded-lg border-2 border-slate-200 p-6">
        <div className="grid grid-cols-4 gap-4">
          {components.slice(0, 12).map((component, index) => (
            <div key={index} className="relative">
              <div className={`p-3 rounded-lg border-2 text-center ${
                component.type === 'business' ? 'bg-green-50 border-green-200' :
                component.type === 'application' ? 'bg-blue-50 border-blue-200' :
                component.type === 'data' ? 'bg-purple-50 border-purple-200' :
                'bg-orange-50 border-orange-200'
              }`}>
                <p className="text-xs font-medium text-slate-900">{component.name}</p>
                <p className="text-xs text-slate-600 mt-1">{component.type}</p>
                {component.dependencies.length > 0 && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    {component.dependencies.length} deps
                  </Badge>
                )}
              </div>
              {/* Connection lines would be drawn here in a real implementation */}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-slate-500">
          <p className="text-sm">Interactive dependency visualization</p>
          <p className="text-xs">Showing {Math.min(components.length, 12)} of {components.length} components</p>
        </div>
      </div>
    </div>
  )
}

function StrategicRoadmap({ architectureData, shouldShowData }: { 
  architectureData?: ArchitectureVision | null, 
  shouldShowData: boolean 
}) {
  console.log('StrategicRoadmap render:', { 
    hasArchitectureData: !!architectureData, 
    timelineLength: architectureData?.timeline?.length || 0, 
    shouldShowData 
  })
  
  if (!shouldShowData || !architectureData?.timeline || architectureData.timeline.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Strategic Implementation Roadmap</h3>
        <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <div className="text-center text-slate-500">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No Roadmap Data Available</p>
            <p className="text-sm">Use the Strategy Coach to analyze a scenario and generate implementation timeline</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Strategic Implementation Roadmap</h3>
      {architectureData.title && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-blue-900">{architectureData.title}</h4>
          <p className="text-sm text-blue-700 mt-1">{architectureData.description}</p>
          {architectureData.objectives.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-blue-800">Key Objectives:</p>
              <ul className="text-xs text-blue-700 mt-1">
                {architectureData.objectives.slice(0, 3).map((objective, index) => (
                  <li key={index}>• {objective}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="space-y-3">
        {architectureData.timeline.map((phase, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${
              phase.status === 'completed' ? 'bg-green-500' :
              phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-300'
            }`}></div>
            <div className="flex-1 bg-white rounded-lg border p-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-slate-900">{phase.phase}</h4>
                <Badge 
                  variant={phase.status === 'completed' ? 'default' : 'secondary'}
                  className={
                    phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                    phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-600'
                  }
                >
                  {phase.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mt-1">{phase.duration}</p>
              {phase.deliverables.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-slate-700">Key Deliverables:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {phase.deliverables.slice(0, 4).map((deliverable, delIndex) => (
                      <Badge key={delIndex} variant="outline" className="text-xs">
                        {deliverable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}