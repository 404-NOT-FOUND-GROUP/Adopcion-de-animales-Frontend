import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPetById } from "../../shared/hooks/useGetPetById";
import Button from "react-bootstrap/Button";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import { useAuth } from "../../shared/hooks/useAuth";
import { DeletePetButton } from "./DeletePetButtom.jsx";
const cloudName = "dkmmydkxt";
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

export const PetDetail = () => {
  const { isAdmin } = useAuth();
  const { petId } = useParams();
  const navigate = useNavigate();
  const { pet, isLoading } = useGetPetById(petId);

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 700);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // estilos (igual que antes)
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f7f7f7 60%, #ffe0b2 100%)",
  };

  const contentWrapperStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: isMobile ? 100 : 200,
    paddingBottom: 40,
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 950,
    background: "#fff",
    borderRadius: 32,
    boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 24 : 56,
    padding: isMobile ? "2rem 1rem" : "3rem 3.5rem",
    margin: "0 1rem",
    position: "relative",
    border: "1.5px solid #f5c16c",
    transition: "box-shadow 0.2s",
  };

  const imageStyle = {
    borderRadius: 28,
    width: isMobile ? 180 : 320,
    height: isMobile ? 180 : 320,
    objectFit: "cover",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    background: "#eee",
    flexShrink: 0,
    border: "4px solid #ffe0b2",
    margin: isMobile ? "0 auto" : 0,
    display: "block",
  };

  const detailsStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 0,
    marginTop: isMobile ? 24 : 0,
  };

  const nameStyle = {
    fontSize: isMobile ? 28 : 38,
    fontWeight: 800,
    marginBottom: 18,
    color: "#ff9800",
    letterSpacing: 1,
    textShadow: "0 2px 8px #ffe0b2",
    lineHeight: 1.1,
  };

  const infoGroupStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: isMobile ? 10 : 18,
    marginBottom: 18,
  };

  const infoStyle = {
    fontSize: 18,
    color: "#444",
    background: "#fff8e1",
    borderRadius: 12,
    padding: "8px 16px",
    marginBottom: 0,
    boxShadow: "0 1px 4px rgba(255,193,108,0.07)",
    border: "1px solid #ffe0b2",
    fontWeight: 500,
  };

  const statusStyle = {
    fontWeight: 700,
    marginTop: 18,
    color: pet?.status === "AVAILABLE" ? "#43a047" : "#ff9800",
    fontSize: 20,
    letterSpacing: 1,
    background: "#fffde7",
    borderRadius: 10,
    padding: "8px 18px",
    display: "inline-block",
    border: "1.5px solid #ffe0b2",
    boxShadow: "0 1px 4px rgba(255,193,108,0.07)",
  };

  const buttonContainerStyle = {
    marginTop: 36,
    display: "flex",
    justifyContent: isMobile ? "center" : "flex-end",
    gap: 10,
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div style={containerStyle}>
          <Sidebar />
          <div style={{ ...contentWrapperStyle, justifyContent: "center" }}>
            <div style={{ fontSize: 20, color: "#ff9800" }}>
              Cargando información de la mascota...
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!pet) {
    return (
      <>
        <NavBar />
        <div style={containerStyle}>
          <Sidebar />
          <div style={{ ...contentWrapperStyle, justifyContent: "center" }}>
            <div style={{ fontSize: 20, color: "#ff9800" }}>
              No se encontró la mascota.
            </div>
          </div>
        </div>
      </>
    );
  }

  const imageUrl = pet?.image
    ? isUrl(pet.image)
      ? pet.image
      : getImageUrl(pet.image)
    : "https://via.placeholder.com/320x320.png?text=Sin+imagen";

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <Sidebar />
        <div style={contentWrapperStyle}>
          <div style={cardStyle}>
            <div>
              <img src={imageUrl} alt={pet.name} style={imageStyle} />
            </div>
            <div style={detailsStyle}>
              <div style={nameStyle}>{pet.name}</div>
              <div style={infoGroupStyle}>
                <div style={infoStyle}>
                  <strong>Tipo:</strong> {pet.type}
                </div>
                <div style={infoStyle}>
                  <strong>Edad:</strong> {pet.age} {pet.age === 1 ? "año" : "años"}
                </div>
                <div style={infoStyle}>
                  <strong>Raza:</strong> {pet.breed}
                </div>
                <div style={infoStyle}>
                  <strong>Género:</strong> {pet.gender === "male" ? "Macho" : "Hembra"}
                </div>
                <div style={infoStyle}>
                  <strong>Peso:</strong> {pet.weight}
                </div>
                <div style={infoStyle}>
                  <strong>Tamaño:</strong> {pet.size}
                </div>
                <div style={infoStyle}>
                  <strong>Color:</strong> {pet.color}
                </div>
                <div style={infoStyle}>
                  <strong>Nivel de ejercicio:</strong> {pet.exerciseLevel}
                </div>
                <div style={infoStyle}>
                  <strong>Fecha de rescate:</strong>{" "}
                  {new Date(pet.rescueDate).toLocaleDateString()}
                </div>
                <div style={infoStyle}>
                  <strong>Enfermedades:</strong>{" "}
                  {pet.diseases.length > 0 ? pet.diseases.join(", ") : "Ninguna"}
                </div>
                <div style={infoStyle}>
                  <strong>Discapacidad:</strong>{" "}
                  {pet.disability.length > 0 ? pet.disability.join(", ") : "Ninguna"}
                </div>
                <div style={infoStyle}>
                  <strong>Vacunas al día:</strong> {pet.vaccines ? "Sí" : "No"}
                </div>
              </div>
              <div style={statusStyle}>
                <strong>Estado:</strong> {pet.status}
              </div>
              <div style={buttonContainerStyle}>
                <Button
                  variant="warning"
                  size="sm"
                  className="text-white"
                  onClick={() => navigate(-1)}
                >
                  ← Volver al listado
                </Button>
                {isAdmin && <DeletePetButton petId={petId} navigate={navigate} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
