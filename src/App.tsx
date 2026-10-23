import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { About, Approach, Contact, Footer, Journey, PointOfView, Principles, Services, Work, Writing } from './components/Sections'
import { ui } from './content/content'
import { LangProvider, useLang } from './hooks/useLang'
import { useGlassPointer } from './hooks/useGlassPointer'

function Page() {
  const { t } = useLang()
  useGlassPointer()
  return (
    <>
      <a className="skip" href="#about">{t(ui.skip)}</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <PointOfView />
        <Approach />
        <Services />
        <Principles />
        <Journey />
        <Work />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}
