"use client"

import { motion } from "framer-motion"
import { CuboidIcon as Cube, Eye, RotateCcw } from "lucide-react"

export function Benefits3D() {
  const benefits = [
    {
      icon: <Cube className="w-16 h-16 text-blue-600" />,
      title: "Detailed 3D Models",
      description: "Examine products from every angle with high-fidelity 3D models.",
    },
    {
      icon: <Eye className="w-16 h-16 text-blue-600" />,
      title: "Enhanced Visualization",
      description: "Get a better understanding of product features and design.",
    },
    {
      icon: <RotateCcw className="w-16 h-16 text-blue-600" />,
      title: "Interactive Experience",
      description: "Rotate, zoom, and explore products in a fully interactive 3D environment.",
    },
  ]

  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold mb-16 text-center text-blue-900">The Power of 3D Visualization</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-6">{benefit.icon}</div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

