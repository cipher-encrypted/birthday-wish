import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Sparkles,
  Heart,
  Mail,
  MailOpen,
  Eye,
} from 'lucide-react'
import { memoriesData } from '../data/birthdayData'

/* ─── 3D Interactive Polaroid Card ───────────────────────────────────── */
function PolaroidCard({ memory, index, onSelect }) {
  const cardRef = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max tilt angle: 14 degrees
    const rotateX = ((y - centerY) / centerY) * -14
    const rotateY = ((x - centerX) / centerX) * 14

    setRotate({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
      className="w-full flex justify-center"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(memory)}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-12px) scale(1.02)`
            : `rotate(${memory.tilt}deg) translateY(0px)`,
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
            : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
        className="relative group w-full max-w-[340px]"
      >
        {/* ── Aesthetic Washi Tape Decor ── */}
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: `translateX(-50%) rotate(${memory.tilt * -1.5}deg)`,
            width: '110px',
            height: '26px',
            background: memory.tapeColor || 'rgba(244, 143, 177, 0.65)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            zIndex: 20,
            opacity: 0.9,
            borderRadius: '2px',
            clipPath:
              'polygon(0% 0%, 5% 100%, 0% 100%, 95% 100%, 100% 0%, 95% 0%)',
          }}
        />

        {/* ── Polaroid Frame ── */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '16px 16px 24px 16px',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: isHovered
              ? '0 24px 50px rgba(244, 143, 177, 0.35), 0 10px 20px rgba(90, 48, 64, 0.08)'
              : '0 12px 30px rgba(244, 143, 177, 0.18), 0 4px 12px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Dynamic Glare Reflection */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
              opacity: glare.opacity,
              transition: 'opacity 0.25s ease',
              zIndex: 15,
            }}
          />

          {/* Photo Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '100%', // 1:1 Square Polaroid photo
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#fce4ec',
              boxShadow: 'inset 0 0 12px rgba(0,0,0,0.08)',
            }}
          >
            <img
              src={memory.imageUrl}
              alt={memory.title}
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />

            {/* Subtle Vignette Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(90,48,64,0.3) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Chapter Tag Badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '30px',
                padding: '3px 10px',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#b76e79',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {memory.tag}
            </div>

            {/* Hover Quick Action Cue */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: isHovered
                  ? 'translateX(-50%) translateY(0)'
                  : 'translateX(-50%) translateY(12px)',
                opacity: isHovered ? 1 : 0,
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                color: '#5a3040',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <Eye size={12} color="#f48fb1" />
              <span>Tap to relive</span>
            </div>
          </div>

          {/* Polaroid Handwritten Caption Area */}
          <div style={{ marginTop: '14px', textAlign: 'left' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.72rem',
                  color: '#b76e79',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                <Calendar size={12} />
                <span>{memory.date}</span>
              </div>
              <Heart
                size={14}
                className={isHovered ? 'fill-pink-400 text-pink-400' : 'text-pink-300'}
                style={{ transition: 'all 0.3s ease' }}
              />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#5a3040',
                lineHeight: 1.25,
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}
            >
              {memory.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: '#8a5070',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {memory.caption}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Lightbox / Memory Modal ────────────────────────────────────────── */
function MemoryModal({ memory, onClose, onPrev, onNext }) {
  const [showSecret, setShowSecret] = useState(false)

  // Reset secret reveal when memory changes
  useEffect(() => {
    setShowSecret(false)
  }, [memory?.id])

  // ESC and Arrow keys listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  if (!memory) return null

  const handleRevealSecret = () => {
    if (!showSecret) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#f48fb1', '#d4af7a', '#ce93d8', '#ffffff', '#ffb7c5'],
      })
    }
    setShowSecret((prev) => !prev)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(35, 12, 22, 0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      {/* ── Modal Floating Navigation Arrows ── */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Previous memory"
        style={{
          position: 'absolute',
          left: 'max(16px, 3vw)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 110,
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
        }}
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Next memory"
        style={{
          position: 'absolute',
          right: 'max(16px, 3vw)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 110,
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
        }}
      >
        <ChevronRight size={26} />
      </button>

      {/* ── Modal Card ── */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.35), 0 0 40px rgba(244, 143, 177, 0.3)',
          position: 'relative',
        }}
        className="p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(90, 48, 64, 0.08)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#5a3040',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(244, 143, 177, 0.25)'
            e.currentTarget.style.transform = 'rotate(90deg)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(90, 48, 64, 0.08)'
            e.currentTarget.style.transform = 'rotate(0deg)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Large Image Frame */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(90, 48, 64, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              aspectRatio: '4 / 5',
              background: '#fce4ec',
            }}
          >
            <img
              src={memory.imageUrl}
              alt={memory.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Tag in modal */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50px',
                padding: '4px 14px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#b76e79',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              {memory.tag}
            </div>
          </div>

          {/* Memory Text & Details */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Date & Location Badges */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: '#b76e79',
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(244, 143, 177, 0.15)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}
                >
                  <Calendar size={13} />
                  <span>{memory.date}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: '#ce93d8',
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(206, 147, 216, 0.15)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}
                >
                  <MapPin size={13} />
                  <span>{memory.location}</span>
                </div>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  color: '#5a3040',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                {memory.title}
              </h2>

              {/* Heartfelt Caption */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: '#704058',
                  lineHeight: 1.75,
                  marginBottom: '24px',
                }}
              >
                {memory.caption}
              </p>
            </div>

            {/* Interactive Secret Note Section */}
            <div
              style={{
                marginTop: '12px',
                borderTop: '1px dashed rgba(244, 143, 177, 0.4)',
                paddingTop: '18px',
              }}
            >
              <button
                onClick={handleRevealSecret}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '50px',
                  background: showSecret
                    ? 'linear-gradient(135deg, #fce4ec, #fff8f8)'
                    : 'linear-gradient(135deg, #f48fb1, #b76e79)',
                  color: showSecret ? '#b76e79' : '#ffffff',
                  border: showSecret
                    ? '1px solid #f48fb1'
                    : 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: showSecret
                    ? 'none'
                    : '0 6px 20px rgba(244, 143, 177, 0.4)',
                  transition: 'all 0.3s ease',
                  marginBottom: '12px',
                }}
              >
                {showSecret ? <MailOpen size={16} /> : <Mail size={16} />}
                <span>
                  {showSecret
                    ? '💌 Hide Secret Note'
                    : '✨ Click to Reveal Secret Note'}
                </span>
                <Sparkles size={14} />
              </button>

              <AnimatePresence>
                {showSecret && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(254, 240, 245, 0.9) 0%, rgba(255, 248, 235, 0.9) 100%)',
                        border: '1px solid rgba(212, 175, 122, 0.5)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        boxShadow: '0 8px 24px rgba(212, 175, 122, 0.15)',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#d4af7a',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: '6px',
                        }}
                      >
                        <Sparkles size={14} />
                        <span>The Whispered Truth</span>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.05rem',
                          fontStyle: 'italic',
                          color: '#6d3b4d',
                          lineHeight: 1.6,
                        }}
                      >
                        "{memory.secretNote}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Memory Lane Component ─────────────────────────────────────── */
export default function MemoryLane() {
  const [selectedMemory, setSelectedMemory] = useState(null)

  const handleNext = () => {
    if (!selectedMemory) return
    const currentIndex = memoriesData.findIndex((m) => m.id === selectedMemory.id)
    const nextIndex = (currentIndex + 1) % memoriesData.length
    setSelectedMemory(memoriesData[nextIndex])
  }

  const handlePrev = () => {
    if (!selectedMemory) return
    const currentIndex = memoriesData.findIndex((m) => m.id === selectedMemory.id)
    const prevIndex = (currentIndex - 1 + memoriesData.length) % memoriesData.length
    setSelectedMemory(memoriesData[prevIndex])
  }

  return (
    <section
      id="memory-lane"
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
        style={{ textAlign: 'center', marginBottom: '64px' }}
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
          <span>🌸</span>
          <span>Chapter II · Memory Lane</span>
          <span>🌸</span>
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
          Our Favorite Chapters 🌸
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
          Every moment with you feels like pure magic. Hover, tilt, or tap on
          any polaroid to revisit the memory...
        </p>

        {/* Small subtle decorative underline */}
        <div
          style={{
            width: '80px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #f48fb1, transparent)',
            margin: '24px auto 0',
          }}
        />
      </motion.div>

      {/* ── Polaroid Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
        {memoriesData.map((memory, index) => (
          <PolaroidCard
            key={memory.id}
            memory={memory}
            index={index}
            onSelect={(m) => setSelectedMemory(m)}
          />
        ))}
      </div>

      {/* ── Memory Modal / Lightbox ── */}
      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
