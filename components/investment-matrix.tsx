"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"

export default function InvestmentMatrix() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    {
      id: "wealth-creation",
      title: "Wealth Creation",
      subtitle: "Long-term portfolios",
      description:
        "Strategic investments designed for substantial long-term capital appreciation through carefully selected growth opportunities.",
      cta: "Build Long-Term Wealth",
      color: "bg-navy",
      textColor: "text-white",
      position: { top: "10%", left: "50%" },
    },
    {
      id: "wealth-preservation",
      title: "Wealth Preservation",
      subtitle: "Liquid portfolios",
      description:
        "Conservative strategies focused on protecting your capital while providing steady returns that outpace inflation.",
      cta: "Preserve Your Capital",
      color: "bg-charcoal",
      textColor: "text-white",
      position: { top: "60%", left: "25%" },
    },
    {
      id: "high-yield",
      title: "High Yield Illiquid Investments",
      subtitle: "Regular cashflow",
      description:
        "Alternative investment opportunities that generate consistent income streams through carefully vetted illiquid assets.",
      cta: "Generate Steady Cashflow",
      color: "bg-gold",
      textColor: "text-navy",
      position: { top: "60%", left: "75%" },
    },
  ]

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-4 md:mb-6">Investment Philosophy Matrix</h2>
          <p className="text-charcoal/80 text-base sm:text-lg max-w-3xl mx-auto">
            Our investment approach is structured around three core objectives, each designed to address a specific
            aspect of your wealth management strategy.
          </p>
        </motion.div>

        {/* Radial Matrix Layout */}
        <div className="relative h-[420px] md:h-[520px] lg:h-[600px] flex items-center justify-center mb-8 md:mb-12">
          {/* Center Node */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute left-1/2 top-1/2 z-20 w-28 h-28 md:w-36 md:h-36 rounded-full bg-navy flex items-center justify-center shadow-xl transform -translate-x-1/2 -translate-y-1/2 border-4 border-white"
          >
            <span className="text-white font-serif text-lg md:text-2xl text-center select-none">
              Jhaveri<br />Matrix
            </span>
          </motion.div>

          {/* Radial Lines (SVG) */}
          <svg className="absolute left-0 top-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 400 400">
            {/* Top Node Line */}
            <line x1="200" y1="200" x2="200" y2="60" stroke="#0A2342" strokeWidth="3" />
            {/* Left Node Line */}
            <line x1="200" y1="200" x2="70" y2="340" stroke="#0A2342" strokeWidth="3" />
            {/* Right Node Line */}
            <line x1="200" y1="200" x2="330" y2="340" stroke="#0A2342" strokeWidth="3" />
          </svg>

          {/* Category Nodes (Radial positions) */}
          {/* Top Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => setActiveCategory(categories[0].id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${categories[0].color} shadow-lg transition-all duration-300 ${activeCategory === categories[0].id ? 'scale-110 ring-4 ring-gold' : ''}`}>
              <span className={`${categories[0].textColor} font-serif text-center text-sm md:text-base px-2`}>{categories[0].title}</span>
            </div>
            {activeCategory === categories[0].id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 bg-white shadow-xl p-4 w-64 z-30"
              >
                <h3 className="font-serif text-navy text-lg mb-1">{categories[0].title}</h3>
                <p className="text-gold text-xs mb-3">{categories[0].subtitle}</p>
                <p className="text-charcoal/80 mb-4 text-xs">{categories[0].description}</p>
                <Button className={`${categories[0].color} ${categories[0].textColor} rounded-none text-xs`}>
                  {categories[0].cta}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Left Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute left-0 bottom-0 transform -translate-x-1/4 translate-y-1/4"
            onMouseEnter={() => setActiveCategory(categories[1].id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${categories[1].color} shadow-lg transition-all duration-300 ${activeCategory === categories[1].id ? 'scale-110 ring-4 ring-gold' : ''}`}>
              <span className={`${categories[1].textColor} font-serif text-center text-sm md:text-base px-2`}>{categories[1].title}</span>
            </div>
            {activeCategory === categories[1].id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 bg-white shadow-xl p-4 w-64 z-30"
              >
                <h3 className="font-serif text-navy text-lg mb-1">{categories[1].title}</h3>
                <p className="text-gold text-xs mb-3">{categories[1].subtitle}</p>
                <p className="text-charcoal/80 mb-4 text-xs">{categories[1].description}</p>
                <Button className={`${categories[1].color} ${categories[1].textColor} rounded-none text-xs`}>
                  {categories[1].cta}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4"
            onMouseEnter={() => setActiveCategory(categories[2].id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${categories[2].color} shadow-lg transition-all duration-300 ${activeCategory === categories[2].id ? 'scale-110 ring-4 ring-gold' : ''}`}>
              <span className={`${categories[2].textColor} font-serif text-center text-sm md:text-base px-2`}>{categories[2].title}</span>
            </div>
            {activeCategory === categories[2].id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 bg-white shadow-xl p-4 w-64 z-30"
              >
                <h3 className="font-serif text-navy text-lg mb-1">{categories[2].title}</h3>
                <p className="text-gold text-xs mb-3">{categories[2].subtitle}</p>
                <p className="text-charcoal/80 mb-4 text-xs">{categories[2].description}</p>
                <Button className={`${categories[2].color} ${categories[2].textColor} rounded-none text-xs`}>
                  {categories[2].cta}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile: Circular/Stacked Layout */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center gap-6 z-30">
            {categories.map((category, idx) => (
              <div
                key={category.id}
                className={`w-20 h-20 rounded-full flex items-center justify-center ${category.color} shadow-lg transition-all duration-300`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={`${category.textColor} font-serif text-center text-sm px-2`}>{category.title}</span>
              </div>
            ))}
            {/* Show expanded info below on mobile if any active */}
            {activeCategory && (
              <div className="mt-4 bg-white shadow-xl p-4 w-64 z-30">
                <h3 className="font-serif text-navy text-lg mb-1">{categories.find(c => c.id === activeCategory)?.title}</h3>
                <p className="text-gold text-xs mb-3">{categories.find(c => c.id === activeCategory)?.subtitle}</p>
                <p className="text-charcoal/80 mb-4 text-xs">{categories.find(c => c.id === activeCategory)?.description}</p>
                <Button className={`${categories.find(c => c.id === activeCategory)?.color} ${categories.find(c => c.id === activeCategory)?.textColor} rounded-none text-xs`}>
                  {categories.find(c => c.id === activeCategory)?.cta}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
