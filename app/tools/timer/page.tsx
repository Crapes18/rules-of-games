'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const PRESETS = [
  { label: '1m',  seconds: 60 },
  { label: '2m',  seconds: 120 },
  { label: '3m',  seconds: 180 },
  { label: '5m',  seconds: 300 },
  { label: '10m', seconds: 600 },
  { label: '30m', seconds: 1800 },
]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function TimerPage() {
  const [total, setTotal] = useState(180)
  const [remaining, setRemaining] = useState(180)
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

  function setPreset(s: number) { setTotal(s); setRemaining(s); setRunning(false) }
  function reset() { setRemaining(total); setRunning(false) }

  const pct = total > 0 ? (remaining / total) * 100 : 0
  const isLow = remaining <= 30 && remaining > 0 && total > 30
  const isDone = remaining === 0
  const R = 88
  const circ = 2 * Math.PI * R

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏱️</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#111', margin: '0 0 8px' }}>Timer</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 40 }}>Countdown for timed turns and rounds.</p>

        <div style={{ background: isDone ? '#FFF0F0' : '#fff', border: `1px solid ${isDone ? '#C0392B' : 'var(--border)'}`, borderRadius: 24, padding: '40px 32px 32px', marginBottom: 16, transition: 'all 0.3s' }}>
          {/* Ring */}
          <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 32px' }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r={R} fill="none" stroke="var(--bg-tertiary)" strokeWidth={10} />
              <circle cx="100" cy="100" r={R} fill="none"
                stroke={isDone ? '#C0392B' : isLow ? '#F97316' : '#0066CC'}
                strokeWidth={10}
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - pct / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.3s' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', color: isDone ? '#C0392B' : isLow ? '#F97316' : '#111', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                {fmt(remaining)}
              </span>
              {isDone && <span style={{ fontSize: 13, fontWeight: 700, color: '#C0392B', marginTop: 4 }}>Time&apos;s up!</span>}
              {running && !isDone && <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4, fontWeight: 500 }}>running</span>}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={reset} style={{ width: 52, height: 52, borderRadius: 14, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              <RotateCcw size={18} />
            </button>
            <button onClick={() => setRunning(r => !r)} disabled={isDone} style={{
              width: 72, height: 52, borderRadius: 14, border: 'none',
              background: isDone ? 'var(--bg-tertiary)' : running ? '#F97316' : '#0066CC',
              cursor: isDone ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? 'var(--text-tertiary)' : '#fff',
              transition: 'background 0.2s',
            }}>
              {running ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>

        {/* Presets */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: '0 0 12px', textAlign: 'left' }}>Presets</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.seconds} onClick={() => setPreset(p.seconds)} style={{
                flex: 1, minWidth: 56, padding: '10px 0', borderRadius: 10,
                border: `2px solid ${total === p.seconds ? '#0066CC' : 'var(--border)'}`,
                background: total === p.seconds ? '#EEF6FF' : '#fff',
                color: total === p.seconds ? '#0066CC' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: total === p.seconds ? 700 : 500, cursor: 'pointer',
              }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
