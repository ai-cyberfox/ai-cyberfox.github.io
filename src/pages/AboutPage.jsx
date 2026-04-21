import { PERSON, ABOUT, SKILLS } from '../content.js'

export default function AboutPage() {
  return (
    <div style={{
      minHeight:'100vh', background:'#060d1a',
      color:'white', fontFamily:"'Segoe UI', system-ui, sans-serif",
      padding:'60px 24px',
    }}>
      <div style={{maxWidth:700, margin:'0 auto'}}>
        <a href="/" style={{
          display:'inline-flex', alignItems:'center', gap:8,
          color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:13,
          marginBottom:40, transition:'color 0.2s',
        }}
          onMouseEnter={e=>e.currentTarget.style.color='#39ff14'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}
        >← Back to Portfolio</a>

        <h1 style={{
          fontSize:42, fontWeight:300, marginBottom:8, color:'white',
          fontFamily:'Georgia, serif',
        }}>About</h1>
        <div style={{height:2, width:60, background:'#39ff14', marginBottom:40}} />

        <div style={{
          padding:'32px', borderRadius:16,
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
          marginBottom:24,
        }}>
          {/* Header */}
          <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:24}}>
            <div style={{
              width:56, height:56, borderRadius:'50%',
              background:'rgba(57,255,20,0.12)',
              border:'2px solid rgba(57,255,20,0.3)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:24,
            }}>⬡</div>
            <div>
              <div style={{color:'white', fontWeight:600, fontSize:20}}>{PERSON.name}</div>
              <div style={{color:'rgba(255,255,255,0.5)', fontSize:13}}>{PERSON.tagline}</div>
            </div>
          </div>

          {/* Location + email */}
          <div style={{display:'flex', flexDirection:'column', gap:8, marginBottom:24}}>
            <div style={{display:'flex', alignItems:'center', gap:8, color:'rgba(255,255,255,0.6)', fontSize:14}}>
              <span>📍</span> {PERSON.location}
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8, color:'rgba(255,255,255,0.6)', fontSize:14}}>
              <span>✉</span> {PERSON.email}
            </div>
          </div>

          <div style={{height:1, background:'rgba(255,255,255,0.08)', marginBottom:24}} />

          <p style={{color:'rgba(255,255,255,0.75)', lineHeight:1.8, fontSize:15, marginBottom:20}}>{ABOUT}</p>

          {/* Tags */}
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {['Offensive Security','Vulnerability Research','CTF Player','Bug Hunter','OSCP'].map(tag => (
              <span key={tag} style={{
                padding:'5px 12px', borderRadius:20,
                background:'rgba(57,255,20,0.1)',
                border:'1px solid rgba(57,255,20,0.25)',
                color:'#39ff14', fontSize:12,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{
          padding:'32px', borderRadius:16,
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
        }}>
          <h2 style={{color:'white', fontWeight:500, fontSize:18, marginBottom:20}}>Skills</h2>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            {SKILLS.map((skill, i) => (
              <div key={skill}>
                <div style={{color:'rgba(255,255,255,0.8)', fontSize:14, marginBottom:6}}>{skill}</div>
                <div style={{height:4, borderRadius:2, background:'rgba(255,255,255,0.08)'}}>
                  <div style={{
                    height:'100%', borderRadius:2,
                    background:'linear-gradient(90deg, #39ff14, #00cc88)',
                    width:`${75 + (i % 3) * 8}%`,
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}