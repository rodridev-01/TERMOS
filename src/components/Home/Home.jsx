import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const imagenesDesktop = [
    "/images/banner/1.png",
    "/images/banner/2.png",
    "/images/banner/3.png",
  ];

  const imagenesMobile = [
    "/images/banner/mobile-1.png",
    "/images/banner/mobile-2.png",
    "/images/banner/mobile-3.png",
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [current, setCurrent] = useState(0);

  // Detecta cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Escoge imágenes según el dispositivo
  const imagenes = isMobile ? imagenesMobile : imagenesDesktop;

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
