import { useState } from 'react'
import { Container, Header, Segment, Card, Dropdown, Grid } from 'semantic-ui-react'
import { getAllWorks, getAllTags, getSiteSettings } from '../lib/content'
import WorkCard from '../components/WorkCard'

function Works() {
  const siteSettings = getSiteSettings()
  const allWorks = getAllWorks()
  const allTags = getAllTags()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredWorks = selectedTag
    ? allWorks.filter(work => work.tags?.includes(selectedTag))
    : allWorks

  const tagOptions = allTags.map(tag => ({
    key: tag,
    text: tag,
    value: tag,
  }))

  return (
    <Container style={{ marginTop: '7em', marginBottom: '3em' }}>
      <Segment vertical>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h1" size="huge">
                Works
              </Header>
              {allTags.length > 0 && (
                <Dropdown
                  placeholder="Filter by tag"
                  selection
                  clearable
                  options={tagOptions}
                  value={selectedTag || undefined}
                  onChange={(_, { value }) => setSelectedTag(value as string | null)}
                  style={{ marginTop: '1em' }}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment vertical className={siteSettings.worksGridDensity === 'compact' ? 'grid-density-compact' : ''}>
        {filteredWorks.length > 0 ? (
          <Card.Group itemsPerRow={3} stackable>
            {filteredWorks.map((work) => (
              <WorkCard key={work.id} work={work} imageAspectRatio={siteSettings.imageAspectRatio} />
            ))}
          </Card.Group>
        ) : (
          <p>No works found.</p>
        )}
      </Segment>
    </Container>
  )
}

export default Works

