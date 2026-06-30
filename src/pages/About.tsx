import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Chronicl is a world history atlas that tells the stories of civilizations and nations through narrative prose, timelines, and achievements — not bullet points."
        path="/about"
      />
      <div className="min-h-screen bg-[#0a0a0a] px-4 py-10 md:px-10 md:py-14">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-14 fade-up-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-6"
              style={{ background: 'rgba(212,160,23,0.08)', borderColor: 'rgba(212,160,23,0.2)', color: '#D4A017' }}
            >
              About Chronicl
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5">
              History deserves<br />
              <span style={{
                background: 'linear-gradient(135deg, #D4A017 0%, #F5C842 50%, #D4A017 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                better storytelling
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af] leading-relaxed">
              Most history resources give you facts. Chronicl gives you stories.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

          {/* Body */}
          <div className="narrative-prose space-y-6 fade-up-2">
            <p className="text-[#b8b8b8] leading-[1.9] text-[1rem]">
              <span
                className="float-left text-6xl font-bold leading-[0.85] mr-3 mt-1"
                style={{ color: '#D4A017' }}
              >
                C
              </span>
              hronicl was built out of a simple frustration: the most important stories in human history
              are buried under Wikipedia bullet points, textbook timelines, and dry academic prose.
              The Roman Empire didn't rise in a table of dates. The Mali Empire wasn't great because
              of a list of exports. These were living civilizations — with ambitions, contradictions,
              and legacies that still shape the world we live in today.
            </p>

            <p className="text-[#b8b8b8] leading-[1.9] text-[1rem]">
              Chronicl is an attempt to fix that. Every civilization and every country in our atlas
              gets a proper narrative — three paragraphs that tell you not just what happened,
              but why it mattered. We cover 25 civilizations and 49 countries, with timelines,
              achievements, and legacy callouts for each. You can compare any two side by side,
              explore the global timeline chronologically, and follow the thread of history
              from the first cities of Mesopotamia to the nations of today.
            </p>

            <p className="text-[#b8b8b8] leading-[1.9] text-[1rem]">
              This is still early. We're adding more depth, more entities, and more tools for
              exploring how civilizations connect and influence each other. If you find a story
              that moves you — share it. That's the whole point.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3 mt-12 mb-12 fade-up-3">
            {[
              { value: '25', label: 'Civilizations' },
              { value: '49', label: 'Countries' },
              { value: '370+', label: 'Historical Events' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl p-4 border text-center"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ color: '#D4A017' }}
                >
                  {value}
                </p>
                <p className="text-[11px] text-[#9ca3af]/60 uppercase tracking-widest font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 fade-up-4">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{ background: '#D4A017', color: '#0a0a0a' }}
            >
              Explore Civilizations
            </Link>
            <Link
              to="/countries"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border transition-all duration-150 hover:border-white/10"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#9ca3af' }}
            >
              Explore Countries
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
