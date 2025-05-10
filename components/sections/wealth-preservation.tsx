"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Shield, TrendingDown, BarChart4 } from "lucide-react"

export default function WealthPreservation() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const strategies = [
    {
      icon: <Shield className="h-6 w-6 text-gold" />,
      title: "Capital Protection",
      description: "Defensive strategies designed to preserve wealth during market downturns.",
    },
    {
      icon: <TrendingDown className="h-6 w-6 text-gold" />,
      title: "Volatility Reduction",
      description: "Sophisticated approaches to minimize portfolio fluctuations.",
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-gold" />,
      title: "Inflation Hedging",
      description: "Strategic allocations to assets that maintain purchasing power.",
    },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1920&q=80"
          alt="Wealth Preservation"
          className="object-cover w-full h-full opacity-40"
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-px h-32 bg-gold"></div>
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                Wealth <br />
                <span className="text-gold">Preservation</span>
              </h2>
              <p className="text-white/80 text-lg mt-8 mb-12 max-w-md leading-relaxed">
                Conservative strategies focused on protecting your capital while providing steady returns that outpace
                inflation.
              </p>

              <div className="flex items-center space-x-8">
                <button className="group flex items-center">
                  <span className="text-gold text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    Explore Strategy
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 text-gold group-hover:text-white transition-colors duration-300" />
                </button>

                <div className="h-px w-12 bg-gold/50"></div>

                <button className="text-white/80 text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300">
                  Schedule Consultation
                </button>
              </div>
            </motion.div>
          </div>

          <div className="hidden md:block md:col-span-6 lg:col-span-7">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              {strategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  className={`p-8 border border-gold/20 backdrop-blur-sm bg-black/30 ${
                    index === 0 ? "col-span-2" : "col-span-1"
                  }`}
                >
                  <div className="mb-6">{strategy.icon}</div>
                  <h3 className="text-white font-serif text-xl mb-3">{strategy.title}</h3>
                  <p className="text-white/70">{strategy.description}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="col-span-2 mt-6"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 max-w-md">
                    <p className="text-white/90 font-serif text-lg">
                      "In uncertain times, wealth preservation becomes the cornerstone of a sound financial strategy."
                    </p>
                    <p className="text-gold text-sm mt-4">— Jhaveri Investment Philosophy</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
