import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { civilizations, getCivilizationById } from '../data/civilizations'
import { countries, getCountryById } from '../data/countries'
import SEO from '../components/SEO'

type Mode = 'civilizations' | 'countries'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A017]">{children}</span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,160,23,0.3), transparent)' }} />
    </div>
  )
}

function StatCard({ label, v1, v2, accent1, accent2 }: {
  label: string; v1: string; v2: string; accent1: string; accent2: string
}) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.07)', background: '#111' }}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]/40 px-4 pt-3 pb-2">{label}</p>
      <div className="grid grid-cols-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="px-4 pb-4 pt-3 border-r" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="w-8 h-0.5 mb-2 rounded-full" style={{ background: accent1 }} />
          <p className="text-sm text-[#e0e0e0] leading-snug">{v1}</p>
        </div>
        <div className="px-4 pb-4 pt-3">
          <div className="w-8 h-0.5 mb-2 rounded-full" style={{ background: accent2 }} />
          <p className="text-sm text-[#e0e0e0] leading-snug">{v2}</p>
        </div>
      </div>
    </div>
  )
}

function parseYear(y: string): number {
  const n = parseInt(y.replace(/[^0-9]/g, ''), 10)
  return y.includes('BC') ? -n : n
}

export default function Compare() {
  const [searchParams] = useSearchParams()
  const hasCountry1 = !!searchParams.get('country1')
  const [mode, setMode] = useState<Mode>(hasCountry1 ? 'countries' : 'civilizations')
  const [id1, setId1] = useState(searchParams.get('civ1') ?? searchParams.get('country1') ?? '')
  const [id2, setId2] = useState('')

  // Reset selections when mode changes
  const switchMode = (m: Mode) => { setMode(m); setId1(''); setId2('') }

  const isCiv = mode === 'civilizations'
  const list = isCiv ? civilizations : countries
  const getById = isCiv ? getCivilizationById : getCountryById
  const detailPath = isCiv ? 'civilization' : 'country'

  const item1 = id1 ? getById(id1) as any : null
  const item2 = id2 ? getById(id2) as any : null
  const bothSelected = !!(item1 && item2)

  const accent1 = item1?.color ?? '#D4A017'
  const accent2 = item2?.color ?? '#60a5fa'

  const mergedTimeline = bothSelected
    ? [
        ...item1.timeline.map((e: any) => ({ ...e, side: 1 })),
        ...item2.timeline.map((e: any) => ({ ...e, side: 2 })),
      ].sort((a, b) => parseYear(a.year) - parseYear(b.year))
    : []

  // Build stat rows depending on mode
  const statRows = isCiv
    ? [
        { label: 'Capital', k: 'capital' },
        { label: 'Peak Population', k: 'peakPopulation' },
        { label: 'Language', k: 'language' },
        { label: 'Religion', k: 'religion' },
        { label: 'Era', k: 'era' },
        { label: 'Region', k: 'region' },
      ]
    : [
        { label: 'Capital', k: 'capital' },
        { label: 'Population', k: 'population' },
        { label: 'Region', k: 'region' },
        { label: 'Religion', k: 'religion' },
        { label: 'Independence', k: 'independence' },
        { label: 'Subregion', k: 'subregion' },
      ]

  const getLabel = (item: any) =>
    isCiv ? item.name : `${item.flag} ${item.name}`

  const getSubLabel = (item: any) =>
    isCiv ? item.era : item.capital

  return (
    <>
      <SEO
        title="Compare"
        description="Compare civilizations and countries side by side — stats, overlapping timelines, achievements, and legacy."
        path="/compare"
      />
      <div className="min-h-screen bg-[#0a0a0a] px-4 py-10 md:px-10 md:py-14">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-10 fade-up-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-5"
              style={{ background: 'rgba(212,160,23,0.08)', borderColor: 'rgba(212,160,23,0.2)', color: '#D4A017' }}
            >
              ⚖️ Comparison Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
              Side-by-Side Comparison
            </h1>
            <p className="text-[#9ca3af]">
              Compare civilizations or countries across stats, timelines, achievements, and legacy.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-8 fade-up-2">
            {(['civilizations', 'countries'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 capitalize"
                style={mode === m ? {
                  background: 'rgba(212,160,23,0.15)',
                  border: '1px solid rgba(212,160,23,0.35)',
                  color: '#D4A017',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#9ca3af',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 fade-up-3">
            {([
              { label: `${isCiv ? 'Civilization' : 'Country'} 1`, value: id1, onChange: setId1, other: id2, accent: accent1, item: item1 },
              { label: `${isCiv ? 'Civilization' : 'Country'} 2`, value: id2, onChange: setId2, other: id1, accent: accent2, item: item2 },
            ] as const).map(({ label, value, onChange, other, accent, item }) => (
              <div key={label}>
                <label className="block text-[10px] font-bold text-[#9ca3af]/40 mb-2 uppercase tracking-widest">
                  {label}
                </label>
                <div className="relative">
                  <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3.5 text-sm appearance-none cursor-pointer focus:outline-none transition-all"
                    style={{
                      background: '#141414',
                      color: '#f0f0f0',
                      borderColor: value ? `${accent}50` : 'rgba(255,255,255,0.07)',
                      boxShadow: value ? `0 0 0 3px ${accent}10` : 'none',
                    }}
                  >
                    <option value="" disabled>Choose {isCiv ? 'a civilization' : 'a country'}…</option>
                    {list.map((c: any) => (
                      <option key={c.id} value={c.id} disabled={c.id === other} style={{ background: '#1a1a1a' }}>
                        {isCiv ? c.name : `${c.flag} ${c.name}`}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: value ? accent : 'rgba(156,163,175,0.4)' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {item && (
                  <div
                    className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg text-xs"
                    style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
                    <span style={{ color: accent }} className="font-medium">{getLabel(item)}</span>
                    <span className="text-[#9ca3af]/50 ml-auto">{getSubLabel(item)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty state */}
          {!bothSelected && (
            <div
              className="rounded-2xl border p-12 text-center fade-up-4"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0f0f0f' }}
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 border mx-auto"
                style={{ background: 'rgba(212,160,23,0.08)', borderColor: 'rgba(212,160,23,0.15)' }}
              >
                <svg className="w-6 h-6 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Choose two {mode} to compare
              </h3>
              <p className="text-[#9ca3af]/60 text-sm max-w-xs mx-auto">
                Select from the dropdowns above to see stats, timelines, and achievements side by side.
              </p>
            </div>
          )}

          {/* ── FULL COMPARISON ── */}
          {bothSelected && (
            <div className="space-y-12 fade-up">

              {/* Header cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {([{ item: item1, accent: accent1 }, { item: item2, accent: accent2 }]).map(({ item, accent }) => (
                  <Link
                    key={item.id}
                    to={`/${detailPath}/${item.id}`}
                    className="group relative rounded-2xl p-4 sm:p-5 border overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: `${accent}08`, borderColor: `${accent}25` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                    <p className="text-[11px] font-medium mb-1" style={{ color: `${accent}99` }}>
                      {item.region}
                    </p>
                    <h2 className="text-base sm:text-xl font-bold text-white mb-1 group-hover:underline underline-offset-2 leading-snug">
                      {isCiv ? item.name : `${item.flag} ${item.name}`}
                    </h2>
                    <p className="text-xs text-[#9ca3af]/60">{getSubLabel(item)}</p>
                    <p className="text-[12px] sm:text-[13px] text-[#9ca3af] mt-3 leading-relaxed line-clamp-2">{item.tagline}</p>
                  </Link>
                ))}
              </div>

              {/* Stats */}
              <section>
                <SectionLabel>At a Glance</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {statRows.map(({ label, k }) => (
                    <StatCard
                      key={label}
                      label={label}
                      v1={Array.isArray(item1[k]) ? item1[k].join(', ') : item1[k]}
                      v2={Array.isArray(item2[k]) ? item2[k].join(', ') : item2[k]}
                      accent1={accent1}
                      accent2={accent2}
                    />
                  ))}
                </div>
              </section>

              {/* Merged timeline */}
              <section>
                <SectionLabel>Overlapping Timeline</SectionLabel>
                <div className="flex items-center gap-6 mb-6">
                  {([{ item: item1, accent: accent1 }, { item: item2, accent: accent2 }]).map(({ item, accent }) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: accent }} />
                      <span className="text-xs text-[#9ca3af]">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute left-[19px] top-0 bottom-0 w-px"
                    style={{ background: 'linear-gradient(180deg, rgba(212,160,23,0.3), rgba(212,160,23,0.05) 90%, transparent)' }} />
                  <div className="space-y-2 pl-12">
                    {mergedTimeline.map((e: any, i: number) => {
                      const accent = e.side === 1 ? accent1 : accent2
                      const name = e.side === 1 ? item1.name : item2.name
                      return (
                        <div key={i} className="relative">
                          <div
                            className="absolute -left-[29px] top-5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center"
                            style={{ background: '#1a1a1a', borderColor: accent }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                          </div>
                          <div className="rounded-xl p-4 border" style={{ background: `${accent}06`, borderColor: `${accent}20` }}>
                            <div className="flex items-baseline justify-between gap-3 mb-1.5 flex-wrap">
                              <span className="text-xs font-bold tracking-wide" style={{ color: accent }}>{e.year}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                                style={{ background: `${accent}15`, color: accent }}>
                                {name}
                              </span>
                            </div>
                            <p className="text-[14px] text-[#d4d4d4] leading-snug">{e.event}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>

              {/* Achievements */}
              <section>
                <SectionLabel>Achievements Side by Side</SectionLabel>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {([{ item: item1, accent: accent1 }, { item: item2, accent: accent2 }]).map(({ item, accent }) => (
                    <div key={item.id}>
                      <div className="text-[11px] font-semibold px-3 py-1.5 rounded-lg mb-3 inline-block"
                        style={{ background: `${accent}15`, color: accent }}>
                        {item.name}
                      </div>
                      <div className="space-y-2">
                        {item.achievements.map((a: string, i: number) => (
                          <div key={i} className="flex items-start gap-2.5 rounded-xl p-3 border"
                            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: `${accent}20` }}>
                              <svg className="w-2 h-2" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <p className="text-[12px] text-[#b8b8b8] leading-relaxed">{a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Legacy */}
              <section>
                <SectionLabel>Why They Still Matter</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([{ item: item1, accent: accent1 }, { item: item2, accent: accent2 }]).map(({ item, accent }) => (
                    <div key={item.id} className="relative rounded-2xl p-6 border overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${accent}08, rgba(255,255,255,0.01))`, borderColor: `${accent}20` }}>
                      <div className="absolute -top-3 -left-1 text-7xl font-bold leading-none pointer-events-none select-none opacity-10"
                        style={{ color: accent }}>"</div>
                      <p className="text-xs font-semibold mb-3" style={{ color: accent }}>{item.name}</p>
                      <p className="relative text-[13.5px] text-[#c8c8c8] leading-[1.8] z-10">{item.legacy}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer links */}
              <div className="grid grid-cols-2 gap-3">
                {([{ item: item1, accent: accent1 }, { item: item2, accent: accent2 }]).map(({ item, accent }) => (
                  <Link key={item.id} to={`/${detailPath}/${item.id}`}
                    className="group flex items-center justify-between rounded-xl px-4 py-3.5 border transition-all duration-200"
                    style={{ background: `${accent}06`, borderColor: `${accent}20` }}>
                    <span className="text-sm font-medium text-[#f0f0f0] group-hover:text-white transition-colors truncate pr-2">
                      Full {item.name} story
                    </span>
                    <svg className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                      style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  )
}
