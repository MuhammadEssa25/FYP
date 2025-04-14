"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How does the 3D product visualization work?",
    answer:
      "Our 3D product visualization uses advanced rendering technology to create lifelike, interactive models of products. Users can rotate, zoom, and explore products from every angle, providing a comprehensive view similar to examining items in person.",
  },
  {
    question: "Is the 3D feature available for all products?",
    answer:
      "We're continuously expanding our 3D catalog. Currently, most of our featured products and new arrivals are available in 3D. We're working diligently to make this feature available for our entire inventory.",
  },
  {
    question: "Can I use the 3D view on my mobile device?",
    answer:
      "Our 3D viewer is fully optimized for mobile devices. You can interact with 3D products using touch gestures on your smartphone or tablet.",
  },
  {
    question: "How accurate are the 3D models compared to the actual products?",
    answer:
      "We strive for the highest accuracy in our 3D models. Our team meticulously creates each model based on precise measurements and details of the actual product to ensure what you see online closely matches what you'll receive.",
  },
]

export function FAQ() {
  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-900">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgb(239 246 255)" : "rgb(255 255 255)" }}
      className="border border-blue-200 rounded-lg overflow-hidden"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full p-4 text-left">
        <span className="font-semibold text-blue-800">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-4 text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

