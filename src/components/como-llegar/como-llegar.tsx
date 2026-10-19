import "./como-llegar.css"

function ComoLlegar () {
    return (
        <div>
            <div className="comoLlegarMainDiv">
                <div>
                    <p className="comoLlegarText fs-5">COMO LLEGAR</p>
                </div>
                <div className="teEsperamosText">
                    <h2>Te esperamos en Rolling Code School</h2>
                </div>
                <div>
                    <div className="iconoLocal">
                        
                    </div>
                    <div className="direccionLocal">
                        <p className="bold">Calle Gral. Paz 576, Entrepiso</p>
                        <p className="">4000 San Miguel de Tucumán, Tucumán</p>
                    </div>
                    <div>
                        <span className="comoLlegarPildora">Jueves 10/11</span>
                        <span className="comoLlegarPildora">18.00 hs</span>
                        <span className="comoLlegarPildora">Entrepiso</span>
                    </div>
                    <div>
                        <button className="btnBing">Abrir en Bing Maps</button>
                        <button className="btnEntrada">Comprar entrada</button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4233.696856650504!2d-65.21000029301145!3d-26.836755286467714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1792436167195!5m2!1ses!2sar" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ComoLlegar