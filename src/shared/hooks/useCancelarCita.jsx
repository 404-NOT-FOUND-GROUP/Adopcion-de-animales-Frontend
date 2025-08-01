import { useState } from "react";
import { cancelarCita } from "../../services/api";
import toast from "react-hot-toast";

export const useCancelarCita = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cancelar = async (id, cancelDescription) => {
    setIsLoading(true);
    try {
      const result = await cancelarCita(id, cancelDescription);
      if (result.error) {
        toast.error("Error al cancelar la cita");
        return null;
      }
      toast.success("Cita cancelada correctamente");
      return result;
    } catch (err) {
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { cancelar, isLoading };
};