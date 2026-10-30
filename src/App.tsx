import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'
import ScrollReveal from './components/scrollReaveal/ScrollReveal'
import Location from './components/location/Location'
import Agenda from './components/schedule/agenda'
import { SpeakersSection } from './components/speakersSection/SpeakersSection'
import Hero from './components/hero/Hero'
import TicketSection from './components/tickets/TicketSection'
import Checkout from './components/checkout/Checkout'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Welcome from './components/welcomeScreen/WelcomeScreem'
import Sponsors from './components/sponsors/Sponsors'
import SponsorForm from './components/sponsorsform/sponsorsForm'
import ButtonWsp from './components/buttonwsp/buttonWsp'
import Community from './components/community/Community'
import Chatbot from './components/chatbot/Chatbot'


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
          <ScrollReveal>
          <SpeakersSection />
          </ScrollReveal>
          <ScrollReveal>
          <Agenda />
          </ScrollReveal>
          <ScrollReveal>
          <TicketSection />
          </ScrollReveal>
          <ScrollReveal>
          <Checkout />
          </ScrollReveal>
          <ScrollReveal>
          <Sponsors />
          </ScrollReveal>
          <ScrollReveal>
          <SponsorForm/>
          </ScrollReveal>
          <ScrollReveal>
          <Community />
          </ScrollReveal>
          <ScrollReveal>
          <Location />
          </ScrollReveal>
          <Footer />
          <Chatbot/>
          <ButtonWsp />

        </div>
      </div>

      {welcomeVisible && (
        <Welcome homeRef={homeRef} onFinish={handleWelcomeFinish} />
      )}
    </>
  )
}

export default App
