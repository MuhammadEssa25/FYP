"use client"

import { motion } from "framer-motion"

const historyTimeline = [
  { year: 2023, event: "Founded with a vision to revolutionize online shopping" },
  { year: 2024, event: "Launched our proprietary 3D visualization technology" },
  { year: 2025, event: "Expanded to serve over 100,000 customers worldwide" },
  { year: 2026, event: "Introduced AI-powered personalized shopping experiences" },
]

export function CompanyInfo() {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-lg mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Founded in 2023, our e-commerce platform was born from a vision to transform online shopping. We recognized
          the gap between digital browsing and the tactile experience of in-store shopping. Our solution? Cutting-edge
          3D visualization technology that brings products to life on your screen.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Since our inception, we've been dedicated to pushing the boundaries of what's possible in e-commerce. Our team
          of innovators and tech enthusiasts work tirelessly to create an unparalleled shopping experience that combines
          the convenience of online retail with the immersive nature of in-person shopping.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white p-8 rounded-xl shadow-lg mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          We're on a mission to provide the most immersive and informative online shopping experience possible. By
          leveraging state-of-the-art 3D technology, we're bridging the gap between digital and physical retail,
          empowering our customers to make confident, informed purchasing decisions from the comfort of their homes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Our Journey</h2>
        <div className="space-y-6">
          {historyTimeline.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-24 font-bold text-blue-600">{item.year}</div>
              <div className="flex-grow pl-4 border-l-2 border-blue-200">
                <p className="text-gray-700">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

