import { useEffect } from 'react'
import { Container, Header, Segment, Card, Grid, Image, Button, List, Icon } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getSiteSettings, getFeaturedWorks, getAllWorks } from '../lib/content'
import { getToneLabels } from '../lib/tone'
import WorkCard from '../components/WorkCard'

function Home() {
  const siteSettings = getSiteSettings()
  const featuredWorks = getFeaturedWorks()
  const allWorks = getAllWorks()

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

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
    <div>
      {/* Hero Section */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: siteSettings.heroBackgroundImage
            ? `url(${siteSettings.heroBackgroundImage})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          paddingTop: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />
        <Container textAlign="center" style={{ position: 'relative', zIndex: 1 }}>
          <Header
            as="h1"
            style={{
              fontSize: '4em',
              color: 'white',
              fontWeight: 300,
              letterSpacing: '0.1em',
              marginBottom: '0.5em',
              textTransform: 'uppercase',
            }}
          >
            {siteSettings.heroTitle || siteSettings.artistName}
          </Header>
          {siteSettings.heroSubtitle && (
            <Header
              as="h3"
              style={{
                color: 'white',
                fontWeight: 300,
                letterSpacing: '0.05em',
                marginTop: 0,
              }}
            >
              {siteSettings.heroSubtitle}
            </Header>
          )}
        </Container>
      </section>

      {/* Statement Section (when home emphasis is Statement) */}
      {siteSettings.homeEmphasis === 'statement' && siteSettings.heroStatement && (
        <section id="statement" style={{ padding: '6em 0', background: 'var(--bg)' }}>
          <Container>
            <div style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.2em', lineHeight: '1.8' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {siteSettings.heroStatement}
              </ReactMarkdown>
            </div>
          </Container>
        </section>
      )}

      {/* Featured Works Section */}
      <section
        id="works"
        className={siteSettings.worksGridDensity === 'compact' ? 'grid-density-compact' : 'grid-density-comfortable'}
        style={{ padding: '6em 0', background: 'var(--bg-secondary)' }}
      >
        <Container>
          {featuredWorks.length > 0 && (
            <>
              <Header
                as="h2"
                textAlign="center"
                style={{
                  fontSize: '2.5em',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  marginBottom: '3em',
                  textTransform: 'uppercase',
                }}
              >
                Selected Work
              </Header>
              <Card.Group itemsPerRow={4} stackable>
                {featuredWorks.map((work) => (
                  <WorkCard key={work.id} work={work} imageAspectRatio={siteSettings.imageAspectRatio} />
                ))}
              </Card.Group>
            </>
          )}
        </Container>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className={siteSettings.worksGridDensity === 'compact' ? 'grid-density-compact' : 'grid-density-comfortable'}
        style={{ padding: '6em 0', background: 'var(--bg)' }}
      >
        <Container>
          <Header
            as="h2"
            textAlign="center"
            style={{
              fontSize: '2.5em',
              fontWeight: 300,
              letterSpacing: '0.1em',
              marginBottom: '3em',
              textTransform: 'uppercase',
            }}
          >
            Gallery
          </Header>
          {allWorks.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2.5em',
                padding: '0 1em',
              }}
              className="gallery-grid"
            >
              {allWorks.map((work) => (
                <WorkCard key={work.id} work={work} imageAspectRatio={siteSettings.imageAspectRatio} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '1.1em' }}>
              No works available yet.
            </p>
          )}
        </Container>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '6em 0', background: 'var(--bg-secondary)' }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                {siteSettings.aboutImage && (
                  <Image
                    src={siteSettings.aboutImage}
                    alt={siteSettings.artistName}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const el = e.currentTarget
                      if (el.src !== '/placeholder.svg') el.src = '/placeholder.svg'
                    }}
                    rounded
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <Header
                  as="h2"
                  style={{
                    fontSize: '3em',
                    fontWeight: 300,
                    marginBottom: '1em',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  About
                </Header>
                {siteSettings.aboutContent ? (
                  <div style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {siteSettings.aboutContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
                    {siteSettings.description}
                  </p>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6em 0', background: 'var(--bg)' }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16} textAlign="center">
                <Header
                  as="h2"
                  style={{
                    fontSize: '3em',
                    fontWeight: 300,
                    marginBottom: '1em',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {tone.contactHeading}
                </Header>
                {siteSettings.contactContent && (
                  <div
                    style={{
                      fontSize: '1.2em',
                      lineHeight: '1.8',
                      maxWidth: '800px',
                      margin: '0 auto 2em',
                    }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {siteSettings.contactContent}
                    </ReactMarkdown>
                  </div>
                )}
                <Segment style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <List relaxed>
                    {siteSettings.email && (
                      <List.Item>
                        <Icon name="mail" size="large" />
                        <List.Content>
                          <List.Header>Email</List.Header>
                          <List.Description>
                            <a href={`mailto:${siteSettings.email}`}>
                              {siteSettings.email}
                            </a>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    )}
                    {siteSettings.socialLinks.map((social) => (
                      <List.Item key={social.platform}>
                        <Icon name={getIconName(social.platform) as any} size="large" />
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
                <Button
                  size="large"
                  primary
                  style={{ marginTop: '2em', padding: '1em 3em' }}
                  as="a"
                  href={`mailto:${siteSettings.email || ''}`}
                >
                  {tone.primaryCta}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    </div>
  )
}

export default Home
