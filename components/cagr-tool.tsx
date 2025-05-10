"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function CagrTool() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const [initialAmount, setInitialAmount] = useState(100000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)
  const [email, setEmail] = useState("")

  const calculateFutureValue = () => {
    return Math.round(initialAmount * Math.pow(1 + rate / 100, years))
  }

  return (
    <section id="tools" ref={ref} className="py-24 md:py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">Visualize Your Wealth Growth</h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Our interactive CAGR calculator helps you project the future value of your investments. Adjust the
              parameters to see how different strategies might perform over time.
            </p>
            <p className="text-white/80 mb-8">
              This is just a preview of our comprehensive suite of financial planning tools. Sign up to access our full
              range of wealth management resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="bg-gold hover:bg-gold/90 text-navy rounded-none">
                Get Full Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm p-8 border border-white/10"
          >
            <h3 className="text-xl font-serif mb-6 text-gold">CAGR Calculator</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/70 mb-2">Initial Investment (₹)</label>
                <Input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white rounded-none"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Investment Period (Years)</label>
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white rounded-none"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Expected Annual Return (%)</label>
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white rounded-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Future Value:</span>
                  <span className="text-2xl font-serif text-gold">₹{calculateFutureValue().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
