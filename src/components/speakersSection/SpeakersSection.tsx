import { SpeakerCard } from './SpeakerCard';
import { speakersData } from './speakersData';

const SpeakersSection = () =>{
    return(
       <section className="container-fluid text-white py-5" style={{backgroundColor: '#0b0b0c'}}>
    <div className="mx-auto" style={{ maxWidth: '1200px'}}>
        
        {/* Títulos (sin la clase speakersList acá) */}
        <div className="mb-5">
            <span style={{ color: '#e0202a', fontSize: '16px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase'}}>
                Speakers
            </span>
            <h2 style={{ fontSize: '56px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
                Diez charlas, un mismo objetivo
            </h2>
        </div>

        {/* ACÁ va speakersList (el contenedor que hace de carrusel) */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 speakersList">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 speakersList">
                {speakersData.map((speaker) => (
            <div className="col speakerItem" key={speaker.id}>
            <SpeakerCard speaker={speaker} />
            </div>
            ))}
        </div>
        
    </div>
    </div>
</section>
    )
}

export {SpeakersSection}