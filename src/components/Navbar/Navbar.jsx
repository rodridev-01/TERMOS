import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Izquierda - Marca */}
      <div className="nav-left">
        <h1>Lovely</h1>
      </div>

      {/* Centro - Links (solo en desktop) */}
      <ul className="nav-center">
        <li><a href="/">Inicio</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><a href="/categorias">Categorías</a></li>
        <li><a href="/ofertas">Ofertas</a></li>
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

      {/* Menú móvil (drawer desde la derecha) */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>✕</button>

        {/* Marca en menú móvil */}
        <div className="mobile-brand">
          <h1>Lovely</h1>
        </div>

        <ul>
          <li><a href="/" onClick={toggleMenu}>Inicio</a></li>
          <li><a href="/productos" onClick={toggleMenu}>Productos</a></li>
          <li><a href="/categorias" onClick={toggleMenu}>Categorías</a></li>
          <li><a href="/ofertas" onClick={toggleMenu}>Ofertas</a></li>
          <li><a href="/blog" onClick={toggleMenu}>Blog</a></li>
          <li className="mobile-icons">
            <a href="/buscar"><FaSearch /></a>
            <a href="/usuario"><FaUser /></a>
            <a href="/carrito"><FaShoppingCart /></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
