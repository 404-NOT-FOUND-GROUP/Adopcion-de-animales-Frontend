import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAllPets } from "../../services/api.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../UI/css/PetCarousel.css";
import { useNavigate } from "react-router-dom";

const cloudName = "dkmmydkxt";

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;
};

export const PetCarousel = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getAllPets();
        if (!res.error) {
          setPets(res.pets.slice(0, 10));
        } else {
          console.error("Error cargando mascotas:", res.error);
        }
      } catch (error) {
        console.error("Error en la llamada getAllPets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) return <p className="text-center">Cargando mascotas...</p>;
  if (pets.length === 0) return <p className="text-center">No hay mascotas para mostrar.</p>;

  // Estilos inline que coinciden con PetList (puedes moverlos a CSS si quieres)
  const petBoxStyle = {
    maxWidth: "440px",
    margin: "1rem auto",
    padding: "1.5rem",
    textAlign: "center",
    borderRadius: "18px",
    boxShadow: "0 4px 18px 0 rgba(0, 201, 255, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.06)",
    backgroundColor: "#fff",
    border: "2px solid #e0f7fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.18s, box-shadow 0.18s",
    cursor: "pointer",
  };

  const petImageStyle = {
    width: "100%",
    height: "280px",
    borderRadius: "18px",
    overflow: "hidden",
    marginBottom: "1rem",
    backgroundColor: "#f0f8ff",
  };

  const petNameStyle = {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#00bcd4",
    marginBottom: "0.5rem",
    letterSpacing: "1px",
  };

  const petInfoStyle = {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "0.2rem",
  };

  const petStatusStyle = {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#009688",
    marginBottom: "1rem",
  };

  if (pets.length === 1) {
    const pet = pets[0];
    return (
      <div style={{ maxWidth: "600px", margin: "auto", position: "relative" }}>
        <div style={petBoxStyle}>
          <div style={petImageStyle}>
            <img
              src={getImageUrl(pet.image)}
              alt={pet.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/440x280?text=No+Image";
              }}
            />
          </div>
          <div style={petNameStyle}>{pet.name}</div>
          <div style={petInfoStyle}>
            {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
          </div>
          <div style={petStatusStyle}>
            {pet.status === "Disponible"
              ? "🟢 Disponible"
              : pet.status === "Adoptado"
              ? "🏠 Adoptado"
              : pet.status}
          </div>
          <div style={{ display: "flex", gap: "0.7rem", width: "100%", justifyContent: "center" }}>
            <button
              className="pet-button-ver-mas"
              onClick={() => navigate(`/mascotas/${pet.pid}`)}
            >
              Ver más
            </button>
            <button
              className="pet-button-adoptar"
              onClick={() => navigate(`/adoptar/${pet.pid}`)}
            >
              Adoptar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ maxWidth: "950px", margin: "auto", position: "relative" }}>
      <Slider {...settings}>
        {pets.map((pet, index) => (
          <div key={pet._id || index}>
            <div style={petBoxStyle}>
              <div style={petImageStyle}>
                <img
                  src={getImageUrl(pet.image)}
                  alt={pet.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/440x280?text=No+Image";
                  }}
                />
              </div>
              <div style={petNameStyle}>{pet.name}</div>
              <div style={petInfoStyle}>
                {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
              </div>
              <div style={petStatusStyle}>
                {pet.status === "Disponible"
                  ? "🟢 Disponible"
                  : pet.status === "Adoptado"
                  ? "🏠 Adoptado"
                  : pet.status}
              </div>
              <div style={{ display: "flex", gap: "0.7rem", width: "100%", justifyContent: "center" }}>
                <button
                  className="pet-button-ver-mas"
                  onClick={() => navigate(`/mascotas/${pet.pid}`)}
                >
                  Ver más
                </button>
                <button
                  className="pet-button-adoptar"
                  onClick={() => navigate(`/adoptar/${pet.pid}`)}
                >
                  Adoptar
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};