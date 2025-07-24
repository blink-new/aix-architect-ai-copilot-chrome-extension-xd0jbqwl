import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Scan,
  TrendingUp,
  AlertCircle as AlertIcon
} from 'lucide-react'
import type { Framework } from '../App'

interface ComplianceRadarProps {
  framework: Framework
}

interface ComplianceCheck {
  id: string
  category: string
  requirement: string
  status: 'compliant' | 'partial' | 'non-compliant' | 'unknown'
  score: number
  description: string
  recommendation?: string
}

export function ComplianceRadar({ framework }: ComplianceRadarProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [lastScan, setLastScan] = useState(new Date())

  const complianceData = {
    TOGAF: [
      {
        id: '1',
        category: 'Architecture Governance',
        requirement: 'Architecture Board Establishment',
        status: 'compliant' as const,
        score: 95,
        description: 'Architecture governance structure is well-defined',
        recommendation: 'Continue regular governance reviews'
      },
      {
        id: '2',
        category: 'ADM Process',
        requirement: 'Stakeholder Management',
        status: 'partial' as const,
        score: 70,
        description: 'Some stakeholder groups not fully engaged',
        recommendation: 'Expand stakeholder analysis in Phase A'
      },
      {
        id: '3',
        category: 'Architecture Repository',
        requirement: 'Standards Information Base',
        status: 'non-compliant' as const,
        score: 45,
        description: 'Standards repository incomplete',
        recommendation: 'Establish comprehensive standards catalog'
      }
    ],
    ISO42001: [
      {
        id: '4',
        category: 'AI Governance',
        requirement: 'AI Management System',
        status: 'partial' as const,
        score: 65,
        description: 'Basic AI governance framework in place',
        recommendation: 'Enhance AI risk assessment procedures'
      },
      {
        id: '5',
        category: 'Risk Management',
        requirement: 'AI Risk Assessment',
        status: 'compliant' as const,
        score: 88,
        description: 'Comprehensive AI risk framework established',
        recommendation: 'Regular risk assessment updates needed'
      },
      {
        id: '6',
        category: 'Documentation',
        requirement: 'AI System Documentation',
        status: 'non-compliant' as const,
        score: 35,
        description: 'AI system documentation insufficient',
        recommendation: 'Implement systematic AI documentation process'
      }
    ]
  }

  const currentChecks = framework === 'TOGAF' ? complianceData.TOGAF : 
                       framework === 'ISO42001' ? complianceData.ISO42001 : 
                       complianceData.TOGAF

  const overallScore = Math.round(currentChecks.reduce((sum, check) => sum + check.score, 0) / currentChecks.length)

  const runComplianceScan = async () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setLastScan(new Date())
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'non-compliant':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'non-compliant':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200'
    }
  }

  const riskLevels = [
    { level: 'Critical', count: 1, color: 'bg-red-500' },
    { level: 'High', count: 2, color: 'bg-orange-500' },
    { level: 'Medium', count: 3, color: 'bg-yellow-500' },
    { level: 'Low', count: 5, color: 'bg-green-500' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Compliance Radar</h1>
          <p className="text-slate-600">Real-time governance and compliance monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Shield className="h-3 w-3 mr-1" />
            {framework} Compliance
          </Badge>
          <Button 
            onClick={runComplianceScan}
            disabled={isScanning}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Scan className="h-4 w-4 mr-2" />
            {isScanning ? 'Scanning...' : 'Run Scan'}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Overall Score</p>
                <p className="text-2xl font-bold text-slate-900">{overallScore}%</p>
              </div>
              <div className={`p-2 rounded-lg ${overallScore >= 80 ? 'bg-green-100' : overallScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <TrendingUp className={`h-6 w-6 ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Compliant</p>
                <p className="text-2xl font-bold text-green-600">
                  {currentChecks.filter(c => c.status === 'compliant').length}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Partial</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {currentChecks.filter(c => c.status === 'partial').length}
                </p>
              </div>
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Non-Compliant</p>
                <p className="text-2xl font-bold text-red-600">
                  {currentChecks.filter(c => c.status === 'non-compliant').length}
                </p>
              </div>
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requirements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-4">
          <div className="space-y-4">
            {currentChecks.map((check) => (
              <Card key={check.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(check.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-slate-900">{check.requirement}</h3>
                          <Badge className={getStatusColor(check.status)}>
                            {check.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{check.category}</p>
                        <p className="text-sm text-slate-700 mb-3">{check.description}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Compliance Score</span>
                              <span>{check.score}%</span>
                            </div>
                            <Progress value={check.score} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertIcon className="h-5 w-5 mr-2" />
                  Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskLevels.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                      <span className="text-sm font-medium">{risk.level}</span>
                    </div>
                    <Badge variant="secondary">{risk.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Scan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Last Scan</span>
                  <span className="text-sm font-medium">{lastScan.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Framework</span>
                  <span className="text-sm font-medium">{framework}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Checks Run</span>
                  <span className="text-sm font-medium">{currentChecks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {currentChecks
              .filter(check => check.recommendation)
              .map((check) => (
                <Card key={check.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        check.status === 'non-compliant' ? 'bg-red-100' :
                        check.status === 'partial' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <FileText className={`h-4 w-4 ${
                          check.status === 'non-compliant' ? 'text-red-600' :
                          check.status === 'partial' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 mb-1">{check.requirement}</h3>
                        <p className="text-sm text-slate-700 mb-2">{check.recommendation}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {check.category}
                          </Badge>
                          <Badge 
                            variant={check.status === 'non-compliant' ? 'destructive' : 'default'}
                            className="text-xs"
                          >
                            Priority: {check.status === 'non-compliant' ? 'High' : 'Medium'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}