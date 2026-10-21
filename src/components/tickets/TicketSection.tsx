import { useState } from 'react';
import  TicketCard  from './TicketCard';
import TicketCountdown from "./TicketCountdown";
import TicketData from './TicketData';
import TicketModal from './TicketModal';
import './TicketSection.css'

const TicketSection = () =>{
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTicket, setSelectedTicket] = useState('');
const handleOpenModal = (ticketName: string) => {
    setSelectedTicket(ticketName);
    setIsModalOpen(true);
  };
    return (
        <section className="py-5 sectionWrapper">
            <div className="container sectionContainer">
                <div className="mb-5">
                    <span className="sectionEyebrow">
                    Entradas
                    </span>
                    <h2 className="mt-2  sectionHeading">
                    Asegura tu lugar antes de que suba el precio
                    </h2>
                </div>

                <TicketCountdown/>

                <div className="row g-4">
                {TicketData.map((ticket) => (
                    <div key={ticket.id} className={ticket.id === 'virtual' ? 'col-12' : 'col-12 col-lg-6'}
                    >
                    <TicketCard 
                    ticket={ticket}
                    onOpenModal={handleOpenModal}/>
                    </div>
                ))}
                </div>
            </div>
            <TicketModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                ticketName={selectedTicket} 
            />
        </section>
    )
}

export default TicketSection