import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Producto from "./components/Producto/Producto";
import Home from "./components/Home/Home";
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <div className="App">
      <Navbar />
       <Home />
      <div className="productos-grid">
        {productos.map(p => (
          <Producto key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
