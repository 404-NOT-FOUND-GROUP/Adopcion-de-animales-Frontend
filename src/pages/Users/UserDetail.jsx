import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import useCurrentUser from "../../shared/hooks/useCurrentUser";
import "../../components/UI/css/UserDetail.css";

export const UserDetail = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useCurrentUser();

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 700);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="userdetail-container">
          <Sidebar />
          <div className="userdetail-content-wrapper" style={{ justifyContent: "center" }}>
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
        <div className="userdetail-container">
          <Sidebar />
          <div className="userdetail-content-wrapper" style={{ justifyContent: "center" }}>
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
      <div className="userdetail-container">
        <Sidebar />
        <main className="userdetail-content-wrapper">
          <section className="userdetail-card">
            <img src={avatarUrl} alt={user.name} className="userdetail-avatar" />
            <div className="userdetail-details">
              <h1 className="userdetail-name">{user.name || user.email}</h1>

              <div className="userdetail-info-row">
                <span className="userdetail-label">Correo:</span>
                <span>{user.email}</span>
              </div>

              <div className="userdetail-info-row">
                <span className="userdetail-label">Rol:</span>
                <span>{user.role || "Usuario"}</span>
              </div>

              <div className="userdetail-info-row">
                <span className="userdetail-label">Teléfono:</span>
                <span>{user.phone ? user.phone : "No disponible"}</span>
              </div>

              <div className="userdetail-info-row">
                <span className="userdetail-label">Registrado el:</span>
                <span>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Fecha desconocida"}
                </span>
              </div>

              <div className={`userdetail-status${user.status !== "active" ? " inactive" : ""}`}>
                Estado: {user.status === "active" ? "Activo" : "Inactivo"}
              </div>

              <div className="userdetail-btn-container">
                <Button
                  className="userdetail-btn"
                  variant="primary"
                  size="md"
                  onClick={() => navigate(-1)}
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
