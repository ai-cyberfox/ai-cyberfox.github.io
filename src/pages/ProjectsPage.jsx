import { useNavigate } from 'react-router-dom'

const PROJECTS = [
  {
    id: 'p1',
    title: 'Portable HTTP Server',
    url: 'https://github.com/sudovivek/Portable-Servers/tree/main/HTTP_Server',
    tags: ['Python', 'HTTP', 'HTTPS'],
    description: 'A Python portable HTTP server supporting PUT, POST, and DELETE methods, compatible with both Python versions, running on HTTP and HTTPS.',
    thumb: null, // replace with '/thumbnails/http-server.png'
  },
  {
    id: 'p2',
    title: 'Portable FTP Server',
    url: 'https://github.com/sudovivek/Portable-Servers/tree/main/FTP_Server',
    tags: ['Python', 'FTP', 'FTPS'],
    description: 'A Python portable FTP server capable of running on both FTP and secure FTP (FTPS) protocols.',
    thumb: null,
  },
  {
    id: 'p3',
    title: 'File Transfer Repository',
    url: 'https://github.com/sudovivek/File-Transfer',
    tags: ['Windows', 'Linux', 'CLI'],
    description: 'A compiled collection of almost all possible methods to transfer files between Windows and Linux using command-line interfaces.',
    thumb: null,
  },
  {
    id: 'p4',
    title: 'C2 Frameworks',
    url: 'https://github.com/sudovivek/C2-Frameworks',
    tags: ['Red Team', 'C2', 'Post-Exploitation'],
    description: 'Advanced C2 frameworks for red teaming and adversary emulation — includes Havoc and Merlin for stealthy post-exploitation operations.',
    thumb: null,
  },
]

// Demo thumbnail placeholder SVG
function DemoThumb({ index }) {
  const colors = ['#0d2a1a', '#0a1a2a', '#1a0d2a', '#2a1a0d']
  const accents = ['#39ff14', '#00ccff', '#ff6600', '#ff3366']
  const icons = ['{ }', '</>', '⟨⟩', '>>']
  return (
    <div style={{
      width: '100%', height: '100%',
      background: colors[index % 4],
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 8,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid lines background */}
      {[0,1,2,3,4,5].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: `${i * 20}%`,
          width: 1,
          background: `${accents[index % 4]}11`,
        }}/>
      ))}
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          left: 0, right: 0,
          top: `${i * 33}%`,
          height: 1,
          background: `${accents[index % 4]}11`,
        }}/>
      ))}
      {/* Icon */}
      <div style={{
        fontSize: 28,
        color: accents[index % 4],
        fontFamily: 'Courier New, monospace',
        fontWeight: 700,
        opacity: 0.9,
        zIndex: 1,
      }}>{icons[index % 4]}</div>
      {/* Label */}
      <div style={{
        fontSize: 10,
        color: `${accents[index % 4]}88`,
        fontFamily: 'Courier New, monospace',
        letterSpacing: '0.12em',
        zIndex: 1,
      }}>THUMBNAIL</div>
      {/* Corner accent */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 40, height: 40,
        borderTop: `2px solid ${accents[index % 4]}44`,
        borderLeft: `2px solid ${accents[index % 4]}44`,
        transform: 'translate(50%, 50%) rotate(45deg)',
      }}/>
    </div>
  )
}

export default function ProjectPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060d1a',
      color: 'white',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: '60px 24px',
    }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>

        {/* ── Back button ── */}
        <button onClick={() => navigate('/')} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none',
          cursor: 'pointer', fontSize: 13, marginBottom: 40, padding: 0,
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#39ff14'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >← Back to Portfolio</button>

        <h1 style={{
          fontSize: 42, fontWeight: 300, marginBottom: 8, color: 'white',
          fontFamily: 'Georgia, serif',
        }}>Projects</h1>
        <div style={{ height: 2, width: 60, background: '#39ff14', marginBottom: 40 }} />

        {/* ── 2x2 Project Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              style={{
                borderRadius: 16,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: '100%', height: 180, overflow: 'hidden' }}>
                {p.thumb ? (
                  <img
                    src={p.thumb}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <DemoThumb index={i} />
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: '20px 22px 22px' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      padding: '2px 8px', borderRadius: 12, fontSize: 11,
                      background: 'rgba(57,255,20,0.08)',
                      border: '1px solid rgba(57,255,20,0.18)',
                      color: '#39ff14',
                    }}>{t}</span>
                  ))}
                </div>

                {/* Title */}
                <div style={{
                  color: 'white', fontWeight: 600, fontSize: 15,
                  marginBottom: 8, lineHeight: 1.3,
                }}>{p.title}</div>

                {/* Description */}
                <p style={{
                  color: 'rgba(255,255,255,0.55)', fontSize: 13,
                  lineHeight: 1.7, margin: '0 0 18px',
                }}>{p.description}</p>

                {/* GitHub link */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 20, fontSize: 12,
                    background: 'rgba(57,255,20,0.1)',
                    border: '1px solid rgba(57,255,20,0.25)',
                    color: '#39ff14', textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(57,255,20,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(57,255,20,0.1)'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  View on GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}