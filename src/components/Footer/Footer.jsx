import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección 1: Logo e info */}
        <div className="footer-section">
          <img src="/images/LB04.png" alt="Lovely Bottles Logo" className="footer-logo" />
          <p>Venta de termos importados de USA. 100% originales y envío a todo Perú.</p>
        </div>

        {/* Sección 2: Links rápidos */}
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Sección 3: Redes y contacto */}
        <div className="footer-section">
          <h4>Contáctanos</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/tuNumero" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="mailto:contacto@lovelybottles.com"><FaEnvelope /></a>
          </div>
          <p>Envíos a todo Perú</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Lovely Bottles by Julia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
