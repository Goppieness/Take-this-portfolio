import type { SiteSettings, Work, Page } from './types'

// Import site settings using alias
import siteData from '~content/site.json'

// Dynamically import works - Paths are relative to project root (where vite.config.ts is)
const worksModules = import.meta.glob<{ default: Work }>('./content/works/*.json', { eager: true })

// Dynamically import pages - Paths are relative to project root
const pagesModules = import.meta.glob<{ default: string }>('./content/pages/*.md', { eager: true, query: '?raw', import: 'default' })

export function getSiteSettings(): SiteSettings {
  return siteData as SiteSettings
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
      works.push(module.default)
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

