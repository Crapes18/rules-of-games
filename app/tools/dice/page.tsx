'use client'

import { useState } from 'react'
import { Dices, RotateCcw } from 'lucide-react'

const DIE_TYPES = [4, 6, 8, 10, 12, 20]

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1
}

export default function DicePage() {
  const [dieType, setDieType] = useState(6)
  const [count, setCount] = useState(2)
  const [results, setResults] = useState<number[]>([])
  const [rolling, setRolling] = useState(false)

  function roll() {
    setRolling(true)
    setTimeout(() => {
      setResults(Array.from({ length: count }, () => rollDie(dieType)))
      setRolling(false)
    }, 300)
  }

  const total = results.reduce((a, b) => a + b, 0)

  return (
    <div style={{ maxWidth: 480 }}>
      <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Dice Roller</h1>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 32px' }}>Roll any combination of dice.</p>

      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', display: 'block', marginBottom: 8 }}>Die Type</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DIE_TYPES.map(d => (
              <button key={d} onClick={() => setDieType(d)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid', borderColor: dieType === d ? 'var(--text)' : 'var(--border)', background: dieType === d ? 'var(--text)' : 'var(--bg)', color: dieType === d ? '#fff' : 'var(--text)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                d{d}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', display: 'block', marginBottom: 8 }}>Number of Dice</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setCount(Math.max(1, count - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ fontSize: 20, fontWeight: 500, minWidth: 24, textAlign: 'center' }}>{count}</span>
            <button onClick={() => setCount(Math.min(10, count + 1))} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
        </div>

        <button onClick={roll} disabled={rolling} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', background: 'var(--text)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 500, cursor: rolling ? 'not-allowed' : 'pointer', opacity: rolling ? 0.7 : 1 }}>
          <Dices size={16} />
          {rolling ? 'Rolling…' : `Roll ${count}d${dieType}`}
        </button>
      </div>

      {results.length > 0 && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {results.map((r, i) => (
              <div key={i} style={{ width: 48, height: 48, borderRadius: 10, border: '2px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600 }}>
                {r}
              </div>
            ))}
          </div>
          {results.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Total</span>
              <span style={{ fontSize: 24, fontWeight: 600 }}>{total}</span>
            </div>
          )}
          <button onClick={() => setResults([])} style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 13, padding: 0 }}>
            <RotateCcw size={12} /> Clear
          </button>
        </div>
      )}
    </div>
  )
}
