import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { RotateCw, Sparkles, Smile, ShieldAlert } from 'lucide-react'
import { insideJokesData } from '../data/birthdayData'

/* ─── 3D Flip Card Component ─────────────────────────────────────────── */
function FlipCard({ item, index }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = (e) => {
    e.stopPropagation()
    const nextFlipped = !isFlipped
    setIsFlipped(nextFlipped)

    // Trigger mini celebratory sparkle when revealing
    if (nextFlipped) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight

      confetti({
        particleCount: 25,
        spread: 55,
        origin: { x, y },
        colors: [item.themeColor, '#f48fb1', '#d4af7a', '#ffffff'],
        disableForReducedMotion: true,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
      className="w-full flex justify-center"
    >
      <div
        onClick={handleFlip}
        style={{
          width: '100%',
          maxWidth: '320px',
          height: '380px',
          position: 'relative',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        className="group"
      >
        {/* ══════════════════════════════════════════════════════════════
            FRONT FACE
            ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${item.themeColor}50`,
            boxShadow: `0 14px 35px ${item.themeColor}20, 0 4px 12px rgba(90, 48, 64, 0.05)`,
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
          className="transition-all duration-300 group-hover:shadow-2xl"
        >
          {/* Background ambient gradient glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${item.themeColor}35 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Top Row: Tag & Flip Hint */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: item.themeColor,
                  background: `${item.themeColor}18`,
                  padding: '4px 12px',
                  borderRadius: '30px',
                  border: `1px solid ${item.themeColor}35`,
                }}
              >
                {item.tag}
              </span>

              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#b76e79',
                  opacity: 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <RotateCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
              </span>
            </div>

            {/* Glowing Emoji Icon */}
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '20px',
                background: `linear-gradient(135deg, ${item.themeColor}25, rgba(255,255,255,0.8))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                marginBottom: '20px',
                boxShadow: `0 8px 20px ${item.themeColor}25`,
                border: '1px solid rgba(255,255,255,0.8)',
              }}
            >
              {item.emoji}
            </div>

            {/* Front Title */}
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 600,
                color: '#5a3040',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                marginBottom: '12px',
              }}
            >
              {item.frontTitle}
            </h3>

            {/* Front Teaser */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.84rem',
                color: '#8a5070',
                lineHeight: 1.6,
              }}
            >
              {item.frontTeaser}
            </p>
          </div>

          {/* Bottom Callout Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '50px',
              background: `linear-gradient(135deg, ${item.themeColor}20, rgba(255,255,255,0.9))`,
              border: `1px solid ${item.themeColor}40`,
              color: '#5a3040',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            <span>Tap to reveal memory</span>
            <RotateCw size={13} color={item.themeColor} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BACK FACE
            ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(65, 24, 38, 0.95) 0%, rgba(45, 16, 28, 0.96) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${item.themeColor}70`,
            boxShadow: `0 20px 45px rgba(0, 0, 0, 0.35), 0 0 25px ${item.themeColor}30`,
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#fff',
            overflow: 'hidden',
          }}
        >
          {/* Background subtle glowing pattern */}
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${item.themeColor}40 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          <div>
            {/* Top row: Secret stamp */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#d4af7a',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                <Sparkles size={13} />
                <span>Classified Truth</span>
              </div>
              <span style={{ fontSize: '1.4rem' }}>{item.emoji}</span>
            </div>

            {/* Back Story */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: '#ffebee',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              {item.backReveal}
            </p>

            {/* Verdict Quote */}
            <div
              style={{
                borderLeft: `2px solid ${item.themeColor}`,
                paddingLeft: '12px',
                marginTop: '12px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.98rem',
                  fontStyle: 'italic',
                  color: '#ffd1dc',
                  lineHeight: 1.5,
                }}
              >
                {item.verdict}
              </p>
            </div>
          </div>

          {/* Flip Back Cue */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.05em',
            }}
          >
            <span>Tap to flip back</span>
            <RotateCw size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Inside Jokes Section ──────────────────────────────────────── */
export default function InsideJokes() {
  return (
    <section
      id="inside-jokes"
      style={{
        padding: '60px 24px 100px',
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
            background: 'rgba(206, 147, 216, 0.15)',
            padding: '6px 18px',
            borderRadius: '50px',
            border: '1px solid rgba(206, 147, 216, 0.3)',
          }}
        >
          <span>✨</span>
          <span>Classified Archives · Bestie Secrets</span>
          <span>✨</span>
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
          Things Only We Understand ✨
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
          Some memories defy all laws of logic, physics, and dignity.
          Tap each card to flip and reveal the unvarnished truth...
        </p>

        {/* Small decorative divider */}
        <div
          style={{
            width: '80px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #ce93d8, transparent)',
            margin: '24px auto 0',
          }}
        />
      </motion.div>

      {/* ── Flip Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {insideJokesData.map((item, index) => (
          <FlipCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
