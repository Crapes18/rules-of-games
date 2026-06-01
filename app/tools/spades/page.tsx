'use client'

import { useState } from 'react'
import { Plus, Minus, RotateCcw } from 'lucide-react'

interface Team {
  name: string
  score: number
  bags: number
  bid: number
  tricks: number
}

const initTeam = (name: string): Team => ({ name, score: 0, bags: 0, bid: 0, tricks: 0 })

export default function SpadesPage() {
  const [teams, setTeams] = useState<[Team, Team]>([initTeam('Team 1'), initTeam('Team 2')])
  const [history, setHistory] = useState<string[]>([])
  const [target, setTarget] = useState(500)

  function updateBid(i: 0 | 1, delta: number) {
    setTeams(prev => {
      const next: [Team, Team] = [{ ...prev[0] }, { ...prev[1] }]
      next[i].bid = Math.max(0, Math.min(13, next[i].bid + delta))
      return next
    })
  }

  function updateTricks(i: 0 | 1, delta: number) {
    setTeams(prev => {
      const next: [Team, Team] = [{ ...prev[0] }, { ...prev[1] }]
      next[i].tricks = Math.max(0, Math.min(13, next[i].tricks + delta))
      return next
    })
  }

  function scoreRound() {
    setTeams(prev => {
      const next: [Team, Team] = [{ ...prev[0] }, { ...prev[1] }]
      const log: string[] = []

      for (let i = 0; i < 2; i++) {
        const t = next[i]
        let roundScore = 0
        let newBags = t.bags

        if (t.bid === 0) {
          if (t.tricks === 0) { roundScore = 100; log.push(`${t.name} made Nil (+100)`) }
          else { roundScore = -100; log.push(`${t.name} broke Nil (−100)`) }
        } else if (t.tricks >= t.bid) {
          const overtricks = t.tricks - t.bid
          roundScore = t.bid * 10 + overtricks
          newBags += overtricks
          if (newBags >= 10) { roundScore -= 100; newBags -= 10; log.push(`${t.name} bagged out (−100)`) }
          log.push(`${t.name}: ${t.bid * 10} + ${overtricks} bags = +${roundScore}`)
        } else {
          roundScore = -(t.bid * 10)
          log.push(`${t.name} set (−${t.bid * 10})`)
        }

        next[i] = { ...t, score: t.score + roundScore, bags: newBags, bid: 0, tricks: 0 }
      }

      setHistory(h => [...log.reverse(), ...h])
      return next
    })
  }

  function reset() {
    setTeams([initTeam('Team 1'), initTeam('Team 2')])
    setHistory([])
  }

  const winner = teams.find(t => t.score >= target)

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>Spades Scorekeeper</h1>
        <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', fontSize: 13, cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <RotateCcw size={13} /> New Game
        </button>
      </div>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 24px' }}>First team to {target} points wins.</p>

      {winner && (
        <div style={{ background: '#EDF7F1', border: '1px solid #2D7D52', borderRadius: 12, padding: 16, marginBottom: 24, textAlign: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#2D7D52' }}>🏆 {winner.name} wins!</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {teams.map((team, i) => (
          <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
            <input value={team.name} onChange={e => setTeams(prev => { const n: [Team, Team] = [{ ...prev[0] }, { ...prev[1] }]; n[i].name = e.target.value; return n })}
              style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', border: 'none', background: 'none', width: '100%', outline: 'none', padding: 0, marginBottom: 4 }} />
            <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>{team.score}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>{team.bags} bag{team.bags !== 1 ? 's' : ''}</div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>Bid</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => updateBid(i as 0 | 1, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                <span style={{ fontSize: 18, fontWeight: 500, minWidth: 24, textAlign: 'center' }}>{team.bid}</span>
                <button onClick={() => updateBid(i as 0 | 1, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>Tricks Won</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => updateTricks(i as 0 | 1, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                <span style={{ fontSize: 18, fontWeight: 500, minWidth: 24, textAlign: 'center' }}>{team.tricks}</span>
                <button onClick={() => updateTricks(i as 0 | 1, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={scoreRound} style={{ width: '100%', padding: '12px 20px', background: 'var(--text)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 24 }}>
        Score This Round
      </button>

      {history.length > 0 && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: '0 0 12px' }}>Round History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {history.map((entry, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '6px 0', borderBottom: i < history.length - 1 ? '1px solid var(--bg-tertiary)' : undefined }}>{entry}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
