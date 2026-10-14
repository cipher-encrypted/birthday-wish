import { useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Stage Placeholder Card ─────────────────────────────────────────── */
function StageCard({ number, icon, title, description, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: 'easeOut', delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ cursor: 'default' }}
    >
      <div
        className="glass"
        style={{
          padding: '48px 40px',
          borderRadius: '28px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${color}40`,
          boxShadow: `0 8px 40px ${color}20, 0 0 0 1px ${color}15`,
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, ${color}18 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Stage number */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            color: `${color}99`,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Stage {number}
        </div>

        {/* Icon */}
        <div style={{ fontSize: '3.5rem', marginBottom: '20px', lineHeight: 1 }}>
          {icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
            fontWeight: 600,
            color: '#5a3040',
            marginBottom: '12px',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
            color: '#8a5070',
            lineHeight: 1.7,
            maxWidth: '300px',
            margin: '0 auto 24px',
          }}
        >
          {description}
        </p>

        {/* Coming soon pill */}
        <div
          style={{
            display: 'inline-block',
            padding: '6px 18px',
            borderRadius: '50px',
            background: `${color}20`,
            border: `1px solid ${color}50`,
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: `${color}dd`,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          ✨ Coming Soon
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Floating Decorative Elements ───────────────────────────────────── */
function FloatingPetal({ top, left, delay, size }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.7, 0.5, 0.7], scale: 1 }}
      transition={{ duration: 2, delay, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top,
        left,
        fontSize: size,
        pointerEvents: 'none',
        animation: `float ${6 + Math.random() * 4}s ease-in-out ${delay}s infinite`,
        zIndex: 0,
      }}
    >
      🌸
    </motion.div>
  )
}

/* ─── Main Stage ──────────────────────────────────────────────────────── */
export default function MainStage() {
  return (
    <div
      className="main-scroll"
      style={{ position: 'relative', zIndex: 10 }}
    >
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative floating petals */}
        <FloatingPetal top="10%" left="5%" delay={0.3} size="2rem" />
        <FloatingPetal top="20%" left="88%" delay={0.7} size="1.5rem" />
        <FloatingPetal top="70%" left="3%" delay={1.1} size="1.8rem" />
        <FloatingPetal top="80%" left="92%" delay={0.5} size="2.2rem" />
        <FloatingPetal top="50%" left="95%" delay={1.4} size="1.3rem" />

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#c06080',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ opacity: 0.5 }}>— — —</span>
          🌸 A Dreamy Celebration 🌸
          <span style={{ opacity: 0.5 }}>— — —</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1,
          }}
          className="shimmer-text"
        >
          Happy Birthday,
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1,
            fontStyle: 'italic',
          }}
          className="shimmer-text"
        >
          Bestie ✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            fontStyle: 'italic',
            color: '#9e6080',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '48px',
          }}
        >
          Today, the universe pauses to celebrate you — the most radiant soul it ever conjured.
          This little world was built entirely for you. 🌸
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.75 }}
          style={{
            width: '160px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #f48fb1, #d4af7a, #f48fb1, transparent)',
            margin: '0 auto 56px',
            borderRadius: '2px',
          }}
        />

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: '#c06080',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.7,
            }}
          >
            Scroll to explore
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '1.2rem' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stages 2, 3, 4 Placeholder Cards ─────────────────────────── */}
      <section
        style={{
          padding: '40px 24px 100px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 600,
              color: '#5a3040',
              letterSpacing: '-0.01em',
              marginBottom: '12px',
            }}
          >
            Your Enchanted Journey 🗺️
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
              color: '#9e6080',
              maxWidth: '440px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Three magical chapters await — each crafted with love just for you.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          <StageCard
            number="2"
            icon="📸"
            title="Floating Memory Lane"
            description="3D tilt-cards filled with your most cherished memories, inside jokes, and the moments that made us us."
            delay={0.1}
            color="#f48fb1"
          />
          <StageCard
            number="3"
            icon="💌"
            title="The Secret Letter"
            description="A wax-sealed envelope holds a heartfelt message written in glowing ink, just waiting to be read."
            delay={0.25}
            color="#ce93d8"
          />
          <StageCard
            number="4"
            icon="🎂"
            title="The Grand Finale"
            description="An interactive birthday cake — blow out the candles and let the sakura confetti and fireworks begin!"
            delay={0.4}
            color="#d4af7a"
          />
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          padding: '40px 24px',
          borderTop: '1px solid rgba(244,143,177,0.2)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            fontStyle: 'italic',
            color: '#c06080',
            opacity: 0.7,
          }}
        >
          Made with 💗 and endless love &nbsp;·&nbsp; 🌸 Sakura &amp; Stardust
        </p>
      </motion.footer>
    </div>
  )
}
