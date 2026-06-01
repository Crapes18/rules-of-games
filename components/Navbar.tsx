'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dices, Timer, Trophy } from 'lucide-react'

const tools = [
  { href: '/tools/dice',   label: 'Dice',   icon: Dices  },
  { href: '/tools/timer',  label: 'Timer',  icon: Timer  },
  { href: '/tools/spades', label: 'Spades', icon: Trophy },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: isHome ? 'transparent' : 'rgba(255,255,255,0.92)',
      backdropFilter: isHome ? 'none' : 'blur(12px)',
      borderBottom: isHome ? 'none' : '1px solid var(--border)',
      transition: 'all 0.2s',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: isHome ? '#FFFFFF' : 'var(--text)' }}>
          <div style={{ width: 28, height: 28, background: isHome ? 'rgba(255,255,255,0.2)' : '#111', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Dices size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em' }}>Rules of Games</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {tools.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8, textDecoration: 'none',
                fontSize: 13, fontWeight: active ? 500 : 400,
                color: isHome
                  ? (active ? '#fff' : 'rgba(255,255,255,0.7)')
                  : (active ? 'var(--text)' : 'var(--text-secondary)'),
                background: active ? (isHome ? 'rgba(255,255,255,0.15)' : 'var(--bg-tertiary)') : 'transparent',
              }}>
                <Icon size={13} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
