import { useState } from "react";
import { aceptarCita } from "../../services/api";
import toast from "react-hot-toast";

export const useAceptarCita = () => {
  const [isLoading, setIsLoading] = useState(false);

  const aceptar = async (id, fechaCita) => {
    setIsLoading(true);
    try {
      const result = await aceptarCita(id, fechaCita);
      if (result.error) {
        toast.error("Error al aceptar la cita");
        return null;
      }
      toast.success("Cita aceptada correctamente");
      return result;
    } catch (err) {
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { aceptar, isLoading };
};