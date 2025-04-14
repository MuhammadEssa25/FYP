"use client"

import { motion } from "framer-motion"
import { CuboidIcon as Cube, Code, Server, ShoppingCart } from "lucide-react"

const technologies = [
  {
    name: "3D Rendering Engine",
    icon: Cube,
    description: "Proprietary 3D visualization technology for lifelike product representations",
  },
  { name: "Frontend Framework", icon: Code, description: "React and Next.js for a fast, responsive user interface" },
  {
    name: "Backend Infrastructure",
    icon: Server,
    description: "Scalable cloud architecture to handle millions of products and users",
  },
  {
    name: "E-commerce Platform",
    icon: ShoppingCart,
    description: "Custom-built platform for seamless transactions and inventory management",
  },
]

export function TechStack() {
  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-900">Our Technology Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg flex items-start"
          >
            <tech.icon className="w-12 h-12 text-blue-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{tech.name}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

