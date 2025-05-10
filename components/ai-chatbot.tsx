"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { 
  Send, 
  Bot, 
  User,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
  BarChart3,
  Brain,
  Settings,
  Lightbulb,
  Mail,
  Phone,
  Building
} from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyBxbPELMhSuZQWJpvUpUjaZz6ULDGYI-Ck")

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  suggestions?: string[]
}

interface LeadData {
  name?: string
  email?: string
  phone?: string
  company?: string
  interests: string[]
  lastInteraction: Date
}

interface SectionRecommendation {
  sectionId: string
  sectionTitle: string
  sectionDescription: string
  timeSpent: number
  engagementScore: number
  scrollDepth: number
  interactions: number
  lastInteraction: Date
}

interface UserProfile {
  interests: string[]
  engagementHistory: SectionRecommendation[]
  leadScore: number
  lastInteraction: Date
  preferredTopics: string[]
  consultationReadiness: number
}

const SYSTEM_PROMPT = `You are Nova, an advanced AI wealth advisor for Jhaveri Securities, a premium financial institution. Your role is to provide sophisticated financial guidance while maintaining a professional and trustworthy demeanor.

Key Responsibilities:
1. Provide accurate financial information and analysis
2. Offer personalized investment recommendations
3. Explain complex financial concepts clearly
4. Maintain compliance with financial regulations
5. Generate relevant follow-up suggestions
6. Guide users towards scheduling a consultation when appropriate
7. You are able to schedule meetings for the user. Collect the required information step by step (date, time, name, email, phone). Do not say you cannot schedule meetings. After collecting all info, I will book the meeting and return the result for you to confirm to the user.

Guidelines:
- Always maintain a professional tone
- Be precise and data-driven in responses
- Acknowledge limitations and suggest consulting human advisors when appropriate
- Focus on long-term wealth building strategies
- Consider risk management in all recommendations
- Use clear, concise language while maintaining sophistication
- Look for opportunities to collect user information naturally
- Guide conversations towards scheduling consultations
- Show genuine interest in user's financial goals

Response Format:
1. Direct answer to the query
2. Brief explanation or context
3. Relevant suggestions for follow-up questions
4. Any important disclaimers or considerations
5. Natural lead-in to consultation when appropriate

Remember: You are representing a premium financial institution, so maintain the highest standards of professionalism and accuracy.`

