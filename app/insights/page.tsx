import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function InsightsPage() {
  const insights = [
    {
      type: "Webinar",
      title: "Navigating Market Volatility: Strategies for Uncertain Times",
      date: "December 15, 2023",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      excerpt:
        "Learn effective strategies to protect and grow your wealth during periods of market uncertainty and volatility.",
    },
    {
      type: "Market Outlook",
      title: "2024 Investment Landscape: Opportunities and Challenges",
      date: "January 5, 2024",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      excerpt:
        "Our analysis of the upcoming year's investment environment, highlighting key sectors and potential market movements.",
    },
    {
      type: "Investment Guide",
      title: "Alternative Investments: Enhancing Portfolio Diversification",
      date: "November 28, 2023",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      excerpt:
        "Explore how alternative investments can provide both diversification benefits and enhanced returns in your portfolio.",
    },
    {
      type: "Webinar",
      title: "Estate Planning for High-Net-Worth Individuals",
      date: "October 10, 2023",
      image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=600&q=80",
      excerpt:
        "Essential strategies for preserving and transferring wealth across generations through effective estate planning.",
    },
    {
      type: "Market Analysis",
      title: "The Impact of Global Economic Policies on Indian Markets",
      date: "September 22, 2023",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
      excerpt:
        "An in-depth analysis of how international economic policies are influencing investment opportunities in India.",
    },
    {
      type: "Investment Guide",
      title: "Private Equity: Accessing High-Growth Opportunities",
      date: "August 15, 2023",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
      excerpt:
        "A comprehensive guide to private equity investments and how they can enhance your portfolio's long-term performance.",
    },
  ]

  return (
    <div className="bg-white">
      <div className="relative h-[300px] bg-navy">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white">Knowledge & Insights</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">Stay Informed</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Access our latest perspectives on markets, investment strategies, and wealth management best practices to
            help you make informed financial decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {insights.map((insight, index) => (
            <div key={index} className="border border-gray-200 overflow-hidden group">
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={insight.image || "/placeholder.svg"}
                  alt={insight.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gold text-sm">{insight.type}</span>
                  <span className="text-gray-500 text-sm">{insight.date}</span>
                </div>
                <h3 className="text-xl font-serif text-navy mb-3 group-hover:text-gold transition-colors">
                  {insight.title}
                </h3>
                <p className="text-gray-700 mb-4">{insight.excerpt}</p>
                <Link
                  href="#"
                  className="inline-flex items-center text-navy font-medium group-hover:text-gold transition-colors"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-navy hover:bg-navy/90 text-white">View All Insights</Button>
        </div>
      </div>
    </div>
  )
}
