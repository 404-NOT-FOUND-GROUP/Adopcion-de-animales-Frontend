import { useState, useEffect } from "react";
import { listarCitasActivas } from "../../services/api";

export const useListarCitasActivas = () => {
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCitas = async () => {
    setIsLoading(true);
    const result = await listarCitasActivas();
    setCitas(result?.citas || result || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return { citas, isLoading, fetchCitas };
};