"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "Jhaveri Securities has transformed my approach to wealth management. Their curated investment solutions have consistently outperformed my previous portfolio while providing me with greater peace of mind.",
      author: "Family Office Principal",
      position: "Mumbai",
    },
    {
      quote:
        "The team's deep understanding of alternative investments has allowed me to access opportunities I wouldn't have found elsewhere. Their personalized approach truly sets them apart in the wealth management space.",
      author: "Serial Entrepreneur",
      position: "Bangalore",
    },
    {
      quote:
        "After 15 years with traditional wealth managers, switching to Jhaveri Securities was revelatory. Their transparent fee structure and truly independent advice have made all the difference to my family's financial future.",
      author: "Third-Generation Business Owner",
      position: "Delhi",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} className="py-24 md:py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">Client Experiences</h2>
          <p className="text-charcoal/80 text-lg max-w-3xl mx-auto">
            Discover what our distinguished clients have to say about their journey with Jhaveri Securities.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-navy hover:bg-navy hover:text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-10 md:p-16 shadow-sm relative">
                    <div className="absolute top-8 left-8 text-gold/20">
                      <Quote className="h-16 w-16" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-xl md:text-2xl font-serif text-navy mb-8 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-medium text-navy">{testimonial.author}</p>
                        <p className="text-charcoal/60">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-navy hover:bg-navy hover:text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-gold" : "bg-navy/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
