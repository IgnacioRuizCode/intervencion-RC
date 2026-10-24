import './footer.css'
import type { ReactNode } from 'react'
import logo from '../../assets/logo-blanco.svg'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

interface Red {
  nombre: string
  icono: ReactNode
  url: string
}

interface EnlaceLegal {
  texto: string
  url: string
}

const redes: Red[] = [
  { nombre: 'Instagram', icono: <FaInstagram />, url: 'https://www.instagram.com/rollingcodeschool?rpxt=dzhwc2Q1Zm84Z2Vx' },
  { nombre: 'Facebook', icono: <FaFacebookF />, url: 'https://www.facebook.com/share/1F2HF6BT4Y/' },
  { nombre: 'LinkedIn', icono: <FaLinkedinIn />, url: 'https://www.linkedin.com/school/rollingcodeschool' },
  { nombre: 'YouTube', icono: <FaYoutube />, url: 'https://youtube.com/@rollingcode7175?si=JzmppyHdYDQCMAoN' },
  { nombre: 'X', icono: <FaXTwitter />, url: 'https://x.com/rollingcodeok' },
  { nombre: 'GitHub', icono: <FaGithub />, url: 'https://github.com/' },
]

const enlacesLegales: EnlaceLegal[] = [
  { texto: 'Términos y condiciones', url: '#' },
  { texto: 'Política de privacidad', url: '#' },
]

function Footer() {
  const anio: number = new Date().getFullYear()

  return (
    <footer className="footer pb-5 pb-md-0">
      
      <div className="footer__contenido d-flex flex-column flex-md-row align-items-center justify-content-md-between gap-3 mb-4 mb-md-0">
        <img src={logo} alt="Rolling Code School" className="footer__logo" />

        <ul className="footer__redes d-flex flex-row flex-wrap justify-content-center justify-content-md-end gap-3 p-0 m-0" style={{ listStyle: 'none' }}>
          {redes.map((red) => (
            <li key={red.nombre}>
              <a href={red.url} aria-label={red.nombre} target="_blank" rel="noreferrer" className="text-white fs-4">
                {red.icono}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__legal d-flex flex-column flex-md-row align-items-center justify-content-md-between text-center text-md-start px-3 px-md-0 mt-md-4">
        <ul className="footer__links d-flex flex-row flex-wrap justify-content-center gap-3 p-0 mb-2 mb-md-0" style={{ listStyle: 'none' }}>
          {enlacesLegales.map((enlace) => (
            <li key={enlace.texto}>
              <a href={enlace.url} className="text-white text-decoration-none">{enlace.texto}</a>
            </li>
          ))}
        </ul>

        <p className="footer__copyright mb-0 mt-2 mt-md-0">
          © {anio} Rolling Code School. Todos los derechos reservados.
        </p>
      </div>
      
    </footer>
  )
}

export default Footer