import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SakuraCanvas from './components/SakuraCanvas'
import EntranceStage from './components/EntranceStage'
import MainStage from './components/MainStage'
import AudioToggle from './components/AudioToggle'

/* ─── Loading Fallback ────────────────────────────────────────────────── */
function SakuraLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fce4ec 0%, #fff8f8 50%, #f3e5f5 100%)',
        zIndex: 200,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-heading)',
          color: '#c06080',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌸</div>
        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', letterSpacing: '0.1em' }}>
          Conjuring magic…
        </p>
      </motion.div>
    </div>
  )
}

/* ─── Page Transition Overlay ─────────────────────────────────────────── */
function PageTransition({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(135deg, #fce4ec 0%, #fff8f8 50%, #f3e5f5 100%)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              fontSize: '4rem',
              filter: 'drop-shadow(0 0 30px #f48fb1)',
            }}
          >
            🌸
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── App Root ────────────────────────────────────────────────────────── */
export default function App() {
  const [stage, setStage] = useState('entrance') // 'entrance' | 'transitioning' | 'main'

  const handleEntranceComplete = () => {
    setStage('transitioning')
    setTimeout(() => setStage('main'), 1200)
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* ── Global 3D Sakura Background ─────────────────────────────── */}
      <Suspense fallback={null}>
        <SakuraCanvas />
      </Suspense>

      {/* ── Content Layers ──────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        <AnimatePresence mode="wait">
          {stage === 'entrance' && (
            <motion.div
              key="entrance"
              style={{ width: '100%', height: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <Suspense fallback={<SakuraLoader />}>
                <EntranceStage onComplete={handleEntranceComplete} />
              </Suspense>
            </motion.div>
          )}

          {stage === 'main' && (
            <motion.div
              key="main"
              style={{ width: '100%', height: '100%' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <MainStage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Page Transition Overlay ──────────────────────────────────── */}
      <PageTransition isVisible={stage === 'transitioning'} />

      {/* ── Global Audio Toggle (always visible) ────────────────────── */}
      <AudioToggle />
    </div>
  )
}
