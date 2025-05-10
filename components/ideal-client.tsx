"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function IdealClient() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const clientCriteria = [
    "You have investable assets of ₹5 crore or more",
    "You value a personalized approach to wealth management",
    "You seek sophisticated investment solutions beyond traditional offerings",
    "You appreciate transparent fee structures aligned with your success",
    "You desire a long-term wealth management partnership, not just transactions",
    "You understand that true wealth creation requires patience and discipline",
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">You May Consider Us If...</h2>
            <p className="text-charcoal/80 text-lg mb-8 leading-relaxed">
              Jhaveri Securities is designed for discerning investors who meet specific criteria. Our exclusive approach
              ensures we can provide the highest level of service to clients who will benefit most from our expertise.
            </p>
            <Button className="bg-navy hover:bg-navy/90 text-white rounded-none px-8 py-6">
              See If We're the Right Fit
            </Button>
          </motion.div>

          <div className="space-y-4">
            {clientCriteria.map((criterion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex items-start bg-white p-6 shadow-sm"
              >
                <div className="bg-gold rounded-full p-1 mr-4 flex-shrink-0">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-charcoal/80">{criterion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
