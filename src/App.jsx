import { useState, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import FloatingIslandScene from './components/FloatingIsland'
import Starfield from './components/Starfield'
import UI from './components/UI'
import { useNavigate } from 'react-router-dom'

// GSAP intro + panel camera handler inside Canvas
function SceneController({ isDay, activePanel, onPanelCameraReady }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const didIntro = useRef(false)

  // Intro fly-in on mount
  useEffect(() => {
    if (didIntro.current) return
    didIntro.current = true
    camera.position.set(0, 2, 22)
    gsap.to(camera.position, {
      x: 6, y: 4, z: 8,
      duration: 2.2, ease: 'power3.out',
    })
  }, [camera])

  // Camera fly when panel opens
  useEffect(() => {
    if (!activePanel) {
      // Fly back to default
      gsap.to(camera.position, { x: 6, y: 4, z: 8, duration: 1.2, ease: 'power3.inOut' })
      return
    }
    const targets = {
      projects: { pos: [1.5, 2.2, 2.0], look: [0.2, 0.8, -0.5] },
      about: { pos: [-1.2, 1.8, 3.2], look: [-0.5, 0.5, 1.5] },
      skills: { pos: [3.5, 2.0, 2.0], look: [2.2, 0.8, 0.2] },
      contact: { pos: [-3.2, 2.0, 2.0], look: [-2.0, 0.5, 0.4] },
    }
    const t = targets[activePanel]
    if (!t) return
    gsap.to(camera.position, { x: t.pos[0], y: t.pos[1], z: t.pos[2], duration: 1.4, ease: 'power3.inOut' })
    gsap.to({}, {
      duration: 1.4, ease: 'power3.inOut',
      onUpdate() { camera.lookAt(t.look[0], t.look[1], t.look[2]) },
    })
  }, [activePanel, camera])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 22]} fov={45} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={4}
        maxDistance={18}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        target={[0, 0.5, 0]}
        enabled={!activePanel}
      />

      {/* Lighting */}
      <ambientLight intensity={isDay ? 1.2 : 0.25} color={isDay ? '#ddeeff' : '#1a2040'} />
      <directionalLight
        position={isDay ? [8, 12, 6] : [4, 8, -6]}
        intensity={isDay ? 2.0 : 0.4}
        color={isDay ? '#fff5e0' : '#4060a0'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 0, 0]} intensity={5.3} color="#3040a0" distance={12} />
    </>
  )
}

export default function App() {
  const [isDay, setIsDay] = useState(false)
  const [activePanel, setActivePanel] = useState(null)

  // const handleSelect = (panel) => setActivePanel(panel)
  // const handleClose  = (panel) => {
  //   // If called with a key (from nav), open that panel; else close
  //   if (typeof panel === 'string') setActivePanel(panel)
  //   else setActivePanel(null)
  // }

  const navigate = useNavigate()
  const [hoverLabel, setHoverLabel] = useState(null)
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })

  const handleSelect = (panel) => {
    const routes = { about: '/about', contact: '/contact', projects: '/projects', achievements: '/achievements', resume: '/resume' }
    if (routes[panel]) { navigate(routes[panel]); return; }
    setActivePanel(panel)
  }

  const handleHover = (label, event) => {
    if (label) {
      setHoverLabel(label)
      setHoverPos({ x: event.clientX, y: event.clientY })
    } else {
      setHoverLabel(null)
    }
  }
  const handleClose = (panel) => {
    // If called with a key (from nav), open that panel; else close
    if (typeof panel === 'string') setActivePanel(panel)
    else setActivePanel(null)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: isDay ? '#1a3a5c' : '#060d1a' }}>
      <Canvas shadows gl={{ antialias: true, alpha: false }} style={{ width: '100%', height: '100%' }}>
        <SceneController isDay={isDay} activePanel={activePanel} />
        <Starfield count={600} />
        <FloatingIslandScene onSelect={handleSelect} onHover={handleHover} />
      </Canvas>

      {/* Hover tooltip */}
      {hoverLabel && (
        <div style={{
          position: 'fixed',
          left: hoverPos.x + 16,
          top: hoverPos.y - 12,
          pointerEvents: 'none',
          zIndex: 100,
          background: 'rgba(30, 10, 10, 0.92)',
          border: '1px solid rgba(57,255,20,0.4)',
          borderRadius: 8,
          padding: '7px 14px',
          color: 'white',
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: '#39ff14', fontSize: 11, opacity: 0.8 }}>→</span>
          {hoverLabel}
        </div>
      )}
      <UI
        isDay={isDay}
        onToggleDay={() => setIsDay(d => !d)}
        activePanel={activePanel}
        onClosePanel={handleClose}
      />
    </div>
  )
}
