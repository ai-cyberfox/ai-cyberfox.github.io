import { useNavigate } from 'react-router-dom'
import { EXPERIENCE, EDUCATION, CERTIFICATIONS, ACHIEVEMENTS, SKILLS } from '../content.js'

export default function ResumePage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060d1a',
      color: 'white',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: '60px 24px',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

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
        }}>Resume</h1>
        <div style={{ height: 2, width: 60, background: '#39ff14', marginBottom: 40 }} />

        {/* ── Experience ── */}
        <div style={{
          padding: '32px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 24 }}>
            💼 Experience
          </h2>
          <div style={{ paddingLeft: 4 }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} style={{
                position: 'relative',
                paddingLeft: 24,
                paddingBottom: i === EXPERIENCE.length - 1 ? 0 : 28,
                borderLeft: i === EXPERIENCE.length - 1
                  ? '2px solid transparent'
                  : '2px solid rgba(57,255,20,0.2)',
              }}>
                {/* dot */}
                <div style={{
                  position: 'absolute', left: -7, top: 4,
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#39ff14',
                  boxShadow: '0 0 8px rgba(57,255,20,0.6)',
                }} />
                <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{exp.role}</div>
                <div style={{ color: '#39ff14', fontSize: 13, fontWeight: 500, marginTop: 2 }}>{exp.company}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 3, marginBottom: 10 }}>
                  {exp.period} · {exp.location}
                </div>
                {exp.bullets?.map((b, bi) => (
                  <div key={bi} style={{
                    color: 'rgba(255,255,255,0.65)', fontSize: 13,
                    lineHeight: 1.7, paddingLeft: 10, marginBottom: 4,
                  }}>• {b}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div style={{
          padding: '32px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 24 }}>
            🎓 Education
          </h2>
          <div style={{ paddingLeft: 4 }}>
            {EDUCATION.map((ed, i) => (
              <div key={i} style={{
                position: 'relative',
                paddingLeft: 24,
                paddingBottom: i === EDUCATION.length - 1 ? 0 : 28,
                borderLeft: i === EDUCATION.length - 1
                  ? '2px solid transparent'
                  : '2px solid rgba(57,255,20,0.2)',
              }}>
                <div style={{
                  position: 'absolute', left: -7, top: 4,
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#39ff14',
                  boxShadow: '0 0 8px rgba(57,255,20,0.6)',
                }} />
                <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{ed.degree}</div>
                <div style={{ color: '#39ff14', fontSize: 13, fontWeight: 500, marginTop: 2 }}>{ed.institute}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 3 }}>
                  {ed.period} · {ed.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skills ── */}
        <div style={{
          padding: '32px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 20 }}>
            ⚙️ Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SKILLS.map((skill, i) => (
              <div key={skill}>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 6 }}>{skill}</div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: 'linear-gradient(90deg, #39ff14, #00cc88)',
                    width: `${75 + (i % 3) * 8}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Certifications ── */}
        <div style={{
          padding: '32px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 20 }}>
            🏅 Certifications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CERTIFICATIONS.map(c => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
                style={{
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)'
                  e.currentTarget.style.background = 'rgba(57,255,20,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#39ff14', flexShrink: 0,
                  boxShadow: '0 0 6px rgba(57,255,20,0.6)',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>
                    {c.issuer} · {c.date}
                  </div>
                </div>
                <span style={{ color: 'rgba(57,255,20,0.6)', fontSize: 14 }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Achievements ── */}
        <div style={{
          padding: '32px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 20 }}>
            🏆 Achievements
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ACHIEVEMENTS.map(a => (
              <a key={a.title} href={a.url} target="_blank" rel="noopener noreferrer"
                style={{
                  textDecoration: 'none', display: 'block',
                  padding: '16px 18px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,215,0,0.15)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,215,0,0.45)'
                  e.currentTarget.style.background = 'rgba(255,215,0,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,215,0,0.15)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                  🏆 {a.title}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.6 }}>
                  {a.desc}
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}