import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdoptPet } from "../../shared/hooks/useAdoptPet"
import { Sidebar } from "../../components/nav/Sidebar";
import { NavBar } from "../../components/nav/NavBar";

export const AdoptPetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { form, handleChange, handleSubmit, loading, success, error } = useAdoptPet(id);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "linear-gradient(135deg, #e3f0ff 0%, #f8faff 100%)" }}>
      <NavBar />
      <div style={{ padding: "2rem", paddingTop: "101px" }}>
        <Sidebar />
        <main
          className="flex-grow-1 d-flex justify-content-center"
          style={{
            marginLeft: "150px",
            minHeight: "calc(100vh - 56px)",
            paddingTop: "130px", 
            paddingBottom: "40px",
            overflowY: "auto"
          }}
          role="main"
        >
          <div
            className="card shadow-lg p-4 w-100"
            style={{
              maxWidth: 450,
              borderRadius: "18px",
              border: "none",
              background: "#f4faff",
              minWidth: 0
            }}
          >
            <div className="text-center mb-3">
              <span style={{ fontSize: 48, color: "#0077cc" }}>🐾</span>
              <h3 className="fw-bold mb-1" style={{ color: "#0077cc" }}>Formulario de Adopción</h3>
              <p className="text-secondary mb-0">¡Completa tus datos para adoptar!</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#0077cc" }}>Nombre completo</label>
                <input
                  name="fullName"
                  className="form-control"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#0077cc" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#0077cc" }}>DPI</label>
                <input
                  name="dpi"
                  className="form-control"
                  value={form.dpi}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#0077cc" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#0077cc" }}>Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#0077cc" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#0077cc" }}>Teléfono</label>
                <input
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#0077cc" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#0077cc" }}>Dirección</label>
                <input
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#0077cc" }}
                />
              </div>
              <button
                className="btn w-100 fw-bold"
                style={{
                  background: "linear-gradient(90deg, #0077cc 60%, #00bfff 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px"
                }}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar solicitud"}
              </button>
              <button
                type="button"
                className="btn w-100 fw-bold mt-4 mb-5"
                style={{
                  background: "linear-gradient(90deg, #0077cc 60%, #00bfff 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px"
                }}
                onClick={() => navigate("/dashboard")}
              >
                ← Regresar al Inicio
              </button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {success && <div className="alert alert-success mt-3">{success}</div>}
            </form>
          </div>
        </main>
      </div>
      <style>
        {`
          @media (max-width: 991.98px) {
            main[role="main"] {
              margin-left: 0 !important;
            }
          }
          @media (max-width: 767.98px) {
            .card {
              padding: 1rem !important;
              max-width: 100% !important;
              border-radius: 10px !important;
            }
            .d-flex.flex-grow-1 {
              flex-direction: column !important;
            }
          }
          @media (max-width: 575.98px) {
            .card {
              padding: 0.5rem !important;
              max-width: 100vw !important;
            }
            .form-label {
              font-size: 1rem !important;
            }
            .btn {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};