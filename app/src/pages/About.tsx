import { Container, Header, Segment } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPageBySlug } from '../lib/content'

function About() {
  const page = getPageBySlug('about')

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
          <Header as="h2">Page not found</Header>
        )}
      </Segment>
    </Container>
  )
}

export default About

