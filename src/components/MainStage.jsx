import { motion } from 'framer-motion'
import MemoryLane from './MemoryLane'
import InsideJokes from './InsideJokes'
import SecretLetter from './SecretLetter'
import BirthdayCakeFinale from './BirthdayCakeFinale'

/* ─── Glowing Sakura Section Divider ─────────────────────────────────── */
function SakuraDivider({ label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        maxWidth: '680px',
        margin: '40px auto',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          flex: 1,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(244, 143, 177, 0.4), rgba(212, 175, 122, 0.6))',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.95rem',
          color: '#b76e79',
          fontStyle: 'italic',
          letterSpacing: '0.08em',
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>🌸</span>
        {label && <span>{label}</span>}
        <span style={{ fontSize: '1.2rem' }}>🌸</span>
      </div>
      <div
        style={{
          flex: 1,
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(212, 175, 122, 0.6), rgba(244, 143, 177, 0.4), transparent)',
        }}
      />
    </div>
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

/* ─── Main Stage Component ───────────────────────────────────────────── */
export default function MainStage({ onReplay }) {
  return (
    <div
      className="main-scroll"
      style={{ position: 'relative', zIndex: 10 }}
    >
      {/* ══════════════════════════════════════════════════════════════
          1. HERO HEADER SECTION
          ══════════════════════════════════════════════════════════════ */}
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
        {/* Floating petals */}
        <FloatingPetal top="12%" left="6%" delay={0.3} size="2rem" />
        <FloatingPetal top="22%" left="88%" delay={0.7} size="1.5rem" />
        <FloatingPetal top="70%" left="4%" delay={1.1} size="1.8rem" />
        <FloatingPetal top="78%" left="91%" delay={0.5} size="2.2rem" />
        <FloatingPetal top="48%" left="94%" delay={1.4} size="1.3rem" />

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#b76e79',
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
            fontSize: 'clamp(2.8rem, 8.5vw, 6.2rem)',
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
            fontSize: 'clamp(2.8rem, 8.5vw, 6.2rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
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
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
            fontStyle: 'italic',
            color: '#8a5070',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '44px',
          }}
        >
          Today, the universe pauses to celebrate you — the most radiant soul
          it ever conjured. This world of blossoms and stardust is yours. 🌸
        </motion.p>

        {/* Gradient divider line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.75 }}
          style={{
            width: '160px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #f48fb1, #d4af7a, #f48fb1, transparent)',
            margin: '0 auto 48px',
            borderRadius: '2px',
          }}
        />

        {/* Scroll hint button */}
        <motion.a
          href="#memory-lane"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: '#b76e79',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Scroll to explore chapters
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '1.2rem', color: '#b76e79' }}
          >
            ↓
          </motion.div>
        </motion.a>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. STAGE 2: MEMORY LANE (POLAROID GALLERY)
          ══════════════════════════════════════════════════════════════ */}
      <SakuraDivider label="Memories Written in Starlight" />
      <MemoryLane />

      {/* ══════════════════════════════════════════════════════════════
          3. STAGE 2: INSIDE JOKES & CORE MEMORIES (FLIP CARDS)
          ══════════════════════════════════════════════════════════════ */}
      <SakuraDivider label="Classified & Unhinged Archives" />
      <InsideJokes />

      {/* ══════════════════════════════════════════════════════════════
          4. STAGE 3: THE SECRET LETTER (3D WAX SEAL & STATIONERY)
          ══════════════════════════════════════════════════════════════ */}
      <SakuraDivider label="A Handwritten Note From the Heart" />
      <SecretLetter />

      {/* ══════════════════════════════════════════════════════════════
          5. STAGE 4: THE GRAND FINALE (3D CAKE & FIREWORKS)
          ══════════════════════════════════════════════════════════════ */}
      <SakuraDivider label="The Grand Finale & Birthday Wish" />
      <BirthdayCakeFinale onReplayApp={onReplay} />
    </div>
  )
}
