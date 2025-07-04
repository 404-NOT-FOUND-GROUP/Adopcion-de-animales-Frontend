import { useState } from "react";
import { deletePetById } from "../../services/api.jsx";

export const useDeletePet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const deletePet = async (petId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await deletePetById(petId);
      if (response.success) {
        setSuccess(response.msg || "Mascota eliminada correctamente");
      } else {
        setError(response.msg || "Error al eliminar mascota");
      }
      return response;
    } catch (e) {
      setError(e.message || "Error inesperado");
      return { success: false, msg: e.message || "Error inesperado" }; 
    } finally {
      setLoading(false);
    }
  };

  return { deletePet, loading, error, success };
};