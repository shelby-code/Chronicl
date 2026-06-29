import { Link } from 'react-router-dom'

interface Country {
  id: string
  name: string
  flag: string
  capital: string
  region: string
  subregion: string
  population: string
  tagline: string
  color?: string
}

export default function CountryCard({ country, index = 0 }: { country: Country; index?: number }) {
  const accent = country.color ?? '#D4A017'

  return (
    <Link
      to={`/country/${country.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.06)',
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Top color bar */}
      <div
        className="h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}30, 0 8px 32px ${accent}10` }}
      />

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none shrink-0">{country.flag}</span>
            <div>
              <h3 className="font-semibold text-[15px] leading-snug text-[#f0f0f0] group-hover:text-white transition-colors">
                {country.name}
              </h3>
              <p className="text-[11px] text-[#9ca3af]/60 mt-1">{country.capital}</p>
            </div>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
            style={{ background: `${accent}20` }}
          >
            <svg className="w-3 h-3" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Region tags */}
        <div className="flex flex-wrap gap-1.5">
          <span
            className="text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{ background: `${accent}15`, color: accent }}
          >
            {country.region}
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-white/5 text-[#9ca3af]">
            {country.subregion}
          </span>
        </div>

        {/* Tagline — grows to fill remaining space */}
        <p className="flex-1 text-[13px] text-[#9ca3af] leading-relaxed line-clamp-3">
          {country.tagline}
        </p>

        {/* Population footer — always at bottom */}
        <div className="pt-3 border-t border-white/[0.05] flex items-center gap-1.5">
          <svg className="w-3 h-3 text-[#9ca3af]/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[11px] text-[#9ca3af]/40">{country.population}</span>
        </div>
      </div>
    </Link>
  )
}
