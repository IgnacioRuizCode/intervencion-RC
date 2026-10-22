import './app.css'
import Location from './components/location/Location'
import Agenda from './components/schedule/agenda'
import { SpeakersSection } from './components/speakersSection/SpeakersSection'
import Footer from './components/footer/footer'





function App() {

  return (
    <>
    <SpeakersSection/>
    <Agenda/>
    <Location/>
    <Footer/>
    </>
  )
}

export default App
