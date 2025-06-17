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
        <h1 className="quienes-title">🌟 ¿Quiénes Somos?</h1>
        <p className="quienes-description">
          Somos <strong>404-ADOPTION</strong>, una plataforma dedicada a conectar mascotas sin hogar
          con personas responsables y amorosas. Nuestro objetivo es facilitar el proceso de adopción
          y promover el bienestar animal.
        </p>

        <section className="quienes-seccion">
          <h3>🐶 Misión</h3>
          <p>
            Brindar una segunda oportunidad a cada mascota, asegurando que encuentren un hogar
            lleno de cariño y responsabilidad.
          </p>
        </section>

        <section className="quienes-seccion">
          <h3>🐾 Visión</h3>
          <p>
            Ser la red de adopción más confiable, transparente y accesible para todos aquellos
            que desean cambiar la vida de un animal.
          </p>
        </section>

        <div className="quienes-volver">
          <button className="quienes-btn" onClick={volverInicio}>
            Volver a Inicio
          </button>
        </div>
      </div>
    </div>
  );
};
