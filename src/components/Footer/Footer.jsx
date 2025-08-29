import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Sección 1: Logo e info */}
        <div className="footer-section-img">
          <img src="/images/LB03.png" alt="Lovely Bottles Logo" className="footer-logo" />

        </div>

        {/* Sección 2: Navegación */}
        <div className="footer-section">
          <h4>Tienda</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Todos los productos</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/novedades">Novedades</Link></li>
          </ul>
        </div>

        {/* Sección 3: Información */}
        <div className="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
            <li><Link to="/envios">Envíos y devoluciones</Link></li>
            <li><Link to="/metodos-de-pago">Métodos de pago</Link></li>
            <li><Link to="/terminos">Términos y condiciones</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Sección 4: Redes y contacto */}
        <div className="footer-section">
          <h4>Conéctate</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/tuNumero" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="mailto:contacto@lovelybottles.com"><FaEnvelope /></a>
          </div>
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#ccc" }}>
            📦 Envíos rápidos a nivel nacional
          </p>
          <div className="footer-payments">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Lovely Bottles by Julia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
