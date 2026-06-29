import { Link } from 'react-router-dom'

interface Civilization {
  id: string
  name: string
  era: string
  region: string
  tagline: string
  color?: string
}

export default function CivilizationCard({ civ, index = 0 }: { civ: Civilization; index?: number }) {
  const accent = civ.color ?? '#D4A017'

  return (
    <Link
      to={`/civilization/${civ.id}`}
      className="group relative block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.06)',
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Top color bar */}
      <div
        className="h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}30, 0 8px 32px ${accent}10` }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3
            className="font-semibold text-[15px] leading-snug text-[#f0f0f0] group-hover:text-white transition-colors"
          >
            {civ.name}
          </h3>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-3 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
            style={{ background: `${accent}20` }}
          >
            <svg className="w-3 h-3" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${accent}15`, color: accent }}
          >
            {civ.era}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-white/5 text-[#9ca3af]">
            {civ.region}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[13px] text-[#9ca3af] leading-relaxed">
          {civ.tagline}
        </p>
      </div>
    </Link>
  )
}
