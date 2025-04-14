"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html, useProgress } from "@react-three/drei"

function Model() {
  const { scene } = useGLTF("/assets/3d/tshirt.glb")
  return <primitive object={scene} scale={2} />
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-blue-600 font-semibold">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  )
}

export function Product3D() {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <Environment preset="city" /> {/* ✅ FIXED - moved outside of Suspense */}
        <OrbitControls autoRotate={autoRotate} />
      </Canvas>
      <button
        className="absolute bottom-6 right-6 bg-white text-blue-700 px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors font-semibold"
        onClick={() => setAutoRotate(!autoRotate)}
      >
        {autoRotate ? "Pause Rotation" : "Resume Rotation"}
      </button>
    </div>
  )
}

// Ensure to preload the model for performance optimization
useGLTF.preload("/assets/3d/tshirt.glb")
