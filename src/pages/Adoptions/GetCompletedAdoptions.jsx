import React from "react";
import { useGetCompletedAdoptions } from "../../shared/hooks/useGetCompletedAdoptions.jsx";
import { useGenerateFormPDF } from "../../shared/hooks/useGenerateFormPDF.jsx";
import "../../components/UI/css/GetOngoingAdoptions.css";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";

export const GetCompletedAdoptions = () => {
  const { completedAdoptions, isLoading } = useGetCompletedAdoptions();
  const { generatePDF, loading: loadingPDF, error: errorPDF } = useGenerateFormPDF();

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
                  Adopciones Concluidas
                </h3>
                {isLoading ? (
                  <div className="alert alert-info text-center">
                    Cargando adopciones concluidas...
                  </div>
                ) : (!completedAdoptions || completedAdoptions.length === 0) ? (
                  <div className="alert alert-warning text-center">
                    No hay adopciones concluidas.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                      <thead className="table-secondary">
                        <tr>
                          <th>Nombre Mascota</th>
                          <th>Raza</th>
                          <th>Solicitante</th>
                          <th>Estado</th>
                          <th>Fecha de Solicitud</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedAdoptions.map((adop) => (
                          <tr key={adop._id}>
                            <td>{adop.petId?.name || "Desconocido"}</td>
                            <td>{adop.petId?.breed || "Desconocido"}</td>
                            <td>{adop.fullName || "Desconocido"}</td>
                            <td>{adop.status || "Desconocido"}</td>
                            <td>
                              {adop.createdAt
                                ? new Date(adop.createdAt).toLocaleDateString()
                                : "Sin fecha"}
                            </td>
                            <td>
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#00bfff",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                                onClick={() => generatePDF(adop._id)}
                                disabled={loadingPDF}
                              >
                                {loadingPDF ? "Descargando..." : "Descargar PDF"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {errorPDF && (
                      <div className="alert alert-danger mt-2 text-center">
                        {errorPDF}
                      </div>
                    )}
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