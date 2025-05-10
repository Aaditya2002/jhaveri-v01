"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Preloader from "./preloader"
import NavigationPanel from "./navigation-panel"
import WealthCreation from "./sections/wealth-creation"
import WealthPreservation from "./sections/wealth-preservation"
import HighYield from "./sections/high-yield"
import ExclusiveAccess from "./sections/exclusive-access"
import { cn } from "@/lib/utils"

export default function LuxuryExperience() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("wealth-creation")
  const [showNavigation, setShowNavigation] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: "wealth-creation", component: <WealthCreation /> },
    { id: "wealth-preservation", component: <WealthPreservation /> },
    { id: "high-yield", component: <HighYield /> },
    { id: "exclusive-access", component: <ExclusiveAccess /> },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavigation(true)
      } else {
        setShowNavigation(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateTo = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  return (
    <>
      <Preloader isLoading={loading} />

      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full z-50"
          >
            <NavigationPanel activeSection={activeSection} onNavigate={navigateTo} />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        ref={mainRef}
        className={cn("min-h-screen bg-black transition-opacity duration-1000", loading ? "opacity-0" : "opacity-100")}
      >
        <div className="absolute top-8 left-8 z-40">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gold mr-4"></div>
            <h1 className="text-white font-serif text-xl tracking-widest">JHAVERI</h1>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-40">
          <button className="text-white font-serif text-sm tracking-widest border-b border-gold pb-1">
            CLIENT ACCESS
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-screen"
          >
            {sections.find((section) => section.id === activeSection)?.component}
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => navigateTo(section.id)}
              className={cn(
                "text-xs uppercase tracking-widest transition-all duration-300",
                activeSection === section.id ? "text-gold font-medium" : "text-white/60 hover:text-white",
              )}
            >
              {section.id.replace("-", " ")}
              {activeSection === section.id && <motion.div layoutId="activeIndicator" className="h-px bg-gold mt-2" />}
            </button>
          ))}
        </div>
      </main>
    </>
  )
}
