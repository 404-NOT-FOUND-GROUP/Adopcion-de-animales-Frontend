
import React from 'react';
import { useNavigate } from 'react-router-dom';
import  "../../components/UI/css/quienessomos.css"
import { NavBar } from '../../components/nav/NavBar.jsx';
import { Sidebar } from '../../components/nav/Sidebar.jsx';
import ImgQuienesSomos from "../../assets/QuienesSomos1.png";
import ImgDedicamos from "../../assets/DEDICAMOS.jpeg";
import ImgMision from "../../assets/Mision.jpeg";
import ImgValores from "../../assets/Valores.png";


export const QuienesSomos = () => {
  const navigate = useNavigate();

  const leftIcons = ['🐶', '🐾', '🐱', '🐾'];
  const rightIcons = ['🐱', '🐾', '🐶', '🐾'];

  return (
    <div className="quienes-somos-container">
      {/* NavBar en la parte superior */}
      <NavBar />
      <Sidebar />
      {/* LADO IZQUIERDO */}
      <div className="iconos-flotantes izquierda-flotantes">
        {[...Array(12)].map((_, i) => (
          <span key={`izq-${i}`} className="emoji-float" style={{ '--i': i }}>
            {leftIcons[i % leftIcons.length]}
          </span>
        ))}
      </div>

      {/* LADO DERECHO */}
      <div className="iconos-flotantes derecha-flotantes">
        {[...Array(12)].map((_, i) => (
          <span key={`der-${i}`} className="emoji-float" style={{ '--i': i }}>
            {rightIcons[i % rightIcons.length]}
          </span>
        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="contenido-quienes">
        <section className="bloque-info">
          <img src={ImgQuienesSomos} alt="¿Quiénes somos?" />
          <div>
            <h2>¿Quiénes somos?</h2>
            <p>
              Somos una organización comprometida con el bienestar animal. Nuestra misión es rescatar,
              proteger y encontrar hogares amorosos para perritos y gatitos en situación de abandono.
            </p>
          </div>
        </section>

        <section className="bloque-info reverse">
          <img src={ImgDedicamos} alt="¿A qué nos dedicamos?" />
          <div>
            <h2>¿A qué nos dedicamos?</h2>
            <p>
              Nos enfocamos en fomentar la adopción responsable, brindar atención médica a los animales
              rescatados y educar a la comunidad sobre el respeto hacia los animales.
            </p>
          </div>
        </section>

        <section className="bloque-info">
          <img src={ImgMision} alt="Misión" />
          <div>
            <h2>Misión</h2>
            <p>
              Salvar la mayor cantidad de vidas animales posibles, promoviendo la adopción, el cuidado y
              el amor hacia nuestros compañeros peludos.
            </p>
          </div>
        </section>

        <section className="bloque-info reverse">
          <img src={ImgValores} alt="Visión" />
          <div>
            <h2>Visión</h2>
            <p>
              Ser la red de adopción más confiable y reconocida, donde cada mascota tenga una segunda
              oportunidad en un hogar lleno de cariño.
            </p>
          </div>
        </section>

        {/* Botón de regreso al final */}
        <div className="btn-regresar-container">
          <button className="btn-regresar" onClick={() => navigate(-1)}>
            ← Regresar
          </button>
        </div>
      </div>
    </div>
  );
};
