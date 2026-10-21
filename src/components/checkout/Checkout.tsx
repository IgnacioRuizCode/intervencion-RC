import "./Checkout.css";
import { useState } from "react";

const tickets = [
  { id: "early", name: "Early Bird", details: "Presencial · hasta el 31/10", price: 25000 },
  { id: "general", name: "General", details: "Presencial · desde el 1/11", price: 35000 },
  { id: "virtual", name: "Virtual", details: "Transmisión en vivo y grabación", price: 15000 },
];

const format = (n: number) => "$" + n.toLocaleString("es-AR");

// Los meses en JS empiezan en 0: 10 = noviembre
const generalStartDate = new Date(2026, 10, 1);
const now = new Date();
const generalStarted = now >= generalStartDate;

// Early Bird solo antes del 1/11. General solo desde el 1/11. Virtual siempre.
const isTicketDisabled = (id: string) => {
  if (id === "early") return generalStarted;
  if (id === "general") return !generalStarted;
  return false;
};

function Checkout() {
  const [ticketId, setTicketId] = useState(generalStarted ? "general" : "early");
  const [quantity, setQuantity] = useState(1);

  const selectedTicket = tickets.find((ticket) => ticket.id === ticketId)!;
  const subtotal = selectedTicket.price * quantity;
  const service = subtotal * 0.05;
  const total = subtotal + service;

  return (
    <section className="checkout">
      <div className="checkoutContainer">
        <header className="checkoutHeader">
          <div>
            <p className="checkoutEyebrow">COMPRA SEGURA</p>
            <h2 className="checkoutTitle">Finalizá tu compra</h2>
          </div>

          <div className="checkoutSteps">
            <span className="step stepActive">1 Entrada</span>
            <span className="step">2 Datos</span>
            <span className="step">3 Pago</span>
            <span className="step">4 Listo</span>
          </div>
        </header>

        <div className="checkoutBody">
          {/* LADO BLANCO */}
          <div className="panel panelLight">
            <p className="panelTitle">Elegí tu entrada</p>

            <div className="tickets">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setTicketId(ticket.id)}
                  disabled={isTicketDisabled(ticket.id)}
                  className={ticket.id === ticketId ? "ticket ticketActive" : "ticket"}
                >
                  <div className="ticketInfo">
                    <span className="ticketName">{ticket.name}</span>
                    <span className="ticketDetails">{ticket.details}</span>
                  </div>
                  <span className="ticketPrice">{format(ticket.price)}</span>
                </button>
              ))}
            </div>

            <div className="quantity">
              <p className="quantityLabel">Cantidad</p>
              <div className="quantityControls">
                <button
                  className="quantityBtn"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="quantityValue">{quantity}</span>
                <button
                  className="quantityBtn"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button className="btnContinue">Continuar</button>
            <p className="panelNote">
              Pasarela de pago de ejemplo: no se procesan pagos ni se guardan datos.
            </p>
          </div>

          {/* LADO NEGRO */}
          <div className="panel panelDark">
            <p className="summaryEyebrow">TU PEDIDO</p>
            <p className="summaryEvent">Workshop Rolling Code School</p>
            <p className="summaryMeta">Jueves 19/11 · 18.00 hs · Gral. Paz 576</p>
            <hr className="summaryDivider" />

            <div className="summaryRow">
              <span>
                {quantity} entrada{quantity > 1 ? "s" : ""} {selectedTicket.name}
              </span>
              <span>{format(subtotal)}</span>
            </div>
            <div className="summaryRow">
              <span>Cargo por servicio (5%)</span>
              <span>{format(service)}</span>
            </div>

            <hr className="summaryDivider" />

            <div className="summaryTotal">
              <span>Total</span>
              <strong>{format(total)}</strong>
            </div>

            <p className="summarySecure">
              Pago protegido. Recibís la entrada por email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;