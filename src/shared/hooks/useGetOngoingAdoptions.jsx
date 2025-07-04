import { useState, useEffect } from "react";
import { getOngoingAdoptions as getOngoingAdoptionsRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetOngoingAdoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOngoingAdoptions = async () => {
    setIsLoading(true);
    try {
      const result = await getOngoingAdoptionsRequest();

      if (!result.success) {
        toast.error("Error al obtener las adopciones en proceso");
        return;
      }

      setAdoptions(result.ongoingAdoptions || []);
    } catch (err) {
      console.error("Get Ongoing Adoptions error:", err);
      toast.error("Error de red");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingAdoptions();
  }, []);

  return {
    adoptions,
    isLoading,
    fetchOngoingAdoptions,
  };
};