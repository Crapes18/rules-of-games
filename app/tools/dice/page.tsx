'use client'

import { useState, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

const DIE_TYPES = [4, 6, 8, 10, 12, 20]

const DIE_COLORS: Record<number, { bg: string; border: string; text: string }> = {
  4:  { bg: '#FFF5F0', border: '#DC4D00', text: '#DC4D00' },
  6:  { bg: '#EEF6FF', border: '#0066CC', text: '#0066CC' },
  8:  { bg: '#EDFAF3', border: '#16803C', text: '#16803C' },
  10: { bg: '#F5F0FF', border: '#7C3AED', text: '#7C3AED' },
  12: { bg: '#FFF9EC', border: '#B45309', text: '#B45309' },
  20: { bg: '#FFF0F6', border: '#BE185D', text: '#BE185D' },
}

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1
}

export default function DicePage() {
  const [dieType, setDieType] = useState(6)
  const [count, setCount] = useState(2)
  const [results, setResults] = useState<number[]>([])
  const [rolling, setRolling] = useState(false)
  const [rollKey, setRollKey] = useState(0)

  const roll = useCallback(() => {
    setRolling(true)
    setRollKey(k => k + 1)
    setTimeout(() => {
      setResults(Array.from({ length: count }, () => rollDie(dieType)))
      setRolling(false)
    }, 400)
  }, [count, dieType])

  const total = results.reduce((a, b) => a + b, 0)
  const c = DIE_COLORS[dieType]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎲</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#111', margin: '0 0 8px' }}>Dice Roller</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Roll any combination of dice.</p>
        </div>

        {/* Die type selector */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '24px', marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 14 }}>Die Type</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {DIE_TYPES.map(d => {
              const dc = DIE_COLORS[d]
              const active = dieType === d
              return (
                <button key={d} onClick={() => setDieType(d)} style={{
                  padding: '12px 0', borderRadius: 12,
                  border: `2px solid ${active ? dc.border : 'var(--border)'}`,
                  background: active ? dc.bg : '#fff',
                  color: active ? dc.text : 'var(--text-secondary)',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                  d{d}
                </button>
              )
            })}
          </div>
        </div>

        {/* Count + roll */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>Number of Dice</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button onClick={() => setCount(Math.max(1, count - 1))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)', background: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 300 }}>−</button>
              <span style={{ fontSize: 24, fontWeight: 700, minWidth: 32, textAlign: 'center', color: c.text }}>{count}</span>
              <button onClick={() => setCount(Math.min(10, count + 1))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)', background: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 300 }}>+</button>
            </div>
          </div>

          <button onClick={roll} disabled={rolling} style={{
            width: '100%', padding: '16px', borderRadius: 12,
            background: rolling ? c.bg : c.border,
            border: `2px solid ${c.border}`,
            color: rolling ? c.text : '#fff',
            fontSize: 16, fontWeight: 700, cursor: rolling ? 'not-allowed' : 'pointer',
            letterSpacing: '-0.01em', transition: 'all 0.15s',
            transform: rolling ? 'scale(0.98)' : 'scale(1)',
          }}>
            {rolling ? 'Rolling…' : `Roll ${count}d${dieType}`}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div key={rollKey} className="fade-in" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: results.length > 1 ? 20 : 0 }}>
              {results.map((r, i) => (
                <div key={i} className="dice-roll" style={{
                  width: 52, height: 52, borderRadius: 12,
                  border: `2px solid ${c.border}`,
                  background: c.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 800, color: c.text,
                  animationDelay: `${i * 0.05}s`,
                }}>
                  {r}
                </div>
              ))}
            </div>

            {results.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total</span>
                <span style={{ fontSize: 36, fontWeight: 800, color: c.text, letterSpacing: '-0.03em' }}>{total}</span>
              </div>
            )}

            <button onClick={() => setResults([])} style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 12, fontWeight: 500, padding: 0 }}>
              <RotateCcw size={11} /> Clear
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
