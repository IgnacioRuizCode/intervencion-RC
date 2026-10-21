import { SpeakerCard } from './SpeakerCard';
import { speakersData } from './speakersData';

const SpeakersSection = () =>{
    return(
        <section className="container-fluid text-white py-5"
        style={{backgroundColor: '#0b0b0c'}}>
            <div className="mx-auto"
            style={{ maxWidth: '1200px'}}
            >
                <div className="mb-5">
                    <span style={{ color: '#e0202a', fontSize: '16px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase'}}>
                        Speakers
                    </span>
                    <h2 style={{ fontSize: '56px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
                        Diez charlas, un mismo objetivo
                    </h2>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
                    {speakersData.map((speaker)=>(
                        <div className="col" key={speaker.id}>
                            <SpeakerCard speaker={speaker}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export {SpeakersSection}