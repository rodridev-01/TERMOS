import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import CardProducto from "./components/Cards/Producto/Producto";
import Brands from "./components/Brands/Brands";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";

import ProductoDetalle from "./pages/ProductoDetalle";

//ADMIN
import AdminHome from "./pages/admin/Home"; 
import AdminBrand from "./pages/admin/components/AdminMarcas"; 
import AdminCategorias from "./pages/admin/components/AdminCategorias"; 
import AdminProductos from "./pages/admin/components/AdminProductos"; 

import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <Router>
      <Routes>
        {/* ADMIN con rutas anidadas */}
        <Route path="/admin" element={<AdminHome />}>
          <Route index element={<h2>Bienvenido al panel admin</h2>} />
          <Route path="marcas" element={<AdminBrand />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="productos" element={<AdminProductos />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <Home />
                <Brands />
                <div className="title-section">
                  <h2>Últimos lanzamientos</h2>
                </div>
                <div className="productos-grid">
                  {productos.map((p) => (
                    <CardProducto key={p.id} producto={p} />
                  ))}
                </div>
              </>
            }
          />
          <Route path="productos" element={<Productos />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="productos/:id" element={<ProductoDetalle />} />
          <Route path="Ofertas" element={<Ofertas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
