import { Hero } from "../components/Hero"
import { Product3D } from "../components/Product3D"
import { CompanyInfo } from "../components/CompanyInfo"
import { Benefits3D } from "../components/Benefits3D"
import { Testimonials } from "../components/Testimonials"
import { TeamMembers } from "../components/TeamMembers"
import { TechStack } from "../components/TechStack"
import { FAQ } from "../components/FAQ"
import { Partners } from "../components/Partners"
import { CTA } from "../components/CTA"

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Hero />

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-900">Experience Our 3D Technology</h2>

        <div className="mb-20">
          <Product3D />
        </div>

        <CompanyInfo />

        <Benefits3D />

        <TeamMembers />

        <TechStack />

        <Partners />

        <Testimonials />

        <FAQ />

        <CTA />
      </div>
    </div>
  )
}

