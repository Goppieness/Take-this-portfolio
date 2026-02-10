import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSiteSettings, getWorkBySlug } from '../lib/content'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: string
}

function SEO({ title, description, image, type = 'website' }: SEOProps) {
  const location = useLocation()
  const siteSettings = getSiteSettings()
  
  // Get work-specific data if on work detail page
  const workSlug = location.pathname.match(/\/works\/([^/]+)/)?.[1]
  const work = workSlug ? getWorkBySlug(workSlug) : undefined

  const pageTitle = title || work?.title || siteSettings.siteName
  const pageDescription = description || work?.description?.substring(0, 160) || siteSettings.description
  const pageImage = image || work?.media?.[0] || siteSettings.ogImage || ''
  const canonicalUrl = `${siteSettings.canonicalUrl}${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = pageTitle

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', pageDescription)
    
    // OpenGraph tags
    updateMetaTag('og:title', pageTitle, true)
    updateMetaTag('og:description', pageDescription, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', canonicalUrl, true)
    if (pageImage) {
      updateMetaTag('og:image', pageImage.startsWith('http') ? pageImage : `${siteSettings.canonicalUrl}${pageImage}`, true)
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', pageTitle)
    updateMetaTag('twitter:description', pageDescription)
    if (pageImage) {
      updateMetaTag('twitter:image', pageImage.startsWith('http') ? pageImage : `${siteSettings.canonicalUrl}${pageImage}`)
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)
  }, [pageTitle, pageDescription, pageImage, type, canonicalUrl, siteSettings.canonicalUrl])

  return null
}

export default SEO

