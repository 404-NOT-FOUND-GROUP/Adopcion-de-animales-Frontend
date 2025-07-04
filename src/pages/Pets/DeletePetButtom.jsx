import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { deletePetById } from "../../services/api"; // ajusta la importación

export const DeletePetButton = ({ petId, navigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar esta mascota?")) return;

    setLoading(true);
    setError(null);

    try {
      const response = await deletePetById(petId);
      if (response.success) {
        // Redirige a dashboard tras eliminar exitosamente
        navigate("/dashboard");
      } else {
        setError(response.msg || "Error al eliminar la mascota");
      }
    } catch (err) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        disabled={loading}
        onClick={handleDelete}
      >
        {loading ? "Eliminando..." : "Eliminar mascota"}
      </Button>
      {error && <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}
    </>
  );
};
