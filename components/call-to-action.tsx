"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function CallToAction() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section ref={ref} className="py-24 md:py-32 pb-32 bg-navy text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">Let's Talk About Your Wealth Goals</h2>
          <p className="text-white/80 text-lg mb-12 max-w-3xl mx-auto">
            Schedule a confidential consultation with one of our wealth advisors to explore how Jhaveri Securities can
            help you achieve your financial objectives.
          </p>
          <Button className="bg-gold hover:bg-gold/90 text-navy rounded-none px-8 py-6 text-lg">
            <Calendar className="mr-2 h-5 w-5" /> Schedule Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
