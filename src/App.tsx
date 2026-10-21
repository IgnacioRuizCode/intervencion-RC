import './App.css'
import Location from './components/location/Location'
import Agenda from './components/schedule/agenda'
import { SpeakersSection } from './components/speakersSection/SpeakersSection'
import TicketSection from './components/tickets/TicketSection'



function App() {

  return (
    <>
    <SpeakersSection/>
    <TicketSection/>
    <Agenda/>
    <Location/>
    </>
  )
}

export default App
