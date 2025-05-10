"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Insights() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const insights = [
    {
      type: "Webinar",
      title: "Navigating Market Volatility: Strategies for Uncertain Times",
      date: "December 15, 2023",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      type: "Market Outlook",
      title: "2024 Investment Landscape: Opportunities and Challenges",
      date: "January 5, 2024",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      type: "Investment Guide",
      title: "Alternative Investments: Enhancing Portfolio Diversification",
      date: "November 28, 2023",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section id="insights" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">Knowledge & Insights</h2>
          <p className="text-charcoal/80 text-lg max-w-3xl mx-auto">
            Stay informed with our latest perspectives on markets, investment strategies, and wealth management best
            practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-6">
                <img
                  src={insight.image || "/placeholder.svg"}
                  alt={insight.title}
                  className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-gold text-sm">{insight.type}</span>
                <h3 className="text-xl font-serif text-navy my-3 group-hover:text-gold transition-colors">
                  {insight.title}
                </h3>
                <p className="text-charcoal/60 text-sm mb-4">{insight.date}</p>
                <a
                  href="#"
                  className="inline-flex items-center text-navy font-medium group-hover:text-gold transition-colors"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button className="bg-navy hover:bg-navy/90 text-white rounded-none px-8 py-6">
            Subscribe to Our Insights
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
