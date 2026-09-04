import { projectSlugs } from '@/lib/papers'
import { SITE_URL } from '@/lib/site'

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectSlugs().map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}
