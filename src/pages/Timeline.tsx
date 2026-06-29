import { Link } from 'react-router-dom'
import { civilizations } from '../data/civilizations'
import SEO from '../components/SEO'

interface TimelineEvent {
  year: string
  event: string
  civName: string
  civId: string
  color: string
}

function parseYear(year: string): number {
  const n = parseInt(year.replace(/[^0-9]/g, ''), 10)
  return year.includes('BC') ? -n : n
}

export default function Timeline() {
  const allEvents: TimelineEvent[] = civilizations.flatMap((civ) =>
    civ.timeline.map((e) => ({
      year: e.year,
      event: e.event,
      civName: civ.name,
      civId: civ.id,
      color: (civ as any).color ?? '#D4A017',
    }))
  )
  allEvents.sort((a, b) => parseYear(a.year) - parseYear(b.year))

  // Group by era bucket for visual rhythm
  const getEra = (year: string) => {
    const n = parseYear(year)
    if (n < -2000) return 'Ancient World (Before 2000 BC)'
    if (n < 0) return 'Classical Antiquity (2000 BC – 1 AD)'
    if (n < 500) return 'Late Antiquity (1 – 500 AD)'
    if (n < 1000) return 'Early Medieval (500 – 1000 AD)'
    if (n < 1500) return 'High & Late Medieval (1000 – 1500 AD)'
    return 'Early Modern & Beyond (1500 AD+)'
  }

  let lastEra = ''

  return (
    <>
    <SEO
      title="Global Timeline"
      description={`${allEvents.length} historical events across ${civilizations.length} civilizations, sorted chronologically from the ancient world to the modern age.`}
      path="/timeline"
    />
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-10 md:px-10 md:py-14">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-14 fade-up-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-5"
            style={{ background: 'rgba(212,160,23,0.08)', borderColor: 'rgba(212,160,23,0.2)', color: '#D4A017' }}
          >
            🕐 Chronological Order
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">Global Timeline</h1>
          <p className="text-[#9ca3af] text-base">
            {allEvents.length} events across {civilizations.length} civilizations — from the first cities to the modern age.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, rgba(212,160,23,0.3), rgba(212,160,23,0.05) 90%, transparent)' }} />

          <div className="space-y-2 pl-12">
            {allEvents.map((item, i) => {
              const era = getEra(item.year)
              const showEra = era !== lastEra
              lastEra = era

              return (
                <div key={i}>
                  {/* Era separator */}
                  {showEra && (
                    <div className="relative -ml-12 mb-4 mt-8 first:mt-0 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0"
                        style={{ background: '#111', borderColor: 'rgba(212,160,23,0.2)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: '#D4A017' }} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4A017]/60">{era}</span>
                    </div>
                  )}

                  <div className="relative group">
                    {/* Node dot */}
                    <div
                      className="absolute -left-[29px] top-4 w-3 h-3 rounded-full border transition-all duration-200 group-hover:scale-125"
                      style={{
                        background: item.color + '40',
                        borderColor: item.color + '70',
                        boxShadow: `0 0 0 3px ${item.color}10`,
                      }}
                    />

                    <div
                      className="rounded-xl p-4 border transition-all duration-200 hover:border-white/10"
                      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[11px] font-bold mb-1.5 tracking-wide"
                            style={{ color: item.color }}
                          >
                            {item.year}
                          </p>
                          <p className="text-[13.5px] text-[#d0d0d0] leading-snug mb-2">{item.event}</p>
                          <Link
                            to={`/civilization/${item.civId}`}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9ca3af]/50 hover:text-[#D4A017] transition-colors"
                          >
                            {item.civName}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
