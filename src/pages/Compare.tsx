import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { civilizations } from '../data/civilizations'

export default function Compare() {
  const [searchParams] = useSearchParams()
  const [civ1, setCiv1] = useState(searchParams.get('civ1') ?? '')
  const [civ2, setCiv2] = useState('')

  const selectStyle = {
    background: '#141414',
    borderColor: 'rgba(255,255,255,0.07)',
    color: '#f0f0f0',
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-14 md:px-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12 fade-up-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-5"
            style={{ background: 'rgba(212,160,23,0.08)', borderColor: 'rgba(212,160,23,0.2)', color: '#D4A017' }}
          >
            ⚖️ Comparison Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Civilization Comparison
          </h1>
          <p className="text-[#9ca3af]">
            Select two civilizations to see a detailed side-by-side breakdown.
          </p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 fade-up-2">
          {[
            { label: 'Civilization 1', value: civ1, onChange: setCiv1, other: civ2 },
            { label: 'Civilization 2', value: civ2, onChange: setCiv2, other: civ1 },
          ].map(({ label, value, onChange, other }) => (
            <div key={label}>
              <label className="block text-[10px] font-bold text-[#9ca3af]/40 mb-2 uppercase tracking-widest">
                {label}
              </label>
              <div className="relative">
                <select
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer focus:outline-none transition-all"
                  style={{
                    ...selectStyle,
                    borderColor: value ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.07)',
                    boxShadow: value ? '0 0 0 3px rgba(212,160,23,0.06)' : 'none',
                  }}
                >
                  <option value="" disabled>Select {label}</option>
                  {civilizations.map((c) => (
                    <option key={c.id} value={c.id} disabled={c.id === other} style={{ background: '#1a1a1a' }}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]/40 pointer-events-none"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <button
          disabled={!civ1 || !civ2}
          className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 mb-10 fade-up-3"
          style={{
            background: civ1 && civ2 ? '#D4A017' : 'rgba(212,160,23,0.2)',
            color: civ1 && civ2 ? '#0a0a0a' : 'rgba(212,160,23,0.4)',
            cursor: civ1 && civ2 ? 'pointer' : 'not-allowed',
          }}
        >
          Compare Civilizations →
        </button>

        {/* Locked state */}
        <div className="relative rounded-2xl overflow-hidden border fade-up-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {/* Blurred preview */}
          <div className="blur-md pointer-events-none select-none p-6" style={{ background: '#141414' }}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['Population', 'Duration', 'Region', 'Religion', 'Capital', 'Language'].map((f) => (
                <div key={f} className="rounded-xl p-4" style={{ background: '#0f0f0f' }}>
                  <p className="text-xs text-[#9ca3af]/40 mb-2">{f}</p>
                  <div className="h-3 w-20 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
                </div>
              ))}
            </div>
            <div className="h-40 rounded-xl" style={{ background: '#0f0f0f' }} />
          </div>

          {/* Lock overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px]"
            style={{ background: 'rgba(10,10,10,0.7)' }}
          >
            <div className="text-center px-8">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 border"
                style={{ background: 'rgba(212,160,23,0.1)', borderColor: 'rgba(212,160,23,0.2)' }}
              >
                <svg className="w-6 h-6 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Unlock Full Comparison</h3>
              <p className="text-sm text-[#9ca3af] max-w-xs leading-relaxed">
                See detailed side-by-side stats, overlapping timelines, and cultural analysis between any two civilizations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
