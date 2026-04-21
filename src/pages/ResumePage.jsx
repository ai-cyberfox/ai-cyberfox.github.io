import { useState } from 'react'
import { SOCIALS, PERSON } from '../content.js'

function SocialIcon({ type }) {
  if (type === 'gh') return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
  if (type === 'li') return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  return <span>✉</span>
}

export default function ResumePage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)

  const inputStyle = {
    width:'100%', padding:'12px 14px', borderRadius:8, fontSize:14,
    background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(255,255,255,0.12)',
    color:'white', outline:'none', boxSizing:'border-box',
    transition:'border-color 0.2s',
  }

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
          marginBottom:40,
        }}
          onMouseEnter={e=>e.currentTarget.style.color='#39ff14'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}
        >← Back to Portfolio</a>

        <h1 style={{fontSize:42, fontWeight:300, marginBottom:8, fontFamily:'Georgia, serif'}}>Contact</h1>
        <div style={{height:2, width:60, background:'#39ff14', marginBottom:40}} />

        <div style={{
          padding:'32px', borderRadius:16,
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
          marginBottom:24,
        }}>
          <p style={{color:'rgba(255,255,255,0.65)', fontSize:14, lineHeight:1.7, marginBottom:28}}>
            Thank you for your interest. Please fill out the form below to get in touch. I will get back to you as soon as possible.
          </p>

          {sent ? (
            <div style={{
              padding:'24px', borderRadius:12, textAlign:'center',
              background:'rgba(57,255,20,0.08)',
              border:'1px solid rgba(57,255,20,0.25)',
            }}>
              <div style={{fontSize:32, marginBottom:12}}>✓</div>
              <div style={{color:'#39ff14', fontWeight:500}}>Message sent!</div>
              <div style={{color:'rgba(255,255,255,0.5)', fontSize:13, marginTop:6}}>I'll get back to you soon.</div>
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)', fontSize:13, display:'block', marginBottom:6}}>Name</label>
                <input style={inputStyle} placeholder={PERSON.name}
                  value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  onFocus={e=>e.target.style.borderColor='rgba(57,255,20,0.4)'}
                  onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
                />
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)', fontSize:13, display:'block', marginBottom:6}}>Email</label>
                <input style={inputStyle} placeholder="hello@example.com" type="email"
                  value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                  onFocus={e=>e.target.style.borderColor='rgba(57,255,20,0.4)'}
                  onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
                />
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)', fontSize:13, display:'block', marginBottom:6}}>Subject</label>
                <input style={inputStyle} placeholder="Project Inquiry"
                  value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}
                  onFocus={e=>e.target.style.borderColor='rgba(57,255,20,0.4)'}
                  onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
                />
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)', fontSize:13, display:'block', marginBottom:6}}>Message</label>
                <textarea style={{...inputStyle, height:140, resize:'vertical'}}
                  placeholder="Tell me about your project..."
                  value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  onFocus={e=>e.target.style.borderColor='rgba(57,255,20,0.4)'}
                  onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
                />
              </div>
              <button
                onClick={() => setSent(true)}
                style={{
                  padding:'13px 28px', borderRadius:24, fontSize:14, fontWeight:500,
                  background:'white', color:'#060d1a', border:'none', cursor:'pointer',
                  alignSelf:'flex-start', transition:'opacity 0.2s',
                }}
                onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
                onMouseLeave={e=>e.currentTarget.style.opacity='1'}
              >Send Message</button>
            </div>
          )}
        </div>

        {/* Social links */}
        <div style={{
          padding:'32px', borderRadius:16,
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
        }}>
          <h2 style={{color:'white', fontWeight:500, fontSize:18, marginBottom:16}}>Find me on</h2>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{
                  display:'flex', alignItems:'center', gap:12, textDecoration:'none',
                  padding:'12px 16px', borderRadius:10,
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.08)',
                  color:'rgba(255,255,255,0.8)', fontSize:14,
                  transition:'all 0.2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(57,255,20,0.35)';e.currentTarget.style.background='rgba(57,255,20,0.06)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.background='rgba(255,255,255,0.04)'}}
              >
                <span style={{color:'#39ff14'}}><SocialIcon type={s.icon}/></span>
                {s.label}
                <span style={{marginLeft:'auto', color:'rgba(255,255,255,0.3)', fontSize:12}}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}