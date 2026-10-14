import { useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Sparkles,
  Flame,
  Wind,
  Mic,
  MicOff,
  RotateCcw,
  Gift,
  Heart,
} from 'lucide-react'
import { finaleData } from '../data/birthdayData'

/* ─── Web Audio API Sound Synthesizers ────────────────────────────────── */
function playBlowPuffSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()

    // Create a 0.25s puff of filtered noise for blowing sound
    const bufferSize = ctx.sampleRate * 0.25
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(320, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.25)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start()
    noise.stop(ctx.currentTime + 0.26)
  } catch (e) {
    // Graceful fallback
  }
}

function playCelebrationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()

    // Joyous celebratory arpeggio (C Major / Pentatonic shimmer)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51, 1567.98]
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.09
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, startTime)

      gain.gain.setValueAtTime(0.001, startTime)
      gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 1.25)
    })
  } catch (e) {
    // Graceful fallback
  }
}

/* ─── 3D Candle with Flickering Flame & Smoke Puff ────────────────────── */
function Candle({ position, isLit, onExtinguish, index, color }) {
  const flameRef = useRef()
  const lightRef = useRef()
  const smokeRef = useRef()
  const [smokeActive, setSmokeActive] = useState(false)

  // Trigger smoke puff when extinguished
  useEffect(() => {
    if (!isLit) {
      setSmokeActive(true)
      const timer = setTimeout(() => setSmokeActive(false), 1400)
      return () => clearTimeout(timer)
    }
  }, [isLit])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (isLit && flameRef.current) {
      // Natural organic flame dance
      flameRef.current.scale.y = 1 + Math.sin(t * 14 + index) * 0.14
      flameRef.current.scale.x = 1 + Math.cos(t * 12 + index) * 0.1
      flameRef.current.rotation.z = Math.sin(t * 8 + index) * 0.08
    }

    if (isLit && lightRef.current) {
      lightRef.current.intensity = 1.4 + Math.sin(t * 12 + index) * 0.35
    }

    if (smokeActive && smokeRef.current) {
      smokeRef.current.position.y += 0.012
      smokeRef.current.scale.x += 0.006
      smokeRef.current.scale.z += 0.006
    }
  })

  return (
    <group position={position}>
      {/* Candle cylinder body */}
      <mesh
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          if (isLit) onExtinguish(index)
        }}
        onPointerOver={() => {
          if (isLit) document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <cylinderGeometry args={[0.055, 0.055, 0.72, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Wick */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
        <meshBasicMaterial color="#2d131b" />
      </mesh>

      {/* 3D Flickering Flame */}
      {isLit && (
        <group
          ref={flameRef}
          position={[0, 0.52, 0]}
          onClick={(e) => {
            e.stopPropagation()
            onExtinguish(index)
          }}
        >
          {/* Flame outer glow mesh */}
          <mesh>
            <coneGeometry args={[0.065, 0.22, 12]} />
            <meshStandardMaterial
              color="#ffca28"
              emissive="#ff7043"
              emissiveIntensity={3}
              roughness={0.2}
            />
          </mesh>

          {/* Flame inner core */}
          <mesh position={[0, -0.04, 0]}>
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Warm Candle Light */}
          <pointLight
            ref={lightRef}
            color="#ffb74d"
            intensity={1.5}
            distance={2.8}
            decay={2}
          />
        </group>
      )}

      {/* Extinguished Smoke Puff */}
      {smokeActive && (
        <group ref={smokeRef} position={[0, 0.46, 0]}>
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#e0d4d8"
              transparent
              opacity={0.4}
              roughness={0.8}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

/* ─── 3D Procedural Birthday Cake Scene ───────────────────────────────── */
function CakeModel({ candles, onExtinguish }) {
  // Frosting pearls on rims
  const tier1Pearls = useMemo(() => {
    const pearls = []
    const count = 26
    const radius = 1.68
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      pearls.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
      })
    }
    return pearls
  }, [])

  const tier2Pearls = useMemo(() => {
    const pearls = []
    const count = 18
    const radius = 1.12
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      pearls.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
      })
    }
    return pearls
  }, [])

  // 5 Candle positions & pastel colors
  const candleConfigs = [
    { pos: [0, 2.38, 0], color: '#f48fb1' }, // Center
    { pos: [0, 2.38, 0.6], color: '#d4af7a' }, // Front
    { pos: [0, 2.38, -0.6], color: '#ce93d8' }, // Back
    { pos: [-0.6, 2.38, 0], color: '#ffb7c5' }, // Left
    { pos: [0.6, 2.38, 0], color: '#90caf9' }, // Right
  ]

  return (
    <group position={[0, -0.7, 0]}>
      {/* ── Stand Pedestal ── */}
      {/* Plate Top */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.1, 36]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>

      {/* Rose-Gold Plate Rim */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.045, 12, 36]} />
        <meshStandardMaterial
          color="#d4af7a"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Pedestal Stem */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 0.6, 24]} />
        <meshStandardMaterial
          color="#fff8f8"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Pedestal Foot Base */}
      <mesh position={[0, -0.68, 0]}>
        <cylinderGeometry args={[1.3, 1.4, 0.08, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.15}
          metalness={0.15}
        />
      </mesh>

      {/* ── Bottom Tier (Strawberry Cream Pink) ── */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[1.65, 1.7, 1.05, 36]} />
        <meshStandardMaterial
          color="#f8bbd0"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Frosting Pearls around bottom tier */}
      {tier1Pearls.map((p, i) => (
        <mesh key={i} position={[p.x, 1.15, p.z]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      ))}

      {/* ── Top Tier (Vanilla Velvet Ivory) ── */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[1.08, 1.14, 0.95, 36]} />
        <meshStandardMaterial
          color="#fffaf5"
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Frosting Pearls around top tier */}
      {tier2Pearls.map((p, i) => (
        <mesh key={i} position={[p.x, 2.1, p.z]}>
          <sphereGeometry args={[0.065, 10, 10]} />
          <meshStandardMaterial color="#fce4ec" roughness={0.2} />
        </mesh>
      ))}

      {/* Little 3D Sakura flower garnishes on the cake */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 1.72,
            0.65,
            Math.sin(angle) * 1.72,
          ]}
          rotation={[0, -angle, 0]}
        >
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshStandardMaterial color="#f48fb1" roughness={0.4} />
        </mesh>
      ))}

      {/* ── 5 Candles ── */}
      {candleConfigs.map((cfg, i) => (
        <Candle
          key={i}
          index={i}
          position={cfg.pos}
          color={cfg.color}
          isLit={candles[i]}
          onExtinguish={onExtinguish}
        />
      ))}
    </group>
  )
}

