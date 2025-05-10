"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavigationPanelProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export default function NavigationPanel({ activeSection, onNavigate }: NavigationPanelProps) {
  const navItems = [
    { id: "wealth-creation", label: "Wealth Creation" },
    { id: "wealth-preservation", label: "Wealth Preservation" },
    { id: "high-yield", label: "High Yield" },
    { id: "exclusive-access", label: "Exclusive Access" },
  ]

  return (
    <div className="w-full bg-black/80 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-screen-2xl mx-auto px-8 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gold mr-4"></div>
          <h1 className="text-white font-serif text-lg tracking-widest">JHAVERI</h1>
        </div>

        <div className="flex items-center space-x-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "text-sm uppercase tracking-widest transition-all duration-300 py-2 relative",
                activeSection === item.id ? "text-gold" : "text-white/60 hover:text-white",
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
              )}
            </button>
          ))}
        </div>

        <button className="text-white font-serif text-sm tracking-widest border border-gold/40 hover:border-gold px-6 py-2 transition-colors duration-300">
          CLIENT ACCESS
        </button>
      </div>
    </div>
  )
}
