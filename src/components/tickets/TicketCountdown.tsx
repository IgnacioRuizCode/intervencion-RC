import { useEffect, useState } from "react";
import './TicketCountdown.css';

const TicketCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    
    const [phase, setPhase] = useState<'early' | 'general' | 'started'>('early');

    useEffect(() => {
        const earlyBirdEnd = new Date('2026-11-01T00:00:00').getTime(); 
        const eventStart = new Date('2026-11-19T18:00:00').getTime();

        const calculateTime = () => {
            const now = new Date().getTime();
            let targetDate;
           let currentPhase: 'early' | 'general' | 'started';

            if (now < earlyBirdEnd) {
                targetDate = earlyBirdEnd;
                currentPhase = 'early';
            } else if (now < eventStart) {
                targetDate = eventStart;
                currentPhase = 'general';
            } else {
                targetDate = now; 
                currentPhase = 'started';
            }

            setPhase(currentPhase);
            const distance = targetDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="countdownContainer d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-4">
            <div className="textWrapper">
                <span className="countdownEyebrow">
                    {phase === 'early' ? 'Early Bird' : phase === 'general' ? 'Entrada General' : '¡Llegó el día!'}
                </span>
                <h3 className="countdownHeading">
                    {phase === 'early' ? (
                        <>El precio especial termina<br />el 31/10</>
                    ) : phase === 'general' ? (
                        <>Faltan pocos días para<br />el evento</>
                    ) : (
                        <>¡El Workshop ya comenzó!</>
                    )}
                </h3>
                <p className="countdownSubtext">
                    {phase === 'early' 
                        ? 'Después la entrada pasa de $25.000 a $35.000.' 
                        : phase === 'general'
                        ? 'Asegurá tu lugar antes de que se agoten las entradas.'
                        : 'Las inscripciones presenciales están cerradas.'}
                </p>
            </div>

            <div className="timerWrapper">
                <div className="timerBox">
                    <span className="timerNumber">{formatNumber(timeLeft.days)}</span>
                    <span className="timerLabel">Días</span>
                </div>
                <div className="timerBox">
                    <span className="timerNumber">{formatNumber(timeLeft.hours)}</span>
                    <span className="timerLabel">Horas</span>
                </div>
                <div className="timerBox">
                    <span className="timerNumber">{formatNumber(timeLeft.minutes)}</span>
                    <span className="timerLabel">Min</span>
                </div>
                <div className="timerBox">
                    <span className="timerNumber">{formatNumber(timeLeft.seconds)}</span>
                    <span className="timerLabel">Seg</span>
                </div>
            </div>

            {phase === 'early' && (
                <div className="progressWrapper w-100">
                    <div className="progressHeader">
                        <span className="progressTextLeft">Quedan 38 de 60 Early Bird</span>
                        <span className="progressTextRight">63% vendidas</span>
                    </div>
                    <div className="progressBarTrack">
                        <div className="progressBarFill" style={{ width: '63%' }}></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TicketCountdown;