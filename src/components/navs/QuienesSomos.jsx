import React from 'react';
import { useNavigate } from 'react-router-dom';
import './quienesSomos.css';

export const QuienesSomos = () => {
  const navigate = useNavigate();

  const volverInicio = () => {
    navigate('/');
  };

  return (
    <div className="quienes-container">
      <div className="quienes-card">

        {/* Título y descripción */}
        <h1 className="quienes-title">🌟 ¿Quiénes Somos?</h1>
        <p className="quienes-description">
          En <strong>404-ADOPTION</strong> conectamos mascotas sin hogar con personas responsables y amorosas.
        </p>

        {/* Imagen debajo del párrafo */}
        <div className="quienes-imagen-central">
          <img src="/ruta-a-la-imagen.jpg" alt="Mascotas felices" />
        </div>

        {/* Segunda sección: ¿A qué nos dedicamos? */}
        <div className="quienes-dedicamos">
          <div className="dedicamos-texto">
            <h2>❓¿A qué nos dedicamos?</h2>
            <p>
              Nuestro compromiso es encontrar hogares seguros para animales abandonados,
              facilitar el proceso de adopción y educar sobre tenencia responsable.
            </p>
          </div>
          <div className="dedicamos-imagen">
            <img src="/ruta-a-la-segunda-imagen.jpg" alt="Adopción responsable" />
          </div>
        </div>

        <div className="quienes-volver">
          <button className="quienes-btn" onClick={volverInicio}>
            Volver a Inicio
          </button>
        </div>
      </div>
    </div>
  );
};
