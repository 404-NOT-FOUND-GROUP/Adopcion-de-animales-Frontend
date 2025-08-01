import React from "react";
import { useNavigate } from "react-router-dom";
import { useObtenerCitasCompletadas } from "../../shared/hooks/useObtenerCitasCompletadas";
import { NavBar } from "../../components/nav/NavBar";
import { Sidebar } from "../../components/nav/Sidebar";
import "../../components/UI/css/PetDetail.css";

export const CitasCompletadas = () => {
  const { citas, isLoading } = useObtenerCitasCompletadas();
  const navigate = useNavigate();

  const citasCompletadas = citas.filter((cita) => cita.status === "completed");

  return (
    <>
      <NavBar />
      <div className="pet-detail-bg">
        <Sidebar />
        <main className="pet-detail-main">
          <div className="container" style={{ marginTop: "110px", marginBottom: "40px" }}>
            <h2 className="mb-4 text-center fw-bold text-success">
              Citas Completadas de Castración
            </h2>

            {isLoading ? (
              <div className="text-center mt-5">Cargando citas...</div>
            ) : (
              <div className="row justify-content-center">
                {citasCompletadas.length === 0 && (
                  <div className="text-center text-muted">
                    No hay citas completadas aún.
                  </div>
                )}
                {citasCompletadas.map((cita) => (
                  <div
                    className="col-12 col-md-10 col-lg-8 mb-5"
                    key={cita._id}
                  >
                    <div
                      className="pet-detail-card"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2.5rem",
                        alignItems: "flex-start",
                        padding: "2.5rem 2rem",
                        borderRadius: "22px",
                        background: "linear-gradient(135deg, #f8fafc 70%, #e0ffe0 100%)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                        minHeight: "220px",
                      }}
                    >
                      <div style={{ flex: "0 0 220px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                          className="pet-detail-name"
                          style={{
                            fontSize: "1.5rem",
                            marginBottom: "1.2rem",
                            fontWeight: "bold",
                            color: "#14532d",
                            textAlign: "center",
                            letterSpacing: "1px",
                          }}
                        >
                          {cita.nombreMascota}
                        </div>
                        <img
                          src={cita.image ? cita.image : "https://via.placeholder.com/220x220.png?text=Sin+imagen"}
                          alt={cita.nombreMascota || "Mascota"}
                          style={{
                            width: 180,
                            height: 180,
                            objectFit: "cover",
                            borderRadius: "16px",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                          }}
                        />
                      </div>

                      <div className="pet-detail-info" style={{ flex: 1 }}>
                        <div className="pet-detail-badges" style={{ flexWrap: "wrap", marginBottom: "1rem" }}>
                          <span className="badge badge-type">{cita.especieMascota}</span>
                          <span className="badge badge-gender">{cita.sexoMascota}</span>
                          <span className="badge badge-age">{cita.edadMascota} años</span>
                          <span className="badge badge-breed">{cita.razaMascota}</span>
                          <span className="badge badge-status">{cita.status}</span>
                        </div>
                        <ul className="pet-detail-list" style={{ marginTop: "1.2rem" }}>
                          <li><b>Propietario:</b> {cita.nombre}</li>
                          <li><b>Correo:</b> {cita.correo}</li>
                          <li><b>Teléfono:</b> {cita.telefono}</li>
                          <li><b>Fecha cita:</b> {cita.fechaCita ? new Date(cita.fechaCita).toLocaleDateString() : "Sin asignar"}</li>
                          <li><b>Dirección:</b> {cita.direccion}</li>
                          <li><b>Zona:</b> {cita.zona}</li>
                          <li><b>Municipio:</b> {cita.municipio}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center mt-5">
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/dashboard")}
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      padding: "10px 30px",
                      borderRadius: "20px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                  >
                    Volver al Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
