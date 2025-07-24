import React from 'react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Map, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  Brain,
  Layers,
  Target,
  FileText
} from 'lucide-react'
import type { Framework, ViewMode } from '../App'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  selectedFramework: Framework
  onFrameworkChange: (framework: Framework) => void
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function Sidebar({ 
  isOpen, 
  onToggle, 
  selectedFramework, 
  onFrameworkChange, 
  currentView, 
  onViewChange 
}: SidebarProps) {
  const navigationItems = [
    { id: 'dashboard' as ViewMode, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'coach' as ViewMode, label: 'Strategy Coach', icon: MessageSquare },
    { id: 'mapper' as ViewMode, label: 'Visual Mapper', icon: Map },
    { id: 'compliance' as ViewMode, label: 'Compliance Radar', icon: Shield },
  ]

  const quickActions = [
    { label: 'Analyze Page', icon: Brain, color: 'bg-blue-500' },
    { label: 'Map Capabilities', icon: Layers, color: 'bg-green-500' },
    { label: 'Check Compliance', icon: Shield, color: 'bg-orange-500' },
    { label: 'Generate Report', icon: FileText, color: 'bg-purple-500' },
  ]

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-50 ${
      isOpen ? 'w-80' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div>
              <h1 className="text-lg font-semibold text-slate-900">AIX-Architect™</h1>
              <p className="text-sm text-slate-500">Enterprise AI Copilot</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="ml-auto"
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Framework Selection */}
      {isOpen && (
        <div className="p-4">
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Active Framework
          </label>
          <Select value={selectedFramework} onValueChange={onFrameworkChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TOGAF">TOGAF ADM</SelectItem>
              <SelectItem value="Zachman">Zachman Framework</SelectItem>
              <SelectItem value="ISO42001">ISO 42001</SelectItem>
              <SelectItem value="Custom">Custom Model</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="mt-2 text-xs">
            {selectedFramework} Active
          </Badge>
        </div>
      )}

      <Separator />

      {/* Navigation */}
      <nav className="p-2">
        {isOpen && (
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide px-2 py-2">
            Navigation
          </p>
        )}
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${!isOpen && 'px-2'}`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {isOpen && <span className="ml-2">{item.label}</span>}
              </Button>
            )
          })}
        </div>
      </nav>

      <Separator />

      {/* Quick Actions */}
      {isOpen && (
        <div className="p-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide px-2 py-2">
            Quick Actions
          </p>
          <div className="space-y-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className={`w-2 h-2 rounded-full ${action.color} mr-2`} />
                  <Icon className="h-3 w-3 mr-2" />
                  {action.label}
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* Status Indicator */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-sm text-green-700">AI Assistant Active</span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Ready to analyze current page
            </p>
          </div>
        </div>
      )}
    </div>
  )
}