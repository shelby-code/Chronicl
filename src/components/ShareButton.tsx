import { useState } from 'react'

interface ShareButtonProps {
  title: string
  description: string
  path: string
}

const BASE_URL = 'https://chronicl-bice.vercel.app'

export default function ShareButton({ title, description, path }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const url = `${BASE_URL}${path}`
  const tweetText = encodeURIComponent(`${title} — ${description}\n\n${url}`)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => { setCopied(false); setOpen(false) }, 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 border"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.08)',
          color: '#9ca3af',
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full mt-2 w-52 rounded-2xl border z-20 overflow-hidden"
            style={{ background: '#161616', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 pt-3 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]/40">Share this page</p>
            </div>

            {/* Copy link */}
            <button
              onClick={copyLink}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-white/[0.04]"
              style={{ color: copied ? '#D4A017' : '#e0e0e0' }}
            >
              {copied ? (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
              {copied ? 'Copied!' : 'Copy link'}
            </button>

            <div className="mx-4 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

            {/* Twitter/X */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/[0.04]"
              style={{ color: '#e0e0e0' }}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </a>

            {/* Native share if supported */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <>
                <div className="mx-4 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <button
                  onClick={() => {
                    navigator.share({ title, text: description, url })
                    setOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-white/[0.04]"
                  style={{ color: '#e0e0e0' }}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  More options
                </button>
              </>
            )}

            <div className="h-2" />
          </div>
        </>
      )}
    </div>
  )
}
