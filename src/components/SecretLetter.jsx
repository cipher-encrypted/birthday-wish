import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Sparkles,
  RotateCcw,
  FastForward,
  Mail,
  Heart,
  ChevronDown,
} from 'lucide-react'
import { letterData } from '../data/birthdayData'

/* ─── Vintage Sakura Blossom Corner SVG ──────────────────────────────── */
function SakuraCorner({ className = '', style = {} }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M2 2C14 2 26 8 32 18C28 20 22 20 18 16C14 12 14 6 2 2Z"
        fill="#f8bbd0"
        fillOpacity="0.7"
      />
      <circle cx="16" cy="16" r="3" fill="#d4af7a" fillOpacity="0.8" />
      <path
        d="M2 2V24M2 2H24"
        stroke="#d4af7a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="2" fill="#f48fb1" />
    </svg>
  )
}

/* ─── Embossed Wax Seal SVG Component ────────────────────────────────── */
function WaxSeal({ onClick, isBreaking }) {
  return (
    <div
      onClick={onClick}
      className={`wax-seal-btn ${isBreaking ? 'scale-150 opacity-0' : ''}`}
      style={{
        width: '76px',
        height: '76px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 40,
        userSelect: 'none',
      }}
    >
      <svg
        width="76"
        height="76"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 6px 14px rgba(74, 0, 29, 0.45))',
        }}
      >
        <defs>
          <radialGradient
            id="waxGradient"
            cx="35%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#f06292" />
            <stop offset="30%" stopColor="#c2185b" />
            <stop offset="70%" stopColor="#880e4f" />
            <stop offset="100%" stopColor="#4a001d" />
          </radialGradient>

          <linearGradient
            id="goldEmboss"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fff2cf" />
            <stop offset="50%" stopColor="#d4af7a" />
            <stop offset="100%" stopColor="#9a7b45" />
          </linearGradient>
        </defs>

        {/* Organic scalloped wax edge */}
        <path
          d="M50 4 
             C62 3, 72 10, 80 18
             C89 26, 96 36, 96 50
             C96 64, 88 74, 80 82
             C71 91, 62 97, 50 96
             C37 97, 28 90, 20 82
             C11 74, 4 64, 4 50
             C4 37, 11 26, 20 18
             C28 10, 38 4, 50 4 Z"
          fill="url(#waxGradient)"
        />

        {/* Inner impressed circle */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="3"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="url(#goldEmboss)"
          strokeWidth="1.6"
          strokeDasharray="4 2"
        />

        {/* Sakura 5-Petal Flower Emblem */}
        <g
          transform="translate(50, 50)"
          fill="url(#goldEmboss)"
          stroke="rgba(74, 0, 29, 0.4)"
          strokeWidth="0.5"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}
        >
          {/* 5 Petals */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <path
              key={i}
              d="M0 0 C-6 -10, -10 -20, 0 -25 C10 -20, 6 -10, 0 0"
              transform={`rotate(${angle})`}
            />
          ))}
          {/* Flower Center Pistil */}
          <circle cx="0" cy="0" r="4.5" fill="#fff5d9" />
          <circle cx="0" cy="0" r="2" fill="#880e4f" />
        </g>
      </svg>
    </div>
  )
}