// Helper to generate unique message IDs
function uniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function LuxuryAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isPartiallyOpen, setIsPartiallyOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uniqueId(),
      content: "Hello",
      role: "user",
      timestamp: new Date()
    },
    {
      id: uniqueId(),
      content: "Hello! I'm Nova, your personal AI wealth advisor. How may I assist you today?",
      role: "assistant",
      timestamp: new Date(),
      suggestions: ["Investment strategy", "Financial planning", "Market analysis"]
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({
    interests: [],
    lastInteraction: new Date()
  })
  const [showLeadForm, setShowLeadForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    interests: [],
    engagementHistory: [],
    leadScore: 0,
    lastInteraction: new Date(),
    preferredTopics: [],
    consultationReadiness: 0
  })
  const [bookingStep, setBookingStep] = useState<null | 'date' | 'time' | 'name' | 'email' | 'phone' | 'done'>(null)
  const [pendingBooking, setPendingBooking] = useState<any>({})

  // Enhanced recommendation generation
  const generateSectionRecommendation = useCallback((data: SectionRecommendation) => {
    const { sectionTitle, engagementScore, interactions, timeSpent } = data
    
    // Update user profile
    setUserProfile(prev => {
      const newHistory = [...prev.engagementHistory, data]
      const newLeadScore = Math.min(100, prev.leadScore + (engagementScore / 10))
      const newReadiness = Math.min(100, prev.consultationReadiness + (interactions * 5))
      
      return {
        ...prev,
        engagementHistory: newHistory,
        leadScore: newLeadScore,
        lastInteraction: new Date(),
        consultationReadiness: newReadiness
      }
    })

    // Generate contextual recommendation based on engagement level
    let recommendations: string[] = []

    if (timeSpent >= 10) {
      recommendations = [
        `I see you're spending time on ${sectionTitle}. Would you like to learn more about how we can help you with this?`,
        `Based on your interest in ${sectionTitle}, I think you might find our detailed analysis valuable.`,
        `I notice you're exploring ${sectionTitle}. Would you like to discuss how this relates to your investment goals?`
      ]
    } else {
      recommendations = [
        `I see you're looking at ${sectionTitle}. Would you like to know more?`,
        `Interested in ${sectionTitle}? I can provide more insights.`,
        `Would you like to learn more about ${sectionTitle}?`
      ]
    }

    // Add personalized follow-up based on engagement
    if (engagementScore > 50) {
      recommendations.push(
        `Your interest in ${sectionTitle} suggests you're serious about your financial future. Would you like to schedule a consultation with our experts?`
      )
    }

    // Add a random suggestion to make it feel more natural
    const suggestions = [
      "Learn more",
      "Get personalized advice",
      "Schedule consultation",
      "View case studies",
      "Compare options"
    ]

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

    return {
      message: recommendations[Math.floor(Math.random() * recommendations.length)],
      suggestion: randomSuggestion
    }
  }, [])

  // Listen for section recommendations
  useEffect(() => {
    const handleSectionRecommendation = (event: CustomEvent<SectionRecommendation>) => {
      const { sectionTitle, sectionDescription } = event.detail
      
      // Automatically open or partially open the chatbot
      if (!isOpen) {
        setIsPartiallyOpen(true)
        // Auto-minimize after 5 seconds if user doesn't interact
        const timer = setTimeout(() => {
          if (!isOpen) {
            setIsPartiallyOpen(false)
          }
        }, 5000)

        const { message, suggestion } = generateSectionRecommendation(event.detail)
        setMessages(prev => [...prev, {
          id: uniqueId(),
          role: 'assistant',
          content: message,
          timestamp: new Date(),
          suggestions: [suggestion]
        }])
      }
    }

    window.addEventListener('section-recommendation', handleSectionRecommendation as EventListener)
    return () => window.removeEventListener('section-recommendation', handleSectionRecommendation as EventListener)
  }, [isOpen, generateSectionRecommendation])

  // Track user's interests based on messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === "user") {
      const interests = extractInterests(lastMessage.content)
      setLeadData(prev => ({
        ...prev,
        interests: [...new Set([...prev.interests, ...interests])],
        lastInteraction: new Date()
      }))
    }
  }, [messages])

  const extractInterests = (content: string): string[] => {
    const interests: string[] = []
    const lowerContent = content.toLowerCase()
    
    if (lowerContent.includes("invest") || lowerContent.includes("portfolio")) {
      interests.push("Investment Management")
    }
    if (lowerContent.includes("retire") || lowerContent.includes("pension")) {
      interests.push("Retirement Planning")
    }
    if (lowerContent.includes("tax") || lowerContent.includes("taxation")) {
      interests.push("Tax Planning")
    }
    if (lowerContent.includes("wealth") || lowerContent.includes("asset")) {
      interests.push("Wealth Management")
    }
    if (lowerContent.includes("market") || lowerContent.includes("trend")) {
      interests.push("Market Analysis")
    }
    
    return interests
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the lead data to your backend
    console.log('Lead data:', leadData)
    
    // Add a thank you message
    setMessages(prev => [...prev, {
      id: uniqueId(),
      content: "Thank you for sharing your information. One of our wealth advisors will contact you shortly to discuss your financial goals in detail.",
      role: "assistant",
      timestamp: new Date(),
      suggestions: ["Schedule consultation", "Learn more about our services", "Browse investment options"]
    }])
    
    setShowLeadForm(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages, isOpen])

  const generateSuggestions = (content: string): string[] => {
    const lowerContent = content.toLowerCase()
    if (lowerContent.includes("invest") || lowerContent.includes("portfolio")) {
      return ["Portfolio diversity", "Risk assessment", "Investment timeline"]
    } else if (lowerContent.includes("market") || lowerContent.includes("trend")) {
      return ["Market trends", "Industry analysis", "Economic forecast"]
    } else if (lowerContent.includes("retire") || lowerContent.includes("pension")) {
      return ["Retirement planning", "Pension options", "Legacy planning"]
    }
    return ["Wealth strategy", "Tax optimization", "Financial goals"]
  }

  const generateAIResponse = async (message: string): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    // Parse markdown and convert to plain text
    return text.replace(/[*_`#-]/g, '')
  }

  // Helper: Start booking flow (step-by-step)
  const startBookingFlow = () => {
    setBookingStep('date')
    setPendingBooking({})
    setMessages(prev => [...prev, {
      id: uniqueId(),
      role: "assistant",
      content: "Let's schedule your consultation! What date would you like to meet? (e.g., 2025-12-05)",
      timestamp: new Date()
    }])
  }

  // Helper: Book meeting via backend API, then let Gemini generate the final response
  const bookMeeting = async (bookingData: any) => {
    setBookingStep("done")
    setMessages(prev => [...prev, {
      id: uniqueId(),
      role: "assistant",
      content: "Booking your meeting...",
      timestamp: new Date()
    }])
    try {
      // Call your backend API route
      const response = await axios.post('/api/book-meeting', {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        start: bookingData.start,
        end: bookingData.end,
        notes: bookingData.notes || 'Scheduled via AI chatbot.'
      })
      const booking = response.data
      // Let Gemini generate the final confirmation message
      const confirmation = `The meeting is booked for ${bookingData.start}. Join link: ${booking?.rescheduleUrl || booking?.cancelUrl || "(link will be sent to your email)"}`
      const geminiResponse = await generateAIResponse(
        `The user's meeting has been successfully booked. Here are the details: ${confirmation}. Please confirm the booking to the user in a friendly and professional way.`
      )
      setMessages(prev => [...prev, {
        id: uniqueId(),
        role: "assistant",
        content: geminiResponse,
        timestamp: new Date()
      }])
    } catch (err: any) {
      setBookingStep(null)
      setMessages(prev => [...prev, {
        id: uniqueId(),
        role: "assistant",
        content: `Sorry, there was an error booking your meeting. ${err?.response?.data?.error || ''} Please try again or contact us directly.`,
        timestamp: new Date()
      }])
    }
  }

  // Enhanced: handleSend for booking flow (step-by-step)
  const handleSend = useCallback(async (message: string) => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: uniqueId(),
      role: 'user',
      content: message,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    setIsTyping(true)

    // Step-by-step booking flow
    if (bookingStep) {
      let nextStep: typeof bookingStep = bookingStep
      let updatedBooking = { ...pendingBooking }
      if (bookingStep === 'date') {
        // Try to extract date
        const dateMatch = message.match(/\d{4}-\d{2}-\d{2}/)
        if (dateMatch) {
          updatedBooking.date = dateMatch[0]
          nextStep = 'time'
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: "assistant",
            content: "What time works for you? (e.g., 14:00 or 2:00 PM)",
            timestamp: new Date()
          }])
        } else {
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: "assistant",
            content: "Please provide a valid date (e.g., 2025-12-05).",
            timestamp: new Date()
          }])
        }
      } else if (bookingStep === 'time') {
        // Try to extract time
        const timeMatch = message.match(/\d{1,2}:\d{2}(?: ?[APMapm]{2})?/)
        if (timeMatch) {
          updatedBooking.time = timeMatch[0]
          nextStep = 'name'
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: "assistant",
            content: "May I have your full name?",
            timestamp: new Date()
          }])
        } else {
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: "assistant",
            content: "Please provide a valid time (e.g., 14:00 or 2:00 PM).",
            timestamp: new Date()
          }])
        }
      } else if (bookingStep === 'name') {
        // Extract name (just take the message)
        updatedBooking.name = message.trim()
        nextStep = 'email'
        setMessages(prev => [...prev, {
          id: uniqueId(),
          role: "assistant",
          content: "Your email address?",
          timestamp: new Date()
        }])
      } else if (bookingStep === 'email') {
        // Extract email
        const emailMatch = message.match(/[\w.-]+@[\w.-]+/)
        if (emailMatch) {
          updatedBooking.email = emailMatch[0]
          nextStep = 'phone'
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: "assistant",
            content: "And your phone number?",
            timestamp: new Date()
          }])
        } else {
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: "assistant",
            content: "Please provide a valid email address.",
            timestamp: new Date()
          }])
        }
      } else if (bookingStep === 'phone') {
        // Extract phone
        const phoneMatch = message.match(/\+?\d{10,}/)
        if (phoneMatch) {
          updatedBooking.phone = phoneMatch[0]
          nextStep = 'done'
        } else {
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: "assistant",
            content: "Please provide a valid phone number.",
            timestamp: new Date()
          }])
        }
      }
      setPendingBooking(updatedBooking)
      setBookingStep(nextStep)
      // If all info collected, book
      if (nextStep === 'done' && updatedBooking.date && updatedBooking.time && updatedBooking.name && updatedBooking.email && updatedBooking.phone) {
        // Combine date and time for Cal.com
        const start = `${updatedBooking.date}T${updatedBooking.time.replace(/(am|pm|AM|PM)/, '').trim()}`
        await bookMeeting({
          ...updatedBooking,
          start,
          end: start // For demo, use same as start
        })
        setBookingStep(null)
        setPendingBooking({})
      }
      setIsTyping(false)
      return
    }

    try {
      // Detect if user wants to schedule (simple keyword match, can be improved)
      if (message.toLowerCase().includes("schedule") || message.toLowerCase().includes("book meeting")) {
        startBookingFlow()
        setIsTyping(false)
        return
      }

      // Update user profile based on message content
      const newInterests = extractInterests(message)
      setUserProfile(prev => ({
        ...prev,
        interests: [...new Set([...prev.interests, ...newInterests])],
        lastInteraction: new Date()
      }))

      // Generate AI response
      const response = await generateAIResponse(message)
      
      // Add response to messages
      setMessages(prev => [...prev, {
        id: uniqueId(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }])

      // Check if we should initiate lead capture
      if (userProfile.leadScore > 70 && userProfile.consultationReadiness > 80) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: uniqueId(),
            role: 'assistant',
            content: 'Based on our conversation, I think you might benefit from a personalized consultation. Would you like to schedule one?',
            timestamp: new Date()
          }])
        }, 1000)
      }

    } catch (error) {
      console.error('Error generating response:', error)
      setMessages(prev => [...prev, {
        id: uniqueId(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      }])
    } finally {
      setIsTyping(false)
    }
  }, [userProfile, bookingStep, pendingBooking])

  // Helper to send and clear input
  const handleSendAndClear = (message: string) => {
    handleSend(message);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendAndClear(input)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Focus the input after selecting a suggestion
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const buttonVariants = {
    closed: { scale: 1 },
    hover: { scale: 1.05, rotate: 3 },
    tap: { scale: 0.95 }
  }

  const tabItems = [
    { id: "chat", icon: <Brain className="h-5 w-5" />, label: "AI Assistant" },
    { id: "insights", icon: <BarChart3 className="h-5 w-5" />, label: "Insights" },
    { id: "tools", icon: <Settings className="h-5 w-5" />, label: "Tools" }
  ]

  // Handle partial open state
  const handlePartialOpenClick = () => {
    setIsPartiallyOpen(false)
    setIsOpen(true)
    setIsMinimized(false)
  }

  return (
    <div className="fixed bottom-6 md:bottom-24 right-6 z-50 font-sans">
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && !isPartiallyOpen && (
          <motion.button
            variants={buttonVariants}
            initial={{ scale: 0 }}
            animate="closed"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsOpen(true)}
            className="bg-navy text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 shadow-navy/20"
          >
            <div className="relative">
              <Sparkles className="h-6 w-6" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-2 w-2 bg-gold rounded-full"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Partially Open State */}
      <AnimatePresence>
        {isPartiallyOpen && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl border border-navy/10 overflow-hidden cursor-pointer"
            style={{
              width: '300px',
              maxHeight: '150px',
              boxShadow: "0 10px 40px -10px rgba(10, 35, 66, 0.3), 0 0 80px -40px rgba(213, 160, 33, 0.15)"
            }}
            onClick={handlePartialOpenClick}
          >
            <div className="bg-navy text-white p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-gold/20 p-1.5 rounded-lg">
                  <Sparkles className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Nova</h3>
                  <p className="text-xs text-white/70">Your Wealth Intelligence</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPartiallyOpen(false)
                }}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {messages[messages.length - 1]?.content}
              </p>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handlePartialOpenClick}
                  className="text-xs bg-navy text-white px-3 py-1.5 rounded-full hover:bg-navy/90 transition-colors"
                >
                  Open Chat
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-white backdrop-blur-lg bg-opacity-95 rounded-3xl overflow-hidden shadow-2xl border border-navy/10 ${
              isExpanded ? "w-[500px] h-[650px]" : isMinimized ? "w-72" : "w-96"
            }`}
            style={{
              boxShadow: "0 10px 40px -10px rgba(10, 35, 66, 0.3), 0 0 80px -40px rgba(213, 160, 33, 0.15)"
            }}
          >
            {/* Header */}
            <div className="bg-navy text-white p-4 flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center space-x-3 z-10">
                <div className="bg-gold/20 backdrop-blur-md p-2 rounded-xl border border-gold/30">
                  <Sparkles className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Nova</h3>
                  <p className="text-xs text-white/70 font-light">Your Wealth Intelligence</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 z-10">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronUp className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -left-4 -top-4 w-16 h-16 bg-gold/20 rounded-full blur-lg"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </div>

            {!isMinimized && (
              <>
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-100">
                  {tabItems.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 text-xs font-medium flex items-center justify-center space-x-1 transition-colors ${
                        activeTab === tab.id 
                          ? "text-navy border-b-2 border-navy" 
                          : "text-gray-500 hover:text-navy-500"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="relative">
                  {/* Chat Tab */}
                  {activeTab === "chat" && (
                    <div className={`overflow-y-auto bg-gray-50/50 p-4 space-y-4 ${isExpanded ? "h-[490px]" : "h-96"}`}>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] ${
                              message.role === "user"
                                ? "bg-gradient-to-br from-navy to-purple-700 text-white rounded-t-2xl rounded-l-2xl"
                                : "bg-white text-gray-800 rounded-t-2xl rounded-r-2xl border border-gray-100"
                            }`}
                            style={{
                              boxShadow: message.role === "user" 
                                ? "0 4px 15px -3px rgba(10, 35, 66, 0.2)" 
                                : "0 4px 15px -3px rgba(0, 0, 0, 0.05)"
                            }}
                          >
                            <div className="p-3.5 flex items-start space-x-2">
                              {message.role === "assistant" && (
                                <div className="bg-gradient-to-br from-navy-100 to-purple-100 p-1.5 rounded-lg">
                                  <Sparkles className="h-4 w-4 text-navy" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <span className="text-xs opacity-60 mt-1.5 block">
                                  {message.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                                
                                {/* Suggestions */}
                                {message.role === "assistant" && message.suggestions && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {message.suggestions.map((suggestion, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="bg-gray-100 hover:bg-navy-100 text-xs px-3 py-1.5 rounded-full text-gray-700 hover:text-navy-700 transition-colors"
                                      >
                                        {suggestion}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {message.role === "user" && (
                                <div className="bg-white/20 p-1.5 rounded-lg">
                                  <User className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white text-gray-800 rounded-t-2xl rounded-r-2xl border border-gray-100 shadow-sm">
                            <div className="p-3.5 flex items-center space-x-2">
                              <div className="bg-gradient-to-br from-navy-100 to-purple-100 p-1.5 rounded-lg">
                                <Sparkles className="h-4 w-4 text-navy" />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Loader2 className="h-4 w-4 animate-spin text-navy" />
                                <span className="text-sm text-gray-600">Nova is thinking...</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}

                  {/* Insights Tab */}
                  {activeTab === "insights" && (
                    <div className={`overflow-y-auto bg-gray-50/50 p-6 ${isExpanded ? "h-[490px]" : "h-96"}`}>
                      <div className="text-center mb-6">
                        <div className="bg-navy p-3 rounded-xl inline-block mb-2">
                          <BarChart3 className="h-6 w-6 text-navy" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Wealth Insights</h3>
                        <p className="text-sm text-gray-500 mt-1">Personalized analysis of your financial status</p>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Sample chart placeholder */}
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Portfolio Performance</h4>
                          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-sm text-gray-400">Interactive chart would appear here</p>
                          </div>
                        </div>
                        
                        {/* Sample metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="text-xs font-medium text-gray-600">Growth Rate</h5>
                              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">+8.2%</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-800">$128,459</p>
                          </div>
                          
                          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="text-xs font-medium text-gray-600">Risk Score</h5>
                              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Moderate</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-800">64/100</p>
                          </div>
                        </div>
                        
                        {/* AI recommendations */}
                        <div className="bg-gradient-to-br from-navy-50 to-purple-50 rounded-xl p-4 border border-navy-100">
                          <div className="flex items-start space-x-3">
                            <div className="bg-white p-2 rounded-lg">
                              <Lightbulb className="h-5 w-5 text-gold" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-800">Nova's Recommendation</h4>
                              <p className="text-xs text-gray-600 mt-1">Consider rebalancing your portfolio to increase exposure to emerging markets. This could potentially increase returns by 3-5% annually.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tools Tab */}
                  {activeTab === "tools" && (
                    <div className={`overflow-y-auto bg-gray-50/50 p-6 ${isExpanded ? "h-[490px]" : "h-96"}`}>
                      <div className="text-center mb-6">
                        <div className="bg-navy p-3 rounded-xl inline-block mb-2">
                          <Settings className="h-6 w-6 text-navy" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">AI Tools Suite</h3>
                        <p className="text-sm text-gray-500 mt-1">Powerful tools to optimize your financial decisions</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {["Portfolio Optimizer", "Tax Calculator", "Retirement Planner", "Estate Planner", "Risk Analyzer", "Goal Tracker"].map((tool, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:border-navy-200 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex flex-col items-center text-center">
                              <div className="bg-gray-100 group-hover:bg-navy-100 p-3 rounded-lg mb-2 transition-colors">
                                <Settings className="h-5 w-5 text-gray-500 group-hover:text-navy-600 transition-colors" />
                              </div>
                              <h4 className="text-sm font-medium text-gray-700 group-hover:text-navy-700 transition-colors">{tool}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Input */}
            {!isMinimized && (
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendAndClear(input);
                      }
                    }}
                    placeholder="Ask Nova anything..."
                    className="flex-1 rounded-xl border-gray-200 focus:border-navy-300 focus:ring-2 focus:ring-navy-100 text-sm py-6 pl-4 pr-12"
                  />
                  <button
                    onClick={() => handleSendAndClear(input)}
                    disabled={!input.trim() || isTyping}
                    className={`absolute right-8 bottom-7 ${
                      !input.trim() || isTyping ? "opacity-50 cursor-not-allowed" : "opacity-100"
                    }`}
                  >
                    <div className="bg-gradient-to-r from-navy to-purple-700 p-1.5 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
                      <Send className="h-4 w-4" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Lead Form */}
            {showLeadForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white border-t border-gray-100"
              >
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      className="w-full"
                      onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="w-full"
                      onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full"
                      onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <Input
                      type="text"
                      placeholder="Your company"
                      className="w-full"
                      onChange={(e) => setLeadData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-navy hover:bg-navy/90 text-white"
                  >
                    Schedule Consultation
                  </Button>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}