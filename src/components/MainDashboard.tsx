import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Brain, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  FileText,
  Zap,
  Globe
} from 'lucide-react'
import type { Framework } from '../App'

interface MainDashboardProps {
  framework: Framework
}

export function MainDashboard({ framework }: MainDashboardProps) {
  const [analysisResults] = useState({
    currentPage: 'Enterprise Architecture Best Practices - TOGAF Guide',
    confidence: 92,
    mappedComponents: 8,
    complianceScore: 85,
    riskLevel: 'Medium'
  })

  const frameworkMappings = [
    {
      component: 'Architecture Vision',
      layer: 'Business Architecture',
      confidence: 95,
      status: 'mapped'
    },
    {
      component: 'Business Architecture',
      layer: 'Application Architecture', 
      confidence: 88,
      status: 'mapped'
    },
    {
      component: 'Information Systems',
      layer: 'Data Architecture',
      confidence: 76,
      status: 'partial'
    },
    {
      component: 'Technology Architecture',
      layer: 'Technology Architecture',
      confidence: 92,
      status: 'mapped'
    }
  ]

  const insights = [
    {
      type: 'opportunity',
      title: 'Strategic Alignment Gap',
      description: 'Current content suggests missing stakeholder analysis in Phase A',
      priority: 'high',
      framework: 'TOGAF ADM'
    },
    {
      type: 'compliance',
      title: 'ISO 42001 Readiness',
      description: 'AI governance framework partially addressed',
      priority: 'medium',
      framework: 'ISO 42001'
    },
    {
      type: 'capability',
      title: 'Digital Transformation',
      description: 'Strong capability maturity indicators detected',
      priority: 'low',
      framework: 'Custom'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Architecture Dashboard</h1>
          <p className="text-slate-600">Real-time analysis of current page content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {framework} Active
          </Badge>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Analyze Page
          </Button>
        </div>
      </div>

      {/* Current Analysis */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Current Page Analysis</CardTitle>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
          <CardDescription>{analysisResults.currentPage}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analysisResults.confidence}%</div>
              <div className="text-sm text-slate-600">Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analysisResults.mappedComponents}</div>
              <div className="text-sm text-slate-600">Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{analysisResults.complianceScore}%</div>
              <div className="text-sm text-slate-600">Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{analysisResults.riskLevel}</div>
              <div className="text-sm text-slate-600">Risk Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="mappings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mappings">Framework Mappings</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="mappings" className="space-y-4">
          <div className="grid gap-4">
            {frameworkMappings.map((mapping, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Layers className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{mapping.component}</h3>
                        <p className="text-sm text-slate-600">{mapping.layer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{mapping.confidence}%</div>
                        <Progress value={mapping.confidence} className="w-20 h-2" />
                      </div>
                      <Badge 
                        variant={mapping.status === 'mapped' ? 'default' : 'secondary'}
                        className={mapping.status === 'mapped' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {mapping.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'opportunity' ? 'bg-blue-100' :
                      insight.type === 'compliance' ? 'bg-orange-100' : 'bg-green-100'
                    }`}>
                      {insight.type === 'opportunity' ? <Target className="h-4 w-4 text-blue-600" /> :
                       insight.type === 'compliance' ? <AlertTriangle className="h-4 w-4 text-orange-600" /> :
                       <TrendingUp className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{insight.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.framework}
                          </Badge>
                          <Badge 
                            variant={insight.priority === 'high' ? 'destructive' : 
                                   insight.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {insight.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <div>
                      <h3 className="font-medium">Generate Executive Summary</h3>
                      <p className="text-sm text-slate-600">Create boardroom-ready translation</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Map Business Capabilities</h3>
                      <p className="text-sm text-slate-600">Extract and visualize capabilities</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Layers className="h-4 w-4 mr-2" />
                    Map
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Schedule Governance Review</h3>
                      <p className="text-sm text-slate-600">Set up compliance checkpoint</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}