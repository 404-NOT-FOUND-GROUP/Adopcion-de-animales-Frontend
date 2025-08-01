import { useState } from "react";
import { obtenerCitaPorId } from "../../services/api";
import toast from "react-hot-toast";

export const useObtenerCitaPorId = () => {
  const [cita, setCita] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCitaPorId = async (id) => {
    setIsLoading(true);
    try {
      const result = await obtenerCitaPorId(id);
      if (result.error) {
        toast.error("No se encontró la cita");
        setCita(null);
        return null;
      }
      setCita(result.cita || result);
      return result.cita || result;
    } catch (err) {
      toast.error("Error de red");
      setCita(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { cita, fetchCitaPorId };
};