import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <div className="App">
      <h1>Tienda de Termos</h1>
      <div className="grid">
        {productos.map(p => (
          <div key={p.id} className="producto">
            <img src={p.imagen} alt={p.nombre} width="150" />
            <h2>{p.nombre}</h2>
            <p>S/. {p.precio}</p>
            <button>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;