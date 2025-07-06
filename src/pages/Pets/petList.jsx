import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useGetFilteredPets } from "../../shared/hooks/useGetFilteredPets";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import "../../components/UI/css/petList.css";

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
  const [hovered, setHovered] = useState(null);

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
      <div className="pet-list-main">
        <Sidebar />
        <div className="pet-filters-section">
          <div className="filter-group">
            <h4>
              <span className="petlist-title-box">Filtrar por tipo:</span>
            </h4>
            <div className="btn-group">
              <Button
                variant={filters.type === "dog" ? "primary" : "outline-primary"}
                size="sm"
                className="petlist-filterBtn"
                onClick={() => handleFilterClick("type", "dog")}
              >
                🐶 Perros
              </Button>
              <Button
                variant={filters.type === "cat" ? "primary" : "outline-primary"}
                size="sm"
                className="petlist-filterBtn"
                onClick={() => handleFilterClick("type", "cat")}
              >
                🐱 Gatos
              </Button>
            </div>
          </div>
          <div className="filter-group">
            <h4>
              <span className="petlist-title-box">Ordenar por edad:</span>
            </h4>
            <div className="btn-group">
              <Button
                variant={filters.sortAge === "asc" ? "success" : "outline-success"}
                size="sm"
                className="petlist-filterBtn"
                onClick={() => handleFilterClick("sortAge", "asc")}
              >
                ⬆️ Más jóvenes
              </Button>
              <Button
                variant={filters.sortAge === "desc" ? "success" : "outline-success"}
                size="sm"
                className="petlist-filterBtn"
                onClick={() => handleFilterClick("sortAge", "desc")}
              >
                ⬇️ Más adultos
              </Button>
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
            <h5>
              <span className="petlist-title-box">🎯 Mostrando mascotas filtradas</span>
            </h5>
          ) : (
            <h5>
              <span className="petlist-title-box">📋 Mostrando todas las mascotas</span>
            </h5>
          )}
        </div>

        {isLoading ? (
          <p className="text-center mt-4">Cargando mascotas...</p>
        ) : pets.length === 0 ? (
          <p className="text-center mt-4">No hay mascotas para mostrar.</p>
        ) : (
          <div className="pet-list-container">
            {pets.map((pet, idx) => (
              <div
                key={pet._id || pet.pid}
                className={`pet-list-card${
                  hovered === idx ? " pet-list-card-hover" : ""
                }`}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/mascotas/${pet.pid}`)}
                style={{ cursor: "pointer" }}
              >
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
                <div>
                  <h3 className="pet-name">
                    <span className="pet-name-box">{pet.name}</span>
                  </h3>
                  <p className="pet-info">
                    {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
                  </p>
                  <p className={`pet-status${pet.status === "Adoptado" ? " adopted" : ""}`}>
                    {pet.status === "Disponible"
                      ? "🟢 Disponible"
                      : pet.status === "Adoptado"
                      ? "🏠 Adoptado"
                      : pet.status}
                  </p>
                  <div className="pet-buttons">
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/mascotas/${pet.pid}`);
                      }}
                    >
                      Ver más
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/adoptar/${pet.pid}`);
                      }}
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
