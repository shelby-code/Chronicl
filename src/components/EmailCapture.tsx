import { useState, useEffect } from 'react'

const STORAGE_KEY = 'chronicl_email_dismissed'

export default function EmailCapture() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Always allow sidebar CTA to open the modal
    const onForceShow = () => setVisible(true)
    window.addEventListener('chronicl:show-email', onForceShow)

    // Don't auto-trigger if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return () => window.removeEventListener('chronicl:show-email', onForceShow)
    }

    // Show after 45 seconds of reading
    const timer = setTimeout(() => setVisible(true), 45000)

    // Or show when user reaches bottom 20% of page
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (scrolled / total > 0.8) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('chronicl:show-email', onForceShow)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json() as any
        throw new Error(data.error ?? 'Subscription failed')
      }
      setSubmitted(true)
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch (err: any) {
      alert(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div
        className="fixed z-50 bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md w-full rounded-t-3xl sm:rounded-2xl border overflow-hidden"
        style={{ background: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* Gold top bar */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #D4A017, #F5C842, #D4A017)' }} />

        <div className="p-6 sm:p-8">
          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {submitted ? (
            <div className="text-center py-4">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 border mx-auto"
                style={{ background: 'rgba(212,160,23,0.12)', borderColor: 'rgba(212,160,23,0.25)' }}
              >
                <svg className="w-6 h-6 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">You're on the list</h3>
              <p className="text-[#9ca3af] text-sm">
                Expect your first history story in your inbox this week.
              </p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 border"
                style={{ background: 'rgba(212,160,23,0.1)', borderColor: 'rgba(212,160,23,0.2)' }}
              >
                <svg className="w-5 h-5 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-white font-bold text-xl mb-2">Get weekly history stories</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed mb-6">
                One email a week. A deep dive into a civilization or nation that shaped the world — told as a story, not a lecture.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#9ca3af]/40 focus:outline-none transition-all"
                  style={{
                    background: '#1a1a1a',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    background: loading ? 'rgba(212,160,23,0.5)' : '#D4A017',
                    color: '#0a0a0a',
                  }}
                >
                  {loading ? 'Subscribing…' : 'Subscribe — it\'s free'}
                </button>
              </form>

              <p className="text-[11px] text-[#9ca3af]/40 text-center mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
