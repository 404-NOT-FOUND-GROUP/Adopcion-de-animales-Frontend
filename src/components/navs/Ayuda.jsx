import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ayuda.css';

export const Ayuda = () => {
  const navigate = useNavigate();

  const volverInicio = () => {
    navigate('/');
  };

  return (
    <div className="ayuda-container">
      <div className="ayuda-card">
        <h1 className="ayuda-title">🐾 Centro de Ayuda</h1>
        <p className="ayuda-description">
          Bienvenido al centro de ayuda de <strong>404-ADOPTION</strong>. Aquí encontrarás
          información útil sobre cómo adoptar una mascota, registrarte en el sistema y más.
        </p>

        <section className="ayuda-seccion">
          <h3>¿Cómo puedo adoptar una mascota?</h3>
          <p>
            Solo necesitas crear una cuenta, buscar una mascota disponible y presionar el
            botón <strong>Adoptar</strong>. Luego recibirás instrucciones específicas por correo.
          </p>
        </section>

        <section className="ayuda-seccion">
          <h3>¿Qué requisitos necesito?</h3>
          <p>
            Necesitamos verificar tu información básica y confirmar que puedes cuidar de la
            mascota. También puedes consultar los <em>términos de adopción</em> en la sección principal.
          </p>
        </section>

        <section className="ayuda-seccion">
          <h3>¿Dónde puedo ver las mascotas disponibles?</h3>
          <p>
            En la página principal encontrarás una galería de mascotas esperando un hogar, esperamos
            que esta página sea útil para tu ayuda y dudas.
          </p>
        </section>

        <div className="ayuda-volver">
          <button className="ayuda-btn" onClick={volverInicio}>
            Volver a Inicio
          </button>
        </div>
      </div>
    </div>
  );
};