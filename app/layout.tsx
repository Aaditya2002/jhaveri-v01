import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "./globals.css"
import AIChatbot from "@/components/ai-chatbot"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Jhaveri Securities | Premium Financial Products Aggregator",
  description: "India's premier financial products aggregator for high-net-worth individuals",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="flex-grow relative z-0">{children}</main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  )
}
