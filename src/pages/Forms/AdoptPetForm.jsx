import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdoptPet } from "../../shared/hooks/useAdoptPet";
import { Sidebar } from "../../components/nav/Sidebar";
import { NavBar } from "../../components/nav/NavBar";
import "../../components/UI/css/AdoptPetForm.css";
import { validateDpi, validateDpiMessage } from "../../shared/validators/ValidateDpi";

export const AdoptPetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { form, handleChange, handleSubmit, loading, success, error } = useAdoptPet(id);
  const [dpiError, setDpiError] = useState("");

  const handleDpiChange = (e) => {
    handleChange(e);
    if (!validateDpi(e.target.value)) {
      setDpiError(validateDpiMessage);
    } else {
      setDpiError("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateDpi(form.dpi)) {
      setDpiError(validateDpiMessage);
      return;
    }
    setDpiError("");
    handleSubmit(e);
  };

  const renderConditionLabel = (key) => {
    const labels = {
      hungerFree: "Velar porque viva libre de hambre, sed y desnutrición",
      fearFree: "Libre de temor y angustia",
      noAbuse: "Libre de molestias físicas y térmicas e incomodidad",
      noPain: "Libre de dolor, lesión y enfermedad",
      naturalBehavior: "Libre de manifestar sus comportamientos naturales",
    };
    return labels[key] || key;
  };

  const renderCommitmentLabel = (key) => {
    const labels = {
      patience: "Tendré paciencia para que su adaptación sea una transición segura",
      qualityOfLife: "Brindaré calidad de vida a través de cariño y respeto",
      familyInvolvement: "La participación del cuidado de todos los integrantes de la familia",
      timeDedication: "Dedicar tiempo para que se ejercite, tenga espacios de juego y socialización",
    };
    return labels[key] || key;
  };

  // Inputs que van en el formulario con su configuración
  const inputFields = [
    { label: "Nombre completo", name: "fullName" },
    { label: "DPI", name: "dpi", onChange: handleDpiChange, error: dpiError },
    { label: "Email", name: "email", type: "email" },
    { label: "Teléfono", name: "phone" },
    { label: "Dirección", name: "address" },
    { label: "Municipio", name: "municipality" },
    { label: "Zona", name: "zone" },
    { label: "Tipo de mascota que deseas", name: "petInterest", placeholder: "Ej: Perro, Gato, Aves..." },
    { label: "Nombre de la mascota que te interesa", name: "interestedPetName" },
  ];

  return (
    <div className="d-flex flex-column adopt-form-container">
      <NavBar />
      <div className="form-wrapper">
        <Sidebar />
        <main
          className="flex-grow-1 d-flex justify-content-center"
          style={{ marginLeft: "150px", paddingTop: "130px", paddingBottom: "40px" }}
          role="main"
        >
          <div className="card adopt-form-card">
            <div className="text-center mb-3">
              <span className="emoji">🐾</span>
              <h3 className="form-title mb-1">Formulario de Adopción</h3>
              <p className="form-subtitle">¡Completa tus datos para adoptar!</p>
            </div>

            <form onSubmit={onSubmit} noValidate>
              {/* Inputs divididos en dos columnas */}
              {inputFields.map(({ label, name, type = "text", onChange = handleChange, placeholder = "", error }) => (
                <div className="mb-3 form-grid-item" key={name}>
                  <label className="form-label fw-semibold">{label}</label>
                  <input
                    name={name}
                    className="form-control"
                    type={type}
                    value={form[name] || ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                  />
                  {error && <div className="form-error">{error}</div>}
                </div>
              ))}

              {/* Selects y otros campos que ocupan todo el ancho */}
              <div className="mb-3 form-grid-fullwidth">
                <label className="form-label fw-semibold">¿Cómo te enteraste?</label>
                <select name="refSource" className="form-select" value={form.refSource || ""} onChange={handleChange} required>
                  <option value="">Selecciona una opción</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Familiar/Amigo">Familiar o amigo</option>
                  <option value="Canales municipales">Canales municipales</option>
                </select>
              </div>

              <div className="mb-3 form-grid-fullwidth">
                <label className="form-label fw-semibold">Tamaño preferido</label>
                <select name="petSize" className="form-select" value={form.petSize || ""} onChange={handleChange} required>
                  <option value="">Selecciona una opción</option>
                  <option value="pequeña">Pequeña</option>
                  <option value="mediana">Mediana</option>
                  <option value="grande">Grande</option>
                </select>
              </div>

              <div className="form-check mb-3 form-grid-fullwidth">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="currentPets"
                  checked={!!form.currentPets}
                  onChange={handleChange}
                  id="currentPetsCheckbox"
                />
                <label className="form-check-label" htmlFor="currentPetsCheckbox">
                  Actualmente tienes mascotas
                </label>
              </div>

              <div className="mb-3 form-grid-fullwidth">
                <label className="form-label fw-semibold">Tipo de vivienda</label>
                <select name="housingType" className="form-select" value={form.housingType || ""} onChange={handleChange} required>
                  <option value="">Selecciona una opción</option>
                  <option value="Propia">Propia</option>
                  <option value="Alquilada">Alquilada</option>
                </select>
              </div>

              <div className="mb-3 form-grid-fullwidth">
                <label className="form-label fw-semibold">Vives en:</label>
                <select name="housingKind" className="form-select" value={form.housingKind || ""} onChange={handleChange} required>
                  <option value="">Selecciona una opción</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                </select>
              </div>

              {/* Condiciones - ocupan todo el ancho */}
              <h5 className="form-section-title form-grid-fullwidth">Condiciones que aceptas</h5>
              {Object.entries(form.conditions || {}).map(([key, value]) => (
                <div key={key} className="form-check form-grid-fullwidth">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={`conditions.${key}`}
                    checked={value}
                    onChange={handleChange}
                    id={`condition-${key}`}
                  />
                  <label className="form-check-label" htmlFor={`condition-${key}`}>
                    {renderConditionLabel(key)}
                  </label>
                </div>
              ))}

              {/* Compromisos - ocupan todo el ancho */}
              <h5 className="form-section-title form-grid-fullwidth">Compromisos de adopción</h5>
              {Object.entries(form.commitments || {}).map(([key, value]) => (
                <div key={key} className="form-check form-grid-fullwidth">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={`commitments.${key}`}
                    checked={value}
                    onChange={handleChange}
                    id={`commitment-${key}`}
                  />
                  <label className="form-check-label" htmlFor={`commitment-${key}`}>
                    {renderCommitmentLabel(key)}
                  </label>
                </div>
              ))}

              <button className="btn btn-submit w-100" disabled={loading || !!dpiError}>
                {loading ? "Enviando..." : "Enviar solicitud"}
              </button>

              <button type="button" className="btn btn-cancel w-100 mt-3" onClick={() => navigate("/dashboard")}>
                ← Regresar al Inicio
              </button>

              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {success && <div className="alert alert-success mt-3">{success}</div>}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
