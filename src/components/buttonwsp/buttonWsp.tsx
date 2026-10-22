import './buttonWsp.css'
import { FaWhatsapp } from 'react-icons/fa'

const numero: string = '5493815783030'
const mensaje: string = 'Hola, quiero más información sobre el workshop'

const url: string = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`

function ButtonWsp() {
  return (
    <a
      href={url}
      className="buttonWsp"
      aria-label="Contactanos por WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <FaWhatsapp />
    </a>
  )
}

export default ButtonWsp