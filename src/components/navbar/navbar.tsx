import { useState } from 'react';
import logo from "../../assets/logo-blanco.svg";
import ThemeToggle from "../themeToggle/ThemeToggle";
import "./navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark barra sticky-top">
      <div className="container">
        
        <a className="navbar-brand" href="#inicio" onClick={closeMenu}>
          <img src={logo} alt="Rolling Code School" height="65" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-expanded={isMenuOpen}
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="menu">
          <ul className="navbar-nav align-items-lg-center text-center">
            <li className="nav-item">
              <a className="nav-link" href="#speakersSection" onClick={closeMenu}>Speakers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#agenda" onClick={closeMenu}>Agenda</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#location" onClick={closeMenu}>Cómo llegar</a>
            </li>
            <li className="nav-item ms-lg-2 d-flex justify-content-center">
              <ThemeToggle />
            </li>
            <li className="nav-item ms-lg-3">
              <a className="btn boton-comprar" href="#checkout" onClick={closeMenu}>Comprar entrada</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;