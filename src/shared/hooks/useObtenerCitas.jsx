import { useState, useEffect } from "react";
import { obtenerCitas } from "../../services/api";
import toast from "react-hot-toast";

export const useObtenerCitas = () => {
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCitas = async () => {
    setIsLoading(true);
    try {
      const result = await obtenerCitas();
      if (result.error) {
        toast.error("Error al obtener las citas");
        setCitas([]);
      } else {
        setCitas(result.citas || result || []);
      }
    } catch (err) {
      toast.error("Error de red");
      setCitas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return { citas, isLoading, fetchCitas };
};