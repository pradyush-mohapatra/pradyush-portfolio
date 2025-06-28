import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Pencil() {
  const ref = useRef()
  const velocity = useRef(0)
  const lastMouseY = useRef(null)
  const lastTime = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = performance.now()

      if (lastMouseY.current !== null && lastTime.current !== null) {
        const dy = e.clientY - lastMouseY.current
        const dt = now - lastTime.current

        const speed = dy / dt // how fast cursor moved up/down
        velocity.current += speed * 0.3
      }

      lastMouseY.current = e.clientY
      lastTime.current = now
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += velocity.current // ⬅️ vertical rotation
      velocity.current *= 0.7 // damping
    }
  })

  return (
    <mesh ref={ref} rotation={[0, 0, 0]} scale={[2, 2, 2]}>
      {/* Horizontal pencil with longer length */}
      <cylinderGeometry args={[0.1, 0.1, 6, 32]} />
      <meshStandardMaterial color="#ffaa00" />
    </mesh>
  )
}

export default function PencilModel() {
  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <Pencil />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
