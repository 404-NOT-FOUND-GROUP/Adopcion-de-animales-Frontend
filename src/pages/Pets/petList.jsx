import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useGetFilteredPets } from "../../shared/hooks/useGetFilteredPets";
import { NavBar } from "../../components/nav/NavBar.jsx";
import { Sidebar } from "../../components/nav/Sidebar.jsx";
import { useNavigate } from "react-router-dom";

const cloudName = "dkmmydkxt";
const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;
};

const styles = {
  main: {
    padding: "2rem",
    paddingTop: "180px",
    minHeight: "100vh",
  },
  filtersSection: {
    background: "#f8fdff",
    borderRadius: "16px",
    boxShadow: "0 2px 8px 0 rgba(0,201,255,0.06)",
    padding: "1.5rem 2rem",
    marginBottom: "2rem",
    display: "flex",
    gap: "2.5rem",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  filterGroup: {
    minWidth: 180,
  },
  filterTitle: {
    color: "#00bcd4",
    fontSize: "1.35rem", // antes 1.1rem
    marginBottom: "0.5rem",
    fontWeight: 800,     // antes 600
    letterSpacing: "0.5px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    textShadow: "0 1px 2px #fff, 0 0px 1px #e0f7fa", // mejora contraste
  },
  clearFiltersButton: {
    marginLeft: "1.5rem",
    background: "#e0f7fa",
    color: "#009688",
    border: "none",
    borderRadius: "8px",
    fontWeight: 500,
    transition: "background 0.15s, color 0.15s",
  },
  listContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    marginTop: "2rem",
  },
  card: {
    background: "#fff",
    borderRadius: "18px",
    boxShadow:
      "0 4px 18px 0 rgba(0, 201, 255, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.06)",
    overflow: "hidden",
    width: "320px",
    transition: "transform 0.18s, box-shadow 0.18s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid #e0f7fa",
    position: "relative",
  },
  cardHover: {
    transform: "translateY(-8px) scale(1.025)",
    boxShadow:
      "0 8px 32px 0 rgba(0, 201, 255, 0.18), 0 3px 12px 0 rgba(0,0,0,0.10)",
    borderColor: "#00c9ff",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    background: "#f0f8ff",
    borderBottom: "1px solid #e0f7fa",
  },
  details: {
    padding: "1.2rem 1.5rem 1.5rem 1.5rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#00bcd4",
    marginBottom: "0.3rem",
    letterSpacing: "1px",
  },
  boneShape: {
    background: "#e0f7fa",
    borderRadius: "12px",
    padding: "0.2em 0.8em",
    fontFamily: "'Segoe UI', sans-serif",
  },
  info: {
    color: "#555",
    fontSize: "1.1rem",
    marginBottom: "0.2rem",
  },
  status: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#009688",
    marginBottom: "1rem",
  },
  buttons: {
    display: "flex",
    gap: "0.7rem",
    marginTop: "0.5rem",
    width: "100%",
    justifyContent: "center",
  },
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
      <div style={styles.main}>
        <Sidebar />
        <div style={styles.filtersSection}>
          <div style={styles.filterGroup}>
            <h4 style={styles.filterTitle}>Filtrar por tipo:</h4>
            <div className="btn-group">
              <Button
                variant={filters.type === "dog" ? "primary" : "outline-primary"}
                size="sm"
                style={{ borderRadius: 8, fontWeight: 500, marginRight: 8 }}
                onClick={() => handleFilterClick("type", "dog")}
              >
                🐶 Perros
              </Button>
              <Button
                variant={filters.type === "cat" ? "primary" : "outline-primary"}
                size="sm"
                style={{ borderRadius: 8, fontWeight: 500 }}
                onClick={() => handleFilterClick("type", "cat")}
              >
                🐱 Gatos
              </Button>
            </div>
          </div>
          <div style={styles.filterGroup}>
            <h4 style={styles.filterTitle}>Ordenar por edad:</h4>
            <div className="btn-group">
              <Button
                variant={filters.sortAge === "asc" ? "success" : "outline-success"}
                size="sm"
                style={{ borderRadius: 8, fontWeight: 500, marginRight: 8 }}
                onClick={() => handleFilterClick("sortAge", "asc")}
              >
                ⬆️ Más jóvenes
              </Button>
              <Button
                variant={filters.sortAge === "desc" ? "success" : "outline-success"}
                size="sm"
                style={{ borderRadius: 8, fontWeight: 500 }}
                onClick={() => handleFilterClick("sortAge", "desc")}
              >
                ⬇️ Más adultos
              </Button>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            style={styles.clearFiltersButton}
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
          <div style={styles.listContainer}>
            {pets.map((pet, idx) => (
              <div
                key={pet._id || pet.pid}
                style={{
                  ...styles.card,
                  ...(hovered === idx ? styles.cardHover : {}),
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div>
                  <img
                    src={getImageUrl(pet.image)}
                    alt={pet.name}
                    style={styles.image}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x240?text=No+Image";
                    }}
                  />
                </div>
                <div style={styles.details}>
                  <h3 style={styles.name}>
                    <span style={styles.boneShape}>{pet.name}</span>
                  </h3>
                  <p style={styles.info}>
                    {pet.gender} | {pet.age} {pet.age === 1 ? "año" : "años"}
                  </p>
                  <p style={styles.status}>
                    {pet.status === "Disponible"
                      ? "🟢 Disponible"
                      : pet.status === "Adoptado"
                      ? "🏠 Adoptado"
                      : pet.status}
                  </p>
                  <div style={styles.buttons}>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      style={{
                        minWidth: 90,
                        fontWeight: 500,
                        borderRadius: 8,
                        boxShadow: "0 1px 4px 0 rgba(0,201,255,0.08)",
                      }}
                      onClick={() => navigate(`/mascotas/${pet.pid}`)}
                    >
                      Ver más
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="text-white"
                      style={{
                        minWidth: 90,
                        fontWeight: 500,
                        borderRadius: 8,
                        background:
                          "linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%)",
                        border: "none",
                        color: "#fff",
                      }}
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
