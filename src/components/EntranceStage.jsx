import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GiftBoxCanvas from './GiftBoxCanvas'
import confetti from 'canvas-confetti'

/* ─── Floating Badge ─────────────────────────────────────────────────── */
function FloatingBadge({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          <div
            className="glass"
            style={{
              padding: '14px 32px',
              borderRadius: '50px',
              animation: 'pulse-glow 3s ease-in-out infinite',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                fontStyle: 'italic',
                color: '#7b3f5e',
                letterSpacing: '0.02em',
              }}
            >
              For Someone Truly Special 🌸
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)',
                color: '#a05070',
                marginTop: '4px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              ✨ Click the gift to unwrap your surprise ✨
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Particle Burst Overlay (canvas-confetti) ───────────────────────── */
function triggerConfettiBurst() {
  const defaults = {
    origin: { x: 0.5, y: 0.5 },
    zIndex: 999,
  }

  // Sakura petals
  confetti({
    ...defaults,
    particleCount: 120,
    spread: 100,
    startVelocity: 40,
    colors: ['#ffb7c5', '#f48fb1', '#ffd6e0', '#ffc0cb', '#fff0f5'],
    shapes: ['circle'],
    scalar: 0.9,
  })

  // Golden sparkles
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 60,
      spread: 120,
      startVelocity: 30,
      colors: ['#ffd700', '#d4af7a', '#fffacd', '#ffec8b'],
      shapes: ['star'],
      scalar: 0.7,
    })
  }, 200)

  // Second wave
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 80,
      startVelocity: 50,
      colors: ['#ffb7c5', '#ce93d8', '#f48fb1', '#fff0f5'],
      shapes: ['circle'],
      scalar: 0.6,
      angle: 90,
    })
  }, 450)
}

/* ─── Opening Flash Overlay ──────────────────────────────────────────── */
function FlashOverlay({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(255,240,245,0.95) 0%, rgba(252,228,236,0.5) 60%, transparent 100%)',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  )
}

/* ─── Main Entrance Stage ─────────────────────────────────────────────── */
export default function EntranceStage({ onComplete }) {
  const [lidOpen, setLidOpen] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [badgeVisible, setBadgeVisible] = useState(true)
  const hasUnwrapped = useRef(false)

  // Delay badge appearance
  useEffect(() => {
    setBadgeVisible(false)
    const t = setTimeout(() => setBadgeVisible(true), 600)
    return () => clearTimeout(t)
  }, [])

  const handleUnwrap = useCallback(() => {
    if (hasUnwrapped.current) return
    hasUnwrapped.current = true

    setLidOpen(true)
    setBadgeVisible(false)
    setShowFlash(true)

    // Confetti burst
    setTimeout(triggerConfettiBurst, 300)

    // Second burst
    setTimeout(triggerConfettiBurst, 900)

    // Transition to main stage
    setTimeout(() => {
      onComplete()
    }, 2600)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Title above */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
          whiteSpace: 'nowrap',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            color: '#c06080',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          🌸 &nbsp; A Gift Made With Love &nbsp; 🌸
        </p>
      </motion.div>

      {/* 3D Gift Box Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.3 }}
        style={{
          width: 'min(520px, 85vw)',
          height: 'min(520px, 60vh)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <GiftBoxCanvas onUnwrap={handleUnwrap} lidOpen={lidOpen} />
      </motion.div>

      {/* Floating badge */}
      <FloatingBadge visible={badgeVisible && !lidOpen} />

      {/* Flash effect */}
      <FlashOverlay visible={showFlash} />

      {/* Decorative corner petals */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', pointerEvents: 'none' }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  )
}
