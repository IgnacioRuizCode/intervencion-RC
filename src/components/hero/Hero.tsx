import "./Hero.css"

function Hero () {

    return (
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
                    <a className="btnBlack" href="#">Comprar entrada</a>
                    <a className="btnRed" href="#">Ver agenda</a>
                </div>
            </div>
            <div className="boxFlexRight">
                <div className="blackBox">
                    <div className="blackBoxFlex">
                        <div>
                            <img className="iconBB" src="../../assets/iconos/calendario.svg" alt="hero-calendar" />
                        </div>
                        <div>
                            <p className="textSup">JUE 19/11</p>
                            <p className="textInf">18.00 hs</p>
                        </div>
                    </div>
                    <hr />
                    <div className="blackBoxFlex">
                        <div>
                            <img className="iconBB" src="../../assets/iconos/ubicacion.svg" alt="hero-location" />
                        </div>
                        <div>
                            <p className="textSup">Rolling Code School</p>
                            <p className="textInf">Gral. Paz 576, Entrepiso</p>
                        </div>
                    </div>
                    <hr />
                    <div className="blackBoxFlex">
                        <div>
                            <img className="iconBB" src="../../assets/iconos/entrada.svg" alt="hero-ticket" />
                        </div>
                        <div>
                            <p className="textSup">Entradas desde $15.000</p>
                            <p className="textInf">Early Bird hasta el 31/10</p>
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
    )
}

export default Hero