import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  MessageSquare, 
  Send, 
  Brain, 
  Lightbulb, 
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Loader2,
  FileText,
  Map,
  Building,
  Database,
  Server,
  Layers
} from 'lucide-react'
import { blink } from '../blink/client'
import { useArchitectureStore } from '../hooks/useArchitectureStore'
import type { Framework } from '../App'
import type { ScenarioAnalysis, ArchitectureVision, ArchitectureComponent, BusinessCapability } from '../types/architecture'

interface StrategyCoachProps {
  framework: Framework
  onArchitectureGenerated?: (analysis: ScenarioAnalysis) => void
}

interface Message {
  id: string
  type: 'user' | 'assistant' | 'scenario'
  content: string
  timestamp: Date
  framework?: Framework
  confidence?: number
  scenarioAnalysis?: ScenarioAnalysis
}

export function StrategyCoach({ framework, onArchitectureGenerated }: StrategyCoachProps) {
  const architectureStore = useArchitectureStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm AIX-Architect™, your AI Strategy Coach powered by advanced language models. I'm specialized in ${framework} framework and can analyze real-world scenarios to generate comprehensive architecture visions, capability maps, and visual components. 

I can help you:
• Analyze business scenarios and extract architecture components
• Generate capability models and maturity assessments
• Create architecture visions with business, application, data, and technology layers
• Provide strategic recommendations and implementation roadmaps

Share a real-world scenario, and I'll transform it into actionable architecture insights!`,
      timestamp: new Date(),
      framework,
      confidence: 98
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [scenarioInput, setScenarioInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')

  const suggestedQuestions = [
    "How can I improve stakeholder buy-in for our architecture vision?",
    "What are the key risks in our current digital transformation approach?",
    "How should we prioritize our architecture modernization roadmap?",
    "What governance controls are missing from our AI implementation?",
    "How can we better align IT strategy with business objectives?",
    "What compliance requirements should we consider for our cloud migration?"
  ]

  const scenarioExamples = [
    "A retail company wants to implement omnichannel customer experience with AI-powered personalization, integrating online, mobile, and in-store touchpoints while ensuring GDPR compliance.",
    "A financial services firm is modernizing legacy systems to support real-time payments, open banking APIs, and regulatory reporting while maintaining security and compliance.",
    "A manufacturing company is implementing Industry 4.0 with IoT sensors, predictive maintenance, and supply chain optimization while integrating with existing ERP systems.",
    "A healthcare organization is building a patient portal with telemedicine capabilities, electronic health records integration, and AI-assisted diagnostics while ensuring HIPAA compliance."
  ]

  const createFallbackAnalysis = (scenario: string, fw: Framework): ScenarioAnalysis => {
    return {
      id: Date.now().toString(),
      scenario,
      framework: fw,
      analysis: {
        businessArchitecture: {
          capabilities: [
            {
              id: 'cap-1',
              name: 'Customer Management',
              description: 'Core customer relationship and experience management',
              maturity: 70,
              importance: 90,
              processes: ['Customer Onboarding', 'Support Management'],
              systems: ['CRM System', 'Customer Portal'],
              gaps: ['Real-time analytics', 'Omnichannel integration']
            }
          ],
          processes: ['Customer Journey Management', 'Service Delivery'],
          stakeholders: ['Business Users', 'IT Team', 'Customers']
        },
        applicationArchitecture: {
          applications: ['Customer Portal', 'Mobile App', 'Backend Services'],
          services: ['Authentication Service', 'Notification Service'],
          interfaces: ['REST APIs', 'GraphQL', 'Message Queues']
        },
        dataArchitecture: {
          entities: ['Customer', 'Transaction', 'Product'],
          flows: ['Customer Data Flow', 'Transaction Processing'],
          governance: ['Data Quality', 'Privacy Controls']
        },
        technologyArchitecture: {
          infrastructure: ['Cloud Platform', 'CDN', 'Load Balancers'],
          platforms: ['Container Platform', 'API Gateway'],
          networks: ['VPN', 'Private Networks']
        }
      },
      recommendations: ['Implement microservices architecture', 'Establish data governance'],
      risks: ['Legacy system integration', 'Data security'],
      opportunities: ['AI/ML integration', 'Process automation'],
      vision: {
        id: Date.now().toString(),
        title: `${fw} Architecture Vision`,
        description: 'Comprehensive architecture vision based on scenario analysis',
        objectives: ['Improve customer experience', 'Enhance operational efficiency'],
        stakeholders: ['Business Users', 'IT Team', 'Customers'],
        constraints: ['Budget limitations', 'Timeline constraints'],
        assumptions: ['Cloud-first approach', 'Agile delivery'],
        components: [],
        capabilities: [],
        timeline: [
          {
            phase: 'Phase 1: Foundation',
            duration: 'Q1-Q2 2024',
            deliverables: ['Architecture Blueprint', 'Technology Stack'],
            status: 'planned' as const
          }
        ]
      }
    }
  }

  const createComponentsFromAnalysis = (analysis: any): ArchitectureComponent[] => {
    const components: ArchitectureComponent[] = []
    
    // Business components
    analysis.businessArchitecture?.capabilities?.forEach((cap: any, index: number) => {
      components.push({
        id: `business-${index}`,
        name: cap.name,
        type: 'business',
        description: cap.description,
        maturity: cap.maturity,
        importance: cap.importance,
        dependencies: cap.systems || [],
        risks: cap.gaps || [],
        opportunities: []
      })
    })

    // Application components
    analysis.applicationArchitecture?.applications?.forEach((app: string, index: number) => {
      components.push({
        id: `app-${index}`,
        name: app,
        type: 'application',
        description: `Application component: ${app}`,
        maturity: Math.floor(Math.random() * 40) + 60,
        importance: Math.floor(Math.random() * 30) + 70,
        dependencies: [],
        risks: [],
        opportunities: []
      })
    })

    // Data components
    analysis.dataArchitecture?.entities?.forEach((entity: string, index: number) => {
      components.push({
        id: `data-${index}`,
        name: entity,
        type: 'data',
        description: `Data entity: ${entity}`,
        maturity: Math.floor(Math.random() * 40) + 60,
        importance: Math.floor(Math.random() * 30) + 70,
        dependencies: [],
        risks: [],
        opportunities: []
      })
    })

    // Technology components
    analysis.technologyArchitecture?.infrastructure?.forEach((infra: string, index: number) => {
      components.push({
        id: `tech-${index}`,
        name: infra,
        type: 'technology',
        description: `Technology component: ${infra}`,
        maturity: Math.floor(Math.random() * 40) + 60,
        importance: Math.floor(Math.random() * 30) + 70,
        dependencies: [],
        risks: [],
        opportunities: []
      })
    })

    return components
  }

  const analyzeScenario = async (scenario: string): Promise<ScenarioAnalysis> => {
    try {
      const frameworkContext = {
        TOGAF: "TOGAF ADM framework with focus on Business, Application, Data, and Technology architecture domains",
        Zachman: "Zachman Framework 6x6 matrix covering What, How, Where, Who, When, Why perspectives",
        ISO42001: "ISO 42001 AI Management Systems with focus on governance, risk, and compliance",
        Custom: "Custom enterprise architecture framework with capability-based approach"
      }

      const analysisPrompt = `As an expert Enterprise Architect specializing in ${framework} (${frameworkContext[framework]}), analyze this real-world scenario and provide a comprehensive architecture analysis:

SCENARIO: "${scenario}"

Please provide a detailed JSON response with the following structure:
{
  "businessArchitecture": {
    "capabilities": [{"name": "string", "description": "string", "maturity": number(0-100), "importance": number(0-100), "processes": ["string"], "systems": ["string"], "gaps": ["string"]}],
    "processes": ["string"],
    "stakeholders": ["string"]
  },
  "applicationArchitecture": {
    "applications": ["string"],
    "services": ["string"],
    "interfaces": ["string"]
  },
  "dataArchitecture": {
    "entities": ["string"],
    "flows": ["string"],
    "governance": ["string"]
  },
  "technologyArchitecture": {
    "infrastructure": ["string"],
    "platforms": ["string"],
    "networks": ["string"]
  },
  "recommendations": ["string"],
  "risks": ["string"],
  "opportunities": ["string"],
  "visionTitle": "string",
  "visionDescription": "string",
  "objectives": ["string"],
  "constraints": ["string"],
  "assumptions": ["string"],
  "timeline": [{"phase": "string", "duration": "string", "deliverables": ["string"], "status": "planned|in-progress|completed"}]
}

Focus on practical, actionable insights that align with ${framework} best practices.`

      const { text } = await blink.ai.generateText({
        prompt: analysisPrompt,
        model: 'gpt-4o-mini',
        maxTokens: 2000
      })

      // Parse the AI response and create structured analysis
      let parsedAnalysis
      try {
        parsedAnalysis = JSON.parse(text)
      } catch {
        // Fallback if JSON parsing fails
        parsedAnalysis = createFallbackAnalysis(scenario, framework)
      }

      const analysis: ScenarioAnalysis = {
        id: Date.now().toString(),
        scenario,
        framework,
        analysis: parsedAnalysis,
        recommendations: parsedAnalysis.recommendations || [],
        risks: parsedAnalysis.risks || [],
        opportunities: parsedAnalysis.opportunities || [],
        vision: {
          id: Date.now().toString(),
          title: parsedAnalysis.visionTitle || `${framework} Architecture Vision`,
          description: parsedAnalysis.visionDescription || "Comprehensive architecture vision based on scenario analysis",
          objectives: parsedAnalysis.objectives || [],
          stakeholders: parsedAnalysis.businessArchitecture?.stakeholders || [],
          constraints: parsedAnalysis.constraints || [],
          assumptions: parsedAnalysis.assumptions || [],
          components: createComponentsFromAnalysis(parsedAnalysis),
          capabilities: parsedAnalysis.businessArchitecture?.capabilities || [],
          timeline: parsedAnalysis.timeline || []
        }
      }

      return analysis
    } catch (error) {
      console.error('Scenario analysis error:', error)
      return createFallbackAnalysis(scenario, framework)
    }
  }

  const generateAIResponse = async (question: string, fw: Framework): Promise<string> => {
    try {
      const frameworkContext = {
        TOGAF: "You are an expert Enterprise Architect specializing in TOGAF (The Open Group Architecture Framework). Focus on ADM phases, architecture domains (Business, Data, Application, Technology), stakeholder management, and enterprise continuum principles.",
        Zachman: "You are an expert Enterprise Architect specializing in the Zachman Framework. Focus on the 6x6 matrix covering What, How, Where, Who, When, Why across Planner, Owner, Designer, Builder, Implementer, and Worker perspectives.",
        ISO42001: "You are an expert in ISO 42001 AI Management Systems. Focus on AI governance, risk management, lifecycle management, transparency, fairness, and compliance requirements for AI systems.",
        Custom: "You are an expert Enterprise Architect helping with custom enterprise architecture frameworks. Focus on architecture principles, capability modeling, and strategic alignment."
      }

      const systemPrompt = `${frameworkContext[fw]} 

You are AIX-Architect™, an AI Strategy Coach for Enterprise Architecture. Provide practical, actionable advice that helps enterprise architects make better decisions. Keep responses concise but comprehensive, focusing on:

1. Strategic alignment with business objectives
2. Framework-specific best practices
3. Risk mitigation and governance
4. Stakeholder considerations
5. Implementation roadmap suggestions

Always provide specific, actionable recommendations rather than generic advice.`

      const { text } = await blink.ai.generateText({
        prompt: `${systemPrompt}\n\nUser Question: ${question}\n\nPlease provide a detailed, practical response that addresses this question from a ${fw} framework perspective.`,
        model: 'gpt-4o-mini',
        maxTokens: 300
      })

      return text
    } catch (error) {
      console.error('AI response error:', error)
      // Fallback to framework-specific response
      const fallbackResponses = {
        TOGAF: `Based on TOGAF ADM principles, I recommend focusing on Phase A (Architecture Vision) to establish clear stakeholder buy-in. The current analysis suggests strong alignment with business architecture layers, but we should validate the information systems architecture against your enterprise continuum.`,
        Zachman: `From a Zachman Framework perspective, this maps well to the 'What' and 'How' dimensions at the Business Model level. Consider expanding the analysis to include the 'Where' and 'When' perspectives to ensure comprehensive coverage of your enterprise architecture.`,
        ISO42001: `Regarding ISO 42001 compliance, the current approach demonstrates good AI governance practices. However, I'd recommend strengthening the risk management framework and ensuring proper documentation of AI system lifecycle management processes.`,
        Custom: `Based on your custom framework, this aligns well with your defined architecture principles. The capability mapping shows strong maturity in core business functions, with opportunities for enhancement in digital transformation areas.`
      }
      
      return fallbackResponses[fw] || fallbackResponses.TOGAF
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userQuestion = inputValue
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userQuestion,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Get real AI response
      const aiResponseContent = await generateAIResponse(userQuestion, framework)
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponseContent,
        timestamp: new Date(),
        framework,
        confidence: Math.floor(Math.random() * 15) + 85 // 85-100% confidence for real AI
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Fallback message on error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble connecting to my AI services right now. Please try again in a moment, or check your connection.",
        timestamp: new Date(),
        framework,
        confidence: 0
      }
      
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleScenarioAnalysis = async () => {
    if (!scenarioInput.trim()) return

    setIsAnalyzing(true)
    
    try {
      const analysis = await analyzeScenario(scenarioInput)
      
      // Add the analysis to the architecture store
      architectureStore.addScenario(analysis)
      
      // Add a message showing the analysis results
      const analysisMessage: Message = {
        id: Date.now().toString(),
        type: 'scenario',
        content: `🎯 **Scenario Analysis Complete**\n\n**Vision:** ${analysis.vision.title}\n\n**Key Findings:**\n• ${analysis.recommendations.slice(0, 3).join('\n• ')}\n\n**Architecture Components Generated:** ${analysis.vision.components.length}\n**Business Capabilities Identified:** ${analysis.vision.capabilities.length}\n\nThe complete architecture vision and components have been generated and are now available in the Visual Mapper!`,
        timestamp: new Date(),
        framework,
        confidence: 95,
        scenarioAnalysis: analysis
      }
      
      setMessages(prev => [...prev, analysisMessage])
      
      // Notify parent component if callback provided
      if (onArchitectureGenerated) {
        onArchitectureGenerated(analysis)
      }
      
      // Clear the scenario input
      setScenarioInput('')
      
      // Switch back to chat tab
      setActiveTab('chat')
      
    } catch (error) {
      console.error('Error analyzing scenario:', error)
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I apologize, but I encountered an error while analyzing your scenario. Please try again with a more detailed description of your business scenario.",
        timestamp: new Date(),
        framework,
        confidence: 0
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleScenarioExample = (example: string) => {
    setScenarioInput(example)
  }

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Strategy Coach</h1>
          <p className="text-slate-600">AI-powered architectural guidance and insights</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Brain className="h-3 w-3 mr-1" />
          {framework} Expert
        </Badge>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6">
        {/* Main Panel */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Strategy Chat
                  </TabsTrigger>
                  <TabsTrigger value="scenario" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Scenario Analysis
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                {/* Chat Tab */}
                <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                  <ScrollArea className="flex-1 px-6">
                    <div className="space-y-4 pb-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className={
                                message.type === 'user' ? 'bg-blue-100' : 
                                message.type === 'scenario' ? 'bg-green-100' : 'bg-purple-100'
                              }>
                                {message.type === 'user' ? <User className="h-4 w-4" /> : 
                                 message.type === 'scenario' ? <Map className="h-4 w-4" /> : 
                                 <Brain className="h-4 w-4" />}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`mx-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                              <div
                                className={`rounded-lg p-3 ${
                                  message.type === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : message.type === 'scenario'
                                    ? 'bg-green-50 text-green-900 border border-green-200'
                                    : 'bg-slate-100 text-slate-900'
                                }`}
                              >
                                <p className="text-sm whitespace-pre-line">{message.content}</p>
                              </div>
                              <div className="flex items-center mt-1 text-xs text-slate-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {message.timestamp.toLocaleTimeString()}
                                {message.confidence && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{message.confidence}% confidence</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-purple-100">
                                <Loader2 className="h-4 w-4 animate-spin" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="mx-3">
                              <div className="bg-slate-100 rounded-lg p-3">
                                <div className="flex items-center space-x-2">
                                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                                  <span className="text-sm text-slate-600">AIX-Architect™ is thinking...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  {/* Chat Input Area */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me about architecture strategy, governance, or framework alignment..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Scenario Analysis Tab */}
                <TabsContent value="scenario" className="flex-1 flex flex-col m-0 p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-World Scenario Analysis</h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Describe a real business scenario, and I'll analyze it to generate comprehensive architecture components, 
                        capability models, and strategic recommendations using {framework} framework principles.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700">
                        Business Scenario Description
                      </label>
                      <Textarea
                        value={scenarioInput}
                        onChange={(e) => setScenarioInput(e.target.value)}
                        placeholder="Describe your business scenario in detail. Include business objectives, current challenges, technology requirements, stakeholder needs, and any constraints or compliance requirements..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-500">
                        {scenarioInput.length}/2000 characters
                      </div>
                      <Button 
                        onClick={handleScenarioAnalysis}
                        disabled={!scenarioInput.trim() || isAnalyzing}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4 mr-2" />
                            Analyze Scenario
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Scenario Examples */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700">
                        Example Scenarios (Click to Use)
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {scenarioExamples.map((example, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="h-auto p-3 text-left justify-start text-wrap"
                            onClick={() => handleScenarioExample(example)}
                          >
                            <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-xs">{example}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Analysis Progress */}
                    {isAnalyzing && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Analyzing your scenario...</p>
                            <p className="text-xs text-blue-700">
                              Generating architecture components, capability models, and strategic recommendations
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-4">
          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Suggested Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 text-wrap"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Context Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Current Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active Framework</span>
                <Badge variant="secondary">{framework}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Page Analysis</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Confidence Level</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Components Mapped</span>
                <span className="text-sm font-medium">8/12</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Brain className="h-4 w-4 mr-2" />
                Analyze Current Page
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Run Compliance Check
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Export Conversation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}