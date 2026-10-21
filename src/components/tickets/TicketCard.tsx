import './TicketSection.css';

interface TicketProps {
    ticket: {
        id: string;
        title: string;
        price: string;
        originalPrice?: string;
        badge: string;
        subtitle: string;
        features: string[];
        isHighlighted: boolean;
        buttonText: string;
    };
}

const TicketCard = ({ ticket }: TicketProps) =>{
const cardClass = ticket.isHighlighted ? 'ticketCard highlighted' : 'ticketCard normal';
const btnClass = ticket.isHighlighted ? 'ticketBtn solid w-100' : 'ticketBtn outline w-100';
const badgeClass = ticket.isHighlighted ? 'badge rounded-pill ticketBadgeDark' : 'badge rounded-pill ticketBadgeLight';
const iconColor = ticket.isHighlighted ? '#ffffff' : '#e0202a';

  return (
    <div className={cardClass}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="m-0 ticketTitle">
          {ticket.title}
        </h3>
        <span className={badgeClass}>
          {ticket.badge}
        </span>
      </div>

      <div className="ticketPrice">
        {ticket.price}
        {ticket.originalPrice && (
          <span className="ticketOriginalPrice">
            {ticket.originalPrice}
          </span>
        )}
      </div>

      <p className="ticketSubtitle">
        {ticket.subtitle}
      </p>

      <ul className="ticketFeatures flex-grow-1">
        {ticket.features.map((feature, index) => (
          <li key={index}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ticketIcon">
              <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={btnClass}>
        {ticket.buttonText}
      </button>
    </div>
  );
};

export default TicketCard