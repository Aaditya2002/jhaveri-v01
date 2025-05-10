import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about#team" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "Wealth Creation", href: "/solutions#wealth-creation" },
        { name: "Wealth Preservation", href: "/solutions#wealth-preservation" },
        { name: "High Yield Investments", href: "/solutions#high-yield" },
        { name: "Family Office Services", href: "/solutions#family-office" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Insights", href: "/insights" },
        { name: "Market Updates", href: "/insights#market-updates" },
        { name: "Webinars", href: "/insights#webinars" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
  ]

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif mb-6">Jhaveri Securities</h3>
            <p className="text-white/70 mb-6 max-w-md">
              India's premier financial products aggregator, providing sophisticated wealth management solutions for
              high-net-worth individuals.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 border border-white/20 hover:border-gold hover:text-gold transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-serif mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-white/70 hover:text-gold transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Jhaveri Securities. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white/50 text-sm">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="/regulatory" className="hover:text-gold transition-colors">
              Regulatory Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
