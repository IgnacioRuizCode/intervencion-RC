import './index.css'
import Location from './components/location/Location'
import Agenda from './components/schedule/agenda'
import { SpeakersSection } from './components/speakersSection/SpeakersSection'
import Hero from './components/hero/Hero'
import TicketSection from './components/tickets/TicketSection'




function App() {

  return (
    <>
    <Hero/>
    <SpeakersSection/>
    <TicketSection/>
    <Agenda/>
    <Location/>


    </>
  )
}

export default App
