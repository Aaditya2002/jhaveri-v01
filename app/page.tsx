import Hero from "@/components/home/hero"
import About from "@/components/home/about"
import InvestmentMatrix from "@/components/home/investment-matrix"
import Solutions from "@/components/home/solutions"
import Comparison from "@/components/home/comparison"
import Testimonials from "@/components/home/testimonials"
import CallToAction from "@/components/home/call-to-action"
import FinancialToolsHub from "@/components/financial-tools-hub"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <InvestmentMatrix />
      <Solutions />
      <Comparison />
      <Testimonials />
      <FinancialToolsHub />
      <CallToAction />
    </>
  )
}
