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
    title: "¡Tu voz salva una vida!",
    desc: (
      <>
        <p>No mires hacia otro lado. Si ves maltrato animal, tu denuncia es el primer paso para ponerle fin al sufrimiento de un ser indefenso.</p>

        <p><strong>¿Por qué es importante denunciar?</strong></p>

        <ul>
          <li><strong>Detienes el dolor:</strong> Le das una segunda oportunidad a un animal que sufre.</li>
          <li><strong>Fortaleces la justicia:</strong> Muestras que el maltrato no será tolerado en nuestra sociedad.</li>
          <li><strong>Ayudas a la comunidad:</strong> Contribuyes a un entorno más seguro y compasivo para todos.</li>
        </ul>

        <p><strong>¡Denuncia!</strong></p>

        <p>Escríbenos al <strong>4479-7830</strong></p>

        <p>O al correo: <strong>denunciasbienestaranimal@muniguate.com</strong></p>

        <p>Recuerda adjuntar pruebas. ¡Mientras más detalles, mejor! Sé la voz de quienes no pueden hablar.</p>
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