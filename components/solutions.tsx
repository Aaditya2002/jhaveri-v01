"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Banknote } from "lucide-react"

export default function Solutions() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const solutions = [
    {
      icon: <TrendingUp className="h-10 w-10 text-navy" />,
      title: "Wealth Creation",
      description:
        "Strategic long-term investment portfolios designed for substantial capital appreciation through carefully selected growth opportunities.",
      benefits: ["Capital appreciation focus", "Diversified growth assets", "Strategic market positioning"],
      cta: "Build Long-Term Wealth",
      color: "border-navy",
      hoverColor: "group-hover:bg-navy",
      textColor: "group-hover:text-white",
    },
    {
      icon: <Shield className="h-10 w-10 text-charcoal" />,
      title: "Wealth Preservation",
      description:
        "Conservative strategies focused on protecting your capital while providing steady returns that outpace inflation.",
      benefits: ["Capital protection", "Inflation hedging", "Reduced volatility"],
      cta: "Preserve Your Capital",
      color: "border-charcoal",
      hoverColor: "group-hover:bg-charcoal",
      textColor: "group-hover:text-white",
    },
    {
      icon: <Banknote className="h-10 w-10 text-gold" />,
      title: "High Yield Investments",
      description:
        "Alternative investment opportunities that generate consistent income streams through carefully vetted illiquid assets.",
      benefits: ["Regular income streams", "Higher yield potential", "Portfolio diversification"],
      cta: "Generate Steady Cashflow",
      color: "border-gold",
      hoverColor: "group-hover:bg-gold",
      textColor: "group-hover:text-navy",
    },
  ]

  return (
    <section id="solutions" ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">Tailored Investment Solutions</h2>
          <p className="text-charcoal/80 text-lg max-w-3xl mx-auto">
            We offer sophisticated investment strategies designed to meet your specific financial objectives, whether
            you're looking to grow, preserve, or generate income from your wealth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className={`group border ${solution.color} p-8 bg-white hover:shadow-xl transition-all duration-300`}
            >
              <div
                className={`p-4 inline-block rounded-full border ${solution.color} mb-6 ${solution.hoverColor} transition-colors duration-300`}
              >
                <div className={`${solution.textColor} transition-colors duration-300`}>{solution.icon}</div>
              </div>

              <h3 className="text-xl font-serif text-navy mb-4">{solution.title}</h3>
              <p className="text-charcoal/80 mb-6">{solution.description}</p>

              <ul className="space-y-2 mb-8">
                {solution.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span className="text-charcoal/80 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button className="bg-transparent hover:bg-transparent text-navy border border-navy rounded-none group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                {solution.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
