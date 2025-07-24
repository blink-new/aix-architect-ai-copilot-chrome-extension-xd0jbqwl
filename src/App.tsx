import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { MainDashboard } from './components/MainDashboard'
import { StrategyCoach } from './components/StrategyCoach'
import { VisualMapper } from './components/VisualMapper'
import { ComplianceRadar } from './components/ComplianceRadar'
import { Toaster } from './components/ui/toaster'
import './App.css'

export type Framework = 'TOGAF' | 'Zachman' | 'ISO42001' | 'Custom'
export type ViewMode = 'dashboard' | 'coach' | 'mapper' | 'compliance'

function App() {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('TOGAF')
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderCurrentView = () => {
    switch (currentView) {
      case 'coach':
        return <StrategyCoach framework={selectedFramework} />
      case 'mapper':
        return <VisualMapper framework={selectedFramework} />
      case 'compliance':
        return <ComplianceRadar framework={selectedFramework} />
      default:
        return <MainDashboard framework={selectedFramework} />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedFramework={selectedFramework}
        onFrameworkChange={setSelectedFramework}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-16'}`}>
        <div className="h-full overflow-auto">
          {renderCurrentView()}
        </div>
      </main>
      
      <Toaster />
    </div>
  )
}

export default App