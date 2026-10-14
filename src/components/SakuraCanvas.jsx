import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Individual Sakura Petal ─────────────────────────────────────────── */
function SakuraPetal({ position, rotation, scale, speed, swayFactor, index }) {
  const meshRef = useRef()
  const initialY = useRef(position[1])
  const timeOffset = useRef(index * 0.37)

  // Petal shape using a custom geometry (heart-like rounded shape)
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    // Soft rounded petal shape
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.3, 0.1, 0.5, 0.4, 0.4, 0.6)
    shape.bezierCurveTo(0.3, 0.9, 0.0, 1.0, 0, 0.8)
    shape.bezierCurveTo(-0.05, 1.0, -0.35, 0.85, -0.4, 0.6)
    shape.bezierCurveTo(-0.5, 0.4, -0.3, 0.1, 0, 0)
    const geo = new THREE.ShapeGeometry(shape, 8)
    return geo
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime + timeOffset.current

    // Falling
    meshRef.current.position.y -= speed * 0.008
    if (meshRef.current.position.y < -12) {
      meshRef.current.position.y = initialY.current + Math.random() * 4
      meshRef.current.position.x = (Math.random() - 0.5) * 30
    }

    // Swaying
    meshRef.current.position.x += Math.sin(t * swayFactor) * 0.008

    // Gentle rotation
    meshRef.current.rotation.z += 0.006 * (index % 2 === 0 ? 1 : -1)
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.3

    // Mouse wind effect (via userData)
    const wind = state.scene.userData.wind || { x: 0, y: 0 }
    meshRef.current.position.x += wind.x * 0.003
    meshRef.current.position.y += wind.y * 0.001
  })

  // Petal color variations - soft sakura palette
  const color = useMemo(() => {
    const colors = [
      '#ffb7c5', '#ffc8d5', '#f48fb1', '#ffd1dc',
      '#ffaec0', '#ffe4ec', '#f9a8c9', '#ffc0cb',
      '#ffb3c6', '#ffd6e0',
    ]
    return colors[index % colors.length]
  }, [index])

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      geometry={petalGeometry}
    >
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.7 + (index % 3) * 0.1}
        roughness={0.3}
        metalness={0.05}
      />
    </mesh>
  )
}

/* ─── Bokeh Sparkle ───────────────────────────────────────────────────── */
function BokehSparkle({ position, size, index }) {
  const meshRef = useRef()
  const timeOffset = useRef(index * 0.53)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime + timeOffset.current
    meshRef.current.material.opacity = 0.15 + Math.sin(t * 1.5) * 0.12
    meshRef.current.scale.setScalar(size + Math.sin(t * 2) * size * 0.2)
    meshRef.current.position.y += Math.sin(t * 0.3) * 0.003
    meshRef.current.position.x += Math.cos(t * 0.2) * 0.002
  })

  const color = useMemo(() => {
    const colors = ['#fff0f5', '#ffe8ef', '#ffd6e0', '#fff8e1', '#f8e4ff']
    return colors[index % colors.length]
  }, [index])

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        roughness={1}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

/* ─── Wind / Mouse Effect ─────────────────────────────────────────────── */
function WindController() {
  const { scene } = useThree()
  const windRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useFrame(() => {
    windRef.current.x += (targetRef.current.x - windRef.current.x) * 0.03
    windRef.current.y += (targetRef.current.y - windRef.current.y) * 0.03
    scene.userData.wind = windRef.current
  })

  return null
}

/* ─── Scene Innards ───────────────────────────────────────────────────── */
function SakuraScene() {
  // Generate 280 petals
  const petals = useMemo(() => {
    return Array.from({ length: 280 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30,
        Math.random() * 24 - 6,
        (Math.random() - 0.5) * 16,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: 0.06 + Math.random() * 0.12,
      speed: 0.4 + Math.random() * 0.8,
      swayFactor: 0.3 + Math.random() * 0.7,
    }))
  }, [])

  // 40 bokeh sparkles
  const sparkles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12 - 2,
      ],
      size: 0.15 + Math.random() * 0.5,
    }))
  }, [])

  return (
    <>
      <WindController />

      {/* Sky gradient via background color */}
      <color attach="background" args={['#fce4ec']} />

      {/* Ambient soft light */}
      <ambientLight intensity={1.2} color="#ffe8ef" />

      {/* Warm key light from above */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        color="#ffd6e0"
        castShadow
      />

      {/* Cool fill from left */}
      <pointLight position={[-8, 2, 4]} intensity={0.5} color="#e1bee7" />

      {/* Warm accent from right */}
      <pointLight position={[8, -2, 3]} intensity={0.4} color="#ffc0cb" />

      {/* Sakura petals */}
      {petals.map((p) => (
        <SakuraPetal
          key={p.id}
          index={p.id}
          position={p.position}
          rotation={p.rotation}
          scale={[p.scale, p.scale, p.scale]}
          speed={p.speed}
          swayFactor={p.swayFactor}
        />
      ))}

      {/* Bokeh sparkles */}
      {sparkles.map((s) => (
        <BokehSparkle
          key={s.id}
          index={s.id}
          position={s.position}
          size={s.size}
        />
      ))}
    </>
  )
}

/* ─── Main Export ─────────────────────────────────────────────────────── */
export default function SakuraCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: 'linear-gradient(160deg, #fce4ec 0%, #fff8f8 45%, #f3e5f5 100%)',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SakuraScene />
      </Canvas>
    </div>
  )
}
