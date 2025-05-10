"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export default function Comparison() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const comparisonData = [
    {
      category: "Investment Approach",
      traditional: "One-size-fits-all products",
      jhaveri: "Personalized investment curation",
    },
    {
      category: "Product Selection",
      traditional: "Limited to in-house offerings",
      jhaveri: "Best-in-class from across the market",
    },
    {
      category: "Fee Structure",
      traditional: "Hidden fees and commissions",
      jhaveri: "Transparent, performance-aligned fees",
    },
    {
      category: "Minimum Investment",
      traditional: "Low barriers, mass market focus",
      jhaveri: "Higher minimums, exclusive access",
    },
    {
      category: "Client Experience",
      traditional: "Transactional relationship",
      jhaveri: "Holistic wealth partnership",
    },
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">What Sets Us Apart</h2>
          <p className="text-charcoal/80 text-lg max-w-3xl mx-auto">
            Discover how our approach to wealth management differs from traditional investment services, providing you
            with superior outcomes and a truly bespoke experience.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px]">
            <thead>
              <tr>
                <th className="p-4 text-left font-serif text-navy text-lg border-b border-gray-200"></th>
                <th className="p-4 text-left font-serif text-charcoal text-lg border-b border-gray-200">
                  Traditional Approach
                </th>
                <th className="p-4 text-left font-serif text-gold text-lg border-b border-gray-200">
                  The Jhaveri Advantage
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="border-b border-gray-100"
                >
                  <td className="p-4 font-medium text-navy">{item.category}</td>
                  <td className="p-4 text-charcoal/80 flex items-center">
                    <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                    {item.traditional}
                  </td>
                  <td className="p-4 text-charcoal/80 flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {item.jhaveri}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button className="bg-navy hover:bg-navy/90 text-white rounded-none px-8 py-6">Discover Our Advantage</Button>
        </motion.div>
      </div>
    </section>
  )
}
