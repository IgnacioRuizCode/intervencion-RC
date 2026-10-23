import "./Checkout.css";
import { useState, type FormEvent, type ChangeEvent } from "react";

const tickets = [
  { id: "early", name: "Early Bird", details: "Presencial · hasta el 31/10", price: 25000 },
  { id: "general", name: "General", details: "Presencial · desde el 1/11", price: 35000 },
  { id: "virtual", name: "Virtual", details: "Transmisión en vivo y grabación", price: 15000 },
];

const format = (n: number) => "$" + n.toLocaleString("es-AR");

const generalStartDate = new Date(2026, 10, 1);
const now = new Date();
const generalStarted = now >= generalStartDate;

const isTicketDisabled = (id: string) => {
  if (id === "early") return generalStarted;
  if (id === "general") return !generalStarted;
  return false;
};

function Checkout() {
  const [step, setStep] = useState(1); 
  
  const [ticketId, setTicketId] = useState(generalStarted ? "general" : "early");
  const [quantity, setQuantity] = useState(1);

  const selectedTicket = tickets.find((ticket) => ticket.id === ticketId)!;
  const subtotal = selectedTicket.price * quantity;
  const service = subtotal * 0.05;
  const total = subtotal + service;

  return (
    <section id="checkout" className="checkout">
      <div className="checkoutContainer">
        
        <header className="checkoutHeader">
          <div>
            <p className="checkoutEyebrow">COMPRA SEGURA</p>
            <h2 className="checkoutTitle">Finalizá tu compra</h2>
          </div>

          <div className="checkoutSteps">
            <span className={`step ${step >= 1 ? "stepActive" : ""}`}>1 Entrada</span>
            <span className={`step ${step >= 2 ? "stepActive" : ""}`}>2 Datos</span>
            <span className={`step ${step >= 3 ? "stepActive" : ""}`}>3 Pago</span>
            <span className={`step ${step >= 4 ? "stepActive" : ""}`}>4 Listo</span>
          </div>
        </header>

        <div className="checkoutBody">
          
          <div className="panel panelLight">
            
            {step === 1 && (
              <>
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
                    <button className="quantityBtn" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
                    <span className="quantityValue">{quantity}</span>
                    <button className="quantityBtn" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                  </div>
                </div>

                <button className="btnContinue" onClick={() => setStep(2)}>Continuar</button>
                <p className="panelNote">Pasarela de pago de ejemplo: no se procesan pagos ni se guardan datos.</p>
              </>
            )}

            {step === 2 && (
              <Step2Datos onNext={() => setStep(3)} onBack={() => setStep(1)} />
            )}

            {step === 3 && (
              <Step3Pago onNext={() => setStep(4)} onBack={() => setStep(2)} />
            )}

            {step === 4 && (
              <Step4Exito/>
            )}

          </div>

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


function Step2Datos({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    documento: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    email: '',
    documento: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { nombre: '', apellido: '', email: '', documento: '' };

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Este campo es requerido.';
      isValid = false;
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'Este campo es requerido.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Este campo es requerido.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
      isValid = false;
    }

    const docRegex = /^[0-9]+$/;
    if (!formData.documento.trim()) {
      newErrors.documento = 'Este campo es requerido.';
      isValid = false;
    } else if (!docRegex.test(formData.documento)) {
      newErrors.documento = 'Solo se aceptan números.';
      isValid = false;
    } else if (formData.documento.length < 7 || formData.documento.length > 10) {
      newErrors.documento = 'La longitud debe ser entre 7 y 10 números.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const reservationData = {
        user: formData,
        date: new Date().toISOString()
      };
      localStorage.setItem('ticketReservation', JSON.stringify(reservationData));

      onNext();
    }
  };

  return (
    <div>
      <p className="panelTitle mb-4">Tus Datos</p>
      
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div className="row">
          <div className="col-12 col-md-6 formGroup mb-3 mb-md-0">
            <label htmlFor="nombre" className="formLabel">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={`form-control customInput ${errors.nombre ? 'is-invalid' : ''}`}
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <span className="invalid-feedback">{errors.nombre}</span>}
          </div>

          <div className="col-12 col-md-6 formGroup">
            <label htmlFor="apellido" className="formLabel">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className={`form-control customInput ${errors.apellido ? 'is-invalid' : ''}`}
              value={formData.apellido}
              onChange={handleChange}
            />
            {errors.apellido && <span className="invalid-feedback">{errors.apellido}</span>}
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="email" className="formLabel">Correo Electrónico</label>
          <input
            type="text"
            id="email"
            name="email"
            className={`form-control customInput ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="invalid-feedback">{errors.email}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="documento" className="formLabel">DNI</label>
          <input
            type="text"
            id="documento"
            name="documento"
            className={`form-control customInput ${errors.documento ? 'is-invalid' : ''}`}
            value={formData.documento}
            onChange={handleChange}
          />
          {errors.documento && <span className="invalid-feedback">{errors.documento}</span>}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button 
            type="button" 
            className="btnContinue" 
            style={{ background: '#333', color: '#fff' }} 
            onClick={onBack}
          >
            Volver
          </button>
          <button 
            type="submit" 
            className="btnContinue"
          >
            Continuar al Pago
          </button>
        </div>
      </form>
    </div>
  );
}

function Step3Pago({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handlePay = (e: FormEvent) => {
    e.preventDefault(); 
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      onNext(); 
    }, 2000);
  };

  return (
    <div>
      <p className="panelTitle mb-4">Medio de Pago</p>
      
      <form onSubmit={handlePay} className="d-flex flex-column gap-3">
        <div className="formGroup">
          <label className="formLabel">Número de Tarjeta</label>
          <input 
            type="text" 
            name="number"
            className="form-control customInput" 
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            value={cardData.number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formGroup">
          <label className="formLabel">Nombre del Titular</label>
          <input 
            type="text" 
            name="name"
            className="form-control customInput" 
            placeholder="Tal como aparece en la tarjeta"
            value={cardData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-12 col-md-6 formGroup mb-3 mb-md-0">
            <label className="formLabel">Vencimiento</label>
            <input 
              type="text" 
              name="expiry"
              className="form-control customInput" 
              placeholder="MM/AA"
              maxLength={5}
              value={cardData.expiry}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 formGroup">
            <label className="formLabel">Código de Seguridad</label>
            <input 
              type="password" 
              name="cvv"
              className="form-control customInput" 
              placeholder="CVV"
              maxLength={4}
              value={cardData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button 
            type="button"
            className="btnContinue" 
            style={{ background: '#333', color: '#fff' }} 
            onClick={onBack} 
            disabled={isProcessing}
          >
            Volver
          </button>
          <button 
            type="submit"
            className="btnContinue" 
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando pago..." : "Pagar"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Step4Exito() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div className="successIconWrapper mb-4 d-flex justify-content-center">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 style={{ color: '#28a745', fontWeight: 'bold' }}>¡Compra exitosa!</h3>
      <p>Tus entradas ya están confirmadas.</p>
      <button className="btnContinue" style={{ marginTop: '20px' }} onClick={() => window.location.href = "/"}>
        Volver al inicio
      </button>
    </div>
  );
}