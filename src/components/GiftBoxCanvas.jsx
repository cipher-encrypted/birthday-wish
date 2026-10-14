import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

/* ─── Ribbon Strip (horizontal or vertical) ──────────────────────────── */
function RibbonStrip({ isVertical, lidOpen, lidY }) {
  const meshRef = useRef()

  useFrame(() => {
    if (!meshRef.current) return
    if (lidOpen) {
      meshRef.current.material.opacity = Math.max(0, meshRef.current.material.opacity - 0.04)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={isVertical ? [0, 0.51, 0] : [0, 0.51, 0]}
      rotation={isVertical ? [0, 0, 0] : [0, Math.PI / 2, 0]}
    >
      <boxGeometry args={isVertical ? [0.12, 1.02, 2.02] : [2.02, 1.02, 0.12]} />
      <meshStandardMaterial
        color="#c0392b"
        roughness={0.2}
        metalness={0.6}
        transparent
        opacity={1}
      />
    </mesh>
  )
}

/* ─── Bow Loop ────────────────────────────────────────────────────────── */
function BowLoop({ position, rotation, lidOpen }) {
  const meshRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    timeRef.current += delta
    if (lidOpen) {
      // Fly away
      meshRef.current.position.y += 0.08
      meshRef.current.position.x += (Math.random() - 0.5) * 0.1
      meshRef.current.rotation.z += 0.15
      meshRef.current.material.opacity = Math.max(0, meshRef.current.material.opacity - 0.03)
    } else {
      // Subtle pulse
      meshRef.current.scale.setScalar(1 + Math.sin(timeRef.current * 3) * 0.03)
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[0.2, 0.07, 8, 16, Math.PI]} />
      <meshStandardMaterial
        color="#e74c3c"
        roughness={0.15}
        metalness={0.7}
        emissive="#8b0000"
        emissiveIntensity={0.2}
        transparent
        opacity={1}
      />
    </mesh>
  )
}

/* ─── Gift Lid ────────────────────────────────────────────────────────── */
function GiftLid({ lidOpen }) {
  const lidRef = useRef()
  const startedRef = useRef(false)

  useFrame(() => {
    if (!lidRef.current) return
    if (lidOpen && !startedRef.current) {
      startedRef.current = true
      gsap.to(lidRef.current.position, {
        y: 4,
        duration: 0.8,
        ease: 'back.out(1.2)',
      })
      gsap.to(lidRef.current.rotation, {
        x: -0.5,
        z: 0.8,
        duration: 0.8,
        ease: 'power2.out',
      })
      gsap.to(lidRef.current, {
        'material.opacity': 0,
        delay: 0.4,
        duration: 0.5,
      })
    }
  })

  return (
    <group ref={lidRef} position={[0, 1.02, 0]}>
      {/* Lid base */}
      <RoundedBox args={[2.1, 0.25, 2.1]} radius={0.06} smoothness={4} position={[0, 0.05, 0]}>
        <meshStandardMaterial
          color="#f8bbd0"
          roughness={0.25}
          metalness={0.15}
          transparent
          opacity={1}
        />
      </RoundedBox>

      {/* Lid rim (slight overhang) */}
      <mesh position={[0, -0.07, 0]}>
        <boxGeometry args={[2.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#f48fb1" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Bow - two loops + center knot */}
      <BowLoop
        lidOpen={lidOpen}
        position={[-0.22, 0.28, 0]}
        rotation={[0, 0, -0.4]}
      />
      <BowLoop
        lidOpen={lidOpen}
        position={[0.22, 0.28, 0]}
        rotation={[0, 0, 0.4]}
      />
      <BowLoop
        lidOpen={lidOpen}
        position={[0, 0.28, -0.22]}
        rotation={[0.4, 0, 0]}
      />
      <BowLoop
        lidOpen={lidOpen}
        position={[0, 0.28, 0.22]}
        rotation={[-0.4, 0, 0]}
      />

      {/* Center knot */}
      <mesh position={[0, 0.33, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color="#c0392b"
          roughness={0.1}
          metalness={0.8}
          emissive="#8b0000"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Vertical ribbon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.3, 2.15]} />
        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.15, 0.3, 0.1]} />
        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  )
}

/* ─── Inner Glow (visible after lid opens) ───────────────────────────── */
function InnerGlow({ lidOpen }) {
  const meshRef = useRef()

  useFrame(() => {
    if (!meshRef.current) return
    if (lidOpen) {
      meshRef.current.material.emissiveIntensity = Math.min(
        3,
        meshRef.current.material.emissiveIntensity + 0.1
      )
      meshRef.current.material.opacity = Math.min(1, meshRef.current.material.opacity + 0.05)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshStandardMaterial
        color="#fff0f5"
        emissive="#f48fb1"
        emissiveIntensity={0}
        transparent
        opacity={0}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

/* ─── Gift Box Body ───────────────────────────────────────────────────── */
function GiftBox({ onUnwrap, lidOpen }) {
  const groupRef = useRef()
  const timeRef = useRef(0)
  const { camera } = useThree()
  const isHovered = useRef(false)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta

    if (!lidOpen) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(timeRef.current * 0.8) * 0.2
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.4) * 0.08

      // Hover scale
      const targetScale = isHovered.current ? 1.06 : 1.0
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.08
      )
    } else {
      // After opening: zoom camera in
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4, 0.02)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Box body */}
      <RoundedBox
        args={[2, 1.1, 2]}
        radius={0.06}
        smoothness={4}
        position={[0, 0, 0]}
        onClick={onUnwrap}
        onPointerOver={() => { isHovered.current = true; document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { isHovered.current = false; document.body.style.cursor = 'default' }}
      >
        {/* Pastel pink satin */}
        <meshStandardMaterial
          color="#fce4ec"
          roughness={0.18}
          metalness={0.12}
          emissive="#f9a8d4"
          emissiveIntensity={0.05}
        />
      </RoundedBox>

      {/* Box side ribbons */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.1, 1.12, 2.04]} />
        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.04, 1.12, 0.1]} />
        <meshStandardMaterial color="#c0392b" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Decorative dots on box */}
      {[[-0.6, 0, 1.01], [0.6, 0, 1.01], [-0.6, 0, -1.01], [0.6, 0, -1.01]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <circleGeometry args={[0.06, 12]} />
          <meshStandardMaterial color="#f48fb1" roughness={0.3} metalness={0.4} />
        </mesh>
      ))}

      <GiftLid lidOpen={lidOpen} />
      <InnerGlow lidOpen={lidOpen} />

      {/* Gentle point light inside */}
      <pointLight position={[0, 0.5, 0]} intensity={lidOpen ? 3 : 0.3} color="#ff8fab" distance={4} />
    </group>
  )
}

