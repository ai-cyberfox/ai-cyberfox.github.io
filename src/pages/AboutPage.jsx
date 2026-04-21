import { PERSON, ABOUT, SKILLS } from '../content.js'

const SERVICES = [
  {
    icon: '🌐',
    title: 'Web Application Penetration Testing',
    desc: 'Proactively uncovers vulnerabilities in web applications, preventing potential breaches before they occur.',
  },
  {
    icon: '⚙️',
    title: 'API Penetration Testing',
    desc: 'Conducting comprehensive assessments to identify and remediate potential vulnerabilities within APIs, ensuring strong protection against exploitation.',
  },
  {
    icon: '🔌',
    title: 'Network Penetration Testing',
    desc: 'Uses simulated attacks to probe network assets, uncover and mitigate security vulnerabilities, and strengthen defenses.',
  },
  {
    icon: '📱',
    title: 'Mobile Application Penetration Testing',
    desc: 'Engaged in learning Mobile Application Testing, including static and dynamic analysis of Android APKs to explore and address security vulnerabilities.',
  },
]

const CERTS = [
  {
    name: 'OSCP',
    img: '/assets/images/oscp.png',
    url: 'https://www.credential.net/cc3a33f0-554c-4066-82dd-6dbd06d5a2b8',
  },
  {
    name: 'CAP',
    img: '/assets/images/cap.png',
    url: 'https://candidate.speedexam.net/certificate.aspx?SSTATE=am4131EniU8ntjp4bO5mXZBkJ4T5vMQ2+EPnN90FIgVbPpHaqWZpiBWI/HdTAUxOdGgWfLRUoVVvwApL5mxl4g0sOQwPuK3KSUSNl+p2IKQ=&trk=public_profile_see-credential',
  },
  {
    name: 'CNSP',
    img: '/assets/images/cnsp.png',
    url: 'https://github.com/sudovivek/sudovivek.github.io/blob/main/assets/images/cnsp-certificate.png',
  },
  {
    name: 'APISec',
    img: '/assets/images/apisec.png',
    url: 'https://github.com/sudovivek/sudovivek.github.io/blob/main/assets/images/apisec-certificate.png',
  },
]

const ABOUT_TEXT = `OSCP certified Information Security Enthusiast with 1 year of hands-on experience. Dedicated to safeguarding the Confidentiality, Integrity, and Availability of critical data and systems. Expertise in Vulnerability Assessments, Web Application Penetration Testing, API Penetration Testing, Mobile Application Penetration Testing, Internal and External Network Penetration Testing.`

export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#060d1a',
      color: 'white',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: '60px 24px',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* Back link */}
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13,
          marginBottom: 40, transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#39ff14'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >← Back to Portfolio</a>

        <h1 style={{
          fontSize: 42, fontWeight: 300, marginBottom: 8, color: 'white',
          fontFamily: 'Georgia, serif',
        }}>About</h1>
        <div style={{ height: 2, width: 60, background: '#39ff14', marginBottom: 40 }} />

        {/* ── Profile card ── */}
        <div style={{
          padding: '32px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(57,255,20,0.12)',
              border: '2px solid rgba(57,255,20,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>⬡</div>
            <div>
              <div style={{ color: 'white', fontWeight: 600, fontSize: 20 }}>{PERSON.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{PERSON.tagline}</div>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 24 }} />

          {/* About text with bold highlights */}
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
            <strong style={{ color: 'white' }}>OSCP</strong> certified Information Security Enthusiast with{' '}
            <strong style={{ color: 'white' }}>1 year</strong> of hands-on experience. Dedicated to safeguarding
            the Confidentiality, Integrity, and Availability of critical data and systems. Expertise in{' '}
            <strong style={{ color: 'white' }}>
              Vulnerability Assessments, Web Application Penetration Testing, API Penetration Testing,
              Mobile Application Penetration Testing, Internal and External Network Penetration Testing.
            </strong>
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Offensive Security', 'Vulnerability Research', 'CTF Player', 'Bug Hunter', 'OSCP'].map(tag => (
              <span key={tag} style={{
                padding: '5px 12px', borderRadius: 20,
                background: 'rgba(57,255,20,0.1)',
                border: '1px solid rgba(57,255,20,0.25)',
                color: '#39ff14', fontSize: 12,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* ── What I'm doing ── */}
        <div style={{
          padding: '32px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 24 }}>What I'm doing</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                padding: '20px', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(57,255,20,0.1)',
                  border: '1px solid rgba(57,255,20,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>{s.icon}</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 500, fontSize: 15, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>{s.desc}</div>
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
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 20 }}>Skills</h2>
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
        }}>
          <h2 style={{ color: 'white', fontWeight: 500, fontSize: 18, marginBottom: 24 }}>Certifications</h2>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {CERTS.map(c => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', flexShrink: 0 }}
              >
                <div style={{
                  padding: 12, borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'border-color 0.2s, transform 0.2s',
                  textAlign: 'center',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)'
                    e.currentTarget.style.transform = 'scale(1.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <img src={c.img} alt={c.name}
                    style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 8 }}
                  />
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 8 }}>{c.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}