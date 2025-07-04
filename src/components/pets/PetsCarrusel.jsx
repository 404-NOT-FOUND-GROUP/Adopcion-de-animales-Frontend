import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAllPets } from "../../services/api.jsx";
import Button from "react-bootstrap/Button";
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

  // Si solo hay 1 mascota, no usar slider
  if (pets.length === 1) {
    const pet = pets[0];
    return (
      <div style={{ maxWidth: "600px", margin: "auto", position: "relative" }}>
        <div
          className="pet-box"
          style={{
            maxWidth: "500px",
            margin: "auto",
            padding: "1.5rem",
            textAlign: "center",
            borderRadius: "16px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
            backgroundColor: "#fff",
          }}
        >
          <div
            className="pet-image"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "1.2rem",
              height: "320px",
            }}
          >
            <img
              src={getImageUrl(pet.image)}
              alt={pet.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/500x320?text=No+Image";
              }}
            />
          </div>
          <div
            className="pet-name"
            style={{
              fontSize: "1.6rem",
              fontWeight: "700",
              color: "#243c5a",
              marginBottom: "0.5rem",
            }}
          >
            {pet.name}
          </div>
          <div
            className="pet-info"
            style={{ fontSize: "1.1rem", fontWeight: "500", color: "#444" }}
          >
            {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
          </div>
          <div
            className="pet-status"
            style={{ fontSize: "1rem", color: "#888", marginBottom: "1.2rem" }}
          >
            Hogar temporal
          </div>
          <div
            className="pet-buttons"
            style={{ display: "flex", justifyContent: "center", gap: "15px" }}
          >
            <Button variant="outline-dark" size="md" onClick={() => navigate(`/mascotas/${pet.pid}`)}>
              Ver más
            </Button>
            <Button variant="warning" size="md" className="text-white">
              Adoptar
            </Button>
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
            <div
              className="pet-box"
              style={{
                maxWidth: "440px",
                margin: "1rem auto",
                padding: "1.5rem",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
                backgroundColor: "#fff",
              }}
            >
              <div
                className="pet-image"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: "1.2rem",
                  height: "320px",
                }}
              >
                <img
                  src={getImageUrl(pet.image)}
                  alt={pet.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/440x320?text=No+Image";
                  }}
                />
              </div>
              <div
                className="pet-name"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#243c5a",
                  marginBottom: "0.5rem",
                }}
              >
                {pet.name}
              </div>
              <div
                className="pet-info"
                style={{ fontSize: "1.1rem", fontWeight: "500", color: "#444" }}
              >
                {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
              </div>
              <div
                className="pet-status"
                style={{ fontSize: "1rem", color: "#888", marginBottom: "1.2rem" }}
              >
                Hogar temporal
              </div>
              <div
                className="pet-buttons"
                style={{ display: "flex", justifyContent: "center", gap: "15px" }}
              >
                <Button
                  variant="outline-dark"
                  size="md"
                  onClick={() => navigate(`/mascotas/${pet.pid}`)}
                >
                  Ver más
                </Button>
                <Button variant="warning" size="md" className="text-white">
                  Adoptar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
