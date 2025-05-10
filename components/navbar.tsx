"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 md:px-12",
          scrolled || pathname !== "/" ? "bg-white shadow-md py-4" : "bg-transparent py-6",
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span
              className={cn(
                "text-xl md:text-2xl font-serif transition-colors",
                scrolled || pathname !== "/" ? "text-navy" : "text-white",
              )}
            >
              Jhaveri Securities
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors text-sm uppercase tracking-wider font-light",
                  scrolled || pathname !== "/" ? "text-gray-700 hover:text-navy" : "text-white/80 hover:text-white",
                  pathname === item.href && (scrolled || pathname !== "/") && "text-navy font-medium",
                  pathname === item.href && !scrolled && pathname === "/" && "text-white font-medium",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button
              className={cn(
                "rounded-none px-6",
                scrolled || pathname !== "/"
                  ? "bg-navy hover:bg-navy/90 text-white"
                  : "bg-white hover:bg-white/90 text-navy",
              )}
            >
              Client Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn("md:hidden", scrolled || pathname !== "/" ? "text-navy" : "text-white")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-white transform transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn("text-navy text-xl font-light", pathname === item.href && "font-medium")}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button
            className="bg-navy hover:bg-navy/90 text-white rounded-none px-8 py-6 text-lg mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Client Login
          </Button>
        </div>
      </div>
    </>
  )
}
