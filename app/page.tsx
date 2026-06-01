'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Dices, Clock, Users, ChevronRight } from 'lucide-react'
import { games, categories } from '@/lib/games'

const categoryColors: Record<string, string> = {
  Card: '#EEF4FD',
  Dice: '#EDF7F1',
  Board: '#FDF6EC',
  Strategy: '#F2F1EE',
}
const categoryText: Record<string, string> = {
  Card: '#2B6CB0',
  Dice: '#2D7D52',
  Board: '#B87D2A',
  Strategy: '#6B6B6B',
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = games.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = !activeCategory || g.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Game Rules</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Rules, quick references, and tools for every game night.</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search games…"
            style={{ width: '100%', paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text)', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => setActiveCategory(null)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', borderColor: !activeCategory ? 'var(--text)' : 'transparent', background: !activeCategory ? 'var(--bg-tertiary)' : 'transparent', fontSize: 13, fontWeight: !activeCategory ? 500 : 400, color: !activeCategory ? 'var(--text)' : 'var(--text-secondary)', cursor: 'pointer' }}>All</button>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(activeCategory === c ? null : c)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', borderColor: activeCategory === c ? 'var(--text)' : 'transparent', background: activeCategory === c ? 'var(--bg-tertiary)' : 'transparent', fontSize: 13, fontWeight: activeCategory === c ? 500 : 400, color: activeCategory === c ? 'var(--text)' : 'var(--text-secondary)', cursor: 'pointer' }}>{c}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: '48px 0' }}>No games found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map(game => (
            <Link key={game.slug} href={`/games/${game.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border-color 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#1A1A1A')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 6, background: categoryColors[game.category] || '#F2F1EE', color: categoryText[game.category] || '#6B6B6B' }}>{game.category}</span>
                  <ChevronRight size={14} color="var(--text-tertiary)" />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 6px', color: 'var(--text)' }}>{game.name}</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: 1.5 }}>{game.description}</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-tertiary)' }}><Users size={11} />{game.players}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-tertiary)' }}><Clock size={11} />{game.duration}</span>
                  {game.tools.length > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-tertiary)' }}><Dices size={11} />{game.tools.length} tool{game.tools.length > 1 ? 's' : ''}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
