import { useState } from "react";
import { crearCita as crearCitaRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useCrearCita = () => {
  const [isLoading, setIsLoading] = useState(false);

  const crearCita = async (data, imageFile) => {
    setIsLoading(true);
    try {
      const result = await crearCitaRequest(data, imageFile);

      if (result.error || !result.success) {
        toast.error(result.msg || "Error al crear la cita");
        return null;
      }

      toast.success("Cita creada correctamente");
      return result.cita;
    } catch (err) {
      console.error("Crear cita error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    crearCita,
    isLoading,
  };
};