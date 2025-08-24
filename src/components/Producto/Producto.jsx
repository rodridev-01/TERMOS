import React from "react";
import './Producto.css';

function Producto({ producto }) {
  return (
    <div className="producto">
      <img src={producto.imagen} alt={producto.nombre} width="150" />
      <h2>{producto.nombre}</h2>
      <p>S/. {producto.precio}</p>
    </div>
  );
}

export default Producto;
