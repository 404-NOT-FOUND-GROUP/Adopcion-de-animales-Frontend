import React, { useState } from "react";
import { useGetOngoingAdoptions } from "../../shared/hooks/useGetOngoingAdoptions.jsx";
import { useReviewForm } from "../../shared/hooks/useReviewForm.jsx";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import "../../components/UI/css/GetOngoingAdoptions.css";

const conditionLabels = {
  hungerFree: "Libre de hambre, sed y desnutrición",
  fearFree: "Libre de temor y angustia",
  noAbuse: "Libre de molestias físicas y térmicas",
  noPain: "Libre de dolor, lesión y enfermedad",
  naturalBehavior: "Manifestar comportamientos naturales",
};

const commitmentLabels = {
  patience: "Paciencia en la adaptación",
  qualityOfLife: "Calidad de vida con cariño y respeto",
  familyInvolvement: "Participación de toda la familia",
  timeDedication: "Tiempo para ejercicio y socialización",
};

const PreviewModal = ({ url, type, onClose }) => {
  if (!url) return null;

  const isPdfValid = type === "pdf" && !!url;

  return (
    <div
      className="preview-modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="preview-modal-close"
          onClick={onClose}
          aria-label="Cerrar vista previa"
        >
          &times;
        </button>
        <div className="preview-modal-body">
          {type === "image" && (
            <img
              src={url}
              alt="Vista previa"
              className="preview-modal-image"
              draggable={false}
            />
          )}
          {type === "pdf" && (
            isPdfValid ? (
              <iframe
                src={url}
                title="Vista previa PDF"
                width="100%"
                height="600px"
                style={{ border: "none" }}
              />
            ) : (
              <p style={{ color: "red" }}>
                URL inválida para PDF. Asegúrate que la URL es accesible públicamente.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const GetOngoingAdoptions = () => {
  const { adoptions, isLoading, fetchOngoingAdoptions } = useGetOngoingAdoptions();
  const { reviewForm, isLoading: isReviewing } = useReviewForm();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  const handleReview = async (formId, status) => {
    await reviewForm(formId, { status });
    fetchOngoingAdoptions();
  };

  const openPreview = (type, url) => {
    let previewUrl = url;
    if (type === "pdf" && url && !url.endsWith(".pdf")) {
      previewUrl = url + ".pdf";
    }
    setPreviewType(type);
    setPreviewUrl(previewUrl);
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewType(null);
  };

  return (
    <div className="ongoing-adoptions-root">
      <NavBar />
      <div className="ongoing-adoptions-content">
        <Sidebar />
        <main className="ongoing-adoptions-main">
          <h2 className="ongoing-adoptions-title">
            Solicitudes de Adopción en Proceso
          </h2>
          {isLoading ? (
            <p className="ongoing-adoptions-loading">Cargando solicitudes...</p>
          ) : adoptions.length === 0 ? (
            <p className="ongoing-adoptions-empty">No hay solicitudes en proceso.</p>
          ) : (
            <div className="adoption-cards-grid">
              {adoptions.map((adop) => (
                <div key={adop._id} className="adoption-card">
                  <div className="adoption-card-header">
                    <h3 className="adoption-card-petname">
                      {adop.petId?.name || "Mascota Desconocida"}
                    </h3>
                    <p className="adoption-card-petinfo">
                      Raza: {adop.petId?.breed || "Desconocida"} | Estado: {adop.petId?.status || "Desconocido"}
                    </p>
                  </div>
                  <div className="adoption-card-section">
                    <h4 className="adoption-card-section-title datos">Datos del Solicitante</h4>
                    <p><strong>Nombre:</strong> {adop.fullName || "N/A"}</p>
                    <p><strong>DPI:</strong> {adop.dpi || "N/A"}</p>
                    <p><strong>Email:</strong> {adop.email || "N/A"}</p>
                    <p><strong>Teléfono:</strong> {adop.phone || "N/A"}</p>
                    <p><strong>Dirección:</strong> {adop.address || "N/A"}</p>
                    <p><strong>Municipio:</strong> {adop.municipality || "N/A"}</p>
                    <p><strong>Zona:</strong> {adop.zone || "N/A"}</p>
                    <p><strong>¿Cómo se enteró?:</strong> {adop.refSource || "N/A"}</p>
                    <p><strong>Tamaño preferido:</strong> {adop.petSize || "N/A"}</p>
                    <p><strong>Actualmente tiene mascotas:</strong> {adop.currentPets ? "Sí" : "No"}</p>
                    <p><strong>Tipo de vivienda:</strong> {adop.housingType || "N/A"}</p>
                    <p><strong>Vivienda:</strong> {adop.housingKind || "N/A"}</p>
                  </div>
                  <div className="adoption-card-section adoption-card-files">
                    {adop.dpiImage && (
                      <button
                        className="adoption-card-btn dpi"
                        onClick={() => openPreview("image", adop.dpiImage)}
                      >
                        Ver Foto DPI
                      </button>
                    )}
                    {adop.receiptPdf && (
                      <button
                        className="adoption-card-btn pdf"
                        onClick={() => openPreview("pdf", adop.receiptPdf)}
                      >
                        Ver PDF Recibo + Casa
                      </button>
                    )}
                  </div>
                  <div className="adoption-card-section">
                    <h4 className="adoption-card-section-title condiciones">Condiciones que acepta</h4>
                    <ul className="adoption-card-list">
                      {Object.entries(adop.conditions || {})
                        .filter(([_, v]) => v)
                        .map(([k]) => (
                          <li key={k} className="adoption-card-listitem">
                            {conditionLabels[k] || k}
                          </li>
                        ))}
                      {Object.values(adop.conditions || {}).every((v) => !v) && (
                        <li className="adoption-card-listitem empty">No aceptó condiciones</li>
                      )}
                    </ul>
                  </div>
                  <div className="adoption-card-section">
                    <h4 className="adoption-card-section-title compromisos">Compromisos de adopción</h4>
                    <ul className="adoption-card-list">
                      {Object.entries(adop.commitments || {})
                        .filter(([_, v]) => v)
                        .map(([k]) => (
                          <li key={k} className="adoption-card-listitem">
                            {commitmentLabels[k] || k}
                          </li>
                        ))}
                      {Object.values(adop.commitments || {}).every((v) => !v) && (
                        <li className="adoption-card-listitem empty">No asumió compromisos</li>
                      )}
                    </ul>
                  </div>
                  <div className="adoption-card-footer">
                    <small className="adoption-card-date">
                      Fecha solicitud:{" "}
                      {adop.createdAt ? new Date(adop.createdAt).toLocaleDateString() : "N/A"}
                    </small>
                    <span
                      className={`adoption-card-status ${adop.status?.toLowerCase() || "progress"}`}
                    >
                      {adop.status || "PROGRESS"}
                    </span>
                  </div>
                  <div className="adoption-card-actions">
                    <button
                      disabled={isReviewing}
                      className="adoption-card-action-btn aceptar"
                      onClick={() => handleReview(adop._id, "ACCEPTED")}
                    >
                      Aceptar
                    </button>
                    <button
                      disabled={isReviewing}
                      className="adoption-card-action-btn rechazar"
                      onClick={() => handleReview(adop._id, "REJECTED")}
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <PreviewModal url={previewUrl} type={previewType} onClose={closePreview} />
    </div>
  );
};
