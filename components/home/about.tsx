"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export default function About() {
  const { ref: sectionRef, timeSpent, engagementScore } = useSectionTracking(
    "about",
    "About Us",
    "A Legacy of Excellence in Wealth Management"
  )

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
    <motion.section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-cream"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">
              A Legacy of Excellence in Wealth Management
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              For over three decades, Jhaveri Securities has been the trusted partner for discerning investors seeking
              sophisticated wealth solutions. We curate exceptional financial products that align with your unique
              wealth objectives.
            </p>
            <Link href="/about">
              <Button className="bg-navy hover:bg-navy/90 text-white rounded-none px-8 py-6">Learn Our Approach</Button>
            </Link>
          </div>

          <div className="space-y-8">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-serif text-navy mb-3">{principle.title}</h3>
                <p className="text-gray-700">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
