import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCountryById } from '../data/countries'
import SEO from '../components/SEO'
import ShareButton from '../components/ShareButton'

const TIMELINE_ICONS = ['🏛️', '⚔️', '🌿', '📜', '🔥']

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A017]">{children}</span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,160,23,0.3), transparent)' }} />
    </div>
  )
}

export default function CountryDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const country = getCountryById(id ?? '')

  if (!country) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-6">🌍</p>
          <h2 className="text-2xl font-bold text-[#f0f0f0] mb-2">Country not found</h2>
          <p className="text-[#9ca3af] mb-6 text-sm">This nation doesn't exist in our atlas yet.</p>
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#D4A017' }}
          >
            ← Return to Countries
          </Link>
        </div>
      </div>
    )
  }

  const accent = country.color ?? '#D4A017'
  const narrativeParagraphs: string[] = (country.narrative ?? '').split('\n\n').filter(Boolean)
  const languages = Array.isArray(country.languages) ? country.languages.join(', ') : country.languages

  return (
    <>
    <SEO
      title={country.name}
      description={`${country.tagline} Explore the history, timeline, and achievements of ${country.name}.`}
      path={`/country/${country.id}`}
    />
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── HERO ────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background gradient bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${accent}22 0%, transparent 70%)`,
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${accent}40 1px, transparent 1px), linear-gradient(90deg, ${accent}40 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 md:px-10 pt-10 pb-14">
          {/* Back + Share row */}
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-[#9ca3af]/60 hover:text-[#9ca3af] transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Countries
            </button>
            <ShareButton
              title={country.name}
              description={country.tagline}
              path={`/country/${country.id}`}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-5 fade-up-1">
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}
            >
              {country.region}
            </span>
            <span className="text-xs px-3 py-1 rounded-full font-medium bg-white/5 text-[#9ca3af] border border-white/[0.07]">
              {country.subregion}
            </span>
            <span className="text-xs px-3 py-1 rounded-full font-medium bg-white/5 text-[#9ca3af] border border-white/[0.07]">
              {country.religion}
            </span>
          </div>

          {/* Flag + Title */}
          <div className="flex items-center gap-4 mb-4 fade-up-2">
            <span className="text-5xl md:text-6xl leading-none">{country.flag}</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
              {country.name}
            </h1>
          </div>

          <p className="text-xl text-[#9ca3af] leading-relaxed max-w-2xl fade-up-3">
            {country.tagline}
          </p>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 fade-up-4">
            {[
              { label: 'Capital', value: country.capital },
              { label: 'Population', value: country.population },
              { label: 'Languages', value: languages },
              { label: 'Independence', value: country.independence },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl px-4 py-3.5 border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af]/50 mb-1">{label}</p>
                <p className="text-sm font-medium text-[#f0f0f0] leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-24">

        <div className="h-px mb-14" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* ── NARRATIVE ── */}
        <section className="mb-16 fade-up">
          <SectionLabel>The Story</SectionLabel>
          <div className="narrative-prose space-y-6">
            {narrativeParagraphs.map((para, i) => (
              <p key={i} className="text-[#b8b8b8] leading-[1.9] text-[1rem]">
                {i === 0 ? (
                  <>
                    <span
                      className="float-left text-6xl font-bold leading-[0.85] mr-3 mt-1"
                      style={{ color: accent }}
                    >
                      {para[0]}
                    </span>
                    {para.slice(1)}
                  </>
                ) : para}
              </p>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="mb-16 fade-up">
          <SectionLabel>Key Moments in History</SectionLabel>
          <div className="relative">
            <div
              className="absolute left-[19px] top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(180deg, ${accent}40, ${accent}10 80%, transparent)` }}
            />
            <div className="space-y-2 pl-12">
              {country.timeline.map((item: { year: string; event: string }, i: number) => (
                <div key={i} className="relative group">
                  <div
                    className="absolute -left-[29px] top-5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-200"
                    style={{
                      background: i === 0 ? accent : '#1a1a1a',
                      borderColor: i === 0 ? accent : `${accent}40`,
                      boxShadow: i === 0 ? `0 0 12px ${accent}60` : 'none',
                    }}
                  >
                    {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                  <div
                    className="rounded-xl p-4 border transition-all duration-200 hover:border-white/10 cursor-default"
                    style={{
                      background: i === 0 ? `${accent}08` : 'rgba(255,255,255,0.02)',
                      borderColor: i === 0 ? `${accent}25` : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <span className="text-xs font-bold tracking-wide shrink-0" style={{ color: accent }}>
                        {item.year}
                      </span>
                      <span className="text-[11px] text-[#9ca3af]/40">{TIMELINE_ICONS[i]}</span>
                    </div>
                    <p className="text-[14px] text-[#d4d4d4] leading-snug">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section className="mb-16 fade-up">
          <SectionLabel>Notable Achievements</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {country.achievements.map((a: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3.5 rounded-xl p-4 border transition-all duration-200 hover:border-white/10"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${accent}20` }}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[13.5px] text-[#b8b8b8] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY FACTS ── */}
        <section className="mb-16 fade-up">
          <SectionLabel>Key Facts</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Capital', value: country.capital },
              { label: 'Population', value: country.population },
              { label: 'Region', value: country.region },
              { label: 'Subregion', value: country.subregion },
              { label: 'Religion', value: country.religion },
              { label: 'Independence', value: country.independence },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-4 border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af]/40 mb-1.5">{label}</p>
                <p className="text-sm text-[#e0e0e0] leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LANGUAGES ── */}
        {Array.isArray(country.languages) && country.languages.length > 1 && (
          <section className="mb-16 fade-up">
            <SectionLabel>Languages Spoken</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {(country.languages as string[]).map((lang: string, i: number) => (
                <span
                  key={i}
                  className="text-sm px-4 py-2 rounded-full border font-medium"
                  style={{
                    background: i === 0 ? `${accent}12` : 'rgba(255,255,255,0.03)',
                    borderColor: i === 0 ? `${accent}25` : 'rgba(255,255,255,0.07)',
                    color: i === 0 ? accent : '#9ca3af',
                  }}
                >
                  {lang}
                  {i === 0 && <span className="ml-2 text-[10px] opacity-60">official</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── LEGACY ── */}
        {country.legacy && (
          <section className="mb-16 fade-up">
            <SectionLabel>Why It Still Matters</SectionLabel>
            <div
              className="relative rounded-2xl p-6 md:p-8 border overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accent}08 0%, rgba(255,255,255,0.02) 100%)`,
                borderColor: `${accent}20`,
              }}
            >
              <div
                className="absolute -top-3 -left-1 text-8xl font-bold leading-none pointer-events-none select-none opacity-10"
                style={{ color: accent }}
              >
                "
              </div>
              <p className="relative text-[15px] text-[#c8c8c8] leading-[1.85] z-10">{country.legacy}</p>
            </div>
          </section>
        )}

        {/* ── BACK CTA ── */}
        <Link
          to="/countries"
          className="group flex items-center justify-between w-full rounded-2xl px-6 py-5 border transition-all duration-200 hover:border-[#D4A017]/30"
          style={{
            background: 'rgba(212,160,23,0.05)',
            borderColor: 'rgba(212,160,23,0.15)',
          }}
        >
          <div>
            <p className="text-sm font-semibold text-[#f0f0f0] mb-0.5">
              Explore more nations
            </p>
            <p className="text-xs text-[#9ca3af]/60">
              49 countries across 6 regions — each with its own story
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ml-4 transition-transform duration-200 group-hover:translate-x-1"
            style={{ background: 'rgba(212,160,23,0.15)' }}
          >
            <svg className="w-4 h-4 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
    </>
  )
}
