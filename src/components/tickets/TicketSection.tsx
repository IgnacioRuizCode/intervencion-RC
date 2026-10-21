import  TicketCard  from './TicketCard';
import TicketCountdown from "./TicketCountdown";
import TicketData from './TicketData';
import './TicketSection.css'

const TicketSection = () =>{
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
                    <TicketCard ticket={ticket}/>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}

export default TicketSection