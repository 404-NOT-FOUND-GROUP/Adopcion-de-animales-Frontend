import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useGetFilteredPets } from "../../shared/hooks/useGetFilteredPets";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import "../../components/UI/css/petList.css";
import { useNavigate } from "react-router-dom";

const cloudName = "dkmmydkxt";
const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;
};

export const PetList = () => {
  const navigate = useNavigate();
  const { pets, getFilteredPets, isLoading } = useGetFilteredPets();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getFilteredPets(filters);
  }, [filters]);

  const handleFilterClick = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const isFiltering = Object.values(filters).some((v) => v !== undefined);

  return (
    <>
      <NavBar />
      <div style={{ padding: "2rem", paddingTop: "180px" }}>
        <Sidebar/>
        <div className="pet-filters-section">
          <div className="filter-group">
            <h4>Filtrar por tipo:</h4>
            <div className="btn-group">
              <Button
                variant={filters.type === "dog" ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => handleFilterClick("type", "dog")}
              >
                🐶 Perros
              </Button>{" "}
              <Button
                variant={filters.type === "cat" ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => handleFilterClick("type", "cat")}
              >
                🐱 Gatos
              </Button>
            </div>
          </div>

          <div className="filter-group">
            <h4>Ordenar por edad:</h4>
            <div className="btn-group">
              <Button
                variant={filters.sortAge === "asc" ? "success" : "outline-success"}
                size="sm"
                onClick={() => handleFilterClick("sortAge", "asc")}
              >
                ⬆️ Más jóvenes
              </Button>{" "}
              <Button
                variant={filters.sortAge === "desc" ? "success" : "outline-success"}
                size="sm"
                onClick={() => handleFilterClick("sortAge", "desc")}
              >
                ⬇️ Más adultos
              </Button>{" "}
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="clear-filters-button"
            onClick={clearFilters}
          >
            ❌ Limpiar filtros
          </Button>
        </div>

        <div className="text-center mb-3">
          {isFiltering ? (
            <h5>🎯 Mostrando mascotas filtradas</h5>
          ) : (
            <h5>📋 Mostrando todas las mascotas</h5>
          )}
        </div>

        {isLoading ? (
          <p className="text-center mt-4">Cargando mascotas...</p>
        ) : pets.length === 0 ? (
          <p className="text-center mt-4">No hay mascotas para mostrar.</p>
        ) : (
          <div className="pet-list-container">
            {pets.map((pet) => (
              <div className="pet-list-card" key={pet._id || pet.pid}>
                <div className="pet-image">
                  <img
                    src={getImageUrl(pet.image)}
                    alt={pet.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x240?text=No+Image";
                    }}
                  />
                </div>
                <div className="pet-details">
                  <h3 className="pet-name">
                    <span className="bone-shape">{pet.name}</span>
                  </h3>
                  <p className="pet-info">
                    {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
                  </p>
                  <p className="pet-status">{pet.status}</p>
                  <div className="pet-buttons">
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => navigate(`/mascotas/${pet.pid}`)}
                    >
                      Ver más
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="text-white"
                      onClick={() => navigate(`/adoptar/${pet.pid}`)}
                    >
                      Adoptar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
