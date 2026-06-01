'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Clock, Users, ArrowRight } from 'lucide-react'
import { games, categories } from '@/lib/games'

const CATEGORY_STYLE: Record<string, { color: string; bg: string; emoji: string }> = {
  Card:     { color: '#DC4D00', bg: '#FFF5F0', emoji: '🃏' },
  Dice:     { color: '#0066CC', bg: '#EEF6FF', emoji: '🎲' },
  Board:    { color: '#16803C', bg: '#EDFAF3', emoji: '🎯' },
  Strategy: { color: '#7C3AED', bg: '#F5F0FF', emoji: '♟️' },
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = games.filter(g => {
    const matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase())
    return matchSearch && (!activeCategory || g.category === activeCategory)
  })

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0D1B4B 0%, #0A2463 50%, #0D1B4B 100%)', marginTop: -60, paddingTop: 60 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 72px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {Object.entries(CATEGORY_STYLE).map(([cat, s]) => (
              <span key={cat} style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', padding: '4px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                {s.emoji} {cat}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 16, maxWidth: 600 }}>
            Know every rule.<br />Win every game.
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 40, maxWidth: 480 }}>
            Quick references, full rules, and interactive tools for {games.length} games — all in one place.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480 }}>
            <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search games…"
              style={{ width: '100%', padding: '14px 16px 14px 44px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, fontSize: 15, color: '#FFFFFF', outline: 'none', backdropFilter: 'blur(8px)' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{ padding: '8px 18px', borderRadius: 99, border: '1px solid', borderColor: !activeCategory ? '#111' : 'var(--border)', background: !activeCategory ? '#111' : 'transparent', color: !activeCategory ? '#fff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            All Games
          </button>
          {categories.map(cat => {
            const s = CATEGORY_STYLE[cat]
            const active = activeCategory === cat
            return (
              <button key={cat} onClick={() => setActiveCategory(active ? null : cat)} style={{
                padding: '8px 18px', borderRadius: 99, border: '1px solid',
                borderColor: active ? s?.color : 'var(--border)',
                background: active ? s?.bg : 'transparent',
                color: active ? s?.color : 'var(--text-secondary)',
                fontSize: 13, fontWeight: active ? 600 : 400, cursor: 'pointer',
              }}>
                {s?.emoji} {cat}
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-tertiary)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <p>No games found for &ldquo;{search}&rdquo;</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {filtered.map(game => {
              const s = CATEGORY_STYLE[game.category]
              return (
                <Link key={game.slug} href={`/games/${game.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    className="fade-in"
                    style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', height: '100%' }}
                    onMouseEnter={e => { Object.assign((e.currentTarget as HTMLElement).style, { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }) }}
                    onMouseLeave={e => { Object.assign((e.currentTarget as HTMLElement).style, { transform: 'translateY(0)', boxShadow: 'none' }) }}
                  >
                    {/* Card header with category color */}
                    <div style={{ height: 6, background: s?.color ?? '#111' }} />
                    <div style={{ padding: '18px 20px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: s?.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                          {s?.emoji}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: s?.color, padding: '3px 8px', borderRadius: 6, background: s?.bg }}>
                          {game.category}
                        </span>
                      </div>
                      <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0D2057', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{game.name}</h2>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.55 }}>{game.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: 14 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-tertiary)' }}><Users size={11} />{game.players}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-tertiary)' }}><Clock size={11} />{game.duration}</span>
                        </div>
                        <ArrowRight size={14} color="var(--text-tertiary)" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
