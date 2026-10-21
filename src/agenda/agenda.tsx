import "./agenda.css"
export default function Agenda() {
  return (
    <section id="agenda" className="agenda py-5">
    <div className="container">
    <div className="row g-5">
    <div className="col-lg-4">
    <span className="agenda-label">AGENDA</span>
    <h2 className="agenda-title">Jueves 19 de noviembre</h2>
    <p className="agenda-text">
              Diez charlas cortas para salir con un plan claro.
              Al final queda tiempo para preguntas y networking.
   </p>
   </div>

  <div className="col-lg-8">
  <ul className="agenda-list list-unstyled m-0">
  <li className="agenda-item">
<span className="agenda-time">18:00</span>
<div>
                  <h3 className="agenda-talk">Acreditación y bienvenida</h3>
                </div>
              </li>
              <li className="agenda-item">
                <span className="agenda-time">18:20</span>
                <div>
                  <h3 className="agenda-talk">Tu primer día como developer</h3>
                  <small className="agenda-speaker">Daniela Cardozo</small>
                </div>
              </li>
              <li className="agenda-item">
                <span className="agenda-time">18:40</span>
                <div>
                  <h3 className="agenda-talk">De cero a tu primer proyecto</h3>
                  <small className="agenda-speaker">Franco Diaz</small>
                </div>
              </li>
              <li className="agenda-item">
                <span className="agenda-time">19:00</span>
                <div>
                  <h3 className="agenda-talk">Armá tu portfolio con IA</h3>
                  <small className="agenda-speaker">Gaston</small>
                </div>
              </li>
              <li className="agenda-item">
                <span className="agenda-time">19:20</span>
                <div>
                  <h3 className="agenda-talk">Git y GitHub sin miedo</h3>
                  <small className="agenda-speaker">Mauro</small>
                </div>
              </li>
              <li className="agenda-item">
                <span className="agenda-time">19:40</span>
                <div>
                  <h3 className="agenda-talk">Tu primer backend con Node</h3>
                  <small className="agenda-speaker">Jose Diaz</small>
                </div>
              </li>
              <li className="agenda-item">
                <span className="agenda-time">20:00</span>
                <div>
                  <h3 className="agenda-talk">Preparate para tu primera entrevista</h3>
                  <small className="agenda-speaker">Tomas Gomez</small>
                </div>
              </li>
              <li className="agenda-item">
                <span className="agenda-time">20:20</span>
                <div>
                  <h3 className="agenda-talk">Mi primer trabajo en IT</h3>
                  <small className="agenda-speaker">Pablo Basso</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}