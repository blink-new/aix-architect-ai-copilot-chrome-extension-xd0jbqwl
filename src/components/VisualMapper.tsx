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
  Settings
} from 'lucide-react'
import type { Framework } from '../App'

interface VisualMapperProps {
  framework: Framework
}

export function VisualMapper({ framework }: VisualMapperProps) {
  const [selectedVisualization, setSelectedVisualization] = useState('heatmap')
  const [isGenerating, setIsGenerating] = useState(false)

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
                    {selectedVisualization === 'heatmap' && <CapabilityHeatmap />}
                    {selectedVisualization === 'architecture' && <ArchitectureLayers />}
                    {selectedVisualization === 'network' && <DependencyNetwork />}
                    {selectedVisualization === 'roadmap' && <StrategicRoadmap />}
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

function CapabilityHeatmap() {
  const capabilities = [
    { name: 'Customer Management', maturity: 85, importance: 90 },
    { name: 'Product Development', maturity: 70, importance: 95 },
    { name: 'Supply Chain', maturity: 60, importance: 80 },
    { name: 'Digital Marketing', maturity: 90, importance: 85 },
    { name: 'Data Analytics', maturity: 45, importance: 95 },
    { name: 'Cybersecurity', maturity: 75, importance: 100 }
  ]

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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArchitectureLayers() {
  const layers = [
    { name: 'Business Architecture', components: ['Processes', 'Capabilities', 'Organization'] },
    { name: 'Application Architecture', components: ['Applications', 'Services', 'Interfaces'] },
    { name: 'Data Architecture', components: ['Data Models', 'Data Flow', 'Data Governance'] },
    { name: 'Technology Architecture', components: ['Infrastructure', 'Platforms', 'Networks'] }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">TOGAF Architecture Layers</h3>
      <div className="space-y-3">
        {layers.map((layer, index) => (
          <div key={index} className="bg-white rounded-lg border-2 border-blue-200 p-4">
            <h4 className="font-medium text-blue-900 mb-3">{layer.name}</h4>
            <div className="flex space-x-2">
              {layer.components.map((component, compIndex) => (
                <Badge key={compIndex} variant="secondary" className="bg-blue-50 text-blue-700">
                  {component}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DependencyNetwork() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">System Dependency Network</h3>
      <div className="relative h-80 bg-white rounded-lg border-2 border-slate-200 p-4">
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="text-center text-slate-500">
            <Network className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p>Interactive dependency visualization</p>
            <p className="text-sm">Shows relationships between systems and components</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StrategicRoadmap() {
  const phases = [
    { name: 'Phase 1: Foundation', duration: 'Q1-Q2 2024', status: 'completed' },
    { name: 'Phase 2: Transformation', duration: 'Q3-Q4 2024', status: 'in-progress' },
    { name: 'Phase 3: Optimization', duration: 'Q1-Q2 2025', status: 'planned' },
    { name: 'Phase 4: Innovation', duration: 'Q3-Q4 2025', status: 'planned' }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Strategic Implementation Roadmap</h3>
      <div className="space-y-3">
        {phases.map((phase, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${
              phase.status === 'completed' ? 'bg-green-500' :
              phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-300'
            }`}></div>
            <div className="flex-1 bg-white rounded-lg border p-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-slate-900">{phase.name}</h4>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}