import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="This page doesn't exist in the Chronicl atlas." />
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="text-center max-w-md fade-up-1">
          {/* Gold accent number */}
          <div
            className="text-[120px] font-bold leading-none mb-4 select-none"
            style={{
              background: 'linear-gradient(135deg, #D4A017 0%, #F5C842 50%, #D4A017 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.3,
            }}
          >
            404
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">Lost in history</h1>
          <p className="text-[#9ca3af] text-sm leading-relaxed mb-8">
            This page doesn't exist in our atlas. It may have been lost to time — or the URL might be wrong.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{ background: '#D4A017', color: '#0a0a0a' }}
            >
              ← Back to Civilizations
            </Link>
            <Link
              to="/countries"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: '#9ca3af',
              }}
            >
              Explore Countries
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
