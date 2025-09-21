import Image from "next/image"

const certifications = [
  {
    name: "7 Days Robotics Training",
    issuer: "National School of Sciences",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CamScanner%2028-03-2025%2011.05.jpg-qZ4x1VLZ8rBCGPbG4EZDNYdrTX8khx.jpeg",
  },
  {
    name: "CodeCraft: School Coding Challenge - 1st Position",
    issuer: "National School of Sciences",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CamScanner%2028-03-2025%2011.06.jpg-YuX7Qb3JeFBedFSnR5t1ijT3uX07nq.jpeg",
  },
  {
    name: "APEX EcoSprint 2025 Participation",
    issuer: "APEX Health Education",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CamScanner%2028-03-2025%2011.01.jpg-yc6EYmlMKyIpeqVnAqWss3LCyzvcRG.jpeg",
  },
]

export default function CertificationsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-primary">Certifications</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="glass-card p-6 rounded-lg hover:scale-105 transition-transform">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image src={cert.image || "/placeholder.svg"} alt={cert.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold mb-2 text-balance">{cert.name}</h3>
                <p className="text-muted-foreground text-sm">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