/* ─── Burst Particles (after opening) ────────────────────────────────── */
function BurstParticles({ active }) {
  const count = 80
  const meshRefs = useRef([])
  const velocities = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.18,
      y: Math.random() * 0.16 + 0.05,
      z: (Math.random() - 0.5) * 0.18,
      rx: (Math.random() - 0.5) * 0.2,
      rz: (Math.random() - 0.5) * 0.2,
    }))
  )
  const activeRef = useRef(false)

  useFrame(() => {
    if (!active && !activeRef.current) return
    if (active) activeRef.current = true

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const v = velocities.current[i]
      mesh.position.x += v.x
      mesh.position.y += v.y
      mesh.position.z += v.z
      mesh.rotation.x += v.rx
      mesh.rotation.z += v.rz
      v.y -= 0.004 // gravity
      mesh.material.opacity = Math.max(0, mesh.material.opacity - 0.012)
    })
  })

  if (!active) return null

  const colors = ['#ffb7c5', '#ffd700', '#f48fb1', '#ce93d8', '#fff0f5', '#ffc0cb', '#fffacd']

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 0.5,
            1.2 + Math.random() * 0.3,
            (Math.random() - 0.5) * 0.5,
          ]}
        >
          {i % 3 === 0 ? (
            <sphereGeometry args={[0.05, 6, 6]} />
          ) : (
            <boxGeometry args={[0.08, 0.08, 0.02]} />
          )}
          <meshStandardMaterial
            color={colors[i % colors.length]}
            emissive={colors[i % colors.length]}
            emissiveIntensity={0.5}
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </>
  )
}

/* ─── Scene Wrapper ───────────────────────────────────────────────────── */
function GiftScene({ onUnwrap, lidOpen }) {
  return (
    <>
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={1.5} color="#ffe8ef" />
      <directionalLight position={[4, 8, 4]} intensity={1} color="#ffd6e0" castShadow />
      <pointLight position={[-5, 3, 3]} intensity={0.6} color="#e1bee7" />
      <pointLight position={[5, -2, 3]} intensity={0.5} color="#ffc8d5" />

      <GiftBox onUnwrap={onUnwrap} lidOpen={lidOpen} />
      <BurstParticles active={lidOpen} />
    </>
  )
}

/* ─── Main Export ─────────────────────────────────────────────────────── */
export default function GiftBoxCanvas({ onUnwrap, lidOpen }) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <GiftScene onUnwrap={onUnwrap} lidOpen={lidOpen} />
    </Canvas>
  )
}
