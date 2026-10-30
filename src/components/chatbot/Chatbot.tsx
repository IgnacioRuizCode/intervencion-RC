import { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; 

interface Option {
  label: string;
  action: string;
}

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  options?: Option[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultOptions: Option[] = [
    { label: '📅 ¿Cuándo y dónde es?', action: 'faq_lugar' },
    { label: '📋 Ver cronograma', action: 'faq_cronograma' },
    { label: '🎟️ Comprar entradas', action: 'comprar_opciones' },
    { label: '🏢 Compra corporativa (+150 entradas)', action: 'comprar_mayorista' }
  ];


  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! 👋 Soy Rollo asistente virtual del Workshop. ¿En qué te puedo ayudar hoy?',
      options: defaultOptions
    }
  ]);
  const nextId = useRef(2);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleOptionClick = (option: Option) => {
    const newUserMsg: Message = {
      id: nextId.current++,
      sender: 'user',
      text: option.label
    };
    setMessages(prev => [...prev, newUserMsg]);

    setTimeout(() => {
      const botResponse: Message = { id: nextId.current++, sender: 'bot', text: '' };

      switch (option.action) {
        case 'faq_lugar':
          botResponse.text = 'El evento se realizará el 15 de Noviembre en el Centro de Convenciones. ¡Te esperamos a las 09:00 AM! 📍';
          botResponse.options = defaultOptions;
          break;
        case 'faq_cronograma':
          botResponse.text = 'Tenemos charlas sobre React, Node.js y UX/UI. Podés ver el detalle completo en la sección de Cronograma arriba. 🕒';
          botResponse.options = defaultOptions;
          break;
        case 'comprar_opciones':
          botResponse.text = '¡Excelente! ¿Qué tipo de entrada buscás?';
          botResponse.options = [
            { label: 'Early Bird ($25.000)', action: 'buy_early' },
            { label: 'General ($35.000)', action: 'buy_general' },
            { label: 'Virtual ($15.000)', action: 'buy_virtual' },
            { label: 'Volver al menú', action: 'menu_principal' }
          ];
          break;
        case 'comprar_mayorista':
          botResponse.text = 'Para compras de más de 150 entradas (Empresas/Instituciones), manejamos descuentos especiales y facturación directa. Hablá con un asesor comercial haciendo clic abajo 👇';
          botResponse.options = [
            { label: '📱 Contactar a Ventas por WhatsApp', action: 'link_wsp' },
            { label: 'Volver al menú', action: 'menu_principal' }
          ];
          break;
        case 'buy_early':
        case 'buy_general':
        case 'buy_virtual':{
          const ticketId = option.action.replace('buy_', ''); 
          botResponse.text = '¡Genial! Te llevo a la sección de pago para que termines tu compra. 🚀';
          botResponse.options = defaultOptions;
        
          window.dispatchEvent(new CustomEvent('selectTicket', { detail: ticketId }));
          document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false); 
          break;
        }
        case 'link_wsp':{
        botResponse.text = 'Abriendo WhatsApp...';
        botResponse.options = defaultOptions;
        const numero = '5493815783030';
        const mensaje = 'Hola, me interesa la compra corporativa de +150 entradas';
  
        window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
          break;
        }
        case 'menu_principal':
          botResponse.text = 'Acá tenés las opciones principales:';
          botResponse.options = defaultOptions;
          break;
        default:
          botResponse.text = 'No entendí esa opción.';
          botResponse.options = defaultOptions;
      }

      setMessages(prev => [...prev, botResponse]);
    }, 600); 
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '❌' : '🤖'}
      </button>

      {isOpen && (
        <div className="chatbot-window shadow">
          <div className="chatbot-header bg-dark text-white p-3">
            <h5 className="m-0">Rollo</h5>
          </div>
          
          <div className="chatbot-body p-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
                
                {msg.options && (
                  <div className="message-options mt-2">
                    {msg.options.map((opt, index) => (
                      <button 
                        key={index} 
                        className="btn btn-sm btn-outline-primary m-1"
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;