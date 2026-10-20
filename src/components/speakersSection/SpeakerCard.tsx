import React from "react";
import type { RCSpeaker } from "./types";
import './SpeakersSection.css';

interface Props {
    speaker: RCSpeaker
}

const SpeakerCard: React.FC<Props> = ({ speaker }) => {
    return (
        <div 
        className="card h-100 text-white p-3 hover-tarjeta"
        style={{
            backgroundColor: '#111113',
            border: '1px solid #2c2c31',
            borderRadius: '32px',
        }}
        >
        <img 
        src={speaker.imageUrl} 
        alt={speaker.name}
        className="card-img-top object-fit-cover mb-3"
        style={{ borderRadius: '24px', height: '180px' }} />

        <div className="card-body p-0 d-flex flex-column">
            <h3 className="card-title mb-2"
            style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {speaker.name}
            </h3>
            <div style={{minHeight: '70px'}}>
            <h4 className="mb-2 mt-2"
            style={{
                fontSize: '15px',
                fontWeight: 800,
                minHeight: '50px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                backgroundColor: '#e0202a',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'inline-block'

            }}
            >
                {speaker.title}
            </h4>
            </div>
            <p className="card-text"
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