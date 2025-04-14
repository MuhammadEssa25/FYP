"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  { name: "TechCorp", logo: "/placeholder.svg?height=100&width=200" },
  { name: "InnovateLabs", logo: "/placeholder.svg?height=100&width=200" },
  { name: "FutureWear", logo: "/placeholder.svg?height=100&width=200" },
  { name: "EcoGoods", logo: "/placeholder.svg?height=100&width=200" },
  { name: "SmartHome", logo: "/placeholder.svg?height=100&width=200" },
  { name: "StyleTech", logo: "/placeholder.svg?height=100&width=200" },
]

export function Partners() {
  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-900">Our Partners</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md"
          >
            <Image
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              width={200}
              height={100}
              className="max-w-full h-auto"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

