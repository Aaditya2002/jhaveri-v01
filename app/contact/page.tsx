"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formStep, setFormStep] = useState(0)

  return (
    <div className="bg-white">
      <div className="relative h-[300px] bg-navy">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-serif text-navy mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              We welcome the opportunity to discuss how Jhaveri Securities can help you achieve your financial
              objectives. Complete the form to schedule a confidential consultation with one of our wealth advisors.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gold mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-navy mb-1">Our Office</h3>
                  <p className="text-gray-700">
                    Jhaveri Tower, 12th Floor
                    <br />
                    Nariman Point, Mumbai 400021
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gold mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-navy mb-1">Phone</h3>
                  <p className="text-gray-700">+91 22 4567 8900</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gold mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-navy mb-1">Email</h3>
                  <p className="text-gray-700">info@jhaverisecurities.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gold mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-navy mb-1">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 2:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cream p-8">
            <h3 className="text-2xl font-serif text-navy mb-6">Request a Consultation</h3>

            {formStep === 0 ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Full Name*</label>
                  <Input className="border-gray-300 focus:border-gold" placeholder="Your full name" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Email*</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        className="border-gray-300 focus:border-gold pl-10"
                        placeholder="Your email"
                        type="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Phone*</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input className="border-gray-300 focus:border-gold pl-10" placeholder="Your phone" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">Investment Capacity (₹)*</label>
                  <select className="w-full border border-gray-300 focus:border-gold p-2 rounded">
                    <option>Select investment capacity</option>
                    <option>₹1 Crore - ₹5 Crore</option>
                    <option>₹5 Crore - ₹10 Crore</option>
                    <option>₹10 Crore - ₹50 Crore</option>
                    <option>₹50 Crore+</option>
                  </select>
                </div>

                <Button onClick={() => setFormStep(1)} className="w-full bg-navy hover:bg-navy/90 text-white">
                  Continue
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Investment Interests*</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Wealth Creation", "Wealth Preservation", "High Yield", "Family Office"].map((interest, i) => (
                      <div key={i} className="flex items-center">
                        <input type="checkbox" className="mr-2 accent-gold" />
                        <label className="text-gray-700 text-sm">{interest}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">Preferred Consultation Date*</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input className="border-gray-300 focus:border-gold pl-10" type="date" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">Message</label>
                  <textarea
                    className="w-full border border-gray-300 focus:border-gold p-3 h-24 resize-none rounded"
                    placeholder="Tell us about your investment goals and any specific requirements"
                  ></textarea>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => setFormStep(0)}
                    className="flex-1 bg-white border border-navy text-navy hover:bg-gray-50"
                  >
                    Back
                  </Button>

                  <Button className="flex-1 bg-navy hover:bg-navy/90 text-white">Submit Request</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
