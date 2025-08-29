import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import CardProducto from "./components/Cards/Producto/Producto";
import Brands from "./components/Brands/Brands";
import Productos from "./pages/producto";
import AdminHome from "./pages/admin/components/AdminMarcas"; 


import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/productos-con-imagen")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Layout común con Navbar */}
         <Route path="/admin" element={<AdminHome />} />

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
