import React from "react";
import type { RCSpeaker } from "./types";

interface Props {
    speaker: RCSpeaker
}

const SpeakerCard: React.FC<Props> = ({ speaker }) => {
    return (
        <div 
        className="card h-100 text-white p-3"
        style={{
            backgroundColor: '#111113',
            border: '1px solid #2c2c31',
            borderRadius: '32px',
        }}
        >
        <img 
        src="" 
        alt=""
        className="card-img-top object-fit-cover mb-3"
        style={{ borderRadius: '24px', height: '180px' }} />

        <div className="card-body p-0 d-flex flex-column">
            <h3 className="card-title mb-2"
            style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {speaker.name}
            </h3>
            <h4 className="mb-2 mt-2"
            style={{
                fontSize: '22px',
                fontWeight: 600,
                fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
            >
                {speaker.title}
            </h4>
            <p className="card-text mt-auto"
            style={{
                color: '#d4d4d8',
                fontSize: '16px',
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