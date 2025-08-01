import { useState } from "react";
import { completarCita } from "../../services/api";

export const useCompletarCita = () => {
  const [isLoading, setIsLoading] = useState(false);

  const completar = async (id) => {
    setIsLoading(true);
    const result = await completarCita(id);
    setIsLoading(false);
    return result;
  };

  return { completar, isLoading };
};