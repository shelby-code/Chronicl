import { useState } from 'react'
import { civilizations } from '../data/civilizations'
import CivilizationCard from '../components/CivilizationCard'

export default function Home() {
  const [query, setQuery] = useState('')

  const filtered = civilizations.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.region.toLowerCase().includes(query.toLowerCase()) ||
    c.era.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-14 md:px-10">

      {/* Hero */}
      <div className="max-w-2xl mx-auto text-center mb-16 fade-up-1">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-7"
          style={{
            background: 'rgba(212,160,23,0.08)',
            borderColor: 'rgba(212,160,23,0.2)',
            color: '#D4A017',
          }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse" />
          Explore 25 Civilizations · 125+ Events
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5">
          Explore the Story<br />
          <span style={{
            background: 'linear-gradient(135deg, #D4A017 0%, #F5C842 50%, #D4A017 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            of Humanity
          </span>
        </h1>

        <p className="text-lg text-[#9ca3af] leading-relaxed max-w-lg mx-auto">
          Discover, compare, and trace the civilizations that shaped our world — through narrative, events, and the arc of time.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-lg mx-auto mb-12 fade-up-2">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]/60"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, region, or era…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-10 py-3.5 text-sm text-[#f0f0f0] placeholder-[#9ca3af]/40 focus:outline-none transition-all"
            style={{
              background: '#141414',
              borderColor: query ? 'rgba(212,160,23,0.4)' : 'rgba(255,255,255,0.07)',
              boxShadow: query ? '0 0 0 3px rgba(212,160,23,0.08)' : 'none',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {query && (
          <p className="text-xs text-[#9ca3af]/50 mt-2 pl-1">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"
          </p>
        )}
      </div>

      {/* Section label */}
      {!query && (
        <div className="max-w-6xl mx-auto mb-6 fade-up-3">
          <p className="text-[11px] font-semibold text-[#9ca3af]/40 uppercase tracking-widest">All Civilizations</p>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-6xl mx-auto">
          {filtered.map((civ, i) => (
            <CivilizationCard key={civ.id} civ={civ} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#9ca3af] text-base mb-2">No civilizations found for "{query}"</p>
          <p className="text-[#9ca3af]/50 text-sm mb-4">Try searching by name, region, or era</p>
          <button
            onClick={() => setQuery('')}
            className="text-sm font-medium transition-colors"
            style={{ color: '#D4A017' }}
          >
            Clear search →
          </button>
        </div>
      )}
    </div>
  )
}