/* ─── Letter Stationery Component (Open State) ───────────────────────── */
function LetterStationery({
  onClose,
  showAllText,
  setShowAllText,
  currentParaIndex,
  onReplay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.94 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        maxWidth: '740px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Stationery Paper Container */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 253, 249, 0.97) 0%, rgba(254, 245, 248, 0.97) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: 'clamp(32px, 6vw, 64px) clamp(24px, 5vw, 56px)',
          border: '2px solid rgba(212, 175, 122, 0.55)',
          boxShadow:
            '0 25px 60px rgba(183, 110, 121, 0.22), 0 0 0 8px rgba(255, 255, 255, 0.6)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Watermark Sakura Blossom in Background */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18rem',
            opacity: 0.04,
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          🌸
        </div>

        {/* Vintage Sakura Corners */}
        <SakuraCorner
          style={{ position: 'absolute', top: '16px', left: '16px' }}
        />
        <SakuraCorner
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            transform: 'scaleX(-1)',
          }}
        />
        <SakuraCorner
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            transform: 'scaleY(-1)',
          }}
        />
        <SakuraCorner
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            transform: 'scale(-1, -1)',
          }}
        />

        {/* Top Controls Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '12px',
            borderBottom: '1px dashed rgba(244, 143, 177, 0.35)',
            paddingBottom: '16px',
          }}
        >
          {/* Stamp / Date pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#b76e79',
              background: 'rgba(244, 143, 177, 0.15)',
              padding: '4px 14px',
              borderRadius: '20px',
            }}
          >
            <Sparkles size={12} />
            <span>Special Delivery · Hand Inscribed</span>
          </div>

          {/* Quick Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!showAllText && (
              <button
                onClick={() => setShowAllText(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(212, 175, 122, 0.18)',
                  border: '1px solid rgba(212, 175, 122, 0.4)',
                  padding: '5px 12px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: '#9a7b45',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                title="Instantly reveal the complete letter"
              >
                <FastForward size={12} />
                <span>Show All</span>
              </button>
            )}

            <button
              onClick={onReplay}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(90, 48, 64, 0.06)',
                border: '1px solid rgba(90, 48, 64, 0.15)',
                padding: '5px 12px',
                borderRadius: '16px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: '#5a3040',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              title="Re-read line by line"
            >
              <RotateCcw size={12} />
              <span>Replay</span>
            </button>

            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(244, 143, 177, 0.2)',
                border: '1px solid rgba(244, 143, 177, 0.5)',
                padding: '5px 14px',
                borderRadius: '16px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: '#b76e79',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              title="Close and re-seal the envelope"
            >
              <Mail size={12} />
              <span>Reseal</span>
            </button>
          </div>
        </div>

        {/* ── Salutation ── */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#4a1525',
            fontStyle: 'italic',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}
        >
          {letterData.salutation}
        </motion.h3>

        {/* ── Paragraphs with Ink Reveal ── */}
        <div className="space-y-6" style={{ marginBottom: '36px' }}>
          {letterData.paragraphs.map((para, idx) => {
            const isVisible = showAllText || idx <= currentParaIndex

            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{
                  duration: 0.9,
                  ease: 'easeOut',
                }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.15rem, 2.4vw, 1.45rem)',
                  lineHeight: 1.85,
                  color: '#4e2233',
                  letterSpacing: '0.01em',
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow:
                    !showAllText && idx === currentParaIndex
                      ? '0 0 16px rgba(244, 143, 177, 0.8)'
                      : 'none',
                  transition: 'text-shadow 0.6s ease',
                }}
              >
                {para}
              </motion.p>
            )
          })}
        </div>

        {/* ── Sign-off & Signature ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            showAllText || currentParaIndex >= letterData.paragraphs.length - 1
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            marginTop: '36px',
            textAlign: 'right',
            paddingRight: '12px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: '#8a5070',
              marginBottom: '6px',
            }}
          >
            {letterData.signOff}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}
            className="shimmer-text"
          >
            {letterData.senderName}
          </p>
        </motion.div>

        {/* ── P.S. Note Box ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            showAllText || currentParaIndex >= letterData.paragraphs.length - 1
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.96 }
          }
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: '40px',
            background:
              'linear-gradient(135deg, rgba(252, 228, 236, 0.5) 0%, rgba(255, 248, 240, 0.6) 100%)',
            border: '1px dashed rgba(244, 143, 177, 0.6)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🎂</span>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#6d2f44',
              lineHeight: 1.5,
            }}
          >
            {letterData.psNote}
          </p>
        </motion.div>
      </div>

      {/* Quick Scroll Indicator to Next Stage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '32px',
        }}
      >
        <a
          href="#birthday-cake"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 143, 177, 0.4)',
            color: '#b76e79',
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(244, 143, 177, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          <span>Continue to Birthday Cake</span>
          <ChevronDown size={14} />
        </a>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main SecretLetter Component ────────────────────────────────────── */
export default function SecretLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBreaking, setIsBreaking] = useState(false)
  const [showAllText, setShowAllText] = useState(false)
  const [currentParaIndex, setCurrentParaIndex] = useState(0)

  // Typewriter / line-by-line reveal timer when open
  useEffect(() => {
    if (!isOpen || showAllText) return

    if (currentParaIndex < letterData.paragraphs.length - 1) {
      const timer = setTimeout(() => {
        setCurrentParaIndex((prev) => prev + 1)
      }, 1600)
      return () => clearTimeout(timer)
    }
  }, [isOpen, currentParaIndex, showAllText])

  const handleOpenEnvelope = (e) => {
    if (isOpen || isBreaking) return

    // Trigger golden and cherry blossom sparkle burst
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 55,
      spread: 75,
      origin: { x, y },
      colors: ['#f48fb1', '#d4af7a', '#ffb7c5', '#ce93d8', '#ffffff'],
      disableForReducedMotion: true,
    })

    setIsBreaking(true)

    // Sequence: seal breaks -> flap folds open -> stationery reveals
    setTimeout(() => {
      setIsOpen(true)
      setIsBreaking(false)
      setCurrentParaIndex(0)
    }, 700)
  }

  const handleCloseEnvelope = () => {
    setIsOpen(false)
    setIsBreaking(false)
    setShowAllText(false)
    setCurrentParaIndex(0)
  }

  const handleReplay = () => {
    setShowAllText(false)
    setCurrentParaIndex(0)
  }

  return (
    <section
      id="secret-letter"
      style={{
        padding: '80px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '56px' }}
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
            background: 'rgba(244, 143, 177, 0.15)',
            padding: '6px 18px',
            borderRadius: '50px',
            border: '1px solid rgba(244, 143, 177, 0.3)',
          }}
        >
          <span>💌</span>
          <span>Chapter III · The Secret Letter</span>
          <span>💌</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
          className="shimmer-text"
        >
          A Letter For You 💌
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
            fontStyle: 'italic',
            color: '#8a5070',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Written by hand, sealed with stardust, and preserved just for this
          moment. Click the wax seal to break and read...
        </p>

        {/* Small decorative divider */}
        <div
          style={{
            width: '80px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #b76e79, transparent)',
            margin: '24px auto 0',
          }}
        />
      </motion.div>

      {/* ── Main Interactive Area: Envelope or Opened Stationery ── */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ══════════════════════════════════════════════════════════════
              3D ENVELOPE (CLOSED STATE)
              ══════════════════════════════════════════════════════════════ */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: 1200,
            }}
          >
            {/* Tooltip prompt above the seal */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '8px 20px',
                borderRadius: '50px',
                boxShadow: '0 6px 20px rgba(183, 110, 121, 0.25)',
                border: '1px solid rgba(244, 143, 177, 0.4)',
                marginBottom: '28px',
                color: '#5a3040',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              <Heart size={14} className="fill-pink-400 text-pink-400" />
              <span>Click the wax seal to break &amp; open</span>
              <Sparkles size={14} color="#d4af7a" />
            </motion.div>

            {/* ── 3D Envelope Body Container ── */}
            <div
              style={{
                width: 'clamp(320px, 86vw, 520px)',
                height: 'clamp(210px, 52vw, 320px)',
                position: 'relative',
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 20px 40px rgba(90, 48, 64, 0.18))',
              }}
            >
              {/* Envelope Back Wall */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '16px',
                  background:
                    'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  overflow: 'hidden',
                }}
              >
                {/* Diagonal envelope crease lines */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Peeking Letter Paper Inside (slightly visible behind front flaps) */}
              <motion.div
                animate={
                  isBreaking
                    ? { y: -60, scale: 1.02 }
                    : { y: 0, scale: 1 }
                }
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '20px',
                  right: '20px',
                  bottom: '12px',
                  background: '#fffdf9',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(212, 175, 122, 0.4)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    width: '45%',
                    height: '8px',
                    borderRadius: '4px',
                    background: 'rgba(244, 143, 177, 0.3)',
                    marginBottom: '10px',
                  }}
                />
                <div
                  style={{
                    width: '85%',
                    height: '6px',
                    borderRadius: '3px',
                    background: 'rgba(90, 48, 64, 0.1)',
                    marginBottom: '6px',
                  }}
                />
                <div
                  style={{
                    width: '70%',
                    height: '6px',
                    borderRadius: '3px',
                    background: 'rgba(90, 48, 64, 0.1)',
                  }}
                />
              </motion.div>

              {/* Left Side Flap */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                  background:
                    'linear-gradient(135deg, rgba(254, 235, 242, 0.95), rgba(248, 187, 208, 0.95))',
                  zIndex: 10,
                  boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.04)',
                }}
              />

              {/* Right Side Flap */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                  background:
                    'linear-gradient(-135deg, rgba(254, 235, 242, 0.95), rgba(248, 187, 208, 0.95))',
                  zIndex: 10,
                  boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.04)',
                }}
              />

              {/* Bottom Flap */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)',
                  background:
                    'linear-gradient(0deg, rgba(244, 143, 177, 0.96), rgba(252, 228, 236, 0.96))',
                  zIndex: 15,
                  boxShadow: '0 -4px 12px rgba(90, 48, 64, 0.08)',
                }}
              />

              {/* Top Triangular Flap (Folds open on click) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '52%',
                  transformOrigin: 'top center',
                  transform: isBreaking
                    ? 'rotateX(-180deg)'
                    : 'rotateX(0deg)',
                  transition: 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 25,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    background:
                      'linear-gradient(180deg, rgba(255, 240, 246, 0.98), rgba(244, 143, 177, 0.98))',
                    boxShadow: '0 6px 16px rgba(90, 48, 64, 0.12)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.9)',
                  }}
                />
              </div>

              {/* ── Center Embossed Wax Seal ── */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -46%)',
                  zIndex: 35,
                }}
              >
                <WaxSeal
                  onClick={handleOpenEnvelope}
                  isBreaking={isBreaking}
                />
              </div>
            </div>

            {/* Hint text below */}
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: '#8a5070',
                marginTop: '32px',
                textAlign: 'center',
              }}
            >
              {letterData.envelopePrompt}
            </p>
          </motion.div>
        ) : (
          /* ══════════════════════════════════════════════════════════════
              EXPANDED LUXURY STATIONERY (OPEN STATE)
              ══════════════════════════════════════════════════════════════ */
          <LetterStationery
            key="stationery"
            onClose={handleCloseEnvelope}
            showAllText={showAllText}
            setShowAllText={setShowAllText}
            currentParaIndex={currentParaIndex}
            onReplay={handleReplay}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
