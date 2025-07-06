import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAllPets } from "../../services/api.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../UI/css/PetCarousel.css";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  const ArrowLeft = (props) => {
    const { className, style, onClick } = props;
    if (className && className.includes("slick-disabled")) return null;
    return (
      <button
        className={className}
        style={{ ...style, display: "flex" }}
        onClick={onClick}
        aria-label="Anterior"
        type="button"
      >
        <FaChevronLeft size={22} />
      </button>
    );
  };

  const ArrowRight = (props) => {
    const { className, style, onClick } = props;
    if (className && className.includes("slick-disabled")) return null;
    return (
      <button
        className={className}
        style={{ ...style, display: "flex" }}
        onClick={onClick}
        aria-label="Siguiente"
        type="button"
      >
        <FaChevronRight size={22} />
      </button>
    );
  };

  const PetCard = ({ pet }) => (
    <div className="pet-box">
      <div className="pet-image">
        <img
          src={getImageUrl(pet.image)}
          alt={pet.name}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/440x280?text=No+Image";
          }}
        />
      </div>
      <div className="pet-name">{pet.name}</div>
      <div className="pet-info">
        {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
      </div>
      <div className={`pet-status${pet.status === "Adoptado" ? " adopted" : ""}`}>
        {pet.status === "Disponible"
          ? "🟢 Disponible"
          : pet.status === "Adoptado"
          ? "🏠 Adoptado"
          : pet.status}
      </div>
      <div className="pet-buttons">
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
  );

  if (pets.length === 1) {
    const pet = pets[0];
    return (
      <div style={{ maxWidth: "600px", margin: "auto", position: "relative" }}>
        <PetCard pet={pet} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
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
            <PetCard pet={pet} />
          </div>
        ))}
      </Slider>
    </div>
  );
};