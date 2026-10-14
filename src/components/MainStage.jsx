import { motion } from 'framer-motion'
import MemoryLane from './MemoryLane'
import InsideJokes from './InsideJokes'

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

/* ─── Upcoming Stage Preview Card ────────────────────────────────────── */
function UpcomingStageCard({ number, icon, title, description, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ cursor: 'default' }}
      className="w-full"
    >
      <div
        className="glass"
        style={{
          padding: '44px 36px',
          borderRadius: '26px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${color}45`,
          boxShadow: `0 8px 35px ${color}20, 0 0 0 1px ${color}15`,
          transition: 'all 0.4s ease',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, ${color}22 0%, transparent 70%)`,
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
            color: `${color}`,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Stage {number}
        </div>

        {/* Icon */}
        <div style={{ fontSize: '3.2rem', marginBottom: '18px', lineHeight: 1 }}>
          {icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 2.8vw, 1.85rem)',
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
            fontSize: 'clamp(0.85rem, 1.5vw, 0.92rem)',
            color: '#8a5070',
            lineHeight: 1.7,
            maxWidth: '340px',
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
            background: `${color}18`,
            border: `1px solid ${color}50`,
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: `${color}`,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          ✨ Next In Line
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

/* ─── Main Stage Component ───────────────────────────────────────────── */
export default function MainStage() {
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
          4. UPCOMING STAGES PREVIEW (STAGES 3 & 4)
          ══════════════════════════════════════════════════════════════ */}
      <SakuraDivider label="The Journey Ahead" />
      <section
        style={{
          padding: '40px 24px 100px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: '#5a3040',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}
          >
            Upcoming Chapters 🗺️
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontStyle: 'italic',
              color: '#8a5070',
              maxWidth: '460px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Two more magical stages await to be unlocked in your enchanted birthday adventure...
          </p>
        </motion.div>

        {/* 2 upcoming cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          <UpcomingStageCard
            number="3"
            icon="💌"
            title="The Secret Letter"
            description="A 3D wax-sealed parchment envelope containing a heartfelt message inscribed with glowing golden ink."
            delay={0.1}
            color="#ce93d8"
          />
          <UpcomingStageCard
            number="4"
            icon="🎂"
            title="The Grand Finale"
            description="An interactive 3D birthday cake with flickering candles you can blow out to trigger sakura fireworks!"
            delay={0.25}
            color="#d4af7a"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          borderTop: '1px solid rgba(244,143,177,0.2)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            fontStyle: 'italic',
            color: '#b76e79',
          }}
        >
          Crafted with endless love &amp; stardust ✨ &nbsp;·&nbsp; 🌸 Forever &amp; Always
        </p>
      </motion.footer>
    </div>
  )
}
