import React from "react";
import './Home.css';

function Home() {
  const imagenes = [
    "/images/banner/banner1.jpg",
  ];

  return (
    <div className="slider">
      <div className="slider-track">
        {imagenes.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
