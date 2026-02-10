import { Container, Header, Segment, List, Icon } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getSiteSettings, getPageBySlug } from '../lib/content'
import { getToneLabels } from '../lib/tone'

function Contact() {
  const siteSettings = getSiteSettings()
  const page = getPageBySlug('contact')
  const tone = getToneLabels(siteSettings.siteTone)

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
    <Container style={{ marginTop: '7em', marginBottom: '3em' }}>
      <Segment vertical>
        {page ? (
          <>
            <Header as="h1" size="huge">
              {page.title}
            </Header>
            <div style={{ fontSize: '1.1em', lineHeight: '1.8', marginTop: '2em' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {page.content}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <Header as="h1" size="huge">
            {tone.contactPageTitle}
          </Header>
        )}

        <Segment style={{ marginTop: '2em' }}>
          <List relaxed>
            {siteSettings.email && (
              <List.Item>
                <Icon name="mail" />
                <List.Content>
                  <List.Header>Email</List.Header>
                  <List.Description>
                    <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
                  </List.Description>
                </List.Content>
              </List.Item>
            )}
            {siteSettings.socialLinks.map((social) => (
              <List.Item key={social.platform}>
                <Icon name={getIconName(social.platform) as any} />
                <List.Content>
                  <List.Header>{social.platform}</List.Header>
                  <List.Description>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.url}
                    </a>
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Segment>
    </Container>
  )
}

export default Contact

