"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="E-commerce hero"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Revolutionizing Online Shopping</h1>
          <p className="text-xl md:text-2xl text-blue-100">Experience products in stunning 3D detail before you buy</p>
        </div>
      </div>
    </div>
  )
}

