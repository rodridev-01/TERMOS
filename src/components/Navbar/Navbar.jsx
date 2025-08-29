import React, { useState } from "react";
import { 
  FaTags, FaUser, FaShoppingCart, FaSearch, 
  FaBars, FaCheckCircle, FaTruck, FaGift 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Slider de texto */}
      <div className="top-slider">
        <div className="slider-text">
          {[
            <span key="0"><FaTruck /> Aprovecha nuestros envíos nacionales rápidos y seguros a todo el Perú</span>,
            <span key="1"><FaTags /> Descubre nuestra selección de termos importados directamente de USA</span>,
            <span key="2"><FaCheckCircle /> Garantizamos productos 100% originales y de la mejor calidad</span>,
            <span key="3"><FaShoppingCart /> No te pierdas nuestras ofertas exclusivas de temporada en todos los productos</span>
          ].map((item) => item)}
          
          {/* Duplicamos para scroll infinito */}
          {[
            <span key="dup-0"><FaTruck /> Aprovecha nuestros envíos nacionales rápidos y seguros a todo el Perú</span>,
            <span key="dup-1"><FaTags /> Descubre nuestra selección de termos importados directamente de USA</span>,
            <span key="dup-2"><FaCheckCircle /> Garantizamos productos 100% originales y de la mejor calidad</span>,
            <span key="dup-3"><FaShoppingCart /> No te pierdas nuestras ofertas exclusivas de temporada en todos los productos</span>
          ].map((item) => item)}
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        {/* Izquierda - Marca */}
        <div className="nav-left">
          <img src="images/Navbar.png" alt="logo" />
        </div>

        {/* Centro - Links (solo en desktop) */}
        <ul className="nav-center">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li>
            <a href="/categorias" className="nav-icon-link">
              <FaTags className="nav-icon" />
              Categorías
            </a>
          </li>
          <li><a href="/ofertas">Ofertas</a></li>
          <li>
            <a href="/se-nos-cayeron" className="nav-icon-link">
              <FaGift className="nav-icon" />
              Se nos cayeron
            </a>
          </li>
          <li><a href="/blog">Blog</a></li>
        </ul>

        {/* Derecha - Íconos */}
        <div className="nav-right">
          <a href="/buscar"><FaSearch /></a>
          <a href="/usuario"><FaUser /></a>
          <a href="/carrito"><FaShoppingCart /></a>
        </div>

        {/* Botón hamburguesa (mobile) */}
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </div>

        {/* Menú móvil */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleMenu}>✕</button>
          <div className="mobile-brand">
            <img src="images/LB04.png" alt="logo" />
          </div>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
            <li><Link to="/productos" onClick={toggleMenu}>Productos</Link></li>
            <li><Link to="/categorias" onClick={toggleMenu}>Categorías</Link></li>
            <li><Link to="/ofertas" onClick={toggleMenu}>Ofertas</Link></li>
            <li><Link to="/se-nos-cayeron" onClick={toggleMenu}>Se nos cayeron</Link></li>
            <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
            <li className="mobile-icons">
              <a href="/buscar"><FaSearch /></a>
              <a href="/usuario"><FaUser /></a>
              <a href="/carrito"><FaShoppingCart /></a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
