import React, { useEffect, useState } from "react";
import "./Brands.css";

const Brands = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/categorias");
        if (!res.ok) throw new Error("Error al cargar categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <div className="brands-container">
      {categorias.map((cat) => (
        <div key={cat.id} className="brand-card">
          <img
            src={`http://localhost:3000${cat.imagen}`} 
            alt={cat.nombre}
          />
          <p>{cat.nombre}</p>
        </div>
      ))}
    </div>
  );
};

export default Brands;
