import './footer.css'
import type { CSSProperties, ReactNode } from 'react'
import logo from '../../assets/logo-blanco.svg'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

interface Red {
  nombre: string
  icono: ReactNode
  url: string
  color: string
  colorIcono?: string
}

interface EnlaceLegal {
  texto: string
  url: string
}

const redes: Red[] = [
  {
    nombre: 'Instagram',
    icono: <FaInstagram />,
    url: 'https://www.instagram.com/rollingcodeschool?rpxt=dzhwc2Q1Zm84Z2Vx',
    color: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
  },
  {
    nombre: 'Facebook',
    icono: <FaFacebookF />,
    url: 'https://www.facebook.com/share/1F2HF6BT4Y/',
    color: '#1877F2',
  },
  {
    nombre: 'LinkedIn',
    icono: <FaLinkedinIn />,
    url: 'https://www.linkedin.com/school/rollingcodeschool',
    color: '#0A66C2',
  },
  {
    nombre: 'YouTube',
    icono: <FaYoutube />,
    url: 'https://youtube.com/@rollingcode7175?si=JzmppyHdYDQCMAoN',
    color: '#FF0000',
  },
  {
    nombre: 'X',
    icono: <FaXTwitter />,
    url: 'https://x.com/rollingcodeok',
    color: '#FFFFFF',
    colorIcono: '#000000',
  },
  {
    nombre: 'GitHub',
    icono: <FaGithub />,
    url: 'https://github.com/',
    color: '#FFFFFF',
    colorIcono: '#000000',
  },
]

const enlacesLegales: EnlaceLegal[] = [
  { texto: 'Términos y condiciones', url: '#' },
  { texto: 'Política de privacidad', url: '#' },
]

function Footer() {
  const anio: number = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__contenido">
        <img src={logo} alt="Rolling Code School" className="footer__logo" />

        <ul className="footer__redes">
          {redes.map((red) => (
            <li key={red.nombre}>
              <a
                href={red.url}
                aria-label={red.nombre}
                target="_blank"
                rel="noreferrer"
                style={
                  {
                    '--color-red': red.color,
                    '--color-icono': red.colorIcono ?? '#fff',
                  } as CSSProperties
                }
              >
                {red.icono}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer__legal">
        <ul className="footer__links">
          {enlacesLegales.map((enlace) => (
            <li key={enlace.texto}>
              <a href={enlace.url}>{enlace.texto}</a>
            </li>
          ))}
        </ul>

        <p className="footer__copyright">
          © {anio} Rolling Code School. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer