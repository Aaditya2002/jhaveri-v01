"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export default function CallToAction() {
  const { ref: sectionRef, timeSpent, engagementScore } = useSectionTracking(
    "call-to-action",
    "Call to Action",
    "Let's Talk About Your Wealth Goals"
  )

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 md:py-32 pb-32 bg-navy text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">Let's Talk About Your Wealth Goals</h2>
          <p className="text-white/80 text-lg mb-12 max-w-3xl mx-auto">
            Schedule a confidential consultation with one of our wealth advisors to explore how Jhaveri Securities can
            help you achieve your financial objectives.
          </p>
          <Link href="/contact">
            <Button className="bg-gold hover:bg-gold/90 text-navy rounded-none px-8 py-6 text-lg">
              <Calendar className="mr-2 h-5 w-5" /> Schedule Consultation
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
