import React from "react";
import { useGetOngoingAdoptions } from "../../shared/hooks/useGetOngoingAdoptions.jsx";
import { useReviewForm } from "../../shared/hooks/useReviewForm.jsx";
import "../../components/UI/css/GetOngoingAdoptions.css";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";

export const GetOngoingAdoptions = () => {
  const { adoptions, isLoading, fetchOngoingAdoptions } = useGetOngoingAdoptions();
  const { reviewForm, isLoading: isReviewing } = useReviewForm();

  // Manejar aceptar/rechazar
  const handleReview = async (formId, status) => {
    await reviewForm(formId, { status });
    fetchOngoingAdoptions(); // Refresca la lista después de la acción
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", marginTop: "180px" }}>
        <Sidebar />
        <div className="container-fluid p-4" style={{ marginLeft: "250px", width: "100%" }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-10">
              <div className="bg-light p-5 shadow rounded-4 border border-secondary-subtle">
                <h3 className="text-center mb-4 text-primary fw-bold">
                  Solicitudes de Adopción en Proceso
                </h3>
                {isLoading ? (
                  <div className="alert alert-info text-center">
                    Cargando solicitudes de adopción en proceso...
                  </div>
                ) : (!adoptions || adoptions.length === 0) ? (
                  <div className="alert alert-warning text-center">
                    No hay solicitudes en proceso.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                      <thead className="table-secondary">
                        <tr>
                          <th>Nombre Mascota</th>
                          <th>Raza</th>
                          <th>Solicitante</th>
                          <th>DPI</th>
                          <th>Email</th>
                          <th>Teléfono</th>
                          <th>Dirección</th>
                          <th>Fecha de Solicitud</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adoptions.map((adop) => (
                          <tr key={adop._id}>
                            <td>{adop.petId?.name || "Desconocido"}</td>
                            <td>{adop.petId?.breed || "Desconocido"}</td>
                            <td>{adop.fullName || "Desconocido"}</td>
                            <td>{adop.dpi || "Desconocido"}</td>
                            <td>{adop.email || "Desconocido"}</td>
                            <td>{adop.phone || "Desconocido"}</td>
                            <td>{adop.address || "Desconocido"}</td>
                            <td>
                              {adop.createdAt
                                ? new Date(adop.createdAt).toLocaleDateString()
                                : "Sin fecha"}
                            </td>
                            <td>{adop.status || "PROGRESS"}</td>
                            <td>
                              <div className="d-flex gap-4">
                                <button
                                  className="btn btn-info btn-sm text-white"
                                  disabled={isReviewing}
                                  onClick={() => handleReview(adop._id, "ACCEPTED")}
                                >
                                  Aceptar
                                </button>
                                <button
                                  className="btn btn-info btn-sm text-white"
                                  disabled={isReviewing}
                                  onClick={() => handleReview(adop._id, "REJECTED")}
                                >
                                  Rechazar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
