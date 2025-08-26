import React from "react";
import "./Brands.css";

const marcas = [
  { id: 1, nombre: "HydroJug", img: "/images/brands/HydroJug.webp" },
  { id: 2, nombre: "Owala", img: "/images/brands/Owala.webp" },
  { id: 3, nombre: "Stanley", img: "/images/brands/Stanley.webp" },
  { id: 4, nombre: "Personalizados", img: "/images/brands/Decorate.jpeg" },
];

const Brands = () => {
  return (
    <div className="brands-container">
      {marcas.map((marca) => (
        <div key={marca.id} className="brand-card">
          <img src={marca.img} alt={marca.nombre} />
          <p>{marca.nombre}</p>
        </div>
      ))}
    </div>
  );
};

export default Brands;
