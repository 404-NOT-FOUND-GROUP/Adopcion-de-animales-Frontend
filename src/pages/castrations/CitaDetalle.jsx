import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useObtenerCitaPorId } from "../../shared/hooks/useObtenerCitaPorId";
import { useAceptarCita } from "../../shared/hooks/useAceptarCita";
import { useCancelarCita } from "../../shared/hooks/useCancelarCita";
import { NavBar } from "../../components/nav/NavBar";
import { Sidebar } from "../../components/nav/Sidebar";
import "../../components/UI/css/PetDetail.css";

export const CitaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cita, fetchCitaPorId } = useObtenerCitaPorId();
  const { aceptar, isLoading: loadingAceptar } = useAceptarCita();
  const { cancelar, isLoading: loadingCancelar } = useCancelarCita();
  const [isLoading, setIsLoading] = useState(true);
  const [fechaCita, setFechaCita] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await fetchCitaPorId(id);
      setIsLoading(false);
    };
    fetch();
  }, [id]);

  const handleAceptar = async () => {
    if (!fechaCita) {
      alert("Por favor selecciona una fecha para la cita.");
      return;
    }
    await aceptar(id, fechaCita);
    fetchCitaPorId(id);
  };

  const handleCancelar = async () => {
    const motivo = prompt("Motivo de cancelación:");
    if (!motivo) return;
    await cancelar(id, motivo);
    fetchCitaPorId(id);
  };

  if (isLoading) return (
    <>
      <NavBar />
      <div className="pet-detail-bg">
        <Sidebar />
        <main className="pet-detail-main">
          <div className="loading">Cargando detalles de la cita...</div>
        </main>
      </div>
    </>
  );

  if (!cita) return (
    <>
      <NavBar />
      <div className="pet-detail-bg">
        <Sidebar />
        <main className="pet-detail-main">
          <div className="loading">No se encontró la cita.</div>
        </main>
      </div>
    </>
  );

  const imageUrl = cita?.image
    ? cita.image
    : "https://via.placeholder.com/320x320.png?text=Sin+imagen";

  return (
    <>
      <NavBar />
      <div className="pet-detail-bg">
        <Sidebar />
        <main className="pet-detail-main">
          <section
            className="pet-detail-card"
            style={{
              marginTop: "60px",
              maxWidth: 1100,
              display: "flex",
              flexDirection: "row",
              gap: "2.5rem",
              alignItems: "flex-start",
              padding: "2.5rem 2rem",
            }}
          >
            <div style={{ flex: "0 0 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className="pet-detail-name"
                style={{
                  fontSize: "1.7rem",
                  marginBottom: "1.2rem",
                  fontWeight: "bold",
                  color: "#17486b",
                  textAlign: "center",
                  letterSpacing: "1px",
                }}
              >
                {cita.nombreMascota}
              </div>
              <img src={imageUrl} alt={cita.nombreMascota || "Mascota"} />
              <div className="d-flex flex-column align-items-center gap-2 mt-4" style={{ width: "100%" }}>
                <label className="mb-2" style={{ fontWeight: "bold", color: "#17486b" }}>
                  Selecciona la fecha de la cita:
                  <input
                    type="date"
                    className="form-control mt-1"
                    value={fechaCita}
                    onChange={e => setFechaCita(e.target.value)}
                    style={{ minWidth: 180, borderRadius: "12px", border: "1px solid #bcdff1" }}
                  />
                </label>
                <button
                  className="btn btn-pet-primary"
                  onClick={handleAceptar}
                  disabled={loadingAceptar}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.08rem",
                    minWidth: 180,
                    borderRadius: "18px",
                    boxShadow: "0 2px 8px rgba(23,72,107,0.08)",
                  }}
                >
                  {loadingAceptar ? "Aceptando..." : "Aceptar"}
                </button>
                <button
                  className="btn btn-pet-danger"
                  onClick={handleCancelar}
                  disabled={loadingCancelar}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.08rem",
                    minWidth: 180,
                    borderRadius: "18px",
                    boxShadow: "0 2px 8px rgba(220,53,69,0.08)",
                  }}
                >
                  {loadingCancelar ? "Cancelando..." : "Cancelar"}
                </button>
                <button
                  className="btn btn-pet-secondary"
                  onClick={() => navigate("/castraciones/obtenerCitas")}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.08rem",
                    minWidth: 180,
                    borderRadius: "18px",
                  }}
                >
                  Volver
                </button>
              </div>
            </div>
            <div className="pet-detail-info" style={{ flex: 1 }}>
              <h2 className="pet-detail-name" style={{ color: "#17486b" }}>Detalle de la Cita</h2>
              <div className="pet-detail-badges" style={{ flexWrap: "wrap" }}>
                <span className="badge badge-type">{cita.especieMascota}</span>
                <span className="badge badge-gender">{cita.sexoMascota}</span>
                <span className="badge badge-age">{cita.edadMascota} años</span>
                <span className="badge badge-breed">{cita.razaMascota}</span>
                <span className="badge badge-status">{cita.status}</span>
              </div>
              <ul className="pet-detail-list" style={{ marginTop: "1.2rem" }}>
                <li><b>Propietario:</b> {cita.nombre}</li>
                <li><b>DPI:</b> {cita.dpi}</li>
                <li><b>Correo:</b> {cita.correo}</li>
                <li><b>Teléfono:</b> {cita.telefono}</li>
                <li><b>Dirección:</b> {cita.direccion}</li>
                <li><b>Zona:</b> {cita.zona}</li>
                <li><b>Municipio:</b> {cita.municipio}</li>
                <li><b>Edad propietario:</b> {cita.edad}</li>
                <li><b>Sexo propietario:</b> {cita.sexo}</li>
                <li><b>Etnia:</b> {cita.etnia}</li>
                <li><b>Labora Actualmente:</b> {cita.laboraActualmente ? "Sí" : "No"}</li>
                <li><b>Procedencia mascota:</b> {cita.procedencia}</li>
                <li><b>Observaciones:</b> {cita.observaciones}</li>
                <li>
                  <b>Fecha de creación:</b>{" "}
                  {cita.creadoEn ? new Date(cita.creadoEn).toLocaleString() : ""}
                </li>
                <li>
                  <b>Fecha de cita:</b>{" "}
                  {cita.fechaCita ? new Date(cita.fechaCita).toLocaleDateString() : "Sin asignar"}
                </li>
                {cita.cancelDescription && (
                  <li>
                    <b>Motivo de cancelación:</b> {cita.cancelDescription}
                  </li>
                )}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};