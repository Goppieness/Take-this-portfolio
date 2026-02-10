import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import SEO from './components/SEO'
import { Container, Loader } from 'semantic-ui-react'
import { getSiteSettings } from './lib/content'
import { getFontStack, getGoogleFontsUrl } from './lib/fonts'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Works = lazy(() => import('./pages/Works'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function applyTheme() {
  const settings = getSiteSettings()
  const accent = settings.accentColor ?? '#2185d0'
  const mode = settings.themeMode ?? 'light'
  document.documentElement.style.setProperty('--accent-color', accent)
  document.documentElement.setAttribute('data-theme', mode)

  const fontKey = settings.fontPairing ?? 'system'
  document.body.style.fontFamily = getFontStack(fontKey)
  const fontUrl = getGoogleFontsUrl(fontKey)
  let link = document.getElementById('google-fonts-link') as HTMLLinkElement | null
  if (fontUrl) {
    if (!link) {
      link = document.createElement('link')
      link.id = 'google-fonts-link'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = fontUrl
  } else if (link) {
    link.remove()
  }
}

function App() {
  useEffect(() => {
    applyTheme()
  }, [])

  return (
    <Router>
      <SEO />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <main style={{ flex: 1 }}>
          <Suspense fallback={
            <Container style={{ marginTop: '7em', textAlign: 'center', padding: '4em' }}>
              <Loader active size="large" />
            </Container>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:slug" element={<WorkDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

