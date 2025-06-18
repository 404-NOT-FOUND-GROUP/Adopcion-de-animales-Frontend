import React from "react";
import { Sidebar } from "../../navs";
import { Navbar } from "../../navs";
import { usePets } from "../../../shared/hooks/useGetPets.jsx";

export const DashboardPage = () => {
  const { paginatedPets, loading, error, nextPage, prevPage, page, totalPages } = usePets(12);

  const handleEditar = (petId) => {
    console.log("Editar mascota:", petId);
    // Aquí rediriges o abres modal para editar
  };

  const handleAdoptar = (petId) => {
    console.log("Adoptar mascota:", petId);
    // Aquí haces la lógica de adopción
  };

  const handlePreguntar = (petId) => {
    console.log("Preguntar por mascota:", petId);
    // Aquí podrías abrir un formulario o chat
  };

  return (
    <div className="max-vh-100 d-flex flex-column text-dark" style={{ backgroundColor: "transparent" }}>
      <Navbar />
      <div className="d-flex" style={{ height: "calc(100vh - 56px)" }}>
        <Sidebar />
        <main className="flex-grow-1 p-4 overflow-auto" style={{ marginLeft: "150px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
          <h1 className="fw-bold text-primary mb-4 text-center">Bienvenido a Nuestro Albergue</h1>

          {loading && <p>Cargando mascotas...</p>}
          {error && <p>Error al cargar mascotas</p>}

          <div className="row row-cols-4 g-4">
            {paginatedPets.map((pet) => (
              <div className="col" key={pet._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`https://res.cloudinary.com/dkmmydkxt/image/upload/${encodeURIComponent(pet.image)}`}
                    className="card-img-top"
                    alt={pet.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{pet.name}</h5>
                      <p className="card-text">Edad: {pet.age} años</p>
                    </div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditar(pet._id)}>
                        Editar
                      </button>
                      <button className="btn btn-success btn-sm" onClick={() => handleAdoptar(pet._id)}>
                        Adoptar
                      </button>
                      <button className="btn btn-info btn-sm text-white" onClick={() => handlePreguntar(pet._id)}>
                        Preguntar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <button className="btn btn-primary" onClick={prevPage} disabled={page === 1}>
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button className="btn btn-primary" onClick={nextPage} disabled={page === totalPages}>
              Siguiente
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
