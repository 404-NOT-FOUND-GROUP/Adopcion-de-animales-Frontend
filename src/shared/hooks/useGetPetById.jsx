import { useState, useEffect } from "react";
import { getPetById as getPetByIdRequest } from "../../services/api.jsx";
import toast from "react-hot-toast";

export const useGetPetById = (petId) => {
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPetById = async (id) => {
    setIsLoading(true);
    try {
      const result = await getPetByIdRequest(id);

      if (!result.success) {
        toast.error("No se encontró la mascota");
        setPet(null);
        return;
      }

      setPet(result.pet || null);
    } catch (err) {
      console.error("Get Pet By ID error:", err);
      toast.error("Error de red");
      setPet(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (petId) {
      fetchPetById(petId);
    }
  }, [petId]);

  return {
    pet,
    isLoading,
    refetch: () => fetchPetById(petId),
  };
};