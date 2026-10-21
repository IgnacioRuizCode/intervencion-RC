import { useState } from "react";
import {type ChangeEvent, type FormEvent} from "react";
import './TicketModal.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    ticketName: string;
}

const TicketModal = ({ isOpen, onClose, ticketName }: Props) => {
    const [currentStep, setCurrentStep] = useState(2);

    const [formData, setFormData] = useState ({
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

    if (!isOpen) return null;

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target;
        setFormData ({
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
        return isValid
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const reservationData = {
                ticket: ticketName,
                user: formData,
                date: new Date().toISOString()
            };
            localStorage.setItem('ticketReservation', JSON.stringify(reservationData));

            setCurrentStep(3);
        }
    };
    return (
        <div className="modalOverlay">
      <div className="modalContainer p-4">
        <div className="stepIndicator mb-4 text-center">
          <span className="stepText text-muted">Paso 1: Selección</span> &gt;{' '}
          <span className={`stepText ${currentStep === 2 ? 'fw-bold text-white' : 'text-muted'}`}>
            Paso 2: Datos
          </span> &gt;{' '}
          <span className={`stepText ${currentStep === 3 ? 'fw-bold text-white' : 'text-muted'}`}>
            Paso 3: Pago
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="modalTitle">
            Registro para <span className="ticketNameBadge">{ticketName}</span>
          </h3>
          <button className="btn-close btnCloseModal" onClick={onClose} aria-label="Close"></button>
        </div>

        {currentStep === 2 && (
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

            <button type="submit" className="btn mt-4 modalSubmitBtn w-100">
              Continuar
            </button>
          </form>
        )}

        {currentStep === 3 && (
          <div className="text-center py-4 d-flex flex-column align-items-center justify-content-center">
            
            <div className="successIconWrapper mb-4">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>

            <h4 className="text-white fw-bold mb-3">¡Datos guardados con éxito!</h4>
            
            <p className="text-light mb-4 px-3">
              Tu lugar está reservado. En la próxima etapa se integrará la pasarela de pago para finalizar la compra.
            </p>

            <button className="btn modalSubmitBtn px-5" onClick={onClose}>
              Entendido
            </button>
            
          </div>
        )}
      </div>
    </div>
    )
}

export default TicketModal