"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PreloaderProps {
  isLoading: boolean
}

export default function Preloader({ isLoading }: PreloaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress > 100 ? 100 : newProgress
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isLoading])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? "auto" : "none" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black",
        isLoading ? "block" : "pointer-events-none",
      )}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="59" stroke="#D5A021" strokeWidth="2" />
              <path d="M40 40L80 80" stroke="#D5A021" strokeWidth="2" />
              <path d="M80 40L40 80" stroke="#D5A021" strokeWidth="2" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold/20 backdrop-blur-sm"></div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl font-serif text-white mb-12 tracking-[0.3em]"
        >
          JHAVERI
        </motion.h1>

        <div className="w-[300px] h-px bg-white/20 relative overflow-hidden">
          <motion.div className="h-full bg-gold" style={{ width: `${progress}%` }} transition={{ duration: 0.2 }} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-white/60 text-xs tracking-widest uppercase"
        >
          Curating Exceptional Wealth
        </motion.p>
      </div>
    </motion.div>
  )
}
