import { useState, useEffect } from "react";
import { obtenerCitasCompletadas } from "../../services/api";

export const useObtenerCitasCompletadas = () => {
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCitas = async () => {
    setIsLoading(true);
    const result = await obtenerCitasCompletadas();
    setCitas(result?.citas || result || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return { citas, isLoading, fetchCitas };
};