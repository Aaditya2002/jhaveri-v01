"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Award, TrendingUp, Users, Clock, Shield } from "lucide-react"

export default function ManagerSelection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const criteria = [
    {
      icon: <Award className="h-8 w-8 text-gold" />,
      title: "Track Record",
      description: "Minimum 10-year proven performance history across market cycles",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-gold" />,
      title: "Consistent Returns",
      description: "Demonstrated ability to generate alpha with controlled volatility",
    },
    {
      icon: <Users className="h-8 w-8 text-gold" />,
      title: "Team Expertise",
      description: "Seasoned investment professionals with specialized domain knowledge",
    },
    {
      icon: <Clock className="h-8 w-8 text-gold" />,
      title: "Investment Process",
      description: "Rigorous, repeatable methodology with clear risk management",
    },
    {
      icon: <Shield className="h-8 w-8 text-gold" />,
      title: "Alignment of Interests",
      description: "Significant personal investment alongside clients",
    },
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">Our Fund Manager Selection Process</h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            We apply stringent criteria when selecting fund managers, ensuring that only the most exceptional investment
            professionals manage your wealth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {criteria.map((criterion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm"
            >
              <div className="mb-6">{criterion.icon}</div>
              <h3 className="text-xl font-serif text-gold mb-4">{criterion.title}</h3>
              <p className="text-white/80">{criterion.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button className="bg-gold hover:bg-gold/90 text-navy rounded-none px-8 py-6">
            Meet Our Selected Managers
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
