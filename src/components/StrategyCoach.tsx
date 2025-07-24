import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback } from './ui/avatar'
import { 
  MessageSquare, 
  Send, 
  Brain, 
  Lightbulb, 
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react'
import type { Framework } from '../App'

interface StrategyCoachProps {
  framework: Framework
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  framework?: Framework
  confidence?: number
}

export function StrategyCoach({ framework }: StrategyCoachProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI Strategy Coach, specialized in ${framework} framework. I can help you analyze architectural decisions, align strategies with business capabilities, and provide governance insights. What would you like to explore today?`,
      timestamp: new Date(),
      framework,
      confidence: 95
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const suggestedQuestions = [
    "How does this align with our business capabilities?",
    "What TOGAF ADM phase should we focus on?",
    "Are there any stakeholder concerns missing?",
    "What compliance gaps should we address?",
    "How can we improve our architecture maturity?"
  ]

  const generateAIResponse = (question: string, fw: Framework): string => {
    const responses = {
      TOGAF: `Based on TOGAF ADM principles, I recommend focusing on Phase A (Architecture Vision) to establish clear stakeholder buy-in. The current analysis suggests strong alignment with business architecture layers, but we should validate the information systems architecture against your enterprise continuum.`,
      Zachman: `From a Zachman Framework perspective, this maps well to the 'What' and 'How' dimensions at the Business Model level. Consider expanding the analysis to include the 'Where' and 'When' perspectives to ensure comprehensive coverage of your enterprise architecture.`,
      ISO42001: `Regarding ISO 42001 compliance, the current approach demonstrates good AI governance practices. However, I'd recommend strengthening the risk management framework and ensuring proper documentation of AI system lifecycle management processes.`,
      Custom: `Based on your custom framework, this aligns well with your defined architecture principles. The capability mapping shows strong maturity in core business functions, with opportunities for enhancement in digital transformation areas.`
    }
    
    return responses[fw] || responses.TOGAF
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputValue, framework),
        timestamp: new Date(),
        framework,
        confidence: Math.floor(Math.random() * 20) + 80
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
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

      {/* Chat Area */}
      <div className="flex-1 flex gap-6">
        {/* Messages */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={message.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'}>
                            {message.type === 'user' ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`mx-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                          <div
                            className={`rounded-lg p-3 ${
                              message.type === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
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
                            <Brain className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="mx-3">
                          <div className="bg-slate-100 rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
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