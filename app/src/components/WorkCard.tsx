import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'
import type { Work, ImageAspectRatio } from '../lib/types'

interface WorkCardProps {
  work: Work
  imageAspectRatio?: ImageAspectRatio
}

function getAspectRatioPadding(ratio: ImageAspectRatio | undefined): string {
  switch (ratio) {
    case 'square':
      return '100%'
    case '4-5':
      return '125%' /* 5/4 */
    case 'original':
    default:
      return '75%'
  }
}

function WorkCard({ work, imageAspectRatio }: WorkCardProps) {
  const firstImage = work.media && work.media.length > 0 ? work.media[0] : '/uploads/placeholder.jpg'
  const paddingBottom = getAspectRatioPadding(imageAspectRatio)

  return (
    <Card
      as={Link}
      to={`/works/${work.slug}`}
      style={{
        height: '100%',
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
      }}
      className="work-card"
    >
      <div style={{ position: 'relative', overflow: 'hidden', paddingBottom }}>
        <Image
          src={firstImage}
          alt={work.title}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          loading="lazy"
          decoding="async"
          onMouseEnter={(e: any) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        />
      </div>
      <Card.Content style={{ padding: '1.5em 0' }}>
        <Card.Header style={{ 
          fontSize: '1.2em',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5em',
        }}>
          {work.title}
        </Card.Header>
        {work.tags && work.tags.length > 0 && (
          <Card.Meta style={{ color: '#999', fontSize: '0.9em' }}>
            {work.tags.slice(0, 3).join(' • ')}
          </Card.Meta>
        )}
      </Card.Content>
    </Card>
  )
}

export default WorkCard

