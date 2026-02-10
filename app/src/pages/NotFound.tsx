import { Link } from 'react-router-dom'
import { Container, Header, Segment, Button } from 'semantic-ui-react'

function NotFound() {
  return (
    <Container style={{ marginTop: '7em', marginBottom: '3em' }}>
      <Segment textAlign="center" style={{ padding: '4em 2em' }}>
        <Header as="h1" size="huge">
          404
        </Header>
        <Header as="h2">Page Not Found</Header>
        <p style={{ fontSize: '1.2em', marginTop: '1em', marginBottom: '2em' }}>
          The page you're looking for doesn't exist.
        </p>
        <Button as={Link} to="/" primary size="large">
          Go Home
        </Button>
      </Segment>
    </Container>
  )
}

export default NotFound

