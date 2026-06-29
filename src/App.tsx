import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import CivilizationDetail from './pages/CivilizationDetail'
import Compare from './pages/Compare'
import Timeline from './pages/Timeline'
import Countries from './pages/Countries'
import CountryDetail from './pages/CountryDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain flex min-h-screen bg-[#0a0a0a]">
        <Sidebar />
        <main className="flex-1 min-w-0 pt-14 md:pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/civilization/:id" element={<CivilizationDetail />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/country/:id" element={<CountryDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
