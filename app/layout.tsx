import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Rules of Games',
  description: 'Rules, quick references, and interactive tools for every game night.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        {children}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 12, marginTop: 'auto' }}>
          Rules of Games — Your game night companion
        </footer>
      </body>
    </html>
  )
}
