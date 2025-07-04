import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/UI/css/quienessomos.css';
import { NavBar } from '../../components/nav/NavBar.jsx';
import { Sidebar } from '../../components/nav/Sidebar.jsx';

export const QuienesSomos = () => {
  const navigate = useNavigate();

  const leftIcons = ['🐶', '🐾', '🐱', '🐾'];
  const rightIcons = ['🐱', '🐾', '🐶', '🐾'];

  return (
    <div className="quienes-somos-container">
      <NavBar />
      <Sidebar />

      {/* Iconos flotantes */}
      <div className="iconos-flotantes izquierda-flotantes">
        {[...Array(12)].map((_, i) => (
          <span key={`izq-${i}`} className="emoji-float" style={{ '--i': i }}>
            {leftIcons[i % leftIcons.length]}
          </span>
        ))}
      </div>

      <div className="iconos-flotantes derecha-flotantes">
        {[...Array(12)].map((_, i) => (
          <span key={`der-${i}`} className="emoji-float" style={{ '--i': i }}>
            {rightIcons[i % rightIcons.length]}
          </span>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Contenido principal nuevo */}
      <div className="contenido-central">
        <h1 className="titulo-principal">¿Quiénes Somos?</h1>
        <p className="descripcion bg-white p-4 rounded shadow-sm border">
          Somos una unidad ejecutora de la Municipalidad de Guatemala que depende de la Secretaria de Asuntos Sociales que impulsa nuestros proyectos encaminados a mejorar
          la calidad de vida de los animales a traves de educar a los ciudadanos, para que se comprometan, reconozcan y velen por los derechos de los animales como seres
          sintientes.
        </p>

        <h2 className="subtitulo">Nuestros Objetivos</h2>
        <div className="grid-objetivos">
          <div className="card-objetivo">
            <h3>📚 Proyecto Educativo</h3>
            <p>Promover un Proyecto Educativo que incentive el respeto y cuidado de los animales a traves de establecimientos educativos y medios de comunicacion.</p>
          </div>
          <div className="card-objetivo">
            <h3>🏠 Adopción Responsable</h3>
            <p>Propiciar la adopcion responsable de los animales que se encuentran en los centros y/o albergues propiedad de la Municipalidad de Guatemala.</p>
          </div>
          <div className="card-objetivo">
            <h3>✂️ Castraciones</h3>
            <p>Brindar atencion veterinaria y realizar castraciones de perros y gatos en condicion de calle y con propietarios, en las diferentes zonas de la ciudad.</p>
          </div>
          <div className="card-objetivo">
            <h3>🐾 Centros y Albergues</h3>
            <p>Mejorar el espacio fisico de los centros de adopcion, albergue y resguardo de la Municipalidad de Guatemala para dignificar la estadia de animales albergados.</p>
          </div>
        </div>

        <div className="btn-regresar-container">
          <button className="btn-regresar" onClick={() => navigate(-1)}>
            ← Regresar
          </button>
        </div>
      </div>
    </div>
  );
};
