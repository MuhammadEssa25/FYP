"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content: "The 3D product views are game-changing! I can see exactly how clothes will look before I buy.",
  },
  {
    name: "Mike Chen",
    role: "Tech Reviewer",
    content: "This e-commerce platform sets a new standard for online shopping with its immersive 3D technology.",
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Designer",
    content: "Being able to visualize furniture in 3D has made my job so much easier. It's an incredible tool!",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold mb-16 text-center text-blue-900">What Our Customers Say</h2>
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-12 rounded-xl shadow-xl text-center"
          >
            <p className="text-2xl text-gray-700 mb-8">"{testimonials[currentIndex].content}"</p>
            <p className="font-semibold text-xl text-blue-600">{testimonials[currentIndex].name}</p>
            <p className="text-gray-500">{testimonials[currentIndex].role}</p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevTestimonial}
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

