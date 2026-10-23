import type { RCSpeaker } from "./types";
import './SpeakersSection.css';

interface Props {
    speaker: RCSpeaker
}

const SpeakerCard = ({ speaker }: Props) => {
    return (
        <div className="card h-100 p-3 hover-card speakerCardContainer">
            <img 
                src={speaker.imageUrl} 
                alt={speaker.name}
                className="card-img-top object-fit-cover mb-3 speakerImage"
            />
            <div className="card-body p-0 d-flex flex-column">
                <h3 className="card-title mb-2 speakerName">
                    {speaker.name}
                </h3>
                <div className="speakerBadgeContainer">
                    <h4 className="speakerBadge">
                        {speaker.title}
                    </h4>
                </div>
                <p className="card-text mt-2 flex-grow-1 speakerDescription">
                    {speaker.description}
                </p>
            </div>
        </div>
    )
}

export { SpeakerCard }