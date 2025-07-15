import React, { useState } from "react";
import { useGetOngoingAdoptions } from "../../shared/hooks/useGetOngoingAdoptions.jsx";
import { useReviewForm } from "../../shared/hooks/useReviewForm.jsx";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";

import { Document, Page, pdfjs } from "react-pdf";

// Worker remoto para evitar problemas con Vite
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  if (!url) return null;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: 20,
      }}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 12,
          maxWidth: "90vw",
          maxHeight: "90vh",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          width: type === "pdf" ? "70vw" : "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "transparent",
            border: "none",
            fontSize: 28,
            fontWeight: "bold",
            color: "#f72d89",
            cursor: "pointer",
            lineHeight: 1,
            padding: 0,
            userSelect: "none",
            zIndex: 10,
          }}
          aria-label="Cerrar vista previa"
        >
          &times;
        </button>

        <div
          style={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            minWidth: 300,
            position: "relative",
          }}
        >
          {type === "image" && (
            <img
              src={url}
              alt="Vista previa"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: 10,
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
            />
          )}

          {type === "pdf" && (
            <div style={{ textAlign: "center" }}>
              <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p>Cargando PDF...</p>}
                noData={<p>No se encontró PDF</p>}
                error={<p>Error cargando PDF</p>}
              >
                <Page
                  pageNumber={pageNumber}
                  width={window.innerWidth * 0.65}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>

              {numPages > 1 && (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    alignItems: "center",
                    fontWeight: "bold",
                    color: "#555",
                    userSelect: "none",
                  }}
                >
                  <button
                    onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                    disabled={pageNumber === 1}
                    style={{
                      cursor: pageNumber === 1 ? "not-allowed" : "pointer",
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      background: pageNumber === 1 ? "#eee" : "#fff",
                    }}
                    aria-label="Página anterior"
                  >
                    ◀️
                  </button>
                  <span>
                    Página {pageNumber} de {numPages}
                  </span>
                  <button
                    onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
                    disabled={pageNumber === numPages}
                    style={{
                      cursor: pageNumber === numPages ? "not-allowed" : "pointer",
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      background: pageNumber === numPages ? "#eee" : "#fff",
                    }}
                    aria-label="Página siguiente"
                  >
                    ▶️
                  </button>
                </div>
              )}
            </div>
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
    setPreviewType(type);
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewType(null);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0f4f8" }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", marginTop: "180px" }}>
        <Sidebar />
        <main
          style={{
            flexGrow: 1,
            marginLeft: "250px",
            padding: "20px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#f72d89", marginBottom: "1.5rem", fontWeight: "bold" }}>
            Solicitudes de Adopción en Proceso
          </h2>

          {isLoading ? (
            <p style={{ textAlign: "center", color: "#00aeb8" }}>Cargando solicitudes...</p>
          ) : adoptions.length === 0 ? (
            <p style={{ textAlign: "center", color: "#91d100" }}>No hay solicitudes en proceso.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "1.5rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              }}
            >
              {adoptions.map((adop) => (
                <div
                  key={adop._id}
                  style={{
                    background: "#fff",
                    border: "2px solid #f72d89",
                    borderRadius: "10px",
                    padding: "1rem 1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ marginBottom: "1rem" }}>
                    <h3 style={{ margin: "0 0 0.5rem", color: "#00aeb8" }}>
                      {adop.petId?.name || "Mascota Desconocida"}
                    </h3>
                    <p style={{ margin: 0, fontStyle: "italic", color: "#555" }}>
                      Raza: {adop.petId?.breed || "Desconocida"} | Estado: {adop.petId?.status || "Desconocido"}
                    </p>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <h4 style={{ marginBottom: "0.5rem", color: "#f72d89" }}>Datos del Solicitante</h4>
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

                  <div style={{ marginBottom: "1rem" }}>
                    {adop.dpiImage && (
                      <button
                        onClick={() => openPreview("image", adop.dpiImage)}
                        style={{
                          marginRight: "0.5rem",
                          backgroundColor: "#f72d89",
                          border: "none",
                          padding: "0.4rem 0.8rem",
                          color: "#fff",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Ver Foto DPI
                      </button>
                    )}
                    {adop.receiptPdf && (
                      <button
                        onClick={() => openPreview("pdf", adop.receiptPdf)}
                        style={{
                          backgroundColor: "#00aeb8",
                          border: "none",
                          padding: "0.4rem 0.8rem",
                          color: "#fff",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Ver PDF Recibo + Casa
                      </button>
                    )}
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <h4 style={{ marginBottom: "0.5rem", color: "#00aeb8" }}>Condiciones que acepta</h4>
                    <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                      {Object.entries(adop.conditions || {})
                        .filter(([_, v]) => v)
                        .map(([k]) => (
                          <li key={k} style={{ color: "#555" }}>
                            {conditionLabels[k] || k}
                          </li>
                        ))}
                      {Object.values(adop.conditions || {}).every((v) => !v) && (
                        <li style={{ color: "#999", fontStyle: "italic" }}>No aceptó condiciones</li>
                      )}
                    </ul>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <h4 style={{ marginBottom: "0.5rem", color: "#91d100" }}>Compromisos de adopción</h4>
                    <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                      {Object.entries(adop.commitments || {})
                        .filter(([_, v]) => v)
                        .map(([k]) => (
                          <li key={k} style={{ color: "#555" }}>
                            {commitmentLabels[k] || k}
                          </li>
                        ))}
                      {Object.values(adop.commitments || {}).every((v) => !v) && (
                        <li style={{ color: "#999", fontStyle: "italic" }}>No asumió compromisos</li>
                      )}
                    </ul>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "auto",
                    }}
                  >
                    <small style={{ color: "#777" }}>
                      Fecha solicitud:{" "}
                      {adop.createdAt ? new Date(adop.createdAt).toLocaleDateString() : "N/A"}
                    </small>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "15px",
                        fontWeight: "bold",
                        color: "#fff",
                        backgroundColor:
                          adop.status === "PROGRESS"
                            ? "#f72d89"
                            : adop.status === "ACCEPTED"
                            ? "#00aeb8"
                            : "#91d100",
                        textTransform: "uppercase",
                      }}
                    >
                      {adop.status || "PROGRESS"}
                    </span>
                  </div>

                  <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
                    <button
                      disabled={isReviewing}
                      onClick={() => handleReview(adop._id, "ACCEPTED")}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        backgroundColor: "#00aeb8",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Aceptar
                    </button>
                    <button
                      disabled={isReviewing}
                      onClick={() => handleReview(adop._id, "REJECTED")}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        backgroundColor: "#91d100",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
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
