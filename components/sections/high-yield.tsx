"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

export default function HighYield() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const yieldOptions = [
    {
      title: "Private Credit",
      yield: "9-12%",
      description: "Senior secured loans to established mid-market companies",
      risk: "Moderate",
    },
    {
      title: "Real Estate Income",
      yield: "8-10%",
      description: "Premium commercial properties in tier-1 locations",
      risk: "Moderate-Low",
    },
    {
      title: "Structured Products",
      yield: "11-14%",
      description: "Customized financial instruments with defined parameters",
      risk: "Moderate-High",
    },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
          alt="High Yield Investments"
          className="object-cover w-full h-full opacity-30"
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 w-px h-32 bg-gold"></div>
                <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                  High <br />
                  <span className="text-gold">Yield</span>
                </h2>
                <p className="text-white/80 text-lg mt-8 mb-12 max-w-md leading-relaxed">
                  Alternative investment opportunities that generate consistent income streams through carefully vetted
                  illiquid assets.
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
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 md:mt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {yieldOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm border-t border-gold/20 group-hover:bg-black/70 transition-all duration-500"></div>
                  <div className="relative p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                      <h3 className="text-white font-serif text-2xl">{option.title}</h3>
                      <div className="text-gold text-3xl font-serif">{option.yield}</div>
                    </div>
                    <p className="text-white/70 mb-6">{option.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm">Risk: {option.risk}</span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold text-sm uppercase tracking-wider flex items-center">
                        Details <ArrowRight className="ml-2 h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-12 p-8 border-t border-gold/20 backdrop-blur-sm bg-black/30"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <h4 className="text-white font-serif text-xl mb-2">Exclusive High Yield Portfolio</h4>
                  <p className="text-white/70 max-w-md">
                    Access our curated selection of high-yield opportunities with a minimum investment of ₹2 crore.
                  </p>
                </div>
                <button className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300 uppercase tracking-wider text-sm">
                  Request Access
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
