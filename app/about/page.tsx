import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="relative h-[300px] bg-navy">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white">About Jhaveri Securities</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">Our Legacy of Excellence</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For over three decades, Jhaveri Securities has been the trusted partner for discerning investors seeking
              sophisticated wealth solutions. We curate exceptional financial products that align with your unique
              wealth objectives.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our approach combines deep market expertise with a commitment to personalized service, ensuring that each
              client receives tailored solutions that address their specific financial goals and risk tolerance.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Jhaveri Securities Office"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-serif text-navy mb-10 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Trust and Transparency",
                description:
                  "We believe in complete transparency with our clients, providing clear insights into our investment strategies and decisions.",
              },
              {
                title: "Integrity",
                description:
                  "Our business is built on unwavering integrity, ensuring that your interests always come first in everything we do.",
              },
              {
                title: "Efficiency with Empathy",
                description:
                  "We combine efficient wealth management with a deep understanding of your personal financial goals and aspirations.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-cream p-8">
                <h3 className="text-xl font-serif text-navy mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-serif text-navy mb-6">Our Leadership Team</h2>
          <p className="text-gray-700 mb-10 max-w-3xl mx-auto">
            Meet the experienced professionals who guide our investment strategies and ensure we deliver exceptional
            service to our clients.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Rajesh Jhaveri",
                position: "Founder & Chairman",
                image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Priya Mehta",
                position: "Chief Investment Officer",
                image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Vikram Singh",
                position: "Head of Client Relations",
                image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-[300px] w-[300px] mx-auto mb-4 overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-serif text-navy">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>

          <Button className="bg-navy hover:bg-navy/90 text-white">Meet Our Full Team</Button>
        </div>
      </div>
    </div>
  )
}
