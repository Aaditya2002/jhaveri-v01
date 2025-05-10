"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const principles = [
    {
      title: "Trust and Transparency",
      description:
        "We believe in complete transparency with our clients, providing clear insights into our investment strategies and decisions.",
    },
    {
      title: "Integrity",
      description:
        "Our business is built on unwavering integrity, ensuring that your interests always come first in everything we do.",
    },
    {
      title: "Efficiency with Empathy",
      description:
        "We combine efficient wealth management with a deep understanding of your personal financial goals and aspirations.",
    },
  ]

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">
              A Legacy of Excellence in Wealth Management
            </h2>
            <p className="text-charcoal/80 text-lg mb-8 leading-relaxed">
              For over three decades, Jhaveri Securities has been the trusted partner for discerning investors seeking
              sophisticated wealth solutions. We curate exceptional financial products that align with your unique
              wealth objectives.
            </p>
            <Button className="bg-navy hover:bg-navy/90 text-white rounded-none px-8 py-6">Learn Our Approach</Button>
          </motion.div>

          <div className="space-y-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 * index, ease: "easeOut" }}
                className="bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-serif text-navy mb-3">{principle.title}</h3>
                <p className="text-charcoal/80">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
