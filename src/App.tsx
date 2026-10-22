import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'
import Location from './components/location/Location'
import Agenda from './components/schedule/agenda'
import { SpeakersSection } from './components/speakersSection/SpeakersSection'
import Hero from './components/hero/Hero'
import TicketSection from './components/tickets/TicketSection'
import Checkout from './components/checkout/Checkout'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Welcome from './components/welcomeScreen/WelcomeScreem'

function App() {
  const [welcomeVisible, setWelcomeVisible] = useState(true)
  const homeRef = useRef<HTMLDivElement>(null)

  const handleWelcomeFinish = useCallback(() => {
    setWelcomeVisible(false)
  }, [])

  useEffect(() => {
    if (welcomeVisible) return

    const home = homeRef.current
    if (!home) return

    home.style.clipPath = ''
    const content = home.querySelector<HTMLElement>('.app-home__content')
    if (content) {
      content.style.transform = ''
      content.style.opacity = ''
    }
  }, [welcomeVisible])

  return (
    <>
      <div
        ref={homeRef}
        className={welcomeVisible ? 'app-home app-home--gated' : 'app-home'}
        aria-hidden={welcomeVisible || undefined}
        inert={welcomeVisible || undefined}
      >
        <div className="app-home__content">
          <Navbar />
          <Hero />
          <SpeakersSection />
          <Agenda />
          <TicketSection />
          <Checkout />
          <Location />
          <Footer />
        </div>
      </div>

      {welcomeVisible && (
        <Welcome homeRef={homeRef} onFinish={handleWelcomeFinish} />
      )}
    </>
  )
}

export default App
