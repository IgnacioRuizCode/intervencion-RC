import './sponsorTicket.css'

export interface TicketSponsor {
  numero: string
  fecha: string
  nombre: string
  apellido: string
  empresa: string
  email: string
  tipo: string
}

interface SponsorTicketProps {
  ticket: TicketSponsor
  onNuevaPostulacion: () => void
}

function SponsorTicket({ ticket, onNuevaPostulacion }: SponsorTicketProps) {
  return (
    <div className="sponsor-ticket">
      <div className="sponsor-ticket__cabecera">
        <span className="sponsor-ticket__check">✓</span>
        <h2 className="sponsor-ticket__titulo">¡Postulación recibida!</h2>
        <p className="sponsor-ticket__numero">
          Ticket {ticket.numero} · {ticket.fecha}
        </p>
      </div>

      <div className="sponsor-ticket__detalle">
        <div className="sponsor-ticket__fila">
          <span>Nombre</span>
          <strong>
            {ticket.nombre} {ticket.apellido}
          </strong>
        </div>
        <div className="sponsor-ticket__fila">
          <span>Empresa</span>
          <strong>{ticket.empresa}</strong>
        </div>
        <div className="sponsor-ticket__fila">
          <span>Nivel</span>
          <strong>{ticket.tipo}</strong>
        </div>
      </div>

      <p className="sponsor-ticket__texto">
        Toda la información fue enviada a <strong>{ticket.email}</strong>.
        Nos comunicaremos con vos en las próximas 24 horas hábiles.
      </p>

      <button
        type="button"
        className="sponsor-ticket__boton"
        onClick={onNuevaPostulacion}
      >
        Enviar otra postulación
      </button>
    </div>
  )
}

export default SponsorTicket