/* ─── Main BirthdayCakeFinale Component ──────────────────────────────── */
export default function BirthdayCakeFinale({ onReplayApp }) {
  // 5 Candles: true = lit, false = extinguished
  const [candles, setCandles] = useState([true, true, true, true, true])
  const [isMicListening, setIsMicListening] = useState(false)
  const [micError, setMicError] = useState(null)
  const [isBlowingBreath, setIsBlowingBreath] = useState(false)

  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const micStreamRef = useRef(null)
  const animFrameRef = useRef(null)
  const blowCooldownRef = useRef(false)

  const isAllBlown = candles.every((c) => !c)

  // Extinguish a single candle
  const handleExtinguish = (index) => {
    setCandles((prev) => {
      if (!prev[index]) return prev
      const next = [...prev]
      next[index] = false
      playBlowPuffSound()
      return next
    })
  }

  // Blow out all candles button
  const handleBlowAll = () => {
    candles.forEach((isLit, i) => {
      if (isLit) {
        setTimeout(() => {
          handleExtinguish(i)
        }, i * 160)
      }
    })
  }

  // Relight candles
  const handleRelight = () => {
    setCandles([true, true, true, true, true])
  }

  // Celebration Fireworks Trigger when all candles are out
  useEffect(() => {
    if (isAllBlown) {
      // 1. Play celebratory Web Audio chime
      playCelebrationChime()

      // 2. Wave 1: Confetti center burst
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f48fb1', '#d4af7a', '#ce93d8', '#ffb7c5', '#ffffff'],
      })

      // 3. Wave 2: Left and right celebration cannons
      const t1 = setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0.05, y: 0.65 },
          colors: ['#f48fb1', '#d4af7a', '#ff4081'],
        })
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 0.95, y: 0.65 },
          colors: ['#ce93d8', '#d4af7a', '#80deea'],
        })
      }, 400)

      // 4. Wave 3: Stardust sky shower
      const t2 = setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 120,
          origin: { y: 0.4 },
          shapes: ['circle'],
          colors: ['#ffffff', '#ffeb3b', '#f8bbd0', '#ffd700'],
        })
      }, 950)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [isAllBlown])

  // ── Real Microphone Blow Detection ──────────────────────────────────
  const toggleMicDetection = async () => {
    if (isMicListening) {
      // Stop listening
      cleanupMic()
      setIsMicListening(false)
      setIsBlowingBreath(false)
      return
    }

    try {
      setMicError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      })

      micStreamRef.current = stream
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      setIsMicListening(true)

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const detectBlow = () => {
        if (!analyserRef.current) return
        analyserRef.current.getByteFrequencyData(dataArray)

        // Breath / blow creates heavy low-frequency wind turbulence (bins 0-8, ~30Hz to 350Hz)
        let lowEnergy = 0
        for (let i = 0; i < 8; i++) {
          lowEnergy += dataArray[i]
        }
        const avgLowEnergy = lowEnergy / 8

        if (avgLowEnergy > 58) {
          setIsBlowingBreath(true)

          if (!blowCooldownRef.current) {
            blowCooldownRef.current = true

            // Extinguish next lit candle
            setCandles((prev) => {
              const nextLitIndex = prev.findIndex((c) => c === true)
              if (nextLitIndex !== -1) {
                const updated = [...prev]
                updated[nextLitIndex] = false
                playBlowPuffSound()
                return updated
              }
              return prev
            })

            // Cooldown between candles
            setTimeout(() => {
              blowCooldownRef.current = false
            }, 320)
          }
        } else {
          setIsBlowingBreath(false)
        }

        animFrameRef.current = requestAnimationFrame(detectBlow)
      }

      detectBlow()
    } catch (err) {
      console.warn('Microphone blow detection error:', err)
      setMicError('Mic access was not granted. You can still click or tap!')
      cleanupMic()
      setIsMicListening(false)
    }
  }

  const cleanupMic = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop())
      micStreamRef.current = null
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    analyserRef.current = null
  }

  useEffect(() => {
    return () => cleanupMic()
  }, [])

  return (
    <section
      id="birthday-cake"
      style={{
        padding: '80px 24px 120px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* ── Section Header (Transitions on Wish) ── */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ marginBottom: '40px' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.72rem, 1.5vw, 0.82rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#b76e79',
            marginBottom: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: isAllBlown
              ? 'rgba(212, 175, 122, 0.2)'
              : 'rgba(244, 143, 177, 0.15)',
            padding: '6px 20px',
            borderRadius: '50px',
            border: isAllBlown
              ? '1px solid rgba(212, 175, 122, 0.4)'
              : '1px solid rgba(244, 143, 177, 0.3)',
            transition: 'all 0.5s ease',
          }}
        >
          <span>{isAllBlown ? '🎉' : '🎂'}</span>
          <span>
            {isAllBlown
              ? 'Wish Granted · Happy Birthday!'
              : 'Chapter IV · The Grand Finale'}
          </span>
          <span>{isAllBlown ? '🌸' : '✨'}</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.3rem, 6.5vw, 4.4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
          className="shimmer-text"
        >
          {isAllBlown
            ? finaleData.postWishHeading
            : finaleData.preWishHeading}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
            fontStyle: 'italic',
            color: '#8a5070',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          {isAllBlown ? finaleData.postWishMessage : finaleData.preWishSubtext}
        </p>

        {/* Small decorative divider */}
        <div
          style={{
            width: '80px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #d4af7a, transparent)',
            margin: '24px auto 0',
          }}
        />
      </motion.div>

      {/* ── 3D Interactive Cake Canvas ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '420px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <Canvas
          camera={{ position: [0, 2.3, 5.4], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1.3} color="#ffebee" />
          <directionalLight
            position={[4, 8, 5]}
            intensity={1.5}
            color="#fff8f8"
            castShadow
          />
          <pointLight
            position={[-4, 3, -3]}
            intensity={0.6}
            color="#f8bbd0"
          />

          <CakeModel candles={candles} onExtinguish={handleExtinguish} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4.5}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate={!isAllBlown}
            autoRotateSpeed={0.8}
          />
        </Canvas>

        {/* Floating Rotation Hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50px',
            padding: '4px 14px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-body)',
            color: '#b76e79',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <span>Drag horizontally to rotate cake ↺</span>
        </div>
      </div>

      {/* ── Candle Status Badges & Controls ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          margin: '20px 0 28px',
          flexWrap: 'wrap',
        }}
      >
        {candles.map((isLit, i) => (
          <button
            key={i}
            onClick={() => handleExtinguish(i)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 14px',
              borderRadius: '50px',
              background: isLit
                ? 'rgba(255, 255, 255, 0.85)'
                : 'rgba(90, 48, 64, 0.08)',
              border: isLit
                ? '1px solid rgba(244, 143, 177, 0.6)'
                : '1px solid rgba(90, 48, 64, 0.15)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isLit ? '#e91e63' : '#8a5070',
              cursor: isLit ? 'pointer' : 'default',
              boxShadow: isLit
                ? '0 4px 12px rgba(244, 143, 177, 0.25)'
                : 'none',
              transition: 'all 0.25s ease',
            }}
            title={isLit ? `Click to blow out candle ${i + 1}` : 'Extinguished'}
          >
            {isLit ? <Flame size={13} color="#e91e63" /> : <Wind size={13} />}
            <span>Candle {i + 1}</span>
          </button>
        ))}
      </div>

      {/* ── Dual Blow Action Controls (Button + Mic) ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '36px',
        }}
      >
        {/* Blow Out All Button */}
        {!isAllBlown ? (
          <button
            onClick={handleBlowAll}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 26px',
              borderRadius: '50px',
              background:
                'linear-gradient(135deg, #f48fb1 0%, #d4af7a 100%)',
              color: '#ffffff',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(244, 143, 177, 0.45)',
              transition: 'all 0.3s ease',
            }}
          >
            <Wind size={16} />
            <span>Blow Out All Candles 🌬️</span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 26px',
              borderRadius: '50px',
              background:
                'linear-gradient(135deg, #fce4ec 0%, #fff8f8 100%)',
              color: '#b76e79',
              border: '1px solid rgba(244, 143, 177, 0.6)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(183, 110, 121, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            <Flame size={16} color="#e91e63" />
            <span>Relight Candles 🔥</span>
          </button>
        )}

        {/* Microphone Detection Toggle */}
        {!isAllBlown && (
          <button
            onClick={toggleMicDetection}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '50px',
              background: isMicListening
                ? isBlowingBreath
                  ? 'rgba(233, 30, 99, 0.25)'
                  : 'rgba(212, 175, 122, 0.2)'
                : 'rgba(255, 255, 255, 0.85)',
              color: '#5a3040',
              border: isMicListening
                ? '1px solid #d4af7a'
                : '1px solid rgba(90, 48, 64, 0.2)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
            }}
          >
            {isMicListening ? (
              <>
                <Mic size={15} color="#d4af7a" />
                <span>
                  {isBlowingBreath
                    ? '💨 Breath Detected!'
                    : '🎙️ Blow into mic active...'}
                </span>
              </>
            ) : (
              <>
                <MicOff size={15} />
                <span>🎙️ Enable Mic to Blow</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Mic permission message / error notice */}
      {micError && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: '#b76e79',
            marginBottom: '24px',
          }}
        >
          {micError}
        </p>
      )}

      {/* ── Celebration Reveal Card (When All Candles Are Blown) ── */}
      <AnimatePresence>
        {isAllBlown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              maxWidth: '680px',
              margin: '36px auto 0',
              padding: '40px 32px',
              background:
                'linear-gradient(135deg, rgba(255, 253, 249, 0.96) 0%, rgba(254, 245, 248, 0.96) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '26px',
              border: '2px solid rgba(212, 175, 122, 0.6)',
              boxShadow:
                '0 30px 70px rgba(183, 110, 121, 0.25), 0 0 40px rgba(244, 143, 177, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '16px',
                lineHeight: 1,
              }}
            >
              🌸 🎂 ✨
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: 700,
                color: '#5a3040',
                marginBottom: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              Your Wish is Sealed Into the Stars ✨
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                fontStyle: 'italic',
                color: '#703850',
                lineHeight: 1.7,
                maxWidth: '520px',
                margin: '0 auto 28px',
              }}
            >
              {finaleData.postWishMessage}
            </p>

            {/* Replay action buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={handleRelight}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 22px',
                  borderRadius: '50px',
                  background: 'rgba(244, 143, 177, 0.2)',
                  border: '1px solid rgba(244, 143, 177, 0.5)',
                  color: '#b76e79',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <RotateCcw size={14} />
                <span>Relight Candles</span>
              </button>

              {onReplayApp && (
                <button
                  onClick={onReplayApp}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 22px',
                    borderRadius: '50px',
                    background:
                      'linear-gradient(135deg, #f48fb1, #d4af7a)',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(244, 143, 177, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Gift size={14} />
                  <span>Replay Entire Journey 🎁</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Aesthetic Footer Credit ── */}
      <div
        style={{
          marginTop: '64px',
          borderTop: '1px solid rgba(244, 143, 177, 0.2)',
          paddingTop: '28px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: '#b76e79',
            opacity: 0.85,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span>{finaleData.footerCredit}</span>
          <Heart size={14} className="fill-pink-400 text-pink-400" />
        </p>
      </div>
    </section>
  )
}
