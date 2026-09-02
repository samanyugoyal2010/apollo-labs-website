/**
 * Canonical origin for metadata, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL to the deployed site origin.
 * Vercel exposes VERCEL_PROJECT_PRODUCTION_URL automatically as a fallback.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`

  return 'http://localhost:3000'
}

export const SITE_URL = resolveSiteUrl()

export const SITE_NAME = 'Collaborative Research Club'
