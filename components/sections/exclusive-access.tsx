"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Calendar, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ExclusiveAccess() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const [formStep, setFormStep] = useState(0)

  const exclusiveFeatures = [
    "Dedicated wealth advisor",
    "Quarterly portfolio reviews",
    "Exclusive investment opportunities",
    "Bespoke wealth structuring",
    "Family office services",
    "Global investment access",
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=1920&q=80"
          alt="Exclusive Access"
          className="object-cover w-full h-full opacity-20"
        />
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
                Exclusive <br />
                <span className="text-gold">Access</span>
              </h2>
              <p className="text-white/80 text-lg mt-8 mb-12 max-w-md leading-relaxed">
                Join an exclusive community of sophisticated investors with access to exceptional opportunities and
                personalized service.
              </p>

              <ul className="space-y-4 mb-12">
                {exclusiveFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-1 h-1 bg-gold mr-3"></div>
                    <span className="text-white/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center space-x-8">
                <button className="group flex items-center">
                  <span className="text-gold text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    Learn More
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 text-gold group-hover:text-white transition-colors duration-300" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-black/40 backdrop-blur-md border border-gold/20 p-8 md:p-12"
            >
              <h3 className="text-white font-serif text-2xl mb-6">Request Private Consultation</h3>
              <p className="text-white/70 mb-8">
                Complete the form below to schedule a confidential discussion with one of our senior wealth advisors.
              </p>

              {formStep === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Full Name</label>
                    <Input
                      className="bg-white/5 border-gold/20 text-white focus:border-gold"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold/50" />
                        <Input
                          className="bg-white/5 border-gold/20 text-white focus:border-gold pl-10"
                          placeholder="Your email"
                          type="email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold/50" />
                        <Input
                          className="bg-white/5 border-gold/20 text-white focus:border-gold pl-10"
                          placeholder="Your phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Investment Capacity (₹)</label>
                    <select className="w-full bg-white/5 border-gold/20 text-white focus:border-gold p-2 rounded-none">
                      <option>₹1 Crore - ₹5 Crore</option>
                      <option>₹5 Crore - ₹10 Crore</option>
                      <option>₹10 Crore - ₹50 Crore</option>
                      <option>₹50 Crore+</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => setFormStep(1)}
                    className="w-full bg-gold hover:bg-gold/90 text-black rounded-none uppercase tracking-wider"
                  >
                    Continue
                  </Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Investment Interests</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Wealth Creation", "Wealth Preservation", "High Yield", "Family Office"].map((interest, i) => (
                        <div key={i} className="flex items-center">
                          <input type="checkbox" className="mr-2 accent-gold" />
                          <label className="text-white/80 text-sm">{interest}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Preferred Consultation Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold/50" />
                      <Input className="bg-white/5 border-gold/20 text-white focus:border-gold pl-10" type="date" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Additional Information</label>
                    <textarea
                      className="w-full bg-white/5 border-gold/20 text-white focus:border-gold p-3 h-24 resize-none"
                      placeholder="Tell us about your investment goals and any specific requirements"
                    ></textarea>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setFormStep(0)}
                      className="flex-1 bg-transparent border border-gold/50 text-white hover:bg-transparent hover:border-gold rounded-none uppercase tracking-wider"
                    >
                      Back
                    </Button>

                    <Button className="flex-1 bg-gold hover:bg-gold/90 text-black rounded-none uppercase tracking-wider">
                      Submit Request
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="flex justify-between items-center border-t border-gold/20 pt-6">
            <div className="text-white/40 text-xs">
              © {new Date().getFullYear()} Jhaveri Securities. All rights reserved.
            </div>

            <div className="flex space-x-8">
              <a
                href="#"
                className="text-white/40 hover:text-gold text-xs uppercase tracking-widest transition-colors duration-300"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-gold text-xs uppercase tracking-widest transition-colors duration-300"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-gold text-xs uppercase tracking-widest transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
