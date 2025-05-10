"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

export default function WealthCreation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video with Luxury Office/Financial District */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video ref={videoRef} className="object-cover w-full h-full" autoPlay muted loop playsInline>
          <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-px h-32 bg-gold"></div>
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                Wealth <br />
                <span className="text-gold">Creation</span>
              </h2>
              <p className="text-white/80 text-lg mt-8 mb-12 max-w-md leading-relaxed">
                Strategic investments designed for substantial long-term capital appreciation through carefully selected
                growth opportunities.
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

          <div className="hidden md:block md:col-span-6 lg:col-span-7">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative h-[500px] w-full"
            >
              <div className="absolute top-0 right-0 w-[70%] h-[70%] border border-gold/30 backdrop-blur-sm bg-black/20"></div>
              <div className="absolute bottom-0 left-0 w-[70%] h-[70%] bg-gradient-to-br from-gold/20 to-transparent backdrop-blur-sm"></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Investment"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-12 right-12 p-6 backdrop-blur-md bg-black/40 border-l border-gold max-w-xs">
                <p className="text-gold text-xs uppercase tracking-widest mb-2">Featured Investment</p>
                <h3 className="text-white font-serif text-xl mb-2">Private Equity Access</h3>
                <p className="text-white/70 text-sm">
                  Exclusive opportunities in pre-IPO companies with exceptional growth potential.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-8 z-20 hidden lg:block">
        <div className="flex flex-col space-y-6">
          <div className="w-px h-32 bg-white/20 mx-auto"></div>
          <div className="text-white/40 text-xs uppercase tracking-widest transform -rotate-90 origin-center whitespace-nowrap">
            Scroll to Explore
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 right-8 z-20 hidden lg:block">
        <div className="flex flex-col items-end space-y-8">
          <a
            href="#"
            className="text-white/40 hover:text-gold text-xs uppercase tracking-widest transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-white/40 hover:text-gold text-xs uppercase tracking-widest transition-colors duration-300"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-white/40 hover:text-gold text-xs uppercase tracking-widest transition-colors duration-300"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}
