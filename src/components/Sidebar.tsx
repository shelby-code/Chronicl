import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
  {
    to: '/',
    label: 'Home',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/countries',
    label: 'Countries',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: '/compare',
    label: 'Compare',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    to: '/timeline',
    label: 'Global Timeline',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#161616] border border-white/10 text-[#f0f0f0] shadow-xl"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          w-56 border-r border-white/[0.06]
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:sticky md:top-0 md:h-screen md:shrink-0
        `}
        style={{
          background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)',
        }}
      >
        {/* Logo */}
        <div className="px-5 py-7">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(212,160,23,0.15)' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: '#D4A017' }}>
              Chronicl
            </span>
          </div>
          <p className="text-[10px] text-[#9ca3af]/60 ml-8 tracking-widest uppercase">World History Atlas</p>
        </div>

        <div className="mx-5 h-px bg-white/[0.06] mb-4" />

        {/* Nav label */}
        <p className="px-5 text-[10px] font-semibold text-[#9ca3af]/40 uppercase tracking-widest mb-2">Navigate</p>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-[#D4A017]'
                    : 'text-[#9ca3af]/70 hover:text-[#f0f0f0] hover:bg-white/[0.04]'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'linear-gradient(90deg, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.04) 100%)',
                borderLeft: '2px solid #D4A017',
                paddingLeft: '10px',
              } : {}}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-5">
          <div className="h-px bg-white/[0.06] mb-4" />
          <p className="text-[10px] text-[#9ca3af]/30">© 2025 Chronicl</p>
        </div>
      </aside>
    </>
  )
}
