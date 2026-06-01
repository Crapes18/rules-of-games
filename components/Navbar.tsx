'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dices } from 'lucide-react'

const tools = [
  { href: '/tools/dice', label: 'Dice Roller' },
  { href: '/tools/timer', label: 'Timer' },
  { href: '/tools/spades', label: 'Spades Score' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>
          <Dices size={18} />
          Rules of Games
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {tools.map(t => (
            <Link key={t.href} href={t.href} style={{
              padding: '6px 12px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 13,
              color: pathname === t.href ? 'var(--text)' : 'var(--text-secondary)',
              background: pathname === t.href ? 'var(--bg-tertiary)' : 'transparent',
              fontWeight: pathname === t.href ? 500 : 400,
            }}>
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
