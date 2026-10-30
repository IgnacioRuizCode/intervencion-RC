import { SpeakerCard } from './SpeakerCard';
import { speakersData } from './speakersData';
import './SpeakersSection.css';

const SpeakersSection = () => {
    return (
        <section id='speakersSection' className="container-fluid text-white py-5 speakersSectionBg">
            <div className="mx-auto speakersContainer">
                
                <div className="mb-5">
                    <span className="speakersSubtitle">
                        Speakers
                    </span>
                    <h2 className="speakersSectionTitle">
                        Diez charlas, un mismo objetivo
                    </h2>
                </div>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 speakersList">
                    {speakersData.map((speaker) => (
                        <div className="col speakerItem" key={speaker.id}>
                            <SpeakerCard speaker={speaker} />
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    )
}

export { SpeakersSection }