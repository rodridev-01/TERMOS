import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./user/ProductoDetalle.css";

function ProductoDetalle() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch((err) => console.error("Error al obtener producto:", err));
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="producto-detalle">
      {/* Columna izquierda: imagen */}
      <div className="columna-imagen">
        <img
          src={`http://localhost:3000${producto.imagen}`}
          alt={producto.nombre}
          className="producto-detalle-img"
        />
      </div>

      {/* Columna derecha: información */}
      <div className="columna-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p>
          <strong>S/{producto.precio}</strong>
        </p>
        <p>
          <strong>Stock: </strong>
          {producto.stock}
        </p>
        <p>
          <strong>Marca: </strong>{producto.marca} | <strong>Categoría:</strong>{" "}
          {producto.categoria}
        </p>

        <div className="acciones">
          {producto.stock > 0 ? (
            <>
              <button className="btn-comprar">Comprar ahora</button>
              <button className="btn-carrito">Agregar al carrito</button>
            </>
          ) : (
            <button className="btn-agotado" disabled>Agotado</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
