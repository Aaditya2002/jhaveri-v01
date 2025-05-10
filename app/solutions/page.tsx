import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Banknote } from "lucide-react"

export default function SolutionsPage() {
  const solutions = [
    {
      icon: <TrendingUp className="h-10 w-10 text-navy" />,
      title: "Wealth Creation",
      description:
        "Strategic long-term investment portfolios designed for substantial capital appreciation through carefully selected growth opportunities.",
      benefits: [
        "Capital appreciation focus",
        "Diversified growth assets",
        "Strategic market positioning",
        "Long-term wealth building",
        "Access to high-growth sectors",
        "Professional portfolio management",
      ],
      cta: "Build Long-Term Wealth",
    },
    {
      icon: <Shield className="h-10 w-10 text-navy" />,
      title: "Wealth Preservation",
      description:
        "Conservative strategies focused on protecting your capital while providing steady returns that outpace inflation.",
      benefits: [
        "Capital protection",
        "Inflation hedging",
        "Reduced volatility",
        "Steady, predictable returns",
        "Preservation of purchasing power",
        "Focus on quality assets",
      ],
      cta: "Preserve Your Capital",
    },
    {
      icon: <Banknote className="h-10 w-10 text-navy" />,
      title: "High Yield Investments",
      description:
        "Alternative investment opportunities that generate consistent income streams through carefully vetted illiquid assets.",
      benefits: [
        "Regular income streams",
        "Higher yield potential",
        "Portfolio diversification",
        "Access to private markets",
        "Alternative asset exposure",
        "Structured income products",
      ],
      cta: "Generate Steady Cashflow",
    },
  ]

  return (
    <div className="bg-white">
      <div className="relative h-[300px] bg-navy">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white">Investment Solutions</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">Tailored Investment Strategies</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            We offer sophisticated investment solutions designed to meet your specific financial objectives, whether
            you're looking to grow, preserve, or generate income from your wealth.
          </p>
        </div>

        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="inline-block p-4 bg-cream mb-6">{solution.icon}</div>
                <h2 className="text-3xl font-serif text-navy mb-4">{solution.title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{solution.description}</p>
                <Button className="bg-navy hover:bg-navy/90 text-white">
                  {solution.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="bg-cream p-8">
                  <h3 className="text-xl font-serif text-navy mb-6">Key Benefits</h3>
                  <ul className="space-y-4">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
