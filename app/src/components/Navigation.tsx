import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, Container, Sidebar, Icon } from 'semantic-ui-react'
import { getSiteSettings } from '../lib/content'

function Navigation() {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const location = useLocation()
  const siteSettings = getSiteSettings()

  const handleSidebarHide = () => setSidebarVisible(false)
  const handleToggle = () => setSidebarVisible(true)

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    setSidebarVisible(false)
    
    if (path.startsWith('#')) {
      // Scroll to section on same page
      if (location.pathname === '/') {
        const element = document.querySelector(path)
        if (element) {
          const offset = 80 // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      } else {
        // Navigate to home then scroll
        window.location.href = `/${path}`
      }
    } else {
      // Regular navigation
      window.location.href = path
    }
  }

  return (
    <>
      <Menu fixed="top" inverted style={{ borderRadius: 0, background: 'rgba(0, 0, 0, 0.9)' }}>
        <Container>
          <Menu.Item
            header
            as="a"
            href="/"
            style={{ fontSize: '1.2em', fontWeight: 'bold' }}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            {siteSettings.useLogoImage && siteSettings.logoImage ? (
              <img
                src={siteSettings.logoImage}
                alt={siteSettings.artistName}
                onError={(e) => {
                  const el = e.currentTarget
                  if (el.src !== '/placeholder.svg') el.src = '/placeholder.svg'
                }}
                style={{ maxHeight: '36px', width: 'auto', verticalAlign: 'middle' }}
              />
            ) : (
              siteSettings.artistName
            )}
          </Menu.Item>
          <Menu.Menu position="right">
            {siteSettings.navigation.filter((item) => item.visible !== false).map((item) => (
              <Menu.Item
                key={item.path}
                as="a"
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9em' }}
              >
                {item.label}
              </Menu.Item>
            ))}
            <Menu.Item onClick={handleToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={sidebarVisible}
        width="thin"
      >
        {siteSettings.navigation.filter((item) => item.visible !== false).map((item) => (
          <Menu.Item
            key={item.path}
            as="a"
            href={item.path}
            onClick={(e) => handleNavClick(e, item.path)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Sidebar>
    </>
  )
}

export default Navigation

