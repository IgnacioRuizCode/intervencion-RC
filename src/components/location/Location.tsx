
import "./Location.css";
import ubicacion from "../../assets/iconos/ubicacion.svg";

export const Location = () => {
  return (
    <div className="howToArriveMainDiv">
      <div className="leftPartLocation">
        <p className="howToArriveText">CÓMO LLEGAR</p>
        <h2 className="mainTitle">Te esperamos en Rolling Code School</h2>

        <div className="localFlex localRow">
          <img className="localIcon" src={ubicacion} alt="" />
          <div className="localAddress">
            <p className="addressMain">Calle Gral. Paz 576, Entrepiso</p>
            <p className="addressSub">4000 San Miguel de Tucumán, Tucumán</p>
          </div>
        </div>

        <div className="localFlex pillsRow">
          <span className="arrivePill">Jueves 19/11</span>
          <span className="arrivePill">18.00 hs</span>
          <span className="arrivePill">Entrepiso</span>
        </div>

        <div className="localFlex">
          <a
            className="btnBing"
            href="https://www.bing.com/maps?cp=-26.8366~-65.2072&lvl=17"
            target="_blank"
            rel="noreferrer"
          >
            Abrir en Bing Maps
          </a>
          <a className="btnTicket" href="#entradas">
            Comprar entrada
          </a>
        </div>
      </div>

      <div className="rightPartLocation">
        <div className="mapCard">
          <iframe
            title="Mapa de Rolling Code School"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4233.696856650504!2d-65.21000029301145!3d-26.836755286467714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1792436167195!5m2!1ses!2sar"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>

          <div className="mapPin">
            <div className="mapPinHalo"></div>
            <img src={ubicacion} alt="" />
          </div>

          <div className="mapInfo">
            <div>
              <p className="mapInfoTitle">Rolling Code School</p>
              <p className="mapInfoSub">Gral. Paz 576 · San Miguel de Tucumán</p>
            </div>
            <span className="mapInfoSub">-26.8366, -65.2072</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
