import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPetById } from "../../shared/hooks/useGetPetById";
import Button from "react-bootstrap/Button";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import { useAuth } from "../../shared/hooks/useAuth";
import { DeletePetButton } from "./DeletePetButtom.jsx";
import "../../components/UI/css/PetDetail.css";

const cloudName = "dqoobhkdv";
const getImageUrl = (path) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;

const isUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

// Diccionario de traducciones
const traducir = (categoria, valor) => {
  const map = {
    gender: { male: "Macho", female: "Hembra" },
    status: { AVAILABLE: "Disponible", ADOPTED: "Adoptado" },
    type: { dog: "Perro", cat: "Gato" },
    size: { small: "Pequeño", medium: "Mediano", large: "Grande" },
    exerciseLevel: {
      low: "Bajo",
      medium: "Mediano",
      high: "Alto",
    },
  };
  return map[categoria]?.[valor] || valor;
};

export const PetDetail = () => {
  const { isAdmin } = useAuth();
  const { petId } = useParams();
  const navigate = useNavigate();
  const { pet, isLoading } = useGetPetById(petId);

  // Responsive: para mostrar loading centrado en móvil/escritorio
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 700);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="pet-detail-bg">
          <Sidebar />
          <main className="pet-detail-main">
            <div className="loading">Cargando información de la mascota...</div>
          </main>
        </div>
      </>
    );
  }

  if (!pet) {
    return (
      <>
        <NavBar />
        <div className="pet-detail-bg">
          <Sidebar />
          <main className="pet-detail-main">
            <div className="loading">No se encontró la mascota.</div>
          </main>
        </div>
      </>
    );
  }

  // Imagen: usa url directa, cloudinary o placeholder
  const imageUrl = pet.image
    ? isUrl(pet.image)
      ? pet.image
      : getImageUrl(pet.image)
    : "https://via.placeholder.com/320x320.png?text=Sin+imagen";

  return (
    <>
      <NavBar />
      <div className="pet-detail-bg">
        <Sidebar />
        <main className="pet-detail-main">
          <section className="pet-detail-card">
            <div className="pet-detail-imgbox">
              <img src={imageUrl} alt={pet.name} />
            </div>
            <div className="pet-detail-info">
              <h2 className="pet-detail-name">{pet.name}</h2>
              <div className="pet-detail-badges">
                <span className="badge badge-type">
                  {traducir("type", pet.type)}
                </span>
                <span className="badge badge-gender">
                  {traducir("gender", pet.gender)}
                </span>
                <span className="badge badge-age">
                  {pet.age} {pet.age === 1 ? "año" : "años"}
                </span>
                <span className="badge badge-size">
                  {traducir("size", pet.size)}
                </span>
                <span className="badge badge-breed">{pet.breed}</span>
              </div>
              <ul className="pet-detail-list">
                <li>
                  <b>Peso:</b> {pet.weight} kg
                </li>
                <li>
                  <b>Color:</b> {pet.color}
                </li>
                <li>
                  <b>Nivel de ejercicio:</b>{" "}
                  {traducir("exerciseLevel", pet.exerciseLevel)}
                </li>
                <li>
                  <b>Fecha de rescate:</b>{" "}
                  {pet.rescueDate
                    ? new Date(pet.rescueDate).toLocaleDateString()
                    : "No registrada"}
                </li>
                <li>
                  <b>Enfermedades:</b>{" "}
                  {pet.diseases?.length ? pet.diseases.join(", ") : "Ninguna"}
                </li>
                <li>
                  <b>Discapacidad:</b>{" "}
                  {pet.disability?.length ? pet.disability.join(", ") : "Ninguna"}
                </li>
                <li>
                  <b>Vacunas al día:</b> {pet.vaccines ? "Sí" : "No"}
                </li>
              </ul>
              <div
                className={`pet-detail-status ${
                  pet.status === "AVAILABLE" ? "available" : "adopted"
                }`}
              >
                {traducir("status", pet.status)}
              </div>
              <div className="pet-detail-actions">
                <Button
                  variant="warning"
                  size="sm"
                  className="pet-detail-btn"
                  onClick={() => navigate(-1)}
                >
                  ← Volver al listado
                </Button>
                {isAdmin && <DeletePetButton petId={petId} navigate={navigate} />}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
