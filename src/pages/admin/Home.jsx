import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaHome, FaUsers, FaCog, FaTag, FaThLarge, FaBox, FaClipboardList } from "react-icons/fa";
import "./components/styles/Home.css"; 

const AdminHome = () => {
  return (
    <div className="dashboard">
      {/* Topbar */}
      <header className="topbar">
        <div className="brand">
          <img src="/Navbar.png" alt="Marca" className="brand-logo" />
        </div>
        <h1>OLAKASE</h1>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin">
              <FaHome className="icon" />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/marcas">
              <FaTag className="icon" />
              <span>Marcas</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/categorias">
              <FaThLarge className="icon" />
              <span>Categorías</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/productos">
              <FaBox className="icon" />
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/usuarios">
              <FaUsers className="icon" />
              <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/pedidos">
              <FaClipboardList className="icon" />
              <span>Pedidos</span>
            </Link>
          </li>
          <li>
            <Link to="/configuracion">
              <FaCog className="icon" />
              <span>Configuración</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Aquí cambia solo el contenido */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminHome;
