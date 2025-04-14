"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const teamMembers = [
  { name: "Naheel", role: "Head IT", image: "/placeholder.svg?height=300&width=300" },
  { name: "Essa", role: "Head of Backend", image: "/placeholder.svg?height=300&width=300" },
  { name: "Abdur Rehman ", role: "Head of Product", image: "/placeholder.svg?height=300&width=300" },
  { name: "Muhammad Abdullah", role: "Data base ", image: "/placeholder.svg?height=300&width=300" },
]

export function TeamMembers() {
  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-900">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

