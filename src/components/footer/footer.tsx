import './footer.css'
import logo from '../../assets/logo-blanco.svg'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const redes = [
  { nombre: 'Instagram', icono: <FaInstagram />, url: 'https://www.instagram.com/rollingcodeschool?rpxt=dzhwc2Q1Zm84Z2Vx' },
  { nombre: 'Facebook', icono: <FaFacebookF />, url: 'https://www.facebook.com/share/1F2HF6BT4Y/' },
  { nombre: 'LinkedIn', icono: <FaLinkedinIn />, url: 'https://www.linkedin.com/school/rollingcodeschool' },
  { nombre: 'YouTube', icono: <FaYoutube />, url: 'https://youtube.com/@rollingcode7175?si=JzmppyHdYDQCMAoN' },
  { nombre: 'X', icono: <FaXTwitter />, url: 'https://x.com/rollingcodeok' },
  { nombre: 'GitHub', icono: <FaGithub />, url: 'https://github.com/' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contenido">
        <img src={logo} alt="Rolling Code School" className="footer__logo" />

        <ul className="footer__redes">
          {redes.map((red) => (
            <li key={red.nombre}>
              <a href={red.url} aria-label={red.nombre} target="_blank" rel="noreferrer">
                {red.icono}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer