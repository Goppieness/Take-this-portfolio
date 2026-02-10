import { useState } from 'react'
import { Image, Modal, Container } from 'semantic-ui-react'

interface WorkGalleryProps {
  images: string[]
  title: string
}

function WorkGallery({ images, title }: WorkGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

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
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${title} - Image ${index + 1}`}
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
            src={images[selectedImage]}
            alt={`${title} - Image ${selectedImage + 1}`}
            wrapped
            style={{ width: '100%' }}
          />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default WorkGallery

