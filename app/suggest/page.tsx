'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

type State = 'idle' | 'submitting' | 'success' | 'error'

export default function SuggestPage() {
  const [gameName, setGameName] = useState('')
  const [description, setDescription] = useState('')
  const [submittedBy, setSubmittedBy] = useState('')
  const [state, setState] = useState<State>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!gameName.trim()) return
    setState('submitting')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_IDEA_ENGINE_URL}/api/game-suggestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-suggestion-secret': process.env.NEXT_PUBLIC_SUGGESTION_SECRET ?? '',
        },
        body: JSON.stringify({
          gameName: gameName.trim(),
          description: description.trim() || null,
          submittedBy: submittedBy.trim() || 'Anonymous',
          appId: 'rules-of-games',
        }),
      })

      if (res.ok) {
        setState('success')
        setGameName('')
        setDescription('')
        setSubmittedBy('')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#0D2057', margin: '0 0 10px' }}>
            Suggest a Game
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0 }}>
            Missing your favourite game? Let us know and we&apos;ll add it.
          </p>
        </div>

        {state === 'success' ? (
          <div style={{ background: '#EDFAF3', border: '1px solid #16803C', borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
            <CheckCircle size={36} color="#16803C" style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#16803C', margin: '0 0 8px' }}>
              Thanks! We&apos;ve got it.
            </h2>
            <p style={{ color: '#16803C', margin: '0 0 20px', fontSize: 14 }}>
              Your suggestion has been submitted for review. If approved, it&apos;ll show up in a future update.
            </p>
            <button onClick={() => setState('idle')} style={{ padding: '10px 20px', background: '#16803C', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Suggest Another
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Game Name *</label>
              <input
                value={gameName}
                onChange={e => setGameName(e.target.value)}
                placeholder="e.g. Settlers of Catan, Poker, Checkers…"
                required
                style={{ padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 15, color: 'var(--text)', outline: 'none' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#0D2057' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Why should we add it? <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Tell us why this game deserves to be here…"
                rows={3}
                style={{ padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#0D2057' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Your name <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
              </label>
              <input
                value={submittedBy}
                onChange={e => setSubmittedBy(e.target.value)}
                placeholder="Anonymous"
                style={{ padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)', outline: 'none' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#0D2057' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              />
            </div>

            {state === 'error' && (
              <p style={{ margin: 0, fontSize: 13, color: '#C0392B', background: '#FDF0EF', borderRadius: 8, padding: '10px 14px' }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={!gameName.trim() || state === 'submitting'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', background: '#0D2057', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700, cursor: gameName.trim() && state !== 'submitting' ? 'pointer' : 'not-allowed', opacity: gameName.trim() && state !== 'submitting' ? 1 : 0.5, letterSpacing: '-0.01em' }}>
              <Send size={16} />
              {state === 'submitting' ? 'Submitting…' : 'Submit Suggestion'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16 }}>
          Approved suggestions are added in the next app update.
        </p>
      </div>
    </div>
  )
}
