import React from "react";
import { useNavigate } from "react-router-dom";
import { useObtenerCitas } from "../../shared/hooks/useObtenerCitas";
import { NavBar } from "../../components/nav/NavBar";
import { Sidebar } from "../../components/nav/Sidebar";

export const VerCitas = () => {
  const { citas, isLoading } = useObtenerCitas();
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <Sidebar />
      <div
        className="container"
        style={{
          marginTop: "120px", 
          marginBottom: "40px",
        }}
      >
        <br />
        <br />
        <br />
        <h2 className="mb-4 text-center fw-bold text-primary">
          Citas de Castración
        </h2>
        {isLoading ? (
          <div className="text-center mt-5">Cargando citas...</div>
        ) : (
          <div className="row justify-content-center">
            {citas.length === 0 && (
              <div className="text-center text-muted">
                No hay citas registradas.
              </div>
            )}
            {citas.map((cita) => (
              <div
                className="col-12 col-sm-10 col-md-8 col-lg-6 mb-5"
                key={cita._id}
                onClick={() => navigate(`/castraciones/${cita._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="card shadow-lg h-100 border-0"
                  style={{
                    borderRadius: "22px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    minHeight: "220px",
                    fontSize: "1.18rem",
                    padding: "1.5rem 1.2rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.04)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 36px rgba(0,0,0,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0,0,0,0.08)";
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5
                      className="card-title text-success fw-bold mb-3"
                      style={{ fontSize: "1.6rem" }}
                    >
                      {cita.nombre}
                    </h5>
                    <p
                      className="card-text mb-2"
                      style={{ fontSize: "1.15rem" }}
                    >
                      <span className="fw-semibold">Correo:</span> {cita.correo}
                    </p>
                    <p
                      className="card-text mb-0"
                      style={{ fontSize: "1.15rem" }}
                    >
                      <span className="fw-semibold">Teléfono:</span> {cita.telefono}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};