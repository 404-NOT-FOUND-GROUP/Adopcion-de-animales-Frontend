import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import useCurrentUser from "../../shared/hooks/useCurrentUser";

export const UserDetail = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useCurrentUser();

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 700);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 70%, #bbdefb 100%)",
  };

  const contentWrapperStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: isMobile ? 100 : 180,
    paddingBottom: 40,
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 600,
    background: "#ffffff",
    borderRadius: 24,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    padding: isMobile ? "2rem 1.5rem" : "3rem 3rem",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 24 : 48,
  };

  const avatarStyle = {
    borderRadius: "50%",
    width: isMobile ? 140 : 160,
    height: isMobile ? 140 : 160,
    objectFit: "cover",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    background: "#ddd",
    flexShrink: 0,
    border: "3px solid #90caf9",
    margin: isMobile ? "0 auto" : 0,
    display: "block",
  };

const detailsStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 16,
  minWidth: 0, // para controlar overflow en flex container
};
  const nameStyle = {
    fontSize: isMobile ? 28 : 36,
    fontWeight: 700,
    color: "#1565c0",
    letterSpacing: 0.5,
    marginBottom: 12,
  };

const infoRow = {
  fontSize: 17,
  color: "#424242",
  background: "#e3f2fd",
  borderRadius: 12,
  padding: "10px 18px",
  boxShadow: "0 1px 6px rgba(144,202,249,0.15)",
  border: "1px solid #90caf9",
  whiteSpace: "normal",
  overflowWrap: "break-word",
  wordBreak: "break-word",
  maxWidth: "100%",
};

  const labelStyle = {
    fontWeight: 600,
    marginRight: 8,
    color: "#0d47a1",
  };

  const statusStyle = {
    marginTop: 12,
    fontWeight: 700,
    fontSize: 18,
    color: user?.status === "active" ? "#2e7d32" : "#f57c00",
    backgroundColor: user?.status === "active" ? "#c8e6c9" : "#ffe0b2",
    padding: "8px 16px",
    borderRadius: 16,
    width: "fit-content",
  };

  const buttonContainerStyle = {
    marginTop: 32,
    display: "flex",
    justifyContent: "center",
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div style={containerStyle}>
          <Sidebar />
          <div style={{ ...contentWrapperStyle, justifyContent: "center" }}>
            <p style={{ fontSize: 20, color: "#1565c0" }}>
              Cargando datos del usuario...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <NavBar />
        <div style={containerStyle}>
          <Sidebar />
          <div style={{ ...contentWrapperStyle, justifyContent: "center" }}>
            <p style={{ fontSize: 20, color: "#1565c0" }}>
              No se pudo cargar la información del usuario.
            </p>
          </div>
        </div>
      </>
    );
  }

  const avatarUrl =
    user.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name || user.email || "Usuario"
    )}&background=90caf9&color=fff&size=160`;

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <Sidebar />
        <main style={contentWrapperStyle}>
          <section style={cardStyle}>
            <img src={avatarUrl} alt={user.name} style={avatarStyle} />
            <div style={detailsStyle}>
              <h1 style={nameStyle}>{user.name || user.email}</h1>

              <div style={infoRow}>
                <span style={labelStyle}>Correo:</span>
                <span>{user.email}</span>
              </div>

              <div style={infoRow}>
                <span style={labelStyle}>Rol:</span>
                <span>{user.role || "Usuario"}</span>
              </div>

              <div style={infoRow}>
                <span style={labelStyle}>Teléfono:</span>
                <span>{user.phone ? user.phone : "No disponible"}</span>
              </div>

              <div style={infoRow}>
                <span style={labelStyle}>Registrado el:</span>
                <span>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Fecha desconocida"}
                </span>
              </div>

              <div style={statusStyle}>
                Estado: {user.status === "active" ? "Activo" : "Inactivo"}
              </div>

              <div style={buttonContainerStyle}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(-1)}
                  style={{ minWidth: 130 }}
                >
                  ← Volver
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default UserDetail;
