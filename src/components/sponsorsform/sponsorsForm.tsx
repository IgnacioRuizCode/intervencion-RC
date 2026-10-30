import './sponsorsForm.css'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { FiUploadCloud, FiSend } from 'react-icons/fi'
import SponsorTicket from '../sponsorticket/SponsorTicket'
 import type { TicketSponsor } from '../sponsorticket/SponsorTicket'

interface FormularioSponsor {
  nombre: string
  apellido: string
  empresa: string
  email: string
  tipo: string
  logo: File | null
  mensaje: string
}

interface ErroresSponsor {
  nombre?: string
  apellido?: string
  empresa?: string
  email?: string
  tipo?: string
  logo?: string
  mensaje?: string
}


const niveles: string[] = ['Oro', 'Plata', 'Bronce']

const tiposLogoPermitidos: string[] = [
  'image/png',
  'image/svg+xml',
  'image/jpeg',
  'image/webp',
]

const pesoMaximoLogo: number = 5 * 1024 * 1024 // 5 MB

const datosIniciales: FormularioSponsor = {
  nombre: '',
  apellido: '',
  empresa: '',
  email: '',
  tipo: '',
  logo: null,
  mensaje: '',
}

function validar(datos: FormularioSponsor): ErroresSponsor {
  const errores: ErroresSponsor = {}

  if (datos.nombre.trim().length < 2) {
    errores.nombre = 'Ingresá tu nombre (mínimo 2 caracteres)'
  }

  if (datos.apellido.trim().length < 2) {
    errores.apellido = 'Ingresá tu apellido (mínimo 2 caracteres)'
  }

  if (datos.empresa.trim().length < 2) {
    errores.empresa = 'Ingresá el nombre de tu empresa'
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (datos.email.trim() === '') {
    errores.email = 'Ingresá tu email corporativo'
  } else if (!regexEmail.test(datos.email.trim())) {
    errores.email = 'El email no tiene un formato válido'
  }

  if (datos.tipo === '') {
    errores.tipo = 'Seleccioná un nivel de sponsoreo'
  }

  if (datos.logo) {
    if (!tiposLogoPermitidos.includes(datos.logo.type)) {
      errores.logo = 'El logo tiene que ser PNG, SVG, JPG o WEBP'
    } else if (datos.logo.size > pesoMaximoLogo) {
      errores.logo = 'El logo no puede pesar más de 5MB'
    }
  }

  if (datos.mensaje.length > 500) {
    errores.mensaje = 'El mensaje no puede superar los 500 caracteres'
  }

  return errores
}

function SponsorForm() {
const [datos, setDatos] = useState<FormularioSponsor>(datosIniciales)
const [errores, setErrores] = useState<ErroresSponsor>({})
const [ticket, setTicket] = useState<TicketSponsor | null>(null)

const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value })
    setErrores({ ...errores, [name]: '' })
    
  }

  const handleLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] ?? null
    setDatos({ ...datos, logo: archivo })
    setErrores({ ...errores, logo: '' })
    
  }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length === 0) {
      console.log('Postulación enviada:', datos)
      setTicket({
        numero: `SP-${Date.now().toString().slice(-6)}`,
        fecha: new Date().toLocaleDateString('es-AR'),
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        empresa: datos.empresa.trim(),
        email: datos.email.trim(),
        tipo: datos.tipo,
      })
      setDatos(datosIniciales)
    }
  }
    if (ticket) {
    return (
      <section className="sponsor py-5" id="sponsors">
        <div className="container">
          <SponsorTicket
            ticket={ticket}
            onNuevaPostulacion={() => setTicket(null)}
          />
        </div>
      </section>
    )
  }
  return (
    <section className="sponsor py-5" id="sponsors">
      <div className="container">
        <div className="sponsor__encabezado">
          <h2 className="sponsor__titulo">Sumate como Sponsor</h2>
          <p className="sponsor__texto">
            Conectá tu marca con más de 120 talentos IT, programadores junior,
            semi-seniors y líderes tecnológicos del norte argentino. Completá el
            formulario y nos contactaremos en menos de 24 horas hábiles.
          </p>
        </div>

        <form className="sponsor__form" onSubmit={handleSubmit} noValidate>
          <div className="row g-4">
            <div className="col-md-6">
              <label htmlFor="nombre" className="sponsor__label">
                Nombre <span className="sponsor__requerido">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ej. Martín"
                value={datos.nombre}
                onChange={handleChange}
                className={`sponsor__input ${errores.nombre ? 'sponsor__input--error' : ''}`}
              />
              {errores.nombre && <small className="sponsor__error">{errores.nombre}</small>}
            </div>

            <div className="col-md-6">
              <label htmlFor="apellido" className="sponsor__label">
                Apellido <span className="sponsor__requerido">*</span>
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                placeholder="Ej. González"
                value={datos.apellido}
                onChange={handleChange}
                className={`sponsor__input ${errores.apellido ? 'sponsor__input--error' : ''}`}
              />
              {errores.apellido && <small className="sponsor__error">{errores.apellido}</small>}
            </div>

            <div className="col-md-6">
              <label htmlFor="empresa" className="sponsor__label">
                Empresa <span className="sponsor__requerido">*</span>
              </label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                placeholder="Ej. Acme Technologies"
                value={datos.empresa}
                onChange={handleChange}
                className={`sponsor__input ${errores.empresa ? 'sponsor__input--error' : ''}`}
              />
              {errores.empresa && <small className="sponsor__error">{errores.empresa}</small>}
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="sponsor__label">
                Email corporativo <span className="sponsor__requerido">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="martin@acme.com"
                value={datos.email}
                onChange={handleChange}
                className={`sponsor__input ${errores.email ? 'sponsor__input--error' : ''}`}
              />
              {errores.email && <small className="sponsor__error">{errores.email}</small>}
            </div>

            <div className="col-12">
              <label htmlFor="tipo" className="sponsor__label">
                Tipo de sponsor <span className="sponsor__requerido">*</span>
              </label>
              <select
                id="tipo"
                name="tipo"
                value={datos.tipo}
                onChange={handleChange}
                className={`sponsor__input ${errores.tipo ? 'sponsor__input--error' : ''}`}
              >
                <option value="">Seleccioná un nivel de sponsoreo</option>
                {niveles.map((nivel) => (
                  <option key={nivel} value={nivel}>
                    {nivel}
                  </option>
                ))}
              </select>
              {errores.tipo && <small className="sponsor__error">{errores.tipo}</small>}
            </div>

            <div className="col-12">
              <span className="sponsor__label">Logo de la empresa</span>
              <label
                htmlFor="logo"
                className={`sponsor__logo ${errores.logo ? 'sponsor__input--error' : ''}`}
              >
                <span className="sponsor__logo-icono">
                  <FiUploadCloud />
                </span>
                <span className="sponsor__logo-titulo">
                  {datos.logo
                    ? datos.logo.name
                    : 'Hacé clic para adjuntar tu logo o arrastralo aquí'}
                </span>
                <span className="sponsor__logo-ayuda">
                  Archivos aceptados: PNG, SVG, JPG o WEBP (Fondo transparente
                  recomendado, máx. 5MB)
                </span>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg,image/webp"
                  onChange={handleLogo}
                  className="sponsor__logo-input"
                />
              </label>
              {errores.logo && <small className="sponsor__error">{errores.logo}</small>}
            </div>

            <div className="col-12">
              <label htmlFor="mensaje" className="sponsor__label">
                Mensaje opcional
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Contanos sobre tu empresa y por qué buscás ser Sponsor del evento"
                value={datos.mensaje}
                onChange={handleChange}
                className={`sponsor__input sponsor__textarea ${errores.mensaje ? 'sponsor__input--error' : ''}`}
              />
              {errores.mensaje && <small className="sponsor__error">{errores.mensaje}</small>}
            </div>

            <div className="col-12">
              <button type="submit" className="sponsor__boton">
                <FiSend />
                Enviar postulación de Sponsor
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SponsorForm