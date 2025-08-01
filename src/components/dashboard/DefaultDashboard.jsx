import React from "react";
import { Sidebar } from "../../components/nav/Sidebar";
import { NavBar } from "../../components/nav/NavBar";
import { useAuth } from "../../shared/hooks/useAuth";
import "../UI/css/DefaultDashboard.css";
import { PetCarousel } from "../pets/PetsCarrusel.jsx";

import bgImage from "../../assets/background.png";
import img1 from "../../assets/ImagenAlbergue1.png";
import img8 from "../../assets/ImagenAlbergue8.png";

const images = [
  {
    src: img1,
    title: "¡Listo para dar amor!",
    desc: "¡Hola! Si estás listo para darle un hogar lleno de amor a uno de nuestros peludos, te damos la bienvenida a esta hermosa aventura. Para nosotros, la adopción responsable es la clave: cada uno de nuestros animales ha sido rescatado y preparado con mucho cariño para encontrar a su familia ideal. Por eso, te invitamos a ver los requisitos que aparecen en la imagen. Son pasos importantes que nos ayudan a asegurar que este compromiso sea para toda la vida, garantizando que nuestros amigos de cuatro patas encuentren un hogar seguro y lleno de bienestar. ¡No dudes en contactarnos si tienes alguna pregunta! Estamos emocionados de ayudarte a encontrar a tu compañero ideal.",
  },    
];

const turquoiseImages = [
  {
    src: img8,
    title: "Información de Castraciones y Clínicas",
    desc: (
      <>
        <p>
          <strong>📍 Ubicación de nuestra clínica:</strong><br />
          47 avenida 18 calle 47-07 Col. San José La Chacara, zona 5<br />
          <strong>⏰ Hora y día:</strong> Martes y jueves de 8am a 4pm y viernes de 8am a 4pm
        </p>
        <p>
          <strong>📍 Ubicación de nuestra clínica:</strong><br />
          16 avenida 11-54 Colonia Bello Horizonte, zona 21<br />
          <strong>⏰ Hora y día:</strong> Miércoles de 8am a 4pm y viernes de 9am a 1pm
        </p>
        <p>
          <strong>Dirección de la clínica:</strong><br />
          Boulevard Tulam Zu, Centro Comercial La Cúpula Local No. 4, Zona 4 Mixco.
        </p>
        <hr />
        <p>
          <strong>Confirmación de cita para Castración</strong>
        </p>
        <p>
          <strong>Responsable de la mascota</strong>
        </p>
        <p>
          <strong>Datos de la mascota</strong><br />
          Nombre:<br />
          Especie:<br />
          Raza:<br />
          Edad:<br />
          Sexo:<br />
          Peso:<br />
          <br />
          Cita:<br />
          Hora:
        </p>
        <hr />
        <p>
          <strong>INFORMACIÓN IMPORTANTE:</strong>
        </p>
        <ul>
          <li>
            Previo a la cirugía se le solicitará firmar una autorización para realizar la castración.
          </li>
        </ul>
        <p>
          <strong>TIEMPO DE AYUNO</strong><br />
          La mascota 🐶🐱 debe llegar con 12 horas de AYUNO, incluso de agua (Se recomienda retirarle el plato de alimento y agua desde la noche anterior a su cita)
        </p>
        <p>
          <strong>MEDIDAS DE SEGURIDAD</strong>
        </p>
        <ul>
          <li>🐶 Deben llevar correa (agresivo o raza peligrosa también bozal)</li>
          <li>🐱 Deben ser transportados en jaula, bolso o caja segura.</li>
        </ul>
        <p>
          Se recomienda llevar:
        </p>
        <ul>
          <li>Un pañal desechable acorde al tamaño de la mascota (puede ser de uso humano)</li>
          <li>Una colchita o frazada.</li>
        </ul>
      </>
    ),
  }
];

export const DefaultDashboard = () => {
  const { isAdmin, isVet } = useAuth();

  return (    
  <div
      className="dashboard-container"
      style={{
        backgroundImage:  `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <NavBar />
        {(isAdmin|| isVet) && <Sidebar className="dashboard-sidebar" />}
      <div className="dashboard-main">
        <main className="dashboard-content dashboard-center-box">
          <PetCarousel />
          <br />
          <br />
          <br />
          {/* Hero */}
          <section className="dashboard-hero welcome-section">
            <h1 className="hero-title welcome-title">Bienestar Animal</h1>
            <p className="hero-subtitle welcome-text">
              Donde cada mascota tiene una historia y una segunda oportunidad.
            </p>
          </section>

          {/* Información Importante */}
          <section className="recommendation-section adopt-section fade-in">
            <div className="recommendation-grid adopt-flex">
              {images.map((item, i) =>
                i === 0 ? (
                  <div key={i} className="recommendation-item special-item">
                    <div className="image-container">
                      <img src={item.src} alt={item.title} />
                    </div>
                    <div className="recommendation-text special-text">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="recommendation-item">
                    <img src={item.src} alt={item.title} />
                    <div className="recommendation-text">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Mensaje final */}
          <section className="adoption-message-box adopt-section fade-in">
            <div className="adoption-message-content">
              <div className="adoption-message-text">
                <h2>Adopta, no compres: un acto de amor que lo cambia todo</h2>
                <p>
                  Cuando decides tener un nuevo compañero peludo, te invitamos a considerar la adopción.
                  Es un acto de amor que salva una vida y tiene un impacto enorme.
                </p>
                <ul className="adoption-benefits">
                  <li><strong>Salvas una vida:</strong> Los albergues en Guatemala están llenos de animales esperando una segunda oportunidad.</li>
                  <li><strong>Combates el maltrato:</strong> Le dices "no" a los criaderos irresponsables y al abandono.</li>
                  <li><strong>Encuentras un amigo único:</strong> Hay animales de todas las edades y personalidades listos para ser parte de tu familia.</li>
                </ul>
                <p>
                  Adoptar es ser parte de la solución. Te invitamos a visitar un albergue y descubrir el amor que espera por ti.
                </p>
                <a href="/mascotas" className="btn btn-outline-success">
                  Conoce a nuestras mascotas
                </a>
              </div>
            </div>
          </section>
              <br />
              
        {/* Tarjetas turquesa */}
       <section className="recommendation-section adopt-section fade-in">
        <div className="recommendation-grid adopt-flex">
          {turquoiseImages.map((item, i) =>
            i === 0 ? (
              <div key={i} className="recommendation-item turquoise-message-box">
                <div className="turquoise-message-image">
                  <img src={item.src} alt={item.title} />
                </div>
                <div className="recommendation-text turquoise-message-text">
                  <h3>{item.title}</h3>
                  {/* Aquí en vez de <p>{item.desc}</p>, colocamos el JSX directo */}
                  {item.desc}
                </div>
              </div>
            ) : (
              <div key={i} className="recommendation-item">
                <img src={item.src} alt={item.title} />
                <div className="recommendation-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

        </main>
      </div>
    </div>
  );
};