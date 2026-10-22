import logo from "../assets/logo-blanco.svg";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark barra">
      <div className="container">
    
        <a className="navbar-brand" href="#inicio">
          <img src={logo} alt="Rolling Code School" height="65" />
        </a>

  
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="menu">
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link" href="#speakers">Speakers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#agenda">Agenda</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#como-llegar">Cómo llegar</a>
            </li>
            <li className="nav-item ms-lg-3">
              <a className="btn boton-comprar" href="#entradas">Comprar entrada</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;