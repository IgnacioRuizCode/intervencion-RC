import "./Hero.css"
import calendarIcon from "./../../assets/iconos/calendario.svg"
import locationIcon from "./../../assets/iconos/ubicacion.svg"
import ticketIcon from "./../../assets/iconos/entrada.svg"

function Hero () {

    return (
        <>
        <section className="redBox">
            <div className="boxFlexLeft">
                <div className="subTitle">
                    <p className="subTitleWS">WORKSHOP</p> 
                    <p className="subTitleEL">ENTRADAS LIMITADAS</p>
                </div>
                <div>
                    <h2 className="mainTitle">¿POR DÓNDE EMPIEZO A <span className="mainTitleBlack">PROGRAMAR?</span></h2>
                </div>
                <div >
                    <p className="textDescription">Una tarde con diez speakers de Rolling Code School para ordenar tus primeros pasos: qué aprender, cómo practicar y cómo mostrar lo que sabes.</p>
                </div>
                <div className="btnGroup">
                    <a className="btnBlack" href="#checkout">Comprar entrada</a>
                    <a className="btnRed" href="#agenda">Ver agenda</a>
                </div>
            </div>
            <div className="boxFlexRight">
                <div className="blackBox">
                    <div className="blackBoxFlex">
                        <div>
                            <img className="iconBB" src={calendarIcon} alt="hero-calendar" />
                        </div>
                        <div>
                            <p className="textSup textSupLg">JUE 19/11</p>
                            <p className="textInf textInfLg">18.00 hs</p>
                        </div>
                    </div>
                    <hr />
                    <div className="blackBoxFlex">
                        <div>
                            <img className="iconBB" src={locationIcon} alt="hero-location" />
                        </div>
                        <div>
                            <p className="textSup textSupLg">Rolling Code School</p>
                            <p className="textInf textInfLg">Gral. Paz 576, Entrepiso</p>
                        </div>
                    </div>
                    <hr />
                    <div className="blackBoxFlex">
                        <div>
                            <img className="iconBB" src={ticketIcon} alt="hero-ticket" />
                        </div>
                        <div>
                            <p className="textSup textSupLg">Entradas desde $15.000</p>
                            <p className="textInf textInfLg">Early Bird hasta el 31/10</p>
                        </div>
                    </div>
                    <div className="pills">
                        <span className="blackPill">Presencial</span>
                        <span className="blackPill">Virtual</span>
                        <span className="redPill">Cupos limitados</span>
                    </div>
                </div>
            </div>
        </section>
        <section className="blackHero">
                <div className="statItem">
                    <p className="numbersHero">120</p>
                    <p className="textHero2">lugares presenciales</p>
                </div>
                <div className="statItem">
                    <p className="numbersHero">10</p>
                    <p className="textHero2">charlas de speakers</p>
                </div>
                <div className="statItem">
                    <p className="numbersHero">3 h 40</p>
                    <p className="textHero2">de 18.00 a 21.40 hs</p>
                </div>
                <div className="statItem">
                    <p className="numbersHero">2</p>
                    <p className="textHero2">modalidades: presencial y virtual</p>
                </div>
            </section>
    </>
    )
}

export default Hero