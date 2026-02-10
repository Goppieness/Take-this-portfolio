import { useParams, Link } from 'react-router-dom'
import { Container, Header, Segment, Button, Grid } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getWorkBySlug, getAllWorks } from '../lib/content'
import WorkGallery from '../components/WorkGallery'
import WorkLinks from '../components/WorkLinks'

function WorkDetail() {
  const { slug } = useParams<{ slug: string }>()
  const work = slug ? getWorkBySlug(slug) : undefined
  const allWorks = getAllWorks()

  if (!work) {
    return (
      <Container style={{ marginTop: '7em', marginBottom: '3em' }}>
        <Segment>
          <Header as="h2">Work not found</Header>
          <p>The work you're looking for doesn't exist.</p>
          <Button as={Link} to="/works" primary>
            View All Works
          </Button>
        </Segment>
      </Container>
    )
  }

  const currentIndex = allWorks.findIndex(w => w.id === work.id)
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null

  return (
    <Container style={{ marginTop: '7em', marginBottom: '3em' }}>
      <Segment vertical>
        <Header as="h1" size="huge">
          {work.title}
        </Header>
        {work.date && (
          <Header as="h4" subheader>
            {new Date(work.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Header>
        )}
        {work.tags && work.tags.length > 0 && (
          <div style={{ marginTop: '1em', marginBottom: '1em' }}>
            {work.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '0.3em 0.8em',
                  margin: '0.2em',
                  background: '#f0f0f0',
                  borderRadius: '3px',
                  fontSize: '0.9em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Segment>

      <Segment vertical>
        <WorkGallery images={work.media} title={work.title} />
      </Segment>

      {work.description && (
        <Segment vertical>
          <Header as="h2" dividing>
            About This Work
          </Header>
          <div style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {work.description}
            </ReactMarkdown>
          </div>
        </Segment>
      )}

      {work.links && work.links.length > 0 && (
        <Segment vertical>
          <WorkLinks links={work.links} />
        </Segment>
      )}

      <Segment vertical>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {prevWork && (
                <Button as={Link} to={`/works/${prevWork.slug}`} fluid>
                  ← Previous: {prevWork.title}
                </Button>
              )}
            </Grid.Column>
            <Grid.Column width={8}>
              {nextWork && (
                <Button as={Link} to={`/works/${nextWork.slug}`} fluid>
                  Next: {nextWork.title} →
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default WorkDetail

