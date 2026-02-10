import type { SiteSettings, Work, Page } from './types'

// Import site settings using alias
import siteData from '~content/site.json'

// Paths relative to this file (app/src/lib/): ../../../ = project root, then content/
const worksModules = import.meta.glob<{ default: Work }>('../../../content/works/*.json', { eager: true })

const pagesModules = import.meta.glob<{ default: string }>('../../../content/pages/*.md', { eager: true, query: '?raw', import: 'default' })

/** Normalize image path from CMS (string or { path/image: string }) so it works on the deployed site. */
function normalizeImagePath(value: unknown): string | undefined {
  if (value == null) return undefined
  if (typeof value === 'string') {
    const s = value.trim()
    if (!s) return undefined
    if (s.startsWith('http://') || s.startsWith('https://')) return s
    return s.startsWith('/') ? s : `/${s}`
  }
  if (typeof value === 'object' && value !== null) {
    const o = value as Record<string, unknown>
    const path = (o.path ?? o.image ?? o.url) as string | undefined
    return path ? normalizeImagePath(path) : undefined
  }
  return undefined
}

/** Normalize media array from CMS (list widget can save as string[] or Array<{ image: string }>). */
function normalizeMediaArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return []
  return arr
    .map((item) => (typeof item === 'string' ? item : (item && typeof item === 'object' && (item as Record<string, unknown>).image) ? (item as Record<string, unknown>).image : null))
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
    .map((s) => (s.startsWith('http') ? s : s.startsWith('/') ? s : `/${s}`))
}

export function getSiteSettings(): SiteSettings {
  const raw = siteData as SiteSettings
  return {
    ...raw,
    heroBackgroundImage: normalizeImagePath(raw.heroBackgroundImage) ?? raw.heroBackgroundImage,
    aboutImage: normalizeImagePath(raw.aboutImage) ?? raw.aboutImage,
    logoImage: normalizeImagePath(raw.logoImage) ?? raw.logoImage,
    ogImage: normalizeImagePath(raw.ogImage) ?? raw.ogImage,
  }
}

function sortWorks(works: Work[], orderMode: 'automatic' | 'manual'): Work[] {
  if (orderMode === 'manual') {
    return [...works].sort((a, b) => {
      const orderA = a.order ?? 9999
      const orderB = b.order ?? 9999
      if (orderA !== orderB) return orderA - orderB
      return a.id.localeCompare(b.id)
    })
  }
  // automatic: by date (newest first) or by id
  return [...works].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return a.id.localeCompare(b.id)
  })
}

export function getAllWorks(): Work[] {
  const works: Work[] = []
  for (const path in worksModules) {
    const module = worksModules[path]
    if (module?.default) {
      const w = module.default
      works.push({
        ...w,
        media: normalizeMediaArray(w.media),
      })
    }
  }
  const settings = getSiteSettings()
  const orderMode = settings.workOrderMode ?? 'automatic'
  return sortWorks(works, orderMode)
}

export function getFeaturedWorks(): Work[] {
  return getAllWorks().filter(work => work.featured === true)
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find(work => work.slug === slug)
}

export function getPageBySlug(slug: string): Page | undefined {
  for (const path in pagesModules) {
    if (path.includes(`/${slug}.md`)) {
      const rawContent = pagesModules[path]?.default || ''
      
      // Parse frontmatter if present
      const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      let title = slug.charAt(0).toUpperCase() + slug.slice(1)
      let content = rawContent
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const body = frontmatterMatch[2]
        
        // Extract title from frontmatter
        const titleMatch = frontmatter.match(/title:\s*(.+)/)
        if (titleMatch) {
          title = titleMatch[1].trim()
        }
        
        content = body
      }
      
      return {
        title,
        slug,
        content,
      }
    }
  }
  
  return undefined
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  getAllWorks().forEach(work => {
    work.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

