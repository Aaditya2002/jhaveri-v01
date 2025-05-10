"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  BarChart4, 
  PieChart, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Info
} from "lucide-react"

interface ToolInput {
  label: string
  type: string
  placeholder?: string
  options?: string[]
  value?: string | number
}

interface ToolResult {
  value?: number | string
  breakdown?: { label: string; value: number | string }[]
  message?: string
  riskLevel?: string
  allocation?: { asset: string; percentage: number }[]
}

export default function FinancialToolsHub() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [toolInputs, setToolInputs] = useState<{ [key: string]: any }>({})
  const [toolResults, setToolResults] = useState<{ [key: string]: ToolResult }>({})

  const handleInputChange = (toolId: string, index: number, value: string | number) => {
    setToolInputs(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        [index]: value
      }
    }))
  }

  const calculateCAGR = (values: any) => {
    const initial = Number(values[0])
    const years = Number(values[1])
    const rate = Number(values[2])
    
    const futureValue = Math.round(initial * Math.pow(1 + rate / 100, years))
    const totalReturn = futureValue - initial
    const annualReturn = Math.round(totalReturn / years)
    
    return {
      value: futureValue,
      breakdown: [
        { label: "Initial Investment", value: initial.toLocaleString() },
        { label: "Total Return", value: totalReturn.toLocaleString() },
        { label: "Annual Return", value: annualReturn.toLocaleString() }
      ]
    }
  }

  const calculateRiskProfile = (values: any) => {
    const horizon = values[0]
    const tolerance = values[1]
    const goals = values[2]
    
    let riskScore = 0
    if (horizon.includes("Long-term")) riskScore += 3
    else if (horizon.includes("Medium-term")) riskScore += 2
    else riskScore += 1
    
    if (tolerance === "Aggressive") riskScore += 3
    else if (tolerance === "Moderate") riskScore += 2
    else riskScore += 1
    
    if (goals.includes("Maximum")) riskScore += 3
    else if (goals.includes("Balanced")) riskScore += 2
    else riskScore += 1
    
    let riskLevel = "Conservative"
    if (riskScore >= 7) riskLevel = "Aggressive"
    else if (riskScore >= 4) riskLevel = "Moderate"
    
    return {
      riskLevel,
      message: `Based on your ${horizon.toLowerCase()} horizon, ${tolerance.toLowerCase()} risk tolerance, and ${goals.toLowerCase()} goals, you are a ${riskLevel.toLowerCase()} investor.`
    }
  }

  const calculatePortfolioComparison = (values: any) => {
    const amount = Number(values[0])
    const type = values[1]
    const years = Number(values[2])
    
    const returns = {
      "PMS": 15,
      "AIF": 18,
      "Mutual Funds": 12
    }
    
    const futureValues = Object.entries(returns).map(([type, rate]) => ({
      type,
      value: Math.round(amount * Math.pow(1 + rate / 100, years))
    }))
    
    return {
      breakdown: futureValues.map(fv => ({
        label: fv.type,
        value: fv.value.toLocaleString()
      }))
    }
  }

  const calculateAssetAllocation = (values: any) => {
    const portfolioValue = Number(values[0])
    const goals = values[1]
    const riskProfile = values[2]
    
    let allocation = []
    if (riskProfile === "Conservative") {
      allocation = [
        { asset: "Fixed Income", percentage: 60 },
        { asset: "Equity", percentage: 20 },
        { asset: "Gold", percentage: 10 },
        { asset: "Cash", percentage: 10 }
      ]
    } else if (riskProfile === "Moderate") {
      allocation = [
        { asset: "Equity", percentage: 50 },
        { asset: "Fixed Income", percentage: 30 },
        { asset: "Gold", percentage: 10 },
        { asset: "Cash", percentage: 10 }
      ]
    } else {
      allocation = [
        { asset: "Equity", percentage: 70 },
        { asset: "Fixed Income", percentage: 15 },
        { asset: "Gold", percentage: 10 },
        { asset: "Cash", percentage: 5 }
      ]
    }
    
    return {
      allocation: allocation.map(a => ({
        ...a,
        value: Math.round(portfolioValue * a.percentage / 100)
      }))
    }
  }

  const calculateRetirement = (values: any) => {
    const currentAge = Number(values[0])
    const retirementAge = Number(values[1])
    const monthlySavings = Number(values[2])
    
    const yearsToRetirement = retirementAge - currentAge
    const annualSavings = monthlySavings * 12
    const expectedReturn = 8 // Conservative estimate
    
    const corpus = Math.round(
      annualSavings * 
      ((Math.pow(1 + expectedReturn/100, yearsToRetirement) - 1) / (expectedReturn/100))
    )
    
    return {
      value: corpus,
      breakdown: [
        { label: "Years to Retirement", value: yearsToRetirement },
        { label: "Annual Savings", value: annualSavings.toLocaleString() },
        { label: "Expected Return", value: `${expectedReturn}%` }
      ]
    }
  }

  const calculateMarketSentiment = (values: any) => {
    const index = values[0]
    const period = values[1]
    
    // Simulated sentiment calculation
    const sentiments = {
      "Nifty 50": { "1 Month": 65, "3 Months": 70, "6 Months": 75 },
      "Sensex": { "1 Month": 60, "3 Months": 65, "6 Months": 70 },
      "Nifty 500": { "1 Month": 55, "3 Months": 60, "6 Months": 65 }
    }
    
    const score = sentiments[index][period]
    let sentiment = "Neutral"
    if (score >= 70) sentiment = "Bullish"
    else if (score <= 40) sentiment = "Bearish"
    
    return {
      value: score,
      message: `The ${index} shows a ${sentiment.toLowerCase()} sentiment over the ${period.toLowerCase()} period.`
    }
  }

  const handleCalculate = (toolId: string) => {
    const values = toolInputs[toolId] || []
    let result: ToolResult = {}
    
    switch (toolId) {
      case "cagr":
        result = calculateCAGR(values)
        break
      case "risk-assessment":
        result = calculateRiskProfile(values)
        break
      case "portfolio-comparison":
        result = calculatePortfolioComparison(values)
        break
      case "asset-allocation":
        result = calculateAssetAllocation(values)
        break
      case "retirement":
        result = calculateRetirement(values)
        break
      case "market-sentiment":
        result = calculateMarketSentiment(values)
        break
    }
    
    setToolResults(prev => ({
      ...prev,
      [toolId]: result
    }))
  }

  const tools = [
    {
      id: "cagr",
      title: "CAGR Calculator",
      description: "Calculate compound annual growth rate and visualize wealth growth over time",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "#0A2342", // Navy
      inputs: [
        { label: "Initial Investment (₹)", type: "number", placeholder: "100000" },
        { label: "Investment Period (Years)", type: "number", placeholder: "10" },
        { label: "Expected Annual Return (%)", type: "number", placeholder: "12" }
      ]
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment Tool",
      description: "Evaluate your investment risk profile and get personalized recommendations",
      icon: <Shield className="h-6 w-6" />,
      color: "#2D3142", // Charcoal
      inputs: [
        { label: "Investment Horizon", type: "select", options: ["Short-term (<3 years)", "Medium-term (3-7 years)", "Long-term (>7 years)"] },
        { label: "Risk Tolerance", type: "select", options: ["Conservative", "Moderate", "Aggressive"] },
        { label: "Investment Goals", type: "select", options: ["Capital Preservation", "Balanced Growth", "Maximum Growth"] }
      ]
    },
    {
      id: "portfolio-comparison",
      title: "Investment Comparison Tool",
      description: "Compare different investment vehicles and their potential returns",
      icon: <BarChart4 className="h-6 w-6" />,
      color: "#D5A021", // Gold
      inputs: [
        { label: "Investment Amount (₹)", type: "number", placeholder: "1000000" },
        { label: "Investment Type", type: "select", options: ["PMS", "AIF", "Mutual Funds"] },
        { label: "Time Period (Years)", type: "number", placeholder: "5" }
      ]
    },
    {
      id: "asset-allocation",
      title: "Asset Allocation Analyzer",
      description: "Get personalized asset allocation recommendations based on your profile",
      icon: <PieChart className="h-6 w-6" />,
      color: "#0A2342", // Navy
      inputs: [
        { label: "Total Portfolio Value (₹)", type: "number", placeholder: "5000000" },
        { label: "Investment Goals", type: "select", options: ["Growth", "Income", "Balanced"] },
        { label: "Risk Profile", type: "select", options: ["Conservative", "Moderate", "Aggressive"] }
      ]
    },
    {
      id: "retirement",
      title: "Retirement Planning Calculator",
      description: "Plan your retirement with our comprehensive calculator",
      icon: <Clock className="h-6 w-6" />,
      color: "#2D3142", // Charcoal
      inputs: [
        { label: "Current Age", type: "number", placeholder: "35" },
        { label: "Retirement Age", type: "number", placeholder: "60" },
        { label: "Monthly Savings (₹)", type: "number", placeholder: "50000" }
      ]
    },
    {
      id: "market-sentiment",
      title: "Market Sentiment Indicator",
      description: "Track market mood and make informed investment decisions",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "#D5A021", // Gold
      inputs: [
        { label: "Market Index", type: "select", options: ["Nifty 50", "Sensex", "Nifty 500"] },
        { label: "Time Period", type: "select", options: ["1 Month", "3 Months", "6 Months"] }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const renderResult = (toolId: string, result: ToolResult) => {
    if (!result) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-navy/5 rounded-lg"
      >
        {result.message && (
          <p className="text-charcoal/80 mb-4">{result.message}</p>
        )}
        
        {result.value && (
          <div className="text-2xl font-serif text-navy mb-4">
            ₹{typeof result.value === 'number' ? result.value.toLocaleString() : result.value}
          </div>
        )}
        
        {result.breakdown && (
          <div className="space-y-2">
            {result.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-charcoal/70">{item.label}</span>
                <span className="font-medium text-navy">
                  {typeof item.value === 'number' ? `₹${item.value.toLocaleString()}` : item.value}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {result.allocation && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-navy mb-2">Recommended Allocation</div>
            {result.allocation.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">{item.asset}</span>
                  <span className="font-medium text-navy">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-charcoal/60">
                  ₹{item.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">Financial Tools & Calculators</h2>
          <p className="text-charcoal/80 text-lg max-w-3xl mx-auto">
            Make informed investment decisions with our suite of sophisticated financial tools and calculators.
            Each tool is designed to provide valuable insights for your wealth management journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              className={`group relative bg-white border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                activeTool === tool.id ? 'ring-2 ring-gold' : ''
              }`}
              onClick={() => setActiveTool(tool.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${tool.color}15` }}>
                  {tool.icon}
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                  activeTool === tool.id ? 'rotate-90' : ''
                }`} />
              </div>
              
              <h3 className="font-serif text-xl text-navy mb-2">{tool.title}</h3>
              <p className="text-charcoal/70 text-sm mb-4">{tool.description}</p>
              
              {activeTool === tool.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >
                  {tool.inputs.map((input, index) => (
                    <div key={index}>
                      <label className="block text-sm text-charcoal/70 mb-2">{input.label}</label>
                      {input.type === "select" ? (
                        <select 
                          className="w-full border border-gray-200 p-2 rounded-sm focus:border-gold focus:ring-1 focus:ring-gold"
                          value={toolInputs[tool.id]?.[index] || ""}
                          onChange={(e) => handleInputChange(tool.id, index, e.target.value)}
                        >
                          <option value="">Select {input.label}</option>
                          {input.options?.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          type={input.type}
                          placeholder={input.placeholder}
                          className="border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold"
                          value={toolInputs[tool.id]?.[index] || ""}
                          onChange={(e) => handleInputChange(tool.id, index, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                  
                  <Button 
                    className="w-full bg-navy hover:bg-navy/90 text-white rounded-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCalculate(tool.id)
                    }}
                  >
                    Calculate
                  </Button>

                  {toolResults[tool.id] && renderResult(tool.id, toolResults[tool.id])}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="max-w-xl mx-auto bg-navy/5 p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-navy mb-4">Get Full Access to All Tools</h3>
            <p className="text-charcoal/70 mb-6">
              Sign up to unlock advanced features, save your calculations, and get personalized insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="bg-gold hover:bg-gold/90 text-navy rounded-sm">
                Get Full Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 