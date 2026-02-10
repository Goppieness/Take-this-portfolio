import { Button, ButtonGroup } from 'semantic-ui-react'
import type { WorkLink } from '../lib/types'
import { getSiteSettings } from '../lib/content'

interface WorkLinksProps {
  links: WorkLink[]
}

function WorkLinks({ links }: WorkLinksProps) {
  if (!links || links.length === 0) {
    return null
  }

  const siteSettings = getSiteSettings()
  const primaryLinkStyle = siteSettings.primaryLinkStyle ?? 'button'
  const defaultLabel = siteSettings.primaryLinkDefaultLabel ?? 'View'

  const primaryLink = links.find(link => link.isPrimary)
  const secondaryLinks = links.filter(link => !link.isPrimary)

  const primaryLabel = primaryLink?.label?.trim() || defaultLabel
  const primaryUrl = primaryLink?.url

  return (
    <div style={{ marginTop: '2em' }}>
      {primaryLink && primaryUrl && (
        primaryLinkStyle === 'text' ? (
          <a
            href={primaryUrl}
            target={primaryUrl.startsWith('http') ? '_blank' : undefined}
            rel={primaryUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              color: 'var(--accent-color)',
              fontSize: '1.1em',
              fontWeight: 600,
              marginBottom: '1em',
              display: 'inline-block',
            }}
          >
            {primaryLabel}
          </a>
        ) : (
          <Button
            primary
            size="large"
            as="a"
            href={primaryUrl}
            target={primaryUrl.startsWith('http') ? '_blank' : undefined}
            rel={primaryUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ marginBottom: '1em', display: 'block' }}
          >
            {primaryLabel}
          </Button>
        )
      )}
      
      {secondaryLinks.length > 0 && (
        <ButtonGroup>
          {secondaryLinks.map((link, index) => (
            <Button
              key={index}
              basic
              as="a"
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </div>
  )
}

export default WorkLinks

