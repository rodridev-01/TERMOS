import React, { useState } from "react";
import "./Home.css";

function Home() {
  const imagenes = [
    "/images/banner/1.png",
    "/images/banner/2.png",
    "/images/banner/3.png",
  ];

  const [current, setCurrent] = useState(0);

  const siguiente = () => {
    setCurrent((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setCurrent((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const irA = (index) => {
    setCurrent(index);
  };

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {imagenes.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Controles */}
      <div className="controles">
        <button className="arrow" onClick={anterior}>❮</button>

        <div className="dots">
          {imagenes.map((_, index) => (
            <span
              key={index}
              className={`dot ${current === index ? "active" : ""}`}
              onClick={() => irA(index)}
            ></span>
          ))}
        </div>

        <button className="arrow" onClick={siguiente}>❯</button>
      </div>
    </div>
  );
}

export default Home;
