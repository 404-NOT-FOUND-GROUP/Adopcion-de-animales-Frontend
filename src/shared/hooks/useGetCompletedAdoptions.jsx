import { useState, useEffect } from "react";
import { getCompletedAdoptions as getCompletedAdoptionsRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetCompletedAdoptions = () => {
  const [completedAdoptions, setCompletedAdoptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompletedAdoptions = async () => {
    setIsLoading(true);
    try {
      const result = await getCompletedAdoptionsRequest();

      if (!result.success) {
        toast.error("Error al obtener las adopciones concluidas");
        return;
      }

      setCompletedAdoptions(result.completedAdoptions || []);
    } catch (err) {
      console.error("Get Completed Adoptions error:", err);
      toast.error("Error de red");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedAdoptions();
  }, []);

  return {
    completedAdoptions,
    isLoading,
    fetchCompletedAdoptions,
  };
};