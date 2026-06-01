import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Dices, Clock, Users, Zap } from 'lucide-react'
import { getGame, games } from '@/lib/games'

export function generateStaticParams() {
  return games.map(g => ({ slug: g.slug }))
}

const CATEGORY_STYLE: Record<string, { color: string; bg: string; emoji: string }> = {
  Card:     { color: '#DC4D00', bg: '#FFF5F0', emoji: '🃏' },
  Dice:     { color: '#0066CC', bg: '#EEF6FF', emoji: '🎲' },
  Board:    { color: '#16803C', bg: '#EDFAF3', emoji: '🎯' },
  Strategy: { color: '#7C3AED', bg: '#F5F0FF', emoji: '♟️' },
}

const toolLinks: Record<string, { href: string; label: string; emoji: string }> = {
  'dice':                { href: '/tools/dice',   label: 'Dice Roller',        emoji: '🎲' },
  'timer':               { href: '/tools/timer',  label: 'Timer',              emoji: '⏱️' },
  'spades-scorekeeper':  { href: '/tools/spades', label: 'Spades Scorekeeper', emoji: '♠️' },
  'cribbage-scorekeeper':{ href: '/tools/spades', label: 'Scorekeeper',        emoji: '📊' },
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const game = getGame(slug)
  if (!game) notFound()

  const s = CATEGORY_STYLE[game.category]

  return (
    <>
      {/* Hero strip */}
      <div style={{ background: s?.bg, borderBottom: `3px solid ${s?.color}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 28px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: s?.color, textDecoration: 'none', marginBottom: 20, fontWeight: 500 }}>
            <ArrowLeft size={14} /> All Games
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', flexShrink: 0 }}>
              {s?.emoji}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: s?.color }}>{game.category}</span>
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#111', margin: '0 0 8px' }}>{game.name}</h1>
              <p style={{ color: '#555', margin: '0 0 12px', fontSize: 15, maxWidth: 560 }}>{game.description}</p>
              <div style={{ display: 'flex', gap: 20 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#666' }}><Users size={14} />{game.players} players</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#666' }}><Clock size={14} />{game.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
        {/* Main content */}
        <div>
          {/* Tools */}
          {game.tools.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Zap size={14} color={s?.color} />
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: s?.color }}>Interactive Tools</span>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {game.tools.map(t => {
                  const tool = toolLinks[t]
                  if (!tool) return null
                  return (
                    <Link key={t} href={tool.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: s?.bg, border: `1px solid ${s?.color}33`, borderRadius: 10, fontSize: 13, fontWeight: 600, color: s?.color, textDecoration: 'none', transition: 'background 0.1s' }}>
                      <span>{tool.emoji}</span>{tool.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Full rules */}
          <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: '#111', margin: '0 0 20px' }}>Full Rules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {game.rules.map((section, i) => (
              <div key={i} style={{ borderRadius: 12, border: '1px solid var(--border)', padding: '20px 22px', background: '#fff', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: s?.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s?.color }}>{i + 1}</span>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111', margin: 0 }}>{section.title}</h3>
                </div>
                <p style={{ margin: '0 0 0 34px', color: '#555', lineHeight: 1.7, fontSize: 14 }}>{section.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar — quick reference */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{ background: '#111', borderRadius: 16, padding: '22px 22px 24px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Quick Reference</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {game.quickRef.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  <span style={{ color: s?.color, flexShrink: 0, marginTop: 2 }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
