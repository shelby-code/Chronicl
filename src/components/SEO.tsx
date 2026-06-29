import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  path?: string
}

const BASE_URL = 'https://chronicl-bice.vercel.app'
const DEFAULT_DESC = 'Explore the civilizations and nations that shaped our world — through narrative prose, timelines, and the arc of history.'

export default function SEO({ title, description, path = '' }: SEOProps) {
  const fullTitle = title ? `${title} — Chronicl` : 'Chronicl — World History Atlas'
  const desc = description ?? DEFAULT_DESC
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content="Chronicl" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  )
}
