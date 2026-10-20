import React from "react";
import type { RCSpeaker } from "./types";
import './SpeakersSection.css';

interface Props {
    speaker: RCSpeaker
}

const SpeakerCard: React.FC<Props> = ({ speaker }) => {
    return (
        <div 
        className="card h-100 text-white p-3 hover-card speakerCardContainer"
        style={{
            backgroundColor: '#111113',
            border: '1px solid #2c2c31',
            borderRadius: '32px',
        }}
        >
        <img 
        src={speaker.imageUrl} 
        alt={speaker.name}
        className="card-img-top object-fit-cover mb-3 speakerImage"
         />

        <div className="card-body p-0 d-flex flex-column">
            <h3 className="card-title mb-2 speakerName"
            style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {speaker.name}
            </h3>
            <div className="speakerBadgeContainer">
            <h4 className="speakerBadge"
            >
                {speaker.title}
            </h4>
            </div>
            <p className="card-text mt-2 flex-grow-1 speakerDescription"
            style={{
                color: '#d4d4d8',
                fontSize: '13px',
                lineHeight: '1.55',
            }}
            >
                {speaker.description}
            </p>

        </div>

        </div>
    )
}

export {SpeakerCard}