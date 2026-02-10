/**
 * Curated Google Fonts pairings. Keys match CMS fontPairing select values.
 * Loaded via Google Fonts; font-family applied to body.
 */
export const FONT_PAIRINGS: Record<
  string,
  { url: string; fontFamily: string }
> = {
  'inter-playfair': {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@400;600;700&display=swap',
    fontFamily: "'Inter', 'Playfair Display', -apple-system, sans-serif",
  },
  'inter-merriweather': {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Merriweather:wght@400;600;700&display=swap',
    fontFamily: "'Inter', 'Merriweather', Georgia, serif",
  },
  'lora-sourcesans': {
    url: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap',
    fontFamily: "'Source Sans 3', 'Lora', -apple-system, sans-serif",
  },
  'opensans-lato': {
    url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Lato:wght@400;600;700&display=swap',
    fontFamily: "'Open Sans', 'Lato', -apple-system, sans-serif",
  },
  'poppins-opensans': {
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap',
    fontFamily: "'Poppins', 'Open Sans', -apple-system, sans-serif",
  },
  'roboto-slab': {
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Slab:wght@400;600;700&display=swap',
    fontFamily: "'Roboto', 'Roboto Slab', -apple-system, sans-serif",
  },
  'montserrat-opensans': {
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap',
    fontFamily: "'Montserrat', 'Open Sans', -apple-system, sans-serif",
  },
  'raleway-lora': {
    url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&family=Lora:wght@400;600;700&display=swap',
    fontFamily: "'Raleway', 'Lora', -apple-system, sans-serif",
  },
  'worksans-crimson': {
    url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&family=Crimson+Pro:wght@400;600;700&display=swap',
    fontFamily: "'Work Sans', 'Crimson Pro', -apple-system, serif",
  },
  'dm-sans-serif': {
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=DM+Serif+Display:ital@0;1&display=swap',
    fontFamily: "'DM Sans', 'DM Serif Display', -apple-system, serif",
  },
  'spacegrotesk-literata': {
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&display=swap',
    fontFamily: "'Space Grotesk', 'Literata', -apple-system, serif",
  },
  'outfit-fraunces': {
    url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap',
    fontFamily: "'Outfit', 'Fraunces', -apple-system, serif",
  },
  'manrope-garamond': {
    url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=EB+Garamond:wght@400;600;700&display=swap',
    fontFamily: "'Manrope', 'EB Garamond', -apple-system, serif",
  },
  'jakarta-serif': {
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap',
    fontFamily: "'Plus Jakarta Sans', 'Source Serif 4', -apple-system, serif",
  },
  'sora-plexserif': {
    url: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=IBM+Plex+Serif:wght@400;600;700&display=swap',
    fontFamily: "'Sora', 'IBM Plex Serif', -apple-system, serif",
  },
  system: {
    url: '',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  },
}

export function getFontStack(key: string | undefined): string {
  if (!key || !FONT_PAIRINGS[key]) {
    return FONT_PAIRINGS.system.fontFamily
  }
  return FONT_PAIRINGS[key].fontFamily
}

export function getGoogleFontsUrl(key: string | undefined): string | null {
  if (!key || key === 'system' || !FONT_PAIRINGS[key]) {
    return null
  }
  return FONT_PAIRINGS[key].url || null
}
