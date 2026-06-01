'use client'

import { useState } from 'react'
import { Plus, Minus, RotateCcw, Trophy } from 'lucide-react'

interface Team { name: string; score: number; bags: number; bid: number; tricks: number }

const initTeam = (name: string): Team => ({ name, score: 0, bags: 0, bid: 0, tricks: 0 })

const TEAM_COLORS = ['#0066CC', '#DC4D00']
const TEAM_BG    = ['#EEF6FF', '#FFF5F0']

export default function SpadesPage() {
  const [teams, setTeams] = useState<[Team, Team]>([initTeam('We'), initTeam('They')])
  const [history, setHistory] = useState<{ text: string; color: string }[]>([])
  const [target] = useState(500)

  function update(i: 0 | 1, field: 'bid' | 'tricks', delta: number) {
    setTeams(prev => {
      const next: [Team, Team] = [{ ...prev[0] }, { ...prev[1] }]
      next[i][field] = Math.max(0, Math.min(13, next[i][field] + delta))
      return next
    })
  }

  function scoreRound() {
    setTeams(prev => {
      const next: [Team, Team] = [{ ...prev[0] }, { ...prev[1] }]
      const log: { text: string; color: string }[] = []

      for (let i = 0; i < 2; i++) {
        const t = next[i]
        let pts = 0; let newBags = t.bags

        if (t.bid === 0) {
          pts = t.tricks === 0 ? 100 : -100
          log.push({ text: `${t.name}: Nil ${pts > 0 ? 'made +100' : 'broken −100'}`, color: TEAM_COLORS[i] })
        } else if (t.tricks >= t.bid) {
          const over = t.tricks - t.bid
          pts = t.bid * 10 + over
          newBags += over
          if (newBags >= 10) { pts -= 100; newBags -= 10 }
          log.push({ text: `${t.name}: Made bid${over ? ` +${over} bag${over > 1 ? 's' : ''}` : ''} → +${pts}`, color: TEAM_COLORS[i] })
        } else {
          pts = -(t.bid * 10)
          log.push({ text: `${t.name}: Set! → ${pts}`, color: TEAM_COLORS[i] })
        }

        next[i] = { ...t, score: t.score + pts, bags: newBags, bid: 0, tricks: 0 }
      }

      setHistory(h => [...log.reverse(), ...h])
      return next
    })
  }

  function reset() { setTeams([initTeam('We'), initTeam('They')]); setHistory([]) }

  const winner = teams.find(t => t.score >= target)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 32, marginBottom: 8 }}>♠️</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#111', margin: '0 0 6px' }}>Spades</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>First to {target} points wins.</p>
          </div>
          <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid var(--border)', borderRadius: 10, background: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <RotateCcw size={13} /> New Game
          </button>
        </div>

        {winner && (
          <div className="fade-in" style={{ background: 'linear-gradient(135deg, #16803C, #0F5C2B)', borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Trophy size={24} color="#FFD700" />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{winner.name} wins!</span>
          </div>
        )}

        {/* Score cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {teams.map((team, i) => (
            <div key={i} style={{ background: '#fff', border: `2px solid ${TEAM_BG[i]}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ height: 4, background: TEAM_COLORS[i] }} />
              <div style={{ padding: '20px 20px 24px' }}>
                <input value={team.name} onChange={e => setTeams(prev => { const n: [Team, Team] = [{ ...prev[0] }, { ...prev[1] }]; n[i as 0 | 1].name = e.target.value; return n })}
                  style={{ fontSize: 14, fontWeight: 600, color: TEAM_COLORS[i], border: 'none', background: 'none', width: '100%', outline: 'none', padding: 0, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }} />
                <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: '-0.04em', color: '#111', lineHeight: 1, margin: '8px 0 4px' }}>{team.score}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 20, fontWeight: 500 }}>
                  {team.bags} bag{team.bags !== 1 ? 's' : ''}
                  {team.bags >= 7 && <span style={{ color: '#F97316', marginLeft: 4 }}>⚠️ close to penalty</span>}
                </div>

                {(['bid', 'tricks'] as const).map(field => (
                  <div key={field} style={{ marginBottom: field === 'bid' ? 14 : 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 8 }}>{field === 'bid' ? 'Bid' : 'Tricks Won'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button onClick={() => update(i as 0 | 1, field, -1)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}><Minus size={13} /></button>
                      <span style={{ fontSize: 22, fontWeight: 800, minWidth: 28, textAlign: 'center', color: TEAM_COLORS[i] }}>{team[field]}</span>
                      <button onClick={() => update(i as 0 | 1, field, 1)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}><Plus size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={scoreRound} style={{ width: '100%', padding: '16px', background: '#111', border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.01em', marginBottom: 20 }}>
          Score This Round →
        </button>

        {history.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 20px 16px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: '0 0 12px' }}>Round History</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {history.slice(0, 10).map((entry, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: i < Math.min(history.length, 10) - 1 ? '1px solid var(--bg-tertiary)' : undefined }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#444' }}>{entry.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
