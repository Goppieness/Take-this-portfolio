import { Segment, Container, Icon } from 'semantic-ui-react'
import { getSiteSettings } from '../lib/content'

function Footer() {
  const siteSettings = getSiteSettings()

  const getIconName = (platform: string): string => {
    const lower = platform.toLowerCase()
    if (lower.includes('instagram')) return 'instagram'
    if (lower.includes('twitter')) return 'twitter'
    if (lower.includes('linkedin')) return 'linkedin'
    if (lower.includes('facebook')) return 'facebook'
    if (lower.includes('youtube')) return 'youtube'
    return 'linkify'
  }

  return (
    <Segment inverted vertical style={{ marginTop: '3em', padding: '2em 0' }}>
      <Container textAlign="center">
        {siteSettings.socialLinks.length > 0 && (
          <div style={{ marginBottom: '1em' }}>
            {siteSettings.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: '0 0.5em', color: 'white' }}
                aria-label={social.platform}
              >
                <Icon name={getIconName(social.platform) as any} size="large" />
              </a>
            ))}
          </div>
        )}
        <p>{siteSettings.footer}</p>
        {siteSettings.footerLinks && siteSettings.footerLinks.length > 0 && (
          <p style={{ marginTop: '0.5em' }}>
            {siteSettings.footerLinks.map((link, i) => (
              <span key={i}>
                {i > 0 && ' · '}
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        )}
      </Container>
    </Segment>
  )
}

export default Footer

