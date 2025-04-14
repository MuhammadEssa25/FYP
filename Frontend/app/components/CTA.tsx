"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-blue-600 text-white p-12 rounded-xl shadow-lg text-center"
    >
      <h2 className="text-3xl font-bold mb-6">Ready to Experience 3D Shopping?</h2>
      <p className="text-xl mb-8">Discover our wide range of products with lifelike 3D visualization.</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg inline-flex items-center"
      >
        Start Shopping Now
        <ArrowRight className="ml-2" />
      </motion.button>
    </motion.div>
  )
}

