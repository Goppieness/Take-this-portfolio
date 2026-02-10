import { useState } from 'react'
import { Image, Modal, Container } from 'semantic-ui-react'

const PLACEHOLDER_IMAGE = '/placeholder.svg'

interface WorkGalleryProps {
  images: string[]
  title: string
}

function WorkGallery({ images, title }: WorkGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [failedIndices, setFailedIndices] = useState<Set<number>>(() => new Set())

  const getImageSrc = (index: number) =>
    failedIndices.has(index) ? PLACEHOLDER_IMAGE : images[index]

  const handleImageError = (index: number) => {
    setFailedIndices((prev) => new Set(prev).add(index))
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
    setModalOpen(true)
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      <Container>
        <Image.Group size="medium" style={{ marginBottom: '2em' }}>
          {images.map((_, index) => (
            <Image
              key={index}
              src={getImageSrc(index)}
              alt={`${title} - Image ${index + 1}`}
              onError={() => handleImageError(index)}
              rounded
              style={{ cursor: 'pointer', margin: '0.5em' }}
              onClick={() => handleImageClick(index)}
              loading={index > 2 ? 'lazy' : 'eager'}
              decoding="async"
            />
          ))}
        </Image.Group>
      </Container>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="large"
        closeIcon
      >
        <Modal.Content image>
          <Image
            src={getImageSrc(selectedImage)}
            alt={`${title} - Image ${selectedImage + 1}`}
            onError={() => handleImageError(selectedImage)}
            wrapped
            style={{ width: '100%' }}
          />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default WorkGallery

