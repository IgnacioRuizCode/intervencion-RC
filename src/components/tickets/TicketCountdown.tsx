import { useEffect, useState } from "react";
import './TicketCountdown.css';

const TicketCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date('2026-10-31T23:59:59').getTime();

        const calculateTime = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
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
                <span className="countdownEyebrow">Early Bird</span>
                <h3 className="countdownHeading">
                    El precio especial termina<br />el 31/10
                </h3>
                <p className="countdownSubtext">
                    Después la entrada pasa de $25.000 a $35.000.
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

            <div className="progressWrapper w-100">
                <div className="progressHeader">
                    <span className="progressTextLeft">Quedan 38 de 60 Early Bird</span>
                    <span className="progressTextRight">63% vendidas</span>
                </div>
                <div className="progressBarTrack">
                    <div className="progressBarFill"></div>
                </div>
            </div>
        </div>
    );
}

export default TicketCountdown;