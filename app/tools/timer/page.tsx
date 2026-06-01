'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '30 min', seconds: 1800 },
]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function TimerPage() {
  const [total, setTotal] = useState(300)
  const [remaining, setRemaining] = useState(300)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => setRemaining(r => r - 1), 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (remaining === 0) setRunning(false)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, remaining])

  function setPreset(s: number) {
    setTotal(s)
    setRemaining(s)
    setRunning(false)
  }

  function reset() {
    setRemaining(total)
    setRunning(false)
  }

  const pct = total > 0 ? (remaining / total) * 100 : 0
  const isLow = remaining <= 30 && remaining > 0

  return (
    <div style={{ maxWidth: 400 }}>
      <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Timer</h1>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 32px' }}>Countdown timer for timed turns and rounds.</p>

      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 32, textAlign: 'center', marginBottom: 16 }}>
        <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 24px' }}>
          <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="80" cy="80" r="70" fill="none" stroke="var(--bg-tertiary)" strokeWidth="8" />
            <circle cx="80" cy="80" r="70" fill="none" stroke={isLow ? '#C0392B' : '#1A1A1A'} strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - pct / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s, stroke 0.3s' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', color: isLow ? '#C0392B' : 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{fmt(remaining)}</span>
            {remaining === 0 && <span style={{ fontSize: 12, color: '#C0392B', fontWeight: 500 }}>Time&apos;s up!</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
          <button onClick={reset} style={{ width: 44, height: 44, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <RotateCcw size={16} />
          </button>
          <button onClick={() => setRunning(r => !r)} disabled={remaining === 0}
            style={{ width: 44, height: 44, borderRadius: 10, border: 'none', background: 'var(--text)', cursor: remaining === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: remaining === 0 ? 0.4 : 1 }}>
            {running ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: '0 0 10px' }}>Presets</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PRESETS.map(p => (
            <button key={p.seconds} onClick={() => setPreset(p.seconds)}
              style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid', borderColor: total === p.seconds ? 'var(--text)' : 'var(--border)', background: total === p.seconds ? 'var(--bg-tertiary)' : 'var(--bg)', fontSize: 13, fontWeight: total === p.seconds ? 500 : 400, color: 'var(--text)', cursor: 'pointer' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
