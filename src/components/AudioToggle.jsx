import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Music } from 'lucide-react'

/* ─── Soundwave Bar ───────────────────────────────────────────────────── */
function SoundwaveBar({ delay, isPlaying }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '3px',
        height: '14px',
        borderRadius: '2px',
        background: 'linear-gradient(to top, #f48fb1, #ce93d8)',
        transformOrigin: 'center bottom',
        animation: isPlaying ? `soundwave 0.8s ease-in-out ${delay}s infinite` : 'none',
        transform: isPlaying ? 'scaleY(1)' : 'scaleY(0.35)',
        transition: 'transform 0.3s ease',
      }}
    />
  )
}

/* ─── Audio Toggle Button ─────────────────────────────────────────────── */
export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.55
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setIsLoaded(true))
    audio.addEventListener('error', () => setHasError(true))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setHasError(true))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 1.0 }}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 100,
      }}
    >
      <motion.button
        id="audio-toggle"
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 18px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '50px',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(244, 143, 177, 0.35)',
          boxShadow: '0 4px 20px rgba(244,143,177,0.25)',
          color: '#7b3f5e',
          transition: 'box-shadow 0.3s ease',
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={hasError ? 'Add /music.mp3 to the public folder' : isPlaying ? 'Pause' : 'Play music'}
      >
        {/* Icon */}
        <motion.span
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: isPlaying ? 4 : 0.3, ease: 'linear', repeat: isPlaying ? Infinity : 0 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Music size={16} color="#b76e79" />
        </motion.span>

        {/* Soundwave bars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          {[0, 0.1, 0.2, 0.1, 0].map((delay, i) => (
            <SoundwaveBar key={i} delay={delay} isPlaying={isPlaying} />
          ))}
        </div>

        {/* Play/Pause icon */}
        <AnimatePresence mode="wait">
          <motion.span
            key={isPlaying ? 'pause' : 'play'}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {isPlaying ? (
              <Pause size={15} color="#b76e79" />
            ) : (
              <Play size={15} color="#b76e79" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Tooltip if no music file */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.72rem',
              color: '#b76e79',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(244,143,177,0.3)',
              boxShadow: '0 4px 15px rgba(244,143,177,0.2)',
            }}
          >
            🎵 Add <code style={{ background: '#fce4ec', padding: '1px 4px', borderRadius: 4 }}>/public/music.mp3</code>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
