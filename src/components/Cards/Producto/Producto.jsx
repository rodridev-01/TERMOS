import { Link } from "react-router-dom";
import "./Producto.css";

function Producto({ producto }) {
  return (
    <Link to={`/productos/${producto.id}`} className="card-producto">
      <div className="producto">
        {producto.imagen ? (
          <img
            src={`http://localhost:3000${producto.imagen}`}
            alt={producto.nombre}
          />
        ) : (
          <span>Sin imagen</span>
        )}
        <h3>{producto.nombre}</h3>
        <p>S/{producto.precio}</p>
      </div>
  
    </Link>
  );
}

export default Producto;
