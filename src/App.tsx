import './index.css'
import Location from './components/location/Location'
import Agenda from './components/schedule/agenda'
import { SpeakersSection } from './components/speakersSection/SpeakersSection'
import Hero from './components/hero/Hero'
import TicketSection from './components/tickets/TicketSection'
import Checkout from './components/checkout/Checkout'




function App() {

  return (
    <>
    <Hero/>
    <SpeakersSection/>
    <TicketSection/>
    <Checkout />
    <Agenda/>
    <Location/>


    </>
  )
}

export default App
