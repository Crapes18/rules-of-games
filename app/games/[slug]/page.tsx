import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Dices, Clock, Users } from 'lucide-react'
import { getGame, games } from '@/lib/games'

export function generateStaticParams() {
  return games.map(g => ({ slug: g.slug }))
}

const toolLinks: Record<string, { href: string; label: string }> = {
  'dice': { href: '/tools/dice', label: 'Dice Roller' },
  'timer': { href: '/tools/timer', label: 'Timer' },
  'spades-scorekeeper': { href: '/tools/spades', label: 'Spades Scorekeeper' },
  'cribbage-scorekeeper': { href: '/tools/spades', label: 'Scorekeeper' },
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const game = getGame(slug)
  if (!game) notFound()

  return (
    <div style={{ maxWidth: 720 }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 24 }}>
        <ArrowLeft size={14} /> All Games
      </Link>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 8px' }}>{game.name}</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px' }}>{game.description}</p>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}><Users size={13} />{game.players} players</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}><Clock size={13} />{game.duration}</span>
        </div>
      </div>

      {/* Quick Reference */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: '0 0 14px' }}>Quick Reference</h2>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {game.quickRef.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14 }}>
              <span style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 1 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tools */}
      {game.tools.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {game.tools.map(t => {
            const tool = toolLinks[t]
            if (!tool) return null
            return (
              <Link key={t} href={tool.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}>
                <Dices size={13} />{tool.label}
              </Link>
            )
          })}
        </div>
      )}

      {/* Full Rules */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 16px' }}>Full Rules</h2>
        {game.rules.map((section, i) => (
          <div key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : undefined, borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
            <h3 style={{ fontSize: 14, fontWeight: 500, margin: '0 0 6px' }}>{section.title}</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
